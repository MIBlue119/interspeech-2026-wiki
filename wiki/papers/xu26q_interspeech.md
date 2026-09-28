---
id: xu26q_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2614
pdf: https://www.isca-archive.org/interspeech_2026/xu26q_interspeech.pdf
---

# Continual Generalized Category Discovery for Acoustic Signals via Instance-Adaptive Regularization and Dynamic Teacher Guidance

*Qisheng Xu, Shanhao Han, Hui Geng, Yulu Fang, Yunsheng Xiong, Yutao Dou, Kele Xu*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2614)

**TL;DR** — This paper introduces an acoustic-specific Continual Generalized Category Discovery (C-GCD) framework utilizing instance-adaptive entropy regularization, Gaussian Mixture Model (GMM) adaptive thresholding, and an EMA-updated dynamic teacher, achieving 74.14% cumulative average accuracy on the ShipsEar underwater dataset.

## Key contributions

- An acoustic-specific C-GCD framework designed to tackle spectral entanglement and polyphony in unlabelled streams.
- A GMM-driven adaptive pseudo-label thresholding strategy that handles noise and uncertainty in non-stationary audio streams.
- An EMA-based dynamic teacher guidance module with selective classifier updating to mitigate base-class bias and representation drift.
- State-of-the-art performance across LibriSpeech and ShipsEar benchmarks, yielding a +4.84% cumulative accuracy improvement on ShipsEar over baseline Happy.

## Problem

Acoustic perception systems operate in non-stationary, open-ended environments where novel sound categories emerge continuously without supervision. While Continual Generalized Category Discovery (C-GCD) has been studied in computer vision (using frameworks like SimGCD, MetaGCD, PromptCCD, and Happy), transferring these vision-centric methods directly to audio results in severe performance collapse. This occurs because audio signals exhibit complex spectrotemporal structures, strong semantic overlap, and polyphony, causing novel acoustic events to be mistakenly absorbed into visually-similar seen classes. Solving this is critical for deploying robust unsupervised acoustic monitoring systems without historical raw data access.

## Method

The framework utilizes an AudioMAE backbone in a student-teacher setup. To partition unlabelled streaming data into potential-seen and potential-unseen subsets without human supervision, the method uses Instance-Adaptive Entropy Regularization (IAER) paired with a (t+1)-component Gaussian Mixture Model (GMM) applied to predictive confidence scores. The intersection of GMM component means defines an initial threshold, which is further modulated by a density ratio to handle heavy spectral overlap.

To prevent semantic drift, a dynamic teacher model is updated via an Exponential Moving Average (EMA) with a cosine schedule (alpha_e annealing from 0.999 to 0.8). Selective updates are applied where the feature extractor is fully updated, but the classifier weights are restricted to old-class weights (phi_old). A feature-level distillation loss ensures representation integrity.

The global training objective integrates self-distillation, unsupervised contrastive learning, and hierarchical entropy maximization (combining inter-group separation and intra-group diversity) on low-confidence subsets to discover novel classes while preserving legacy knowledge under rehearsal-free constraints.

## Experimental setup

Evaluated on LibriSpeech (using 50/10 and 80/10 incremental splits) and ShipsEar (using a 5/1 split with 5 base classes and 3 incremental sessions). Compared against baselines SimGCD, MetaGCD, PromptCCD, and Happy. Metrics include overall accuracy (Acc), old-class accuracy (OldAcc), new-class accuracy (NewAcc), and cumulative average accuracy (CAA). Implemented with an AudioMAE backbone, batch size 64, 0.1 time/frequency masking, fine-tuning only the 12th Transformer block and later layers via SGD (momentum 0.9, weight decay 5e-5, initial learning rate 0.1).

## Results

On the ShipsEar underwater dataset (5/1 protocol), the proposed w/GMM+EMA method achieves a headline Cumulative Average Accuracy (CAA-All) of 74.14%, outperforming the vision baseline Happy (69.30%) by 4.84 percentage points, largely driven by a strong old-class retention CAA-Old of 75.00% compared to Happy's 66.27%. However, its novel-class discovery CAA-New reached 63.92% compared to Happy's 71.56%, indicating an trade-off where consolidation outweighs exploration under low-SNR conditions.

On the large-scale LibriSpeech dataset under the 80/10 protocol, w/GMM+EMA achieves superior balance and state-of-the-art results: CAA-All of 86.51% (+6.63% vs Happy), CAA-Old of 87.64% (+6.41%), and CAA-New of 74.73% (+10.98%). In the final incremental stage (S2, C90-C99), the proposed method outperforms Happy by +15.14% in overall accuracy and +18.25% in novel-class accuracy, demonstrating the critical stabilization role of the EMA teacher.

| Dataset | Method | CAA-All (%) | CAA-Old (%) | CAA-New (%) |
|---|---|---|---|---|
| ShipsEar | SimGCD [20] | 64.35 | 70.70 | 24.41 |
| ShipsEar | MetaGCD [10] | 30.64 | 33.14 | 27.14 |
| ShipsEar | PromptCCD [21] | 42.95 | 44.07 | 33.56 |
| ShipsEar | Happy [19] | 69.30 | 66.27 | 71.56 |
| ShipsEar | w/GMM+EMA (Ours) | 74.14 | 75.00 | 63.92 |

## Limitations

The method shows a slight imbalance in certain low-SNR scenarios where old-class retention improves at the expense of novel-class discovery (e.g., lower CAA-New on ShipsEar compared to Happy). The evaluation scope is limited to two acoustic domains (speech via LibriSpeech and underwater acoustic streams via ShipsEar) and requires an independent clustering heuristic to estimate the cardinality of novel classes at each step.

## Why read this

Read this paper if you are building streaming audio classifiers that must adapt to unlabelled open-world data without catastrophic forgetting. It provides a blueprint for adapting vision-centric Category Discovery methods to acoustic data by addressing spectral overlap through GMM thresholding and EMA teacher stabilization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Open-world speech recognition pipelines, underwater acoustic surveillance systems, and automated environmental sound monitoring in non-stationary streams.

## Related

- (link related pages by id as the wiki grows)
