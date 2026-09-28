---
id: spang26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3523
pdf: https://www.isca-archive.org/interspeech_2026/spang26_interspeech.pdf
---

# GADVOX: The German Anxiety and Depression Voice Examination Dataset

*Robert P. Spang, Wafaa Wardah, Hritik Sauw, Ole Möller-Nilsson, Etleva Gjoni, Stefan Brandenburg, Maria Kreußlein, Lana Mohr, Sebastian Möller*

[PDF](https://www.isca-archive.org/interspeech_2026/spang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/spang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3523)

**TL;DR** — GADVOX is the first openly accessible German-language speech dataset for depression and anxiety detection, containing spontaneous speech and validated continuous severity scores from 1,004 participants. It provides an average of 18.4 minutes of audio per participant paired with PHQ-9 and GAD-7 self-assessments.

## Key contributions

- Releases GADVOX, a large-scale German mental health speech corpus featuring 1,004 quality-filtered adult participants.
- Provides paired, self-assessed PHQ-9 and GAD-7 ordinal severity scores to support multi-target regression instead of binary classification.
- Implements a rigorous four-stage quality assurance pipeline (attention checks, automated VAD screening, human validation, and P.566 speech quality scoring) resulting in a 29.3% exclusion rate.
- Releases open metadata with ITU-T P.566 dimensions, psychosocial context items, and participant demographics under CC BY 4.0.

## Problem

The automated analysis of mental health vocal biomarkers is severely bottlenecked by data scarcity and language bias, with nearly all published research relying exclusively on the English-language DAIC-WOZ corpus of 189 sessions. Furthermore, existing literature predominantly reduces clinical mental health assessment to binary classification, ignoring the ordinal severity scales provided by standard questionnaires and failing to account for the high comorbidity between depression and anxiety. For the German-speaking context, no freely accessible speech dataset of this kind has previously existed, hindering the development of multi-target diagnostic AI tools.

## Method

Data collection utilized ten structured, emotionally neutral free-speech prompts (eliciting ~20 seconds of speech each) presented in randomized order via the German crowdsourcing platform Crowdee. Participants recorded each response separately and subsequently completed the PHQ-9 and GAD-7 clinical questionnaires alongside psychosocial context items. Pre-study iterations with 25 participants established that structured prompts successfully elicit fluent, on-topic natural speech without requiring experimenter intervention.

The raw per-prompt audio files were concatenated into a single session-level file (48 kHz mono WAV) after stripping leading and trailing silence. To maintain natural speaking rhythms, estimated mean within-speaker pause durations were inserted as inter-recording gaps. Quality assurance filtered out 416 candidates from an initial pool of 1,420 through four sequential stages: four embedded questionnaire attention checks, automated voice activity detection screening, a human assistant review of opening seconds, and post-hoc speech quality estimation using SQ-AST (ITU-T P.566 reference implementation) evaluated across five dimensions (MOS, noise, discontinuity, coloration, and loudness) averaged over five non-overlapping 10-second segments per session.

## Experimental setup

The final dataset comprises 1,004 quality-filtered sessions collected from adults aged 18 to 77 years (mean age 37.2 years, 51.1% male, 48.1% female). Evaluation of internal consistency yielded Cronbach's alpha values of 0.85 for PHQ-9 and 0.86 for GAD-7. No machine learning models or downstream classification baselines are trained in this paper; the work strictly establishes the data resource, demographic distributions, score correlations (r = 0.795 between PHQ-9 and GAD-7), and ITU-T P.566 quality metrics.

## Results

The dataset contains 1,004 validated sessions with a median session duration of 14.7 minutes (mean 18.4 minutes, SD 13.6 minutes). PHQ-9 scores ranged from 0 to 26 (mean 7.6, SD 5.1), with 29.2% of participants scoring at or above the moderate-severity threshold of 10. GAD-7 scores ranged from 0 to 21 (mean 8.0, SD 4.5), with 20.9% scoring at or above the moderate threshold of 10. Overall speech quality scored a mean MOS of 2.84 (SD 0.56) across the 1,004 sessions.

Ablation-style data validation confirmed that neither PHQ-9 nor GAD-7 symptom severity scores correlated meaningfully with overall speech quality MOS (PHQ-9 r = 0.008, p = 0.800; GAD-7 r = 0.015, p = 0.627), proving that acoustic recording quality does not confound symptom severity labels.

## Limitations

PHQ-9 and GAD-7 are self-report screening instruments rather than clinician-administered diagnostic assessments, meaning labels act as symptom severity proxies rather than clinical ground truth. The crowdsourcing recruitment introduces demographic biases toward higher educational attainment and digital literacy relative to the general German population. Dialectal variations, non-native speech, and precise microphone distances were not controlled, and session-level concatenation preprocessing may alter temporal pause statistics.

## Why read this

Speech and ML researchers building multi-target, multilingual mental health screening models should read this to access the first large-scale German speech dataset annotated for continuous depression and anxiety severity.

## Code

- https://osf.io/k4z2v/

## Applications

Automated mental health screening, joint depression and anxiety severity regression, and vocal biomarker analysis in telemonitoring applications.

## Related

- (link related pages by id as the wiki grows)
