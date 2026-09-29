---
id: chan26_interspeech
category: deepfake-security
institutions: ["Educational Testing Service", "Japan Advanced Institute of Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-751
pdf: https://www.isca-archive.org/interspeech_2026/chan26_interspeech.pdf
---

# Privacy vs. Performance: Assessing Communication Utility of Anonymized Voice Features

*Amanda Chan, Chee Wee Leong, Candy Olivia Mawalim, Shogo Okada*

[PDF](https://www.isca-archive.org/interspeech_2026/chan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-751)

**Category:** `deepfake-security`

**TL;DR** — This paper investigates how phase vocoder time-scale modification (PV-TSM) affects acoustic and prosodic feature fidelity for automated communication assessment, demonstrating that downstream fine-tuning of ASR models on anonymized data can bridge the recognition and feature accuracy gap.

## Key contributions

- Evaluates the impact of PV-TSM voice anonymization directly on specific low-level prosodic features and high-level communication assessment constructs rather than solely tracking speaker EER and ASR WER.
- Proposes a fine-tuning recipe for commercial ASR models (Microsoft Azure) using 36 hours of PV-TSM anonymized AMI corpus data and 26 hours of disfluency-rich original speech.
- Demonstrates that custom ASR fine-tuning reduces the word error rate (WER) gap between original and anonymized speech to a negligible 0.17% on held-out test data.
- Quantifies correlation and mean absolute error (MAE) impacts on communication assessment dimensions like confidence, persuasiveness, formality, and language proficiency.

## Problem

Voice anonymization is legally and ethically required in employment and educational contexts to prevent bias and protect user identity. However, transformations like signal modification alter pitch, timing, and resonance patterns, risking the distortion of critical acoustic and prosodic cues used for evaluating communication skills and fluency. Prior work focuses heavily on ASR WER and speaker re-identification EER, leaving a critical knowledge gap regarding how these transformations reshape downstream assessment features.

## Method

The study applies phase vocoder time-scale modification (PV-TSM) as a lightweight preprocessing step before discarding raw speech and performing all downstream processing. PV-TSM alters pitch and timing with an execution latency of approximately 0.4 seconds for a 2-minute utterance without requiring heavy neural model training. Extracted features include low-level prosodic metrics (speaking rate, filler ratio, pause ratio, hesitation markers, and repetitions) and high-level constructs (confidence via linear regression on rhythm/silence/pitch, formality via random forest on energy/F0/duration, persuasion via random forest on MFCCs/formants, and language proficiency via a BERT large MTL model).

To recover from degradation caused by anonymization, the authors adapt the Microsoft Azure Speech-to-Text pronunciation assessment model. Because standard models miss subtle disfluencies, the base Azure model is fine-tuned using a combined corpus derived from the AMI meeting corpus. This training set comprises 36 hours of PV-TSM anonymized conversational speech and 26 hours of original speech containing explicit 'uh' and 'um' tokens to maximize disfluency coverage. Inference is evaluated by measuring Pearson correlation (r) and mean absolute error (MAE) between features extracted from original audio versus anonymized audio across different baseline and fine-tuned ASR configurations.

## Experimental setup

Evaluations use a dataset of 1,000 online interview monologues (approx. 2 minutes each, 254 speakers, 54% female/46% male, ages 18-65, 90% American accent) sampled at 16 kHz. ASR evaluation uses a held-out 1.5-hour subset of the AMI Corpus. Baselines include an internal Kaldi-based nnet3chain model (1,600 hours clean training data, 19.5% initial WER) and the default Microsoft Azure pronunciation assessment model. Metrics include WER, Pearson's r, and MAE.

## Results

On the 1.5-hour AMI corpus evaluation set, the internal Kaldi baseline yields a WER of 45.13% on original audio and 58.88% on anonymized audio. The Azure baseline records 12.66% on original and 15.01% on anonymized audio. In contrast, the custom fine-tuned Azure model achieves 7.72% on original audio and 7.89% on anonymized audio, successfully limiting the anonymization performance penalty to a 0.17% absolute increase in WER.

For low-level prosodic features, the custom Azure model achieves strong Pearson correlations with original audio features, such as 0.97 for repetitions, 0.99 for hesitation markers, 0.99 for filler ratio, and 0.99 for speaking rate. High-level communication constructs also demonstrate high consistency under the custom fine-tuned Azure model, with confidence reaching r = 0.93 (MAE = 0.06) and holistic language proficiency reaching r = 0.96 (MAE = 0.01). Persuasion, which relies exclusively on acoustic MFCCs and formants independently of ASR, exhibits an unchanging correlation of r = 0.23 (MAE = 0.04) across all models, which a paired t-test confirms is not statistically significant (p = 0.26).

| System / Condition | WER (Original) | WER (Anonymized) | Repetitions (r) | Confidence (r) |
|---|---|---|---|---|
| Internal Model | 45.13% | 58.88% | 0.76 | 0.78 |
| Azure Baseline | 12.66% | 15.01% | 0.84 | 0.91 |
| Azure Custom Fine-tuned | 7.72% | 7.89% | 0.97 | 0.93 |

## Limitations

The study evaluates a single lightweight signal processing anonymization technique (PV-TSM) and does not benchmark neural voice conversion or neural codec-based methods. The evaluation dataset focuses predominantly on American English speakers (90%), limiting cross-lingual and heavy-accent generalization claims. Furthermore, persuasion scores exhibited weak correlation (r = 0.23) between original and anonymized audio, indicating that static acoustic features like formants and MFCCs remain vulnerable to PV-TSM alterations.

## Why read this

Researchers and engineers building privacy-preserving speech analytics pipelines will find a concrete recipe showing that lightweight signal-level anonymization can be safely paired with targeted ASR fine-tuning to preserve assessment validity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated workplace readiness assessments, educational speaking evaluations, and privacy-compliant speech corpus collection.

## Institutions / 機構

Educational Testing Service, Japan Advanced Institute of Science and Technology

## Related

- (link related pages by id as the wiki grows)
