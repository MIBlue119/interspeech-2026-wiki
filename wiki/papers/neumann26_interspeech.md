---
id: neumann26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2841
pdf: https://www.isca-archive.org/interspeech_2026/neumann26_interspeech.pdf
---

# Reducing Measurement Noise in Digital Speech Biomarkers: Interpretable Composite Index Scores for Longitudinal ALS Monitoring in Clinical Trials

[PDF](https://www.isca-archive.org/interspeech_2026/neumann26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/neumann26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2841)

**TL;DR** — This paper evaluates composite speech index scores derived from a natural history dataset to reduce measurement noise and monitor amyotrophic lateral sclerosis (ALS) progression in clinical trials, achieving excellent test-retest reliability (ICC > 0.9).

## Problem

Single digital speech measures for remote monitoring of amyotrophic lateral sclerosis are often susceptible to high measurement noise, recording variability, and participant fatigue, leading to large standard errors of measurement and minimal detectable changes that hinder their use as clinical trial endpoints. Standard clinical rating scales also lack sensitivity to early bulbar impairment. Aggregating features into composite index scores addresses these reliability challenges and reduces multiplicity issues in clinical trials.

## Method

The study constructs weighted linear combinations of 10 speech features extracted from reading passages, sentence intelligibility tests, diadochokinesis, and picture descriptions using Praat, the Montreal Forced Aligner, and spaCy. Feature weights are optimized using four methods (equal weights, logistic regression, linear discriminant analysis, and a stepwise linear model) targeting two clinical constructs: bulbar impairment and perceived listener effort. Models are trained on a natural history dataset of 146 ALS patients and validated on an independent Phase 1b clinical trial dataset comprising 54 participants with biweekly assessments for up to 40 weeks. Psychometric evaluations apply linear mixed-effects models and Classical Test Theory metrics including intraclass correlation coefficients and minimal detectable change.

## Results

Evaluated on the VRG50635 ALS clinical trial dataset, all four composite index score variants achieved excellent test-retest reliability with intraclass correlation coefficients (ICC) ranging from 0.91 to 0.95, outperforming a median individual feature ICC of 0.82. The minimal detectable change at 95% confidence dropped below the between-subject standard deviation for all composite scores (58% to 84% of SD), whereas 7 of 10 individual features had error floors exceeding their own standard deviation. Composite scores exhibited strong correlations (|rho| > 0.6) with the ALS Functional Rating Scale-Revised (ALSFRS-R) and percent predicted slow vital capacity, alongside moderate correlations with neurofilament light chain levels.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers, clinical researchers, and biostatisticians developing digital health technologies and remote monitoring endpoints for neurodegenerative disease clinical trials.

## Limitations

The generalizability of the composite weights is demonstrated specifically for ALS using remote web-based assessments, and performance relies on longitudinal imputation strategies for handling missing trial data.

## Related

- (link related pages by id as the wiki grows)
