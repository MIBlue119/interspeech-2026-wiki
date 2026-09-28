---
id: hu26e_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1614
pdf: https://www.isca-archive.org/interspeech_2026/hu26e_interspeech.pdf
---

# Joint Fullband-Subband Modeling for High-Resolution SingFake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/hu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1614)

**TL;DR** — Sing-HiResNet proposes a joint fullband-subband modeling framework operating on 44.1 kHz audio to capture high-frequency spectral fingerprints for robust singing voice deepfake detection.

## Problem

Existing singing voice deepfake detection systems adapt speech-centric models operating at a 16 kHz sampling rate, which discards crucial high-frequency harmonic and breath-related cues above 8 kHz due to the Nyquist theorem. Because professional singing exhibits complex acoustic properties and synthesis artifacts that are unevenly distributed across the entire frequency spectrum, these narrowband models fail to catch sophisticated forgeries.

## Method

The paper introduces Sing-HiResNet, which processes log-power spectrograms from 44.1 kHz audio (spanning 0-22.05 kHz). Phase 1 uses a ResNet18 fullband expert for global context and multiple subband experts that divide the frequency spectrum into $N \in \{1, 2, 4, 8\}$ non-overlapping segments. Phase 2 integrates these models using four distinct fusion strategies: decision-level aggregation, feature-level concatenation via an MLP, cross-expert interaction, and cross-expert distillation.

## Results

Evaluated on the WildSVDD dataset, the proposed framework significantly outperforms traditional 16 kHz models and baseline fullband approaches by effectively leveraging high-frequency subband components. Systematic comparisons across different partitioning numbers $N$ and fusion strategies demonstrate that combining fullband global context with targeted high-resolution subband experts yields state-of-the-art detection performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and security researchers building deepfake detection systems for audio forensics and content moderation platforms to identify unauthorized singing voice imitations.

## Related

- (link related pages by id as the wiki grows)
