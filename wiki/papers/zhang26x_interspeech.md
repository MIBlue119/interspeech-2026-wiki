---
id: zhang26x_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1621
pdf: https://www.isca-archive.org/interspeech_2026/zhang26x_interspeech.pdf
---

# VoxEffects: A Speech-Oriented Audio Effects Dataset and Benchmark

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1621)

**TL;DR** — The paper introduces VoxEffects, a speech-oriented audio effects dataset, benchmark, and reproducible rendering pipeline, alongside an AudioMAE-based multi-task baseline that achieves robust effect presence detection and parameter estimation under realistic degradations.

## Problem

Real-world speech recordings undergo post-production processing operations that alter signal statistics and introduce artifacts, yet existing datasets lack precise annotations for these audio effects. This limits systematic study in speech audio effect identification (AEI), which is crucial for content understanding, engineering assistance, and forensic attribution. Standardizing this task requires handling realistic capture- and platform-side distribution artifacts that music-oriented or binary manipulation detectors fail to adequately address.

## Method

The authors model a canonical speech post-production chain comprising six effects (denoising, dynamic range compression, equalization, de-essing, reverberation, and limiting) using the Pedalboard library, combining curated presets into 2,520 configurations. Source clean speech is gathered from anechoic corpora (DAPS, EARS, TSP) and processed with an optional robustness module applying capture and platform degradations (noise, resampling, codecs) in a curriculum learning setup. The AudioMAE-Fx baseline fine-tunes a pretrained AudioMAE encoder using a multi-task objective combining multi-label binary cross-entropy for effect presence, cross-entropy for preset classification, active-count classification, and L1 loss for scalar and vector intensity regression.

## Results

Evaluated on in-domain test splits and an out-of-domain VCTK test corpus across five degradation settings, robust fine-tuning substantially improves macro-averaged presence detection and preset classification accuracy under mismatched test conditions. For instance, training with degradation augmentation raises in-domain presence detection macro-accuracy from 75.42% to 88.48% under the heaviest 'Both' degradation setting. Fine-grained preset classification remains challenging due to 2,520 overlapping classes, but robustness training consistently mitigates performance drops across domain shifts and artifact variations.

## Code

- https://github.com/nii-yamagishilab/VoxEffects

## Applications

Speech engineers, audio forensics experts, and developers of speech content understanding systems can use this dataset and baseline to automatically identify and estimate post-production processing chains in wild audio.

## Limitations

Fine-grained preset classification yields low Top-1 accuracy due to perceptually overlapping parameter settings, and scalar intensity regression errors remain comparable across configurations, indicating room for future improvement.

## Related

- (link related pages by id as the wiki grows)
