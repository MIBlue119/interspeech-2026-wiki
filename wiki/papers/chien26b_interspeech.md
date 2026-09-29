---
id: chien26b_interspeech
category: asr
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1738
pdf: https://www.isca-archive.org/interspeech_2026/chien26b_interspeech.pdf
---

# From Bilevel to Trilevel: Joint Training for Speech Recognition

*Jen-Tzung Chien, Yu-Chun Lin, Xiaodong Cui*

[PDF](https://www.isca-archive.org/interspeech_2026/chien26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chien26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1738)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper introduces TL-SUD, a trilevel optimization framework for ASR that jointly trains a shared backbone on supervised, unsupervised, and knowledge distillation objectives using a sequential penalty-based gradient descent method, achieving a Word Error Rate (WER) of 15.9% on LibriSpeech test-other using 100h of labeled data.

## Key contributions

- Formulates ASR training as a trilevel optimization problem unifying supervised learning (top), unsupervised learning (middle), and knowledge distillation (bottom) into a single loop.
- Derives a practical sequential penalty-based bilevel gradient descent (PBGD) algorithm that collapses the lower two levels into a subproblem before integrating with the upper level.
- Outperforms standard two-stage pre-training/fine-tuning (PT+FT) and prior bilevel methods (BL-JUST) across multiple labeled data regimes on LibriSpeech.

## Problem

Traditional speech recognition pipelines rely on a decoupled two-stage approach: unsupervised pre-training followed by supervised fine-tuning and distillation (PT+FT+SD). This separation often causes the valuable semantic representations acquired during pre-training to be overwritten or catastrophically forgotten during downstream supervised optimization, particularly in low-resource settings. While prior bilevel formulations (such as BL-JUST) attempted to jointly optimize supervised and unsupervised objectives, they omitted knowledge distillation from a teacher network. This omission misses essential guidance and regularization, highlighting the need for a trilevel framework that can seamlessly orchestrate all three signals without negative transfer.

## Method

The TL-SUD framework optimizes a shared 115M-parameter FastConformer-CTC backbone (17 blocks, 512 hidden units, 8x64 attention, convolution kernel size 9) alongside task-specific heads: a supervised head using CTC loss on labeled data, an unsupervised head using a contrastive loss on unlabeled data, and a feature-level distillation head matching intermediate representations of a larger 616M-parameter FastConformer teacher model (24 blocks, 1024 hidden units, 8x128 attention). The optimization structure positions supervised learning at the upper level, unsupervised learning at the middle level, and knowledge distillation at the lowest level to inject teacher priors. Because exact trilevel optimization is NP-hard, the method collapses the middle and lower levels into a bilevel subproblem using a differentiable penalty term controlled by schedule parameter gamma_2, and then incorporates this surrogate into an upper-level bilevel subproblem controlled by gamma_1.

Training proceeds via a sequential penalty-based gradient descent algorithm where penalty factors gamma_1 and gamma_2 are gradually annealed from zero to maximum values over training epochs. This schedule allows the upper-level optimization to proceed initially with minimal constraint before progressively enforcing alignment with the lower-level objectives. At each iteration, mini-batches are sampled simultaneously from the labeled dataset, unlabeled dataset, and distillation dataset (which combines labeled and unlabeled audio without ground-truth transcripts). The shared backbone parameters are updated using the gradients of all three objectives weighted by the respective penalty schedules.

## Experimental setup

Experiments use the 960-hour LibriSpeech corpus, utilizing train-clean-100, train-clean-200, or train-clean-360 as labeled subsets and train-other-500 as unlabeled audio. Evaluated models employ a 115M-parameter FastConformer student trained against a 616M-parameter teacher, compared against a supervised-only baseline, a weighted-sum (WS) multi-objective baseline, conventional PT(U)+FT(SD), and BL-JUST. Evaluation metric is Word Error Rate (WER %) using greedy decoding without an external language model.

## Results

TL-SUD achieves a WER of 6.7% on test-clean and 15.9% on test-other using 100h of labeled data and 500h of unlabeled data, outperforming the weighted-sum baseline (7.4% / 19.1%), PT+FT+SD (7.4% / 19.5%), and the bilevel BL-JUST method (7.0% / 17.1%). When scaling the labeled data to 360 hours, TL-SUD further reduces WERs to 5.9% (test-clean) and 13.0% (test-other), compared to 6.7% and 16.0% for BL-JUST. Ablation studies on the penalty schedules demonstrate that proper tuning of the maximum values and increase rates for gamma_1 and gamma_2 is critical; suboptimal schedules degrade performance significantly (e.g., reaching 7.8% / 21.4% under poor settings).

| Model | Size | Unlabeled | Labeled | test-clean | test-other |
|---|---|---|---|---|---|
| Sup. baseline | 115M | -- | 100h | 8.7 | 23.0 |
| WS baseline | 115M | 500h | 100h | 7.4 | 19.1 |
| PT(U)+FT(SD) | 115M | 500h | 100h | 7.4 | 19.5 |
| BL-JUST | 115M | 500h | 100h | 7.0 | 17.1 |
| TL-SUD | 115M | 500h | 100h | 6.7 | 15.9 |
| TL-SUD | 115M | 500h | 360h | 5.9 | 13.0 |

## Limitations

The evaluation is restricted to the English LibriSpeech corpus, leaving multilingual and low-resource non-English scalability unverified. Tuning the penalty schedules (gamma_1 and gamma_2) is empirically challenging and requires careful hyperparameter search. Furthermore, the experiments rely exclusively on greedy decoding without an external language model, and compute overhead is heightened due to the nested gradient computations of trilevel optimization.

## Why read this

Speech researchers and optimization engineers working on multi-objective training or low-resource ASR should read this paper to see how complex nested hierarchies can be rendered tractable via penalty-based gradient descent. It provides a blueprint for integrating teacher supervision directly into joint pre-training and fine-tuning loops rather than relying on decoupled sequential pipelines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource automatic speech recognition, acoustic model pre-training, and knowledge distillation for edge-deployable speech systems.

## Institutions / 機構

National Yang Ming Chiao Tung University, IBM

## Related

- (link related pages by id as the wiki grows)
