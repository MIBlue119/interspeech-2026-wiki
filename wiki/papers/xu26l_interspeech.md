---
id: xu26l_interspeech
category: few-shot
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1173
pdf: https://www.isca-archive.org/interspeech_2026/xu26l_interspeech.pdf
---

# Audio-Language Prompt Learning for Few-Shot Audio Classification

[PDF](https://www.isca-archive.org/interspeech_2026/xu26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1173)

**TL;DR** — The paper introduces MALP, a multi-modal prompt learning framework for few-shot audio classification that jointly optimizes audio, text, and shared prompts, achieving an average accuracy of 78.35% across eleven benchmarks.

## Problem

Existing audio-language model (ALM) adaptation methods predominantly tune prompts in the text encoder while freezing the audio branch, leading to imbalanced cross-modal optimization. This text-centric approach fails to capture subtle acoustic variations and reduces separability when acoustically similar classes share similar semantic descriptions. This structural limitation hampers classification performance under few-shot data regimes where labeled data are scarce.

## Method

The framework utilizes PENGI as the frozen backbone audio-language model and introduces three types of learnable prompts: audio-specific prompts and text-specific prompts for modality specialization via residual adaptation (controlled by learnable scaling coefficient lambda = 0.2), and shared prompts that condition both modalities via vector concatenation for cross-modal alignment. MALP applies a progressive optimization strategy using stochastic gradient descent with a batch size of 16, a learning rate of 0.05, and is trained for 50 epochs under a 16-shot setting.

## Results

Evaluated across eleven heterogeneous audio datasets (including Beijing-Opera, CREMA-D, ESC50, RAVDESS, and UrbanSound8K) under a 16-shot setting, MALP achieves an average accuracy of 78.35%. It outperforms the zero-shot reference, CoOp (by 7.21%), CoCoOp (by 4.88%), and PALM (by 1.77%). Component-wise ablations show that adding audio-specific prompts raises average accuracy from the PALM baseline of 76.58% to 77.33%, adding shared prompts alone reaches 76.89%, and combining both reaches the full 78.35%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers working on few-shot audio classification, environmental sound recognition, acoustic scene classification, and speech emotion recognition under low-resource or data-scarce regimes.

## Related

- (link related pages by id as the wiki grows)
