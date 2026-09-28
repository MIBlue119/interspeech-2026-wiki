---
id: ojha26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-964
pdf: https://www.isca-archive.org/interspeech_2026/ojha26_interspeech.pdf
---

# Bridging Self-Supervised Learning and Speech Enhancement: A Wav2Vec2-Conditioned Framework

*Shuubham Ojha, Carol Espy-Wilson*

[PDF](https://www.isca-archive.org/interspeech_2026/ojha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ojha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-964)

**TL;DR** — This paper proposes conditioning a score-based diffusion speech enhancement model on phonetic representations from a frozen wav2vec 2.0 encoder, injected via Feature-wise Linear Modulation (FiLM) at the U-Net bottleneck. Evaluated on VoiceBank-DEMAND and LibriMix, it achieves a consistent 0.4 improvement in PESQ over unconditioned diffusion baselines.

## Key contributions

- Introduces a FiLM-based conditioning mechanism that integrates wav2vec 2.0 features specifically at the U-Net bottleneck for diffusion speech enhancement.
- Derives a principled temporal smoothing strategy for FiLM coefficients grounded in the optimal causal estimator under a linear-Gaussian state-space model.
- Demonstrates consistent quantitative gains in PESQ (up to +0.4), STOI, and DNSMOS across VoiceBank-DEMAND and LibriMix benchmarks compared to unconditioned StoRM baselines.
- Achieves a real-time factor (RTF) of 0.55 on a lightweight 32-channel variant while preserving fine spectral details and formants.

## Problem

Generative diffusion-based speech enhancement models produce natural-sounding speech but often struggle to generalize to unseen noise types or acoustic settings when they lack linguistic guidance. Prior conditioning techniques like input concatenation or full-network cross-attention either fail to anchor the reverse process robustly or add excessive computational overhead. This matters because unconditioned models frequently introduce spectral smearing and audible artifacts at low signal-to-noise ratios, highlighting the need for semantic anchoring from self-supervised representations.

## Method

The architecture builds on the StoRM score-based diffusion framework operating in the complex STFT domain with an Ornstein-Uhlenbeck Variance Exploding (OUVE) process and 30 reverse sampling steps. The score network is an NCSN++ U-Net with BigGAN-style residual blocks, skip connections, and sinusoidal timestep embeddings. A frozen wav2vec 2.0 base model extracts contextualized representations from the noisy input waveform at a 20ms frame rate (yielding a 768-dimensional sequence from the final Transformer layer). 

A learned 3-layer MLP acts as a FiLM generator, projecting the feature sequence to scale (gamma) and shift (beta) parameters of size 2 x T' x C (where C = 64 for the 32-channel configuration and C = 256 for the 128-channel configuration). To compress these temporally, exponential moving average (EMA) smoothing is applied. The smoothing coefficient alpha is set to 1.0 based on a state-space derivation showing EMA acts as the optimal causal estimator under linear-Gaussian assumptions. 

FiLM modulation is strictly applied at the U-Net bottleneck via element-wise multiplication and addition (h_tilde = gamma_tilde * h + beta_tilde). Modulating only the bottleneck avoids scale mismatches caused by disrupting fine-grained spectrotemporal details in early encoder layers, while keeping computational overhead minimal (wav2vec extraction consumes only ~0.1% of the total inference budget).

## Experimental setup

Evaluated on the VoiceBank-DEMAND (VB-DEMAND) dataset (11,572 training utterances across 28 speakers; 824 test utterances with 5 unseen noise types at 2.5, 7.5, 12.5, and 17.5 dB SNRs) and the single-speaker LibriMix dataset (100 training hours, 3,000 test utterances). Compared against CDiffuSE, UNIVERSE, UNIVERSE++, and matching StoRM-128 and StoRM-32 configurations. Metrics include wideband PESQ, STOI, SI-SDR, and DNSMOS components (SIG, BAK, OVRL). Models are trained using the Adam optimizer with a learning rate of 1e-4 for 100 epochs on VB-DEMAND.

## Results

On the VB-DEMAND test set, the 128-channel proposed model (OURS-128) achieves a PESQ of 2.8742, STOI of 0.8673, and SI-SDR of 17.9844, outperforming StoRM-128 (PESQ 2.4862, STOI 0.8571) by ~0.4 points in PESQ. On LibriMix (32-channel configuration), OURS-32 achieves a PESQ of 2.0099, STOI of 0.7836, and SI-SDR of 11.9086, substantially beating StoRM-32 (PESQ 1.6385, STOI 0.7409). Ablating the FiLM conditioning location demonstrates that applying modulation at the bottleneck alone outperforms adding it to encoder or decoder blocks (e.g., Encoder+Bottleneck drops PESQ from 2.86 to 2.79). 

Where it does not win: The model experiences marginal trades in SI-SDR on certain configurations due to an aggressive noise suppression tendency, which improves perceptual quality and DNSMOS but slightly lowers linear waveform distance metrics.

| Model | PESQ ^ | STOI ^ | SI-SDR ^ | OVRL (DNSMOS) ^ |
|---|---|---|---|---|
| Noisy | 1.9797 | 0.7867 | 8.4450 | 2.588 |
| StoRM-128 [25] | 2.4862 | 0.8571 | 18.5656 | 3.229 |
| OURS-128 | 2.8742 | 0.8673 | 17.9844 | 3.300 |
| StoRM-32 [25] | 2.7941 | 0.8522 | 17.9520 | 3.347 |
| OURS-32 | 2.8636 | 0.8589 | 17.8179 | 3.359 |

## Limitations

The evaluation is restricted to clean-to-noisy English datasets (VoiceBank-DEMAND and LibriMix) and does not test cross-lingual generalization or extreme reverberation environments. The iterative reverse sampling process of diffusion models remains computationally demanding (requiring 30 steps), yielding real-time factors above 1.0 for the 128-channel variant. Furthermore, the approach relies on a fixed, pretrained wav2vec 2.0 base model without fine-tuning its representations end-to-end for speech enhancement.

## Why read this

Speech researchers and generative model engineers working on audio restoration should read this to see how self-supervised linguistic representations can stabilize diffusion-based reverse processes via lightweight bottleneck FiLM conditioning. It provides a mathematically grounded justification for exponential smoothing as an optimal causal estimator for conditioning trajectories.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time communication enhancement, telephony noise suppression, and preprocessing pipelines for automatic speech recognition (ASR) systems operating in highly degraded acoustic environments.

## Related

- (link related pages by id as the wiki grows)
