---
id: yang26g_interspeech
category: speech-coding
labels: [multilingual]
institutions: ["National Tsing Hua University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1224
pdf: https://www.isca-archive.org/interspeech_2026/yang26g_interspeech.pdf
---

# Pitch-Injected Residual Adapter for Tonal Language in Neural Audio Codec

*Jie-Shiang Yang, Ya-Tse Wu, Chi-Chun Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1224)

**Category:** `speech-coding` · **Labels:** `multilingual`

**TL;DR** — The Pitch-Injected Residual Adapter (PIRA) is a lightweight, plug-and-play module that restores fundamental frequency and tonal information in frozen neural audio codecs, reducing codec-induced Tone Error Rate (dTER) by 35.7% across three tonal languages and five codecs.

## Key contributions

- Proposes PIRA, a lightweight parallel side-module (1.25M–1.65M parameters) that injects F0 and voiced/unvoiced side-information into the quantized latent space of frozen neural audio codecs.
- Introduces a dilated convolutional network (6 layers, kernel size 3, base-3 dilations) with a 729-frame receptive field (9.7s) to capture long-range multi-syllable tone sandhi dependencies.
- Employs a confidence network that learns per-frame gating to suppress pitch injection during unvoiced segments and checked tones where spectral cues carry primary tonal distinctions.
- Applies a CREPE-Tiny penultimate-layer embedding loss to provide perceptually-weighted pitch-specific gradients missing from standard audio reconstruction losses.

## Problem

Neural audio codecs (NACs) are predominantly trained on non-tonal language corpora and optimized for perceptual metrics like PESQ and STOI that treat fundamental frequency (F0) as secondary prosodic info rather than phonemic information. In tonal languages—comprising over 40% of the world's languages—RVQ quantization causes F0 smoothing, octave errors, and voicing confusion that destroy lexical distinctions. While full fine-tuning can adapt spectral representations, it risks catastrophic forgetting on non-target languages, demands excessive compute under low-resource constraints, and still fails to restore F0 due to a lack of explicit pitch supervision in standard codec loss functions.

## Method

PIRA acts as a parallel side-module in the quantized latent space of a frozen neural audio codec. Given input audio at 16 kHz, the frozen encoder produces a latent representation, and RVQ quantizes it. Simultaneously, F0 and voiced/unvoiced (UV) features are extracted via WORLD Harvest at 100 Hz, resampled to the latent temporal resolution, and quantized into 4-bit scalar codes (16 log-spaced bins over 50–550 Hz) alongside binary UV flags. These features are fed into a Pitch Injector and a Confidence Network. The Pitch Injector uses a 1x1 input projection to 256 dimensions, followed by 6 dilated Conv1d layers with residual connections and GELU activations, producing a pitch residual R. The Confidence Network uses three Conv1d layers conditioned on the quantized latent space and UV states to output a per-frame confidence gate alpha via a sigmoid function. The corrected latent is formed by adding the element-wise product of alpha and R to the original quantized latent, which is then passed to the frozen decoder.

The overall training objective minimizes a weighted sum of time-domain L1 loss, multi-resolution STFT loss, mel-spectrogram loss, and a CREPE embedding loss computed using the 256-dimensional penultimate layer activations of frozen CREPE-Tiny. Loss weights are set to lambda_1 = 0.1, lambda_s = 1.0, lambda_m = 1.0, and lambda_c = 30. Only adapter parameters are updated using the AdamW optimizer with a learning rate of 1e-3, gradient clipping norm of 1.0, and ReduceLROnPlateau scheduler. The system is trained for up to 200 epochs with early stopping patience of 15 and batch size 64 on a single A100 GPU.

## Experimental setup

Evaluated on three ~6-hour low-resource tonal datasets capped at 8,000 training and 1,000 test utterances: AS-CE (Hokkien, 7-8 tones), MDCC (Cantonese, 6-9 tones), and VIVOS (Vietnamese, 6 tones). Evaluated across five pretrained neural audio codecs: EnCodec, DAC 16kHz, Mimi, WavTokenizer, and BigCodec. Baselines include pretrained frozen codecs, decoder-only fine-tuning, and full end-to-end fine-tuning. Metrics include dCER, dWER, Tone Error Rate (dTER), F0-RMSE (in cents), Gross Pitch Error (GPE), and Voicing Decision Error (VDE).

## Results

PIRA reduces dTER by 35.7% on average across all 15 evaluated codec-language configurations, with EnCodec showing the largest relative dTER reduction of 56.7%. For EnCodec on Hokkien, PIRA achieves an F0-RMSE of 43.1 cents compared to 117.9 cents for the pretrained baseline and 87.1 cents for full fine-tuning, while keeping English dWER degradation negligible at 0.013 (matching pretrained) compared to 0.068 for full fine-tuning. Ablations demonstrate that removing the confidence network causes VDE to degrade from 0.144 to 0.337, and removing the CREPE loss increases F0-RMSE from 43.1 to 69.7 cents.

| System | Hokkien dTER | Hokkien F0-RMSE | Cantonese dTER | Cantonese F0-RMSE | Vietnamese dTER | Vietnamese F0-RMSE |
|---|---|---|---|---|---|---|
| EnCodec (Pretrain) | 0.267 | 117.93 | 0.236 | 48.91 | 0.490 | 28.65 |
| EnCodec + PIRA | 0.171 | 43.14 | 0.098 | 21.88 | 0.120 | 17.95 |
| DAC 16kHz (Pretrain) | 0.156 | 27.47 | 0.154 | 25.91 | 0.140 | 21.24 |
| DAC 16kHz + PIRA | 0.124 | 19.89 | 0.104 | 18.23 | 0.096 | 17.77 |
| BigCodec (Pretrain) | 0.180 | 41.82 | 0.129 | 22.78 | 0.129 | 21.70 |
| BigCodec + PIRA | 0.112 | 21.85 | 0.092 | 17.82 | 0.099 | 16.67 |

## Limitations

The current approach relies on WORLD Harvest for F0 extraction, which introduces significant computational latency (1406.66 ms, RTF = 0.28) and forms the primary pipeline bottleneck. Hokkien performance is limited by complex sandhi rules determined by context beyond the acoustic signal. Evaluation is constrained to three languages with datasets capped at 6 hours, and formal subjective human listening tests (MOS) were not conducted.

## Why read this

Speech engineers and researchers working on neural audio codecs or speech language models for tonal languages should read this paper to learn how to inject explicit pitch information into frozen latent spaces without full retraining or catastrophic forgetting.

## Code

- https://github.com/Jie-shiang/Pitch-Injected-Residual-Adapter

## Applications

Low-resource speech generation, discrete tokenization for LLM-based speech synthesis, and cross-lingual voice conversion involving tonal languages.

## Institutions / 機構

National Tsing Hua University

## Related

- (link related pages by id as the wiki grows)
