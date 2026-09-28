---
id: chao26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3197
pdf: https://www.isca-archive.org/interspeech_2026/chao26_interspeech.pdf
---

# RT-SEMamba: Real-Time Speech Enhancement Mamba via Progressive Knowledge Distillation

[PDF](https://www.isca-archive.org/interspeech_2026/chao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3197)

**TL;DR** — RT-SEMamba is a causal, real-time speech enhancement model using time-frequency Mamba blocks and progressive knowledge distillation, achieving 3.18 PESQ in a 1-layer student variant with a 25 ms algorithmic latency.

## Problem

Standard Transformer- and diffusion-based speech enhancement models often rely on non-future contexts or growing key-value caches that complicate low-latency, long-form streaming deployments. While Mamba-based sequence models offer linear complexity with fixed-size recurrent states, existing implementations primarily focus on non-causal or offline evaluation settings. Bridging this gap is crucial for edge devices and interactive audio applications like hearing aids and AR/VR communications that require strict real-time factors and artifact-free outputs.

## Method

The architecture operates in the complex STFT domain, taking magnitude and phase to predict enhanced complex spectra via causal STFT/iSTFT windows with an algorithmic latency bounded at 25 ms. Temporal convolutions use asymmetric causal padding, InstanceNorm2d is replaced by causal channel-wise LayerNorm, and MLPs are inserted after each cTF-Mamba block to boost per-frame modeling. Time Mamba is constrained to be unidirectional over time, while frequency Mamba remains bidirectional. To reduce compute, an 8-layer causal TFMamba teacher is compressed into a 1-layer or 2-layer student using a progressive knowledge distillation scheme that jointly minimizes output-level losses (magnitude, phase, complex) and normalized intermediate feature matching losses.

## Results

Evaluated on the VCTK-DEMAND dataset containing 11,572 training pairs and 824 test utterances across multiple SNR levels. The 8-layer teacher achieves 3.32 PESQ, 4.64 CSIG, 3.72 CBAK, 4.08 COVL, and 0.95 STOI with an RTF of 0.29 on an NVIDIA RTX 5090. A naive 1-layer baseline achieves 3.06 PESQ, whereas the distilled 1-layer student (8->1) improves PESQ to 3.18 while preserving the same steady-state RTF of 0.11, delivering a 2.75x speedup over the teacher. A distilled 2-layer student (8->2) reaches 3.22 PESQ with an RTF of 0.13.

## Code

- https://github.com/RoyChao19477/RT-SEMamba

## Applications

Interactive audio applications such as hearing aids, cochlear implants, AR/VR communications, and live teleconferencing requiring low-latency on-device streaming.

## Related

- (link related pages by id as the wiki grows)
