---
id: singh26b_interspeech
category: paralinguistics-emotion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1591
pdf: https://www.isca-archive.org/interspeech_2026/singh26b_interspeech.pdf
---

# CHUCKLE - When Humans Teach AI to Learn Emotions the Easy Way

*Ankush Pratap Singh, Houwei Cao, Yong Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/singh26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/singh26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1591)

**Category:** `paralinguistics-emotion`

**TL;DR** — CHUCKLE is a perception-driven curriculum learning framework for speech emotion recognition that sequences training samples using crowdsourced annotator agreement and label alignment, achieving up to 3% relative accuracy gains and up to 40% fewer gradient updates.

## Key contributions

- Develops a perception-driven curriculum learning framework (CHUCKLE) for speech emotion recognition that integrates both score-based and rule-based sample difficulty strategies.
- Introduces novel rule-based curricula based on the interaction between speaker-intended emotion labels and multi-annotator perceived label distributions.
- Demonstrates consistent accuracy improvements and faster convergence across both LSTM and Transformer architectures in subject-dependent and subject-independent settings.
- Achieves up to a 40% reduction in cumulative gradient updates using specific curriculum orderings with minimal to no degradation in final performance.

## Problem

Traditional speech emotion recognition (SER) struggles with high variance and label noise stemming from speaker variability, acoustic noise, and the inherent subjectivity of emotional perception. Prior curriculum learning approaches rely on simplistic heuristics, task-agnostic noise metrics, or model-based difficulty scores (like mutual information), largely ignoring human perceptual difficulty. This gap matters because standard training on subjective, noisy emotional data causes models to overfit ambiguous cases early, leading to poor generalization across speakers.

## Method

CHUCKLE categorizes training samples from crowd-sourced datasets into difficulty bins using two main paradigms: score-based metrics (Intended Emotion Score and Shannon entropy over annotator distributions) and novel rule-based orderings. The rule-based strategies partition samples into four classes: Clear Match, Clear Mismatch, Ambiguous Match, and Ambiguous Mismatch. These are sequenced into progressive curricula such as Intended-Perceived Agreement 1 (1->2->3->4), Agreement 2 (1->3->4->2), and Agreement 3 (1->3->2->4), balancing agreement strength and intended-label alignment.

Training leverages 1280-dimensional frame-level representations extracted from the final hidden layer of a frozen HuBERT-Xlarge model (audio resampled to 16 kHz). Architectures evaluated include a 2-layer BiLSTM (128-dim) and a 2-layer Transformer (4 attention heads, 128-dim) trained using the Adam optimizer and a CosineAnnealingLR scheduler that resets per curriculum stage. Training proceeds sequentially through the difficulty bins, starting with unambiguous 'Easy' samples to build stable low-level representations before introducing ambiguous or misaligned data.

The key design choice—ordering by human perceptual agreement and intended-label alignment—was made on the hypothesis that samples difficult for human crowd raters present parallel optimization hurdles for neural networks, shielding early training from confusing noise while progressively teaching nuanced emotional boundaries.

## Experimental setup

Evaluated on the CREMA-D audiovisual dataset (7,442 clips from 91 actors, 6 emotions, with 8-12 raters per clip yielding intended and perceived labels; audio split evaluated at 41.6% overall perceived-vs-intended match rate). Compared against non-curriculum baselines, random curriculum, Intended Emotion Score, and Entropy Score. Metrics include mean macro accuracy across 10 trials, validated via paired one-sided t-tests (p < 0.05). Implemented using PyTorch on an RTX A6000 GPU, training LSTMs for 200 epochs (50 per stage) and Transformers for 400 epochs (100 per stage).

## Results

In the subject-dependent setting, the Intended-Perceived Agreement 1 curriculum achieved a mean macro accuracy of 0.6623 for LSTMs (vs 0.6522 baseline) and 0.6827 for Transformers (vs 0.6685 baseline). In the subject-independent setting, Agreement 1 reached 0.6669 for LSTMs and 0.6857 for Transformers, both yielding statistically significant improvements over non-curriculum models. Transformers exhibited larger relative gains (up to 3.0% improvement in subject-independent mode), though they experienced temporary loss spikes when transitioning to larger, diverse intermediate difficulty bins. Furthermore, configurations like Agreement 2 reduced training costs by approximately 40% in cumulative gradient updates while retaining competitive accuracy.

| System / Condition | LSTM (SD) | LSTM (SI) | Transformer (SD) | Transformer (SI) |
|---|---|---|---|---|
| Non Curriculum | 0.6522 | 0.6554 | 0.6685 | 0.6659 |
| Random Curriculum | 0.6492 | 0.6504 | 0.6569 | 0.6595 |
| Intended Emotion Score | 0.6609 | 0.6626 | 0.6763 | 0.6739 |
| Entropy Score | 0.6568 | 0.6552 | 0.6739 | 0.6826 |
| Agreement 1 (Proposed) | 0.6623 | 0.6669 | 0.6827 | 0.6857 |

## Limitations

The study is experimentally scoped to a single dataset (CREMA-D) and relies on pre-extracted self-supervised features from HuBERT rather than end-to-end raw audio training. The absolute accuracy gains, while statistically significant and consistent, remain modest in magnitude. Additionally, the approach strictly requires crowd-sourced multi-annotator datasets that explicitly provide both intended and perceived emotional labels, limiting immediate plug-and-play application to standard single-label SER corpora.

## Why read this

Researchers and engineers working on speech emotion recognition or subjective speech tasks should read this to learn how to operationalize human annotator disagreement and label alignment into efficient curriculum learning schedules.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust speech emotion recognition systems for call centers, affective computing, conversational AI agents, and mental health monitoring.

## Institutions / 機構

New York Institute of Technology, New York University

## Related

- (link related pages by id as the wiki grows)
