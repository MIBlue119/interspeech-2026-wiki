---
id: kim26d_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-437
pdf: https://www.isca-archive.org/interspeech_2026/kim26d_interspeech.pdf
---

# Privacy-Preserving Speaker Verification with Multi-Granularity Feature Obfuscation

[PDF](https://www.isca-archive.org/interspeech_2026/kim26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-437)

**TL;DR** — This paper proposes a privacy-preserving speaker verification framework using FAcodec feature disentanglement and multi-granularity feature obfuscation, achieving an EER of 2.35% on VoxCeleb1-O while substantially reducing linguistic recoverability.

## Problem

Conventional speaker verification systems face a major trade-off between biometric authentication accuracy and user data privacy, as raw audio transmission exposes users to ASR eavesdropping and deepfake generation. Existing disentanglement methods either disrupt global temporal context through aggressive scrambling or suffer from a gap between high metric-based error rates (like ASR WER) and actual human perceptual intelligibility. This leaves a critical need for an obfuscation strategy that robustly hides linguistic content at both the machine and perceptual levels without destroying speaker verification utility.

## Method

The framework utilizes FAcodec to explicitly decompose speech into four factorized subspaces: content, prosody, timbre, and acoustic details. The content feature is entirely discarded, while the remaining non-content features are subjected to a hierarchical multi-granularity feature obfuscation module operating on the prosody representation. This module combines Global Temporal Aggregation (GTA), Local Temporal Aggregation (LTA), and Local Temporal Permutation (LTP) within a 0.5-second chunk window to mask linguistic traces across multiple temporal resolutions. The resulting obfuscated representations are concatenated and fed into an ECAPA-TDNN network to extract robust speaker embeddings.

## Results

Evaluated on the VoxCeleb1 test sets (O, E, H protocols) for utility and LibriSpeech test-clean for linguistic privacy, the proposed method achieves an EER of 2.35% on VoxCeleb1-O (a 54.7% relative improvement over the SafeEar baseline) alongside a WER of 98.83% and CER of 89.60%. Ablation studies confirm that discarding the content feature preserves low EER while improving privacy, and that the combination of GTA, LTA, and LTP effectively balances speaker verification utility with perceptual obfuscation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and security architects building privacy-preserving biometric authentication systems, voice-based login services, and client-side secure speech communication pipelines.

## Related

- (link related pages by id as the wiki grows)
