---
id: choi26g_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3131
pdf: https://www.isca-archive.org/interspeech_2026/choi26g_interspeech.pdf
---

# SpkGuideDOA: Speaker-wise Representation Guidance for Multiple Moving Speaker Localization

[PDF](https://www.isca-archive.org/interspeech_2026/choi26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3131)

**TL;DR** — SpkGuideDOA introduces an auxiliary guidance generator to inject speaker-wise representations into a spatial cue estimator via residual modulation, improving multi-speaker localization under spatial-spectral overlap.

## Problem

Localizing multiple moving speakers in dynamic acoustic environments is challenging because crossing or overlapping trajectories produce nearly identical spatial cues across sources. Conventional direct-path inter-channel phase difference (DP-IPD) models rely purely on spatial information and lack explicit mechanisms to resolve spatial ambiguity when speaker directions overlap. Consequently, tracking and assignment often fail in crowded acoustic scenes.

## Method

The framework couples a spatial cue estimator (SCE) with an auxiliary guidance generator (GG) that extracts speaker-wise representations from multichannel magnitudes using band-wise feature extraction, mobile inverted bottleneck convolutions, and segmented-and-pooled simple softmax-free attention (SP-SimA). A Mamba layer enforces temporal consistency, and a classifier outputs speaker-wise frequency-dependent guidance features. This guidance is injected into the SCE via residual modulation at a pooled resolution (H1=96, H2=48, H3=12, H4=256). Training uses a joint permutation-invariant training (Joint-PIT) strategy combining localization MSE loss and auxiliary binary cross-entropy VAD loss, where VAD gradients are detached from the SCE to act purely as a localization enhancer.

## Results

Evaluated on simulated LibriSpeech mixtures using a 12-channel 3D array and the LOCATA dataset, the proposed framework outperforms baseline models like IPDNet, IPDNet2, and TF-Mamba in localization accuracy. Ablation studies confirm that incorporating the speaker guidance module and Joint-PIT strategy successfully mitigates overlap-induced ambiguity without incurring excessive computational overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building real-time speech processing systems, smart speakers, or robotics audio front-ends that require robust multi-speaker tracking and direction-of-arrival estimation in dynamic cocktail-party environments.

## Related

- (link related pages by id as the wiki grows)
