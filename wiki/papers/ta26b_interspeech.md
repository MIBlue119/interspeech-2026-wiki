---
id: ta26b_interspeech
category: paralinguistics-emotion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1587
pdf: https://www.isca-archive.org/interspeech_2026/ta26b_interspeech.pdf
---

# Progressive Weak Supervision for Speech Emotion Recognition

*Bao Thang Ta, Huynh Thi Thanh Binh, Van Hai Do*

[PDF](https://www.isca-archive.org/interspeech_2026/ta26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ta26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1587)

**Category:** `paralinguistics-emotion`

**TL;DR** — Progressive Weak Supervision (PWS) dynamically relaxes cross-entropy supervision during early speech emotion recognition training by accepting top-k soft targets that decay to standard hard targets, achieving 78.08% unweighted accuracy on IEMOCAP and 85.70% on ViSEC.

## Key contributions

- Proposes Progressive Weak Supervision (PWS) to reconcile label ambiguity and high early-stage model uncertainty by aligning supervision strength with model maturity.
- Formulates a three-phase decay schedule (warm-up, linear decay, and standard supervision) controlling the top-k threshold over training epochs.
- Introduces a model-aware soft target distribution controlled by concentration parameter alpha that allocates residual probability mass specifically to the model's top-k predicted classes.
- Demonstrates cross-lingual generalization and substantial performance gains on both English (IEMOCAP) and low-resource Vietnamese (ViSEC) datasets.

## Problem

Speech emotion recognition (SER) suffers from inherent label ambiguity because emotional utterances are continuous, overlapping, and subjectively perceived by listeners, yet models are traditionally trained on rigid one-hot targets. Furthermore, self-employed acoustic encoders like WavLM are pre-trained for ASR rather than emotion, causing high model uncertainty and diffuse output distributions in early epochs. Standard cross-entropy and static label smoothing fail to address this because they apply inflexible supervision regardless of the training stage or the model's current predictive state.

## Method

PWS uses a WavLM-Base acoustic encoder to map speech waveforms into frame-level representations (hidden dimension 768), which are aggregated into utterance embeddings using attention pooling with a 128-dimensional hidden projection. A two-layer MLP classification head with ReLU activations and dropout (p = 0.3) maps the embeddings to 4 class logits.

During training, PWS evaluates whether the true emotion label lies within the model's top-k predicted classes. If it does (weak correctness equals 1), a soft target distribution is constructed using a concentration parameter alpha (set to 0.7) that places 70% probability on the true label and distributes the remaining 30% evenly across the other top-k candidates. If the true label is outside the top-k, a hard one-hot target is applied. The loss is minimized using Kullback-Leibler (KL) divergence between the soft targets and model predictions.

The threshold k follows a three-phase schedule over 200 epochs: a 10% warm-up phase (epochs 0-19) where k is held at k_init; a linear decay phase (epochs 20-149) where k decays monotonically toward 1; and a final supervision phase (epochs 150-200) where k equals 1, completely recovering standard cross-entropy.

## Experimental setup

Evaluated on IEMOCAP (English, 10 speakers, 5,531 utterances, ~12 hours) using session-based 5-fold cross-validation, and ViSEC (Vietnamese, 147 speakers, 5,280 utterances) using speaker-stratified 5-fold cross-validation. Baselines include standard Cross-Entropy (CE), Label Smoothing (epsilon = 0.1), Label Smoothing + Curriculum Learning (LS+CL), and recent advanced WavLM-Base methods (Vesper, EmoDim, Emotion2vec). Evaluated using Unweighted Accuracy (UA). Models are optimized using AdamW (learning rate 1e-4, weight decay 1e-2, batch size 32) for 200 epochs with FP16 mixed-precision.

## Results

On IEMOCAP, PWS with k_init = 3 achieves 78.08% UA, outperforming the CE baseline (73.42%), Label Smoothing (74.15%), LS+CL (74.89%), and EmoDim (76.98%). On the lower-resource ViSEC corpus, PWS with k_init = 3 reaches 85.70% UA, exceeding the CE baseline (73.80%) by a massive 11.90 absolute percentage points and Label Smoothing (75.30%) by 10.40 points. Increasing k_init from 2 to 3 consistently boosts performance (+1.50 on IEMOCAP, +3.60 on ViSEC). Per-class recall improvements are highest for acoustically confusable classes like happy (+8.2) and neutral (+5.1). Ablations confirm that a 10% warm-up fraction and KL divergence loss yield optimal performance.

| System / Condition | IEMOCAP (UA %) | ViSEC (UA %) |
|---|---|---|
| CE (baseline) | 73.42 | 73.80 |
| Label Smoothing (epsilon=0.1) | 74.15 | 75.30 |
| LS + Curriculum Learning | 74.89 | — |
| EmoDim (Prior art) | 76.98 | — |
| PWS (k_init = 2) | 76.58 | 82.10 |
| PWS (k_init = 3) | 78.08 | 85.70 |

## Limitations

The method is evaluated exclusively on 4-class categorical emotion classification tasks, leaving continuous dimensional emotion spaces (valence, arousal, dominance) unexplored. The approach is only tested on two languages (English and Vietnamese) and relies on WavLM-Base representations, meaning its scaling behavior with larger speech foundation models (e.g., billion-parameter models) remains to be verified.

## Why read this

Researchers and engineers working on speech emotion recognition or classification under label noise and high model uncertainty will find PWS a simple, plug-and-play loss modification that outperforms static label smoothing and curriculum learning without adding architectural overhead.

## Code

- https://github.com/skyemo47/PWS

## Applications

Mental health monitoring, call-center analytics, interactive dialogue systems, and affective computing.

## Institutions / 機構

Viettel AI, Viettel Group, Hanoi University of Science and Technology, Thuyloi University

**Funding / 經費:** Vingroup Innovation Foundation

## Related

- (link related pages by id as the wiki grows)
