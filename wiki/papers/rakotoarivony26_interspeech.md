---
id: rakotoarivony26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-119
pdf: https://www.isca-archive.org/interspeech_2026/rakotoarivony26_interspeech.pdf
---

# Evolution Strategy-Based Calibration for Low-Bit Quantization of Speech Models

*Lucas RAKOTOARIVONY*

[PDF](https://www.isca-archive.org/interspeech_2026/rakotoarivony26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rakotoarivony26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-119)

**TL;DR** — The paper introduces Evolution Strategy-Based Calibration (ESC), a two-step local-global optimization method for per-layer activation scaling in post-training quantization of speech models. ESC achieves lossless performance at INT8 and near-lossless performance at INT4 across diverse speech tasks, alongside an average inference speedup of 2.31×.

## Key contributions

- Formulates audio activation calibration as a joint optimization problem solved via a two-step local (MSE) and global (evolution strategy) scheme.
- Demonstrates that audio activations have unique, highly compressed or widely varying dynamic ranges compared to vision and NLP, causing standard methods to fail.
- Achieves unaltered full-precision performance under full INT8 quantization and minimal degradation under full INT4 quantization across 5 distinct speech tasks.
- Provides comprehensive evaluations combining ESC with cross-domain PTQ methods (Adaround, SmoothQuant, BRECQ, etc.) on 5 standard speech architectures.

## Problem

Standard post-training quantization (PTQ) methods developed for vision and natural language processing fail when applied to speech models due to the unique characteristics of audio activations, which can exhibit extremely large dynamic ranges or compressed distributions. Traditional calibration techniques like Max, Percentile, Entropy, and MSE produce poorly distributed quantization bins that map most values to a single integer level, resulting in catastrophic information loss under low-bit activation quantization. Because prior audio quantization research largely targeted weight-only quantization or relied on data-heavy Quantization-Aware Training (QAT), a complete integer-only quantization pipeline for general speech models remained unsolved.

## Method

The method adopts a uniform symmetric quantization scheme where scaling factor $s$ defines the clipping range $[-\beta, \beta]$ for bit width $b$. Audio activations are quantized using scale factors optimized via the proposed Evolution Strategy-Based Calibration (ESC). First, a local initialization step uses an MSE-based approach to independently optimize the activation scale $s_i$ of each layer $i$ by minimizing the reconstruction error between FP32 and quantized layer outputs.

Next, to account for cross-layer dependencies and non-smooth, non-differentiable objectives, ESC jointly refines the entire vector of per-layer scales $\mathbf{S} = \{s_1, \dots, s_N\}$ globally. It employs the Covariance Matrix Adaptation Evolution Strategy (CMA-ES) to sample candidate scale vectors from a multivariate normal distribution parameterized by mean $\mathbf{m}^{(t)}$, covariance $\mathbf{C}^{(t)}$, and step size $\sigma_t$. Each candidate is evaluated by measuring the task-specific error between quantized model output and reference targets over calibration samples.

The search distribution parameters are updated iteratively based on candidate rankings until reaching a budget $\Gamma = 100$. The final scaling vector uses the mean of the final sampling distribution rather than the single best candidate for increased robustness. Calibration uses only $n=100$ samples from the training set, applying ESC to convolutional, linear, and layer normalization operators while using Max calibration for others.

## Experimental setup

Evaluated across five tasks and datasets: Conformer on LibriSpeech (WER/CER), ECAPA on VoxCeleb (EER/minDCF), MP-SENet on VoiceBank-DEMAND (PESQ/STOI), FastSpeech 2 on LJSpeech (Mel/PostNet loss), and AST on Speech Commands V2 (Accuracy/mAP). Compared against baseline calibration methods (Max, Percentile, Entropy, MSE) and combined with PTQ methods (Adaround, NoisyQuant, DiTAS, HyQ, BRECQ, SmoothQuant, BC). Implemented in PyTorch using 100 calibration samples, CMA-ES initial step size $\sigma=0.1$, budget $\Gamma=100$, and executed on an NVIDIA RTX 3090 GPU.

## Results

In INT8 quantization, ESC consistently matches or outperforms all baselines, achieving a Conformer WER of 16.01% (vs 15.94% FP32), ECAPA EER of 0.94% (vs 0.97% FP32), and AST accuracy of 98.15% (vs 98.13% FP32). In INT4 quantization, standard methods suffer severe accuracy collapse (e.g., Max calibration yields 144.14 WER on Conformer and 3.71% accuracy on AST), whereas ESC substantially mitigates this degradation, limiting Conformer INT4 WER to 38.49% and AST INT4 accuracy to 96.41%. Furthermore, combining ESC with domain-adapted PTQ techniques yields additional gains, such as HyQ improving ECAPA EER to 8.20% and Adaround reducing FastSpeech 2 Mel loss to 83.53. INT8 models evaluated via TensorRT on an RTX 3090 deliver latency speedups ranging from 1.34× (Conformer) to 5.07× (AST) alongside major memory footprint reductions.

| System / Condition | Bits | Conformer WER (%) | ECAPA EER (%) | MP-SENet PESQ | AST Accuracy (%) |
|---|---|---|---|---|---|
| Full Precision | 32 | 15.94 | 0.97 | 2.12 | 98.13 |
| Max Calibration | 8 | 16.54 | 1.11 | 2.16 | 98.12 |
| MSE Calibration | 8 | 16.09 | 0.99 | 2.09 | 98.07 |
| ESC (Proposed) | 8 | 16.01 | 0.94 | 2.11 | 98.15 |
| Max Calibration | 4 | 144.14 | 44.40 | 1.16 | 3.71 |
| ESC (Proposed) | 4 | 38.49 | 11.28 | 2.51 | 96.41 |

## Limitations

The evaluation is restricted to 100 calibration samples and tested on five specific model architectures, leaving the efficacy on larger autoregressive speech LLMs or streaming architectures unexplored. CMA-ES introduces a higher offline calibration computation cost compared to analytical methods like Max or MSE, although inference time remains unaffected. Furthermore, hardware execution speedups were explicitly validated for INT8 via TensorRT on NVIDIA Tensor Cores, while INT4 hardware execution remains bounded by hardware support limitations.

## Why read this

Speech and ML engineers seeking to deploy fully integerized, low-bit speech models without heavy retraining will find ESC a practical, model-agnostic calibration framework that outperforms vision and NLP handovers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device and resource-constrained deployment of speech recognition, speaker verification, speech enhancement, text-to-speech, and audio classification models.

## Related

- (link related pages by id as the wiki grows)
