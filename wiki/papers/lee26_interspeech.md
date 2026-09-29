---
id: lee26_interspeech
category: paralinguistics-emotion
labels: [self-supervised]
institutions: ["National Tsing Hua University", "University of Southern California", "National Taiwan University", "University of Edinburgh"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-80
pdf: https://www.isca-archive.org/interspeech_2026/lee26_interspeech.pdf
---

# AdaLTM: Adaptive Layer-wise Task Vector Merging for Categorical Speech Emotion Recognition with ASR Knowledge Integration

*Chia-Yu Lee, Huang-Cheng Chou, Tzu-Quan Lin, Yuanchao Li, Ya-Tse Wu, Shrikanth Narayanan, Chi-Chun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-80)

**Category:** `paralinguistics-emotion` · **Labels:** `self-supervised`

**TL;DR** — AdaLTM introduces an adaptive layer-wise task vector merging framework that combines in-domain ASR and SER models into a frozen WavLM-Large backbone, achieving a Macro-F1 of 35.20% and eliminating multi-task optimization conflicts.

## Key contributions

- Proposes AdaLTM, an adaptive layer-wise weight-space merging framework to integrate ASR knowledge into SER without gradient interference.
- Establishes the empirical necessity of domain consistency, showing that in-domain ASR task vectors significantly outperform out-of-domain (LibriSpeech) alternatives.
- Achieves competitive performance on the MSP-Podcast dataset with a UAR of 38.94% and Macro-F1 of 35.20%.
- Performs extensive layer-wise dynamics analysis revealing how dual-vector integration balances linguistic anchoring and prosodic dominance.

## Problem

Integrating ASR into speech emotion recognition (SER) is beneficial for supplying linguistic context, but traditional output-level fusion is sensitive to transcription errors, and multi-task learning (MTL) suffers from severe optimization conflicts. Specifically, ASR seeks emotion-invariant representations by suppressing paralinguistic variability, whereas SER depends precisely on such variability to infer emotional states. Furthermore, simply combining task vectors from out-of-domain ASR models (like those trained on Librispeech) introduces domain mismatch by discarding vital paralinguistic cues such as laughter and pitch contours.

## Method

The framework uses WavLM-Large as the foundational base model (W_base), partitioned into 25 distinct layers (one CNN front-end/embedding layer indexed at l=0, and 24 transformer encoder layers indexed from l=1 to 24). Two independent fine-tuned models are used to extract task vectors: an in-domain SER model (W_SER) and an in-domain ASR model (W_ASR). Task vectors are computed as element-wise weight residuals: delta W_ASR = W_ASR - W_base and delta W_SER = W_SER - W_base.

To combine these without gradient interference, layer-wise merging coefficients lambda_ASR^(l) and lambda_SER^(l) (initialized to 0.5) dynamically scale the respective task vectors for each layer l. The backbone weights, ASR task vector, and SER task vector are strictly frozen during the final emotion training phase. Hidden states H^(l) from all 24 transformer layers are aggregated via a learnable weighted sum with normalized, trainable layer weights alpha_l to produce the final representation H_out, which is fed into an emotion prediction head.

The framework optimizes only the layer-wise merging coefficients lambda, the weighted sum weights alpha_l, and the emotion prediction head parameters using the AdamW optimizer with a learning rate of 1.0e-4 and batch size of 32. A class-balanced soft cross-entropy loss is employed to handle class imbalance across the 8-class MSP-Podcast categorical emotion classification task, selecting the best model checkpoint from 100 training epochs based on validation loss.

## Experimental setup

Experiments are conducted on the MSP-Podcast (v1.12) dataset containing 89,752 training, 25,232 validation, and 46,366 test samples with human-annotated transcripts. The backbone is WavLM-Large (315.9M total parameters, of which AdaLTM updates only 0.46M parameters or 0.1463%). Baselines include fully trainable multi-task learning (MTL) models, a frozen baseline without merging, single-vector ASR and SER setups, out-of-domain ASR task vectors (LibriSpeech 100h, yielding a 37.86% WER vs. 23.09% for in-domain ASR), and global merging strategies. Evaluation metrics include Unweighted Average Recall (UAR), Precision, and Macro-F1 (MaF1) alongside 95% confidence intervals, executed on two NVIDIA V100 GPUs (64GB).

## Results

The proposed dual-vector AdaLTM framework achieves a UAR of 38.94% (Precision: 34.26%, Macro-F1: 35.20%), outperforming conventional fully trainable multi-task learning baselines which collapse to a UAR of 29.54% due to gradient interference (the seesaw effect). Ablations show that the frozen baseline achieves 37.05% UAR, an ASR-only vector achieves 37.57% UAR, and an SER-only vector achieves 39.09% UAR. While the SER-only setup scores marginally higher by 0.15% UAR than the dual-vector approach due to parameter crowding within a fixed-capacity model, the dual-vector model successfully integrates semantic context without catastrophic forgetting.

Replacing the in-domain ASR vector with an out-of-domain LibriSpeech vector drops UAR to 38.68% and causes feature suppression and optimization chaos in deep layers. Furthermore, adaptive layer-wise merging outperforms static global merging (38.30% UAR) and adaptive global merging (38.93% UAR), verifying the necessity of layer-wise depth-aware balancing.

| System / Condition | UAR (%) | Precision (%) | Macro-F1 (%) |
|---|---|---|---|
| Fully Trainable MTL Baseline | 29.54 | 33.35 | 28.40 |
| Frozen Backbone Baseline (Setup 1) | 37.05 | 34.46 | 34.46 |
| ASR-Only Vector (Setup 2) | 37.57 | 34.43 | 33.56 |
| SER-Only Vector (Setup 3) | 39.09 | 34.80 | 35.41 |
| Proposed Dual-Vector (Setup 4) | 38.94 | 34.26 | 35.20 |
| Out-of-Domain Dual-Vectors | 38.68 | 34.20 | 34.84 |

## Limitations

The framework requires in-domain transcriptions to fine-tune the auxiliary ASR model, limiting applicability to under-resourced emotional datasets lacking transcripts. While downstream adaptation is parameter-efficient, the initial extraction of task vectors requires separate fine-tuning of multiple foundation models, incurring additional computational overhead. The evaluation is currently restricted to English categorical emotion recognition on the MSP-Podcast corpus.

## Why read this

Researchers and ML engineers working on multi-task speech processing will learn how to bypass gradient conflicts using weight-space task vector merging instead of joint backpropagation. It provides a blueprint for adaptively combining linguistic and acoustic representations across transformer depths.

## Code

- https://anonymous.4open.science/r/AdaLTM-62A2/

## Applications

Speech emotion recognition systems, call center analytics, conversational agents, and affective computing applications requiring robust modeling of both text semantics and acoustic prosody.

## Institutions / 機構

National Tsing Hua University, University of Southern California, National Taiwan University, University of Edinburgh

**Funding / 經費:** NSTC, Taiwan, NSF, ODNI IARPA ARTS

## Related

- (link related pages by id as the wiki grows)
