---
id: kenne26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2868
pdf: https://www.isca-archive.org/interspeech_2026/kenne26_interspeech.pdf
---

# Multi-Level Privacy-Preserving Dementia Detection from Speech via Targeted Adversarial Obfuscation and Representation Learning

[PDF](https://www.isca-archive.org/interspeech_2026/kenne26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kenne26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2868)

**TL;DR** — This paper presents a multi-level privacy-preserving framework for dementia detection that combines targeted signal-level adversarial obfuscation with feature-level mutual information-guided representation learning, achieving near-chance speaker identification while maintaining strong clinical utility.

## Problem

Speech recordings used for clinical cognitive assessments expose both diagnostic biomarkers and personally identifiable information, leading to a privacy-utility conflict. Existing methods typically operate at only a single stage of the pipeline—failing to simultaneously protect against both machine eavesdropping via ASR transcription and human re-identification via speaker embeddings without severely degrading clinical classification accuracy.

## Method

The framework operates at two levels using the DementiaBank Pitt Corpus: a signal-level Cumulative Signal Attack (CSA) coupled with projected gradient descent (using Wav2Vec2 as a surrogate) to concentrate perturbations in keyword-aligned temporal regions and force a Word Error Rate of 1.00 while preserving low-frequency prosodic biomarkers; and a feature-level adversarial network using a Gradient Reversal Layer combined with a Mutual Information (MI)-guided noise injection strategy that preserves the top 20% most dementia-correlated embedding dimensions and adds Gaussian noise (scale 0.6) to the remaining 80%.

## Results

Evaluated on 552 Cookie Theft picture description recordings from the DementiaBank Pitt Corpus using an RBF-SVM classifier, the proposed method achieves a dementia classification F1-score of 0.79 and ROC-AUC of 0.86 (compared to 0.83 F1 for the original non-anonymized data), significantly outperforming baseline shuffle methods which suffer utility collapses down to 0.64 F1. Privacy protection is demonstrated by a near-chance speaker EER of 0.59 and a speaker F1-score of 0.0033 against machine/human eavesdroppers, alongside a Whisper-evaluated WER of 1.00.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians and digital health platforms sharing voice recordings for remote dementia screening and speech-based cognitive biomarker analysis while complying with HIPAA and GDPR regulations.

## Limitations

The signal-level perturbations are perceptible by design, yielding negative SNR and SI-SDR values, though speech intelligibility and prosodic structure are intentionally preserved.

## Related

- (link related pages by id as the wiki grows)
