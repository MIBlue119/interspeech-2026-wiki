---
id: mosner26_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3367
pdf: https://www.isca-archive.org/interspeech_2026/mosner26_interspeech.pdf
---

# Effectiveness of Language Variability Compensation in Speaker Verification

*Ladislav Mošner, Sara Barahona, Sandro Cumani, Johan Rohdin, Jin Li, Oldřich Plchot*

[PDF](https://www.isca-archive.org/interspeech_2026/mosner26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mosner26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3367)

**TL;DR** — This paper investigates language-variability compensation across the entire speaker verification pipeline for the TidyVoice 2026 Challenge, showing that adversarial front-end training, specialized back-ends, and score-level calibration deliver complementary robustness. The final system fusion achieves an Equal Error Rate of 2.53% on the tv26 eval-A evaluation set.

## Key contributions

- Evaluated and demonstrated consistent performance gains from language variability compensation implemented independently at the embedding, back-end, and score levels.
- Proposed an adversarial front-end training strategy using a Gradient Reversal Layer (GRL) alongside a language classification branch to purge language-dependent information from speaker embeddings.
- Integrated Domain Shifts with Uncertainty (DSU) feature augmentation with GRL to improve cross-lingual robustness.
- Demonstrated that powerful back-ends (PSVM and SG-TPSDA) excel with language-entangled embeddings, but their performance advantage diminishes when language variability is already mitigated at the front-end.

## Problem

Modern speaker verification datasets are heavily dominated by monolingual English or Chinese data, leaving models vulnerable to confounding language shifts in multilingual deployment scenarios. While NIST SRE evaluations introduced multilingual trials, they simultaneously injected confounding channel mismatches like telephone versus video audio. The TidyVoice 2026 Challenge isolates this gap by benchmarking speaker verification across 40 training languages and 38 unseen evaluation languages, exposing how language entanglement in speaker embeddings degrades verification accuracy.

## Method

The study explores two core front-end architectures: SimAMResNet100 (leveraging Simple Attention Modules and Attentive Statistics Pooling) and w2v-BERT 2.0 coupled with a Multi-scale Feature Aggregation (MFA) embedding extractor and layer adapters. For adversarial language compensation, a multi-task objective is used where an utterance-level language classification branch calculates a cross-entropy loss (Ll) connected to the shared backbone via a Gradient Reversal Layer (GRL), while the main branch optimizes an ArcFace speaker loss (Ls) with a margin of 0.3 and scale of 32. To combat cross-lingual domain shifts, Feature Domain Augmentation with Domain Shifts with Uncertainty (DSU) perturbs internal feature statistics by drawing channel-wise means and standard deviations from batch-estimated distributions.

At the back-end, the authors utilize Pairwise Support Vector Machines (PSVM with length normalization and a regularizer scaled by 5) and Spherical-Gaussian Toroidal Probabilistic Spherical Discriminant Analysis (SG-TPSDA, using isotropic Gaussian likelihoods without length normalization). An optional Linear Discriminant Analysis (LDA) projection removes dominant language directions by mapping embeddings onto the complement of a 15-dimensional discriminant language subspace. Score-level compensation uses a ResNet18 language classifier trained on TidyVoiceX to generate language comparison scores, acting as quality measures to calibrate trial scores via logistic regression.

Training recipes combined the TidyVoiceX training dataset (370 hours, 3,666 speakers, 40 languages) with external expansions: the NIST SRE CTS Superset (6,193 hours, upsampled to 16 kHz, 6,867 speakers, 52 languages) and VoxCeleb2 dev (2,369 hours, 5,994 speakers, with language pseudo-labels extracted via an ECAPA-TDNN trained on VoxLingua107). SimAMResNet100 was fine-tuned for 6 epochs with learning rates decaying from 5e-5 to 1e-5, while w2v-BERT 2.0 with MFA was fine-tuned for 5 epochs using SGD with learning rates from 1e-3 to 5e-5.

## Experimental setup

Experiments utilized the TidyVoice 2026 Challenge datasets (TidyVoiceX training set, tv26 dev, tv26 eval-A, and tv26 eval-U) alongside VoxCeleb1-hard (Vox1-H). Evaluation metrics comprise Equal Error Rate (EER) and Minimum Detection Cost Function (MinDCF with target prior 0.01). Comparisons are made against challenge baselines and uncompensated single systems using cosine similarity scoring.

## Results

On the tv26 dev set, applying GRL to SimAMResNet100 improved EER from 1.50% to 1.30%, and combining GRL with DSU further reduced EER to 1.20% (with MinDCF dropping from 0.654 to 0.614). For w2v-BERT 2.0 with MFA, incorporating GRL drove the dev set EER down from 1.50% to 0.99% and MinDCF from 0.669 to 0.583. Sublist analysis confirmed that GRL specifically resolved the hardest trial category (different-language targets against same-language impostors). 

When combining front-end extractors with advanced back-ends on the challenge evaluation sets, the definitive system fusion (combining SimAM ResNet100 + PSVM and w2v-BERT 2.0 w/ MFA + SG-TPSDA) achieved an EER of 2.53% (MinDCF 0.190) on tv26 eval-A, significantly outperforming the challenge baseline of 9.06% EER. The most informative ablation revealed that language-compensated back-ends trained on uncompensated embeddings outperformed back-ends trained on GRL-purified embeddings, indicating that adversarial front-end removal strips away minor speaker-discriminative cues that back-ends can otherwise exploit.

| System | Front-end | Back-end | tv26 dev EER | tv26 eval-A EER | tv26 eval-U EER |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Baseline [6] | - | cosine similarity | 3.07% | 9.06% | 11.59% |
| Sys 1 | SimAM ResNet100 | PSVM-LN (LDA 15d) | 1.05% | 3.51% | 3.94% |
| Sys 2 | w2v-BERT 2.0 w/ MFA | SGTPSDA-NOLN (LDA 15d) | 0.93% | 2.99% | 4.57% |
| Fusion (Sys 1+2) | Fusion | Fusion | 0.81% | 2.53% | 3.40% |

## Limitations

The study's language-variability analysis is explicitly constrained to the tv26 dev subset containing languages seen during training, leaving the efficacy under truly unseen language evaluation conditions unverified prior to challenge submission. Score distributions also exposed second modes in non-target score bins, implying potential label noise within the challenge development data. Furthermore, applying DSU to w2v-BERT 2.0 yielded negligible gains, indicating that architectural compatibility with feature perturbation techniques requires more thorough investigation.

## Why read this

Read this paper if you are building speaker verification systems for highly multilingual or cross-lingual operational environments and need a rigorous roadmap for disentangling language identity from speaker embeddings. It provides actionable evidence regarding where to deploy invariance constraints—comparing front-end adversarial gradients, specialized back-ends like PSVM/SG-TPSDA, and score-level calibration.

## Code

- https://github.com/wenet-e2e/wespeaker/blob/master/docs/pretrained.md

## Applications

Cross-lingual speaker verification, forensic speaker recognition, and multilingual voice biometrics.

## Related

- (link related pages by id as the wiki grows)
