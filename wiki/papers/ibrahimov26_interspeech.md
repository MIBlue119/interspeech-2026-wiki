---
id: ibrahimov26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1071
pdf: https://www.isca-archive.org/interspeech_2026/ibrahimov26_interspeech.pdf
---

# On the Role of the Tongue Region in Ultrasound-to-Acoustic Mapping

[PDF](https://www.isca-archive.org/interspeech_2026/ibrahimov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ibrahimov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1071)

**TL;DR** — This paper evaluates whether the tongue region is the primary source of acoustic information in ultrasound-to-acoustic mapping, discovering that CNNs rely on broader image context rather than tongue-specific features.

## Problem

Ultrasound-based silent speech interfaces convert tongue movements into acoustic features, but synthesized speech quality remains limited. A core assumption in this modality has been that the tongue outline itself drives the mapping, yet models may actually exploit surrounding tissue, shadows, or imaging artefacts. Understanding this interaction is critical to determining whether current performance ceilings stem from architectural flaws or misattributed input dependencies.

## Method

The authors test this hypothesis using two techniques on data from four speakers in the UltraSuite-TaL80 corpus: controlled input manipulation (replacing the extracted tongue region with background pixels) and a dual encoder architecture with cross-attention gating. The dual encoder processes the full ultrasound frame (64x128 pixels) in a full-image stream and a binary tongue mask stream (extracted via adaptive Gaussian thresholding, connected components, and temporal stabilization) across four parallel stages. Global Average Pooling extracts stage-level descriptors into a 300-dimensional vector, which feeds a 1000-unit fully connected layer mapping to 80-dimensional mel-spectrograms. HiFi-GAN generates final speech waveforms for evaluation.

## Results

Evaluating performance via mel-spectrogram MSE, MCD, PESQ, and MOSnet, removing the tongue region entirely produced no statistically significant degradation across all four speakers (p > 0.05). Similarly, the proposed dual encoder yielded no significant performance improvements over the standard 2D-CNN baseline, with the baseline even outperforming it on speaker 01fi's MSE (0.3521 vs 0.4341) and speaker 02fe's MOSnet. However, Grad-CAM visualizations confirmed that the dual encoder successfully directs its internal activations specifically to the tongue region, unlike the unguided baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers designing ultrasound-based silent speech interfaces and interpretable articulatory-to-acoustic mapping models.

## Limitations

The study is restricted to four speakers from a single corpus and evaluates frame-by-frame static mapping without explicit temporal modeling over longer contexts.

## Related

- (link related pages by id as the wiki grows)
