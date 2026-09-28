---
id: li26la_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3473
pdf: https://www.isca-archive.org/interspeech_2026/li26la_interspeech.pdf
---

# Spatially-Augmented Sequence-to-Sequence Neural Diarization for Meetings

[PDF](https://www.isca-archive.org/interspeech_2026/li26la_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26la_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3473)

**TL;DR** — The paper introduces SA-S2SND, a spatially-augmented sequence-to-sequence neural diarization framework that injects explicit direction-of-arrival cues to achieve a relative diarization error rate reduction of over 19% on multi-channel meeting data.

## Problem

Meeting speaker diarization often suffers from overlapping speech, reverberation, and unreliable acoustic embeddings, while existing multi-channel methods either rely on speech enhancement that introduces distortions or blind feature fusion. Explicitly leveraging spatial cues can better separate simultaneous speakers, but robust multi-source localization under adverse conditions and effective cross-modal integration remain challenging. This work addresses the lack of direct spatial geometry modeling in modern sequence-to-sequence neural diarization (S2SND) backbones.

## Method

The framework incorporates direction-of-arrival (DOA) estimation via a lightweight 0.86M CRNN-based SRP-DNN model that computes direct-path inter-channel phase differences and iterative peak detection. These spatial azimuth probabilities are interpolated into a time-azimuth matrix and fused via residual addition into the hidden representations of an S2SND backbone comprising a ResNet34 extractor, Conformer encoder, and coupled representation/detection decoders. A two-stage training strategy first trains single-channel audio with simulated and real DOA maps (combining pseudo-DOA data generation and SRP-DNN extraction) using BCE and ArcFace losses, then extends to multi-channel inputs via a 2-block Transformer cross-channel attention module. Model variants include Small (16.56M parameters) and Medium (45.96M parameters) sizes operating in block-wise online and offline modes.

## Results

Evaluated on the AliMeeting dataset (and compound sets including DIHARD III, VoxConverse, and MISP2022) using Diarization Error Rate (DER) without oracle VAD or collar tolerance, SA-S2SND consistently outperforms S2SND baselines. In offline mode with single-channel configurations, SA-S2SND achieves a 7.4% relative DER reduction compared to standard S2SND. When combined with multi-channel cross-channel attention, the system yields over a 19% improvement over baseline architectures. The gains are particularly prominent on overlapping speech segments containing two or more simultaneous speakers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building robust multi-microphone meeting transcription pipelines, voice assistants, and conference recording analysis tools.

## Limitations

The framework assumes participants are primarily seated with limited elevation variation, relying heavily on azimuth estimation.

## Related

- (link related pages by id as the wiki grows)
