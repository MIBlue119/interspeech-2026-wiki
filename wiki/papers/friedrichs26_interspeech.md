---
id: friedrichs26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1883
pdf: https://www.isca-archive.org/interspeech_2026/friedrichs26_interspeech.pdf
---

# Acoustic Pharyngometry as an Auditable Anchor for Cross-Speaker EMA Normalization

[PDF](https://www.isca-archive.org/interspeech_2026/friedrichs26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/friedrichs26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1883)

**TL;DR** — This paper evaluates an auditable speaker normalization technique for electromagnetic articulography (EMA) that combines palate-length scaling with a pharyngometry-anchored anterior-posterior warp, achieving a 16.5% total reduction in between-speaker trajectory dispersion.

## Problem

Cross-speaker analyses using electromagnetic articulography (EMA) are severely confounded by anatomical differences in vocal-tract morphology. Standard head corrections and palate-based reference systems reduce within-speaker variance but fail to eliminate morphology-driven spatial offsets across speakers. This hinders robust cross-speaker geometric comparisons and the development of speaker-independent articulatory-to-acoustic mappings.

## Method

The authors introduce a palate-referenced normalization approach combining uniform palate-length scaling with a low-parameter, piecewise anterior-posterior (A-P) warp anchored by acoustic pharyngometry. Acoustic pharyngometry area functions are processed via a Savitzky-Golay filter to extract an oral-cavity expansion peak and an oral-pharyngeal junction minimum, yielding a unitless internal anchor proportion. Using a German multimodal dataset of 14 speakers with synchronous EMA and pharyngometry, the method maps individual oral landmarks to a canonical template with fixed endpoints. Evaluations utilize leave-one-speaker-out (LOSO) L2-regularized ridge regression for formant prediction and multinomial logistic regression for speaker identification.

## Results

Across 14 speakers and diadochokinetic (DDK) sequences, uniform scaling reduced mean between-speaker 6D tongue dispersion from 31.28 mm to 26.36 mm, while adding the pharyngometry-anchored warp further decreased it slightly to 26.13 mm (a total reduction of 16.5%). However, leave-one-speaker-out ridge regression failed to improve F1 and F2 formant predictions from EMA trajectories after applying the warp compared to scale-only normalization. Furthermore, speaker identification accuracy from absolute position trajectories remained high and actually increased from 75.1% to 90.2% after normalization, but plummeted to chance levels after mean-centering or using velocity-only features.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians and speech scientists studying cross-speaker articulatory kinematics, speech production mechanisms, and articulatory-acoustic relationships.

## Limitations

The 1D A-P warp fails to capture vertical tongue shaping, palate curvature, or pharyngeal configurations critical for acoustic mapping, leaving persistent speaker-specific structures.

## Related

- (link related pages by id as the wiki grows)
