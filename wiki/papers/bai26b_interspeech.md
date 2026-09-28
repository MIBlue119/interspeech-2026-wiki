---
id: bai26b_interspeech
category: speech-translation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1056
pdf: https://www.isca-archive.org/interspeech_2026/bai26b_interspeech.pdf
---

# Controllable Accent Normalization via Discrete Diffusion

*Qibing Bai, Yuhan Du, Tom Ko, Shuai Wang, Yannan Wang, Haizhou Li*

[PDF](https://www.isca-archive.org/interspeech_2026/bai26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bai26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1056)

**TL;DR** — DLM-AN is a controllable accent normalization system utilizing masked discrete diffusion over self-supervised speech tokens, achieving a word error rate (WER) of 10.64% while allowing smooth accent strength and duration control.

## Key contributions

- Proposes DLM-AN, the first accent normalization system based on masked discrete diffusion over self-supervised speech tokens.
- Introduces a Common Token Predictor (CTP) that enables smooth, interpretable accent strength control via threshold-based source token reuse.
- Incorporates a flow-matching Duration Ratio Predictor (DP) to explicitly control and scale total output duration.
- Achieves state-of-the-art content preservation with the lowest WER among compared systems on multi-accent English evaluation.

## Problem

Traditional accent normalization (AN) methods perform a one-shot full accent shift without offering users a controllable knob to adjust accent retention or strength, which is vital for language learning and multimedia dubbing. Prior reference-based and TTS-guided systems suffer from quality bottlenecks due to voice cloning errors, parallel data constraints, or fixed duration frameworks. Meanwhile, existing token-based models like TokAN and CosyAccent lack fine-grained accent strength controllability, and continuous diffusion alternatives are limited to frame-level adjustments without rhythm flexibility.

## Method

DLM-AN extends the LLaDA masked discrete diffusion language model to speech tokens. The architecture consists of an SSL tokenizer using layer-22 WavLM-large representations quantized with a 1024-cluster K-Means codebook, followed by a Transformer token encoder equipped with CTC-based phonemic guidance to produce content representations. The content features feed into three modules: a Common Token Predictor (CTP), a Duration Ratio Predictor (DP), and a bidirectional Transformer DLM decoder without causal masking. The CTP is formulated as a sequence-tagging binary classification problem trained via binary cross-entropy on longest common subsequence (LCS) labels derived from paired source-target tokens, using center-mode alignment for duration mismatches. High-confidence CTP tokens above threshold tau can be reused to initialize the reverse diffusion process, trading off accent normalization against speaker identity retention. The DP uses a DiT backbone trained via conditional flow matching to estimate the global duration ratio (target duration / source duration).

The training pipeline follows a two-stage schedule: pretraining on the English subset of Emilia (Emilia-EN) using BART-style token corruption, and fine-tuning on augmented LibriTTS-R and extended L2-ARCTIC data. The joint-training objective combines the MDLM masked-token cross-entropy loss, CTP binary cross-entropy, DP flow-matching loss, and CTC phoneme guidance loss with weights beta_1=1.0, beta_2=1.0, and beta_3=0.2. During inference, greedy sampling is performed over 32 steps with classifier-free guidance (CFG strength w_DLM = 1.0). Finally, a flow-matching speech synthesizer paired with a HiFTNet vocoder generates the target Mel-spectrograms and waveforms, conditioned on speaker embeddings extracted via an accent-robust Resemblyzer.

## Experimental setup

Evaluated on multi-accent English data including the extended L2-ARCTIC corpus covering 7 accents (Arabic, Chinese, Hindi, Korean, Spanish, Vietnamese, and native American English, 80 sentences) and augmented LibriTTS-R. Baselines include TokAN-1, TokAN-2, CosyAccent-1, and CosyAccent-2. Metrics comprise Word Error Rate (WER), UTMOSv2 for naturalness, Speaker Encoding Cosine Similarity (SECS) for timbre, and phonetic posteriorgram distance (Delta PPG) for accentedness reduction. Models utilize WavLM-large, 32 sampling steps, and were compared against free-duration and source-duration-preserved configurations.

## Results

DLM-AN-1 (free duration) achieves the lowest ACT score of 22.94 and a superior WER of 11.19%, outperforming TokAN-1 (13.82%) and CosyAccent-1 (12.40%). Under source-duration-preserved settings, DLM-AN-2 (tau=1.0) achieves the best WER across all systems at 10.64% with a Delta PPG of 0.2773. Varying the CTP threshold tau from 1.0 to 0.0 progressively increases Speaker Embedding Cosine Similarity (SECS from 0.8521 to 0.8646) and Speaker Similarity (SIM from -0.020 to 0.208), while trading off WER (10.64% to 14.94%). In duration scaling tests under extreme compression (ratio = 0.5), DLM-AN maintains robust performance compared to TokAN, which degrades severely.

| System | NAT (↑) | ACT (↓) | SIM (↑) | WER (% ↓) | UTMOS (↑) | SECS (↑) | ΔPPG (↓) |
|---|---|---|---|---|---|---|---|
| Source | 58.36 | 48.46 | - | 15.86 | 2.80 | - | 0.5097 |
| TokAN-1 [19] | 63.85 | 23.58 | -0.082 | 13.82 | 3.07 | 0.8495 | 0.2884 |
| CosyAccent-1 [21] | 61.12 | 25.75 | -0.071 | 12.40 | 2.99 | 0.8294 | 0.2736 |
| DLM-AN-1 | 62.20 | 22.94 | -0.133 | 11.19 | 3.05 | 0.8385 | 0.2811 |
| DLM-AN-2 (τ=1.0) | 59.50 | 27.90 | -0.020 | 10.64 | 2.93 | 0.8521 | 0.2773 |
| DLM-AN-2 (τ=0.0) | 56.41 | 38.37 | 0.208 | 14.94 | 2.86 | 0.8646 | 0.4479 |

## Limitations

The current pipeline relies on a recognition-based token encoder for phoneme supervision, leading to error propagation on heavily accented inputs. The SSL tokenizer and speech synthesizer are trained exclusively on native data, which limits reconstruction quality for extreme L2 accents. Additionally, unmasking may occasionally introduce repeated pronunciation artifacts.

## Why read this

Speech researchers and engineers working on controllable voice conversion and generative speech models should read this to learn how masked discrete diffusion and token-reuse strategies can enable fine-grained, interpretable attribute control without retraining.

## Code

- https://P1ping.github.io/dlman-demo/

## Applications

Pronunciation training for language learners, authentic multimedia dubbing, and personalized text-to-speech systems with adjustable accent retention.

## Related

- (link related pages by id as the wiki grows)
