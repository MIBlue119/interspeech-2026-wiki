---
id: nitsu26_interspeech
category: enhancement-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2027
pdf: https://www.isca-archive.org/interspeech_2026/nitsu26_interspeech.pdf
---

# Pseudo-Spatially Conditioned TF-Locoformer with MHCA+FiLM Fusion for Single-Channel Speech Separation

*Daichi Nitsu, Koichi Shinoda*

[PDF](https://www.isca-archive.org/interspeech_2026/nitsu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nitsu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2027)

**Category:** `enhancement-separation`

**TL;DR** — The paper introduces pseudo-spatial conditioning for single-channel speech separation, using multi-channel mixtures as privileged training information to pretrain a spatial encoder via contrastive triplet loss. Combined with an MHCA+FiLM fusion module on TF-Locoformer, it improves SI-SNRi on WHAMR! from 18.6 to 18.9 dB (Medium model) with only a 1.2M parameter overhead.

## Key contributions

- Proposes a pseudo-spatial conditioning framework that transfers multi-channel spatial geometry insights into single-channel inference without requiring multi-channel hardware at test time.
- Designs a contrastive triplet pretraining objective for a ResNet spatial encoder using multi-channel mixtures as privileged information, reducing sensitivity to speech content while emphasizing room/geometric configuration.
- Introduces an MHCA+FiLM (Multi-Head Cross-Attention + Feature-wise Linear Modulation) fusion module to condition TF-Locoformer backbone features layer-by-layer.
- Demonstrates consistent gains on noisy/reverberant WHAMR! (+0.34 dB mean SI-SNRi, 95% CI [0.32, 0.37]) and noise-free NF-WHAMR! benchmarks.

## Problem

Single-channel (SC) speech separation in noisy and reverberant environments lacks explicit inter-channel spatial cues (such as ITD, ILD, and IPD) available to multi-channel (MC) systems, leading to higher separation ambiguity. Prior techniques either ignore spatial geometry entirely or only employ unsupervised spatial clustering and reconstruction objectives. Without spatial awareness, state-of-the-art SC models like Conv-TasNet, SepFormer, and TF-Locoformer struggle to resolve sources under severe room acoustics, making it critical to find ways to inject spatial geometry into monaural setups.

## Method

The method operates in two stages: contrastive spatial representation learning and joint fine-tuning with a separator. First, an SC encoder (E_sc) and an MC encoder (E_mc) with independent ResNet weights are pretrained using a margin-based triplet loss ($\alpha = 0.2$). The real-valued RI STFT stack uses 2 channels for SC ($M=1$, anchor) and 4 channels for MC ($M=2$, positive/negative with different speakers/utterances but identical vs. varying room dimensions and source/mic geometry). The encoder output applies Global Statistics Pooling (concatenating mean and standard deviation over time and frequency) and $L_2$ normalization to yield a $d=256$ dimensional embedding.

During separation training, the pretrained SC spatial encoder is jointly fine-tuned alongside the TF-Locoformer backbone (evaluated in Small and Medium sizes). A novel MHCA+FiLM fusion module conditions the time-frequency features before each of the $B$ TF-Locoformer blocks. Specifically, multi-head cross-attention (4 heads) treats the projected fixed spatial embedding as a single query token and the flattened TF features (2D convolution with gLN output $Z \in \mathbb{R}^{D \times T \times F}$) as keys and values. The adaptive embedding is aggregated via a residual connection with a learnable scaling vector $\lambda$ initialized to zero.

Finally, Feature-wise Linear Modulation (FiLM) generates affine parameters $\gamma, \beta \in \mathbb{R}^D$ from the updated embedding to modulate the TF features across time and frequency via broadcasting. The network is trained end-to-end optimizing SI-SNR loss using Permutation Invariant Training (PIT) with AdamW, an initial learning rate of $1 \times 10^{-3}$ with a 4k-step warm-up, and inverse STFT is applied to recover the time-domain waveforms.

## Experimental setup

Evaluated on the WHAMR! dataset (30h train, 10h val, 5h test at 8 kHz sampling rate with urban noise and Pyroomacoustics reverberation, $T_{60}$ 0.1-1.0s) and its noise-free counterpart NF-WHAMR!. Baselines include Conv-TasNet, SepFormer + DM, TF-GridNet, MossFormer2 + DM, SepReformer-L + DM, and standard TF-Locoformer (Small and Medium). Metrics are SI-SNRi and SDRi in dB. Implemented using ESPnet-SE++ on a single NVIDIA H100 GPU with STFT $N_{fft}=256$, hop length 64, and early stopping rules.

## Results

On WHAMR!, TF-Locoformer (S) SI-SNRi improves from 17.4 to 17.7 dB and SDRi from 15.9 to 16.1 dB (+1.0M parameters). TF-Locoformer (M) improves from 18.6 to 18.9 dB SI-SNRi and 16.9 to 17.2 dB SDRi (+1.2M parameters), outperforming all competing systems including MossFormer2 + DM (17.0 dB) and SepReformer-L + DM (17.1 dB). On NF-WHAMR!, TF-Locoformer (S) increases by +0.6 dB in both SI-SNRi (22.0 dB) and SDRi (20.0 dB).

Ablations on the fusion module demonstrate that combining MHCA with FiLM and a trainable encoder yields the highest SI-SNRi (17.7 dB). Varying the triplet content shows that using different speakers and utterances for positive/negative pairs is crucial (17.7 dB vs 17.5 dB for same content). Mismatched inference conditioning or global average embeddings cause SI-SNRi to drop to 17.0-17.1 dB, proving the model actively exploits the spatial embedding.

| System / Condition | SI-SNRi (dB) | SDRi (dB) |
| --- | --- | --- |
| Conv-TasNet | 8.3 | – |
| SepFormer + DM | 14.0 | 13.0 |
| TF-GridNet | 17.1 | 15.6 |
| TF-Locoformer (M) [11] | 18.6 | 16.9 |
| Proposed Method (S) | 17.7 | 16.1 |
| Proposed Method (M) | 18.9 | 17.2 |

## Limitations

The method relies on multi-channel data availability during the training phase as privileged information, restricting its use to domains where multi-channel simulations or recordings are accessible. Evaluation is restricted to simulated rooms (Pyroomacoustics) and specific acoustic variations (WHAMR! distribution), leaving real-world generalization across diverse acoustic footprints unverified.

## Why read this

Speech and ML researchers building single-channel separation systems will learn how to effectively incorporate multi-channel geometric priors during training via contrastive learning and cross-attention/FiLM fusion without adding excessive inference overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Single-channel speech separation, hearing aids, robust automatic speech recognition front-ends, teleconferencing enhancement.

## Institutions / 機構

Institute of Science Tokyo

**Funding / 經費:** JSPS KAKENHI

## Related

- (link related pages by id as the wiki grows)
