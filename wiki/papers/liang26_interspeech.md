---
id: liang26_interspeech
category: resources-evaluation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-342
pdf: https://www.isca-archive.org/interspeech_2026/liang26_interspeech.pdf
---

# DNSMOS-C: Improving End-to-end Speech Quality Models via Contrastive Learning

*Xinyu Liang, Fredrik Cumlin, Victor Ungureanu, Chandan K. A. Reddy, Christian Schüldt, Saikat Chatterjee*

[PDF](https://www.isca-archive.org/interspeech_2026/liang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-342)

**Category:** `resources-evaluation`

**TL;DR** — DNSMOS-C is a compact end-to-end speech quality assessment model that integrates a MOS-guided triplet contrastive loss directly into intermediate representations, achieving improved correlation and generalization without extra inference overhead.

## Key contributions

- Introduces DNSMOS-C, a lightweight end-to-end MOS prediction model integrating MOS-guided contrastive supervision directly on intermediate latent features.
- Adapts the multi-stage SCOREQ triplet loss into a unified, single-stage training pipeline without relying on heavy pre-trained SSL encoders.
- Demonstrates consistent improvements in correlation-based metrics (LCC, SRCC) and better cross-domain robustness across multiple datasets.
- Reveals through PCA and clustering analyses that the contrastive supervision induces an emergent, low-dimensional quality ordering in the latent space.

## Problem

Traditional subjective evaluations like MOS are expensive and slow, while non-intrusive objective SQA models either rely on heavily parameterized self-supervised learning (SSL) encoders and multi-stage training (such as SCOREQ) which hinder real-time deployment, or use lightweight convolutional models (like DNSMOS Pro) that struggle to generalize under domain shifts and unseen distortions. These prior approaches force a compromise between real-time inference efficiency and robust out-of-domain generalization. Addressing this limitation is crucial for dependable, low-latency speech quality monitoring in modern streaming, VoIP, and generative audio pipelines.

## Method

DNSMOS-C builds directly upon the DNSMOS Pro architecture, featuring an encoder $f_{\text{enc}}$ composed of four convolutional layers (3x3 kernels, 32-64 channels, batch normalization, ReLU activations, dropout of 0.3, and a 3x3 max-pooling layer) followed by a global max-pooling layer that projects input clips to a 64-dimensional embedding vector. The head module $f_{\text{head}}$ consists of three fully-connected layers and a linear transformation mapping embeddings to the parameters of a Gaussian posterior distribution, predicting both mean $\mu(\mathbf{x})$ and variance $\sigma^2(\mathbf{x})$ for each audio clip.

The training objective combines the Gaussian negative log-likelihood (GNLL) loss ($L_{\text{gnll}}$) with an adapted version of the SCOREQ triplet-based contrastive regression loss ($L_{\text{scoreq}}$). Applied directly to the intermediate encoder embeddings $e_i$, the triplet loss uses Euclidean distance $d(\cdot,\cdot)$ and a margin $\delta = 0$ to pull representations of speech clips with similar perceptual quality closer together while separating those with divergent MOS values. The total loss is formulated as $\mathcal{L} = L_{\text{gnll}} + \lambda L_{\text{scoreq}}$, where the weighting factor $\lambda$ is set to 1 based on validation performance.

At inference time, the contrastive components are stripped away, leaving an identical computational footprint to DNSMOS Pro. The model processes input clips in a fully end-to-end manner to output the predicted MOS mean $\hat{y} = \mu(\mathbf{x})$ alongside an uncertainty measure via the estimated variance $\sigma^2(\mathbf{x})$ for downstream quality control.

## Experimental setup

Models were trained on three datasets: BVCC (4,974 train samples, English, TTS/VC synthetic), Tencent (8,000 train samples, Mandarin, simulated distortions), and NISQA TRAIN/VAL SIM (10,000 train samples, English, simulated distortions). Evaluation is performed across these and several unseen test sets including NISQA TEST FOR, NISQA TEST P501, NISQA TEST LIVETALK (German, real recordings), TCD-VoIP, LibriAugmented1600, and ESC50. Baselines compare DNSMOS-C against DNSMOS Pro across 10 independent training runs of 500 epochs using the Adam optimizer with a learning rate of $10^{-4}$ ($\beta_1 = 0.9, \beta_2 = 0.999$), inputting 16 kHz audio padded/cropped to 10 seconds represented as log-magnitude spectrograms (20 ms window, 10 ms hop).

## Results

On in-domain test evaluations across BVCC, NISQA SIM, and Tencent, DNSMOS-C consistently outperforms DNSMOS Pro in correlation metrics, achieving higher linear correlation coefficients (LCC) and Spearman rank correlation coefficients (SRCC) with comparable or lower mean squared errors (e.g., on BVCC, LCC improves from 0.791 to 0.803; on Tencent, LCC improves from 0.917 to 0.921). When generalizing to unseen domains using models trained on NISQA SIM and tested on NISQA TEST FOR, DNSMOS-C reaches an LCC of 0.787 compared to DNSMOS Pro's 0.763. Furthermore, DNSMOS-C exhibits lower standard deviations across 10 independent runs, demonstrating enhanced training stability. The primary trade-off is observed in distortion-specific classification: latent space clustering on LA1600 shows a slight drop in separating 16 fine-grained impairment classes (80.4% down to 79.0% accuracy for BVCC models) because the contrastive objective reorganizes the latent space around global perceptual quality rather than discrete distortion types.

| System / Condition | BVCC LCC ↑ | NISQA SIM LCC ↑ | Tencent LCC ↑ | Unseen FOR LCC ↑ |
|---|---|---|---|---|
| DNSMOS Pro | 0.791 ± 0.016 | 0.866 ± 0.008 | 0.917 ± 0.008 | 0.763 ± 0.026 |
| DNSMOS-C (Ours) | 0.803 ± 0.011 | 0.868 ± 0.005 | 0.921 ± 0.005 | 0.787 ± 0.027 |

## Limitations

The evaluation relies heavily on simulated distortion datasets and a limited set of languages (primarily English and Mandarin), potentially restricting generalization to complex, multi-speaker real-world acoustic environments. Additionally, the contrastive optimization trades away fine-grained separation of specific distortion categories in the latent space in exchange for global perceptual quality alignment.

## Why read this

Speech and ML engineers building real-time, resource-constrained quality assessment pipelines will learn how to inject contrastive supervision into compact CNNs without incurring inference overhead or requiring multi-stage pre-training.

## Code

- https://github.com/Hope-Liang/DNSMOS-C

## Applications

Real-time speech quality monitoring in VoIP systems, streaming services, and automatic evaluation metrics for generative text-to-speech or voice conversion models.

## Institutions / 機構

KTH Royal Institute of Technology, Google

**Funding / 經費:** Digital Futures Center, European Defence Fund, Wallenberg AI, Autonomous Systems and Software Program, Knut and Alice Wallenberg Foundation

## Related

- (link related pages by id as the wiki grows)
