---
id: hanif26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-261
pdf: https://www.isca-archive.org/interspeech_2026/hanif26_interspeech.pdf
---

# ZEBRA: Zero-Shot Entropy-Regularized Prompt Learning for Base-to-Novel Generalization in Audio-Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/hanif26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hanif26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-261)

**TL;DR** — ZEBRA is a plug-and-play framework for audio-language models that fuses zero-shot logits with prompt learning and applies self-entropy regularization to bridge the base-to-novel generalization gap, raising average novel-class accuracy from 55.18% to over 59.37% while maintaining high base-class performance.

## Problem

Standard prompt-learning methods in audio-language models optimize learnable context tokens using few-shot supervision on base classes, which causes the model to overfit to seen categories and severely degrade performance on unseen novel classes. This often results in novel-class accuracy falling below the original zero-shot model baseline. Resolving this base-to-novel generalization gap is critical for deploying flexible audio-language systems that can adapt to specialized tasks without forgetting their broad zero-shot capabilities.

## Method

ZEBRA builds on top of existing prompt-learning baselines like COOP and COCOOP without introducing any additional learnable parameters. It operates through two core mechanisms: zero-shot logit fusion, which combines pre-computed zero-shot logits with prompt-learning logits via constant weights (lambda_zs = 0.5, lambda_pr = 0.5) to anchor adaptation to the original pre-trained decision space, and self-entropy regularization added to the cross-entropy loss to prevent base-class overconfidence. The framework is trained for 50 epochs using SGD at a learning rate of 0.05 on 16 examples per base class across multiple audio classification datasets, utilizing a decoder-free Pengi backbone comprising frozen pre-trained audio and text encoders.

## Results

Evaluated across 11 diverse speech and audio datasets—including ESC-50, CREMA-D, UrbanSound8K, and TUT2017—using accuracy, ZEBRA improves average novel-class accuracy over COOP (from 48.04% to 59.37%) and COCOOP (from 50.44% to 59.50%), surpassing the zero-shot baseline of 55.18%. Base accuracy remains highly competitive at roughly 80.17% to 81.75%. Ablation experiments demonstrate that zero-shot logit fusion contributes the majority of the performance gains, while the self-entropy loss term yields additional refinement. Furthermore, ZEBRA reduces Expected Calibration Error (ECE) on novel classes from 0.2738 to 0.2253 for COCOOP while incurring negligible runtime overhead.

## Code

- https://github.com/asif-hanif/zebra

## Applications

Speech and audio engineers adapting audio-language models to downstream classification tasks (such as emotion recognition, sound event detection, and acoustic scene analysis) in low-resource settings where the model must recognize both seen and unseen categories.

## Limitations

The current framework relies on empirically fixed fusion weights and a small scaling factor for entropy regularization across all datasets.

## Related

- (link related pages by id as the wiki grows)
