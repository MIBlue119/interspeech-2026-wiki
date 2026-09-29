---
id: baligar26_interspeech
category: health-clinical
institutions: ["Massachusetts General Hospital"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-159
pdf: https://www.isca-archive.org/interspeech_2026/baligar26_interspeech.pdf
---

# Toward an Articulatory Weakness Index for Speech Kinematics in Parkinson’s Disease

*Shrishail Baligar, Ahmed Yousef, Daryush Mehta*

[PDF](https://www.isca-archive.org/interspeech_2026/baligar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/baligar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-159)

**Category:** `health-clinical`

**TL;DR** — The paper introduces the Articulatory Weakness Index (AWI), an interpretable, audio-estimable scalar metric derived from EMA kinematics that quantifies articulatory hypokinesia. AWI successfully separates Parkinson's disease (PD) speech from healthy controls and correlates with clinical motor scores while remaining invariant to laryngeal pathology.

## Key contributions

- Defined a low-dimensional articulatory state time-series (Za) using multi-sensor electromagnetic articulography (EMA) kinematics that acts as a data-driven hypokinesia measure.
- Proposed the Articulatory Weakness Index (AWI) as scalar summaries of Za(t) over connected speech, estimated entirely from audio via a neural audio-to-EMA inversion model with affine calibration.
- Demonstrated subsystem-specific characterization showing AWI is elevated in Parkinson's disease and monotonically tracks motor severity (UPDRS), while remaining stable across sex, loudness, and vocal hyperfunction.
- Laid the methodological groundwork for future multi-subsystem Respiratory-Laryngeal-Articulatory (R-L-A) factorizations of speech motor disorders.

## Problem

Standard objective acoustic metrics for pathological speech—such as perturbation measures, spectral ratios, and cepstral indices—are subsystem agnostic, mixing respiratory, laryngeal, and supralaryngeal contributions into a single monolithic value. This prevents clinicians and researchers from isolating specific articulatory deficits, such as determining how weak the articulators are while holding laryngeal function constant. While direct motion-capture methods like electromagnetic articulography (EMA) reveal articulatory hypokinesia in Parkinson's disease, they rely on expensive, multi-sensor hardware restricted to controlled laboratories. This work bridges the gap by building an EMA-grounded, audio-estimable scalar index that maps acoustic recordings directly to interpretable articulatory kinematic states.

## Method

The pipeline starts by extracting spatial coordinates from six standard supralaryngeal coils (upper lip, lower lip, jaw, tongue dorsum, tongue body, tongue tip) using either ground-truth EMA or a pre-trained neural audio-to-EMA inversion model mapping 16 kHz audio to surrogate articulator positions. Within a sliding window of 250 ms with a 100 ms hop, 29 kinematic features are computed per window: displacement range, mean speed, peak speed, and displacement standard deviation for each of the six articulators, plus 4 global averages and the Pearson correlation between jaw and tongue-tip vertical coordinates.

A StandardScaler and PCA pipeline is fit on these features from healthy reference data in the USC-TIMIT dataset (approx. 85,284 windows). The first principal component, which strongly correlates with global displacement range and mean speed, is designated as the raw articulatory state coordinate and sign-flipped so that higher Za values correspond to smaller, slower, and more constrained motions. A global linear mapping calibrates audio-derived Za trajectories to match ground-truth EMA space.

Finally, the utterance-level Articulatory Weakness Index (AWI) is computed as the mean of Za across speech windows. Secondary summaries include the 90th percentile (AWI_p90), trimmed range (AWI_range), and the proportion of windows above the healthy reference level (AWI_prop_high). These scalar metrics are evaluated against clinical motor scales and pathological control groups.

## Experimental setup

The evaluation utilizes four datasets: the USC-TIMIT dataset (healthy reference EMA data across six coils), a clinical cohort of 21 individuals with Parkinson's disease producing the Rainbow Passage and standard prompts, age- and sex-matched healthy controls from the Perceptual Voice Qualities Database (PVQD yielding 9 pairs), and 398 speakers with and without vocal hyperfunction producing the CAPE-V sentence set. Metrics include Pearson r and Spearman rho correlations against clinical scales (UPDRS Total, UPDRS Part III, Voice Handicap Index, Communication Participation Item Bank, and Hoehn & Yahr scale), alongside distribution shifts and frame-level visualizations.

## Results

Healthy controls clustered around a mean AWI near -1.5, whereas matched PD speakers shifted rightward to values between 2 and 3 Za units with minimal distribution overlap, demonstrating high separation. Median AWI increased monotonically across tertiles of motor severity, rising from approximately 2.1 to 2.9 for UPDRS Part III, with individual-level correlations reaching Spearman rho ~0.53 (p=0.013) for UPDRS Part III and Pearson r = 0.46 (p=0.037) for UPDRS Total. In contrast, AWI remained completely invariant in the vocal hyperfunction cohort, where normal and patient trajectories nearly overlapped within +/-1 standard deviation bands, confirming specificity to articulatory dynamics rather than laryngeal disorders.

| System / Condition | AWI Mean (Healthy / Control) | AWI Mean (PD / Patient) | Correlation with UPDRS Part III ($\rho$) |
|---|---|---|---|
| Matched PD vs. Controls | -1.5 | +2.5 | 0.53 |
| Vocal Hyperfunction Cohort | ~0.0 | ~0.0 | N/A |

## Limitations

The study relies on a relatively small clinical cohort of 21 Parkinson's disease speakers and 9 matched control pairs, limiting broader demographic generalization. The audio-to-EMA inversion model is trained on healthy reference data, meaning PD kinematics may be slightly out-of-distribution. Evaluations are restricted to English read speech and a single inversion network architecture.

## Why read this

Speech researchers and biomedical engineers working on computational paralinguistics or pathological speech analysis should read this to learn how to decompose acoustic signals into interpretable physiological subsystems. It provides a blueprint for leveraging audio-to-articulatory inversion models to construct continuous, clinically grounded biomarker axes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical screening, remote telehealth monitoring of motor disease progression in Parkinson's disease, and subsystem-specific speech therapy targeting.

## Institutions / 機構

Massachusetts General Hospital

**Funding / 經費:** Voice Health Institute, National Institutes of Health

## Related

- [Reducing Measurement Noise in Digital Speech Biomarkers: Interpretable Composite Index Scores for Longitudinal ALS Monitoring in Clinical Trials](neumann26_interspeech.md) — shared technique · relatedness 2.0/3
- [Clinically-Supervised Hierarchical LoRA-MoE: A Parameter-Efficient Framework for Severity-Aware Dysarthric Speech Assessment](wang26ga_interspeech.md) — same problem · relatedness 2.0/3
- [Speech and Video Biomarkers Exhibit Reduced Within-Subject Variability in Early Parkinson’s Disease and Resistance to Placebo and Hawthorne Effects](kothare26b_interspeech.md) — same problem · relatedness 2.0/3
- [A Benchmark for Early-stage Parkinson's Disease Detection from Speech](zhong26b_interspeech.md) — same problem · relatedness 2.0/3
- [Adapting Self-Supervised Speech Representations for Cross-Lingual Dysarthria Detection in Parkinson's Disease](hernandez26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
