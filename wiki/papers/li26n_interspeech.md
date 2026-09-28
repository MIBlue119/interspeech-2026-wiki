---
id: li26n_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-948
pdf: https://www.isca-archive.org/interspeech_2026/li26n_interspeech.pdf
---

# Online Audio-Visual Target Speaker Extraction with Viseme-Guided Lightweight Visual Pretraining

[PDF](https://www.isca-archive.org/interspeech_2026/li26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-948)

**TL;DR** — This paper proposes a lightweight, online audio-visual target speaker extraction system guided by viseme representations obtained through cross-modal distillation, achieving superior separation performance under low computational budgets.

## Problem

Current audio-visual target speaker extraction (AV-TSE) systems largely rely on non-causal architectures and high-complexity visual front-ends pretrained for visual speech recognition, making them unsuitable for real-time streaming on resource-constrained edge devices. While lightweight alternatives like visual voice activity detection reduce computation, they fail to provide the fine-grained articulatory dynamics necessary to disentangle speakers in fully overlapping acoustic mixtures. Developing an accurate, causal, and computationally efficient visual cue is therefore critical for practical deployment.

## Method

The visual front-end is pretrained using viseme-level supervision derived from text transcripts converted via G2P and phoneme-to-viseme mapping. To enable causal streaming, a teacher-student distillation framework is employed where a non-causal audio-visual teacher guides a fully causal video-only student. The student replaces standard components with a causal 3D convolution, a ShuffleNetV2 visual backbone, and an Emformer streaming transformer utilizing a memory bank. The downstream separator modifies TF-SkiMNet by swapping its convolutional Local-T module for a channel-wise LSTM (hidden size 32) to better capture long-range temporal context, trained using a combination of a magnitude-spectrum reconstruction loss and a time-domain SI-SNR loss.

## Results

Evaluated on LRS2-Mix, LRS3-Mix, and Vox2-Mix datasets, the proposed viseme-guided TF-SkiMNet system outperforms baselines relying on jointly learned mouth cues or heavy VSR encoders. On LRS2-Mix, the proposed method achieves an SI-SNR of 10.07 dB, PESQ of 2.07, and ESTOI of 0.81, compared to 7.17 dB SI-SNR for the mouth-cue baseline and 8.88 dB for the VSR baseline. In terms of efficiency, the proposed system operates at a total computational budget of 7.7 G MACs (3.3 G for the visual front-end and 4.4 G for the separator). Ablations confirm that the cross-modal distillation strategy recovers performance lost by moving to a causal student architecture.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time communication tools, mobile devices, and smart meeting systems requiring robust target speech extraction from multi-speaker acoustic mixtures under strict latency and power constraints.

## Related

- (link related pages by id as the wiki grows)
