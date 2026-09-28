---
id: baligar26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-159
pdf: https://www.isca-archive.org/interspeech_2026/baligar26_interspeech.pdf
---

# Toward an Articulatory Weakness Index for Speech Kinematics in Parkinson’s Disease

[PDF](https://www.isca-archive.org/interspeech_2026/baligar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/baligar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-159)

**TL;DR** — The paper introduces an Articulatory Weakness Index (AWI) derived from electromagnetic articulography or audio-to-articulatory inversion to quantify articulatory hypokinesia in Parkinson's disease, showing elevated values in patients that correlate with motor severity while remaining stable in healthy controls and vocal hyperfunction cases.

## Problem

Standard objective speech metrics aggregate respiratory, laryngeal, and articulatory contributions, making it impossible to directly measure supralaryngeal articulatory dynamics or isolate subsystem deficits. Although electromagnetic articulography (EMA) can track speech kinematics directly, it relies on specialized, non-clinical hardware and small laboratory cohorts. This leaves a gap for a continuous, audio-estimable articulatory index that can reliably track motor burden in conditions like Parkinson's disease (PD).

## Method

The framework extracts a 29-dimensional windowed kinematic feature vector (displacement range, mean speed, peak speed, displacement standard deviation across six articulators, plus jaw-tongue coordination) from either raw EMA data or an existing neural audio-to-EMA inversion model. A standard scaler and principal component analysis (PCA) are applied to healthy reference data from the USC-TIMIT dataset (approx. 85,284 windows), with the first principal component flipped and designated as the articulatory state coordinate Za(t). Utterance-level scalar summaries are then generated, primarily the mean AWI (AWImean), alongside secondary metrics like AWIp90, AWIrange, and AWIprop high. For audio-only datasets without EMA, a global linear mapping (Zatrue = a * Zapred + b) is used to calibrate predicted trajectories against ground truth EMA.

## Results

Evaluated on USC-TIMIT, the audio-derived Za strongly correlates with EMA-derived Za (Pearson r = 0.839, Spearman ρ = 0.837 across 85,284 windows). In a vocal hyperfunction cohort of 398 speakers, AWI remains largely invariant to sex, pitch, and laryngeal pathology (differences < 0.5 units). In a matched PD-control analysis of 9 pairs, AWI successfully separates healthy controls (clustering around -1.5) from PD speakers (near 2-3 units) with minimal distribution overlap. In a broader PD cohort of 21 speakers, AWI correlates with clinician-administered motor severity scores (Spearman ρ ≈ 0.5 for UPDRS Total and Part III) and patient-reported outcomes like the Voice Handicap Index and Communication Participation Item Bank.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians, speech pathologists, and machine learning engineers can use this method to non-invasively assess and continuously track articulatory motor deficits and disease severity in Parkinson's disease from standard acoustic recordings.

## Limitations

The evaluation relies on a small sample size (21 PD speakers, 9 matched controls), exclusively analyzes English read speech, and depends on a single upstream audio-to-EMA inversion model trained on healthy reference data.

## Related

- (link related pages by id as the wiki grows)
