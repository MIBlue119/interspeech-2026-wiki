---
id: mylvaganam26_interspeech
category: speaker
labels: [low-resource, multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1789
pdf: https://www.isca-archive.org/interspeech_2026/mylvaganam26_interspeech.pdf
---

# Hybrid Continual Learning for Low-Resource Australian Aboriginal Language Identification

*Pravina Mylvaganam, Ting Dang, Eliathamby Ambikairajah, Vidhyasaharan Sethu, Jingyao Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/mylvaganam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mylvaganam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1789)

**Category:** `speaker` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — This paper proposes two hybrid continual learning frameworks—Replay-Augmented Elastic Weight Consolidation (RA-EWC) and Constraint-Guided Knowledge Distillation (CG-KD)—to adapt pretrained multilingual speech models for extremely low-resource Australian Aboriginal languages while preventing catastrophic forgetting, achieving up to 93.38% overall F1-score.

## Key contributions

- Proposes Replay-Augmented Elastic Weight Consolidation (RA-EWC) combining Fisher Information matrix-based parameter regularization with a small high-resource replay buffer.
- Proposes Constraint-Guided Knowledge Distillation (CG-KD) combining EWC with Kullback-Leibler Divergence soft-target matching from a frozen teacher model.
- Evaluates the frameworks on three extremely low-resource Australian Aboriginal languages (Warlpiri, Dalabon, and Dharawal) under both single-task adaptation and sequential multi-task adaptation settings.
- Demonstrates that sequential adaptation circumvents the severe data imbalance issues that cripple joint multi-task training on extremely scarce languages, consistently achieving 100% in-language F1-scores.

## Problem

Integrating endangered Australian Aboriginal languages (AALs) into speech technologies is hindered by severe data scarcity, with available corpora ranging from just 3 hours to 11 minutes of speech. While transfer learning from high-resource languages enables recognition of new targets, full or parameter-efficient fine-tuning triggers catastrophic forgetting, drastically degrading performance on previously learned high-resource languages. Standard continual learning methods such as Elastic Weight Consolidation, Experience Replay, or Knowledge Distillation alone struggle with severe data imbalances and long-term adaptation. This creates an urgent need for hybrid continual learning strategies that can continually ingest scarce minority languages without destabilizing prior task knowledge.

## Method

The system utilizes an ECAPA-TDNN encoder pretrained on VoxLingua107 (6,000 hours across 107 languages) as the backbone, followed by a language identification classifier. For RA-EWC, the encoder is frozen, and only the classifier is updated using a combined objective of negative log-likelihood (NLL) on new low-resource AAL data ($L_{LRL}$), NLL replay loss on stored high-resource samples ($L_{ER}$), and a Fisher Information Matrix regularization constraint ($L_{EWC}$) penalizing changes to critical weights. The total RA-EWC loss is $L_{Total}(\theta) = L_{LRL}(\theta) + \beta L_{ER}(\theta) + \lambda L_{EWC}(\theta)$ with hyperparameters $\beta = 1.0$ and $\lambda = 10^6$.

For CG-KD, both the student model's encoder and updated classifier are jointly fine-tuned while a frozen teacher model retains the original high-resource knowledge. The objective function combines the low-resource NLL loss, the EWC weight regularization term, and a Kullback-Leibler Divergence (KLD) loss aligning output distributions over high-resource classes. The total CG-KD loss is $L_{total}(\theta) = (1 - \alpha)(L_{LRL}(\theta) + \lambda L_{EWC}(\theta)) + \alpha L_{KLD}(\theta)$ with $\alpha = 0.7$ and temperature $T = 2.0$. Optimization uses the AdamW optimizer with an initial learning rate of 0.001, a ReduceLROnPlateau scheduler, and a batch size of 32 for 3 epochs.

## Experimental setup

Experiments use VoxLingua107 high-resource data (1,000 utterances per language, 8-10 seconds each) and three AAL datasets sourced from DoReCo and Dharawal Words: Warlpiri (1,125 utterances, 3 hours, 18 speakers), Dalabon (284 utterances, 40 minutes, 4 speakers), and Dharawal (63 utterances, 11 minutes, 8 speakers), split 80/10/10 for train/val/test after downsampling to 16 kHz. Baselines include naive transfer learning (TL), Elastic Weight Consolidation (EWC), Experience Replay (ER), Knowledge Distillation (KD), and joint training ($\cup$). Metrics include target AAL F1-score and High-Resource Language (HRL) F1-score.

## Results

In single AAL adaptation for Warlpiri, naive transfer learning drops HRL F1-score from 90.72% to 62.47% due to catastrophic forgetting. Baseline KD achieves 93.02% overall F1 (91.56% HRL, 100% Warlpiri), while proposed RA-EWC achieves 87.41% overall, and CG-KD achieves the best overall performance at 93.38% (92.89% HRL, 100% Warlpiri). For extremely scarce Dalabon, CG-KD achieves 85.68% overall (85.33% HRL, 100% Dalabon), outperforming baseline KD (84.60%). For Dharawal (11 minutes of data), CG-KD reaches 76.41% overall (76.47% HRL, 100% Dharawal). In sequential multi-task adaptation, joint training severely degrades Dharawal performance down to 50%-66.67% due to majority class dominance, whereas sequential training with CG-KD and RA-EWC achieves a perfect 100% F1-score on Dharawal regardless of task presentation order.

| System / Condition | HRL F1 (%) | Warlpiri F1 (%) | Dalabon F1 (%) | Dharawal F1 (%) | Overall F1 (%) |
|---|---|---|---|---|---|
| Source (Pretrained) | 90.72 | - | - | - | - |
| Naive Transfer Learning (TL) | 62.47 | 98.70 | - | - | 65.38 |
| EWC Baseline | 84.06 | 100 | - | - | 85.36 |
| KD Baseline | 91.56 | 100 | - | - | 93.02 |
| RA-EWC (Proposed) | 86.76 | 100 | - | - | 87.41 |
| CG-KD (Proposed) | 92.89 | 100 | - | - | **93.38** |

## Limitations

Evaluated on a very narrow scope of only three Australian Aboriginal languages with small sample sizes (max 3 hours), meaning cross-lingual generalization to thousands of other low-resource language families remains unverified. The compute requirements rely on pre-existing large-scale foundation models, and evaluation is constrained strictly to language identification tasks without testing downstream ASR or translation integration.

## Why read this

Speech and ML researchers working on extreme low-resource adaptation and continual learning should read this paper to see how combining knowledge distillation or replay buffers with Fisher Information regularization successfully mitigates catastrophic forgetting without requiring balanced joint datasets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building inclusive language identification systems, speech archiving pipelines, and digital preservation tools for endangered and indigenous languages.

## Institutions / 機構

University of New South Wales, University of Melbourne, Massachusetts Institute of Technology

**Funding / 經費:** School of Electrical Engineering and Telecommunications at UNSW Sydney

## Related

- (link related pages by id as the wiki grows)
