---
id: kovalev26_interspeech
category: paralinguistics-emotion
labels: [efficient-on-device, self-supervised, streaming-real-time]
institutions: ["Symbal AI", "Princeton University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1480
pdf: https://www.isca-archive.org/interspeech_2026/kovalev26_interspeech.pdf
---

# SEAM: Shortcut-Aware Real-Time Detection of Scripted vs. Spontaneous Speech for Interview Guardrails

*Vsevolod Kovalev, Pranay Manocha*

[PDF](https://www.isca-archive.org/interspeech_2026/kovalev26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kovalev26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1480)

**Category:** `paralinguistics-emotion` · **Labels:** `efficient-on-device`, `self-supervised`, `streaming-real-time`

**TL;DR** — SEAM is a shortcut-aware real-time framework for detecting scripted versus spontaneous speech in job interviews, achieving 0.971 ROC-AUC on external interview data using a compact 23M-parameter DistilHuBERT backbone.

## Key contributions

- Integrates uniform waveform preprocessing, seam-aware sampling, and non-speech noise-bank augmentation to suppress spurious corpus, channel, and boundary shortcuts.
- Demonstrates that shortcut-prevention components improve external domain transfer despite lowering internal held-out accuracy.
- Identifies a compact DistilHuBERT configuration (23M parameters, 41.8 MB at INT4) optimized for low-latency real-time deployment.
- Establishes a rigorous transfer-oriented evaluation protocol using both grouped internal splits and an adversarial external interview benchmark.

## Problem

Distinguishing scripted from spontaneous speech is useful for interview guardrails, but prior models often exploit spurious shortcuts like microphone characteristics, room acoustics, codec artifacts, and dataset-specific provenance boundaries rather than true speaking style. This causes strong internal benchmark performance to collapse under slight distribution shifts in real-world deployments. Creating a lightweight, real-time guardrail requires an architecture that is both computationally efficient and explicitly hardened against shortcut learning.

## Method

SEAM uses a pretrained DistilHuBERT encoder coupled with a 2-layer MLP classification head (ReLU, dropout p=0.30) trained with BCEWithLogitsLoss using the AdamW optimizer (weight decay 0.01). The pipeline processes audio at mono 16 kHz through a uniform waveform preprocessing chain: DC removal, a 70 Hz high-pass biquad filter, integrated loudness normalization to -23 LUFS, and peak limiting at 0.99 clamped to [-1, 1]. To prevent provenance and channel shortcuts, audio is stored in 10-minute FLAC chunks and sampled using seam-aware constraints (never crossing recording boundaries; padding with non-speech if necessary) combined with a 14-hour non-speech noise bank (room tone, breathing) mixed additively at a sampled SNR over 40-70% of the window.

The training regimen explores shallow adaptation strategies, ultimately selecting 8-second analysis windows and unfreezing only the top transformer layer with constant learning rates of 5e-6 for the encoder and 3e-4 for the head across 3 epochs. For inference, window-level outputs are aggregated via median logit pooling, and post-training quantization is applied to reduce the footprint for live stream deployment.

## Experimental setup

The internal dataset comprises 4 English corpora (People's Speech, PodcastFillers, LibriSpeech, Spoken Wikipedia) totaling 240 hours per class, split into grouped 80/10/10 train/eval/test sets across 2,238 total speakers. The external evaluation benchmark consists of 720 proprietary English interview clips balanced across scripted/spontaneous styles and clean/mixed room-microphone conditions. Systems are evaluated using window-level Accuracy and ROC-AUC, implemented with a fixed-budget ablation regime (batch size 256, 4 shards/class, 120 steps) and a full-training regime on NVIDIA A100 and L4 hardware.

## Results

Under the full-training regime, the final SEAM model achieves an internal test accuracy of 0.9623 (±0.0068) and ROC-AUC of 0.9766 (±0.0045), alongside an external interview-domain accuracy of 0.9517 (±0.0077) and ROC-AUC of 0.9713 (±0.0039). Ablation studies prove that removing shortcut defenses (noise bank and seam-aware sampling) artificially boosts internal test ROC-AUC from 0.9287 to 0.9557, but drastically crashes external interview transfer ROC-AUC from 0.8991 down to 0.7324.

Regarding window lengths, 8-second windows outperform 2s, 4s, and 12s variants. For adaptation depth, unfreezing only the top transformer layer (tr1, Test AUC 0.9287) surpasses head-only tuning, deeper unfreezing (tr2), and partial CNN unfreezing (cnn2). Post-training quantization successfully compresses the model to 48.74 MB (INT8) and 41.80 MB (INT4) with negligible degradation in external AUC (0.9700 and 0.9743 respectively).

| System / Condition | Test Acc | Test AUC | Ext Acc | Ext AUC |
|---|---|---|---|---|
| Baseline (Full SEAM) | 0.9623 | 0.9766 | 0.9517 | 0.9713 |
| Seam-aware off | 0.9328 | 0.9328 | 0.8179 | 0.8674 |
| SpecAugment instead | 0.9405 | 0.9405 | 0.7807 | 0.8202 |
| Noise bank off | 0.9491 | 0.9491 | 0.7089 | 0.7518 |
| Noise off + Seam off | 0.9557 | 0.9557 | 0.6882 | 0.7324 |

## Limitations

The framework remains English-first with only partial zero-shot transfer capabilities across other languages. Scriptedness labels remain inherently entangled with genre and recording practices, preventing the model from capturing a complete, pristine representation of speaking style. The evaluation is restricted to a proprietary interview domain and requires broader testing across diverse accents, recording hardware, and acoustic environments.

## Why read this

Speech and ML engineers building real-time audio guardrails should read this paper to learn how to prevent self-supervised models from overfitting to dataset shortcuts and channel artifacts.

## Code

- https://github.com/vsevolod-kovalev/seam

## Applications

Real-time AI interview guardrails, conversational system integrity checks, and speaking-style corpus curation.

## Institutions / 機構

Symbal AI, Princeton University

## Related

- (link related pages by id as the wiki grows)
