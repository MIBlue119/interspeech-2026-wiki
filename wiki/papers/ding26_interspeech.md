---
id: ding26_interspeech
category: asr
labels: [robustness-noise]
institutions: ["Jiangsu University", "University of Melbourne"]
code: https://github.com/dhyzy123/ImKWS
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-258
pdf: https://www.isca-archive.org/interspeech_2026/ding26_interspeech.pdf
---

# ImKWS: Test-Time Adaptation for Keyword Spotting with Class Imbalance

*Hanyu Ding, Yang Xiao, Jiaheng Dong, Ting Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/ding26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ding26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-258)

**Category:** `asr` · **Labels:** `robustness-noise`

**TL;DR** — ImKWS is a test-time adaptation framework for keyword spotting that tackles extreme class imbalance between rare keywords and dominant background sounds via decoupled entropy minimization and multi-view consistency, improving macro F1 by up to 2.96% over state-of-the-art baselines under severe noise.

## Key contributions

- Identifies and analyzes the majority-class collapse failure mode of standard entropy minimization in test-time adaptation for imbalanced streaming keyword spotting.
- Proposes Decoupled Entropy Minimization (DEM), separating adaptation into a temperature-scaled reward branch for minority keywords and a margin-adjusted penalty branch (controlled by α) for frequent background sounds.
- Introduces a multi-view consistency loss using symmetric cross-entropy across time- and frequency-masked inputs to suppress gradient variance and prevent erratic updates.
- Employs a two-stage sample selection pipeline combining selective entropy and pseudo-keyword consistency resampling to filter out unreliable adaptation samples.

## Problem

Standard test-time adaptation (TTA) approaches like Tent, SAR, and ETA rely on entropy minimization to adapt models to target domains using only unlabeled data. However, continuous keyword spotting (KWS) streams exhibit extreme class imbalance, where frequent non-keyword background sounds vastly outnumber rare keyword events. During unconstrained entropy minimization, background samples dominate the update gradients, causing the model to become overconfident in the background class, systematically shifting decision boundaries, and destroying rare keyword sensitivity. Prior KWS adaptation methods like AdaKWS fail to resolve this fundamental logit explosion, making them fragile in realistic, noisy deployments.

## Method

The framework builds upon a lightweight BC-ResNet-3 backbone processing 40-dimensional Mel-frequency cepstral coefficients extracted with a 160 ms hop length. To prevent background-class collapse, the standard entropy objective is split into a Reward Branch and a Penalty Branch. The Reward Branch applies a temperature parameter tau (set to 1.0) to maintain distribution sharpness and stability for minority keywords. The Penalty Branch introduces a tunable scaling factor alpha (set to 0.8) to subtract a positive margin (1-alpha) from non-target logit gradients, preventing non-target logits from being aggressively driven to negative infinity and stopping majority-class overconfidence.

To control the amplified relative impact of noisy samples under DEM, ImKWS incorporates a Multi-view Consistency Loss. Given an input sample x and two augmented views generated via time-masking (max length 20) and frequency-masking (max length 5), the model enforces consistency using symmetric cross-entropy (Lsce). This acts as a regularizer that bounds gradient divergence and prevents erratic gradient spikes caused by imbalance.

Before adaptation updates, samples undergo a two-stage selection filter requiring the DEM loss to fall below a threshold (tau_dem = 0.4) and a pseudo-keyword consistency score to exceed a threshold (tau_pkc = 0.05). The final objective combines the filtered sample-weighted DEM loss and the multi-view consistency loss weighted by lambda (1.0). Adaptation is performed in a single pass over test data by updating only the affine parameters of batch normalization layers using SGD with a learning rate of 1e-4 and a batch size of 128.

## Experimental setup

Evaluated on the 12-class Google Speech Commands v2 dataset (16 kHz), mapped to a 4-class task ('yes', 'up', 'stop', and a merged background class of the remaining nine categories). Test sets simulate real-world acoustic shifts by corrupting audio with ESC-50 multi-source noise and five types of MS-SNSD single-source noise across signal-to-noise ratios (SNRs) of -10 dB, 0 dB, and 10 dB, with keyword-to-non-keyword ratios varying from 1:4 to 1:8. Baselines include unadapted models, Test-Time Normalization (TBN), Tent, SAR, ETA, and AdaKWS. Performance is measured via macro- and micro-averaged F1 scores.

## Results

On MS-SNSD at -10 dB with a 1:8 imbalance ratio, ImKWS achieves a Macro F1 of 69.91% and Micro F1 of 91.82%, outperforming the strongest baseline AdaKWS (67.09% Macro F1) by +2.82% absolute. On ESC-50 at -10 dB under the same 1:8 ratio, ImKWS reaches 70.91% Macro F1, surpassing AdaKWS (69.31%) by +1.60%. As the non-keyword ratio scales from 1:4 to 1:8, ImKWS maintains a widening performance advantage, proving its resilience to escalating gradient bias.

Ablation studies show that removing Decoupled Entropy Minimization drops MS-SNSD Macro F1 from 69.91% to 68.39%, while removing multi-view consistency reduces it to 69.06%. Gradient distribution analyses confirm that adding the consistency loss flattens the long upper tails of gradient norms, successfully neutralizing the erratic spikes induced by severe class imbalance.

| Systems / Conditions | ESC-50 (-10 dB, 1:8) Macro/Micro F1 | MS-SNSD (-10 dB, 1:8) Macro/Micro F1 |
| :--- | :--- | :--- |
| Unadapted | 61.87 / 91.32 | 61.33 / 90.75 |
| Tent | 68.99 / 89.83 | 66.97 / 89.87 |
| SAR | 69.35 / 89.95 | 66.51 / 89.54 |
| ETA | 69.29 / 89.88 | 66.48 / 89.59 |
| AdaKWS | 69.68 / 90.25 | 67.09 / 90.04 |
| ImKWS (Ours) | **70.91 / 91.20** | **69.93 / 91.74** |

## Limitations

The evaluation is restricted to a small-footprint keyword spotting task derived from a single benchmark (Google Speech Commands v2) with a consolidated 4-class setup, lacking validation on large-vocabulary speech tasks or complex multi-speaker conversational settings. The method assumes batch normalization parameters are sufficient for adaptation, which may limit capacity for models where deeper network weights must be adapted on-device.

## Why read this

Speech and ML engineers building on-device voice assistants operating in noisy, unconstrained environments will learn how to stabilize test-time adaptation under extreme class skew without requiring source data.

## Code

- https://github.com/dhyzy123/ImKWS

## Applications

On-device keyword spotting, voice assistants, smart home appliance control, and hands-free voice search.

## Institutions / 機構

Jiangsu University, University of Melbourne

## Related

- (link related pages by id as the wiki grows)
