---
id: spang26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3523
pdf: https://www.isca-archive.org/interspeech_2026/spang26_interspeech.pdf
---

# GADVOX: The German Anxiety and Depression Voice Examination Dataset

[PDF](https://www.isca-archive.org/interspeech_2026/spang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/spang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3523)

**TL;DR** — The paper introduces GADVOX, the first openly accessible German-language speech dataset featuring spontaneous recordings from 1,004 participants paired with validated continuous PHQ-9 and GAD-7 depression and anxiety severity scores.

## Problem

Prior speech-based mental health research relies almost exclusively on small English-language corpora like DAIC-WOZ, leaving a critical gap for German and hindering cross-lingual adaptation. Furthermore, most existing work reduces mental health analysis to binary classification, ignoring the continuous severity scales provided by standard clinical instruments. This dataset addresses both data scarcity and the need for multi-target regression models capable of handling high clinical comorbidity between anxiety and depression.

## Method

Data was collected via the Crowdee platform using ten structured, emotionally neutral free-speech prompts presented in randomized order, yielding roughly 18.4 minutes of spontaneous speech per participant. A rigorous four-stage quality assurance pipeline removed 29.3% of initial candidates (down from 1,420 to 1,004 sessions) using attention checks, automated voice activity detection, and manual verification of genuine human speech. Audio files were concatenated using estimated within-speaker pause durations to preserve natural rhythm, and per-session speech quality was estimated using ITU-T P.566 (SQ-AST). Metadata including psychosocial context items and demographics are shared openly under CC BY 4.0, while full audio is available upon request.

## Results

The final corpus consists of 1,004 sessions from adults aged 18 to 77, exhibiting high internal consistency for PHQ-9 (alpha = 0.85) and GAD-7 (alpha = 0.86) self-assessments. Scores showed moderate positive skew, with 29.2% of participants scoring at or above the moderate depression threshold (PHQ-9 >= 10) and 20.9% above the anxiety threshold (GAD-7 >= 10), alongside a strong correlation between the two scales (r = 0.80). Crucially, overall MOS speech quality showed no meaningful correlation with symptom severity scores (r = 0.008 for PHQ-9), confirming the absence of a quality-severity confound.

## Code

- https://osf.io/k4z2v/

## Applications

Engineers and researchers developing vocal biomarker tools, mental health screening systems, and multi-target regression models for depression and anxiety detection in German.

## Limitations

Labels rely on self-report screening questionnaires rather than clinician-administered diagnostic assessments, and crowdsourcing biases lead to higher educational attainment and a higher proportion of moderate-to-severe symptoms than the general population.

## Related

- (link related pages by id as the wiki grows)
