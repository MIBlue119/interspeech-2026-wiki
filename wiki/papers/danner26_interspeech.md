---
id: danner26_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2627
pdf: https://www.isca-archive.org/interspeech_2026/danner26_interspeech.pdf
---

# Vocal Tract Disparity and Potential Implications for Speaker Recognition

*Tiena Danner, Valeriia Vyshnevetska, Daniel Friedrichs, Steven Moran*

[PDF](https://www.isca-archive.org/interspeech_2026/danner26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/danner26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2627)

**TL;DR** — This study applies geometric morphometrics to vocal tract MRI data and demonstrates that male speakers exhibit significantly greater morphological and articulatory shape disparity than females, offering a biological explanation for human and machine speaker recognition biases.

## Key contributions

- Applies geometric morphometrics (GM) via Generalized Procrustes Analysis to midsagittal resting-state and dynamic real-time MRI vocal tract data across 73 adult speakers.
- Quantifies morphological disparity (within-group Procrustes variance), revealing that males possess an 8.4% larger centroid size and significantly greater articulatory shape variation overall (p = 0.006).
- Maps anatomical sources of variation, showing male variability concentrates in the laryngeal root, tongue body, and back vowels, while female variability concentrates in the hard palate and posterior pharyngeal wall.
- Provides a biological hypothesis connecting innate vocal tract morphological variance to documented performance discrepancies in automatic speaker recognition and human voice perception.

## Problem

Perceptual experiments and automatic speaker recognition systems consistently show higher recognition accuracies for male speakers compared to female speakers, even when trained on gender-balanced datasets. Prior work has attributed these discrepancies primarily to sociolinguistic factors, training data imbalances, or acoustic feature differences such as fundamental frequency and harmonic density. However, whether innate sex-related anatomical variations in vocal tract structure and articulation contribute to this recognition bias has remained unresearched. Understanding this gap is crucial because it addresses fundamental fairness and performance bottlenecks in modern speech technologies.

## Method

The analysis uses MRI acquisitions from 73 adult speakers (38 female, 35 male) from the USC Speech and Vocal Tract Morphology MRI Database, including a subset of 32 speakers (16 female, 16 male) producing target vowels /i, e, a, o, u/ in carrier words. Resting state morphology is captured from static volumetric midsagittal slices, while articulatory configurations are evaluated from 2D real-time MRI video frames along vowel trajectories. Two specialized landmarking protocols were executed using StereoMorph in R, establishing 11 resting landmarks (e.g., nasal tip, hard palate, glottis) and 13 articulatory landmarks (adding tongue tip, blade, dorsum, root).

Landmark configurations undergo Generalized Procrustes Analysis (GPA) to strip out translation, rotation, and scale variations, projecting shapes into a common Procrustes shape space. Principal Component Analysis (PCA) is subsequently performed on coordinates to visualize shape variation. Morphological disparity is defined as the mean squared Procrustes distance of individuals from their group centroid, calculated using the morphol.disparity function in geomorph with centroid size (Csize) included as a covariate to control for allometric scaling effects. Permutation tests (n = 999) assess statistical significance under group-permutation null hypotheses. Landmark-specific variance differences (male minus female) are visualized via heatmaps overlaid on mean configurations to localize anatomical regions driving disparity.

These design choices were made because geometric morphometrics preserves spatial geometry better than traditional linear biometric measurements, enabling direct statistical separation of isotropic size from localized shape variance during dynamic speech articulation.

## Experimental setup

The study analyzes 73 adult speakers (38 female, 35 male) from the USC Speech and Vocal Tract Morphology MRI Database. Articulatory evaluation focuses on a subset of 32 speakers producing vowels /i, e, a, o, u/. Metrics include Procrustes variance (morphological disparity), centroid size (Csize), and curvilinear vocal tract length measured in ImageJ. Analyses were implemented in R using geomorph and Morpho packages with 999 permutation iterations.

## Results

Males exhibit a larger mean centroid size of 1503.04 compared to 1386.16 in females, representing an 8.4% increase, alongside a substantially lower laryngeal position and longer vocal tracts. In the pooled articulatory analysis across vowels, males show significantly greater morphological disparity than females (p = 0.006), driven by wider spatial excursions in back vowels (/a/, /o/, /u/) and enhanced laryngeal/tongue-root adjustments. Resting-state disparity and individual per-vowel disparities did not reach statistical significance, though the directional trend consistently favored higher male variance (except for /e/).

| Condition / Group | Mean Centroid Size | Vocal Tract Length | Articulatory Procrustes Variance (Disparity) | p-value (Sex Difference) |
|---|---|---|---|---|
| Female Speakers | 1386.16 | Shorter | Lower | Baseline |
| Male Speakers | 1503.04 | Longer (+8.4% size) | Higher | p = 0.006 (Pooled) |

## Limitations

The study relies on a relatively modest sample size of 73 speakers overall and 32 speakers for dynamic articulatory vowel analysis, potentially limiting statistical power for per-vowel subsets. The analysis is strictly constrained to isolated vowels in carrier words rather than fluent, continuous natural speech or broader phonetic contexts. Furthermore, the dataset originates from a single controlled acoustic-MRI corpus, which may not capture global cross-linguistic or dialectal morphological diversity.

## Why read this

Speech and ML engineers building fair automatic speaker recognition systems should read this to understand that performance gaps against female speakers may stem from innate biological differences in vocal tract morphological disparity rather than solely data imbalance or feature extraction flaws.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving fairness and bias mitigation in automatic speaker recognition, forensic voice comparison, and acoustic-phonetic modeling.

## Related

- (link related pages by id as the wiki grows)
