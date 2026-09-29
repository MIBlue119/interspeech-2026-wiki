---
id: mi26_interspeech
category: paralinguistics-emotion
labels: [low-resource, multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1170
pdf: https://www.isca-archive.org/interspeech_2026/mi26_interspeech.pdf
---

# Learning Emotion-discriminative Representations for Zero-Shot Cross-Lingual Speech Emotion Recognition

*Jinyi Mi, Ding Ma, Tomoki Toda*

[PDF](https://www.isca-archive.org/interspeech_2026/mi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1170)

**Category:** `paralinguistics-emotion` · **Labels:** `low-resource`, `multilingual`

**TL;DR** — This paper introduces a zero-shot cross-lingual speech emotion recognition (SER) framework combining language-weighted supervised contrastive learning and speaker-adversarial debiasing, achieving an average UAR of 82.26% across nine language transfer pairs without requiring target language emotion labels.

## Key contributions

- Proposes a zero-shot cross-lingual SER framework that aligns emotion representations across languages using a language-aware supervised contrastive loss.
- Incorporates a gradient-reversal speaker adversarial network to eliminate speaker-specific cues and enforce speaker-invariant emotion embeddings.
- Designs a hierarchical batch sampling strategy ensuring multiple languages and emotion classes coexist in training batches for robust contrastive pairs.
- Evaluates the method extensively across nine diverse zero-shot cross-lingual settings, outperforming standard fine-tuning baselines by over 9% absolute UAR.

## Problem

Speech emotion recognition (SER) models suffer severe performance degradation when deployed on unseen target languages due to linguistic, cultural, and acoustic distribution mismatches. Conventional transfer learning and self-supervised adaptation methods typically require target-language emotion annotations or extensive multilingual pretraining data across dozens of languages. Prior domain adversarial approaches focus on coarse language distribution matching rather than explicitly enforcing fine-grained structural consistency at the emotion category level. This work addresses the zero-shot setting where target language emotion labels are completely unavailable during training.

## Method

The framework utilizes language-matched pretrained wav2vec 2.0 Base models (fine-tuned via Low-Rank Adaptation, bottleneck adapters, and weight gating) as the feature extractor, mapping raw waveforms into context representations that are mean-pooled into vectors h_i of dimension d. 

The training objective integrates three loss terms: a standard cross-entropy emotion classification loss (L_CE), a language-aware supervised contrastive loss (L_SupCLR), and a speaker adversarial loss (L_SpkAdv). L_SupCLR draws same-emotion instances together and pushes different-emotion instances apart, incorporating a cosine-similarity temperature-scaled weighting strategy that assigns higher weights to cross-lingual positive pairs to actively bridge linguistic domain gaps. To construct batches, a hierarchical sampling strategy selects N_lang = 3 languages, N_cls = 4 emotion classes, and N_sam = 3 instances per pair.

To strip away speaker shortcuts, L_SpkAdv employs a gradient reversal layer (GRL) followed by two linear layers, a ReLU activation, and a dropout layer, forcing the feature extractor to maximize speaker classification entropy while the speaker classifier minimizes it. The total loss combines these with hyperparameters alpha = 1.0, beta = 0.3, and lambda = 2.5. Inference is performed purely zero-shot on target language speech using the frozen feature extractor and linear emotion classifier.

## Experimental setup

Experiments are conducted across five corpora: MELD (English, ~13k utterances), ESD (Mandarin subset, ~14k utterances), EMO-DB (German, >700 utterances), CaFE (French, 936 utterances), and URDU (Urdu, 400 utterances), restricted to 4 shared emotion classes (happy, angry, sad, neutral). Nine zero-shot cross-lingual configurations are evaluated (e.g., EN->DE, CN->FR, DE->CN). Performance is evaluated using Unweighted Average Recall (UAR) and Macro-F1 score. Training runs on an NVIDIA Tesla V100 GPU using PyTorch 2.0.1 and Python 3.10.

## Results

The full proposed system achieves an average UAR of 82.26% and Macro-F1 of 81.96% across all nine zero-shot tasks, outperforming Baseline 1 (source-only fine-tuning at 59.49% UAR) by 22.77% and Baseline 2 (source plus non-target data at 73.21% UAR) by 9.05%. Ablation experiments demonstrate that removing supervised contrastive learning (Proposed w/o L_SupCLR) causes the largest performance drop down to 76.86% UAR, while removing speaker adversarial learning (Proposed w/o L_SpkAdv) yields 80.11% UAR. The model approaches the fully supervised Upper Bound system (91.92% UAR). t-SNE visualizations confirm that the proposed method creates tighter, better-separated emotion clusters across unseen languages compared to baselines.

| System | EN→DE (UAR/F1) | EN→FR (UAR/F1) | EN→CN (UAR/F1) | Avg. UAR | Avg. F1 |
|---|---|---|---|---|---|
| Baseline 1 | 52.23 / 43.11 | 45.83 / 39.81 | 58.36 / 56.19 | 59.49 | 58.24 |
| Baseline 2 | 88.19 / 88.68 | 70.83 / 68.04 | 71.14 / 70.90 | 73.21 | 72.58 |
| Proposed w/o L_SpkAdv | 92.66 / 93.00 | 75.00 / 74.41 | 76.21 / 75.17 | 80.11 | 80.14 |
| Proposed w/o L_SupCLR | 90.87 / 91.81 | 72.92 / 70.59 | 73.21 / 72.48 | 76.86 | 76.70 |
| Proposed (Full) | 94.64 / 94.36 | 77.08 / 75.35 | 78.07 / 77.92 | 82.26 | 81.96 |
| Upper Bound | 97.22 / 97.67 | 87.50 / 84.42 | 97.07 / 97.08 | 91.92 | 91.41 |

## Limitations

The evaluation is restricted to only four primary emotion classes (happy, angry, sad, neutral), leaving out complex or subtle emotional states. The work relies on single-modal audio data, ignoring rich textual or visual cues present in interactive environments. Furthermore, language coverage is limited to five major languages (English, Mandarin, German, French, Urdu), and low-resource tone-varying or dialectal variations remain untested.

## Why read this

Speech and ML researchers working on cross-lingual affective computing should read this paper to see how language-weighted contrastive learning and speaker adversarial bottlenecks can eliminate domain shift in zero-shot SER without requiring target-language labels.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual affective computing, multilingual voice assistants, sentiment analysis in customer service, and digital health monitoring across diverse language populations.

## Institutions / 機構

Nagoya University

**Funding / 經費:** JST CREST, JSPS KAKENHI, JST SPRING

## Related

- (link related pages by id as the wiki grows)
