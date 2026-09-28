---
id: choi26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-698
pdf: https://www.isca-archive.org/interspeech_2026/choi26_interspeech.pdf
---

# Systematic PTQ Study of Integer and Floating-Point Formats for On-Device Whisper ASR

*Woosuk Choi, Dohyeon Lee, Taehyung Kim, Hyukjun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/choi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-698)

**TL;DR** — A systematic post-training quantization study of Whisper ASR models across 80+ configurations reveals that activation bit-width is the dominant accuracy factor, and that NVFP4 W4A16 achieves near-lossless compression (within 0.07% of full-precision WER at 6.4x reduction).

## Key contributions

- Conducted the first systematic PTQ sweep across integer (INT8/4/3) and floating-point (FP8/4/NVFP4/MXFP4) regimes specifically targeting encoder-decoder ASR (Whisper).
- Established that activation bit-width is the primary accuracy bottleneck: reducing activations from 16-bit to 8-bit incurs a 1-3% absolute WER penalty, whereas INT16 and FP16 activations yield indistinguishable accuracy.
- Showed that NVFP4 W4A16 delivers near-lossless performance (0.07% WER gap on base.en) at 6.4x compression, making floating-point activation paths highly attractive due to the superior area-efficiency of FP multipliers.
- Identified that MXFP4 suffers severe degradation under standard PTQ due to E8M0 power-of-two scale coarseness, requiring algorithmic correction for ASR.
- Provided a Pareto analysis and six practical deployment guidelines spanning memory budgets from 20 to 80 MB.

## Problem

Deploying transformer-based ASR models like Whisper on edge and mobile devices is constrained by memory footprints ranging from 39M to 1.5B parameters. While post-training quantization (PTQ) techniques such as GPTQ, AWQ, and ultra-low-precision floating-point formats like NVFP4 and MXFP4 have been extensively studied for decoder-only LLMs, their transferability to encoder-decoder architectures with mel-spectrogram inputs and strong activation outliers remains unverified. Furthermore, mobile NPUs predominantly rely on INT8/INT16 despite floating-point multipliers occupying significantly less chip area, leaving the optimal balance between integer and floating-point formats unaddressed for speech models.

## Method

The study evaluates Whisper tiny.en (39M params, 4+4 layers, 384-dim) and base.en (74M params, 6+6 layers, 512-dim). Quantization is applied to all linear layers (self-attention q/k/v/out projections, cross-attention, and FFN fc1/fc2 blocks), with Q/K/V projection outputs additionally quantized to simulate low-precision KV-cache. The authors use FakeQuant PTQ (injecting clipping and rounding error into the forward pass while maintaining FP32 arithmetic) to ensure hardware-agnostic evaluation, and adopt SmoothQuant as a format-agnostic preprocessing method for joint weight-activation outlier mitigation.

Integer formats employ symmetric weight quantization ($s = \max(|x|)/q_{\max}$) and asymmetric activation quantization with a zero-point $z$. Floating-point evaluations cover FP8-E4M3, single-stage FP4, NVFP4 (utilizing global FP32 tensor scales and per-block FP8-E4M3 scales $s_B$, yielding about 7 distinct levels per octave), and MXFP4 (using power-of-two E8M0 block scales $s_B = 2^{e_j}$). Model sizes are analytically tracked based on bit-widths and scale overheads across group sizes ranging from $G=4$ to $G=128$.

Inference uses deterministic beam decoding (beam size 3, do_sample=False) on LibriSpeech evaluation splits. The key design choices—such as prioritizing 16-bit activation preservation (W4A16) and choosing NVFP4 over MXFP4—were driven by the empirical observation that activation precision dominates transformer ASR performance and that fixed E8M0 power-of-two scales misalign with Whisper's weight distribution gaps.

## Experimental setup

Evaluated on the LibriSpeech corpus, using 400 calibration samples from the training splits and all samples from test-clean and test-other for evaluation. Models tested are Whisper tiny.en and base.en. Compared across 80+ configurations covering INT8/4/3, FP8, FP4, NVFP4, and MXFP4 with varying group sizes ($G=4$ to $128$). Metrics reported are Word Error Rate (WER %) alongside estimated model size in megabytes, implemented using PyTorch 2.4.1 on NVIDIA RTX 3080/4090 GPUs.

## Results

For 8-bit quantization, SmoothQuant-enabled INT8 and FP8 recover strongly, with INT8+SQ achieving 4.64% WER on base.en compared to the 4.81% FP32 baseline. At 4-bit, activation bit-width dominates: W4A16 configuration consistently outperforms W4A8 and W4A4, with INT16 and FP16 activation paths yielding nearly identical accuracy. Specifically, base.en NVFP4 W4A16 at $G=16$ achieves 4.88% WER (within 0.07% of full precision) at 6.4x compression (44.1 MB). 

Conversely, MXFP4 degrades severely under standard PTQ, registering 38%–94% WER for tiny.en and 12%–24% for base.en due to E8M0 scale coarseness. On noisy speech (test-other), quantization performance gaps compress to ~0.1 pp as the high baseline absorbs quantization error, but format rankings are fully preserved.

| System / Condition | Size (MB) | test-clean WER (%) |
|---|---|---|
| base.en (FP32 baseline) | 282.4 | 4.81 |
| base.en (INT8 + SmoothQuant) | 70.8 | 4.64 |
| base.en (NVFP4 W4A16, b16) | 44.12 | 4.88 |
| base.en (INT4 W4A16, g32) | 39.71 | 4.97 |
| tiny.en (FP32 baseline) | 145.7 | 5.88 |
| tiny.en (NVFP4 W4A16, b8) | 27.32 | 6.22 |

## Limitations

The study is limited to smaller Whisper variants (tiny.en and base.en) and leaves larger variants (small, medium, large) for future work. It relies on FakeQuant simulation rather than deploying kernels on physical NPUs, omits real-latency measurements, and leaves ultra-low-precision INT3 dependent on quantization-aware training (QAT) since PTQ collapses at 3-bit.

## Why read this

Speech and ML engineers designing or deploying speech foundation models on resource-constrained edge hardware should read this to understand why activation bit-width trumps weight precision and how to select optimal FP4/INT4 configurations without sacrificing accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device speech recognition, mobile voice assistants, edge transcription devices, and hearing aids.

## Related

- (link related pages by id as the wiki grows)
