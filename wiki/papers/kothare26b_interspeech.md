---
id: kothare26b_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2850
pdf: https://www.isca-archive.org/interspeech_2026/kothare26b_interspeech.pdf
---

# Speech and Video Biomarkers Exhibit Reduced Within-Subject Variability in Early Parkinson’s Disease and Resistance to Placebo and Hawthorne Effects

[PDF](https://www.isca-archive.org/interspeech_2026/kothare26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kothare26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2850)

**TL;DR** — Automated audiovisual digital biomarkers for early Parkinson's disease demonstrate significantly lower within-subject variability and higher resistance to placebo and Hawthorne effects than clinician-rated MDS-UPDRS scores.

## Problem

Standard clinical scales like the MDS-UPDRS are subjective, episodic, and prone to substantial noise from placebo responses and Hawthorne effects, making it difficult to detect subtle disease progression or therapeutic efficacy in early Parkinson's disease clinical trials. This measurement variability frequently obscures true treatment signals and contributes to clinical trial failures in central nervous system disorders. Objective digital biomarkers could resolve these limitations, but their longitudinal stability and susceptibility to contextual trial biases relative to clinical scales remain unquantified.

## Method

Data from 50 participants with early untreated Parkinson's disease in a 12-week Phase 2 clinical trial were analyzed, capturing remote speech, facial expression, and finger-tapping via a conversational virtual agent platform. Participants completed bi-weekly audiovisual tasks including consonant-vowel repetitions, pitch glides, sentence reading, picture description, and unassisted or metronome-paced finger tapping. The pipeline automatically extracted acoustic and computer-vision features after removing outliers via a three-sigma rule. Statistical evaluations employed Spearman correlations against baseline MDS-UPDRS items, linear mixed-effects models with least-squares means to track longitudinal changes, and paired Wilcoxon rank-sum tests to compare coefficients of variation.

## Results

At baseline, objective measures correlated significantly with clinical severity items, including spontaneous speech F0 standard deviation with speech impairment (ρ = -0.36), pitch-glide F2 with facial/articulatory control, eye blink rate with facial expression scores (ρ = -0.46), and wide-task tap count with finger-tapping scores (ρ = -0.55). Longitudinal analysis of the failed clinical trial cohort revealed statistically significant artificial improvements in MDS-UPDRS total and subscores at weeks 2, 4, and 8 indicative of placebo and Hawthorne effects, whereas corresponding digital biomarkers showed no such spurious longitudinal drift. Objective measures demonstrated systematically and statistically significantly lower coefficients of variation than clinician-rated counterparts across nearly all tested speech, facial, and motor domains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical trial designers and neurological researchers can use these automated audiovisual biomarkers as robust, objective endpoints to reduce trial noise and assess therapeutic interventions in Parkinson's disease more reliably.

## Limitations

The study evaluates a specific cohort from a single Phase 2 clinical trial of early Parkinson's disease where no active motor improvement was observed.

## Related

- (link related pages by id as the wiki grows)
