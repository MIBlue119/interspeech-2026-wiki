---
id: jang26b_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3216
pdf: https://www.isca-archive.org/interspeech_2026/jang26b_interspeech.pdf
---

# DP-BCT: A Dual-Path model for predicting BackChannel Timing

[PDF](https://www.isca-archive.org/interspeech_2026/jang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3216)

**TL;DR** — The paper introduces a Dual-Path Backchannel Timing Prediction model (DP-BCT) that decouples fast and slow functional response categories, improving Macro-F1 accuracy from 0.4862 to 0.6254.

## Problem

Prior backchannel timing models optimize multiple functional categories within a single shared path, which introduces optimization interference when categories exhibit distinct latency profiles. Grounded in Dual-Process Theory, backchannels can be split into fast groups (simple continuers) and slow groups (understanding, assessment, affect), each demonstrating significantly different latency distributions relative to Backchannel Opportunity Points (BOPs).

## Method

The model utilizes a pretrained Korean HuBERT-base encoder to extract 768-dimensional frame-level acoustic features at 50 Hz from a 20-second mono audio segment, focusing on the last 100 frames. A two-stage training scheme first adapts the encoder via a VAD head, followed by freezing the encoder while training a BOP head, a Dual-Path Module, and a frame-level BC predictor. The Dual-Path Module employs parallel 4-layer Transformer encoders with 8 attention heads—a Fast Path dedicated to contact/perception feedback and a Slow Path for understanding, assessment, and affect categories. Training combines Focal Loss for the main multiclass objective with auxiliary binary cross-entropy losses and a balanced frame mask.

## Results

Evaluated on K-MIND, a 115-hour Korean dyadic conversation dataset, Cox Proportional Hazards survival analysis confirms significant differences across four functional categories (all p < 0.001, hazard ratios 0.71–0.85). For backchannel prediction, DP-BCT raises Macro-F1 from 0.4862 (single-path baseline SP-BCT) to 0.6254 and Accuracy from 0.4858 to 0.6382. Task-to-path swap ablations confirm that the proposed category-to-path grouping outperforms alternative configurations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Spoken dialogue systems and conversational agents requiring precise timing and functional appropriateness for interactive listener feedback.

## Limitations

The current dataset is limited to Korean dyadic dialogues, and the model relies exclusively on acoustic features without multimodal signals like gaze or gestures.

## Related

- (link related pages by id as the wiki grows)
