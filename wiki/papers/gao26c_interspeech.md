---
id: gao26c_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-482
pdf: https://www.isca-archive.org/interspeech_2026/gao26c_interspeech.pdf
---

# UD-ASD: A Unified Diffusion Model for Anomalous Sound Detection

[PDF](https://www.isca-archive.org/interspeech_2026/gao26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gao26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-482)

**TL;DR** — UD-ASD is a unified conditional diffusion model for anomalous sound detection that monitors multiple machine types simultaneously using a lightweight condition projector and a Gaussian mixture model, achieving state-of-the-art results on DCASE2022 Task 2 with a harmonic mean AUC/pAUC improvement over baselines.

## Problem

Traditional anomalous sound detection methods rely on hand-crafted features with poor generalization, while self-supervised methods are sensitive to ambient noise and metadata availability. Generative approaches like autoencoders and standard diffusion models require training a separate model for every single machine type, causing prohibitive storage and training costs in multi-machine environments. Furthermore, standard autoencoders often fail by learning identity functions, whereas isolated single-machine models miss out on cross-domain representation learning.

## Method

The framework takes 10-second audio clips converted into log-Mel spectrograms (256x256 resolution via 1024-point FFT and 256 Mel filters) and processes them through three core components: a lightweight Condition Projector (CP) that maps discrete machine IDs into dense condition embeddings, a conditional denoising diffusion model trained exclusively on normal data using the DDPM framework (implemented as a 24.4M-parameter UNet with 1000 diffusion steps, cosine learning rate schedule, and AdamW optimizer), and a Gaussian Mixture Model (GMM) with two mixture components and full covariance matrices for anomaly scoring. During training, the condition embedding is concatenated across channels with the corrupted log-Mel spectrograms at each layer. During inference, the Denoising Diffusion Implicit Model (DDIM) sampler accelerates generation in 100 steps, after which temporal pooling extracts a 256-dimensional vector from the reconstruction errors to compute the negative log-likelihood under the GMM.

## Results

Evaluated on the DCASE2022 Challenge Task 2 development dataset comprising seven machine types with three sections each (1,000 normal clips per section for training, 50 normal and 50 anomalous clips for testing). The unified model (UD-ASD-U) achieves top performance across multiple machine classes, outperforming the official dense autoencoder baseline by 36.95% AUC on the Fan dataset and yielding superior overall harmonic mean scores. Ablation studies confirm that the GMM anomaly scoring function significantly outperforms standard L1 and L2 norms by properly capturing the bimodal distribution of reconstruction errors, with the GMM achieving 79.83% source AUC compared to 73.97% (L1) and 74.41% (L2). On an NVIDIA A40 GPU, the model achieves an average inference time of 0.32 seconds per audio clip.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Industrial IoT and manufacturing facilities needing real-time, non-contact acoustic monitoring for equipment malfunctions across multiple machinery types.

## Limitations

The model requires accurate machine identity labels during inference and cannot perform zero-shot detection on entirely unseen machine types.

## Related

- (link related pages by id as the wiki grows)
