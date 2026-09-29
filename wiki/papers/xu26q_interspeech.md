---
id: xu26q_interspeech
category: audio-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2614
pdf: https://www.isca-archive.org/interspeech_2026/xu26q_interspeech.pdf
---

# Continual Generalized Category Discovery for Acoustic Signals via Instance-Adaptive Regularization and Dynamic Teacher Guidance

*Qisheng Xu, Shanhao Han, Hui Geng, Yulu Fang, Yunsheng Xiong, Yutao Dou, Kele Xu*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2614)

**Category:** `audio-understanding`

**TL;DR** — This paper introduces an audio-oriented Continual Generalized Category Discovery (C-GCD) framework that uses instance-adaptive regularization and a GMM-driven dynamic teacher to discover novel sound classes in streaming unlabeled data while preventing catastrophic forgetting. On the ShipsEar underwater acoustic benchmark, it achieves a cumulative average accuracy of 74.14%, outperforming vision-centric baselines by 4.84 percentage points.

## Key contributions

- Acoustic-specific C-GCD framework tailored to handle spectro-temporal overlap, polyphony, and base-class bias in a rehearsal-free setting.
- GMM-driven adaptive thresholding strategy that dynamically models confidence distributions to partition high- and low-confidence unlabelled acoustic streams.
- EMA-based dynamic teacher guidance module with selective updates to mitigate semantic drift and stabilize pseudo-label generation.
- State-of-the-art empirical validation showing robust performance gains across both LibriSpeech speech streams and ShipsEar underwater soundscapes.

## Problem

Real-world acoustic systems frequently encounter open-ended, non-stationary environments where new sound categories emerge continuously without supervision. While Continual Generalized Category Discovery (C-GCD) has been studied in computer vision (e.g., Happy, SimGCD, MetaGCD), transferring these image-centric models directly to audio results in marked performance degradation. This failure stems from the unique properties of acoustic signals—specifically spectro-temporal entanglement, harmonic overlap, and severe base-class bias that cause novel sounds to be erroneously swallowed by existing categories.

## Method

The framework employs an AudioMAE backbone within a student-teacher architecture, operating under a rehearsal-free streaming setup. For each incremental session, Instance-Adaptive Entropy Regularization (IAER) partitions unlabelled batches into potential-seen and potential-unseen subsets using confidence scores derived from the previous model.

To establish robust decision boundaries without static thresholds, a (t+1)-component Gaussian Mixture Model (GMM) models the confidence score distribution. The intersection of the low- and high-confidence GMM components determines the adaptive threshold, which is further modulated by a local density ratio to handle heavy spectral overlap. Low-confidence samples undergo hierarchical entropy maximization to explicitly encourage novel class discovery and intra-group diversity.

To counteract semantic drift, the teacher model is updated via an Exponential Moving Average (EMA) with a cosine-scheduled momentum coefficient ranging from 0.999 down to 0.8. Crucially, update rules are selective: feature extractors are fully updated, while classifier weight updates are restricted to old-class parameters. A feature-level distillation loss aligns student and teacher representations to preserve legacy knowledge.

## Experimental setup

Evaluated on LibriSpeech (using 50/10 and 80/10 incremental splits) and ShipsEar (using a 5/1 split). Evaluated against baselines SimGCD, MetaGCD, PromptCCD, and the vision-centric Happy framework using overall accuracy (Acc), old class accuracy (OldAcc), novel class accuracy (NewAcc), and Cumulative Average Accuracy (CAA). Implemented with an AudioMAE backbone, batch size 64, time/frequency masking of 0.1, fine-tuning only the 12th Transformer block and later layers, optimized via SGD with momentum 0.9, weight decay 5e-5, and an initial learning rate of 0.1.

## Results

On the ShipsEar underwater dataset, the proposed w/GMM+EMA method achieves a headline Cumulative Average Accuracy (CAA-All) of 74.14%, outperforming Happy (69.30%) by 4.84 percentage points and substantially improving old-class retention (CAA-Old 75.00% vs 66.27%). On LibriSpeech under the 80/10 protocol, it reaches a CAA-All of 86.51% (+6.63% over Happy), achieving 87.64% on old classes and 74.73% on novel classes. Ablation studies confirm that adding the EMA dynamic teacher increases partitioning accuracy from 80.32% to 90.41% by polarizing confidence distributions. However, the method does not uniformly dominate novel-class metrics everywhere; on ShipsEar, its novel-class discovery score (CAA-New 63.92%) trails the vision baseline Happy (71.56%), showing that discovery-consolidation tradeoffs remain challenging under extreme low-SNR conditions.

| Dataset | Method | CAA (All) | CAA (Old) | CAA (New) |
|---|---|---|---|---|
| ShipsEar | SimGCD | 64.35% | 70.70% | 24.41% |
| ShipsEar | Happy | 69.30% | 66.27% | 71.56% |
| ShipsEar | w/GMM+EMA | 74.14% | 75.00% | 63.92% |
| LibriSpeech (80/10) | Happy | 79.88% | 81.22% | 63.75% |
| LibriSpeech (80/10) | w/GMM+EMA | 86.51% | 87.64% | 74.73% |

## Limitations

The framework assumes that the cardinality of novel classes in each session can be pre-estimated via independent clustering heuristics, which may be difficult in completely unconstrained environments. While old-class retention improves significantly, novel-class discovery on certain challenging low-SNR datasets like ShipsEar lags behind specific vision-centric baselines, pointing to persistent difficulties in unravelling severe spectral entanglement. The evaluation is currently restricted to speech and underwater acoustic domains, leaving open-world music, environmental soundscapes, and multi-channel audio largely untested.

## Why read this

Speech and ML researchers working on open-world streaming audio or continual learning should read this paper to understand how to adapt Generalized Category Discovery to acoustically entangled, rehearsal-free environments. It provides concrete architectural recipes—specifically GMM-driven adaptive thresholding and selective EMA teacher distillation—to mitigate base-class bias without catastrophically forgetting legacy classes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Open-vocabulary acoustic monitoring, underwater surveillance, autonomous vehicle audio perception, and incremental speech recognition systems.

## Institutions / 機構

National University of Defense Technology, Hunan University

**Funding / 經費:** National Science and Technology Major Project, National University of Defense Technology

## Related

- (link related pages by id as the wiki grows)
