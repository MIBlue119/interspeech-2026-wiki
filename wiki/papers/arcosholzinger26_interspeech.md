---
id: arcosholzinger26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2719
pdf: https://www.isca-archive.org/interspeech_2026/arcosholzinger26_interspeech.pdf
---

# GRIDS: Dimensionality-Aware Anomaly Detection in Learned Representations of Self-Supervised Speech Models

[PDF](https://www.isca-archive.org/interspeech_2026/arcosholzinger26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arcosholzinger26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2719)

**TL;DR** — The paper introduces GRIDS, a framework that leverages Local Intrinsic Dimensionality (LID) across transformer layers of self-supervised speech models to monitor geometric representation shifts, yielding an AUROC of 0.78-1.00 for anomaly detection under perturbation.

## Problem

Self-supervised speech models (S3Ms) achieve strong downstream performance, yet how their internal representations deform under natural and adversarial perturbations remains poorly understood. Existing representation analyses rely on global dimensionality or similarity metrics like CKA, which fail to capture local geometric distortions or track per-sample manifold anomalies. This lack of transcript-free diagnostic tools hinders reliable robustness monitoring in speech recognition pipelines.

## Method

The GRIDS framework computes Local Intrinsic Dimensionality (LID) across all 12 transformer layers of WavLM and wav2vec 2.0 models using Levina-Bickel maximum likelihood estimation on $k$-nearest neighbor distances ($k=50$). Frame embeddings are pooled across utterances and standardized per layer for clean, benignly corrupted (Gaussian, babble, and speech noise), and PGD-adversarial (MSE and CTC-based attacks) inputs under matched target-SNR conditions ranging from 0 dB to 40 dB. The resulting 12-dimensional layer-wise LID vectors are analyzed for geometric trajectories, correlated with automatic speech recognition word error rates, and used to train anomaly detectors distinguishing adversarial from benign distortions.

## Results

Evaluated on LibriSpeech data using WavLM and wav2vec 2.0, the approach demonstrates that LID increases uniformly for low-SNR perturbations while diverging at high SNR where benign noise converges to clean profiles and adversarial inputs maintain early-layer LID elevation. Increases in layer-wise LID strongly co-occur with rising word error rates (WER) in downstream ASR decoding. Furthermore, 12-dimensional LID feature vectors achieve strong anomaly detection performance with AUROC scores ranging from 0.78 to 1.00 in identifying adversarial versus benign conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and security researchers can use this framework for transcript-free monitoring of S3M robustness, detecting adversarial audio attacks, and diagnosing representation degradation in speech recognition systems.

## Related

- (link related pages by id as the wiki grows)
