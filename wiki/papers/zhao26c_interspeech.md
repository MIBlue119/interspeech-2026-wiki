---
id: zhao26c_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-601
pdf: https://www.isca-archive.org/interspeech_2026/zhao26c_interspeech.pdf
---

# HALO: Half-Frame-Rate Adaptive Learnable Operator for Lightweight STFT-Based Speech Enhancement

*Jiadong Zhao, Dahan Wang, Yu Sun, Leyan Yang, Xiaobin Rong, Shiruo Sun, Yuxiang Hu, Jing Lu*

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-601)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — HALO is a causal plug-in module that halves the internal frame rate of STFT-based speech enhancement backbones via adaptive dynamic convolutions, recovering compute budget for channel widening and improving PESQ on DNS3 by up to 0.1.

## Key contributions

- Proposes a causal plug-in framework (HALO) that reduces overlap-induced temporal redundancy in STFT-based speech enhancement without altering the input/output STFT/ISTFT grid or adding algorithmic latency.
- Implements adaptive learnable rate-reduction and restoration operators using lightweight dynamic convolutions with T-F-dependent gating functions instead of hard frame decimation.
- Demonstrates consistent performance gains across diverse lightweight enhancement backbones (GTCRN, DPCRN, LiSenNet, UL-UNAS) under matched computational complexity on the DNS3 dataset.

## Problem

Traditional STFT-based speech enhancement models process heavily overlapping analysis frames (50% to 75% overlap) to prevent boundary artifacts during overlap-add synthesis, introducing massive temporal redundancy. Prior lightweight network designs like DPCRN, GTCRN, LiSenNet, and UL-UNAS focus strictly on per-frame computation reduction while leaving this underlying STFT frame-rate redundancy unaddressed. Directly dropping frames or using non-adaptive multi-frame prediction degrades speech quality because adjacent frames contain vital, rapidly changing temporal details that hard-decimation destroys.

## Method

HALO operates as a pre- and post-backbone sandwich wrapper around any standard STFT-based speech enhancement backbone without modifying its per-frame interface or future-frame lookahead. Given a real/imaginary complex spectrum representation $X \in \mathbb{R}^{2 \times T \times F}$, the rate-reduction operator $D(\cdot)$ concatenates adjacent time frames on the original grid into a 4-channel vector per frequency bin, $X_\tilde{}(\cdot, l, f) = \text{cat}(X(:, 2l-1, f), X(:, 2l, f)) \in \mathbb{R}^4$. This reduced sequence is mapped to half-rate features via a dynamic convolution bank of $K=5$ kernels ($W_k \in \mathbb{R}^{2 \times 4}$) combined with T-F-dependent mixture weights $\alpha_k(l, f)$ produced by a lightweight gating network $g_d(\cdot)$ consisting of two point-wise convolutions, a PReLU, and a softmax.

The backbone $f_\theta(\cdot)$ processes this halved temporal sequence ($T/2$ frames). Subsequently, the restoration operator $U(\cdot)$ applies a structural counterpart architecture using a bank of $K=5$ restoration kernels ($V_k \in \mathbb{R}^{4 \times 2}$) and gating weights $\beta_k(l, f)$ to expand each half-rate frame back into two consecutive full-rate frames on the original grid. Training utilizes an Adam optimizer starting at learning rate 0.001 (halved if validation loss stalls for 10 epochs), a batch size of 8, and the standard loss function inherited from GTCRN.

## Experimental setup

Evaluated primarily on the 3rd Deep Noise Suppression (DNS3) dataset and the DiDiSpeech Mandarin corpus, comprising 72,000 training pairs (10 seconds each, 16 kHz sampling rate) mixed with RIRs and noise at SNR ranging from -5 to 15 dB, plus 840 validation and 800 test pairs. Baselines include GTCRN, DPCRN (ultralight, light, middle, large), LiSenNet, and UL-UNAS. Metrics include PESQ, ESTOI, SI-SNR, and DNSMOS P.835 (OVRL, SIG, BAK). STFT uses a 32 ms square-root Hann window, 16 ms hop length (50% overlap), and 512-point FFT.

## Results

On the DNS3 test set with GTCRN, baseline GTCRN achieves 2.101 PESQ, 0.754 ESTOI, and 11.390 dB SI-SNR at 33.83M MAC/s. When HALO is integrated with channel widening to match compute (46.87k params, 32.85M MAC/s), PESQ rises to 2.198 (+0.097), ESTOI to 0.769, and SI-SNR to 11.900 dB (+0.51 dB). Ablating adaptive gating and learnable operators drops PESQ down to 2.118 (FixedRed + FixedRest) and 2.104 (Decimate + FixedRest). Across larger backbones like DPCRN-large and UL-UNAS, the performance gains diminish because larger networks already possess sufficient capacity where redundant frame compute is less of a bottleneck.

| System | Params (k) | MAC/s (M) | PESQ | ESTOI | SI-SNR (dB) |
|---|---|---|---|---|---|
| Noisy Input | - | - | 1.406 | 0.669 | 5.610 |
| GTCRN (Baseline) | 23.67 | 33.83 | 2.101 | 0.754 | 11.390 |
| GTCRN + HALO (w/ widening) | 46.87 | 32.85 | 2.198 | 0.769 | 11.900 |
| DPCRN-ultralight | 27.92 | 31.80 | 2.025 | 0.750 | 11.070 |
| DPCRN-ultralight + HALO | 55.03 | 31.34 | 2.212 | 0.771 | 11.920 |
| UL-UNAS + HALO | 205.16 | 31.26 | 2.261 | 0.777 | 12.240 |

## Limitations

HALO reduces average MAC/s by halving the internal backbone sequence length, but it does not reduce peak per-step computation because the restoration operator synthesizes two frames within a single inference step. The marginal benefits shrink when applied to already over-parameterized backbones or models heavily optimized via neural architecture search (e.g., UL-UNAS). Evaluation is limited to simulated acoustic environments using DNS3 and DiDiSpeech datasets without real-world hardware latency benchmarks.

## Why read this

Speech and ML researchers building edge-deployable real-time speech enhancement models should read this to learn how to exploit STFT overlap-induced temporal redundancy as a orthogonal optimization dimension to network architecture search and channel pruning.

## Code

- https://github.com/dddaniel-z/HALO/

## Applications

Real-time edge speech enhancement for mobile phones, hearables, communication platforms, and hearing aids.

## Institutions / 機構

Nanjing University, Horizon Robotics, Samsung Electronics

**Funding / 經費:** National Natural Science Foundation of China, AI & AI for Science Project of Nanjing University

## Related

- (link related pages by id as the wiki grows)
