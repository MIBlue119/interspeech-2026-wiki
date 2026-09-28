---
id: xu26c_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-702
pdf: https://www.isca-archive.org/interspeech_2026/xu26c_interspeech.pdf
---

# HRIR-Former: Grid-Free Time-Domain Reconstruction of Head-Related Impulse Responses with a Spatially Encoded Transformer

[PDF](https://www.isca-archive.org/interspeech_2026/xu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-702)

**TL;DR** — HRIR-Former is a time-domain, grid-free binaural Transformer for spatial up-sampling of head-related impulse responses from sparse measurements, achieving superior interaural level and time difference accuracy compared to frequency-domain baselines.

## Problem

Acquiring individualized head-related impulse responses (HRIRs) requires expensive and tedious anechoic measurements. Prior machine learning approaches typically operate in the frequency domain, rely on minimum-phase assumptions or separate timing models, and are constrained to fixed direction grids, leading to degraded temporal fidelity and spatial continuity. Overcoming these limitations is crucial for rendering realistic spatial audio in virtual and augmented reality.

## Method

The method casts HRIR spatial up-sampling as masked inpainting over spherical direction sets, combining an MLP-based signal encoder with multi-frequency sinusoidal positional embeddings and layer normalization. A 3-layer Transformer encoder with 4 attention heads captures global spatial dependencies across irregularly sampled points, followed by a shared MLP decoder and masked fusion to preserve observed responses. A lightweight post-Transformer Conv1D temporal refinement module ensures local directional coherence. Training uses a combined loss function comprising a time-domain reconstruction loss, an orthonormal DFT-based complex HRTF spectral loss, and auxiliary interaural time difference (ITD) and interaural level difference (ILD) supervision heads.

## Results

Evaluated on the SONICOM database using 180 subjects for training and 20 for validation across measurement sparsity levels of M = 3, 5, 19, and 100, HRIR-Former is compared against six baselines including Nearest Neighbor, HRTF-Sel-ITD, HRTF-Sel-LSD, NF-CbC, NF-LoRA, and RANF. It achieves the lowest interaural level difference error (ILD-E) across all sparsity levels while maintaining competitive interaural time difference errors (ITD-E). Ablation studies validate the effectiveness of the proposed modules and demonstrate that minimum-phase preprocessing is unnecessary.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers building virtual reality, augmented reality, or object-based audio systems use this model to personalize and up-sample binaural spatial audio renderers from sparse user measurements.

## Related

- (link related pages by id as the wiki grows)
