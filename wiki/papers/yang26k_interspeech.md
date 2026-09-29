---
id: yang26k_interspeech
category: speech-coding
institutions: ["Georgia Institute of Technology", "Chinese University of Hong Kong", "Tencent Music Entertainment"]
code: https://github.com/QiaoyuYang/HARP
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1759
pdf: https://www.isca-archive.org/interspeech_2026/yang26k_interspeech.pdf
---

# HARP: Harmonic-Aware Residual Partitioning for Neural Audio Codecs

*Qiaoyu Yang, Lixing He, Binyue Deng, Weifeng Zhao*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1759)

**Category:** `speech-coding`

**TL;DR** — HARP is a training strategy for neural audio codecs that partitions residual vector quantization (RVQ) stages into frequency-ordered groups using cumulative decoding and soft subband supervision, outperforming standard RVQ and parallel band decomposition across speech, music, and general audio without changing inference architecture.

## Key contributions

- Identifies spectral entanglement in standard RVQ and harmonic incoherence in parallel band decomposition as complementary failure modes.
- Proposes HARP, a training-only strategy that imposes frequency hierarchy on RVQ via cumulative decoding and soft subband supervision without modifying codec architecture.
- Introduces cumulative decoding, ensuring higher-frequency stages have access to lower-frequency latents to preserve cross-band harmonic phase and amplitude relationships.
- Implements learnable soft band weighting via normalized Gaussians and group dropout for variable-bitrate operation.
- Demonstrates consistent improvements in SI-SDR, KAD, PESQ, and MUSHRA listening tests across speech, music, and general audio domains, particularly at low bitrates.

## Problem

Standard neural audio codecs using residual vector quantization (RVQ) treat all frequencies uniformly, leading to spectral entanglement where different codebook stages capture unpredictable mixtures of frequencies. Consequently, when truncating a pretrained model to fewer stages for low-bitrate operation, audio quality degrades erratically—sometimes removing bass entirely and other times treble—with no consistency across inputs. Parallel band decomposition attempts to solve this via separate filterbank encoders and decoders, but fragments the latent space and loses cross-frequency harmonic and phase coherence.

## Method

HARP modifies only the training objective of a standard Descript Audio Codec (DAC) backbone. The network comprises an encoder E, a decoder G, and an RVQ quantizer with L = 9 codebooks of 1024 entries in dimension 8, operating at a frame rate of approximately 86 Hz (7.7 kbps full-rate). The 9 stages are partitioned into K = 4 ordered groups (3-2-2-2 allocation) targeting bass (0-1 kHz), low-mid (1-4 kHz), high-mid (4-10 kHz), and treble (10-22 kHz).

To preserve harmonic context, cumulative decoding computes each group's reconstruction from the cumulative quantized latent rather than isolated contributions. To encourage spectral specialization without gradient imbalances, subband contribution supervision applies a frequency-weighted mel reconstruction loss to each group's isolated waveform increment using stop-gradients on prior cumulative latents. Soft band weighting employs normalized Gaussians with learnable centers mu_k and bandwidths sigma_k over M = 80 mel bins, alongside a fixed floor beta = 0.3 to prevent edge artifacts. Group dropout with probability p_drop = 0.5 samples the number of active groups during training to support variable-bitrate decoding by truncation at inference.

At inference, HARP reduces to standard RVQ with zero overhead: no additional parameters, identical forward passes, and a single unified token stream.

## Experimental setup

Models are trained on a mixture of music (MUSDB18-HQ, MTG-Jamendo, over 100k in-house tracks), general audio (AudioSet), and speech (LibriTTS train-clean-360). Evaluations use MUSDB18-HQ test set, FSD50K eval, and LibriTTS test-clean. Baselines include standard DAC (identical architecture/hyperparameters without band supervision) and BSCodec (parallel subband decomposition matched in parameter count). Metrics include Scale-Invariant Signal-to-Distortion Ratio (SI-SDR), Kernel Audio Distance (KAD), Perceptual Evaluation of Speech Quality (PESQ), Short-Time Objective Intelligibility (STOI), and MUSHRA listening tests. Training uses 1-second random crops, batch size 16 across 4 GPUs, for up to 100 epochs (~1M steps).

## Results

HARP consistently outperforms DAC and BSCodec across all evaluation domains and metrics. At full bitrate (7.7 kbps), HARP achieves SI-SDR of 9.22 dB on music (vs 8.97 for DAC, 7.96 for BSCodec), 10.71 dB on speech (vs 9.75 for DAC, 9.24 for BSCodec), and 7.39 dB on general audio (vs 7.06 for DAC, 6.52 for BSCodec). KAD is similarly improved across all domains. At a low bitrate of 2.6 kbps, HARP yields an average +0.6 dB SI-SDR improvement over DAC. MUSHRA listening tests confirm perceptual gains, scoring 68 vs 59 at 4.3 kbps and 90 vs 84 at 7.7 kbps. Ablation studies reveal that removing cumulative decoding causes the largest drop (-1.4 dB SI-SDR), followed by removing band supervision (-1.0 dB), rectangular band splitting (-0.4 dB), and removing stop-gradients (-0.3 dB).

| Domain | Method | SI-SDR (dB) ↑ | KAD ↓ |
|---|---|---|---|
| Music | DAC | 8.97 | 0.35 |
| Music | BSCodec | 7.96 | 0.30 |
| Music | HARP | **9.22** | **0.29** |
| Speech | DAC | 9.75 | 0.19 |
| Speech | BSCodec | 9.24 | 0.16 |
| Speech | HARP | **10.71** | **0.14** |

## Limitations

Training incurs a 2-3x computational overhead in decoder forward passes due to subband supervision compared to standard DAC. The approach relies on predefined frequency groupings and mel-scale assumptions that may require tuning when adapting to extreme audio bandwidths or non-standard sample rates outside the 24-44.1 kHz range.

## Why read this

Speech and audio ML researchers working on neural codecs or downstream generative speech/audio models should read this to see how spectral structure and hierarchical bitrate scaling can be cleanly injected via the training loss alone, avoiding the architectural fragmentation of parallel codecs.

## Code

- https://github.com/QiaoyuYang/HARP

## Applications

Low-bitrate neural audio compression, variable-bitrate audio streaming, and discrete token extraction for speech and music generative language models.

## Institutions / 機構

Georgia Institute of Technology, Chinese University of Hong Kong, Tencent Music Entertainment

## Related

- (link related pages by id as the wiki grows)
