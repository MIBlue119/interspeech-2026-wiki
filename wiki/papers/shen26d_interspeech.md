---
id: shen26d_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2414
pdf: https://www.isca-archive.org/interspeech_2026/shen26d_interspeech.pdf
---

# Iterate to Differentiate: Enhancing Discriminability and Reliability in Zero-Shot TTS Evaluation

*Shengfan Shen, Di Wu, Xingchen Song, Dinghao Zhou, Liumeng Xue, Meng Meng, Jian Luan, Shuai Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/shen26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shen26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2414)

**TL;DR** — Iterate to Differentiate (I2D) is a zero-shot text-to-speech evaluation framework that recursively uses synthesized outputs as subsequent references to amplify performance gaps, increasing system-level Spearman correlation for UTMOSv2 from 0.118 to 0.464.

## Key contributions

- Identifies and analyzes score saturation in conventional single-turn objective TTS metrics (WER/CER, SIM, neural MOS predictors) when evaluating state-of-the-art models.
- Introduces the I2D evaluation framework which recursively feeds generated speech back as reference audio over multiple iterations to exploit error accumulation and differential degradation.
- Evaluates 11 open-source TTS models across Chinese, English, and emotion datasets, demonstrating that iteration-aggregated metrics correlate much stronger with human subjective ratings.
- Proposes a cross-model reference swapping experiment showing that performance degradation during iteration is primarily driven by reference quality decay combined with intrinsic model robustness differences.

## Problem

Modern zero-shot text-to-speech models have advanced to the point where conventional objective metrics (such as word error rate and speaker similarity) and neural quality predictors (such as UTMOSv2 and DNSMOS) suffer from severe score saturation, compressing inter-model performance differences into a narrow 2% range. This narrow window causes evaluation model noise to dominate, making automated system rankings unreliable and failing to reflect true human perceptual differences. While subjective Mean Opinion Score (MOS) tests avoid this, they are expensive, time-consuming, and suffer from high inter-rater variability and poor reproducibility.

## Method

The I2D framework executes an iterative synthesis protocol where a TTS model $M$ takes a target text and a reference audio-transcript pair to generate an output. For subsequent iterations up to a maximum depth ($max\_iteration = 10$), the newly generated speech waveform and target text are directly substituted as the reference audio and reference text for the next round. If a model generates hallucinations or omissions, text-audio mismatches accumulate, causing weak models to degrade rapidly while robust models retain quality.

To summarize metric trajectories across iterations, four aggregation strategies are evaluated: Mean Score (arithmetic mean across iterations), Linearly Weighted Average (LWA, linearly increasing weights for later iterations), Exponentially Weighted Average (EWA, weights decaying with depth), and Area Under the Curve (AUC via the trapezoidal rule). Lower-is-better metrics like CER are inverted ($1 - \text{CER}$) for consistency. Cross-model reference swapping experiments at the 6th iteration are also used to decouple reference quality degradation from out-of-distribution model collapse.

The evaluated models encompass 11 open-source architectures spanning autoregressive (FireRedTTS2, Qwen3-TTS-12Hz-1.7B-Base, VoxCPM1.5), non-autoregressive (F5-TTS, MaskGCT), and hybrid LLM-diffusion/flow frameworks (CosyVoice variants including CosyVoice-300M, CosyVoice2, CosyVoice3, CosyVoice3-RL, GLM-TTS, and IndexTTS2).

## Experimental setup

Evaluations utilize three datasets: an English subset from LibriTTS test-clean (2,915 utterances, 3-15 seconds, 38 speakers), a Chinese subset from Seed-TTS-Eval/DiDiSpeech (2,020 utterances, 4-12 seconds, 1,010 speakers), and an emotion cloning subset from CV3-Eval/EmoBox/SeCap (300 samples across happy, sad, and angry). Objective metrics use the VERSA toolkit, Whisper-large-v3 for WER, ESPNet/Paraformer-zh/WavLM for SIM/CER, and emo2vec-large-plus for emotion F1. Human subjective evaluations on a 100-sample Chinese subset involved 11,752 annotations across content accuracy, speaker consistency, and overall naturalness scored by 5-6 annotators per sample.

## Results

At the 1st iteration, conventional UTMOSv2 and DNSMOS exhibit near-zero system-level Spearman Rank Correlation Coefficients (SRCC) with human naturalness ratings (0.1182 and 0.0909, respectively). Applying I2D with the Mean Score aggregation raises system-level SRCC to 0.464 for UTMOSv2 and 0.2545 for DNSMOS. After 10 iterations, standard deviations across models widen substantially (e.g., SIM standard deviation expands from 3.83 to 12.15), turning compressed metrics into clear performance disparities where weaker models exceed 40% WER (FireRedTTS2, MaskGCT) while robust models like CosyVoice3-RL maintain superior speaker similarity (67.32 en / 62.17 zh). 

In ablation analyses over maximum iteration depths, 5 iterations achieve correlation performance comparable to 10 iterations, offering a practical computational trade-off. However, I2D may over-penalize models prone to stylistic drift under repeated conditioning and increases overall compute requirements due to repeated generation loops.

| System | Iter1 UTMOSv2 | Iter10 UTMOSv2 | Mean SIM (en/zh) | Mean WER/CER (en/zh) |
|---|---|---|---|---|
| CosyVoice3 | 3.82 | 3.33 | 68.88 / 62.14 | 2.36 / 1.44 |
| CosyVoice3-RL | 3.83 | 3.33 | 67.32 / 62.17 | 2.27 / 0.90 |
| IndexTTS2 | 3.46 | 3.22 | 62.06 / 58.50 | 2.22 / 1.72 |
| Qwen3-TTS | 4.04 | 3.68 | 64.73 / 57.19 | 2.26 / 1.68 |
| F5-TTS | 3.09 | 2.92 | 48.74 / 49.23 | 17.40 / 5.33 |
| FireRedTTS2 | 3.18 | 3.10 | 32.28 / 50.05 | 32.35 / 18.33 |

## Limitations

The framework incurs higher computational costs due to recursive generation and repeated metric evaluations over multiple iterations. Its iterative collapse mechanism can favor rigid model stability over expressive stylistic diversity, and naturalness scores remain sensitive to the initial reference audio's quality and style. Furthermore, the study is restricted to open-source models, omitting closed-source commercial APIs due to access and cost barriers.

## Why read this

Speech researchers and TTS engineers building zero-shot voice cloning systems should read this paper to understand why current neural evaluation metrics fail on SOTA models and how to implement recursive evaluation protocols that reliably expose model robustness and human alignment.

## Code

- https://ssf-1103.github.io/I2D-Bench/

## Applications

Automated zero-shot TTS model benchmarking, continuous integration quality assurance for speech generation pipelines, and robustness stress-testing for voice cloning systems.

## Related

- (link related pages by id as the wiki grows)
