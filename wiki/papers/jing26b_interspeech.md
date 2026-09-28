---
id: jing26b_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1495
pdf: https://www.isca-archive.org/interspeech_2026/jing26b_interspeech.pdf
---

# Tongue-Shape Strategies for Standard Mandarin Retroflex Sibilants: A Preliminary Ultrasound and Unsupervised Clustering Study

[PDF](https://www.isca-archive.org/interspeech_2026/jing26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jing26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1495)

**TL;DR** — Using tongue ultrasound imaging and unsupervised clustering, this study identifies three primary tongue-shape strategies (domed, humped, and concave) used by speakers to produce Standard Mandarin retroflex sibilants, revealing strong individual articulatory preferences.

## Problem

Standard Mandarin retroflex sibilants are often non-prototypical and exhibit diverse articulatory realizations that vary across speakers, yet prior work has largely focused on homogeneous, well-studied regional varieties and acoustic descriptions rather than comprehensive articulatory analysis. Understanding this variation is crucial because Standard Mandarin is widely used as a lingua franca by speakers with diverse native Chinese backgrounds who may lack retroflex sibilants in their home dialects. This study addresses the gap by examining how speakers with varied regional origins differ in the tongue configurations they employ for retroflex production.

## Method

The authors collected synchronized audio and ultrasound tongue imaging (UTI) data from 5 female native speakers with diverse regional backgrounds producing rhyme-matched alveolar-retroflex minimal pairs in a fixed carrier sentence. Target frames at maximal constriction were extracted, and tongue contours were semi-automatically traced using EdgeTrak, yielding 42 discrete coordinate points per token. These contours were centered and subjected to an unsupervised clustering pipeline utilizing 21 contour-based shape descriptors (including global extent, curvature summary, extrema locations, slopes, and bimodality measures), optimized via Ward.D2 hierarchical clustering, dynamicTreeCut, and an automated grid search score function. The resulting six clusters were subsequently consolidated into three higher-level super-strategies (domed, humped, and concave) after outlier removal based on robust median and MAD distances.

## Results

Out of 21 tested contour features, 20 showed statistically significant differences across the six unsupervised clusters after FDR correction (pFDR < 0.001), with the clustering solution achieving a mean silhouette coefficient of 0.134 and moderate subsampling reproducibility (mean ARI = 0.541). A Monte Carlo chi-square test confirmed that super-strategy distributions differed significantly across speakers (p < 0.001), highlighting strong individual preferences. Center log-ratio (CLR) transformed speaker-level proportions grouped the five speakers into two main clusters (mean silhouette = 0.626) via hierarchical clustering, demonstrating systematic between-speaker variation in articulatory style.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, speech scientists, and speech language pathologists studying articulatory variability, phonetic variation, and accented speech in Standard Mandarin.

## Limitations

The study relies on a small exploratory sample of five speakers and uses a 10 fps ultrasound frame rate that primarily captures the tongue body while obscuring the extreme tongue tip and root.

## Related

- (link related pages by id as the wiki grows)
