---
id: girish26b_interspeech
category: health-clinical
labels: [low-resource, multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2756
pdf: https://www.isca-archive.org/interspeech_2026/girish26b_interspeech.pdf
---

# Synergizing Zero-Shot Cross-Lingual Alzheimer Detection with Language-Invariant Multimodal Bi-Geometric Adversarial Learning

*Girish, Mohd Mujtaba Akhtar, Farhan Sheth, Muskaan Singh, Juliana Gerard, Paula McClean, Kongfatt Wong-Lin*

[PDF](https://www.isca-archive.org/interspeech_2026/girish26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/girish26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2756)

**Category:** `health-clinical` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — The paper introduces ORBIT, a zero-shot cross-lingual speech-based Alzheimer’s disease detection framework that fuses multilingual audio and text PTMs using multi-tap adversarial learning and bi-geometric (spherical-hyperbolic) projections. It achieves up to 86.98% accuracy and 85.29% macro-F1 on held-out languages.

## Key contributions

- Proposes ORBIT, a language-invariant multimodal framework for zero-shot cross-lingual Alzheimer's detection combining speech and text PTMs.
- Implements multi-tap adversarial learning via gradient-reversal discriminators at the fusion, geometric projection, and cluster-assignment levels to eliminate language leakage.
- Leverages a bi-geometric architecture projecting fused features into complementary spherical and hyperbolic manifolds regularized via consensus clustering and product-of-experts voting.
- Curates a multilingual benchmark corpus spanning English, Spanish, Chinese, and Greek, evaluated under leave-one-language-out (LOLO) and leave-two-languages-out (LTLO) zero-shot protocols.

## Problem

Speech-based Alzheimer's disease detection (SADD) suffers from a lack of generalizability when applied to unseen languages due to language-specific acoustic and linguistic confounds. Prior work largely relies on language-specific unimodal or simple concatenation models that fail to strip out spurious language identity markers. Addressing this via cross-lingual zero-shot evaluation is crucial for deploying reliable, low-burden remote clinical screening tools globally without requiring labeled target-language clinical data.

## Method

ORBIT takes an audio feature vector and a text feature vector extracted from pretrained foundation models (e.g., mHuBERT and Qwen-3-Embeddings), processes them via lightweight 1D-convolutions, and applies attention pooling. Bidirectional cross-attention then conditions each modality on the other before an MLP layer fuses them into a unified representation.

To strip language identity, gradient-reversal layer (GRL) based multi-tap language discriminators are attached at the fusion representation, the subsequent spherical and hyperbolic projection heads, and the cluster-assignment level. The fused representation is mapped to a spherical manifold using spherical geodesic distance and to a Poincaré ball to capture hierarchical structures using hyperbolic geodesic distance. Intra-class heterogeneity is handled by learning cluster centers in both manifolds, regularized with Jensen-Shannon agreement, DEC sharpening, and a prototype margin.

Finally, temperature-scaled posteriors from both geometric views are combined via a product-of-experts vote for final classification. Models are trained for 50 epochs with a batch size of 32 using AdamW, freezing encoders for the first 2-3 epochs before unfreezing top layers with a smaller learning rate.

## Experimental setup

Evaluated on a multilingual corpus totaling 1,159 samples (Pitt English: 552, Ivanova Spanish: 270, NCMMSC Chinese: 187, Dem@Care Greek: 173) where transcripts for Greek were generated via Whisper-large-v3. Baselines include unimodal audio models (mHuBERT-147, Whisper-base, wav2vec 2.0 base, MMS-1B, XLS-R-1B) and text models (BERT, XLM-R, E5-large, Qwen-3-Embeddings) using FCN and CNN classifiers, alongside simple concatenation fusion baselines. Evaluated using Accuracy and macro-F1 under Leave-One-Language-Out (LOLO) and Leave-Two-Languages-Out (LTLO) zero-shot settings.

## Results

In the leave-one-language-out (LOLO) setting, ORBIT with mHuBERT and Qwen-3-Embeddings achieves a headline accuracy of 86.98% and macro-F1 of 85.29%, substantially outperforming simple concatenation and unimodal baselines. Ablation results confirm that removing the GRL adversary drops spherical model accuracy from 76.72% down to 70.99% under LTLO, and using both spherical and hyperbolic spaces with cross-attention outperforms single-geometry configurations.

| System / Condition | LTLO Accuracy | LTLO F1 | LOLO Accuracy | LOLO F1 |
|---|---|---|---|---|
| mHuBERT Unimodal Baseline | 61.38 | 60.11 | 66.40 | 62.01 |
| BERT Unimodal Baseline | 68.74 | 62.68 | 71.54 | 67.22 |
| Concat Fusion (mH + Q3) | 80.63 | 79.69 | 83.91 | 81.70 |
| ORBIT w/o Cross-Attention (mH + Q3) | 84.82 | 83.22 | 86.98 | 85.29 |
| ORBIT Full (mH + Q3) | 83.91 | 81.70 | 86.98 | 85.29 |

## Limitations

The evaluation is constrained to four languages (English, Spanish, Chinese, Greek) and binary Alzheimer's vs. Healthy Control classification, leaving multi-class dementia stages or low-resource dialect adaptation untested. The reliance on auto-generated transcripts for subsets lacking ground-truth text introduces potential ASR error propagation. Additionally, compute requirements scale with multi-tap adversarial discriminators and dual geometric manifold projections.

## Why read this

Speech and ML researchers focusing on cross-lingual transfer, adversarial representation learning, or multimodal fusion will find a rigorous blueprint for eliminating language leakage in clinical speech tasks. It provides concrete evidence that spherical-hyperbolic geometry combined with multi-tap adversarial constraints beats standard concatenation for zero-shot generalization.

## Code

- https://github.com/Helixometry/ORBIT.git

## Applications

Automated, non-invasive remote cognitive screening and longitudinal telehealth monitoring for Alzheimer's disease across diverse linguistic populations.

## Institutions / 機構

Ulster University, Manipal University

**Funding / 經費:** Alzheimer's Research UK, United States-Ireland-Northern Ireland R&D Partnership Programme, EPSRC

## Related

- (link related pages by id as the wiki grows)
