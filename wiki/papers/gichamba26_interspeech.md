---
id: gichamba26_interspeech
category: speech-coding
labels: [generative-model]
institutions: ["Carnegie Mellon University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3493
pdf: https://www.isca-archive.org/interspeech_2026/gichamba26_interspeech.pdf
---

# Probing Low Frame Rate Degradation in Neural Audio Codecs

*Alex Gichamba, Moise Busogi*

[PDF](https://www.isca-archive.org/interspeech_2026/gichamba26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gichamba26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3493)

**Category:** `speech-coding` · **Labels:** `generative-model`

**TL;DR** — A controlled ablation reveals that the quality cliff in low frame rate neural audio codecs is caused by a training misconfiguration (fixed clip duration starving the decoder of context) rather than phonemic collisions or codebook saturation, enabling intelligible speech down to 1.6 Hz (192 bps).

## Key contributions

- Disproves the prevailing hypothesis that phonemic collisions set a fundamental lower bound on neural audio codec frame rates.
- Proves that codebook saturation does not limit low frame rate codec performance, with utilization remaining above 98.7% down to 6.25 Hz.
- Identifies training sequence length (fixed clip duration) as the root cause of the 6.25 Hz quality cliff, where decoders starved of inter-token context fail at inference.
- Demonstrates smooth degradation of word error rate and intelligibility down to ultra-low frame rates of 3.125 Hz and 1.6 Hz by matching training sequence lengths ($K=19$ tokens).

## Problem

Neural audio codecs compress waveforms into discrete tokens acting as bridges for autoregressive speech synthesis, where lowering the frame rate linearly reduces downstream generation costs and latency. Prior work observed a severe quality cliff around 6.25 Hz and hypothesized that phonemic collisions—where multiple phonemes are compressed into a single long frame—set a fundamental lower bound on codec frame rates. This led researchers to develop increasingly complex architectural solutions such as dynamic frame rate allocations, transformer bottlenecks, and split-RVQ designs. Understanding whether this failure is intrinsic to low frame rates or merely an artifact of training methodology is critical for efficient speech generation pipeline design.

## Method

The study uses the 16 kHz Descript Audio Codec (DAC) architecture as a testbed, featuring an encoder of strided convolutional blocks with dilated residual units and Snake activations, and a mirrored transposed convolutional decoder. Residual Vector Quantization (RVQ) is configured with $n_q = 12$ levels and a codebook size of $|V| = 1024$, keeping bitrate as a pure function of frame rate ($R = 120 \cdot fr$ bps). The core investigation isolates the training recipe by contrasting the standard fixed clip duration ($T_{\text{clip}} = 0.38$ seconds, which yields as few as $K=2$ tokens per example at 6.25 Hz) against a matched token sequence length protocol ($K = 19$ tokens per clip, satisfying $T_{\text{clip}} = 19 / fr$).

By matching token sequence lengths across all frame rates during training, the decoder consistently learns inter-token coherence and multi-token transition dynamics. This simple protocol adjustment requires no architectural modifications, transformer bottlenecks, or auxiliary losses. It allows the evaluation of models pushed down to extreme operational boundaries of 3.125 Hz (375 bps) and 1.6 Hz (192 bps), ensuring the decoder encounters token sequence distributions during training that match the inference-time generation length requirements.

## Experimental setup

All ablation models are trained on LibriSpeech train-clean-100 (16 kHz English speech) for 100,000 iterations using a single NVIDIA H100-80 GPU and the Adam optimizer with standard DAC learning rate schedules. Reference published models (DAC-16k, DAC-24k, BigCodec, Mimi, SNAC, WavTokenizer, and Qwen3-TTS Tokenizer) are evaluated without retraining. Evaluation metrics on LibriSpeech test-clean comprise Word Error Rate (WER) using MMS-1B, Short-Time Objective Intelligibility (STOI), Mel Cepstral Distortion (MCD), Speaker Similarity (SPK-SIM via WAVLM), and pseudo Mean Opinion Scores (UTMOS).

## Results

Under the standard fixed-clip training protocol ($T_{\text{clip}} = 0.38$s), performance drops drastically at 6.25 Hz, registering a catastrophic WER of 107.40%, an STOI of 0.46, and an SPK-SIM of 0.09. However, when the training sequence length is matched ($K=19$ tokens), the 6.25 Hz model recovers significantly, achieving an STOI of 0.89, a WER of 15.37%, an MCD of 3.72, and an SPK-SIM of 0.62—nearing parity with standard 12.5 Hz baselines at half the bitrate. Extending this matched-token protocol to ultra-low rates shows that intelligible speech persists at 3.125 Hz (WER 29.36%, STOI 0.84, 375 bps) and 1.6 Hz (WER 63.22%, STOI 0.76, 192 bps), where traditional training protocols would yield total collapse.

| System / Condition | fr (Hz) | STOI $\uparrow$ | WER (%) $\downarrow$ | MCD $\downarrow$ | SPK-SIM $\uparrow$ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| DAC Baseline (Standard $T_{\text{clip}}$) | 50 | 0.97 | 5.38 | 2.00 | 0.93 |
| Standard $T_{\text{clip}}$ Variant | 6.25 | 0.46 | 107.40 | 20.17 | 0.09 |
| Matched Length ($K=19$) | 12.5 | 0.93 | 7.17 | 3.06 | 0.82 |
| Matched Length ($K=19$) | 6.25 | 0.89 | 15.37 | 3.72 | 0.62 |
| Matched Length ($K=19$) | 3.125 | 0.84 | 29.36 | 4.63 | 0.48 |
| Matched Length ($K=19$) | 1.6 | 0.76 | 63.22 | 5.67 | 0.32 |

## Limitations

The study evaluates clean, read English speech from LibriSpeech exclusively, leaving multi-speaker, noisy, singing, and highly expressive or multi-lingual data unverified. The evaluation relies heavily on model-based metrics (MMS-1B transcription for WER and WAVLM for speaker similarity) which may contain domain biases. Furthermore, ultra-low frame rate variants (1.6 Hz to 3.125 Hz) exhibit non-trivial degradation in speaker similarity and word error rates, establishing a practical capacity bound for high-fidelity reconstruction.

## Why read this

Speech LLM and TTS researchers designing low-latency autoregressive generation pipelines should read this to understand that extreme low-frame-rate codec degradation is an artifact of training data framing rather than an intrinsic theoretical limit, saving them from adopting complex architectural patches.

## Code

- https://wakandaai.github.io/low-frame-rate-codec/

## Applications

Extremely low-latency autoregressive text-to-speech, real-time spoken dialogue systems, and bandwidth-constrained speech communication.

## Institutions / 機構

Carnegie Mellon University

**Funding / 經費:** African Engineering and Technology Network, Mastercard Foundation, Advanced Cyberinfrastructure Coordination Ecosystem: Services & Support, U.S. National Science Foundation

## Related

- (link related pages by id as the wiki grows)
