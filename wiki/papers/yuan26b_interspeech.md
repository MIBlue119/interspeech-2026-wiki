---
id: yuan26b_interspeech
category: enhancement-separation
labels: [self-supervised, generative-model, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-232
pdf: https://www.isca-archive.org/interspeech_2026/yuan26b_interspeech.pdf
---

# DelayGSE: A Generative Speech Enhancement Framework with Delayed Text-Aware Conditioning

*Xin Yuan, Junling Lv, Zezhou Xu, Xingjun Tan, Liangliang Li, Yanqiang Lei*

[PDF](https://www.isca-archive.org/interspeech_2026/yuan26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yuan26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-232)

**Category:** `enhancement-separation` · **Labels:** `self-supervised`, `generative-model`, `robustness-noise`

**TL;DR** — DelayGSE is a text-aware generative speech enhancement framework that models multi-codebook discrete tokens in a delayed manner to suppress speech-like hallucinations. It achieves a 15.8% relative word error rate reduction while maintaining state-of-the-art perceptual quality across denoising, dereverberation, and superresolution tasks.

## Key contributions

- A delay-based text-aware generative speech enhancement architecture that enforces a semantic-before-acoustic generation order to mitigate hallucinations.
- An incremental contribution strategy to estimate RVQ layer importance for calculating weighted cross-entropy loss weights.
- A unified generative model supporting denoising, dereverberation, and 44.1 kHz audio superresolution within a single framework.
- Optional inference-time text conditioning that handles extremely low-SNR and highly distorted conditions.

## Problem

Recent generative speech enhancement approaches utilizing diffusion models or large language models generate high perceptual quality but frequently suffer from speech-like hallucinations under low-SNR or transient noise, producing fluent yet semantically incorrect outputs. Prior continuous diffusion models (such as StoRM and FlowSE) struggle with reverberation consistency, while discrete token models (such as LLaSE-G1) exhibit severe semantic degradation and inflated word error rates (WER). These limitations restrict the reliability of generative speech enhancement in real-world communication systems where intelligibility and lexical accuracy are paramount.

## Method

DelayGSE builds upon an autoregressive Transformer decoder initialized from Qwen 2.5 (0.5B parameters). Degraded 16 kHz waveforms are processed by a 4-layer Conformer STFT acoustic encoder and a pretrained frozen Whisper v3 large semantic encoder to produce acoustic conditioning features A and semantic features S. The target clean audio is quantized using the 44.1 kHz Descript Audio Codec (DAC) into 9 residual vector quantization (RVQ) codebooks.

The framework incorporates two distinct delay mechanisms: (1) codebook-level delay, adopting a stride-1 offset across RVQ layers to condition higher codebooks on lower ones, and (2) text-first multi-task delay, where text tokens are generated first and speech tokens are delayed by k=5 steps to enforce a semantic-before-acoustic generation order. The model is trained using a multi-task cross-entropy loss combining text prediction and importance-weighted acoustic token predictions.

The loss weights for the RVQ codebooks are derived via an incremental contribution strategy computed across 100,000 sampled audio clips, measuring performance improvements when preserving the first l layers while randomizing subsequent ones. The resulting normalized weights assigned to the 9 codebooks are [0.30, 0.13, 0.12, 0.10, 0.08, 0.09, 0.09, 0.06, 0.03], with the text loss weight set to 0.3. Acoustic conditioning is integrated via embedding concatenation, and semantic conditioning via cross-attention.

## Experimental setup

The model was trained on over 30,000 hours of clean speech (combining 165.4h Chinese, 291.6h HiFi-TTS, 585h LibriTTS-R, and 29,250h cleaned in-house Chinese data), 589 hours of noise data (WHAM, FSD50K, and in-house conference recordings), and 700,000 simulated room impulse responses. Evaluation datasets included DNS Challenge, VCTK-DEMAND, URGENT 2025 (Chinese-English subset), and an internal meeting-room dataset of 258 close and distant recordings (up to 8m). Baselines comprise a GAN-based CMGAN-style model, StoRM, FlowSE, and LLaSE-G1. Evaluation metrics consist of DNSMOS P.808 for perceptual quality, FireRedASR for word error rate (WER), and speaker embedding cosine similarity (SIM). Training used Adam with 5e-4 learning rate, 5,000 warmup steps, cosine decay, and 300,000 steps.

## Results

DelayGSE variants consistently outperform diffusion and LLM baselines across metrics. On internal test sets, the importance-weighted model with text supervision (DGSE-IW+TG) achieves a DNSMOS of 4.034 and drastically cuts the WER down to 0.043 compared to the noisy input WER of 0.041 (and GAN baseline of 0.096, LLaSE-G1 of 0.411). Ablations show that importance-aware weighting (DGSE-IW) improves perceptual quality and speaker similarity over equal weighting (DGSE-EW), while delayed text-aware supervision (DGSE-IW+T) yields a 15.8% relative WER reduction over DGSE-IW. Ground-truth text conditioning at inference (DGSE-IW+TG) yields a 33.1% relative WER reduction, establishing an intelligibility upper bound under extreme degradation.

| System | Internal (MOS) | Internal (WER) | Internal (SIM) | URGENT 2025 EN (WER) | URGENT 2025 ZH (WER) |
|---|---|---|---|---|---|
| Noise | 2.484 | 0.041 | 0.347 | 0.180 | 0.131 |
| GAN-based | 3.639 | 0.096 | 0.192 | 0.286 | 0.513 |
| StoRM | 3.353 | 0.724 | 0.131 | 0.371 | 0.572 |
| FlowSE | 3.255 | 0.147 | 0.244 | 0.334 | 0.305 |
| LLaSE-G1 | 3.817 | 0.411 | 0.250 | 0.353 | 0.507 |
| DelayGSE (DGSE-IW+TG) | 4.034 | 0.043 | 0.323 | 0.153 | 0.104 |

## Limitations

The evaluation is restricted to simulated acoustic environments and specific public/internal benchmarks, potentially leaving out rare domain shifts. The framework relies on a frozen large Whisper encoder and a 0.5B LLM backbone, imposing significant inference-time compute overhead compared to traditional lightweight discriminative or GAN-based enhancements. Multilingual capabilities are currently validated primarily on English and Chinese.

## Why read this

Researchers and engineers working on generative speech enhancement or audio language models should read this paper to see how combining codebook-level delays with semantic-first text conditioning effectively prevents generative hallucinations without sacrificing high perceptual fidelity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time communication systems, smart conferencing hardware, and hearing assistance devices requiring high intelligibility and natural audio restoration under severe ambient noise and reverberation.

## Institutions / 機構

Guangzhou Shiyuan Electronic Technology Company Limited, Shanghai University of Finance and Economics

## Related

- (link related pages by id as the wiki grows)
