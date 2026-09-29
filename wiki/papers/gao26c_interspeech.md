---
id: gao26c_interspeech
category: audio-understanding
labels: [generative-model]
institutions: ["University of Science and Technology of China"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-482
pdf: https://www.isca-archive.org/interspeech_2026/gao26c_interspeech.pdf
---

# UD-ASD: A Unified Diffusion Model for Anomalous Sound Detection

*Pengxiang Gao, Yu Qiu, Yanzhi Song*

[PDF](https://www.isca-archive.org/interspeech_2026/gao26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gao26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-482)

**Category:** `audio-understanding` · **Labels:** `generative-model`

**TL;DR** — UD-ASD is a unified conditional diffusion model for anomalous sound detection that eliminates the need for separate models per machine type, achieving a state-of-the-art Hmean of 62.80% on the DCASE2022 Task 2 dataset.

## Key contributions

- Proposes a unified conditional diffusion framework that removes the one-model-per-machine constraint to drastically reduce training and storage overhead.
- Introduces a lightweight Condition Projector (CP) module that maps discrete machine IDs into dense condition embeddings for multi-machine guidance.
- Applies a Gaussian Mixture Model (GMM) with full covariance matrices to model temporal-pooled reconstruction error distributions instead of relying on simple L1/L2 norms.
- Achieves new state-of-the-art performance on the DCASE2022 Task 2 benchmark, outperforming existing generative Autoencoder and diffusion baselines.

## Problem

Traditional anomalous sound detection methods rely heavily on domain-specific feature engineering or self-supervised auxiliary tasks, making them fragile to ambient noise and metadata scarcity. Generative methods like Autoencoders (AEs) and standard diffusion models suffer from poor generalization, trivial identity mapping (for AEs), and the prohibitive cost of training a separate model for every single machine type and operational section. This one-model-per-machine paradigm creates severe deployment bottlenecks in real-world industrial environments monitoring multiple machine streams simultaneously.

## Method

The input audio is converted into a 256x256 log-Mel spectrogram using STFT with 1024-point FFT and 256 Mel filters, rescaled to [-1, 1]. Simultaneously, a lightweight Condition Projector (CP) encodes discrete machine IDs into dense condition embeddings, which are concatenated channel-wise with the spectrogram and injected into each layer of a attention-based UNet backbone (64 base channels, channel multipliers [1, 1, 2, 4], 4 attention heads at resolutions 32, 16, and 8).

The backbone consists of a conditional DDPM trained exclusively on normal operational data over 1000 linear noise schedule steps using the AdamW optimizer (learning rate 2e-4 with cosine scheduler, batch size 32, EMA rate 0.9999). During inference, the DDIM sampler accelerates generation to 100 steps. The model attempts to reconstruct any input as a normal sound; anomalous inputs naturally yield high residuals.

To capture temporal context and complex error dynamics, frame-wise reconstruction errors (x0 - x_tilde_0) undergo temporal pooling across the time axis, yielding a 256-dimensional vector. A GMM with 2 mixture components and full covariance matrices—motivated by bimodal machine noise distributions—is fitted on normal error vectors. The final anomaly score is the negative log-likelihood of a test sample's error vector under this GMM.

## Experimental setup

Evaluated on the DCASE2022 Challenge Task 2 development dataset, featuring 7 machine types across 3 operational sections each (1,000 normal clips per section for training, 50 normal and 50 anomalous clips for testing per section). Baselines include official dense AE (Official-AE), official classification (Official-CLS), Du et al., Yamashita et al., AEGAN-AD, HMIC-AGC, DP-MAE, ASD-Diff, and MFPPG. Metrics reported are Area Under the ROC Curve (AUC), partial AUC (pAUC at FPR=0.1), and their harmonic mean (Hmean). Implemented on an NVIDIA A40 GPU with 24.4M model parameters.

## Results

The unified model UD-ASD-U achieves a headline Hmean of 62.80% (62.80 AUC / corresponding metrics), outperforming the official-AE baseline (52.80% Hmean) and previous specialized generative models like AEGAN-AD (60.82%) and HMIC-AGC (61.91%). On the Fan dataset, UD-ASD-U outperforms the official-AE baseline by 36.95% AUC due to the diffusion model's superior capacity for fine-grained spectral detail reconstruction. 

Ablations demonstrate that replacing simple norms with the GMM significantly boosts performance, raising source AUC from 73.97% (L1) and 74.41% (L2) to 79.83% (GMM). Furthermore, the unified multi-machine training approach (UD-ASD-U, 62.80% Hmean) consistently outperforms the single-machine variant (UD-ASD-S, 60.28% Hmean), proving that cross-domain data acts as a powerful regularizer. The model does not win uniformly on every single machine type, occasionally lagging behind specialized hierarchical models like HMIC-AGC on specific domains (e.g., Valve).

| Systems | Hmean (AUC / pAUC) | Fan (AUC) | Bearing (AUC) | Slider (AUC) |
|---|---|---|---|---|
| Official-AE | 52.80 | 41.16 | 59.93 | 58.95 |
| AEGAN-AD | 60.82 | 62.47 | 69.34 | 78.30 |
| HMIC-AGC | 61.91 | 57.63 | 68.14 | 80.76 |
| UD-ASD-S | 60.28 | 76.23 | 81.54 | 86.50 |
| UD-ASD-U (Ours) | 62.80 | 78.11 | 68.37 | 87.45 |

## Limitations

The framework strictly requires accurate metadata labels for the Condition Projector during training and inference, making it vulnerable in unlabelled or mislabelled environments. It is not architected for zero-shot generalization to entirely unseen machine types absent from the training distribution. Additionally, while DDIM acceleration brings inference time down to 0.32 seconds per 10-second clip on an NVIDIA A40 GPU, multi-step diffusion inference remains computationally heavier than standard Autoencoders.

## Why read this

Speech and ML engineers building industrial audio monitoring systems should read this paper to learn how to collapse multi-model machine deployments into a single conditional diffusion architecture. It provides concrete recipes for combining DDIM sampling efficiency, cross-domain regularization, and GMM residual modeling for robust anomaly scoring.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Industrial predictive maintenance, automated factory acoustic surveillance, real-time machinery fault diagnosis, and edge-based acoustic monitoring.

## Institutions / 機構

University of Science and Technology of China

**Funding / 經費:** NSF of China, Major Project of Science and Technology Innovation Tackling Plan of Anhui Province, Fundamental Research Funds for the Central Universities

## Related

- (link related pages by id as the wiki grows)
