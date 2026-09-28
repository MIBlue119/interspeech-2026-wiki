---
id: oliveira26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1489
pdf: https://www.isca-archive.org/interspeech_2026/oliveira26_interspeech.pdf
---

# DIALOG DeID: Role and Privacy Aware Transcription for Clinical Interviews Beyond WER

[PDF](https://www.isca-archive.org/interspeech_2026/oliveira26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/oliveira26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1489)

**TL;DR** — The paper introduces DIALOG-DeID, a modular pipeline integrating ASR, diarization, role mapping, and de-identification for clinical dialogue, and demonstrates that standard Word Error Rate obscures critical semantic and attribution errors.

## Problem

Standard evaluation metrics like Word Error Rate (WER) and Diarization Error Rate (DER) fail to capture clinical meaning preservation, such as negation and temporal framing, which are critical in psychiatric interviews. Furthermore, automated clinical transcription workflows must process highly sensitive patient data while properly attributing dialogue between clinicians and interviewees. Without specialized evaluation recipes, transcription pipelines can introduce silent clinical interpretation errors despite appearing accurate overall.

## Method

DIALOG-DeID integrates time-accurate ASR backends (WhisperX, Amazon Transcribe, Azure, Google), pyannote.audio for diarization, prompt-based LLM classification for clinician versus interviewee role mapping, and Presidio or LLM backends for HIPAA-compliant PII redaction. The framework introduces speaker-attributed WER (sWER) computed via permutation-invariant stream alignment and Hungarian matching, alongside Qualifier/Temporal Preservation F1 (QTP-F1) to track lexical cue retention. It evaluates downstream clinical utility by fitting a ridge regressor on lexicon-extracted features to predict PSYCHS positive-symptom severity scores via leave-one-session-out cross-validation.

## Results

Evaluated on 25 ten-minute excerpt sessions from the PSYCHS-Bench dataset and the AMI Meeting Corpus, Amazon Transcribe achieved the best aggregate WER of 13.3±1.4 and role-attributed sWER of 33.1±6.7, whereas Azure recorded 19.0±1.7 WER but a much higher 44.7±5.7 sWER. Semantic auditing of 50 cue-bearing snippets revealed automatic cue drops in 20.0% to 24.0% of cases and hard negation flips in 2.0% to 4.0% of snippets. For text de-identification, Microsoft Presidio achieved strong performance with 88.0% F1 on names and 96.6% on dates, outperforming tested LLM span-extraction variants.

## Code

- https://github.com/GuiCamargoX/dialog-deid

## Applications

Speech and NLP engineers building privacy-compliant, automated clinical documentation assistants and psychiatric evaluation tools.

## Limitations

The QTP-F1 metric operates as a lexical cue-preservation proxy rather than a comprehensive semantic-equivalence measure, as it does not model cue scope, paraphrasing, or clinical interpretation nuance.

## Related

- (link related pages by id as the wiki grows)
