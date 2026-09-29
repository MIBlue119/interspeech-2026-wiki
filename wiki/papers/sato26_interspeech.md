---
id: sato26_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2997
pdf: https://www.isca-archive.org/interspeech_2026/sato26_interspeech.pdf
---

# Latency Controllable Speech Enhancement

*Hiroshi Sato, Takafumi Moriya, Tsubasa Ochiai, Marc Delcroix*

[PDF](https://www.isca-archive.org/interspeech_2026/sato26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sato26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2997)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — The paper introduces Latency-Controllable Speech Enhancement, a framework that uses lightweight Latency Control Adapters (LCAs) on a shared backbone to support multiple streaming latency budgets in a single model. This approach reduces stored parameters by 76% compared to maintaining separate models while improving average speech enhancement quality through intra-batch multi-latency training.

## Key contributions

- Proposes Latency-Controllable Speech Enhancement, allowing a single streaming SE model to switch between arbitrary latency budgets at inference time without reloading.
- Develops the Lookahead Module (LAM) using stack-dilated 1D convolutional blocks (kernel size 3, dilations 2^0 to 2^5) with depthwise-separable convolutions to efficiently incorporate future context.
- Introduces Latency Control Adapters (LCAs) coupled with intra-batch multi-latency training, which averages loss across all operating modes during optimization to encourage cross-latency knowledge sharing.
- Demonstrates parameter storage reduction from 104.1M (multi-model baseline) down to 16.5M–24.5M for seven latency modes, while outperforming per-latency models by up to 0.53 dB SDR on average.

## Problem

Streaming speech enhancement demands strict latency budgets ranging from a few milliseconds for hearing devices to hundreds of milliseconds for telephony. Most neural SE architectures are trained for a single, fixed lookahead, meaning deployment across diverse applications requires maintaining multiple independent models, drastically increasing development and validation complexity. While longer lookahead improves perceptual quality and speech metrics by utilizing future context, prior systems cannot dynamically trade off latency versus performance at runtime without heavy parameter duplication.

## Method

The system builds upon an encoder–separator–decoder backbone, specifically adopting a time-domain Conv-TasNet architecture (B=256, R=4, X=8, H=512, P=3). The baseline model utilizes either a standard-latency encoder (kernel/stride 320/160, yielding a 20 ms base latency τ_enc) or an ultra-low latency encoder (kernel/stride 80/40, yielding a 5 ms base latency τ_enc). To achieve latency control, a lightweight Lookahead Module (LAM) bank comprising 6 dilated 1D convolutional blocks is inserted after the 4th block of the separator. Each adapter in the bank corresponds to a specific binary pattern of causal versus non-causal configurations, allowing 7 distinct lookahead frames T_la ∈ {0, 1, 3, 7, 15, 31, 63}.

During training, intra-batch multi-latency training is employed: every mini-batch passes through all K adapters simultaneously, and the negative SNR loss is averaged across all K enhanced outputs to jointly optimize the shared backbone and adapter weights. At inference time, the system switches its effective lookahead instantly by routing features through the specific LCA corresponding to the desired budget. Two parameter sharing schemes are evaluated: (C-1) shares parameters across causal blocks and non-causal blocks independently, fixing total LCA parameters to 2 * M regardless of K; and (C-2) maintains separate weights per adapter for maximum performance.

## Experimental setup

Experiments use simulated noisy mixtures generated from clean speech in LibriSpeech and noise clips from the DNS4 challenge dataset sampled at 16 kHz, split into 50k training, 3k dev, and 2k evaluation mixtures with SNR uniformly sampled from [0, 20] dB. Systems are evaluated against a causal Conv-TasNet, non-causal Conv-TasNet, and a multi-model baseline of separate LAM-equipped models (B-1). Evaluation metrics are Signal-to-Distortion Ratio (SDR) and DNSMOS P.835 OVRL, alongside computational efficiency measured in MACs (G/s) and total parameter count.

## Results

Under standard latency settings (τ_enc = 20 ms), the unshared LCA model (C-2) achieves an average SDR gain of 0.13 dB over the 7 separate models of the multi-model baseline (B-1) while maintaining constant inference MACs (1.46 G/s). In the ultra-low latency setting (τ_enc = 5 ms), intra-batch multi-latency training yields an even larger average SDR improvement of 0.53 dB over the multi-model baseline, and improves SDR by 0.45 dB over the strict causal baseline (A-1) at the lowest latency point.

Ablation studies confirm that freezing the shared backbone and training only the LCA degrades performance (dropping SDR from 17.43 to 16.77 at 310 ms lookahead), and replacing intra-batch multi-latency training with random single-adapter selection similarly degrades SDR, confirming the necessity of joint optimization and cross-latency distillation.

| Systems | Add. Lookahead (10 ms) | Add. Lookahead (70 ms) | Add. Lookahead (310 ms) |
|---|---|---|---|
| (C-2) LCA (no sharing) | 17.03 dB | 17.30 dB | 17.43 dB |
| w/o joint training of backbone | 16.67 dB | 16.73 dB | 16.77 dB |
| w/o causal blocks in LCA | 16.75 dB | 17.00 dB | 17.11 dB |
| w/o intra-batch multi-latency training | 16.80 dB | 17.08 dB | 17.22 dB |

## Limitations

The evaluation is restricted to simulated single-channel additive noise mixtures using LibriSpeech and DNS4 data, omitting real-world acoustic reverberation, multi-microphone arrays, and complex hardware scheduling jitter. The method requires tuning binary causality patterns and maintaining adapter banks which, while lightweight, still add a minor parameter footprint and require multi-pass mini-batch processing during training. Scope is limited to Conv-TasNet style time-domain separators, and effectiveness on alternative time-frequency domain architectures or streaming mask-based transformers remains to be validated.

## Why read this

Speech and ML engineers building real-time audio front-ends for devices with shifting latency constraints should read this to learn how to deploy a single unified enhancement model rather than maintaining multiple full model checkpoints. It provides a concrete recipe for multi-latency adapter design and joint intra-batch training that improves performance beyond dedicated single-latency models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time teleconferencing apps, VoIP clients, hearing aids, and voice-controlled IoT devices that require dynamic adjustment of audio processing delay depending on network conditions or hardware constraints.

## Institutions / 機構

NTT

## Related

- (link related pages by id as the wiki grows)
