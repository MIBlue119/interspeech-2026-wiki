---
id: zhang26d_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-463
pdf: https://www.isca-archive.org/interspeech_2026/zhang26d_interspeech.pdf
---

# Dual-Encoder Fusion with Explicit and Implicit Injection for the Interspeech 2026 Audio Encoder Capability Challenge

*Yucong Zhang, Zhang Chen, Juan Liu, Wei Ju, Hongbin Suo, Ming Li*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-463)

**TL;DR** — This paper investigates dual-encoder fusion combining Whisper and Dasheng within the Large Audio Language Model framework for the Interspeech 2026 Audio Encoder Capability Challenge, achieving an overall Track A score of 0.712 via implicit adaptation. It demonstrates that a token-wise softmax-gated residual fusion augmented with an STFT spectral branch provides a stable and robust architecture.

## Key contributions

- Evaluated three distinct front-end fusion operators (Concatenation, MoE routing, and softmax-gated residual fusion) and identified softmax-gating with residual aggregation as the most stable baseline.
- Proposed a lightweight STFT residual branch that injects frame-level log-magnitude spectral features (1024-bin FFT, 640 hop, 128 mel bins, 512 dimensions) to capture missing fine-grained frequency cues.
- Introduced implicit injection via LoRA adaptation of Dasheng prior to fusion, achieving the highest overall Track-A score (0.712).
- Developed explicit injection via linear residual decomposition and auxiliary regularization (residual energy penalty and cross-covariance decorrelation) to isolate nonredundant information and maximize per-task peak performance.

## Problem

Large Audio Language Models rely on a single pre-trained audio encoder as the primary interface between raw audio waveforms and the language model backbone. Because individual encoders like Whisper (optimized via weakly supervised transcription) and Dasheng (optimized via masked audio modeling) possess distinct representational biases and competencies, a single encoder cannot uniformly excel across heterogeneous speech and acoustic tasks. Prior work has explored feature-level aggregation and Mixture-of-Experts routing, but lacks a systematic analysis of how complementary information from multiple encoders is injected, controlled, and preserved without destabilizing training.

## Method

The system ingests a 16-kHz waveform, processed by Whisper-Base and Dasheng-Base streams operating at 25 fps to produce frame-level tokens mapped to a shared 512-dimensional fusion space. The core fusion operator uses a token-wise two-way softmax gate computed from linear projections of both streams, followed by residual aggregation and Layer Normalization. An STFT residual branch calculates log-magnitude spectrograms, projects them to 512 dimensions, and adds them via a learnable, small-initialized scaling factor (gamma initialized to 0.01).

For implicit injection, Dasheng is adapted for 10k steps using LoRA (rank r=16, alpha=32, target modules qkv, dropout 0.05, learning rate 1e-4) while Whisper is frozen; LoRA weights are then merged into the backbone, and both encoders are frozen during subsequent 100k-step fusion training (learning rate 5e-5, batch size 8, weight decay 0.01). For explicit injection, a linear map extracts the Dasheng residual predictable from Whisper, which is then regularized via an energy penalty on valid frames and a Frobenius-norm cross-covariance penalty to enforce decorrelation between projected Whisper features and projected residual features.

## Experimental setup

Evaluated on the official Interspeech 2026 Audio Encoder Capability Challenge (AECC) benchmark using the XARES-LLM framework. Track A comprises 15 classification tasks (e.g., ASVspoof2015, ESC-50, VoxCeleb1, GTZAN), and Track B comprises 5 speech recognition and audio-language understanding tasks (e.g., AISHELL-1, Clotho, LibriSpeech, SongDescriber). Training uses the official 'all' multi-task recipe covering 20 datasets with sampling ratios ranging from 0.226% (SongDescriber) to 24.615% (VoxLingua33, MECAT). Results are reported across three different server runs to measure variance.

## Results

On Track A, the baseline softmax-gated model with STFT residual achieves an overall score of 0.701. Explicit injection increases this to 0.706 (±0.001) and wins the highest number of individual subtask best scores (such as fsd50k at 0.111, gtzan at 0.744, nsynth at 0.694, speechcommandsv1 at 0.776, and voxlingua33 at 0.868). Implicit injection achieves the highest Track A overall score of 0.712 (±0.001) driven by broad gains on acoustic classification tasks like cremad (0.632), esc-50 (0.763), and gtzan (0.768). On Track B, explicit injection attains the highest overall score of 0.446 (±0.002), outperforming the single encoders (Whisper 0.400, Dasheng 0.270). However, fusion does not universally dominate all subtasks; single encoders or simpler baselines occasionally retain superiority on datasets like fluentspeechcommands, libricount, and voxceleb1.

| System | Track A Overall | Track B Overall | cremad | esc-50 | gtzan | voxceleb1 |
|---|---|---|---|---|---|---|
| Whisper (Single) | 0.652 | 0.400 | 0.516 | 0.635 | 0.697 | 0.762 |
| Dasheng (Single) | 0.614 | 0.270 | 0.621 | 0.755 | 0.323 | 0.974 |
| Softmax-gated + STFT (Baseline) | 0.701 | 0.442 | 0.598 | 0.715 | 0.707 | 0.932 |
| Explicit Injection | 0.706 | 0.446 | 0.619 | 0.721 | 0.744 | 0.860 |
| Implicit Injection | 0.712 | 0.445 | 0.632 | 0.763 | 0.768 | 0.872 |

## Limitations

The study is restricted to the base model sizes of Whisper and Dasheng due to compute constraints, and uses a fixed multi-task data recipe without task-specific distribution tuning. Explicit and implicit injection mechanisms were only tested under the softmax-gated residual backbone rather than exhaustively across all MoE variants. The evaluation is limited to the standardized tasks included in the AECC challenge benchmark.

## Why read this

Researchers building Large Audio Language Models or multi-encoder fusion architectures should read this paper for its rigorous dissection of implicit adapter merging versus explicit residual decomposition with decorrelation regularization.

## Code

- https://huggingface.co/yucongzh/implicit_fusion

## Applications

Unified audio foundation models, multi-task speech and audio understanding systems, and audio language assistants requiring robust generalization across both linguistic speech tasks and environmental acoustic classification.

## Related

- (link related pages by id as the wiki grows)
