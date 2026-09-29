---
id: wong26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["University of Otago", "Te Punaha Matatini"]
code: https://osf.io/tg8bc/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2637
pdf: https://www.isca-archive.org/interspeech_2026/wong26_interspeech.pdf
---

# TMASC: Transmasculine Attitude and Speech Corpus

*Sidney Wong*

[PDF](https://www.isca-archive.org/interspeech_2026/wong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2637)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The Transmasculine Attitudes and Speech Corpus (TMASC) is a crowd-sourced multimodal dataset featuring questionnaire responses and audio recordings from 196 transmasculine individuals to investigate community-level vocal health and socio-acoustic norms. The dataset reveals a weak linear relationship between self-perceived vocal masculinity and fundamental frequency (f0), highlighting that pitch alone does not capture voice gender congruence.

## Key contributions

- Introduces TMASC, a multimodal corpus combining 196 psychosocial/vocal health questionnaires with 66 audio recordings (cough, throat-clearing, and reading passages in multiple languages).
- Presents case studies linking self-perceived vocal satisfaction and masculinity with acoustic measures (mean and mode f0 extracted via Praat and REAPER).
- Demonstrates cross-tool calibration of acoustic measures, finding that REAPER estimates significantly lower mean f0 (mean 119.1 Hz) compared to Praat (mean 150.7 Hz) on the same crowd-sourced data.
- Provides community-appropriate benchmarks outside traditional clinical settings to better understand transmasculine vocal needs.

## Problem

Prior speech and voice research targeting transgender individuals has heavily favored transfeminine populations, driven by the flawed assumption that testosterone replacement therapy (TRT) sufficiently lowers pitch for transmasculine individuals. Traditional clinical diagnostic tools, such as the Voice Handicap Index (VHI) or Transgender Self-Evaluation Questionnaire (TSEQ), fail to capture community-level socio-acoustic norms and cannot be easily interpreted alongside acoustic data. Furthermore, relying solely on fundamental frequency (f0) benchmarks derived from cisgender population norms ignores the complex interplay of presentational factors, chest binding, and individual psychosocial well-being.

## Method

TMASC was developed using a browser-based corpus analysis tool, LaBB-CAT, allowing participants worldwide to complete questionnaires and record audio using personal electronic devices (laptops, smartphones, etc.). The questionnaire consisted of 60 items covering self-perception, communicative factors, testosterone usage history, and demographic information. The optional speech sample included a cough, throat-clearing, and a reading of the passage 'North Wind and the Sun' translated into multiple languages (predominantly English and German).

Data analysis utilized RStudio alongside Praat (via LaBB-CAT integration) and the Robust Epoch And Pitch EstimatoR (REAPER) to extract acoustic measurements such as mean and mode f0. Praat estimates mean f0 over entire phrases, whereas REAPER estimates f0 at individual glottal closure instants. These differing estimation strategies and pitch-tracking algorithms were compared to calibrate acoustic metrics against participants' duration of testosterone replacement therapy.

## Experimental setup

The corpus comprises 196 completed questionnaires and 66 crowd-sourced audio recordings collected online between July and October 2017. Participants primarily originated from English-speaking countries (USA, Australia, New Zealand, Canada, UK) and German-speaking countries (Germany, Switzerland). Evaluations utilized Praat and REAPER for pitch tracking and extraction, with metrics analyzed descriptively and via visualization tools in R.

## Results

Case studies demonstrate that while vocal satisfaction shows a relatively clear relationship with mean f0 (exhibiting a unimodal distribution under 100 Hz for satisfied users and a bimodal distribution around 100-130 Hz for somewhat satisfied users), self-perceived vocal masculinity exhibits only a weak linear relationship with mean f0. Acoustic extraction tool comparisons show considerable systematic variation: Praat reported a median f0 of 137.8 Hz and a mean of 150.7 Hz (range 88.2–489 Hz), whereas REAPER reported a mean f0 of 119.1 Hz (range 78–185 Hz). The corpus does not evaluate automated classification performance or machine learning architectures, as it is a foundational data resource.

| Pitch Extractor | Median f0 (Hz) | Mean f0 (Hz) | f0 Range (Hz) |
|---|---|---|---|
| Praat (LaBB-CAT) | 137.8 | 150.7 | 88.2–489.0 |
| REAPER | Not Reported | 119.1 | 78.0–185.0 |

## Limitations

The corpus is cross-sectional rather than longitudinal, meaning population trends cannot be directly mapped to individual developmental changes over time. Because data collection relied on unconstrained crowd-sourcing via personal consumer devices, recordings lack standardized laboratory acoustic control and are subject to background noise and varying hardware quality. Additionally, geographical representation is skewed heavily toward English- and German-speaking regions despite multilingual reading passage translations.

## Why read this

Speech researchers and health practitioners working on inclusive speech technology or gender-affirming voice analysis should read this to understand why cisgender pitch benchmarks fail for transmasculine speakers. It provides critical insights into multimodal data collection and tool calibration discrepancies between Praat and REAPER.

## Code

- https://osf.io/tg8bc/

## Applications

Development of inclusive, community-aligned speech technology, gender-affirming voice training applications, and clinical evaluation frameworks for transmasculine vocal health.

## Institutions / 機構

University of Otago, Te Punaha Matatini

**Funding / 經費:** UC College of Arts, School of Language, Social and Political Science, Te Punaha Matatini

## Related

- (link related pages by id as the wiki grows)
