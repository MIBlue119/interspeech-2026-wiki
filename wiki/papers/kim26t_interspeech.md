---
id: kim26t_interspeech
category: speech-llm-dialogue
labels: [efficient-on-device, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3071
pdf: https://www.isca-archive.org/interspeech_2026/kim26t_interspeech.pdf
---

# Fast Speech Foundation Model Distillation Using Interleaved Stacking

*Eungbeom Kim, Kyogu Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3071)

**Category:** `speech-llm-dialogue` · **Labels:** `efficient-on-device`, `self-supervised`

**TL;DR** — Interleaved Stacking accelerates speech foundation model knowledge distillation by progressively building model depth while preserving layer positions, achieving speedups up to 1.24x with little to no downstream performance degradation.

## Key contributions

- Introduces interleaved stacking for speech foundation model knowledge distillation to resolve positional inconsistency issues found in prior stacking methods.
- Combines stagewise training with intermediate-level layer-to-layer mean squared error (MSE) distillation losses naturally enabled by consistent layer placement.
- Achieves 1.16x to 1.24x wall-clock training speedups using 4-stage equal and proportional scheduling across SUPERB benchmark tasks.
- Demonstrates that interleaved stacking matches or exceeds the performance of non-stacked distillation baselines on phoneme recognition, slot filling, and speaker identification.

## Problem

Knowledge distillation effectively compresses large speech foundation models (SFMs) like HuBERT, but training efficient student models remains computationally expensive and under-explored regarding training acceleration. Existing stagewise stacking methods like gradual stacking and MIDAS progressively increase model depth during training, but they suffer from severe performance degradation because they alter layer positions across stages. Because SFMs encode distinct, layer-specific knowledge, this positional shuffling disrupts intermediate representations and prevents stable intermediate-level supervision.

## Method

The student architecture targets a 12-layer Transformer model (width dimensions: hidden size 384, feed-forward dimension 1536, 8 attention heads, 26.87M parameters) distilled from a 94.68M-parameter HuBERT base teacher. Training uses a 4-stage setup ($B=4$), starting with an initial depth of $K = N/B = 3$ layers. Rather than appending copied layers to the top (gradual stacking) or selecting arbitrary blocks (MIDAS), interleaved stacking copies every $b$-th layer from the current stage and inserts each clone immediately after its original counterpart. This preserves relative layer-position consistency and takes advantage of high local cross-layer similarity in Transformer models. 

The total loss combines an output-level frame-level MSE loss ($L = \text{MSE}(y^T, \text{proj}(y))$) with a fixed intermediate-level KD loss ($L_{\text{inter}}$). The intermediate loss uses layer-to-layer MSE matching against fixed teacher layer indices across all training stages to maintain stability. The combined loss is $L_{\text{total}} = L + w L_{\text{inter}}$, using a loss weight $w = 0.5$. 

Optimization uses AdamW with a learning rate of $5 \times 10^{-4}$, batch size 64, weight decay $1 \times 10^{-4}$, and a linear decay schedule with 7% warmup over 75 epochs on 960 hours of LibriSpeech data.

## Experimental setup

Evaluated on the SUPERB benchmark covering phoneme recognition (PR), automatic speech recognition (ASR), slot filling (SF), and speaker identification (SID). Baselines include original HuBERT, DistilHuBERT, 12-layer HALF, ARMHuBERT, DPHuBERT, and non-stacked full training models with and without layer-to-layer loss (Full, Full L2L), plus GradStack and MIDAS stacking baselines. Two scheduling strategies are tested: equal scheduling (EQL) and proportional scheduling (PROP-1).

## Results

Under equal scheduling, InterleaveStack achieves a Phone Error Rate (PER) of 9.08 on PR, a Word Error Rate (WER) of 10.22 on ASR, an F1 score of 86.36 on SF, and an Accuracy of 72.26 on SID, outperforming GradStack (11.50 PER, 11.04 WER, 84.34 SF F1, 70.89 SID Acc) and MIDAS. Using proportional scheduling (PROP-1), InterleaveStack further improves to 8.88 PER, 9.99 WER, 85.70 SF F1, and 73.60 SID Acc at a 1.16x speedup. Notably, InterleaveStack with PROP-1 beats the non-stacked Full L2L model on PR (8.88 vs 9.12), SF CER, and SID Accuracy (73.60 vs 72.99), showing that staging can act as a beneficial regularizer.

| System | Schedule | Speedup | PER ↓ | WER ↓ | F1 ↑ | Acc ↑ |
|---|---|---|---|---|---|---|
| Full L2L | - | 1.00x | 9.12 | 9.92 | 86.47 | 72.99 |
| GradStack | EQL | 1.25x | 11.50 | 11.04 | 84.34 | 70.89 |
| MIDAS | EQL | 1.25x | 10.75 | 10.74 | 83.43 | 69.94 |
| InterleaveStack (ours) | EQL | 1.24x | 9.08 | 10.22 | 86.36 | 72.26 |
| InterleaveStack (ours) | PROP-1 | 1.16x | 8.88 | 9.99 | 85.70 | 73.60 |

## Limitations

Evaluated exclusively on a single base teacher architecture (HuBERT base) and evaluated primarily on English LibriSpeech data with standard SUPERB downstream tasks. The approach requires careful tuning of intermediate loss weights and stage scheduling. The scope does not cover ultra-large speech foundation models (e.g., billion-parameter models) or streaming/on-device inference latency benchmarking directly.

## Why read this

Researchers and engineers looking to accelerate the costly training phase of speech foundation model distillation without accepting downstream performance penalties should read this to understand how layer position preservation enables stable stagewise training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient on-device deployment of speech foundation models, rapid prototyping of compressed ASR and spoken language understanding systems, and low-resource speech processing pipelines.

## Institutions / 機構

Seoul National University

**Funding / 經費:** National Research Foundation of Korea, Institute of Information & Communications Technology Planning & Evaluation, National IT Industry Promotion Agency

## Related

- (link related pages by id as the wiki grows)
