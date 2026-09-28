---
id: lee26y_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3372
pdf: https://www.isca-archive.org/interspeech_2026/lee26y_interspeech.pdf
---

# Surgical-Robot Command Spotting: Safety-Aware Learning for Compositional Commands

[PDF](https://www.isca-archive.org/interspeech_2026/lee26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3372)

**TL;DR** — The paper introduces a lightweight, factorized command spotting model for safety-critical surgical robots that achieves 95.36% joint command success and reduces catastrophic step errors using ordinal regression and head-wise temporal attention.

## Problem

Voice control systems for surgical-assistant robots must operate reliably under high operating-room noise and personal protective equipment like surgical masks. Treating compositional commands—such as movement directions paired with discrete step magnitudes—as independent classes ignores their structure and fails to penalize hazardous overshoots or undershoots. Standard models treat all errors equally, which is dangerous in safety-critical clinical environments where confusing a large step count with a small one can cause severe physical harm.

## Method

The architecture combines a shared lightweight 2D/1D depthwise-separable CNN encoder with head-wise temporal attention pooling to extract task-specific features for direction, mode, and magnitude independently. Direction and mode are classified via standard softmax heads, while discrete step magnitude (1 to 5) is modeled using CORAL ordinal regression with per-sample loss masking. An auxiliary 51-way head stabilizes training but is discarded at inference. The model totals 181K parameters and requires 5.99M MACs per 2-second window, and is initialized via English pretraining on Google Speech Commands v2 before fine-tuning on a Korean operating-room command dataset.

## Results

Evaluated on a Korean operating-room command dataset (7,140 utterances across 5 speakers) using leave-one-speaker-out cross-validation under clean/noise and mask/no-mask conditions, the full model achieves 95.36% joint command success, a mean absolute error (MAE) of 0.0338 steps, and a catastrophic step error rate (|Δ| ≥ 3) of 0.60%. Compared to a flat 51-way baseline (93.14% success) and a softmax-based magnitude model (0.83% catastrophic error), the proposed ordinal approach improves both accuracy and safety. Ablation tests demonstrate that removing English pretraining causes the sharpest drop in success (down to 88.97%), while dropping head-wise attention lowers success to 92.54% and substituting softmax for CORAL increases MAE to 0.0445 steps.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and robotics engineers building on-device, safety-critical voice interfaces for medical assistants and surgical robots operating in noisy environments.

## Limitations

The study relies on a small speaker pool and evaluates pre-segmented 2-second utterances rather than continuous, always-on streaming audio.

## Related

- (link related pages by id as the wiki grows)
