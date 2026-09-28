---
id: xiang26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1357
pdf: https://www.isca-archive.org/interspeech_2026/xiang26_interspeech.pdf
---

# Quantifying the Uncertainty of Blindly Estimated Room Embeddings Using a Dispersion-Calibrated Score

*Yang Xiang, Philipp Götz, Emanuël A. P. Habets, Andreas Walther, Wenwu Wang, Philip J.B. Jackson*

[PDF](https://www.isca-archive.org/interspeech_2026/xiang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xiang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1357)

**TL;DR** — This paper proposes a three-stage framework to learn robust task-agnostic room embeddings from reverberant speech and a lightweight uncertainty score that predicts embedding reliability under corruptions. The method achieves an RIR verification average precision of 0.99 and a global uncertainty-dispersion Spearman correlation of 0.90.

## Key contributions

- Identifies multi-view batch construction (multiple speech realizations per RIR) as a key driver of robustness to speech-content variation under latent alignment.
- Combines KL-based alignment to a frozen RIR-VAE latent space with a multi-positive contrastive term for enhanced room representation verification.
- Introduces a dispersion-calibrated uncertainty score trained via a margin-based ranking loss to map corruption-induced embedding shifts to a single-utterance uncertainty estimate.
- Demonstrates effective selective prediction using the proposed uncertainty score across waveform and spectrogram-level acoustic corruptions.

## Problem

Reverberant speech representations are frequently confounded by non-room factors such as speech content, speaker variability, and recording degradation like noise and dropouts. Prior approaches either focus on task-specific blind inference or task-agnostic representation learning without adequately quantifying whether an embedding should be trusted under acoustic distortions. This unreliability degrades downstream task performance when representations are deployed in uncontrolled environments, motivating the need for a general-purpose, single-utterance uncertainty score that indicates representation reliability.

## Method

The training pipeline comprises three stages. Stage-1 pretrains a Variational Autoencoder (VAE) on RIR log-mel spectrograms to form a structured latent space, parameterized with a latent tensor of size 64 x 4 x 16 (64 channels, 4 frequency bins, 16 time frames) and trained with an L2 reconstruction loss and a KL regularizer ($\lambda_1 = 0.05$).

Stage-2 trains a speech encoder consisting of a strided 2D CNN front-end followed by a 3-layer Transformer with attention pooling, producing an utterance-level embedding $z_Y \in \mathbb{R}^D$ ($D = 4096$). The encoder is anchored to the frozen RIR-VAE posterior via a KL divergence term and trained with a multi-positive contrastive loss ($\tau = 0.1$, $\lambda_2 = 1/13$) using multi-view batch structures where multiple anechoic speech segments share the same RIR.

Stage-3 freezes the speech encoder and trains a lightweight uncertainty head—a 2-layer MLP with a hidden size of 256 and a Softplus output activation—to predict scalar uncertainty $U$. The head is supervised using a margin-based ranking loss ($\gamma = 0.1$) that forces uncertainty scores to be order-consistent with the cosine distance dispersion $\delta$ between clean anchor embeddings and corruption-induced embeddings. At inference time, the model requires only a single corrupted utterance to output both the room embedding and its reliability score.

## Experimental setup

The evaluation utilizes anechoic utterances from the EARS dataset and 3,000 measured RIRs sourced from 17 public datasets (e.g., ACE Challenge, AIR-IKS, ASHIR, BUT ReverbDB), partitioned disjointly by RIR identity into training (89 hours), validation (11 hours), and testing (11 hours) splits. Acoustic corruptions include additive waveform pink noise (SNR 15-25 dB mild, 5-15 dB medium, -5-5 dB severe) and SpecAugment-style frequency (5-35%) and time masking (0-30%). Baselines include FiNS and MRL-SV/MRL-MV variants. Metrics include RIR verification Average Precision (AP), log-mel reconstruction MAE in dB, MAPE for $T_{60}$, MAE for $C_{50}$, Spearman correlation $\rho(U, \delta)$, and selective prediction coverage curves.

## Results

The proposed method achieves an RIR verification Average Precision of 0.99, outperforming MRL-SV (0.95) and MRL-MV (0.98), and matches or slightly improves reconstruction and parameter estimation tasks compared to MRL-MV (e.g., MAPE $T_{60}$ of 12.86% vs 12.87% for MRL-MV and 16.67% for MRL-SV). For uncertainty-dispersion consistency, the proposed score achieves a global Spearman correlation $\rho(U, \delta)$ of 0.90, outperforming MRL-MV (0.85) and raw severity controls across additive noise (0.83 vs 0.59), frequency masking (0.79 vs 0.66), and time masking (0.86 vs 0.68).

In selective prediction evaluations, uncertainty-sorted subsets exhibit steadier performance improvements than severity-sorted subsets as coverage decreases, validating the score's finer-grained reliability ranking.

| System | AP $\uparrow$ | MAE_rec (dB) $\downarrow$ | MAPE_T60 (%) $\downarrow$ | MAE_C50 (dB) $\downarrow$ |
|---|---|---|---|---|
| FiNS [6] | 0.82 | 9.59 | 29.08 | 2.90 |
| MRL-SV (KL) [11] | 0.95 | 4.76 | 16.67 | 1.90 |
| MRL-MV (KL) | 0.98 | 4.04 | 12.87 | 1.49 |
| Proposed (Ctr+KL) | 0.99 | 4.06 | 12.86 | 1.50 |

## Limitations

The uncertainty score $U$ is a dispersion-calibrated heuristic rather than a true Bayesian posterior uncertainty. Stage-3 training relies on paired clean and corrupted views to compute dispersion targets. The dataset split is strictly by RIR identity rather than fully room-disjoint, and the evaluated corruptions (pink noise, synthetic time/frequency masks) do not cover complex in-the-wild acoustic degradations such as interfering speakers, device mismatch, or audio clipping.

## Why read this

Speech and ML researchers working on acoustic environment estimation and robust representation learning should read this to see how multi-view contrastive training and rank-based dispersion calibration can yield reliable task-agnostic uncertainty metrics for single-utterance inference.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust speech processing, acoustic environment monitoring, and selective prediction filtering for downstream room parameter estimation.

## Related

- (link related pages by id as the wiki grows)
