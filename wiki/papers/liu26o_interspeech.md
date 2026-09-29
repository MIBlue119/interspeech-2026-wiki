---
id: liu26o_interspeech
category: tts
labels: [self-supervised, generative-model]
institutions: ["Wuhan University", "Chinese University of Hong Kong, Shenzhen", "OPPO"]
code: https://demo-whispervc.github.io/demo-whispervc/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2002
pdf: https://www.isca-archive.org/interspeech_2026/liu26o_interspeech.pdf
---

# WhisperVC: Decoupled Cross-Domain Alignment and Speech Generation for Low-Resource Whisper-to-Normal Conversion

*Dong Liu, Juan Liu, Wei Ju, Yao Tian, Ming Li*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2002)

**Category:** `tts` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — WhisperVC is a three-stage, decoupled framework for whisper-to-normal (W2N) speech conversion that uses a Conformer-based VAE with soft-DTW for domain alignment and an optimal-transport flow matching residual generator, achieving a CER of 16.93% and DNSMOS of 3.07 on Mandarin data.

## Key contributions

- Whisper-specific domain alignment via a continuous dual-encoder VAE and soft-DTW regularization over pretrained Whisper-large-V3 content representations.
- Decoupled coarse-to-fine generation combining a deterministic transformer decoder with an optimal-transport conditional flow matching (OT-CFM) residual refiner.
- A gated dual-path routing mechanism using a lightweight sigmoid classifier that unifies W2N and standard voice conversion (VC) in a single architecture.
- Vocoder adaptation strategy fine-tuning HiFi-GAN on predicted mel-spectrograms to minimize train-test acoustic distribution mismatch.

## Problem

Whispered speech lacks vocal-fold excitation, has reduced energy, and exhibits shifted formants, causing severe intelligibility and naturalness drops when converted to normal speech. Existing single-stage joint frameworks suffer from extreme spectral and temporal mismatches between whisper and normal styles, leading to unstable voicing under limited training data. Furthermore, generic zero-shot voice conversion models fail to handle cross-domain acoustic gaps properly, resulting in high content error rates (CER often exceeding 40%).

## Method

WhisperVC operates in three sequential components. First, content features extracted via a fine-tuned Whisper-large V3 (1280-d at 16 kHz) pass through a Conformer-based continuous VAE with a shared decoder and dual encoders for paired whisper and normal data. A soft-DTW loss aligns temporal and representational structures, while a sigmoid-based gated routing mechanism determines whether input features require VAE alignment or can bypass it (for normal-speech VC).

Second, length-channel alignment (LCA) linearly interpolates 16 kHz content features to match 22.05 kHz mel frames, followed by a convolutional projection. A feed-forward Transformer acoustic decoder conditioned on a 256-d SimAM-ResNet34 speaker embedding (pretrained on VoxBlink2, fine-tuned on VoxCeleb2) predicts a deterministic coarse mel-spectrogram using an L1 reconstruction loss. An optimal-transport conditional flow matching (OT-CFM) network then models the residual difference between ground-truth and coarse mels, taking Gaussian noise transported along a linear path conditioned on time, speaker embedding, and content features.

Third, a HiFi-GAN vocoder is adapted by fine-tuning directly on generated mel-spectrograms to bridge distribution gaps. The complete pipeline unifies W2N and standard VC, synthesizing 22.05 kHz audio.

## Experimental setup

Evaluated on Mandarin AISHELL6-Whisper (~30 hours of paired whispered-normal speech) and English wTIMIT (speaker-disjoint seen/unseen splits) paired with LibriTTS-clean. Baselines include Seed-VC, FreeVC, WESPER, and DistillW2N. Metrics include DNSMOS (ovrl/sig/bak/p808), UTMOS, WVMOS, NISQA, Character Error Rate (CER) using Whisper-large-V3-turbo, SECS, WeSpeaker/WavLM speaker cosine similarities, and SpeechBERTScore.

## Results

On Mandarin AISHELL6-Whisper, WhisperVC achieves a DNSMOS_ovrl of 3.072, UTMOS of 2.831, WVMOS of 3.352, and a significantly reduced CER of 16.932% compared to raw whispered input (CER 22.937%) and zero-shot Seed-VC (CER 46.423%). In normal-to-normal VC tasks on the same dataset, WhisperVC attains a CER of 3.331% and WavLM similarity of 0.743, outperforming Seed-VC on content preservation.

Ablations demonstrate that removing the VAE alignment module causes catastrophic failure (CER spiking to 40.155%), and substituting residual CFM with full-mel generation or coarse-only generation degrades perceptual quality or intelligibility (coarse-only CER 18.729%). On English wTIMIT, WhisperVC records the lowest CER (11.389%) among all tested models, including WESPER (30.724%) and DistillW2N (36.028%).

| Model | DNSMOS_ovrl | UTMOS | CER (%) | WavLM Sim | SECS |
|---|---|---|---|---|---|
| Whispered Input | 1.102 | 1.308 | 22.937 | 0.784 | 0.582 |
| Seed-VC (zero-shot) | 2.868 | 2.467 | 46.423 | 0.952 | 0.851 |
| Coarse-only | 2.716 | 2.797 | 18.729 | 0.943 | 0.529 |
| OT-CFM (Residual) | 2.652 | 2.795 | 18.266 | 0.944 | 0.528 |
| WhisperVC (Proposed) | 3.072 | 2.831 | 16.932 | 0.945 | 0.816 |
| Ground Truth | 3.141 | 2.868 | - | 1.000 | 1.000 |

## Limitations

The framework relies on paired whispered-normal data (e.g., AISHELL6-Whisper or wTIMIT) to train the domain-alignment VAE and the gated classifier, limiting scaling to languages completely devoid of parallel whisper-normal resources. Real-time streaming deployment is currently limited by the multi-stage architecture and flow matching inference steps. Evaluation is primarily demonstrated on Mandarin and English under clean or controlled recording setups.

## Why read this

Speech engineers and researchers building low-resource style transfer or voice restoration systems will benefit from seeing how decoupled cross-domain VAE alignment combined with residual flow matching resolves severe acoustic and temporal mismatches without full-mel generation instability.

## Code

- https://demo-whispervc.github.io/demo-whispervc/

## Applications

Privacy-preserving whispered communication in noise-sensitive zones, nonvocal communication aids, and speech rehabilitation tools for post-surgical vocal-fold patients.

## Institutions / 機構

Wuhan University, Chinese University of Hong Kong, Shenzhen, OPPO

**Funding / 經費:** National Natural Science Foundation of China, Yangtze River Delta Science and Technology Innovation Community Joint Research Project, OPPO

## Related

- (link related pages by id as the wiki grows)
