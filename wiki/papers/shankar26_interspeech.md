---
id: shankar26_interspeech
category: asr
labels: [efficient-on-device, self-supervised, robustness-noise]
institutions: ["University of California, Los Angeles"]
code: https://github.com/balaji1312/gc_lora
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-822
pdf: https://www.isca-archive.org/interspeech_2026/shankar26_interspeech.pdf
---

# GC-LoRA: Gated Convolutional LoRA for Parameter-Efficient Acoustic Adaptation

*Natarajan Balaji Shankar, Zilai Wang, Kaiyuan Zhang, Mohan Shi, Abeer Alwan*

[PDF](https://www.isca-archive.org/interspeech_2026/shankar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shankar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-822)

**Category:** `asr` · **Labels:** `efficient-on-device`, `self-supervised`, `robustness-noise`

**TL;DR** — GC-LoRA introduces Gated Convolutional Low-Rank Adaptation to inject Conformer-style local acoustic modeling into frozen Transformer speech foundation models, achieving WER reductions of up to 10.9% across mismatched acoustic domains while using 46% fewer trainable parameters than standard LoRA.

## Key contributions

- Proposes GC-LoRA, a parameter-efficient adapter incorporating Conformer-style local depthwise-separable convolutions and Gated Linear Unit (GLU) mechanisms into pretrained Transformer encoders.
- Targets attention output projections (W_o) for local acoustic refinement, leaving W_q and W_v to handle global attention.
- Replaces standard Batch Normalization with Group Normalization inside the low-rank bottleneck to stabilize training on variable-length speech sequences with padded masks.
- Demonstrates robust acoustic adaptation across diverse degradation types, including child speech, narrowband telephony, environmental noise, and dialectal variations.

## Problem

Transformer-based Speech Foundation Models (SFMs) like Whisper rely entirely on global self-attention mechanisms, which struggle to capture fine-grained, localized acoustic phenomena such as shorter vocal tracts in children, frequency bandlimiting, room reverberation, and dialectal phonological shifts. While full finetuning and standard Low-Rank Adaptation (LoRA) update global weights or query-value projections, they lack a built-in local inductive bias, leading to performance degradation under domain shift. Deploying Conformer models as an alternative is often impractical due to opaque pretraining distributions and massive resource overheads, necessitating an efficient adapter that imbues existing Transformer backbones with Conformer-like local processing.

## Method

GC-LoRA embeds a Conformer-inspired convolutional module directly inside the low-rank bottleneck of a parallel adapter applied specifically to the attention output projection matrix (W_o) of Transformer layers. Given input hidden states X, the adapter first compresses features into a low-rank domain using down-projection matrix A (rank r = 8). Within this r-dimensional bottleneck, a pointwise (1x1) convolution followed by a Gated Linear Unit (GLU) acts as a dynamic feature-selection gate for local information.

Next, a 1D depthwise convolution with kernel size k = 31 captures temporal context, followed by Group Normalization and a Swish activation function. Group Normalization is chosen over Batch Normalization to ensure stability across variable-length padded audio inputs. A second pointwise convolution mixes channels before an internal residual connection anchors the bottleneck features. Finally, the tensor is up-projected via matrix B and added residually to the frozen pretrained W_o output.

Training uses the AdamW optimizer with a learning rate of 1e-4, linear decay schedule, 10% warmup ratio, batch size of 16, and is run for 10 epochs with early stopping. The architecture maintains a very lightweight footprint (447k trainable parameters for Whisper-medium), creating minimal inference latency overhead (increasing inference time from 57.6 ms to 58.9 ms with batch size 1).

## Experimental setup

Evaluated across four speech datasets: AMI Meeting Corpus (100h IHM, environmental degradation/reverberation), Switchboard-1 (260h, narrowband telephony 8 kHz upsampled to 16 kHz), CORAAL (149h total: 137h train across 6 regional subsets, 25h dev/test for African American English dialectal variation), and MyST (179h total: 133h train, 46h dev/test for children's conversational speech). Evaluated against zero-shot Whisper, full model finetuning, standard LoRA on W_q/W_v (829k params), LoRA-Output on W_o (416k params), sequential bottleneck adapters (1.72M params), Conv-LoRA (1.75M params), and MultiConv-LoRA (1.77M params). Metrics include Word Error Rate (WER) with statistical significance verified via NIST SCTK MAPSSWE (p < 0.05) on a single NVIDIA RTX A4000 GPU.

## Results

On Whisper-medium, GC-LoRA achieves superior or highly competitive WER across all evaluated domains while updating only 447k parameters: AMI (11.5 vs 11.7 standard LoRA), Switchboard (6.3 vs 6.6), CORAAL (9.9 vs 10.1), and MyST (8.6 vs 8.9). The largest relative gain is observed on Whisper-tiny with AMI, where WER drops from 27.6 to 24.6 (a 10.9% relative reduction). In ablations, replacing the gated depthwise-separable block with standard 1D convolutions (Conv-LoRA) or multi-kernel configurations (MultiConv-LoRA) results in higher parameter counts (~1.75M) without consistent performance gains, validating the specific architectural choices of GC-LoRA. GC-LoRA does not universally beat full model finetuning on every single metric, but matches or exceeds it in low-resource setups by avoiding overfitting.

| Method | Params | AMI | SWBD | CORAAL | MyST |
|---|---|---|---|---|---|
| Zero-shot | 0 | 16.4 | 17.2 | 17.0 | 13.1 |
| Full FT | 764M | 10.8 | 5.7 | 9.8 | 8.9 |
| LoRA [19] | 829k | 11.7 | 6.6 | 10.1 | 8.9 |
| LoRA-Output | 416k | 12.0 | 6.8 | 9.9 | 8.7 |
| Adapter [14] | 1.72M | 11.3 | 6.4 | 10.0 | 8.6 |
| GC-LoRA (ours) | 447k | 11.5 | 6.3 | 9.9 | 8.6 |

## Limitations

The evaluation is restricted to Whisper backbones and English-language corpora, leaving multilingual and non-English generalization untested. The method relies on fixed hyperparameters (rank r = 8, kernel size k = 31) across scales, and scaling behavior exhibits minor non-monotonic variations on larger models (e.g., large-v3) due to hyperparameter sensitivity in limited-data regimes. The representation analysis confirms attention maps become slightly more diffuse, but does not provide a direct causal proof linking attention dispersion to acoustic robustness.

## Why read this

Speech researchers and ML engineers looking to adapt Transformer speech foundation models to acoustically degraded, dialectal, or child speech domains without full finetuning will find GC-LoRA a highly efficient, structurally motivated drop-in replacement for standard LoRA.

## Code

- https://github.com/balaji1312/gc_lora

## Applications

Robust automatic speech recognition for telephony, smart toys/educational tools for children, dialect-inclusive transcription services, and distant-microphone meeting transcription systems.

## Institutions / 機構

University of California, Los Angeles

**Funding / 經費:** National Science Foundation, Institute of Education Sciences, U.S. Department of Education

## Related

- (link related pages by id as the wiki grows)
