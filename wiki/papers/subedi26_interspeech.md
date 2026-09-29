---
id: subedi26_interspeech
category: speaker
labels: [multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2966
pdf: https://www.isca-archive.org/interspeech_2026/subedi26_interspeech.pdf
---

# BiMamba2 Masked Discrete-Unit Prediction for Multilingual Speech Representation for Unsupervised Speech in the Wild Challenge

*Prakriti Subedi, Howard Prioleau, Saurav Aryal*

[PDF](https://www.isca-archive.org/interspeech_2026/subedi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/subedi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2966)

**Category:** `speaker` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — A 47.88M-parameter bidirectional Mamba-2 encoder trained via HuBERT-style masked discrete-unit prediction on 250 hours of multilingual speech achieves an official speaker clustering Adjusted Rand Index of 0.735, outperforming several standard challenge baselines.

## Key contributions

- A bidirectional Mamba-2 (BiMamba2) masked discrete-unit prediction architecture for unsupervised multilingual speech representation.
- A shard-based multilingual training pipeline incorporating VAD filtering and a hybrid language-aware batch sampler to curb English dominance.
- A multi-objective loss combining k-means masked prediction, VICReg regularization, and auxiliary language identification supervision.
- An empirical analysis of evaluation mismatches between local holdout diagnostics and official Dynabench probe rankings.

## Problem

Unsupervised speech representation learning faces severe performance disparities across languages due to the lack of labeled data in low-resource settings. Prior self-supervised approaches rely heavily on large, balanced corpora or causal architectures that fail to leverage full bidirectional context when representations are frozen. Moreover, evaluating models via local heuristics often fails to reliably predict performance on out-of-distribution challenge benchmarks like Dynabench.

## Method

The model uses a BiMamba2 encoder backbone consisting of 12 layers with a model dimension of 768, state dimension of 16, convolution width of 7, and expansion factor of 2, totaling 47.88M parameters. Each BiMamba2 layer computes element-wise sums across three parallel paths: a forward structured state-space (SSD) path, a flipped backward SSD path, and a learnable linear residual skip path. Inputs are 80-bin log-mel spectrograms extracted with a 10 ms hop size from 10-second fixed-length audio chunks sampled at 16 kHz.

The training objective combines a HuBERT-style cross-entropy loss over $k=200$ offline MiniBatchKMeans pseudo-labels at masked positions (covering 75% of valid frames using 3-5 block spans), VICReg regularization (variance weight 5.0, covariance weight 1.0) on mean-pooled states to prevent representation collapse, and an auxiliary language identification (LID) cross-entropy loss with weight 0.05. The model is optimized using AdamW with a base learning rate of $10^{-4}$, linear warmup over 2,000 steps, and cosine decay to $0.1 \times$ base lr under bfloat16 mixed precision and a batch size of 128.

During inference for the Dynabench probe API, frame-level outputs are averaged over three non-overlapping temporal segments (start, middle, end) and L2-normalized to form fixed-dimensional embeddings without task-specific fine-tuning.

## Experimental setup

Evaluated on the MLCommons Unsupervised People's Speech (UPS) Challenge evaluation set via Dynabench probe tasks, comparing against baselines Whisper, HuBERT-large, XLSR, and wav2vec 2.0. Training data comprises ~250 hours across 67 languages (~100h English, ~150h non-English) from 438 precomputed shards after VAD and duration filtering. Implemented using a single NVIDIA RTX A6000 GPU.

## Results

The primary model checkpoint at step 19,500 achieves an official ARI of 0.735, surpassing all four challenge baselines (outperforming wav2vec 2.0 at 0.630, HuBERT-large at 0.600, Whisper at 0.560, and XLSR at 0.100). On language identification and speech recognition, it scores 0.073 macro-F1 and 0.870 CER, trailing supervised baselines like Whisper (0.950 macro-F1) and HuBERT-large (0.570 CER). A later checkpoint at step 48,000 shows severe CER degradation to 0.998 despite stable ARI (0.710), driven by late-stage embedding geometry shifts.

| System | Macro-F1 $\uparrow$ | CER $\downarrow$ | ARI $\uparrow$ |
|---|---|---|---|
| Whisper | **0.950** | 0.790 | 0.560 |
| HuBERT-large | 0.690 | **0.570** | 0.600 |
| XLSR | 0.260 | 0.900 | 0.100 |
| wav2vec 2.0 | 0.250 | 0.980 | 0.630 |
| Ours ($d=512, 8L$) | 0.052 | 0.996 | 0.291 |
| Ours (step 48k) | 0.070 | 0.998 | 0.710 |
| Ours (step 19.5k) | 0.073 | 0.870 | **0.735** |

## Limitations

The study lacks component-wise ablation experiments, reports single-run results without variance estimates, and uses a training corpus (~250 hours) substantially smaller than those used by baseline models. Furthermore, pseudo-labels are computed once without iterative refinement, and local holdout evaluations poorly predicted official Dynabench probe generalization.

## Why read this

Researchers building state-space models for speech and those investigating unsupervised multilingual representation learning will find concrete architectural blueprints, hyperparameter configurations, and critical lessons on evaluation mismatch pitfalls.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Unsupervised multilingual speech processing, low-resource speech representation learning, and speaker clustering.

## Institutions / 機構

Howard University

**Funding / 經費:** Office of Naval Research, Department of the Navy, NIH Common Fund, Amazon Research Award

## Related

- (link related pages by id as the wiki grows)
