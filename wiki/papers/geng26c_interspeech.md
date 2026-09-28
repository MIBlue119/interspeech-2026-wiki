---
id: geng26c_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1719
pdf: https://www.isca-archive.org/interspeech_2026/geng26c_interspeech.pdf
---

# Beyond Uncertainty and Diversity: Temporal-Spectral Guided Active Learning for Audio

*Hui Geng, Tianjiao Wan, Yi Su, Qisheng Xu, Hengzhu Liu, Kele Xu*

[PDF](https://www.isca-archive.org/interspeech_2026/geng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/geng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1719)

**TL;DR** — Temporal-Spectral Active Learning (TSAL) is an active learning framework for audio that models soft-loss distributions and feature-gradient similarity to select informative samples, achieving 82.65% accuracy on ESC-50 with a 40% annotation budget.

## Key contributions

- Proposes a plug-and-play Temporal-Spectral Active Learning (TSAL) framework replacing generic computer vision/NLP uncertainty metrics with audio-specific structural guidance.
- Designs a soft-selection policy based on the model's soft-loss distribution over labeled samples to implicitly identify informative temporal-spectral pattern anchors.
- Introduces a feature-gradient similarity mechanism combining semantic feature embeddings and loss gradients with pseudo-labels to align unlabeled pool selection with the current optimization trajectory.

## Problem

Active learning for audio remains underexplored, with existing methods relying on generic uncertainty (least confidence, margin, entropy, BALD) or geometric diversity (coreset, BADGE) that treat audio instances as static vectors. These generic metrics fail to capture intricate temporal-spectral structures like transient events, harmonic continuity, and frequency modulation that dictate audio sample informativeness. Consequently, direct application of standard active learning leads to suboptimal sample selection and wasted annotation budgets in supervised finetuning.

## Method

The framework uses a Self-Supervised Audio Spectrogram Transformer (SSAST) as the backbone model $f_M$ with parameters $	heta_M$. In each active learning cycle, the model is finetuned on the current labeled set $D_L^T$ using standard cross-entropy loss. Because explicit temporal-spectral rules are intractable to hand-define, TSAL profiles informative patterns implicitly by computing the soft loss $L_T(x_i)$ for each labeled sample. A soft selection policy normalizes these losses relative to the average soft loss $\bar{L}^T$ to filter high-loss candidate anchors $L_H$.

For each unlabeled sample $x_j \in D_U$, TSAL extracts a feature embedding $e_j$ using SSAST and estimates its gradient vector $g_j$ by computing the cross-entropy loss against pseudo-labels derived from prediction logits via backpropagation. It then computes a combined feature-gradient cosine similarity score $S_j$ between the unlabeled sample and each labeled pattern anchor in $L_H$, modulated by a hyperparameter $\beta$ controlling the relative weight of feature versus gradient similarities. The top $B$ scoring unlabeled samples are queried for annotation, added to $D_L$, and the loop repeats until the annotation budget is exhausted.

## Experimental setup

Evaluated on four benchmark datasets: ESC-50 (2,000 5-second environmental recordings, 50 classes, batch size 32, 50 epochs), TUT Acoustic Scenes 2016 (DCASE2016, batch size 16, 50 epochs), AudioSet-20k (multi-label, 527 classes, batch size 12, 25 epochs), and UrbanSound8K (10-fold cross-validation, batch size 32, 50 epochs). Baselines include RANDOM, CONF, MARGIN, ENTROPY, CORESET, BALD, and CLS-AL, starting with 10% randomly selected initial labeled data and querying 5% per cycle up to a 40% annotation budget.

## Results

On ESC-50, TSAL achieves 82.65% accuracy at the 40% budget, outperforming RANDOM (79.90%) by 2.75% and beating all baselines across low-budget regimes. On AudioSet-20k, it reaches 22.08% mAP vs. 19.89% for RANDOM; on UrbanSound8K it hits 82.54%; and on DCASE2016 it achieves 79.23%. Ablation studies confirm all components are vital: removing the soft selection policy drops ESC-50 accuracy by 3.3%, dropping feature similarity reduces DCASE2016 performance from 79.74% to 75.30%, and removing gradient similarity drops UrbanSound8K from 82.54% to 81.35%. Parameter sensitivity analysis on $\beta$ shows peak performance is achieved at $\beta = 1.0$.

| System / Condition | ESC-50 (%) | AudioSet-20K (mAP) | DCASE2016 (%) | UrbanSound8K (%) |
| :--- | :--- | :--- | :--- | :--- |
| RANDOM | 79.90 | 19.89 | ~74.0 | ~79.5 |
| CORESET | ~80.1 | ~20.1 | ~74.5 | ~80.2 |
| CLS-AL | ~80.5 | ~20.3 | ~75.0 | ~80.8 |
| TSAL (Ours) | 82.65 | 22.08 | 79.74 | 82.54 |

## Limitations

The evaluation is restricted to classification benchmarks and does not test generative or sequence-to-sequence audio tasks like speech recognition or text-to-speech. The reliance on pseudo-labeled gradient estimation for unlabeled data introduces potential noise when model predictions are uncalibrated under low-resource initial conditions. Furthermore, compute overhead scales with gradient backpropagation calculations across the entire unlabeled pool per iteration.

## Why read this

Researchers and engineers building active learning pipelines for audio classification should read this to see how replacing generic vision/NLP uncertainty metrics with loss-distribution profiling and feature-gradient alignment significantly improves data efficiency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Reducing annotation costs for domain-specific audio classification datasets, environmental noise monitoring, and acoustic scene analysis.

## Related

- (link related pages by id as the wiki grows)
