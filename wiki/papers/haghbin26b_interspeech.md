---
id: haghbin26b_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1860
pdf: https://www.isca-archive.org/interspeech_2026/haghbin26b_interspeech.pdf
---

# Natural Speech Encodes Early Markers of Cognitive Decline: Evidence from Clinical Conversations

[PDF](https://www.isca-archive.org/interspeech_2026/haghbin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/haghbin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1860)

**TL;DR** — This study validates naturalistic conversational speech from patient-nurse interactions and check-in phone calls as a scalable biomarker for early cognitive impairment, achieving an AUC of 0.92 when combined with electronic health records.

## Problem

Alzheimer's disease and related dementias remain largely undiagnosed during early stages because structured Electronic Health Record (EHR) data and lab tasks capture little of the subtle conversational anomalies that indicate early cognitive decline. Traditional screening methods miss these real-world indicators, and late-stage detection occurs past the window where timely interventions are most effective.

## Method

The framework uses a lightweight attention-based bottleneck fusion network that merges structured EHR variables, nursing notes, and speech features extracted from check-in phone calls and patient-nurse conversations. Acoustic features are computed via SpeechDETECT across six domains (including frequency, spectral, voice quality, loudness, complexity, and fluency), while linguistic embeddings are extracted using BERT and BioMedBERT. Transcriptions are generated using AWS General Transcribe, speakers are diarized and mapped using GPT-4o, and missing speech modalities are handled using a training-set mean imputation strategy. The model employs 8 attention heads, a single transformer layer, 8 trainable fusion tokens, and is trained using AdamW optimization with class-weighted cross-entropy.

## Results

Evaluated on a multimodal dataset of 175 participants (47 with cognitive decline, 128 healthy), the baseline structured EHR model achieved an AUC of 0.74 and an F1 of 58.22. Adding the first check-in phone call improved performance to an AUC of 0.76 and F1 of 61.95, while incorporating patient-nurse verbal communications raised the AUC to 0.90 and F1 to 78.22. The best configuration—combining EHR, the first check-in phone call, and both patient-nurse verbal communications—achieved an AUC of 0.92, an F1 of 83.08, and a Macro F1 of 88.31. Gradient x Input attribution showed that patient-nurse verbal communications contributed the largest share (34.6%), with acoustic features making up 52.60% and linguistic features 47.40% of speech contributions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians and healthcare providers can use this framework for automated, non-invasive early screening of cognitive decline and Alzheimer's disease using routine telehealth and clinical conversations.

## Limitations

The study is limited by a relatively small cohort of 175 participants and lacks evaluation on diverse linguistic populations such as Spanish speakers.

## Related

- (link related pages by id as the wiki grows)
