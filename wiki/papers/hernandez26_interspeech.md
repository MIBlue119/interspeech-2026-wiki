---
id: hernandez26_interspeech
category: health-clinical
labels: [low-resource, multilingual, self-supervised]
institutions: ["FAU Erlangen-Nurnberg", "UT Austin", "Carnegie Mellon University", "Czech Technical University in Prague", "Idiap Research Institute", "Universidad de Antioquia", "Shenzhen Loop Area Institute", "Fortemedia"]
code: https://github.com/abnerLing/language-shift-dysarthria
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-773
pdf: https://www.isca-archive.org/interspeech_2026/hernandez26_interspeech.pdf
---

# Adapting Self-Supervised Speech Representations for Cross-Lingual Dysarthria Detection in Parkinson's Disease

*Abner Hernandez, Eunjung Yeo, Kwanghee Choi, Chin-Jou Li, Zhengjun Yue, Rohan Kumar Das, Jan Rusz, Mathew Magimai Doss, Juan Rafael Orozco-Arroyave, Tomás Arias-Vergara, Andreas Maier, Elmar Nöth, David R. Mortensen, David Harwath, Paula Andrea Pérez-Toro*

[PDF](https://www.isca-archive.org/interspeech_2026/hernandez26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hernandez26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-773)

**Category:** `health-clinical` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — This paper proposes a representation-level language shift (LS) using healthy control centroids to align cross-lingual self-supervised speech embeddings for Parkinson's disease dysarthria detection. In cross-lingual settings without target-language pathology data, LS substantially increases F1 scores (e.g., from ~0.40 to ~0.74 on Czech with HuBERT) by stripping language identity from the embedding space.

## Key contributions

- Identifies that language-dependent structure persists in self-supervised representations of controlled oral diadochokinesis (DDK) tasks and confounds cross-lingual Parkinson's disease dysarthria detection.
- Introduces a centroid-based language shift (LS) that operates directly in frozen representation space using healthy control speakers, eliminating the need to retrain upstream speech models or optimize extra loss objectives.
- Demonstrates robust cross-lingual and multilingual performance gains across Czech, German, and Spanish PD speech datasets using HuBERT, WavLM, and XLS-R features.

## Problem

Automatic dysarthria detection for neurological disorders like Parkinson’s disease (PD) is typically studied in monolingual setups, yet clinical deployments require models that generalize across languages. However, cross-lingual transfer suffers from domain shift because phonology, syllable structure, and speech rhythm introduce language-dependent variations in acoustic speech patterns. Traditional domain adaptation strategies (like CORAL, MMD, or adversarial training) require target-domain clinical labels, expensive model retraining, or large amounts of target-language pathology data which are scarce in clinical environments. This work addresses the need for a lightweight, zero-retraining adaptation mechanism to eliminate language confounding in cross-lingual pathological speech classification.

## Method

The system extracts frame-level representations from pretrained Self-Supervised Speech Models (S3Ms)—specifically HuBERT-Large (final layer), WavLM-Large (final layer), and XLS-R-300M (12th layer). Chunk-level embeddings (derived from non-overlapping chunks up to 20s via mean-pooling) are averaged into utterance vectors and finally pooled into single speaker-level representation vectors.

To correct cross-lingual domain mismatch without retraining the S3M, the method applies a centroid-based linear vector shift. Source-language embeddings x_src are translated toward the target-language space via x_shifted = x_src - mu_src + mu_tgt, where mu_src and mu_tgt are the centroids computed exclusively from healthy control (HC) speakers in each respective language. Computing centroids using only HC speakers isolates language-specific acoustic variance from pathology-related deviations.

The resulting shifted representations are passed to a logistic regression classifier trained to distinguish PD from HC. Decision thresholds are tuned via nested cross-validation to enforce a minimum clinical screening sensitivity of 0.9, prioritizing the highest specificity among valid thresholds to minimize missed neurological impairment cases.

## Experimental setup

Evaluated on three oral diadochokinesis (DDK /pa-ta-ka/ repetitions) datasets: Czech (CZ: 50 PD / 50 HC), German (DE: 88 PD / 88 HC), and Spanish PC-GITA (ES: 50 PD / 50 HC), using 5-fold stratified cross-validation and 3 random seeds. Models are compared against cross-lingual baselines (without LS), monolingual models, and multilingual models. Class imbalances are controlled by capping class sizes to the smallest corpus partition.

## Results

In cross-lingual transfer settings (no target-language PD data during training), baseline models exhibit severe imbalance, yielding very high specificity (~0.98) but abysmal sensitivity (~0.35) on Czech HuBERT, signaling that classifiers rely on language cues rather than pathology. Applying the proposed language shift fixes this collapse: HuBERT sensitivity on Czech surges from 0.35 to 0.93, raising F1 from 0.48 to 0.74. Similar large gains appear in Spanish (F1 from 0.44 to 0.74) and German, though German remains the hardest target language due to greater initial acoustic distance. In multilingual settings where target-language PD data is available, performance differences narrow, but LS still yields consistent improvements in specificity without sacrificing sensitivity.

| System / Condition | S3M | Specificity | Sensitivity | F1-Score |
|---|---|---|---|---|
| CZ Cross-Lingual (Baseline) | HuBERT | 0.98 | 0.35 | 0.48 |
| CZ Cross-Lingual (Ours / LS) | HuBERT | 0.43 | 0.93 | 0.74 |
| ES Cross-Lingual (Baseline) | HuBERT | 0.99 | 0.29 | 0.44 |
| ES Cross-Lingual (Ours / LS) | HuBERT | 0.61 | 0.83 | 0.74 |
| CZ Multilingual (Baseline) | HuBERT | 0.59 | 0.83 | 0.74 |
| CZ Multilingual (Ours / LS) | HuBERT | 0.66 | 0.83 | 0.76 |

## Limitations

Each evaluated language originates from a completely separate dataset, confounding true linguistic variations with corpus-specific acoustic and recording artifacts. The study restricts evaluation to highly controlled oral diadochokinesis (/pa-ta-ka/) tasks, leaving open whether linear centroid shifts generalize to unconstrained, continuous conversational speech. Furthermore, evaluation is restricted to three European-centric languages (Czech, German, Spanish), leaving low-resource or tonal languages unexplored.

## Why read this

Speech and ML researchers working on cross-lingual transfer or clinical biomarker detection will find this a compelling read for its demonstration that simple linear centroid arithmetic on frozen S3M representations can neutralize language identity confounds without expensive model fine-tuning.

## Code

- https://github.com/abnerLing/language-shift-dysarthria

## Applications

Cross-lingual clinical screening, zero-shot tele-health diagnostic tools for neurodegenerative disorders, and domain-robust pathological speech analysis.

## Institutions / 機構

FAU Erlangen-Nurnberg, UT Austin, Carnegie Mellon University, Czech Technical University in Prague, Idiap Research Institute, Universidad de Antioquia, Shenzhen Loop Area Institute, Fortemedia

## Related

- [Cross-lingual Retrieval-Augmented Classification for Dysarthria Severity Assessment](jeong26b_interspeech.md) — same problem · relatedness 2.4/3
- [PAN-Mask: Pathology-Aware Neurological Masking with End-to-End Learnable Weights for Neurological Disorder Detection from Speech](sun26b_interspeech.md) — same problem · relatedness 2.1/3
- [Phoneme Error and Uncertainty Features for Interpretable Dysarthric Speech Assessment](zhong26c_interspeech.md) — same problem · relatedness 2.1/3
- [Clinically-Supervised Hierarchical LoRA-MoE: A Parameter-Efficient Framework for Severity-Aware Dysarthric Speech Assessment](wang26ga_interspeech.md) — same problem · relatedness 2.1/3
- [Synergizing Zero-Shot Cross-Lingual Alzheimer Detection with Language-Invariant Multimodal Bi-Geometric Adversarial Learning](girish26b_interspeech.md) — shared technique · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
