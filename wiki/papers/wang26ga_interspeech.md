---
id: wang26ga_interspeech
category: health-clinical
labels: [efficient-on-device, self-supervised]
institutions: ["Xi'an Jiaotong University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3043
pdf: https://www.isca-archive.org/interspeech_2026/wang26ga_interspeech.pdf
---

# Clinically-Supervised Hierarchical LoRA-MoE: A Parameter-Efficient Framework for Severity-Aware Dysarthric Speech Assessment

*Jiaqi Wang, Guanghua Xu, Hongjie Zhou, Shuwen Bai, Sicong Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26ga_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26ga_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3043)

**Category:** `health-clinical` · **Labels:** `efficient-on-device`, `self-supervised`

**TL;DR** — A parameter-efficient adaptation framework for WavLM that uses a clinically-supervised, hierarchical LoRA-MoE architecture to assess dysarthria severity, achieving an F1 score of 61.55% on 5-class classification and 94.54% on binary detection on the UA-Speech corpus.

## Key contributions

- A hierarchical LoRA-MoE framework combining shared lower layers for general acoustic features with dynamic, severity-aware expert LoRAs in deeper layers.
- A clinically-supervised router using temporal attention pooling and utterance-level clinical severity priors to guide dynamic expert selection.
- A robust temporal variability augmentation strategy incorporating temporal masking to simulate articulatory interruptions and irregular pauses in pathological speech.
- State-of-the-art performance on the UA-Speech corpus under a strict speaker-independent (OSPS) protocol while updating a minimal fraction of parameters.

## Problem

Automatic dysarthria severity assessment is severely hindered by data scarcity and high inter- and intra-speaker acoustic heterogeneity. Standard self-supervised learning (SSL) models like HuBERT and WavLM are prone to overfitting and catastrophic forgetting when fully fine-tuned on low-resource medical data, while conventional uniform LoRA adapters lack the representational capacity to capture fine-grained pathological variations across different severity levels. Addressing this is crucial for reliable clinical rehabilitation and monitoring.

## Method

The framework builds on a pretrained WavLM-Large backbone (24 layers, hidden dimension 1024) with frozen Transformer weights, while fine-tuning the CNN feature extractor. The model is hierarchically partitioned: the lower N layers (set to N = 9 via ablation) use a single shared LoRA adapter (rank r = 16, alpha = 32, dropout 0.3) applied to query, key, value, and output projection matrices as well as both feed-forward sublayers. The upper 24 - N layers use a Mixture-of-Experts (MoE) configuration consisting of five distinct expert LoRA pairs.

A Clinically-Supervised Router is inserted after the N-th layer. It aggregates frame-wise features via temporal self-attention pooling into a 256-dimensional intermediate embedding to predict a routing distribution over the five severity-specific experts. The training objective is multi-task: a class-weighted cross-entropy loss with label smoothing (0.1) for classification, a router supervision cross-entropy loss aligning router output with clinical severity targets (scaling lambda_1 = 0.3), and a load-balancing penalty regularizing routing probabilities toward a uniform prior (scaling lambda_2 = 0.1).

During training, utterances undergo stochastic acoustic perturbations (Gaussian noise, time stretching, pitch shifting) with a 30% probability, combined with an independent 50% probability of temporal masking (replacing 0.05s to 0.8s segments with silence) to mimic articulatory gaps. Optimization uses AdamW with weight decay 0.01, a linear learning rate schedule peaking at 4e-5 with 2,000 warm-up steps, and a batch size of 32 for 20 epochs across six NVIDIA RTX 3090 GPUs.

## Experimental setup

Evaluated on the UA-Speech corpus (15 speakers with dysarthria, 13 healthy controls; 765 utterances per subject, 455 distinct lexical items). Employs a strict One-Speaker-per-Severity (OSPS) speaker-independent cross-validation protocol over 5 random splits (11 pathological and 12 healthy speakers for training; 4 pathological and 1 healthy for testing). Compared against Full Fine-Tuning (Fully FT) and standard LoRA across HuBERT-Large and WavLM-Large backbones. Metrics include Macro-Averaged F1 Score, accuracy, precision, recall, and AUC.

## Results

On the 5-class severity classification task using WavLM, the proposed LoRA-MoE framework achieves 64.32% accuracy and a macro F1 score of 61.55%, outperforming full fine-tuning (62.30% acc, 57.94% F1) and standard LoRA (58.49% acc, 55.02% F1). For the 2-class binary detection task, WavLM LoRA-MoE achieves 95.14% accuracy, 96.59% AUC, and 94.54% F1 score. Ablations on shared layer depth N confirm that an intermediate split of N = 9 achieves peak performance (64.32% acc / 61.55% F1), whereas too shallow (N = 5: 59.49% acc) or too deep (N = 19: 58.64% acc) configurations degrade results.

| System | Method | 5-class Acc (%) | 5-class F1 (%) | 2-class Acc (%) | 2-class AUC (%) | 2-class F1 (%) |
|---|---|---|---|---|---|---|
| HuBERT | Fully FT | 60.82 | 57.01 | 86.90 | 85.58 | 87.56 |
| HuBERT | LoRA-MoE | 63.71 | 61.32 | 93.45 | 92.28 | 92.50 |
| WavLM | Fully FT | 62.30 | 57.94 | 87.79 | 91.93 | 86.86 |
| WavLM | LoRA | 58.49 | 55.02 | 86.54 | 82.05 | 86.90 |
| WavLM | LoRA-MoE | 64.32 | 61.55 | 95.14 | 96.59 | 94.54 |

## Limitations

Evaluated exclusively on the English UA-Speech corpus, leaving multilingual generalization untested. The framework relies on discrete clinical severity categories, limiting direct application to continuous longitudinal regression tracking without further adaptation. Training requires multi-GPU setups (6x RTX 3090) and careful tuning of multi-task loss weighting hyper-parameters.

## Why read this

Researchers and engineers working on low-resource medical speech processing will learn how to design input-conditioned, hierarchical parameter-efficient adapters that outperform full fine-tuning while preserving SSL foundation model representations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical dysarthria severity assessment, speech therapy progress tracking, and robust speech recognition front-ends for atypical speakers.

## Institutions / 機構

Xi'an Jiaotong University

**Funding / 經費:** Scientific and Technological Innovation 2030 Major Project, Key Research and Development Program of Shaanxi Province

## Related

- (link related pages by id as the wiki grows)
