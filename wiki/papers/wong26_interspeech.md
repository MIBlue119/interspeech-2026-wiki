---
id: wong26_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2637
pdf: https://www.isca-archive.org/interspeech_2026/wong26_interspeech.pdf
---

# TMASC: Transmasculine Attitude and Speech Corpus

[PDF](https://www.isca-archive.org/interspeech_2026/wong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2637)

**TL;DR** — The paper introduces the Transmasculine Attitudes and Speech Corpus (TMASC), a multimodal crowdsourced dataset comprising questionnaire responses from 196 transmasculine individuals and 66 accompanying audio recordings to support community-level vocal health research.

## Problem

Existing vocal health tools, diagnostic questionnaires, and speech corpora have historically focused primarily on transfeminine individuals, operating under the false assumption that testosterone replacement therapy alone sufficiently addresses transmasculine vocal needs. Furthermore, traditional clinical diagnostics fail to integrate acoustic measurements with psychosocial factors or establish community-appropriate benchmarks outside a clinical framework. This oversight neglects diverse interventions like chest binding and top surgery that impact transmasculine vocal health and well-being.

## Method

The corpus was collected via crowdsourcing using the browser-based LaBB-CAT corpus analysis tool over a three-month period, inviting participants aged 18 and older to complete a 60-question survey covering self-perception, vocal health, testosterone history, and demographics. A subset of 66 participants voluntarily provided audio recordings via personal electronic devices, consisting of cough samples, throat-clearing samples, and the multilingual reading passage North Wind and the Sun. Data analysis utilized R alongside acoustic feature extraction tools Praat and REAPER to compare pitch-tracking algorithms and examine interactions between psychosocial metrics and fundamental frequency.

## Results

The dataset contains questionnaire responses from 196 individuals across English- and German-speaking countries, with 66 participants contributing audio samples across English (n=50) and German (n=16). Case studies reveal that self-perceived vocal masculinity shows only a weak linear relationship with mean fundamental frequency, whereas overall vocal satisfaction demonstrates a clearer linear trend. Comparative acoustic analysis highlights significant discrepancies between pitch extractors, where REAPER yielded a substantially lower mean f0 of 119.1 Hz (median 114 Hz, range 78–185 Hz) compared to Praat's mean f0 of 150.7 Hz (median 137.8 Hz, range 88.2–489 Hz) across the sample population.

## Code

- https://osf.io/tg8bc/

## Applications

Speech-language pathologists, health practitioners, and researchers studying queer and transgender voice production can use this corpus to analyze transmasculine vocal characteristics and establish inclusive population benchmarks.

## Limitations

The audio recordings rely on crowdsourced data collected via heterogeneous personal electronic devices, leading to variable sampling rates and acoustic recording conditions.

## Related

- (link related pages by id as the wiki grows)
