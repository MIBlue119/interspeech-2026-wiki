---
id: sanchez26_interspeech
category: resources-evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2600
pdf: https://www.isca-archive.org/interspeech_2026/sanchez26_interspeech.pdf
---

# An Evaluation Framework for Text-to-Speech Voice Reconstruction

*Ariadna Sanchez, Christoph Minixhofer, Korin Richmond, Ondřej Klejch, Peter Bell, Simon King*

[PDF](https://www.isca-archive.org/interspeech_2026/sanchez26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sanchez26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2600)

**Category:** `resources-evaluation`

**TL;DR** — This paper establishes a rigorous evaluation framework for TTS-based voice reconstruction by combining situationally-framed Best-Worst Scaling (BWS) subjective tests with a novel dual-reference distributional objective measure, evaluating 17 zero-shot TTS systems across 193 disordered speakers.

## Key contributions

- Proposes a task-aligned evaluation framework for voice reconstruction that explicitly separates intelligibility and speaker identity preservation.
- Introduces Best-Worst Scaling (BWS) with situational framing to replace flawed MOS protocols in assessing disordered speech reconstruction.
- Develops a novel dual-reference distributional measure (TTSDS Mean) combining high-intelligibility (LibriTTS) and disordered (SAP) references to evaluate the trade-off between intelligibility and identity.
- Comprehensive benchmark of 17 zero-shot TTS systems using 193 speakers from the Speech Accessibility Project (SAP).

## Problem

Voice reconstruction creates personalized TTS for speakers with degenerative conditions to improve intelligibility while retaining identity, but traditional evaluations rely on general Mean Opinion Score (MOS), which suffers from saturation, limited reliability, and poor sensitivity. Furthermore, standard objective metrics (WER, speaker embedding cosine similarity, UTMOS) either fail to handle out-of-domain disordered speech or measure intelligibility at the expense of speaker identity. This mismatch obscures whether synthetic outputs successfully balance intelligibility with personalized voice characteristics, particularly for severely disordered speakers where ground-truth reference data before diagnosis does not exist.

## Method

The framework establishes two distinct subjective evaluation axes: INTELLIGIBILITY (assessed without regard to speaker traits) and RECONSTRUCTION (assessed against listeners' imagination of the speaker's pre-condition voice). Subjective testing utilizes Best-Worst Scaling (BWS) evaluated over Plackett-Luce models, requiring fewer screens and providing higher statistical reliability than MOS. To enable objective evaluation without pre-condition reference data, the authors adapt the distributional measure TTSDS2 by computing a dual-reference metric (TTSDS Mean). This measure averages the distributional similarity of synthetic output against a generic high-intelligibility corpus (145 speakers from LibriTTS) to quantify intelligibility, and against the original disordered prompt recordings (Speech Accessibility Project) to quantify speaker identity preservation.

Seventeen off-the-shelf zero-shot TTS systems—encompassing autoregressive and non-autoregressive architectures trained on read or spontaneous speech—were tested without fine-tuning by providing a single disordered audio prompt and transcript per speaker. For objective analysis, automatic evaluations included Whisper-turbo for WER, Allosaurus for Phone Error Rate (PER), WeSpeaker for speaker embedding cosine similarity, UTMOS for reference-free MOS prediction, and the proposed distributional distances (TTSDS SAP, TTSDS LibriTTS, and TTSDS Mean).

## Experimental setup

Evaluations used 193 English-speaking participants from the December 2024 Speech Accessibility Project (SAP) dataset, spanning four conditions: Parkinson's (139 speakers), Cerebral Palsy (30 speakers), ALS (17 speakers), and Down Syndrome (7 speakers). Speakers were split into high intelligibility (WER < 30%, 149 speakers) and low intelligibility (WER >= 30%, 44 speakers). Subjective listening tests involved 46 to 47 screened participants recruited via Prolific using 4-system BWS screens.

## Results

For INTELLIGIBILITY, StyleTTS2 achieved the highest BWS worth estimate (2.447) and lowest WER (6.4%), with most TTS systems outperforming original recordings. For RECONSTRUCTION, IndexTTS2 ranked highest (0.963 BWS), followed by Qwen3-TTS (0.791) and E2-TTS (0.672), though most systems underperformed compared to original recordings on identity retention, especially for low-intelligibility speakers. The proposed TTSDS Mean strongly correlated with subjective reconstruction preferences (Spearman rho = 0.814 overall, 0.734 for low intelligibility), outperforming standard speaker cosine similarity (rho = 0.746). Zero-shot systems struggled on severely disordered speakers, indicating that beyond a critical impairment threshold, models trade off speaker identity to force speech into a generic high-intelligibility distribution.

| System | Subj. Intelligibility (BWS) | Subj. Reconstruction (BWS) | WER (%) | UTMOS | Speaker Sim. | TTSDS Mean |
|---|---|---|---|---|---|---|
| IndexTTS2 | 1.921 | 0.963 | 9.9 | 2.88 | 0.670 | 86.1 |
| Qwen3-TTS | 2.207 | 0.791 | 20.0 | 3.58 | 0.573 | 86.5 |
| E2-TTS | 0.198 | 0.672 | 30.8 | 2.61 | 0.713 | 86.3 |
| StyleTTS2 | 2.447 | -0.788 | 6.4 | 3.71 | 0.371 | 83.0 |
| Recording (Original) | 0.000 | 0.000 | 20.6 | 2.36 | 0.645 | 85.5 |
| OpenVoice | 2.236 | -1.534 | 6.7 | 3.72 | 0.283 | 80.4 |

## Limitations

The evaluation relies on zero-shot TTS models without task-specific fine-tuning or adaptation. The dataset is skewed heavily toward Parkinson's disease (72%) and high-intelligibility speakers (77.2%), and limited strictly to English to avoid accent confounds. Furthermore, the framework leaves out-of-domain conversational suitability, prosody, and accent similarity as future work.

## Why read this

Speech and ML researchers developing personalized text-to-speech or voice restoration systems should read this paper to replace flawed MOS evaluation protocols with a validated task-aligned BWS and distributional framework.

## Code

- https://minixc.github.io/sap/

## Applications

Personalized voice output communication aids (VOCAs) and assistive speech reconstruction technologies for individuals with neurodegenerative or speech-impairing conditions.

## Institutions / 機構

University of Edinburgh

**Funding / 經費:** UKRI Centre for Doctoral Training in Natural Language Processing, UKRI

## Related

- (link related pages by id as the wiki grows)
