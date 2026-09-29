---
id: oliveira26_interspeech
category: health-clinical
institutions: ["Monash University", "University of Melbourne", "Sao Paulo State University", "Emory University", "Yale University", "Harvard Medical School"]
code: https://github.com/GuiCamargoX/dialog-deid
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1489
pdf: https://www.isca-archive.org/interspeech_2026/oliveira26_interspeech.pdf
---

# DIALOG DeID: Role and Privacy Aware Transcription for Clinical Interviews Beyond WER

*Guilherme C. Oliveira, Dominic Dwyer, Stephanie Fong, Leandro A. Passos, Dan Mo, Benjamin Dixon, Phillip Wolff, Scott W. Woods, Martha Shenton, Barnaby Nelson, Zongyuan Ge*

[PDF](https://www.isca-archive.org/interspeech_2026/oliveira26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/oliveira26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1489)

**Category:** `health-clinical`

**TL;DR** — DIALOG-DeID is a modular pipeline for clinical dialogue that integrates ASR, diarization, LLM-based role mapping, and PII redaction, evaluated via speaker-attributed WER (sWER) and semantic cue preservation (QTP-F1) rather than standard WER alone. The best system (Amazon Transcribe) achieves a 13.3 aggregate WER but a much higher role-attributed sWER of 33.1.

## Key contributions

- Proposes an evaluation framework combining speaker-attributed WER (sWER) via permutation-invariant stream alignment and Qualifier/Temporal Preservation F1 (QTP-F1) to catch clinical meaning distortions.
- Introduces DIALOG-DeID, a modular pipeline combining time-accurate ASR, pyannote diarization, role mapping, and text de-identification under a unified segment representation.
- Demonstrates on PSYCHS-Bench and AMI corpora that standard WER poorly correlates with attribution and cue-preservation accuracy, exposing hidden failure modes like hard negation flips.
- Compares text de-identification backends (Presidio, AWS-PII, LLM span extraction) showing high performance for rule/NER-based pipelines under an identifying-only policy.

## Problem

Clinical risk interviews require high fidelity in speaker attribution ('who said what') and meaning-critical lexical cues like negation, modality, and temporal anchors. Standard metrics like word error rate (WER) and diarization error rate (DER) ignore attribution mismatches and semantic cue drops that can completely reverse clinical interpretation. Furthermore, clinical data contains sensitive personal health information (PHI/PII), necessitating strict privacy controls and standardized de-identification integrated into the dialogue workflow.

## Method

The DIALOG-DeID pipeline processes audio through modular, swappable components operating on a unified segment representation containing timestamps, text, speaker IDs, role labels, and PII tags. For time-accurate ASR, backends include WhisperX, Amazon Transcribe, Azure Speech-to-Text, and Google Speech-to-Text (long-form), combined with pyannote.audio for speaker diarization and time-overlap Hungarian assignment for role alignment. Text de-identification uses interchangeable backends under a HIPAA-like label space: Microsoft Presidio NER, AWS PII, and an LLM span extraction backend.

Downstream clinical scoring utilizes a ridge regressor fitted on four lexical features extracted from de-identified transcripts (normalized word count, and token densities for negation, hedging/modality, and distress cues) evaluated using leave-one-session-out (LOSO) cross-validation. To audit semantic fragility, the pipeline tracks Qualifier/Temporal Preservation F1 (QTP-F1) by monitoring precision and recall of fixed lexicon trigger lists for negation, modality, and temporality. Time-compression robustness is evaluated at 1.5x playback to test speed-stability trade-offs without model re-tuning.

## Experimental setup

Evaluated on PSYCHS-Bench (25 English 10-minute semi-structured psychiatric interview excerpts from AMP SCZ with human transcripts) and the AMI Meeting Corpus (16 close-talking ihm and 5 far-field sdm windows of 5 to 15 minutes). Compared ASR backends include Azure STT, Amazon Transcribe, Google STT (long), and WhisperX, all paired with pyannote diarization and Presidio PII redaction. Metrics include WER, speaker-attributed sWER, QTP-F1, DER, span-level PII F1, and clinical regression metrics (RMSE, CCC, Spearman's rho).

## Results

On PSYCHS-Bench, Amazon Transcribe achieved the best aggregate WER of 13.3 ± 1.4 and best role-attributed sWER of 33.1 ± 6.7 (QTP-F1 role 0.88), whereas Azure STT yielded 19.0 WER and 44.7 sWER. Across session-system pairs, WER moderately correlated with sWER (rho = 0.55), but showed weak-to-no correlation with cue preservation QTP-F1 (rho = -0.24). Extended semantic audits revealed cue drops in 20.0% (Amazon) to 24.0% (WhisperX) of snippets, and hard negation flips in 2.0% to 4.0%. Time compression at 1.5x showed WhisperX is fastest (RTF 0.06) but suffers higher drift (WERrel 20.00) compared to Amazon (RTF 0.18, WERrel 12.29). For PII redaction on names, Presidio scored 88.0% F1, AWS-PII scored 85.9%, and the LLM backend scored 69.6%.

| ASR (+pyannote) | WER ↓ | sWER ↓ | QTP-F1spk ↑ |
|---|---|---|---|
| Azure STT | 19.0 ± 1.7 | 44.7 ± 5.7 | 0.84 ± 0.05 |
| Amazon Transcribe | 13.3 ± 1.4 | 33.1 ± 6.7 | 0.88 ± 0.05 |
| Google STT (long) | 27.1 ± 2.4 | 47.6 ± 5.1 | 0.83 ± 0.05 |
| WhisperX | 17.4 ± 1.5 | 36.9 ± 7.5 | 0.86 ± 0.07 |

## Limitations

The study is limited by a small clinical evaluation subset (25 sessions on PSYCHS-Bench), lack of explicit acoustic anonymization, absence of isolated DER or role-mapper decomposition, and reliance on a strictly lexical proxy (QTP-F1) that does not model complex cue scope or paraphrase semantics.

## Why read this

Speech and ML researchers building pipelines for sensitive medical or meeting domains should read this paper to understand why standard WER and DER fail to capture critical attribution and semantic errors. It offers a practical blueprint and evaluation framework for building privacy-compliant, role-aware clinical transcription systems.

## Code

- https://github.com/GuiCamargoX/dialog-deid

## Applications

Automated clinical documentation, psychiatric intake and risk interview analysis, secure telehealth transcription, and privacy-preserving conversational analytics.

## Institutions / 機構

Monash University, University of Melbourne, Sao Paulo State University, Emory University, Yale University, Harvard Medical School

**Funding / 經費:** Medical Research Future Fund, National Critical Research Infrastructure, National Health and Medical Research Council, FAPESP

## Related

- [Grounding Spoken LLMs in Multi-Speaker Audio via Diarization Conditioning](polok26b_interspeech.md) — same problem · relatedness 2.1/3
- [ASR-Synchronized Speaker-Role Diarization](ghosh26d_interspeech.md) — same problem · relatedness 2.0/3
- [Benchmarking Speech Systems for Frontline Health Conversations: The DISPLACE-M Challenge](e26_interspeech.md) — same problem · relatedness 2.0/3
- [Who Spoke What When? Evaluating Spoken Language Models for Conversational ASR with Semantic and Overlap-Aware Metrics](tawara26_interspeech.md) — same problem · relatedness 2.0/3
- [Beyond WER: A Paired Acoustic Stress Test for Ambient Clinical Scribes](jiang26c_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
