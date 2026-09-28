---
id: jing26b_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1495
pdf: https://www.isca-archive.org/interspeech_2026/jing26b_interspeech.pdf
---

# Tongue-Shape Strategies for Standard Mandarin Retroflex Sibilants: A Preliminary Ultrasound and Unsupervised Clustering Study

*Zixi Jing, C. T. Justine Hui, Karen Huang, C. I. Watson*

[PDF](https://www.isca-archive.org/interspeech_2026/jing26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jing26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1495)

**TL;DR** — This study uses ultrasound tongue imaging and unsupervised clustering to reveal that Standard Mandarin retroflex sibilants are produced using three distinct tongue-shape super-strategies—domed, humped, and concave—with speakers exhibiting strong, individual-specific preferences.

## Key contributions

- Captured tongue configurations during production of Standard Mandarin retroflex sibilants using ultrasound tongue imaging (UTI) with 5 background-diverse native speakers.
- Proposed an unsupervised clustering framework based on 42-point contour shape descriptors, extracting 6 initial clusters consolidated into 3 super-strategies (domed, humped, concave).
- Performed speaker-level compositional analysis using centre log-ratio (CLR) transformation and Ward.D2 hierarchical clustering, demonstrating systematic individual articulatory style preferences.

## Problem

Standard Mandarin retroflex sibilants (/tù, tù^h, ù/) are non-prototypical retroflexes lacking the strong posteriority and sublingual cavity formation of true retroflexes. Prior work relies heavily on acoustic metrics like centre of gravity or focuses on narrowly studied dialects such as Beijing and Taiwan Mandarin, ignoring broad inter-speaker articulatory variation. This leaves a gap in understanding how speakers from diverse linguistic backgrounds achieve the same phonemic targets using different tongue configurations.

## Method

The study analyzes speech data from five female native speakers producing 21 rhyme-matched minimal pairs (42 characters) embedded in the carrier sentence 'wo ba du hao' ('I read well') alongside 76 filler/additional items, all restricted to Tone 1 to control for tonal effects. Ultrasound data were captured at 10 fps using a wireless UProbe-C ultrasound probe (depth 220 mm, dynamic range 80 dB) stabilized via a 3D-printed holder and synchronized with audio recorded via a RØDE NT1 5th Gen microphone in a whisper room. Target frames corresponding to maximal constriction were extracted, and tongue contours were semi-automatically traced in EdgeTrak as 42 discrete coordinate points, excluding extreme tongue tips and roots obscured by acoustic shadowing. Contours were centroid-centred to eliminate global probe offsets.

Unsupervised clustering was applied to a z-score standardised feature matrix comprising 21 shape descriptors (global extent, global curvature, extrema locations, front/back linear slopes, bimodality descriptors, and piecewise slope/curvature over six equal segments). An automated grid search utilizing Ward.D2 hierarchical clustering and dynamicTreeCut optimized a composite scoring function balancing silhouette coefficients, within-cluster variance of bimodality, and penalty for tiny clusters to arrive at 6 initial strategy clusters. Outliers were pruned using a robust median + 3*MAD threshold. These 6 clusters were consolidated into 3 super-strategies: domed (flat overall with broad elevation), humped (single posterior peak), and concave (bimodal profile with a mid-contour dip). Speaker-level proportions of these super-strategies were then CLR-transformed and clustered using hierarchical clustering with silhouette maximization and pvclust bootstrap validation.

## Experimental setup

Datasets comprised 5 female native speakers of diverse regional backgrounds (New Zealand/Fujian, Anhui, Malaysia/Fujian, Sichuan, Shanxi), reduced from an initial 6 due to poor ultrasound quality. Metrics include silhouette coefficients, Adjusted Rand Index (ARI) for cluster reproducibility (mean 0.541), Monte Carlo chi-square tests, and approximate unbiased (AU) bootstrap p-values. No traditional ASR/TTS baselines were evaluated since this is an exploratory articulatory phonetic study.

## Results

Unsupervised clustering of 42-point contours yielded 6 strategy clusters where 20 of 21 tested contour descriptors showed statistically significant separation (Kruskal-Wallis with FDR correction, p_FDR < 0.001, except seg4_curv at p_FDR = 0.106) with a mean silhouette coefficient of 0.134 and moderate subsampling stability (mean ARI = 0.541). Consolidating into three super-strategies (domed, humped, concave) and clustering speakers in centre log-ratio space revealed a statistically significant speaker-dependent strategy distribution (Monte Carlo chi-square, p < 0.001) with an optimal 2-group solution (mean silhouette = 0.626) separating Speakers {1, 4} from Speakers {2, 3, 5}. The study did not find distinct contour-based evidence for the 'bunched' retroflex configuration previously reported in Beijing Mandarin studies, likely due to the broader heritage and regional sampling.

## Limitations

The study is limited by a small sample size of only 5 female speakers, restricting generalizability. The ultrasound frame rate is restricted to 10 fps, capturing static target frames of maximal constriction rather than continuous dynamic trajectories. The imaging window obscures the extreme tongue tip and root due to mandible and hyoid shadowing, preventing direct observation of tongue-tip curling.

## Why read this

Phoneticians, speech scientists, and speech engineers modeling articulatory-to-acoustic mappings should read this to understand that Standard Mandarin retroflexes are realized via multiple non-canonical tongue shapes rather than a single prototypical curling gesture. It provides a concrete unsupervised pipeline for extracting tongue-shape super-strategies from ultrasound contours.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving articulatory modeling in speech synthesis and computer-aided pronunciation training (CAPT) systems for second-language learners of Mandarin.

## Related

- (link related pages by id as the wiki grows)
