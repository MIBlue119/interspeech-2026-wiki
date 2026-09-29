---
id: jang26_interspeech
category: speech-coding
labels: [efficient-on-device]
institutions: ["Electronics and Telecommunications Research Institute", "University of Illinois Urbana-Champaign"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-878
pdf: https://www.isca-archive.org/interspeech_2026/jang26_interspeech.pdf
---

# End-to-End Model Compression for Personalized Neural Speech Codecs

*Inseon Jang, Minje Kim, Wootaek Lim, Seungkwon Beack*

[PDF](https://www.isca-archive.org/interspeech_2026/jang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-878)

**Category:** `speech-coding` · **Labels:** `efficient-on-device`

**TL;DR** — The paper introduces Personalized DAC (PDAC), an end-to-end speaker-aware model compression framework for neural speech codecs that clusters speakers by perceptual similarity to train group-specific encoders and decoders. PDAC achieves a 96% reduction in model size and 50% lower bitrate (1 kbps instead of 2 kbps) while maintaining the perceptual quality of the uncompressed state-of-the-art Descript Audio Codec (DAC).

## Key contributions

- Extends speech codec personalization end-to-end to jointly compress the encoder, decoder, and residual vector quantizer, unlike prior methods like PLPCNet that only personalized the decoder.
- Formulates an exclusive (sparse) Mixture of Local Experts (MoLE) architecture where only a single group-specific encoder-decoder pair is active during inference, saving computation.
- Integrates noise-robust speaker embeddings via a Siamese network with 32-unit GRU layers, enabling robust speaker classification and joint speech denoising under noisy conditions (-5 to 10 dB SNR).
- Demonstrates that even with misclassified speaker group assignments, personalized small models outperform generic baseline codecs at bitrates below ~3 kbps.

## Problem

Modern neural speech codecs like BigCodec, SuperCodec, and standard DAC deliver exceptional compression and reconstruction quality, but their large parameter counts (ranging from 15M to 159M parameters) and heavy computational footprints make real-time execution on resource-constrained, low-power edge devices infeasible. Prior speaker-agnostic compression techniques (such as depthwise separable convolutions or sparse matrices) struggle to strike an optimal balance between model efficiency and perceptual quality. Meanwhile, earlier personalized approaches like PLPCNet only personalized the downstream vocoder while leaving the heavy non-neural encoder uncompressed, and were validated exclusively on clean speech without accounting for acoustic distortions.

## Method

The PDAC framework consists of a noise-robust speaker encoder $F(\cdot)$ implemented as a Siamese network with two 32-unit GRU layers, which extracts a speaker embedding vector $\mathbf{z}$ from noisy input speech $\mathbf{x} = \mathbf{s} + \mathbf{n}$. These embeddings are pre-clustered into $C = 4$ speaker groups using k-means based on Euclidean distance to cluster centroids $\boldsymbol{\mu}^{(c)}$. At inference, the input speaker is mapped to the nearest group index $c^* = \arg\min_c \|\mathbf{z} - \boldsymbol{\mu}^{(c)}\|_2$. Only the group-specific utterance encoder $G^{(c^*)}(\cdot)$ is executed to produce the compressed bitstream $\mathbf{y}$, which is transmitted alongside the discrete group index $c^*$. The receiver uses this index to route the bitstream to the corresponding personalized decoder $D^{(c^*)}(\cdot)$ to reconstruct the clean speech $\hat{\mathbf{s}}$.

Building upon the DAC architecture (which utilizes hierarchical downsampling/upsampling convolutional blocks with residual vector quantization), the authors scale down dimensions to build Small and Tiny variants. The baseline DAC-Large features a 74.18M parameter model with encoder dimension 64, latent dimension 1024, decoder dimension 1536, and 12 codebooks of size 1024. The proposed PDAC-Small reduces these to encoder dimension 36, latent dimension 576, decoder dimension 576, and 6 codebooks, yielding 14.99M parameters (approx. 20% of DAC-L). The PDAC-Tiny further compresses the model to encoder/latent/decoder dimensions of 16/256/256 with 6 codebooks, dropping parameter count to just 3.02M (4% of DAC-L). Each specialist model pair $(G^{(c)}, D^{(c)})$ is optimized end-to-end to reconstruct clean target speech from noisy input mixtures, effectively combining speech coding and speech enhancement into a single framework.

## Experimental setup

Evaluated on the LibriSpeech dataset, using train-clean-100 (100 hours from 251 speakers) for training, and dev-clean/test-clean for validation and testing at 16 kHz. Noisy training and validation setups combined LibriSpeech with 628 MUSAN noise types (uniform SNR from -5 to 10 dB), while testing used 54 Sound-Bible sources. Compared against uncompressed baselines (DAC-Large, DAC-Small, DAC-Tiny) across MUSHRA subjective listening tests evaluated by 8 expert listeners, alongside objective metrics including Mel distance, STFT distance, scale-invariant SDR (SI-SDR), and PESQ. Trained using the Adam optimizer ($\beta_1=0.8, \beta_2=0.99$) with an initial learning rate of $10^{-4}$ and batch size of 72.

## Results

Subjective MUSHRA evaluations demonstrate that PDAC-Small and PDAC-T consistently outperform their generic, uncompressed DAC-Large and DAC-Small counterparts at equivalent bitrates (1 kbps and 2 kbps) under both clean and noisy conditions. Notably, PDAC-Tiny operating at an aggressive 1 kbps achieves perceptual quality comparable to or better than the 74M-parameter DAC-Large baseline operating at 2 kbps, representing a 96% reduction in model size and a 50% drop in bitrate. In acoustic noise evaluations, PDAC-T effectively removes interfering background sounds while preserving speech formant structures, outperforming uncompressed DAC-T which suffers from residual artifacts. Ablations on speaker group misclassification show that while correct group assignment maximizes objective metrics (Mel distance, STFT distance, SI-SDR, PESQ), even misclassified PDAC-S models outperform standard DAC-S at bitrates below ~3 kbps because the localized subspace modeling gain outweighs the misclassification penalty.

| System | Bitrate (kbps) | Model Size (# Params) | MUSHRA Score (Clean) | MUSHRA Score (Noisy) |
|---|---|---|---|---|
| DAC-Large (Baseline) | 2.0 | 74.18M | ~82 | — |
| DAC-Small | 2.0 | 14.99M | ~65 | — |
| PDAC-Small (Proposed) | 2.0 | 14.99M (1 active) | ~88 | — |
| DAC-Tiny | 1.0 | 3.02M | ~40 | ~35 |
| PDAC-Tiny (Proposed) | 1.0 | 3.02M (1 active) | ~80 | ~75 |

## Limitations

The current framework assumes speaker identity remains stable over extended intervals and updates the speaker classification group index every 1–2 seconds rather than per frame, which may introduce latency or mismatch in rapid conversational turn-taking. The evaluation is restricted to English corpora (LibriSpeech) and controlled synthetic noise mixes (MUSAN/Sound-Bible), leaving open questions regarding cross-lingual generalization and performance in real-world reverberant environments. Furthermore, the system relies on pre-computed unsupervised k-means clustering into $C=4$ discrete speaker groups, which may under-represent highly diverse acoustic profiles outside the training distribution.

## Why read this

Speech and ML engineers building ultra-low-bitrate and resource-constrained on-device audio communication systems should read this paper to learn how sparse Mixture of Local Experts (MoLE) and speaker personalization can slash neural codec footprints by 96% without sacrificing perceptual fidelity.

## Code

- https://github.com/descriptinc/descript-audio-codec

## Applications

Low-power real-time voice communication apps, satellite communications, IoT audio edge devices, and bandwidth-constrained speech transmission channels.

## Institutions / 機構

Electronics and Telecommunications Research Institute, University of Illinois Urbana-Champaign

**Funding / 經費:** Electronics and Telecommunications Research Institute

## Related

- (link related pages by id as the wiki grows)
