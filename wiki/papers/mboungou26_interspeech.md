---
id: mboungou26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-766
pdf: https://www.isca-archive.org/interspeech_2026/mboungou26_interspeech.pdf
---

# Audio-visual Contrastive Alignment for Diffusion-based Visual-conditioned Speech Enhancement

*Colombe Mboungou, Mostafa Sadeghi, Jean-Eudes Ayilo, Romain Serizel*

[PDF](https://www.isca-archive.org/interspeech_2026/mboungou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mboungou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-766)

**TL;DR** — This paper proposes augmenting the training objective of a diffusion-based unsupervised audio-visual speech enhancement model with an InfoNCE-based audio-visual contrastive loss, yielding a +5 dB improvement in signal-to-interference ratio on matched test data.

## Key contributions

- Integrates a symmetric InfoNCE contrastive alignment loss directly into the score model optimization of an unsupervised audio-visual speech diffusion model without changing the inference algorithm.
- Applies a time-dependent weighting schedule to the contrastive loss, enforcing alignment only during early denoising steps (t <= 0.3) where Tweedie clean speech estimates are reliable.
- Incorporates a learnable linear projection and bias layer on pretrained AV-HuBERT visual features, demonstrating significant metric gains under cross-dataset mismatch.
- Establishes extensive empirical evaluations showing marked robustness improvements at low input SNRs and under unseen noise and speaker domain shifts.

## Problem

Unsupervised audio-visual speech enhancement frameworks like AV-UDiffSE+ utilize cross-attention conditioning mechanisms to inject lip movement features into a speech diffusion prior, but they lack an explicit cross-modal representation alignment constraint. This architectural limitation causes the model to under-utilize visual information, leaning heavily on the acoustic stream when it provides a strong prior. Consequently, performance degrades severely under low-SNR conditions and cross-dataset domain shifts. Enforcing global audio-visual representation consistency is necessary to drive stronger utilization of complementary visual cues during posterior sampling-based recovery.

## Method

The system builds on AV-DiffUSEEN, utilizing a lighter NCSN++M U-Net backbone of 6.8M parameters with single-head cross-attention modules. Visual features are extracted from lip movements using a frozen pretrained AV-HuBERT encoder, followed by a trainable linear projection layer, bias, and temporal average pooling to yield a visual embedding vector. During training, a Tweedie formula estimator extracts a clean speech estimate from the diffused noisy sample at step t, which is then encoded into an audio embedding vector via a trainable ResNet-18 audio encoder.

The training objective combines a weighted denoising score matching generative loss with a symmetric InfoNCE contrastive loss computed over batch audio and visual embeddings with a temperature parameter of tau = 0.1. A time-dependent weighting schedule sets the contrastive weight multiplier alpha(t) to 1 for t <= 0.3 and 0 otherwise, ensuring alignment is applied only during the early, reliable denoising phases. A warmup period of 100 epochs is used before scaling the contrastive loss by its final balancing factor beta_0 = 3,000.

At inference time, the pretrained score network is embedded into the DiffUSEEN framework—an iterative Expectation-Maximization algorithm where the E-step draws clean speech via diffusion posterior sampling governed by a reverse SDE combining the conditional prior score and an NMF-based noise observation model, and the M-step updates noise parameters via multiplicative update rules.

## Experimental setup

Models are trained on the TCD-TIMIT corpus of clean audio-visual studio recordings. Evaluation is performed on TCD-DEMAND (matched speakers, unseen DEMAND environmental noises) and LRS3-NTCD (mismatched TED/TEDx video speech mixed with NTCD noise, providing domain shift for speakers, acoustics, and video quality). Evaluations use input SNRs of -5 dB and +5 dB. Performance is measured using SI-SDR, SI-SIR, and SI-SAR (in dB), PESQ, and STOI. The proposed contrastive model has 6.8M parameters and is compared against audio-only AO-DiffUSEEN, audio-visual AV-DiffUSEEN, and the supervised generative FlowAVSE model (60.2M parameters).

## Results

Under matched conditions (TCD-DEMAND), the proposed contrastive model improves SI-SIR by ~5 dB (reaching 29.5 dB vs 24.3 dB for AV-DiffUSEEN) and SI-SDR by +2.4 dB (16.0 dB vs 13.6 dB), while maintaining comparable PESQ (3.28) and STOI (0.79). At low input SNR (-5 dB), the method achieves a +6 dB gain in SI-SIR, +5 dB in SI-SAR, +3 dB in SI-SDR, and +0.06 in PESQ over the baseline. Under mismatched conditions (LRS3-NTCD), the model achieves an SI-SDR of 8.10 dB and SI-SIR of 18.60 dB, outperforming AV-DiffUSEEN (7.40 dB SI-SDR, 15.0 dB SI-SIR). Ablations show that removing the linear projection on visual embeddings degrades every metric under mismatched settings, while choosing an improper contrastive weight beta_0 outside the optimal 3,000 value leads to optimization conflicts or weak cross-modal coupling.

| System | SI-SDR (dB) | SI-SIR (dB) | SI-SAR (dB) | PESQ | STOI |
|---|---|---|---|---|---|
| Input Noisy (TCD-DEMAND) | 0.00 | 0.00 | 55.7 | 2.83 | 0.70 |
| AO-DiffUSEEN | 10.70 | 17.00 | 15.0 | 3.17 | 0.76 |
| AV-DiffUSEEN | 13.60 | 24.30 | 15.6 | 3.28 | 0.79 |
| FlowAVSE (Supervised) | 17.80 | 39.90 | 17.90 | 3.18 | 0.82 |
| Our Model (Contrastive AVSE) | 16.00 | 29.50 | 16.10 | 3.28 | 0.79 |

## Limitations

The evaluation relies on simulated noisy mixtures (TCD-DEMAND and LRS3-NTCD) rather than complex real-world multi-speaker reverberant recordings. The contrastive weight hyperparameter beta_0 requires careful tuning, as over-weighting the InfoNCE loss degrades acoustic reconstruction quality by prioritizing global instance discrimination over speech waveform fidelity. Visual input dependency tests indicate that masking the video feed causes a steeper performance collapse for the contrastive model than the baseline, highlighting heightened reliance on clean visual streams.

## Why read this

Speech and ML researchers focusing on multimodal generative speech enhancement should read this paper to see how an InfoNCE-based alignment loss can be cleanly integrated into score-based diffusion priors without modifying inference, yielding massive gains in low-SNR interference suppression.

## Code

- https://github.com/cexauce/AV-CA-DiffUSE

## Applications

Robust audio-visual speech enhancement for hearing aids, teleconferencing systems, and automatic speech recognition front-ends operating in noisy, non-stationary acoustic environments.

## Related

- (link related pages by id as the wiki grows)
