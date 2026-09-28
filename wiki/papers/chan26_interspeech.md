---
id: chan26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-751
pdf: https://www.isca-archive.org/interspeech_2026/chan26_interspeech.pdf
---

# Privacy vs. Performance: Assessing Communication Utility of Anonymized Voice Features

[PDF](https://www.isca-archive.org/interspeech_2026/chan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-751)

**TL;DR** — This paper evaluates the impact of phase vocoder time-scale modification (PV-TSM) speaker anonymization on acoustic and prosodic feature fidelity for communication assessment, achieving near-zero word error rate (WER) degradation when ASR models are fine-tuned on anonymized data.

## Problem

Voice anonymization is required by regulations like GDPR to protect user privacy, but the necessary acoustic transformations risk distorting prosodic and behavioral features critical for communication assessment platforms (e.g., scoring fluency, confidence, and language proficiency). Prior work mostly tracks ASR WER and speaker re-identification EER rather than measuring how feature distortion impacts downstream automated scoring. This gap matters because altering these cues can lead to biased or inaccurate assessments in workplace readiness and job interview applications.

## Method

The authors integrate a lightweight phase vocoder time-scale modification (PV-TSM) technique as a front-end privacy filter in an end-to-end communication assessment pipeline, permanently discarding original audio. They evaluate feature consistency (low-level prosody like speaking rates, pauses, disfluencies, and high-level constructs like confidence, formality, and persuasion) across three ASR setups: an internal Kaldi baseline, a Microsoft Azure pronunciation baseline, and a custom fine-tuned Azure model. The Azure model is fine-tuned using a 100-hour AMI Corpus subset (36 hours PV-TSM anonymized and 26 hours of original speech with disfluency tokens) to handle anonymized and disfluent conversational speech.

## Results

Evaluated on a 1.5-hour held-out AMI test subset, the baseline Azure model yields a WER of 15.01% on anonymized audio compared to 12.66% on original audio, while the fine-tuned Azure model achieves 7.89% on anonymized audio compared to 7.72% on clean audio (a negligible 0.17% discrepancy). Evaluated on a real-world online interview dataset of 1,000 monologue recordings from 254 speakers, fine-tuning markedly reduces Mean Absolute Error (MAE) and increases Pearson correlation (r) for repetition, hesitation, and filler features compared to baseline models. Pause-related metrics show strong correlations overall, though minor variations emerge due to shifts in VAD frame segmentation thresholds post-fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building privacy-compliant automated speech assessment, job interview screening, and educational platforms that require reliable prosodic and linguistic feature extraction from anonymized user audio.

## Limitations

Evaluated exclusively on PV-TSM as a lightweight signal processing anonymization technique, leaving the assessment of deep learning-based anonymization methods (such as neural audio codecs or voice conversion) to future work.

## Related

- (link related pages by id as the wiki grows)
