---
id: koch26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2417
pdf: https://www.isca-archive.org/interspeech_2026/koch26_interspeech.pdf
---

# Collecting Prosody in the Wild: A Content-Controlled, Privacy-First Smartphone Protocol and Empirical Evaluation

*Timo K. Koch, Florian Bemmann, Ramona Schoedel, Markus Buehner, Clemens Stachl*

[PDF](https://www.isca-archive.org/interspeech_2026/koch26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koch26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2417)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — This paper introduces a privacy-first smartphone protocol that standardizes semantic content via read-aloud sentences and extracts prosodic features on-device before immediately deleting raw audio, successfully evaluated on 9,877 in-the-wild recordings from 560 participants. The extracted features achieve strong speaker sex classification (92% balanced accuracy) but weak momentary affect prediction.

## Key contributions

- A field-ready, smartphone-based ecological momentary assessment (EMA) protocol that controls for the prosody-semantics confound using validated valence-balanced read-aloud sentences.
- A privacy-preserving on-device audio pipeline using openSMILE embedded as an Android native library that deletes raw LPCM audio immediately after feature extraction.
- An empirical evaluation of participant compliance and data quality using 9,877 real-world voice samples from a quota-matched sample of 560 participants.
- Diagnostic prediction tasks showing high accuracy for speaker sex classification but weak out-of-sample prediction for momentary valence and arousal.

## Problem

Everyday speech research using smartphones suffers from two core bottlenecks: the confounding of prosody with lexical semantics and severe privacy restrictions regarding the collection of raw audio under regulations like the GDPR. Prior in-the-wild approaches typically collect unconstrained diary-style speech and store raw recordings, raising legal and ethical barriers while failing to isolate prosodic variations. Resolving this is critical to scaling ecological momentary assessment of speech without compromising participant privacy or muddying acoustic signals with semantic noise.

## Method

The protocol was integrated into the PhoneStudy Android app as part of an ecological momentary assessment (EMA) procedure prompting participants up to four times daily. Participants read three sentences aloud per recording session, drawn from a set of 54 validated German sentences split evenly across positive, negative, and neutral lexical valence conditions. Recording durations were bounded between 4 and 12 seconds, utilizing linear pulse-code modulation (LPCM) at 16-bit depth and 44.1 kHz. Immediately following recording, an Android ARM executable of the openSMILE algorithm extracted 88 eGeMAPS features and 6,373 ComParE 2016 features locally on the device. Once features were saved to a local CSV, the raw WAV file and CSV were wiped from local storage, and feature vectors were securely synced via SSL and a three-way handshake when Wi-Fi and idle states were detected.

Data filtering relied on openSMILE-derived descriptors: clips with a mean voicing probability below 0.5, zero voiced segments per second, or non-positive harmonic-to-noise ratio (HNR <= 0 dB) were dropped, leaving 9,877 valid samples. Downstream evaluation utilized random forest classifiers (1000 trees) for speaker sex prediction and random forest regressors for momentary valence and arousal, evaluated via participant-blocked ten-fold cross-validation to prevent data leakage across folds.

## Experimental setup

The dataset comprised 9,877 recordings from 3,513 EMA instances across 560 participants (46% female, mean age 41.80 years) gathered over two two-week phases in Germany. Baselines included comparisons across positive, neutral, and negative sentence-valence conditions using linear mixed-effects models and random forest predictive models on eGeMAPS versus ComParE feature sets. Metrics evaluated include participant compliance rates, intraclass correlation (ICC_p) for speaker-level stability, Benjamini-Hochberg FDR-corrected p-values, balanced accuracy for sex classification, and median Spearman correlation (rho_md) along with mean absolute error (MAE) for affect prediction.

## Results

Participant compliance showed that prompts were initiated in 67.8% of cases, and once initiated, all three valence recordings were completed 96.9% of the time. Condition effects on prosodic metrics were modest: F0 range variability showed no reliable difference across valence conditions (p >= 0.348), whereas HNR and voiced segments per second shifted slightly (|beta| ≈ 0.06–0.13 SD, p < 0.001) and mean loudness decreased marginally in emotional prompts (beta = -0.036 and -0.034 SD, p < 0.05). Speaker-level stability (ICC_p) was substantial, accounting for 32.5% to 69.3% of variance across metrics.

For downstream prediction, speaker sex classification performed exceptionally well using both eGeMAPS (balanced accuracy_md = 91.77%) and ComParE (92.04%). However, prediction of momentary affective states was weak: arousal achieved rho_md = 0.12 (eGeMAPS) and 0.13 (ComParE), while valence yielded near-zero predictive validity (rho_md = 0.02 to 0.03), with no significant differences across sentence-valence conditions.

| System / Feature Set | Target Task | Metric | Performance | | :--- | :--- | :--- | :--- | | eGeMAPS | Speaker Sex Classification | Balanced Accuracy (Median) | 91.77% | | ComParE 2016 | Speaker Sex Classification | Balanced Accuracy (Median) | 92.04% | | eGeMAPS | Momentary Arousal | Spearman Correlation (Median) | 0.12 | | ComParE 2016 | Momentary Arousal | Spearman Correlation (Median) | 0.13 | | eGeMAPS | Momentary Valence | Spearman Correlation (Median) | 0.02 |

## Limitations

The protocol cannot guarantee verbatim compliance with read-aloud text because raw audio is deleted immediately, meaning occasional paraphrasing or disfluencies cannot be caught post-hoc. The reliance on engineered acoustic features (eGeMAPS/ComParE) limits representational capacity compared to modern self-supervised audio embeddings. Furthermore, naturalistic variations in device placement, microphone characteristics, and background noise create acoustic noise that dilutes affective signal.

## Why read this

Researchers building smartphone-based speech collection apps or studying everyday prosody will find this paper essential for its blueprint on balancing ecological validity with GDPR-compliant data minimization. It provides realistic empirical baselines proving that while on-device extraction is viable for speaker profiling, predicting fine-grained momentary affect from prosody alone in the wild remains extremely challenging.

## Code

- https://github.com/Timo-Ko/prosody_in_the_wild

## Applications

Privacy-preserving ecological momentary assessment of vocal biomarkers, large-scale remote mental health monitoring, and longitudinal field studies of speaker traits.

## Institutions / 機構

University of St. Gallen, LMU Munich, University of Mannheim, Charlotte Fresenius Hochschule

**Funding / 經費:** Leibniz Institute for Psychology, Swiss National Science Foundation, German Academic Scholarship Foundation

## Related

- (link related pages by id as the wiki grows)
