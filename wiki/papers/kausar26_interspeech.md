---
id: kausar26_interspeech
category: asr
institutions: ["Chinese University of Hong Kong, Shenzhen", "Harbin Institute of Technology"]
code: https://github.com/hello1233-maker/DisenEEG-Net
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1703
pdf: https://www.isca-archive.org/interspeech_2026/kausar26_interspeech.pdf
---

# DisenEEG-Net: Disentangling EEG features via sufficient information bottleneck and adversarial learning for cross-subject auditory attention detection

*Tasleem Kausar, Yuan Liao, Haoqi Hu, Siqi Cai, Haizhou Li*

[PDF](https://www.isca-archive.org/interspeech_2026/kausar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kausar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1703)

**Category:** `asr`

**TL;DR** — DisenEEG-Net is an end-to-end framework for cross-subject auditory attention decoding that disentangles EEG representations into orthogonal task- and subject-specific subspaces using information bottlenecks and adversarial learning, achieving 75.9% accuracy on the KUL dataset with 1-second windows.

## Key contributions

- Proposes a parallel spatio-temporal Transformer encoder (combining multi-scale 1D temporal convolutions and channel-wise spatial attention) to extract rich contextualized features from raw EEG.
- Formulates a multi-objective feature disentanglement strategy using orthogonal projection to enforce non-overlapping task and subject subspaces.
- Integrates a sufficient information bottleneck (SIBT) and adversarial training with gradient reversal to retain essential subject variation while purging task leakage from domain-specific features.
- Validates robust cross-subject generalization under a leave-one-subject-out (LOSO) scheme across three public benchmarks: KUL, DTU, and AVED.

## Problem

Auditory Attention Decoding (AAD) for neuro-steered hearing aids suffers from severe performance degradation when applied to unseen individuals due to high inter-subject EEG variability and domain shift. Prior methods—ranging from traditional CNNs and LSTMs to modern Graph Neural Networks and standard Transformers—lack principled mechanisms to separate subject-specific physiological noise from task-relevant auditory attention signals. This limitation prevents robust cross-subject generalization, which is critical for real-world deployment in practical hearing assistive devices.

## Method

DisenEEG-Net processes raw multi-channel EEG inputs (C=64 channels, T time points) through two parallel pathways: a temporal pathway using multi-scale 1D convolutions (pointwise followed by three parallel depthwise convolutions and average pooling) yielding embeddings of dimension P=16 and D=128, and a spatial pathway using a lightweight global pooling module. Both streams are augmented with learnable positional encodings and processed by dedicated 2-layer Transformer encoders (8 attention heads). The outputs are fused into a latent space z, which is then mapped via an orthogonal complementary projection matrix into task-specific (z_task) and subject-specific (z_dom) subspaces.

To ensure clean separation, the framework optimizes a composite loss combining: (i) an orthogonal loss (L_ortho) forcing z_task^T z_dom = 0; (ii) an adversarial domain classification loss via a Gradient Reversal Layer (GRL, parameter alpha) to remove subject identity from z_task; (iii) a sufficient information bottleneck loss (L_SIBT) combining KL divergences to preserve necessary subject information in z_dom while filtering out attention-task interference via a standard normal prior N(0, I); (iv) a cross-entropy task classification loss (L_label) on z_task; and (v) a Mean Squared Error reconstruction loss (L_recon) using a decoder with transposed convolutions and linear layers to preserve feature fidelity.

The entire network is trained end-to-end using the AdamW optimizer with an initial learning rate of 1e-4, weight decay of 1e-3, batch size of 64, and a ReduceLROnPlateau scheduler for up to 100 epochs.

## Experimental setup

Evaluated on three public benchmarks under a Leave-One-Subject-Out (LOSO) cross-validation protocol: KUL (16 subjects, 64 channels, 1s/2s windows), DTU (18 subjects, 64 channels, 1s/2s windows), and AVED (10 subjects, 32 channels, audio/video conditions). Compared against baselines including SSF-CNN, MBSSFCC, DGSD, DBPNet, Listennet, and DARNet. Metrics reported are mean classification accuracy percentage and standard deviation across folds using PyTorch.

## Results

DisenEEG-Net achieves state-of-the-art cross-subject accuracy, scoring 75.9% (1s window) and 76.1% (2s window) on the KUL dataset, outperforming DARNet (69.9%) by over 5%. On the DTU dataset, it reaches 57.8% (1s) and 58.7% (2s), and on AVED Audio reaches 54.2% (1s) and 54.5% (2s). Ablation studies demonstrate that removing the temporal encoding branch causes the largest drop (down to 50.2% on DTU), while omitting orthogonal regularization, SIBT, and adversarial losses decreases accuracy by 2.8% to 3.5%. Feature analysis confirms that z_task alone achieves the highest decoding accuracy (76.1% on KUL), whereas combining z_dom and z_task degrades performance, proving effective disentanglement.

| System / Condition | KUL (1s) | KUL (2s) | DTU (1s) | DTU (2s) | AVED-Audio (2s) |
|---|---|---|---|---|---|
| SSF-CNN [9] | 59.3 | 60.8 | 52.3 | 53.4 | 51.4 |
| MBSSFCC [11] | 62.7 | 64.7 | 52.5 | 53.9 | 51.7 |
| DBPNet [14] | 61.1 | 62.3 | 55.5 | 55.8 | 52.8 |
| DARNet [15] | 69.9 | 71.9 | 55.6 | 55.6 | 52.3 |
| DisenEEG-Net (Ours) | 75.9 | 76.1 | 57.8 | 58.7 | 54.5 |

## Limitations

The evaluation relies on relatively small datasets ranging from 10 to 18 subjects, limiting claims regarding scaling to large, highly diverse population cohorts. The study focuses exclusively on controlled laboratory auditory attention paradigms (dichotic listening with azimutal speakers) and does not evaluate performance in noisy real-world acoustic environments with dynamic moving speakers or real-time hearing aid form-factor hardware constraints.

## Why read this

Read this paper if you work on domain generalization or representation learning for biosignals, specifically looking for a principled application of information bottlenecks and adversarial projection to eliminate subject-specific confounds in EEG.

## Code

- https://github.com/hello1233-maker/DisenEEG-Net

## Applications

Neuro-steered hearing aids, brain-computer interfaces (BCIs), and selective auditory attention decoding devices.

## Institutions / 機構

Chinese University of Hong Kong, Shenzhen, Harbin Institute of Technology

**Funding / 經費:** National Natural Science Foundation of China, Shenzhen Science and Technology Program, Program for Guangdong Introducing Innovative and Enterpreneurial Teams, Shenzhen Stability Science Program, Shenzhen Key Lab of Multi-Modal Cognitive Computing, German Research Foundation, Guangdong Provincial Key Laboratory of Big Data Computing, The Chinese University of Hong Kong, Shenzhen

## Related

- (link related pages by id as the wiki grows)
