---
id: cotosolano26_interspeech
category: phonetics-linguistics
labels: [low-resource]
institutions: ["Dartmouth College", "University of Auckland"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3507
pdf: https://www.isca-archive.org/interspeech_2026/cotosolano26_interspeech.pdf
---

# Automating Sociophonetic Research in Under-Resourced Languages: A Case Study of Speech Rate in Cook Islands Māori

*Rolando Coto-Solano, Sally Akevai Nicholas*

[PDF](https://www.isca-archive.org/interspeech_2026/cotosolano26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cotosolano26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3507)

**Category:** `phonetics-linguistics` · **Labels:** `low-resource`

**TL;DR** — This paper investigates automated sociophonetic workflows by analyzing speech rate variation across 60 speakers and 7.5 hours of Cook Islands Māori audio, revealing generational and regional differences linked to language shift. Younger speakers in vulnerable islands speak significantly faster (7.7 moras/sec) than older generations (6.8 moras/sec), while endangered hubs show no age-based rate differences.

## Key contributions

- Built a 7.5-hour multimodal Cook Islands Māori corpus combining 4 hours of field recordings (Paradisec) with 94 minutes of online media (YouTube, Facebook/CITV) across 60 speakers.
- Validated an automated pipeline using Silero VAD and a Wav2Vec2 ASR model, demonstrating a strong significant correlation (R2 = 0.45, p < 0.0005) between automatic and manually corrected mora-per-second speech rates.
- Benchmarked off-the-shelf facial age estimation tools (DeepFace and InsightFace) on Indigenous Cook Islander faces, uncovering severe algorithmic biases and poor predictive accuracy (R2 = 0.27).
- Discovered regional sociophonetic trends: Aitutaki speakers exhibit the highest overall speech rates (8.4–8.7 moras/sec), whereas Rarotonga displays depressed youth speech rates indicative of language shift.

## Problem

Traditional sociophonetic research relies heavily on manually collected, segmented, and transcribed audio corpora, which are severely bottlenecked when studying under-resourced and Indigenous languages. Prior automated tools (like DeepFace or InsightFace for age detection and standard ASR pipelines) are rarely tested on Indigenous populations, where demographic metadata is sparse and commercial models suffer from severe racial and regional biases. Addressing this gap is critical for scaling language documentation, measuring language vitality, and tracking language shift without requiring exhaustive manual annotation for every new community.

## Method

The corpus combines 4 hours of archival fieldwork from the Vairanga Te Tuatua collection with 94 minutes of web-scraped social media audio from Facebook news channels (e.g., CITV) and YouTube government cyclone resilience videos. Audio files were segmented into prosodic phrases using the Silero Voice Activation Detector, and automatically transcribed using a task-specific Wav2Vec2 ASR model achieving a Character Error Rate of 0.06 and Word Error Rate of 0.17. 

Speech rates were quantified in moras per second, treating short vowels as one mora and long vowels or diphthongs as two moras (e.g., 'Māori' equals 4 moras). To validate the automated pipeline, a 10-minute subset was manually corrected for boundaries and transcripts; a linear regression confirmed that while automated transcriptions introduced a systematic length bias (autoMoras = 0.7*manualMoras + 3.7), the relative speaker rankings and statistical trends were robustly preserved.

Speaker age metadata was gathered via manual visual categorization into 'older' or 'younger' than 50 years old, due to the failure of automated facial age regression algorithms. Statistical analysis utilized a linear regression model examining the interaction between age group and island of origin as independent variables, with speech rate as the dependent variable, followed by Bonferroni-corrected post-hoc tests.

## Experimental setup

Evaluated on a custom corpus of 60 speakers and 8,083 total prosodic phrases (7.5 hours of audio) spanning three distinct regional groups: Rarotonga (12 speakers, 1,312 phrases), Nga Pū Toru (31 speakers, 6,322 phrases), and Aitutaki (18 speakers, 449 phrases). Comparisons were drawn across age groups (older vs. younger than 50) and geographic islands. Metrics included moras per second, Character Error Rate (CER), Word Error Rate (WER), and regression correlation coefficients (R2, t-tests, p-values).

## Results

Automated vs. manual speech rate correlation yielded R2 = 0.45 (t(23) = 4.3, p < 0.0005). Facial age estimation showed no significant relationship for DeepFace (p = 0.11) and a weak correlation for InsightFace (R2 = 0.27, p < 0.05). A significant interaction between age and island was confirmed via linear regression (t(8077) = 6.1, p < 0.0001). Specifically, younger speakers in Nga Pū Toru spoke significantly faster than older speakers (7.7 vs. 6.8 moras/sec, p < 0.0001), aligning with healthy language transmission. Conversely, Rarotonga (6.4 vs. 6.6 moras/sec, p = 0.73) and Aitutaki (8.7 vs. 8.4 moras/sec, p = 1.0) showed no significant age-based differences, reflecting language shift and reduced youth fluency. Aitutaki speakers overall spoke significantly faster than peers on other islands (p < 0.0001). The pipeline did not win in automated age estimation, as commercial AI models completely failed on Indigenous faces.

| Island & Condition | Older (moras/sec) | Younger (moras/sec) |
|---|---|---|
| Rarotonga | 6.6 ± 1.6 | 6.4 ± 2.0 |
| Nga Pū Toru | 6.8 ± 2.8 | 7.7 ± 2.1 |
| Aitutaki | 8.4 ± 2.3 | 8.7 ± 2.4 |

## Limitations

The study is constrained by a small online data scale (only 7.5 hours total, with severe data scarcity for northern islands like Penrhyn, Manihiki, and Rakahanga, and single-speaker representation for Mangaia). Automated facial age estimation proved unusable due to demographic biases against Indigenous populations, forcing manual categorization. Furthermore, web-scraped metadata lacks resolution regarding speaker migration history, multi-island parentage, and complex code-switching behavior.

## Why read this

Speech and ML researchers building automated language documentation pipelines should read this paper to understand the real-world performance bounds and demographic biases of off-the-shelf ASR and facial analysis tools on Indigenous languages. It offers a practical blueprint for substituting manual phonetic annotation with validated, scalable speech rate metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated sociolinguistic field research, Indigenous language vitality assessment, and speech-rate-based fluency screening for under-resourced languages.

## Institutions / 機構

Dartmouth College, University of Auckland

## Related

- (link related pages by id as the wiki grows)
