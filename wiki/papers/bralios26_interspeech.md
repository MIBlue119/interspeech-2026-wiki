---
id: bralios26_interspeech
category: speech-coding
labels: [efficient-on-device, streaming-real-time]
institutions: ["University of Illinois Urbana-Champaign", "Massachusetts Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3031
pdf: https://www.isca-archive.org/interspeech_2026/bralios26_interspeech.pdf
---

# Elastic Time: Dynamic Frame Rate Bottlenecks for Neural Audio Coding

*Dimitrios Bralios, Paris Smaragdis, Minje Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/bralios26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bralios26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3031)

**Category:** `speech-coding` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — Elastic Time is a plug-in Re-Bottleneck module for neural audio autoencoders that enables deployment-time dynamic frame-rate control using a lightweight learned latent predictor. It achieves superior efficiency-quality tradeoffs compared to fixed-rate and prior dynamic chunking baselines without needing external semantic supervision.

## Key contributions

- Introduces Elastic Time, a Re-Bottleneck plug-in framework that converts pretrained fixed-frame-rate neural audio autoencoders into dynamic frame-rate models.
- Proposes a lightweight 0.5M-parameter autoregressive latent predictor trained via multi-step rollout and validation losses to evaluate local temporal redundancy.
- Provides two boundary selection solvers: an efficient greedy algorithm running in O(T log T) time and an exact dynamic programming procedure.
- Eliminates reliance on external semantic supervision (such as pretrained ASR or alignment models) during both training and inference.

## Problem

While neural audio autoencoders successfully compress waveforms, most operate at fixed latent frame-rates that allocate equal temporal budgets to regions with vastly different information density, resulting in unnecessarily long sequences. Prior dynamic frame-rate approaches either rely heavily on external semantic guidance (like temporal entropy or pretrained ASR aligners) or require complex multi-stage training pipelines without dedicated latent dynamics models. This excess sequence length bottlenecks downstream generative tasks like diffusion transformers and autoregressive language models, which suffer from high compute and memory scaling costs.

## Method

Elastic Time acts as a Re-Bottleneck over a frozen pretrained autoencoder (Stable Audio Open VAE, 156M parameters), keeping latent channel count C invariant while introducing symmetric ConvNeXt-V2 encoder (R_enc) and decoder (R_dec) networks (6 blocks, hidden dim 1024, 51M parameters). A lightweight latent predictor P (0.5M parameters, 3 GRU layers followed by a SwiGLU FFN block on a 128 hidden dimension) models short-term temporal latent dynamics. P is trained using a multi-step rollout loss (K_roll = 5 steps) combined with an auxiliary prediction loss over decimated frames. During inference, a user-specified kept fraction rho determines the target anchor count N. Boundary selection is performed using either an O(T log T) greedy algorithm (which freezes expansion costs once committed) or a dynamic programming solver using cumulative segment approximation costs up to a maximum segment length K_max = 12.

The training recipe uses a 4.8k-hour mix of audio and music sampled at 44.1 kHz, pre-encoded into latent chunks of size 96 (~4.5 seconds). Training runs for 250k steps with batch size 64 using an L40S GPU. Optimizers include AdamW (lr=10^-4, wd=10^-4) for the discriminator and a combined Muon (lr=10^-3, momentum=0.95) and AdamW optimizer for the rest of the model. Loss objectives combine target-standard-deviation-normalized MSE reconstruction loss (weighted by 2.0), adversarial loss (0.5), feature matching loss (1.0), rollout prediction loss (lambda_roll = 0.4), and validation prediction loss (lambda_valid = 0.5), alongside a KL-objective weight of 0.0001.

## Experimental setup

Evaluated on 4.8k hours of audio/music training data from AudioSet-balanced, FSD50k, BBCSoundEffects, RWC, MoisesDB, and Jamendo-FMA-captions. Evaluated on unseen test sets across diverse domains: SongDescriber (instrumental music), AudioCaps (sound effects), MuChin (Chinese vocal music), and DAPS (speech). Compared against Conv-Downsample, CodecSlime, H-Net, and H-Net-YOTO baselines. Metrics include SI-SDR, mel-spectrogram distance (mel-d), STFT distance, and Fréchet Audio Distance (FAD).

## Results

Elastic Time variants consistently outperform H-Net baselines across datasets, demonstrating that explicit boundary-selection optimization tailored for finite-segment offline autoencoding outperforms causal text-based chunking mechanisms. Compared to CodecSlime, ET achieves lower mel-d and FAD on SongDescriber and DAPS—particularly excelling in FAD—though CodecSlime shows a slight edge in mel-d on AudioCaps, likely due to music-heavy training domain bias. Single-rate specialization variants (ET-greedy@0.5 and ET-dp@0.5) outperform scalable counterparts at rho=0.5 and successfully match or surpass the fixed-rate Conv-Downsample baseline.

| System / Condition | Mel-d ↓ | STFT-d ↓ | SI-SDR ↑ (dB) |
|---|---|---|---|
| ET-greedy @ 0.5 | 1.11 | 1.71 | 2.3 |
| ET-greedy | 1.14 | 1.73 | 1.6 |
| ET-dp @ 0.5 | 1.13 | 1.74 | 2.2 |
| ET-dp | 1.16 | 1.75 | 1.6 |
| Conv-Downsample | 1.11 | 1.72 | 2.5 |
| H-Net-YOTO | 1.20 | 1.80 | 0.3 |

## Limitations

The current model exhibits domain bias due to training predominantly on music data (~82%), causing slightly reduced effectiveness on non-music domains like sound effects. The greedy selection strategy's freezing rule constrains the absolute minimum achievable kept length. Furthermore, evaluation is restricted to offline, finite-segment autoencoding rather than streaming applications.

## Why read this

Speech and ML engineers working on long-context audio generation or latent diffusion models should read this to learn how to apply lightweight plug-in Re-Bottleneck modules for dynamic frame-rate control without retraining base autoencoders.

## Code

- https://github.com/dbralios/elastic-time

## Applications

Efficient audio compression, long-context audio generation, and reducing sequence lengths for latent diffusion and autoregressive speech LLMs.

## Institutions / 機構

University of Illinois Urbana-Champaign, Massachusetts Institute of Technology

**Funding / 經費:** Electronics and Telecommunications Research Institute

## Related

- (link related pages by id as the wiki grows)
