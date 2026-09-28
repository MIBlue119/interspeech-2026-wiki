---
id: chien26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1738
pdf: https://www.isca-archive.org/interspeech_2026/chien26b_interspeech.pdf
---

# From Bilevel to Trilevel: Joint Training for Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/chien26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chien26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1738)

**TL;DR** — This paper introduces TL-SUD, a trilevel optimization framework that jointly trains ASR models using supervised, unsupervised, and knowledge-distillation objectives, outperforming conventional two-stage pre-training/fine-tuning pipelines.

## Problem

Traditional speech recognition relies on a disconnected two-stage pipeline consisting of unsupervised pre-training followed by supervised fine-tuning and knowledge distillation. This isolation causes the valuable representations acquired during pre-training to be overwritten or mismatched during downstream supervised updates, leading to overfitting and negative transfer, particularly in low-resource settings. While recent bilevel optimization methods unify supervised and unsupervised objectives, they omit knowledge distillation, missing critical teacher guidance that stabilizes training and improves generalization.

## Method

The paper proposes TL-SUD, formulating ASR training as a trilevel optimization program where the upper level optimizes supervised CTC loss, the middle level handles unsupervised contrastive loss, and the lower level manages feature-based knowledge distillation from a teacher network. To solve this practically, the middle and lower levels are collapsed into a bilevel subproblem, which is then integrated with the upper level using a sequential penalty-based bilevel gradient descent (PBGD) method with annealed penalty schedules. Experiments use a 115M-parameter FastConformer-CTC student model and a 616M-parameter FastConformer teacher network trained on LibriSpeech without any pre-trained initialization.

## Results

Evaluated on the LibriSpeech benchmark using greedy decoding without an external language model, TL-SUD achieves a word error rate (WER) of 6.7% on test-clean and 15.9% on test-other using train-clean-100 and train-other-500, outperforming the supervised baseline (8.7% / 23.0%), a weighted-sum baseline (7.4% / 19.1%), and the PT(U)+FT(SD) pipeline (7.4% / 19.5%). Compared directly against the bilevel baseline BL-JUST, TL-SUD consistently yields lower error rates across all labeled data sizes (e.g., reducing test-other WER from 17.1% to 15.9% under 100h labeled data and from 16.0% to 13.0% under 360h labeled data). Ablation studies confirm that carefully tuned penalty schedules for the PBGD scheme are crucial for balancing the objectives.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers training automatic speech recognition models under limited labeled data regimes can use this method to better leverage large-scale unlabeled audio and teacher network supervision simultaneously.

## Limitations

Tuning the penalty schedules for the multi-level optimization framework is challenging and requires careful hyperparameter management.

## Related

- (link related pages by id as the wiki grows)
