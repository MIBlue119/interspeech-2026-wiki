---
id: kaffeza26_interspeech
category: paralinguistics-emotion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2556
pdf: https://www.isca-archive.org/interspeech_2026/kaffeza26_interspeech.pdf
---

# The Illusion of Balanced Multimodal Sentiment Analysis: Beyond the Limits of Optimization-Based Methods

*Ioanna Kaffeza, Efthymios Georgiou, Alexandros Potamianos*

[PDF](https://www.isca-archive.org/interspeech_2026/kaffeza26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kaffeza26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2556)

**Category:** `paralinguistics-emotion`

**TL;DR** — This paper reveals that optimization-based gradient and loss-balancing methods for multimodal sentiment analysis fail to outperform simple late concatenation because they confuse training fit speed with test-time discriminative utility. Evaluating these techniques on CMU-MOSI and CMU-MOSEI uncovers high hyperparameter sensitivity, near-zero consistent gains over strong baselines, and a structural accuracy headroom of up to 8.7% achievable only via sample-level valuation.

## Key contributions

- A unified empirical evaluation framework testing gradient-based (OGM-GE, AGM) and loss-based (PMR, ReconBoost) balancing strategies under controlled dominance scenarios on CMU-MOSI and CMU-MOSEI.
- A theoretical diagnosis demonstrating that optimization-based methods commit a category error by treating training fitting speed (loss, gradients, likelihoods) as proxies for test-time discriminative utility and complementarity.
- Controlled synthetic experiments (XOR-gated complementarity and spurious fast-learner tests) proving that existing gradient modulation techniques degrade performance when fast-fitting modalities carry genuine non-linear signals.
- Quantification of the structural limits of global reweighting, demonstrating an 8.70% (MOSI) and 7.79% (MOSEI) accuracy headroom gap between global oracles and restricted per-sample oracle fusion.

## Problem

Multimodal sentiment analysis often underperforms unimodal text counterparts due to modality imbalance, where heterogeneous learning dynamics cause one dominant modality (typically text) to steer optimization while others are undertrained. To counteract this, prior work relies on optimization-based interventions such as gradient reweighting (e.g., OGM-GE, AGM) and loss recalibration (e.g., PMR, ReconBoost) under the assumption that manipulating training dynamics restores balance. However, the field has continued to rely on these methods without realizing that optimizing training fit does not guarantee improved generalization or true modality contribution. This work addresses the critical gap of whether these optimization-based strategies actually resolve imbalance or merely mask underlying failure modes through hyperparameter tuning.

## Method

The empirical setup adopts a simple late-fusion architecture featuring unidirectional LSTM feature encoders for each modality, concatenated and passed to a shared classifier using cross-entropy loss. Evaluated gradient modulation methods (OGM, OGM-GE, AGM) dynamically scale backpropagation updates using output-likelihood discrepancies or Shapley-inspired log-likelihood differences, while loss methods (PMR, ReconBoost) reweight objectives via class prototypes or alternating cross-modal regularization. The authors systematically modify these pipelines by decoupling ratio estimation from training batches—computing metrics on a separate held-out development set (100 samples for MOSI, 200 for MOSEI) to reduce batch-size instability.

The theoretical and diagnostic analysis draws on the Generalized Ambiguity Decomposition theorem to show that cross-modal complementarity cannot be inferred from marginal losses. Synthetic setups (XOR tasks and controlled spurious fast-learning settings) isolate how gradient norms respond identically to generalizable signals versus non-generalizable shortcuts. Post-hoc analysis freezes unimodal encoders to evaluate global versus per-sample fusion weights via entropy and optimal weight disagreement metrics.

## Experimental setup

Evaluated on CMU-MOSI and CMU-MOSEI datasets using 768-dim BERT (text), COVAREP (audio), and OpenFace (visual) fixed representations. Compared against soft-voting ensembles, uni-modality pre-finetuned models, and joint late concatenation baselines. Optimized using Adam with ReduceLROnPlateau, batch sizes of 16 (MOSI) and 32 (MOSEI), patience 8 early stopping, and grid searches over learning rates for each method on a single NVIDIA GTX 1080 Ti (12GB). Metrics include accuracy (Acc-2), entropy, and optimal weight disagreement (OWD).

## Results

On CMU-MOSI and CMU-MOSEI across Audio-Video (A-V), Text-Video (T-V), and Audio-Text-Video (A-T-V) configurations, optimization-based methods yield negligible absolute accuracy changes (mostly within ±1.0% of Late Concatenation or Uni-Pre Finetuned baselines), with some configurations degrading (e.g., ReconBoost drops MOSI A-V accuracy from 54.93% down to 47.29%). Swapping the optimizer from Adam to SGD collapses any minor gains, revealing that apparent balancing effects are merely artifacts of favorable optimizer dynamics.

In synthetic XOR-gated complementarity tasks, OGM degrades fusion accuracy from 88% down to 76% in high-dominance conditions because it fails to recognize that neither modality is sufficient alone. Furthermore, the structural headroom analysis proves that a restricted per-sample oracle achieves 88.57% on MOSI and 89.57% on MOSEI compared to 79.88% and 81.78% for global oracles, exposing a massive 7.8%–8.7% untapped performance gap that global training-time reweighting cannot access.

| System / Condition | MOSI (A-V) Acc-2 | MOSI (T-V) Acc-2 | MOSEI (A-V) Acc-2 | MOSEI (T-V) Acc-2 |
| :--- | :--- | :--- | :--- | :--- |
| Late Concatenation | 54.93 | 74.35 | 32.55 | 43.99 |
| OGM [7] | 53.30 | 75.04 | 32.67 | 44.15 |
| OGM-GE [7] | 52.48 | 73.50 | 32.40 | 43.58 |
| AGM [8] | 53.73 | 74.61 | 32.71 | 44.15 |
| PMR [9] | 51.52 | 75.51 | 32.44 | 44.29 |
| ReconBoost [10] | 47.29 | 74.79 | 33.14 | 44.78 |

## Limitations

The empirical study is constrained by its focus on late-fusion architectures with unidirectional LSTMs, leaving open whether more complex cross-modal attention mechanisms (like MulT or self-supervised transformers) interact differently with gradient modulation. The analysis centers on Multimodal Sentiment Analysis (MOSI and MOSEI datasets) and English-language resources, meaning findings may not fully generalize to other multimodal tasks (e.g., audio-visual speech recognition or speech translation) without further verification. Additionally, while the paper diagnoses the failure of training-time signals, it leaves the implementation of practical sample-level discriminative meta-classifiers as an open research direction.

## Why read this

Researchers and ML engineers building multimodal systems should read this paper to avoid wasting compute on hyperparameter-sensitive gradient and loss reweighting heuristics. It delivers a rigorous theoretical and empirical wake-up call, redirecting the field away from training-loop optimization tricks toward held-out discriminative modality valuation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multimodal sentiment analysis, affect recognition systems, and robust multi-stream sensor fusion frameworks requiring reliable modality balancing.

## Institutions / 機構

Mines Paris-PSL University, University of Bern, National Technical University of Athens, Archimedes AI, Synaptic Bloom

## Related

- (link related pages by id as the wiki grows)
