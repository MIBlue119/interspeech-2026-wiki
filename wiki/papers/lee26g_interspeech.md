---
id: lee26g_interspeech
category: tts
labels: [efficient-on-device, self-supervised, streaming-real-time, generative-model]
institutions: ["Ajou University", "Samsung"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-710
pdf: https://www.isca-archive.org/interspeech_2026/lee26g_interspeech.pdf
---

# AccentDrift: Real-time Streaming Accent Conversion via Sparse Speech Tokenization

*Sang-Hoon Lee, Heejin Choi, Joun Yeop Lee, Sangjun Park*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-710)

**Category:** `tts` · **Labels:** `efficient-on-device`, `self-supervised`, `streaming-real-time`, `generative-model`

**TL;DR** — AccentDrift is a real-time streaming accent conversion system using sparse speech tokenization and hierarchical style adaptation, achieving a low latency of 520 ms while outperforming prior parallel models.

## Key contributions

- Proposed AccentDrift, the first real-time streaming accent conversion framework operating at 520 ms latency without requiring parallel accent-paired datasets or explicit accent labels.
- Designed a sparse semantic tokenizer leveraging a pre-trained cache-aware FastConformer ASR encoder and narrow improved Finite Scalar Quantization (iFSQ) to strip prosodic and acoustic leakage.
- Developed a hierarchical style adaptation framework that sequentially disentangles and injects target accent style via an accent adapter followed by zero-shot timbre preservation via a causal DiT and vocoder.
- Employed a gradient reversal layer (GRL) and stop-gradient operations to prevent cross-entropy loss gradients from re-injecting paralinguistic details into sparse semantic representations.

## Problem

Real-time accent conversion for second-language speakers in interactive environments remains underexplored because existing models heavily rely on costly parallel training data and parallel architectures that prevent low-latency streaming. Furthermore, conventional systems suffer from degraded audio quality and inflexible designs that fail to separately control accent and speaker timbre. These shortcomings hinder natural, real-time cross-accent communication in full-duplex spoken dialogue scenarios.

## Method

AccentDrift processes speech through a fully causal, four-stage pipeline consisting of a sparse semantic tokenizer, an accent adapter, a timbre adapter, and a neural vocoder. For feature extraction, the system utilizes the 17th layer of a pre-trained 24-layer cache-aware FastConformer ASR encoder (derived from Nvidia Nemotron Speech ASR) operating at 12.5 Hz, combined with an iFSQ bottleneck (configured at 128 dimensions and 9 scales) and phoneme CTC supervision. This narrow information bottleneck successfully strips paralinguistic features while retaining linguistic content.

The sparse semantic tokens are upsampled 2x via a causal transposed convolutional layer to 25 Hz and concatenated with accent style embeddings extracted by CommonAccent (XLS-R). A fully causal Transformer with rotary positional embeddings and a 6-second context window predicts dense semantic target tokens (using CosyVoice 3 targets) conditioned on the accent embedding. To stop reconstruction objectives from leaking prosody back into the sparse tokens, a gradient reversal layer (GRL) with a small scale ($\alpha_{grl} = 0.005$) and stop-gradient mechanisms are applied prior to the accent adapter, optimized via a combination of CTC loss and cross-entropy loss ($L_{ctc} + \lambda_{ce}L_{ce}$). 

For timbre preservation, predicted dense semantic tokens are passed through a 3-token lookahead convolutional layer (120 ms) and fed into a causal diffusion Transformer (DiT) conditioned on CAM++ speaker timbre embeddings. The DiT employs an Euler solver with 10 steps to generate Mel-spectrogram chunks, which are finally converted to waveforms by a causal HiFTNet vocoder using an 80 ms lookahead. The total system achieves an interactive streaming latency of approximately 520 ms.

## Experimental setup

Evaluated on LibriTTS, VCTK, and GLOBE V3 corpora for training diverse English accents, with subjective evaluations performed on 480 samples from L2-ARCTIC across 24 non-native speakers via Amazon Mechanical Turk. Objective metrics utilize 376 Indian English samples from VCTK, comparing against source/target ground truth, CosyVoice 3 reconstruction/VC baselines, and Vevo-Style. Metrics include source/target accent accuracy (Src/Tgt Acc via ECAPA-TDNN), accent similarity (ACC-SIM using CA-XLSR and CA-ECAPA), speaker similarity (SPK-SIM via WavLM-Large), Word Error Rate (WER via Whisper-Large-Turbo), UTMOS, and subjective naturalness/accent MOS. Models are trained on 8 NVIDIA A6000 GPUs for 1.1M steps with a batch size of 64 using a learning rate of $1 \times 10^{-4}$.

## Results

AccentDrift achieves a target accent accuracy of 60.1% (compared to 65.9% for non-streaming Vevo-Style and 5.0% for source ground truth) while maintaining a high speaker similarity (SPK-SIM) of 0.72. Crucially, the streaming model records a significantly lower Word Error Rate of 6.27 compared to Vevo-Style's 13.8, proving superior speech intelligibility. Ablations confirm that using the 17th layer of the FastConformer encoder paired with an iFSQ bottleneck of dimension 128 and scale 9 (d128s9) yields the optimal balance between suppressing source accent (10.6% Src Acc) and ensuring intelligibility (6.27 WER).

| System | Streaming (Latency) | Tgt Acc ($\uparrow$) | SPK-SIM ($\uparrow$) | WER ($\vphantom{\downarrow}\downarrow$) | UTMOS ($\uparrow$) |
|---|---|---|---|---|---|
| GT (Target L1) | - | 65.2 | - | - | 4.11 |
| GT (Source L2) | - | 5.0 | - | - | 3.98 |
| CosyVoice 3 (VC) | $\times$ | 5.0 | 0.26 | 4.38 | 4.19 |
| Vevo-Style | $\times$ | 65.9 | 0.57 | 13.8 | 3.90 |
| AccentDrift (Ours) | $\checkmark$ (0.5s) | 60.1 | 0.72 | 6.27 | 4.10 |

## Limitations

While achieving low-latency streaming at 0.5s, the current decoder architecture retains sequential separation between the Mel generator and vocoder, which could be further streamlined. The evaluation scope is restricted to English accents and relies on automated classifiers (ECAPA-TDNN and XLSR) alongside crowdsourced MOS, leaving multi-lingual generalization and complex prosodic transfer across non-Indo-European language pairs unverified.

## Why read this

Speech and ML engineers building real-time interactive voice translation or accent modification systems should read this paper to learn how sparse information bottlenecks and GRL regularization can prevent paralinguistic leakage in semantic tokenizers.

## Code

- https://accentdrift.github.io/demo/

## Applications

Real-time computer-assisted language learning (CALL), cross-accent conversational AI assistants, and full-duplex spoken translation systems.

## Institutions / 機構

Ajou University, Samsung

## Related

- (link related pages by id as the wiki grows)
