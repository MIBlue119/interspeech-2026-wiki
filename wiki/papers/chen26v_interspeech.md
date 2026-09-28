---
id: chen26v_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2082
pdf: https://www.isca-archive.org/interspeech_2026/chen26v_interspeech.pdf
---

# SARA: A Dual-Stream VAE for High-Fidelity Speech Generation via Integrating Semantic and Acoustic Representations

*Peijie Chen, Wenhao Guan, Weijie Wu, Kaidi Wang, Daiyu Huang, Zhuanling Zha, Junbo Li, Jun Fang, Qingyang Hong, Lin Li*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2082)

**TL;DR** — SARA is a dual-stream VAE framework that fuses a frozen SSL semantic anchor with a residual acoustic encoder, resolving the fidelity-controllability trade-off in neural codecs and achieving a 1.79% WER on zero-shot TTS.

## Key contributions

- Proposes a structural dual-stream VAE integration of a frozen SSL semantic anchor and a residual acoustic encoder, eliminating the need for complex auxiliary regularizers.
- Compresses 24 kHz audio waveforms into a compact 64-dimensional latent space at a 50 Hz frame rate.
- Integrates SARA latent representations into F5-TTS, improving zero-shot text-to-speech content accuracy (down to 1.79% WER) and speaker similarity.
- Maintains robust zero-shot generation performance even under accelerated flow-matching inference steps (NFE=8).

## Problem

Current neural speech tokenizers face a fundamental dilemma between reconstruction fidelity and generative controllability. Traditional acoustic codecs preserve fine-grained acoustic details and high-frequency harmonics but lack linguistic constraints, leading to content errors and high word error rates in downstream zero-shot TTS. Conversely, purely semantic representations from SSL models (like HuBERT or WavLM) ensure precise text alignment but discard critical speaker identity, emotion, and prosody. Prior attempts to bridge this gap using complex semantic regularization losses are indirect and difficult to balance, motivating an architectural solution.

## Method

SARA maps a 24 kHz input waveform to a 50 Hz, 64-dimensional latent space using a parallel dual-stream encoder architecture. The residual acoustic encoder uses Snake activation functions, convolutional blocks with varying dilations (achieving a cumulative downsampling factor of 480 across 5 modules), and a 2-layer unidirectional LSTM network to capture temporal patterns and timbre, outputting a 1024-dimensional acoustic stream (z_ac). In parallel, a frozen W2v-BERT 2.0 model acts as an SSL encoder to extract temporally aligned semantic representations (z_sem) at 50 Hz.

The two streams are concatenated along the channel dimension and passed through a linear projection layer to yield the final 64-dimensional latent representation z. The decoder is built on a HiFi-GAN multi-receptive field fusion structure. The VAE is trained by minimizing a composite loss combining a multi-scale mel-spectrogram reconstruction loss (L_recon = 15), KL divergence (lambda_KL = 0.01), and an adversarial loss using multi-period and multi-band/multi-scale STFT discriminators with an L1 feature-matching loss (lambda_adv = 1, lambda_feat = 1).

During inference, the latent features replace standard mel-spectrograms inside the F5-TTS generation backbone, leveraging a sway sampling strategy and an Euler ODE solver for zero-shot synthesis.

## Experimental setup

Trained on a 50,000+ hour corpus combining LibriHeavy (50k hours at 16 kHz) and LibriTTS (585 hours at 24 kHz), all resampled to 24 kHz. Evaluated on LibriSpeech test-clean for reconstruction (metrics: PESQ, STOI, UTMOS) and LibriSpeech-PC test-clean for zero-shot TTS (metrics: Whisper-large-v3 WER, WavLM-TDCNN SIM, CMOS, SMOS). VAE models are trained for 200k iterations with a global batch size of 256 using the AdamW optimizer (initial lr 1e-4, linear warmup for 10k steps, exponential decay gamma = 0.9999996).

## Results

SARA achieves a reconstruction PESQ of 4.389 and STOI of 0.993 on LibriSpeech test-clean, outperforming Vocos (PESQ 3.605) and Vanilla VAE (PESQ 4.076). In downstream zero-shot TTS using F5-TTS-Small, SARA achieves a WER of 1.79% and a SIM of 0.63, outperforming the standard F5-TTS baseline (WER 2.42%, SIM 0.66) and Semantic-VAE (WER 1.95%, SIM 0.64). Scaling SARA up to the base F5-TTS backbone further reduces WER to 1.74% while achieving a 0.655 SIM. Ablations demonstrate that removing the residual acoustic encoder degrades speaker similarity (SIM drops from 0.685 to 0.640), while removing the SSL encoder damages content accuracy (WER increases from 2.32% to 2.41%).

| Model | PESQ ↑ | STOI ↑ | UTMOS ↑ | WER(%) ↓ | SIM ↑ |
|---|---|---|---|---|---|
| GT | - | - | 4.097 | 2.23 | 0.690 |
| SARA (Ours) | 4.366 | 0.992 | 4.110 | 2.32 | 0.685 |
| - Res Encoder | 2.655 | 0.930 | 3.944 | 2.41 | 0.640 |
| - SSL Encoder | 4.074 | 0.983 | 4.113 | 2.41 | 0.683 |

## Limitations

The evaluation is restricted to English datasets (LibriTTS and LibriHeavy) and primarily assessed on clean audiobook speech, leaving multilingual and noisy acoustic conditions untested. The dual-stream encoder introduces additional computational overhead during inference relative to single-stream codecs.

## Why read this

Speech researchers and engineers building zero-shot TTS systems should read this to see how structural feature integration of frozen SSL anchors and residual acoustic streams bypasses the limitations of auxiliary regularization losses.

## Code

- https://pppjchen.github.io/SARA

## Applications

Zero-shot text-to-speech synthesis, speech generation, and high-fidelity audio reconstruction.

## Related

- (link related pages by id as the wiki grows)
