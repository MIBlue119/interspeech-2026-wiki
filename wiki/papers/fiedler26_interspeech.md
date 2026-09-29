---
id: fiedler26_interspeech
category: health-clinical
labels: [multilingual, self-supervised, robustness-noise]
institutions: ["Noah Labs", "University of Potsdam", "German Heart Center of the Charite", "Mayo Clinic", "King's College London"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-424
pdf: https://www.isca-archive.org/interspeech_2026/fiedler26_interspeech.pdf
---

# Contrastive Time-Proximity Pre-Training for Speech-Based Heart Failure Monitoring

*Tobias Fiedler, Mariam Fouad, Marcus Hott, Leonhard Riehle, Felix Hohendanner, Bruce Johnson, Nicholas Cummins, Bert Arnrich*

[PDF](https://www.isca-archive.org/interspeech_2026/fiedler26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fiedler26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-424)

**Category:** `health-clinical` · **Labels:** `multilingual`, `self-supervised`, `robustness-noise`

**TL;DR** — The paper introduces Contrastive Time-Proximity (CTP), a self-supervised pre-training method that learns heart failure-predictive representations from natural speech without clinical labels. It achieves robust cross-center and cross-language acute decompensated heart failure ranking accuracy, outperforming classical handcrafted acoustic features and human raters.

## Key contributions

- Proposes a novel self-supervised contrastive pre-training objective (CTP) leveraging temporal proximity in weakly labeled longitudinal speech data.
- Establishes a two-level cross-center and cross-language evaluation benchmark for acute decompensated heart failure (ADHF) extreme-state discrimination.
- Demonstrates that CTP-learned features generalize across clinical centers and languages where classical acoustic features fail.
- Provides exploratory attention analysis revealing that the model focuses primarily on breathing-related speech segments.

## Problem

Heart failure causes recurrent acute decompensation (ADHF) episodes requiring hospitalization, driven by progressive fluid overload that alters the vocal tract and voice quality. Prior vocal biomarker work relies heavily on sustained vowel phonations, which require active patient engagement and are unsuitable for continuous real-world monitoring. While natural speech avoids this constraint, standard handcrafted acoustic features fail to capture complex HF dynamics and do not generalize across different clinical centers or recording conditions, highlighting the need for robust representation learning approaches.

## Method

The feature extraction architecture adapts the d-vector model by processing mel-spectrogram segments through a 3-layer bidirectional LSTM with frame-level attention, followed by a novel segment attention layer that aggregates representations into a 265-dimensional recording-level vector. The model contains approximately 4.5 million trainable parameters and evaluates three input configurations: Config A (16 kHz, 40 mel bins, initialized from a speaker-verification checkpoint), Config B (44 kHz, 40 mel bins, random init), and Config C (44 kHz, 120 mel bins, random init).

The Contrastive Time-Proximity (CTP) pre-training objective exploits the progressive nature of heart failure by pulling together embeddings from recordings taken within 3 days of each other (proximal pairs, presumed similar health state) and pushing apart recordings separated by 100+ days (distal pairs, presumed different health state). Proximal pairs are filtered to exclude known acute events or significant weight changes. The training utilizes cosine embedding loss with a batch size of 32 pairs, training for up to 100 epochs using differential learning rates ($10^{-5}$ for LSTM layers and $2 	imes 10^{-4}$ for other parameters).

For downstream evaluation, ADHF detection is framed as a ranking task over admission ('wet') and discharge ('dry') recording pairs using either a frozen XGBoost ranker or a neural ranker fine-tuning the feature extractor. Level 1 evaluation uses leave-one-patient-out cross-validation on German patients (Charité Berlin), while Level 2 tests zero-shot cross-center and cross-language generalization on English patients (Mayo Clinic Rochester).

## Experimental setup

Pre-training uses 51,736 natural speech recordings from 392 German-speaking heart failure patients via a telemonitoring app (poems and fun facts). The clinical evaluation dataset (VAMP-HF trial, NCT06566911) comprises 68 total patients across Charité Berlin (32 German patients) and Mayo Clinic Rochester (36 English patients) using admission and discharge recordings. Baselines include a random baseline (50% accuracy), human raters (nine annotators including physicians, nurses, and ML/audio experts), 29 classical acoustic features, and an off-the-shelf d-vector model without CTP. Metrics are evaluated across 50 random seeds on a single NVIDIA L4 GPU with 32 GB RAM.

## Results

In Level 1 (within-center evaluation), classical acoustic features achieved the highest accuracy at 0.62, followed closely by CTP-A at 0.58–0.61 and human raters at 0.55. However, classical acoustic features catastrophically failed in Level 2 (cross-center/cross-language transfer to Mayo Clinic), dropping to 0.34 accuracy. In contrast, CTP-A maintained robust cross-center performance, achieving 0.61 accuracy with the XGBoost ranker and 0.59 with the neural ranker. Surprisingly, configurations B and C (which achieved higher pre-training similarity gaps) did not yield superior downstream performance, highlighting a mismatch between pre-training objective optimization and clinical task transfer. Off-the-shelf d-vector without CTP performed no better than random (0.38–0.42).

| System | Ranker | Level 1 (Within-Center) | Level 2 (Cross-Center) |
|---|---|---|---|
| Random | — | 0.50 | 0.50 |
| Human Raters | — | 0.55 | — |
| Classical Acoustic Features | XGBoost | 0.62 | 0.34 |
| d-vector (no CTP) | XGBoost | 0.47 | 0.42 |
| CTP-A (Proposed) | XGBoost | 0.58 | 0.61 |
| CTP-A (Proposed) | Neural | 0.61 | 0.59 |

## Limitations

The evaluation dataset is small ($N=68$ patients), limiting statistical power for formal hypothesis testing, meaning all comparisons are exploratory. The evaluation relies on binary admission/discharge extreme-state labels rather than continuous physiological tracking of decompensation. Human rater comparisons were only available for Level 1, and the codebase is proprietary and not publicly available.

## Why read this

Researchers and ML engineers working on health-related speech representation learning should read this paper to see how temporal structure in longitudinal self-supervised learning can prevent domain overfitting and enable cross-center generalization where handcrafted features fail.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Remote, non-invasive telemonitoring of chronic heart failure decompensation via standard smartphone voice recordings.

## Institutions / 機構

Noah Labs, University of Potsdam, German Heart Center of the Charite, Mayo Clinic, King's College London

## Related

- (link related pages by id as the wiki grows)
