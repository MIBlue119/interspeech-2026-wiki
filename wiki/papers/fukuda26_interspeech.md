---
id: fukuda26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-973
pdf: https://www.isca-archive.org/interspeech_2026/fukuda26_interspeech.pdf
---

# What Makes Us Hate Our Own Voice? Large-scale experiments on Playback–Imagery Gaps and Individual--Speech Feature Effects

[PDF](https://www.isca-archive.org/interspeech_2026/fukuda26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fukuda26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-973)

**TL;DR** — This study investigates the playback-imagery gap in self-voice evaluation using 459 Japanese participants, finding that listening to recorded speech evokes significantly higher discomfort and negative valence compared to internal auditory imagery.

## Problem

Hearing one's own recorded voice often triggers aversion, commonly attributed to transmission mismatches between bone- and air-conduction during speaking versus playback. However, because self-voice perception also involves internal auditory imagery and strong individual differences, the exact cognitive and acoustic factors driving this playback-imagery evaluation gap remain poorly understood.

## Method

The authors conducted an online within-participant study with 459 Japanese adults who recorded neutral sentences from the WRIME dataset and performed counterbalanced playback and imagery blocks. Multi-dimensional evaluations across seven 7-point Likert scales (discomfort, valence, desirability, self-likeness, familiarity, eeriness, strangeness) were analyzed using mixed-effects models. Pre-task listener traits (voice preference, Rosenberg self-esteem, SPS-6 social anxiety, recording exposure frequency, age, gender) and acoustic features (RMS energy, F0, spectral descriptors, MFCCs, and facebook/wav2vec2-base-960h embeddings) were explored using a pre-specified 70/30 discovery-validation split with Benjamini-Hochberg FDR and Holm corrections.

## Results

Playback produced reliably higher discomfort (beta = 0.490, p = 6.69e-20) and more negative valence and desirability than imagery, whereas self-likeness showed no significant difference. Robustness checks using repetition baselines revealed small block-to-block drift, and drift-adjusted models showed that desirability and strangeness order effects remained significant. Exploratory acoustic analyses identified sparse main effects replicating in validation (e.g., 19th MFCC predicting discomfort gap, 24th wav2vec2 feature predicting eeriness gap), alongside several trait-acoustic interactions involving voice preference and social anxiety.

## Code

- https://github.com/takamichi-lab/selfvoice-playback-imagery-gap

## Applications

Speech engineers and researchers designing listener-adaptive speech interfaces, voice assistants, and therapeutic applications for voice confrontation.

## Limitations

The study relies heavily on subjective self-report scales within an online experimental setting, and exploratory acoustic-trait interactions require further confirmation via controlled causal manipulations.

## Related

- (link related pages by id as the wiki grows)
