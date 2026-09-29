---
id: yeh26_interspeech
category: health-clinical
institutions: ["Johns Hopkins University", "University of Michigan"]
code: https://github.com/jen900704/Speech-Depression-Speaker-Leakage
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1394
pdf: https://www.isca-archive.org/interspeech_2026/yeh26_interspeech.pdf
---

# Who is Speaking or Who is Depressed? A Controlled Study of Speaker Leakage in Speech-Based Depression Detection

*Hsiang-Chen Yeh, Luqi Sun, Aurosweta Mahapatra, Shreeram Suresh Chandra, Emily Mower Provost, Berrak Sisman*

[PDF](https://www.isca-archive.org/interspeech_2026/yeh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yeh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1394)

**Category:** `health-clinical`

**TL;DR** — This study investigates speaker leakage in speech-based depression detection models, demonstrating that high accuracies exceeding 90% rely heavily on speaker identity memorization rather than clinical biomarkers. When evaluated under strict speaker-independent conditions, classification accuracy plummets from 97.65% to near-random levels (58.74%).

## Key contributions

- Proposes a size-matched data-splitting framework with controlled subject overlap that keeps training set scale constant (5,117 segments) while isolating the impact of speaker overlap.
- Systematically benchmarks three model families (Wav2Vec-Linear Probing, XLSR-eGeMAPS Concatenation, and Wav2Vec-SLS) under frozen and fine-tuned encoder settings, with and without Domain-Adversarial Neural Networks (DANN).
- Reveals a strong positive correlation between high depression classification accuracy and speaker identification accuracy (up to 96.22% Spk ID), proving that identity traits are tightly entangled with pathology predictions.
- Demonstrates that current deep speech representations intrinsically encode speaker identity, causing conventional repeated-diagnosis evaluations to severely overestimate true clinical generalization.

## Problem

Automated speech-based depression detection models frequently report classification accuracies exceeding 90% on benchmark datasets like DAIC-WOZ, yet often fail near random chance when deployed on unseen patients. A key methodological driver of these inflated metrics is speaker leakage—where recordings from the same individual appear in both training and test sets. When models learn to associate specific voiceprints with depression labels rather than learning generalized acoustic biomarkers, they exploit identity shortcuts that undermine clinical validity.

## Method

The study uses the DAIC-WOZ dataset (189 subjects, 6,545 concatenated speech segments derived from 5-utterance windows). A size-matched data split isolates speaker overlap: Training Set A (speaker-independent, 5,117 segments from 151 control speakers) has zero overlap with the 714-segment test set (38 target speakers), while Training Set B replaces part of the control data with 714 segments from the target speakers to simulate repeated diagnosis. Three architectural families are evaluated: (1) Wav2Vec-Linear Probing using a frozen convolutional feature encoder and fine-tuned Transformer layers with mean pooling; (2) XLSR-eGeMAPS Concatenation combining fine-tuned XLS-R contextual embeddings with OpenSMILE hand-crafted eGeMAPS features; and (3) Wav2Vec-SLS which extracts multi-level representations from all Transformer layers via weighted Sensitive Layer Selection. Each model is tested with and without a Domain-Adversarial Neural Network (DANN) module utilizing a Gradient Reversal Layer (GRL) to penalize an adversarial speaker classification head.

Hyperparameters and optimization configurations follow standard self-supervised speech tuning protocols, feeding pooled features into a single-layer linear classification head for depression prediction. DANN variants add a linear dimensionality reduction projection layer followed by a GRL (with scaling factor lambda) and a speaker classifier predicting among the 38 target speakers (or general speaker classes). The core design choices—such as holding training set size strictly identical at 5,117 segments across both overlap conditions—ensure that performance differentials are driven entirely by identity leakage rather than data scale variations.

## Experimental setup

Experiments use the DAIC-WOZ dataset containing 189 subjects (133 healthy, 56 depressed; PHQ-8 score threshold >= 10), preprocessed into 6,545 segments. The shared test set comprises 714 segments from 38 speakers. Performance is evaluated using Depression Macro F1-Score, Depression Classification Accuracy, and Speaker Identification Accuracy (against a random chance baseline of 2.63% for 38 speakers). Comparisons span 3 model architectures, frozen vs. fine-tuned encoders, and baseline vs. DANN-enhanced configurations.

## Results

Under speaker-overlapped conditions (Training Set B), fine-tuned Wav2Vec models achieve near-ceiling performance, reaching 97.65% depression classification accuracy and 90.95% speaker identification accuracy. However, under strict speaker-independent evaluation (Training Set A), the fine-tuned Wav2Vec model's accuracy drops sharply to 58.74% (Macro F1 of 0.5624), and DANN provides only marginal recovery. Models that fail to retain identity information, such as the XLSR-eGeMAPS concatenation models (which drop to 4.62%–10.36% speaker ID accuracy), maintain mediocre depression accuracies ranging from 54% to 67% across both overlapped and non-overlapped splits, showing that they neither exploit identity nor learn strong pathology markers.

| Model Architecture | Training Condition | Dep Macro F1 | Dep Cls Acc | Spk ID Acc |
|---|---|---|---|---|
| Wav2Vec-Linear Probing (Fine-tuned) | Speaker-Independent (Set A) | 0.5624 | 58.74% | 0.00% |
| Wav2Vec-Linear Probing (Fine-tuned) | Speaker-Overlapped (Set B) | 0.9763 | 97.65% | 90.95% |
| XLSR-eGeMAPS Concatenation (Frozen) | Speaker-Independent (Set A) | 0.7098 | 57.28% | 0.00% |
| XLSR-eGeMAPS Concatenation (Frozen) | Speaker-Overlapped (Set B) | 0.7312 | 62.32% | 8.26% |
| Wav2Vec-SLS (Fine-tuned) | Speaker-Independent (Set A) | 0.7383 | 70.31% | 0.00% |
| Wav2Vec-SLS (Fine-tuned) | Speaker-Overlapped (Set B) | 0.9830 | 98.31% | 94.96% |

## Limitations

The study is bounded by the scale of the DAIC-WOZ dataset (189 subjects), limiting generalization to larger, more diverse clinical cohorts. The evaluation is restricted to English-language clinical interviews, leaving multilingual and cross-cultural validity untested. Additionally, DANN alone proved insufficient to fully eliminate speaker identity confounding, highlighting the need for more advanced invariant representation learning techniques.

## Why read this

Speech and ML researchers building clinical mental health screening tools must read this paper to understand why high benchmark accuracies often reflect speaker memorization rather than clinical generalization, and to adopt rigorous speaker-independent evaluation protocols.

## Code

- https://github.com/jen900704/Speech-Depression-Speaker-Leakage

## Applications

Automated mental health screening, objective depression monitoring tools, and clinical speech biomarker auditing.

## Institutions / 機構

Johns Hopkins University, University of Michigan

**Funding / 經費:** Johns Hopkins University Data Science and AI Institute

## Related

- (link related pages by id as the wiki grows)
