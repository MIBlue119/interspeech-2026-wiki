---
id: danner26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2627
pdf: https://www.isca-archive.org/interspeech_2026/danner26_interspeech.pdf
---

# Vocal Tract Disparity and Potential Implications for Speaker Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/danner26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/danner26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2627)

**TL;DR** — The paper applies geometric morphometrics to vocal tract MRI data and demonstrates that male speakers exhibit significantly greater morphological disparity and articulatory shape variation than female speakers, potentially explaining performance biases in human and machine speaker recognition.

## Problem

Both human listeners and automatic speaker recognition systems consistently recognize male speakers with higher accuracy than female speakers, even when trained on gender-balanced datasets. The underlying physiological and anatomical reasons for this discrepancy have remained unclear. Understanding whether innate variations in vocal tract morphology contribute to these performance gaps is crucial for designing fairer voice technologies.

## Method

The authors analyze resting state midsagittal slices and 2D real-time MRI articulatory configurations of vowels (/i, e, a, o, u/) from 73 adult speakers (38 female, 35 male) drawn from the USC Speech and Vocal Tract Morphology MRI Database. Vocal tract morphology is quantified by placing 2D anatomical landmarks using StereoMorph, followed by Generalized Procrustes Analysis (GPA) to remove non-shape variation. Principal Component Analysis (PCA) is used to visualize multivariate shape variation, centroid size is used as a covariate to control for allometry, and morphological disparity is computed as within-group Procrustes variance tested via permutation tests.

## Results

Male speakers exhibit an approximately 8.4% larger overall vocal tract centroid size (1503.04 vs. 1386.16) and significantly greater shape variation during articulation in a pooled analysis across vowels (p = 0.006). In resting state configurations, males show greater variability in the anterior nasal cavity, mandibular symphysis, lower dental arch, and anterior laryngeal complex, whereas females show higher variation in the maxillary arch and posterior pharyngeal wall. During vowel articulation, male disparity is especially prominent in back vowels (/a/, /o/, /u/) around the laryngeal root and tongue body, whereas females show higher variability in the tongue dorsum for front vowels and the chin tip across all vowels.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on algorithmic fairness, bias mitigation, and robust feature extraction in automatic speaker verification systems.

## Limitations

The analysis is restricted to static resting states and isolated vowel productions rather than continuous, fluent speech.

## Related

- (link related pages by id as the wiki grows)
