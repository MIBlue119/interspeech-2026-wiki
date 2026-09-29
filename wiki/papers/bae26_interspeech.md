---
id: bae26_interspeech
category: health-clinical
labels: [low-resource, self-supervised, robustness-noise]
institutions: ["University of Illinois Urbana-Champaign", "Korea Advanced Institute of Science & Technology"]
code: https://github.com/JaesungBae/DA-DSQA
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1390
pdf: https://www.isca-archive.org/interspeech_2026/bae26_interspeech.pdf
---

# Something from Nothing: Data Augmentation for Robust Severity Level Estimation of Dysarthric Speech

*Jaesung Bae, Xiuwen Zheng, Minje Kim, Chang D. Yoo, Mark Hasegawa-Johnson*

[PDF](https://www.isca-archive.org/interspeech_2026/bae26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bae26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1390)

**Category:** `health-clinical` · **Labels:** `low-resource`, `self-supervised`, `robustness-noise`

**TL;DR** — A three-stage framework leveraging pseudo-labeling, contrastive representation learning, and external typical speech achieves robust dysarthric speech quality assessment (DSQA), reaching an average SRCC of 0.761 on unseen cross-domain test sets. By combining 232.9 hours of unlabeled dysarthric data (Speech Accessibility Project) with 921.7 hours of clean typical speech (LibriSpeech) under a coarse binary contrastive objective, it substantially outperforms existing SQA baselines.

## Key contributions

- A three-stage framework (pseudo-labeling, weakly supervised contrastive pretraining, and fine-tuning) that fully exploits large quantities of unlabeled dysarthric speech.
- Integration of a large-scale typical speech corpus (LibriSpeech) to dramatically expand acoustic and speaker environment diversity.
- A coarse binary grouping contrastive loss strategy (L_coarse) that effectively bridges the distribution gap between typical and pathological speech without overfitting to noisy pseudo-labels.
- Comprehensive cross-domain evaluation across five diverse datasets spanning multiple languages (English, Mandarin, Italian, Czech, Slovak, Spanish) and clinical etiologies.

## Problem

Dysarthric speech quality assessment (DSQA) is crucial for clinical monitoring and inclusive technologies like ASR and speech enhancement, but collecting expert ratings from speech-language pathologists is expensive and difficult to scale. Existing models trained purely on small labeled subsets or non-pathological speech struggle to generalize across diverse clinical etiologies, acoustic environments, and languages. Prior speech foundation models and non-intrusive metrics (e.g., DNSMOS, UTMOS) fail to reliably capture the perceptual and intelligibility dimensions unique to pathological speech.

## Method

The system relies on a frozen Whisper-large-v3 encoder to extract frame-level features, followed by two linear projection layers, statistical temporal average pooling, and a final prediction layer. In Stage 1, a regression model is trained on 10.8 hours of labeled Speech Accessibility Project (SAP) data using Huber loss (delta = 0.5) to generate pseudo-labels for 232.9 hours of unlabeled SAP speech. In Stage 2, weakly supervised contrastive pretraining is performed using the pseudo-labeled SAP data, labeled SAP data, and 921.7 hours of LibriSpeech (assigned a typical label of 1). Three contrastive strategies are evaluated (discrete, continuous distance thresholding, and coarse binary thresholding L_coarse where beta = 1.5), alongside VICReg variance regularization (gamma = 1.0) to prevent feature collapse. Larger temperatures (tau = 10.0 for L_coarse) prevent dataset separation between LibriSpeech and SAP.

In Stage 3, the pretrained adaptation layers are frozen/initialized, a fresh linear regression head is added, and the model is fine-tuned end-to-end on the labeled SAP dataset using AdamW with a learning rate of 1e-4 and label-weighted random sampling for 10 epochs. The entire architecture decouples robust representation learning from final fine-grained regression, mitigating label noise while adapting representations to clinical severity.

## Experimental setup

Evaluated on the English Speech Accessibility Project (SAP: 10.8 hours labeled, 232.9 hours unlabeled for training; 3.1 hours for testing) and LibriSpeech (921.7 hours). Cross-domain zero-shot evaluation is performed on five multilingual datasets: UASpeech (English, 7.8 hrs), DysArinVox (Mandarin, 2.3 hrs), EasyCall (Italian, 10.0 hrs), EWA-DB (Czech/Slovak, 4.4 hrs), and NeuroVoz (Spanish, 1.7 hrs). Baselines include DNSMOS, UTMOS, SpICE, HuBERT Probe, standard fine-tuned Whisper (Baseline), SimCLR, and Rank-N-Contrast (RNC). Metrics are Spearman's Rank Correlation Coefficient (SRCC) and Pearson Correlation Coefficient (PCC).

## Results

The proposed L_coarse framework achieves an average cross-domain SRCC of 0.761 (PCC 0.749) and an in-domain SAP SRCC of 0.716, significantly outperforming DNSMOS (0.105 avg SRCC), UTMOS (0.346 avg SRCC), SpICE (0.450 avg SRCC), and HuBERT Probe (0.621 avg SRCC). Compared to the raw Whisper Baseline (0.732 cross-domain SRCC), L_coarse improves cross-domain robustness across nearly all test sets, hitting 0.975 SRCC on UASpeech and 0.631 on DysArinVox. Ablations show that dropping LibriSpeech data reduces cross-domain average SRCC to 0.734, while omitting variance regularization or using fine-grained pseudo-labeling hurts out-of-domain generalization due to overfitting.

| System | SAP (In-Domain) SRCC | UASpeech SRCC | DysArinVox SRCC | EasyCall SRCC | EWA-DB SRCC | NeuroVoz SRCC | Cross-Domain Avg SRCC |
|---|---|---|---|---|---|---|---|
| DNSMOS | 0.186 | 0.750 | 0.370 | 0.041 | -0.274 | -0.361 | 0.105 |
| UTMOS | 0.489 | 0.962 | 0.521 | -0.051 | 0.328 | -0.028 | 0.346 |
| SpICE | 0.473 | 0.936 | 0.538 | 0.205 | 0.393 | 0.180 | 0.450 |
| HuBERT Probe | 0.531 | 0.927 | 0.279 | 0.604 | 0.588 | 0.705 | 0.621 |
| Baseline | 0.719 | 0.949 | 0.578 | 0.849 | 0.709 | 0.575 | 0.732 |
| Proposed (L_coarse) | 0.716 | 0.975 | 0.631 | 0.872 | 0.711 | 0.617 | 0.761 |

## Limitations

Training relies entirely on English-only dysarthric and typical datasets, limiting direct supervision scope despite zero-shot cross-lingual evaluations. The approach depends on initial pseudo-labels generated by a model trained on a small labeled fraction (3% of SAP), which can constrain the ceiling of representations if initial model bias is severe. Evaluation relies solely on utterance-level aggregations compared against speaker-level clinical scales, leaving fine-grained temporal error localization unexplored.

## Why read this

Read this paper to learn how to effectively combine limited domain-specific labeled data, large unlabeled target data, and auxiliary out-of-domain typical corpora via weakly supervised contrastive learning. It offers a masterclass in adapting robust speech foundation models (Whisper) for pathological and low-resource acoustic regression tasks.

## Code

- https://github.com/JaesungBae/DA-DSQA

## Applications

Automated clinical screening of motor speech disorders, continuous speech rehabilitation monitoring, and data filtering/augmentation for pathological automatic speech recognition (ASR) and speech synthesis.

## Institutions / 機構

University of Illinois Urbana-Champaign, Korea Advanced Institute of Science & Technology

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, National Science Foundation

## Related

- [Clinically-Supervised Hierarchical LoRA-MoE: A Parameter-Efficient Framework for Severity-Aware Dysarthric Speech Assessment](wang26ga_interspeech.md) — same problem · relatedness 2.6/3
- [Augmenting Dysarthric Speech Severity Assessment with MOS Supervision](jia26_interspeech.md) — same problem · relatedness 2.5/3
- [Cross-lingual Retrieval-Augmented Classification for Dysarthria Severity Assessment](jeong26b_interspeech.md) — same problem · relatedness 2.4/3
- [Phoneme Error and Uncertainty Features for Interpretable Dysarthric Speech Assessment](zhong26c_interspeech.md) — same problem · relatedness 2.3/3
- [A Fine-Grained Acoustically-Aware Pre-training Encoder for Speech Quality Assessment](sultana26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
