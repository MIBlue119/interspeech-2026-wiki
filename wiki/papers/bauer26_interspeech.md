---
id: bauer26_interspeech
category: asr
labels: [efficient-on-device, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2523
pdf: https://www.isca-archive.org/interspeech_2026/bauer26_interspeech.pdf
---

# VAD to the Bone: Ultra-Tiny Speech Activity Detection for Edge Deployment

*Stephen Bauer, Sheila Seidel, Shanza Iftikhar, Scott Veidenheimer, Gorkem Ulkar*

[PDF](https://www.isca-archive.org/interspeech_2026/bauer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bauer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2523)

**Category:** `asr` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — kiloVAD is an ultra-compact, convolutional-only voice activity detection model designed for edge deployment that achieves 0.850 AUC on AVA-Speech with just 2.1k parameters and a 200 ms causal context.

## Key contributions

- A CNN-only VAD architecture using standard Mel spectrogram features, ensuring compatibility with standard embedded toolchains and TFLM.
- A multi-objective, per-layer structured pruning strategy coupled with self-distillation that scales down to 622 parameters.
- A novel angle-aware self-distilling quantization-aware training (QAT) method that improves INT4 performance by 1-4% over standard STE QAT.
- Comprehensive causal benchmarking under a 200 ms latency constraint, addressing discrepancies caused by non-causal evaluation protocols in prior work.

## Problem

Always-on edge devices require voice activity detection (VAD) with minimal memory, latency, and compute, but existing compact models fall short due to restrictive deployment constraints. Prior architectures either rely on non-standard, unaccelerated components like learnable filterbanks (SincQDR, ResectNet, AtomicVAD), non-portable recurrent units (ResectNet), expensive trigonometric activations (AtomicVAD's GGCU), or excessively high input context windows (MarbleNet, TinyVAD, AtomicVAD at 630 ms). Furthermore, many state-of-the-art compact models artificially inflate their performance metrics by utilizing non-causal sliding-window inference with heavy overlap rather than streaming-compatible causal protocols. This leaves a gap for a truly deployment-ready, low-latency, and standard-compliant VAD.

## Method

The kiloVAD architecture processes 64-bin Mel spectrograms through a depthwise separable convolutional backbone. It incorporates a 1x1 convolutional adapter layer that projects mel features to 128 internal channels, effectively decoupling input resolution from internal channel widths to facilitate aggressive structured pruning. Temporal modeling uses depthwise separable blocks (temporal kernel 11), two 1x1 projection layers (128 -> 64 -> 64 channels), a residual block (kernel 17), and a dilated block (kernel 29, dilation 2). Instead of flattening features before classification—which ties parameter count to input length—kiloVAD applies global average pooling across the temporal dimension, allowing variable context lengths without architectural modification. Amplitude-agnostic preprocessing normalizes each mel frequency bin to zero mean and unit variance across the 21-time-step window to ensure robustness against varying microphone gains.

To compress the model, the authors employ structured pruning using torch-pruning based on L2-norm magnitude importance. Rather than a global ratio, per-layer pruning ratios are optimized via Optuna to simultaneously minimize the False Positive Rate at 95% True Positive Rate and parameter counts. Pruned models are fine-tuned for 8 epochs using self-distillation, where the unpruned model acts as a teacher minimizing cross-entropy and KL divergence between logits. For quantization, standard post-training INT8 round-to-nearest (RTN) quantization is nearly lossless. For aggressive INT4 compression, the authors introduce an angle-aware self-distilling QAT. While freezing a full-precision classification weight matrix as fixed class prototypes, the backbone weights are quantized. An align-repel objective function minimizes cosine distance between quantized feature vectors and target class prototypes while maximizing angular margins from non-target prototypes, successfully mitigating the angular errors that typically degrade ultra-low-bit quantization.

## Experimental setup

The models are trained on LibriSpeech train-clean-100 mixed with 25% clean speech, 25% synthetic wind noise at -5 dB SNR, and 50% DNS Challenge noise (-10 to 10 dB SNR) with room simulation. Training runs for 40 epochs using SGD with Nesterov momentum (0.9), weight decay 8.75e-4, a cyclic learning rate schedule peaking at 3.5e-3, and label smoothing (epsilon = 0.09). Evaluation is performed causally on AVA-Speech using frame-level AUC and best F1 scores over 10 random seeds.

## Results

Under strictly causal conditions with a 200 ms input context, the pruned kiloVAD model with 2.1k parameters achieves 0.850 AUC and 0.783 F1, matching MarbleNet's AUC while utilizing 43x fewer parameters and 3x lower latency. The full unpruned model (81.1k parameters) achieves 0.862 AUC. Extending the causal input context to 360 ms raises performance to 0.872 AUC, outperforming AtomicVAD's causal result (0.869) and TinyVAD's non-causal result (0.864) with shorter latency and standard operations.

In quantization experiments, INT8 RTN quantization retains full precision accuracy (0.861 AUC for 10k model, 0.851 AUC for 2.1k model). For INT4 quantization, standard STE QAT drops to 0.800 AUC (10k) and 0.693 AUC (2.1k), whereas the proposed angle-aware QAT recovers performance to 0.811 AUC and 0.719 AUC respectively, representing a robust 1-4% relative improvement under extreme bit-width compression.

| System / Condition | Params (K) | Input Ctx (ms) | AUC (AVA-Speech) |
|---|---|---|---|
| kiloVAD (full) | 81.1 | 200 | 0.862 |
| kiloVAD (pruned) | 2.1 | 200 | 0.850 |
| MarbleNet | 91.0 | 630 | 0.850 |
| TinyVAD | 11.6 | 630 | 0.864 |
| ResectNet | 4.5 | 40 | 0.886 |
| AtomicVAD | 0.3 | 630 | 0.869 |

## Limitations

The evaluation relies on AVA-Speech (YouTube audio clips), which may not completely capture the acoustic characteristics, background noises, and device constraints of microcontrollers deployed in physical edge hardware like IoT sensors or smart appliances. Furthermore, the per-layer pruning configuration transfer resulted in layer collapse on 2 out of 10 test seeds at extreme compression, highlighting sensitivity in hyperparameter transfer across random initializations. The model is exclusively evaluated on English-oriented or standard benchmark corpora without exploring multilingual phonetic robustness.

## Why read this

Speech and embedded ML engineers building always-on edge devices should read this paper to learn how to design a completely standard, TFLM-compatible CNN VAD that bypasses non-causal evaluation pitfalls and leverages angle-aware INT4 quantization.

## Code

- https://huggingface.co/spaces/kiloVAD-demo/

## Applications

Always-on smart speakers, wearables, hearables, and battery-powered IoT devices requiring low-latency, low-power frontend voice activity triggers.

## Institutions / 機構

Analog Devices, University of California, Los Angeles

## Related

- (link related pages by id as the wiki grows)
