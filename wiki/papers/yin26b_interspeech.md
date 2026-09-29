---
id: yin26b_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2842
pdf: https://www.isca-archive.org/interspeech_2026/yin26b_interspeech.pdf
---

# STArK: Towards Synthesizing Articulatory Kinematics from Text

*Xavier Yin, Carlos Busso*

[PDF](https://www.isca-archive.org/interspeech_2026/yin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2842)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — STArK is a non-autoregressive text-to-articulation synthesis model that generates electromagnetic articulography kinematics and speech directly from text, achieving competitive voice cloning and speech quality without requiring speaker embeddings during training.

## Key contributions

- Introduces the first text-to-articulatory kinematics generation framework (STArK) that directly synthesizes vocal tract physical parameters from text.
- Leverages pre-trained SPARC articulatory pseudo-labels and vocoders on LibriTTS-R, bypassing the traditional need for costly real electromagnetic articulography recording datasets.
- Demonstrates multi-speaker speech synthesis and zero-shot voice cloning capabilities without exposing the model to speaker embeddings during training.
- Achieves competitive automatic and subjective speech quality metrics (UTMOSv2, DNSMOS) compared to baseline text-to-speech architectures like YourTTS.

## Problem

Analyzing human speech through articulatory kinematics is critical for understanding speech production, phonetics, and motor cortex function, but progress is bottlenecked by a severe scarcity of high-quality electromagnetic articulography datasets. While prior systems like SPARC can invert speech audio into vocal tract parameters, and other models condition text-to-speech on articulatory features, generating articulatory representations directly from raw text has remained an open challenge. Overcoming this capability gap enables scalable generation of articulatory data from text corpora, unlocking downstream utility in phonetics, disordered speech enhancement, and interpretable speech modeling without relying on black-box high-dimensional embeddings.

## Method

STArK adapts a non-autoregressive text-to-speech architecture (similar to FastSpeech 2 / DelightfulTTS) consisting of a Text Encoder, a Temporal Regulator, and an Articulatory Decoder, substituting mel-spectrogram targets with 14 continuous SPARC features (12 EMA coordinates across 6 upper/lower lip, incisor, and tongue regions, plus log-normalized pitch and loudness). The Text Encoder combines an eSpeak NG G2P frontend with a feed-forward Conformer (FFConformer) using rotary positional embeddings (RoPE) and separable convolutions (SepConv). Between the encoder and decoder, the Temporal Regulator integrates an unsupervised alignment module (One TTS Alignment via Viterbi decoding) and a SepConv-based duration predictor using log-duration MSE loss.

The Articulatory Decoder uses an identical FFConformer structure to map regulated features into the articulation space, optimized using mean squared error loss against teacher-extracted SPARC features, alignment loss, and duration loss. During training, teacher-extracted alignments govern duration expansion; during inference, the duration predictor drives articulation generation. Finally, predicted articulatory sequences are passed through a frozen, modified HiFi-GAN SPARC vocoder alongside speaker embeddings extracted via the frozen SPARC encoder to reconstruct the audio waveform.

## Experimental setup

Trained and evaluated on the LibriTTS-R dataset (train-clean-100, dev-clean, test-clean splits). Compared against ground-truth audio, the baseline SPARC inversion model, and YourTTS across three model variants (Base STArK, STArK with Aligner durations, and STArK with Aligner durations + Ground-Truth Prosody). Evaluated using DNSMOS (P.808, SIG, BAK, OVR), UTMOSv2, human naturalness MOS (NMOS), speaker embedding cosine similarity (SECS), word error rate (WER) using Whisper-large-v3-turbo, Pearson correlation coefficient (PCC), and dynamic time warping (DTW) distance. The base model comprises 73.7M parameters, trained for 32,000 steps on 4 L40S GPUs (48GB each) using the AdamW optimizer with an initial learning rate of 2e-4 and cosine annealing.

## Results

Base STArK achieves a UTMOSv2 of 2.97 and an NMOS of 2.8, while incorporating ground truth alignment and prosody raises its UTMOSv2 to 3.03 (tying SPARC) and NMOS to 3.3. In voice cloning evaluation, STArK outperforms YourTTS in speaker embedding cosine similarity (SECS of 0.426 vs 0.410 for YourTTS) despite never seeing speaker embeddings during training, benefiting from SPARC's speaker-content disentanglement. Word error rate sits at 6.25 for base STArK and drops to 6.01 with ground truth prosody, lagging behind YourTTS (4.58) due to the inherent difficulty of text-driven prosody prediction.

Articulatory similarity evaluations demonstrate strong performance for EMA features with a Pearson correlation coefficient of 0.905 and a dynamic time warping improvement (ΔDTW of -0.81) when incorporating aligner durations, whereas pitch yields lower correlation (0.533) due to the absence of explicit prosodic modeling.

| Model | P.808 ↑ | UTMOSv2 ↑ | NMOS ↑ | SECS ↑ | WER ↓ |
|---|---|---|---|---|---|
| GT | 3.71 | 3.25 | 3.9 | 1.000 | 2.39 |
| SPARC | 3.77 | 3.03 | 3.7 | 0.493 | 3.31 |
| STArK | 3.71 | 2.97 | 2.8 | 0.426 | 6.25 |
| + aligner | 3.84 | 2.85 | 2.9 | 0.446 | 6.30 |
| + prosody | 3.79 | 3.03 | 3.3 | 0.478 | 6.01 |
| YourTTS | 3.81 | 2.80 | 2.0 | 0.410 | 4.58 |

## Limitations

The model relies entirely on pseudo-labeled target data extracted from an auxiliary pre-trained inversion model (SPARC) rather than true recorded electromagnetic articulography data. Pitch modeling suffers from the lack of explicit high-level prosody conditioning, resulting in lower trajectory correlation compared to lip and tongue EMA coordinates. Evaluation is restricted to American English via LibriTTS-R, leaving multilingual robustness and cross-accent generalization unverified.

## Why read this

Speech researchers and engineers working on interpretable speech representations, text-to-speech synthesis, or articulatory phonetics should read this to see how text can be mapped directly to vocal tract kinematics. It provides a blueprint for leveraging articulatory bottle-necks to achieve zero-shot voice cloning without speaker-aware training.

## Code

- https://github.com/Lab-MSP/STArK/

## Applications

Scalable synthetic articulatory data generation, cross-linguistic analysis, disordered speech enhancement, phonetic research, and speech avatar simulation.

## Institutions / 機構

Carnegie Mellon University

## Related

- (link related pages by id as the wiki grows)
