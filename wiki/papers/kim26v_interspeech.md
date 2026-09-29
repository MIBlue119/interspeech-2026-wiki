---
id: kim26v_interspeech
category: speech-coding
labels: [self-supervised, generative-model]
institutions: ["KAIST"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3108
pdf: https://www.isca-archive.org/interspeech_2026/kim26v_interspeech.pdf
---

# SDP-Codec: A Speaker-Decoupled Speech Codec with Pitch Injection for Low-Bitrate Coding and Zero-Shot Voice Conversion

*Hounsu Kim, Juhan Nam*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3108)

**Category:** `speech-coding` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — SDP-Codec is a single-stage, speaker-decoupled low-bitrate neural speech codec that uses continuous pre-quantization vq-wav2vec features and explicit soft-label F0 injection. It achieves competitive waveform reconstruction and strong zero-shot voice conversion at 0.45–0.52 kbps while recording the lowest speaker leakage among compared systems.

## Key contributions

- Proposes a speaker-decoupled, single-codebook neural codec trained via a unified single-stage optimization pipeline.
- Introduces explicit F0 injection via a pitch encoder-decoder with a soft-label pitch reconstruction objective to carry prosody without speaker leakage.
- Demonstrates that using continuous pre-quantization vq-wav2vec features rather than discrete units retains richer content details.
- Achieves competitive reconstruction and state-of-the-art zero-shot voice conversion speaker similarity (SECS) and naturalness (NMOS) at low bitrates.

## Problem

Existing speaker-decoupled neural speech codecs face a stark trade-off: multi-stage architectures with speaker perturbation (like LSCodec) or adversarial methods like gradient reversal add heavy training complexity and instability, whereas simpler designs (like BiCodec) fail to impose explicit disentanglement constraints, causing speaker information to leak into local content tokens. Furthermore, variable-frame-rate methods require extra duration predictors, and alternative codecs rely on generative flow-matching decoders instead of faithful waveform reconstruction. This lack of clean single-stage disentanglement degrades downstream speech language modeling and zero-shot voice conversion performance.

## Method

SDP-Codec is structured around two parallel branches: a local branch and a global branch, built entirely atop frozen pretrained components (vq-wav2vec encoder, WavLM extractor, and FCPE pitch extractor) during training. The local branch ingests continuous pre-quantization features Z from vq-wav2vec (retaining richer content than discrete Z-hat), which are further downsampled by residual CNN blocks with snake activations. Simultaneously, a frame-wise log-F0 contour extracted via FCPE is mean-and-variance normalized per segment to strip speaker-dependent range and fed into a pitch encoder. The compressed pitch and content features are concatenated, projected once, and jointly quantized through a compact single codebook (300 entries for small-scale 16k/24k models, 1536 entries for the 16k large-scale model, yielding 0.45-0.52 kbps).

After quantization, the features split into a waveform decoder and a pitch decoder. The pitch decoder reconstructs original unnormalized F0 using a 360-bin cent histogram supervised by a soft-label binary cross-entropy loss (Gaussian-blurred ground truth), and its hidden states are progressively concatenated layer-wise with the waveform decoder's hidden states to reinforce prosody. The global branch feeds time-invariant speaker embeddings—extracted via a perceiver resampler over WavLM features—into both decoders via position-agnostic cross-attention and adaptive snake modules.

The end-to-end training objective combines: (1) a multi-scale mel-spectrogram L1 loss; (2) a straight-through estimator commitment loss for the joint codebook; (3) an adversarial multi-scale time-domain LSGAN loss with L1 feature matching; and (4) the soft-label pitch reconstruction loss.

## Experimental setup

Evaluated on LibriSpeech (16 kHz, train subsets + MLS for large-scale) and LibriTTS (24 kHz). Small models (SDP-Codec-16-S, SDP-Codec-24-S) use 3.36 s segments; large-scale (SDP-Codec-16-L) uses 6 s segments on 4x RTX 5090 GPUs. Compared against baselines including LSCodec, BiCodec, MSRCodec, XCodec, FocalCodec, FlexiCodec, VARSTok, DualCodec, and EZ-VC. Primary metrics include UTMOS (perceptual quality), SECS (speaker similarity), HuBERT-CTC WER (intelligibility), F0 correlation, and STOI.

## Results

At 24 kHz (0.45 kbps), SDP-Codec-24-S matches LSCodec on UTMOS (4.054 vs 4.062) and SECS (0.935 vs 0.936) while substantially outperforming it in STOI (0.8798 vs 0.7511) and voice conversion speaker similarity (SECS 0.8133 vs 0.7965). In subjective evaluations, SDP-Codec-24-S achieves the highest 24 kHz voice conversion naturalness NMOS (3.89) among evaluated codecs, matching large-scale baseline Vevo (3.88). At 16 kHz, the large-scale model SDP-Codec-16-L attains the highest voice conversion SECS (0.8405) and NMOS (3.95) among all 16 kHz codec baselines (BiCodec, MSRCodec), alongside the lowest speaker probing accuracy (4.45%). Ablation tests prove that replacing the soft-label pitch loss with L2 degrades WER from 5.54 to 6.45, and using discrete Z-hat instead of continuous Z hurts content fidelity.

| System | Bitrate (kbps) | UTMOS (Rec) | SECS (VC) | WER (Rec) | F0 Corr (Rec) |
|---|---|---|---|---|---|
| LSCodec (24k) | 0.45 | 4.06 | 0.797 | 5.71 | 0.625 |
| SDP-Codec-24-S | 0.45 | 4.05 | 0.813 | 5.54 | 0.652 |
| BiCodec (16k) | 0.65 | 4.19 | 0.758 | 1.98 | 0.688 |
| MSRCodec (16k) | 0.52 | 4.14 | 0.740 | 1.69 | 0.637 |
| SDP-Codec-16-L | 0.52 | 4.00 | 0.841 | 3.08 | 0.669 |

## Limitations

The model exhibits higher Word Error Rate (WER) on reconstruction compared to specialized non-decoupled codecs (e.g., FocalCodec or MSRCodec), indicating that the compact bottleneck and decoupling mechanism still sacrifice some fine-grained linguistic detail. Evaluation is limited to English corpora (LibriSpeech/MLS), and the large-scale model was constrained to 16 kHz due to compute boundaries.

## Why read this

Speech and ML researchers building low-bitrate neural codecs or speech language models will find this essential reading for its novel integration of continuous SSL features with soft-label pitch injection, achieving state-of-the-art speaker decoupling without multi-stage training complexity.

## Code

- https://github.com/hanshounsu/sdpcodec-open

## Applications

Zero-shot voice conversion, low-bitrate neural audio compression, and discrete tokenization for speech language models.

## Institutions / 機構

KAIST

**Funding / 經費:** National Research Foundation of Korea

## Related

- (link related pages by id as the wiki grows)
