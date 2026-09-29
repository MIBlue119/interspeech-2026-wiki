---
id: zhang26o_interspeech
category: resources-evaluation
labels: [multilingual]
institutions: ["Chinese University of Hong Kong", "Shenzhen Loop Area Institute"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1105
pdf: https://www.isca-archive.org/interspeech_2026/zhang26o_interspeech.pdf
---

# Rubric-Aligned Disentangled Evaluation of Human Simultaneous Interpreting

*Ziyu Zhang, Satoshi Nakamura*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1105)

**Category:** `resources-evaluation` · **Labels:** `multilingual`

**TL;DR** — This paper introduces a rubric-aligned segment-level evaluation framework for human simultaneous interpreting (SI) that addresses the collapse of analytic dimensions in LLM prompts and scalar metrics by using a dual-head LoRA-adapted COMET-KIWI encoder. The proposed model achieves Pearson correlations of 0.388 for meaning transfer and 0.301 for delivery quality, approaching human-human consistency ceilings.

## Key contributions

- Constructed a professionally annotated segment-level SI corpus of 1,101 segments with explicit analytic rubric scores for meaning transfer (LQ), delivery quality (EXP), and perceived latency (LAT).
- Provided empirical evidence that structured zero/few-shot LLM prompts and traditional scalar supervision collapse rubric dimensions, yielding near-zero correlation with human ratings and excessive cross-dimension coupling (~0.90).
- Introduced a dual-regression-head neural metric built on a LoRA-adapted COMET-KIWI backbone to isolate supervision structure while preserving human-like cross-dimensional coupling (0.529 vs. human 0.56).
- Demonstrated that perceived latency shows near-zero correlation with objective delay (Pearson = -0.048), highlighting that human temporal synchronization judgments operate at the discourse level.

## Problem

Professional simultaneous interpreting (SI) evaluation relies on multi-criteria analytic rubrics (such as NAATI or CATTI) that assess meaning transfer, delivery quality, and latency separately, but these frameworks only operate at the interpreter level rather than providing fine-grained segment diagnostics. Standard machine translation metrics (like BLEU, BERTScore, and COMET-KIWI) and scalar regression collapse quality into a single score, failing to capture the incremental processing, omissions, and temporal constraints inherent to SI. Furthermore, while large language models are increasingly used as automated evaluators, instruction-level prompting fails to maintain rubric separability, causing dimensions to tightly couple and lose alignment with subjective professional ratings.

## Method

The framework models rubric-aligned SI evaluation as a multi-output text-only regression task, mapping a source segment and interpreted hypothesis to two independent scalar scores: \hat{s}_{LQ} and \hat{s}_{EXP}. The model employs a COMET-KIWI backbone (XLM-R Large, ~550M parameters) using a standard pair encoding format ([CLS] source [SEP] hypothesis [SEP]). To adapt the encoder efficiently, Low-Rank Adaptation (LoRA) with rank r=8, alpha=16, and 0.1 dropout is applied exclusively to attention Q and V projections.

The original scalar regression head is replaced by two independent linear heads initialized via scaled Xavier initialization. To mitigate prediction mean-collapse under noisy supervision, residual prediction is utilized (\hat{s}_d = \mu_d + \Delta_d for d \in \{LQ, EXP\}), trained with an objective function combining Mean Squared Error for both dimensions (weighted by w=1.7 for EXP) plus a variance regularization term (\lambda = 0.05). Predictions are clamped to [0, 3].

The training regimen spans approximately 10 epochs using a two-stage schedule: epoch 1 updates only the regression heads, while subsequent epochs jointly update the heads and LoRA parameters. Hyperparameters were tuned on the dev set, and checkpoints were selected by maximizing the sum of LQ and EXP Pearson correlations.

## Experimental setup

The dataset contains 1,101 segments sourced from BSTC and licensed TED-style conference recordings, split at the talk level into 839 training segments (48 talks), 87 development segments (5 talks), and 169 test segments (8 talks) covering both English-to-Chinese and Chinese-to-English directions. Baselines include Frozen COMET-KIWI, Frozen Encoder with Linear Heads, Single-Head LoRA Fine-Tuning, Prompt-Based LLM Evaluation (zero/few-shot), and a Mean Baseline. Evaluation metrics include Pearson correlation (r), Spearman correlation (\rho), prediction standard deviation, cross-dimension correlation, and mean squared error (MSE). Models were trained on Google Colab using an NVIDIA L4 GPU.

## Results

On the held-out test set, the mean baseline shows zero correlation, and frozen COMET-KIWI achieves moderate Pearson correlations of 0.219 (LQ) and 0.175 (EXP). The proposed dual-head model significantly improves performance, reaching 0.388 for LQ and 0.301 for EXP (statistically significant at p < 0.05). Prompt-based evaluation and scalar fine-tuning collapse on the dev set, yielding near-zero or negative correlations (e.g., scalar fine-tune LQ r = 0.092, EXP r = -0.020; few-shot prompt LQ r = 0.130, EXP r = 0.010) and an artificial cross-dimension coupling of ~0.90. In contrast, the proposed dual-head model achieves a cross-dimension correlation of 0.529, closely mirroring human raters' coupling of 0.56. The model struggles primarily on procedural multi-step segments where macro-level workflow preservation masks micro-level step omissions.

| System / Condition | LQ ($r$) | EXP ($r$) |
| :--- | :---: | :---: |
| Mean Baseline | 0.000 | 0.000 |
| Prompt (Zero-Shot) | 0.054 | 0.041 |
| Prompt (Few-Shot) | 0.130 | 0.010 |
| Scalar Fine-Tune | 0.092 | -0.020 |
| Frozen COMET-KIWI | 0.219 | 0.175 |
| Dual-Head (Proposed) | **0.388** | **0.301** |

## Limitations

The current framework is strictly text-only, preventing the delivery quality head (EXP) from leveraging acoustic cues such as prosody, pauses, and disfluency patterns directly from speech audio. The dataset size is relatively small (1,101 segments across 61 talks) and restricted to English-Chinese language pairs. Additionally, subjective segment-level annotations exhibit inherent rater scale variability and low absolute agreement (ICC(2,1) of 0.139 for LQ and 0.140 for EXP), bounding absolute model prediction accuracy.

## Why read this

Researchers and engineers building automated evaluation tools for speech-to-speech translation or simultaneous interpreting should read this paper to understand why standard scalar metrics and LLM prompting fail to capture multidimensional rubrics. It provides a blueprint for using parameter-efficient dual-head adaptation to recover stable, human-aligned ranking signals.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated formative assessment pipelines for simultaneous interpreting training, real-time diagnostic feedback systems for professional interpreters, and rubric-aligned benchmarking for speech translation models.

## Institutions / 機構

Chinese University of Hong Kong, Shenzhen Loop Area Institute

**Funding / 經費:** National Natural Science Foundation of China, Program for Guangdong Introducing Innovative and Entrepreneurial Teams

## Related

- (link related pages by id as the wiki grows)
