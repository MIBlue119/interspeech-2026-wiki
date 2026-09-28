---
id: dian26_interspeech
category: prosody
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2585
pdf: https://www.isca-archive.org/interspeech_2026/dian26_interspeech.pdf
---

# Reconciling Dynamic Data Analysis with Linguistic Reality: Comparing Legendre Polynomial Modelling and GAMM Applied to Prosodic Contact

[PDF](https://www.isca-archive.org/interspeech_2026/dian26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dian26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2585)

**TL;DR** — This paper compares Legendre Polynomial modelling and Generalized Additive Mixed Modelling (GAMM) for analyzing contact-induced prosodic variation in continuation rises, finding both methods converge on identifying two distinct Cypriot Greek intonation patterns.

## Problem

Contact situations often cause intonational systems to intertwine, producing acoustic variability that challenges both phonological analysis and statistical modelling. Traditional static target-based views fail to capture the continuous nature of f0 contours, but choosing between modern dynamic data analysis techniques requires understanding how different mathematical representations map onto phonological interpretations.

## Method

The study analyzes semi-spontaneous speech and map-task data using two dynamic approaches on f0 trajectories extracted at 10 ms intervals and converted to semitones. Legendre Polynomial modelling fits a 4th-order polynomial (expressed in an orthogonal Legendre basis yielding coefficients c0-c4) evaluated via linear mixed-effects regression (LMER) with variety*tone as a fixed effect. GAMM uses a penalized spline framework with cubic regression splines via the mgcv package (bam function), incorporating random smooths for speakers and tokens.

## Results

The dataset comprises 8 speakers of Athenian Greek (ATG: 6F, 2M) and 13 speakers of Cypriot Greek (CYG: 10F, 3M) from Nicosia. Both analytical methods consistently identified two distinct CYG patterns: an ATG-like low-nuclear contour (CYG-nl) and a high-nuclear variant (CYG-nh). LMER on polynomial coefficients found significant effects of variety*tone for c1 (slope), c2 (curvature), and c3 (higher-order shape) (p < .001), showing CYG-nh has reduced overall slope, greater curvature, and an N-like configuration. GAMM comparison also revealed an overall significant effect of variety*tone (p < .001), demonstrating that CYG-nh and ATG differ significantly in shape around the high target between 29.2% and 49.5% of the normalized region of interest duration.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians and computational speech scientists studying intonation, bilingualism, and contact-induced prosodic variation across dialects.

## Limitations

Both dynamic modelling methods require a degree of token pre-classification based on researcher categorization, which is less viable for unstudied or lesser-described languages.

## Related

- (link related pages by id as the wiki grows)
