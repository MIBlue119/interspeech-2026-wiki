---
id: bargum26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-796
pdf: https://www.isca-archive.org/interspeech_2026/bargum26_interspeech.pdf
---

# Improving Model Expressivity and Speaker Matching in Low-Latency Voice Conversion

[PDF](https://www.isca-archive.org/interspeech_2026/bargum26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bargum26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-796)

**TL;DR** — The paper proposes a low-latency, real-time voice conversion framework that uses an explicit excitation signal and complementary time-varying speaker embeddings to improve zero-shot speaker similarity, achieving a speaker embedding cosine similarity (SECS) of 80.83%.

## Problem

Real-time zero-shot voice conversion systems often fail to capture fine-grained speaker identity and expressive dynamics under strict causal latency requirements. Existing lightweight pipelines rely on static global speaker embeddings and discard crucial prosodic information during content encoding, creating a representational gap. This leads to compromised speaker similarity compared to non-real-time alternatives.

## Method

The framework features a parallel encoder-decoder architecture built with dilated residual 1D convolutions inspired by neural audio codecs. A content encoder predicts 100 soft HuBERT units via knowledge distillation, while a lightweight prosody encoder estimates fundamental frequency, periodicity, voiced/unvoiced flags, and loudness to synthesize an explicit sinusoidal-plus-noise excitation signal injected into the decoder. A complementary speaker encoder extracts time-varying speaker tokens that are fused with global speaker embeddings and content-prosody features using causal multi-head cross-attention blocks, adding roughly 1.7M parameters. Additionally, an encoder-specific perturbation training strategy applies pitch-shifting, noise addition, and parametric equalization to content inputs, alongside unit-based time-masking on speaker inputs, to enforce robust feature disentanglement.

## Results

Evaluated on 377 clean unseen test utterances from LibriTTS converted to 6 VCTK target speakers, the model achieves a Word Error Rate (WER) of 6.54%, Character Error Rate (CER) of 2.03%, Speaker Embedding Cosine Similarity (SECS) of 80.83%, and an F0 Pearson correlation coefficient of 0.885, outperforming baseline real-time models RT-VC and StreamVC in speaker matching metrics. Subjective evaluations show a mean similarity score (S-MOS) of 3.25 and naturalness (N-MOS) of 3.44. Ablation results confirm that removing the perturbation strategy or the complementary speaker encoder degrades SECS performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building real-time, low-latency voice conversion applications, live streaming voice changers, or real-time dubbing systems under constrained computational environments.

## Limitations

Subjective listening tests revealed no statistically significant differences in speaker similarity compared to baselines despite quantitative improvements, and audio quality (Q-MOS) slightly trails the StreamVC baseline.

## Related

- (link related pages by id as the wiki grows)
