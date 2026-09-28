---
id: mi26_interspeech
category: speech-emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1170
pdf: https://www.isca-archive.org/interspeech_2026/mi26_interspeech.pdf
---

# Learning Emotion-discriminative Representations for Zero-Shot Cross-Lingual Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/mi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1170)

**TL;DR** — This paper proposes an emotion-discriminative representation learning method for zero-shot cross-lingual speech emotion recognition, combining supervised contrastive learning and speaker adversarial learning to achieve an average UAR of 82.26%.

## Problem

Zero-shot cross-lingual speech emotion recognition suffers from severe performance degradation due to distribution mismatches across languages and a lack of target-language emotion annotations. Conventional transfer learning and unsupervised adversarial methods either require target-language speech/language labels or fail to explicitly model emotion-level structural consistency. This limits the cross-lingual generalization and practical deployment of speech emotion recognition systems.

## Method

The framework utilizes language-matched pretrained wav2vec 2.0 Base models (adapted via LoRA, bottleneck adapters, and weight gating) as a shared feature extractor over mean-pooled speech representations. It incorporates a supervised contrastive learning loss (SupCLR) with a language-aware weighting strategy—assigning higher weights (lambda = 2.5) to cross-lingual same-emotion pairs—alongside a hierarchical sampling strategy across languages, emotion classes, and instances. To eliminate speaker shortcuts, it applies a speaker adversarial learning module driven by a gradient reversal layer (GRL) and a multi-layer speaker classifier. The entire architecture is jointly optimized using cross-entropy for emotion classification, contrastive loss, and speaker adversarial loss.

## Results

Evaluated across nine zero-shot cross-lingual settings using MELD, ESD, EMO-DB, CaFE, and Urdu datasets spanning English, Mandarin, German, French, and Urdu with four core emotion classes (happy, angry, sad, neutral). The full proposed method achieves an average Unweighted Average Recall (UAR) of 82.26% and Macro-F1 of 81.96%, outperforming standard source-only fine-tuning (Baseline 1: 59.49% UAR) and multi-source fine-tuning without alignment (Baseline 2: 73.21% UAR). Ablation tests show that removing supervised contrastive learning drops UAR by 5.40%, while removing speaker adversarial learning drops UAR by 2.15%. t-SNE visualizations confirm that the method produces more compact, well-separated emotion clusters across languages compared to baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building affective computing systems, multilingual dialogue agents, or healthcare and educational applications that must recognize emotions in unseen target languages without target-language labels.

## Limitations

The approach relies on having access to labeled emotional speech data from at least a few auxiliary non-target languages during training alongside the source language.

## Related

- (link related pages by id as the wiki grows)
