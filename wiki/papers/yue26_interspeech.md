---
id: yue26_interspeech
category: enhancement-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1733
pdf: https://www.isca-archive.org/interspeech_2026/yue26_interspeech.pdf
---

# G2C-NET: A Grid-to-Continuous Neural Network for Sound Source Localization in Distributed Microphone Arrays

*Zhiyuan Yue, De Hu*

[PDF](https://www.isca-archive.org/interspeech_2026/yue26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yue26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1733)

**Category:** `enhancement-separation`

**TL;DR** — G2C-NET is a grid-to-continuous neural network for sound source localization in distributed microphone arrays that resolves the conflict between spatial resolution and computational complexity, achieving an RMSE of 25.52 cm and 78.63% accuracy on simulated data.

## Key contributions

- Proposes an adaptive pairwise feature aggregator (APFA) utilizing an attention mechanism to dynamically weight microphone pair features based on acoustic quality.
- Introduces a continuous position estimation (CPE) module that derives sub-grid continuous coordinates via a likelihood-weighted centroid of high-confidence grid neighborhoods.
- Formulates a composite loss function combining L1 distribution consistency loss with a differentiable continuous coordinate regression loss.
- Demonstrates robust performance improvements across varying sparse-node configurations (M=4 to M=7) and real-world acoustic datasets.

## Problem

Traditional grid-free sound source localization methods suffer from non-convex cost functions and local optima, while direct continuous coordinate regression yields unstable performance in adverse environments. Grid-based methods bypass these issues by converting localization into spatial classification over discretized grids, but they face a strict trade-off: coarse grids create large quantization errors, while fine grids incur prohibitive computational overhead. Prior deep learning frameworks rely on uniform feature aggregation across microphone pairs, making them highly vulnerable to noise and reverberation corrupting individual nodes. This makes accurate, low-complexity localization difficult in distributed microphone array setups, especially when microphone counts are sparse.

## Method

G2C-NET processes multi-channel audio and microphone coordinates through a feature extraction function (GCC-based or SLF-based) to obtain local pairwise features U in R^{L x K}, where L is the number of unique microphone pairs and K is the number of grid centers. In the Global Likelihood Estimation (GLE) module, an Adaptive Pairwise Feature Aggregator (APFA) projects U into key and value spaces using learnable matrices W_k and W_v in R^{K x d} (latent dimension d=512) alongside a standalone global query vector q in R^{1 x d}. This decouples the query from the number of microphone pairs L, maintaining scalability to an arbitrary number of microphones while computing attention weights to suppress unreliable pairs. The resulting global likelihood vector h represents the probability distribution over the discrete spatial grid.

Next, the Continuous Position Estimation (CPE) module avoids high-computational dense grids by determining sub-grid continuous coordinates. Starting from the grid index with maximum likelihood and its local neighborhood defined by window size R=2 steps, the module computes a likelihood-weighted centroid of these high-confidence grid coordinates to produce sub-grid precision.

Training is guided by a composite loss function: a distribution consistency loss L_d (using L1 norm between predicted and target Gaussian-centered spatial probability maps) and a direct coordinate regression loss L_c (penalizing physical distance error). The hyperparameter lambda balances the two, set optimally to 10. The architecture utilizes 2-layer MLPs with PReLU activations for feature processing and mapping, optimized using Adam at a learning rate of 5e-4.

## Experimental setup

Simulated data comprised 15,000 training, 2,000 validation, and 5,000 test samples generated in 3D rooms (3-6m dimensions, 1m source/node height, K=625 grids), with RT between 0.2-1.0s and SNR between 15-30 dB using VCTK speech. Real-world evaluation used the Libri-adhoc40 dataset (RT ~0.9s) with a balanced mixed fine-tuning strategy of 150 real and 150 simulated samples, tested on 1,000 real and 1,000 simulated mixtures. Baselines included classical SRP, GNN-based pairwise SSL, and LMSL. Metrics are Root Mean Square Error (RMSE in cm) and Accuracy (ACC, percentage of samples with error < 30 cm), trained on a single NVIDIA L40S GPU for up to 50 epochs.

## Results

On the simulated test set, G2C-NET achieves an RMSE of 25.52 cm and 78.63% ACC, outperforming SRP (67.19 cm), GNN (35.40 cm), and LMSL (27.17 cm). On real-world data, it achieves an RMSE of 23.35 cm and 81.15% ACC, beating all baselines. Under sparse node conditions (M=4), G2C-NET with SLF features drops the baseline GNN error from 46.22 cm down to 33.09 cm, demonstrating the extreme effectiveness of APFA when spatial observations are limited. Ablations confirm that APFA dominates error reduction in sparse node settings (19.6% drop for M=4), while CPE dominates in dense node settings (17.1% drop for M=7).

| System | Sim RMSE (cm) | Sim ACC (%) | Real RMSE (cm) | Real ACC (%) |
|---|---|---|---|---|
| SRP [22] | 67.19 | 64.38 | 60.23 | 62.71 |
| GNN [21] | 35.40 | 71.97 | 30.51 | 75.64 |
| LMSL [25] | 27.17 | 74.61 | 24.63 | 79.87 |
| Ours | 25.52 | 78.63 | 23.35 | 81.15 |

## Limitations

The evaluation is restricted to 2D/3D localization within single static room geometries using simulated VCTK and Libri-adhoc40 datasets, meaning performance under highly dynamic moving sources or extreme multi-speaker overlapping speech remains unverified. Furthermore, the coordinate regression loss lambda requires careful tuning, as over-emphasis (e.g., lambda=100) severely degrades the spatial probability map learning.

## Why read this

Speech and ML engineers building distributed microphone array systems will learn how to replace uniform cross-correlation aggregations with a scalable attention mechanism and bypass the spatial resolution-complexity bottleneck via differentiable sub-grid continuous estimation.

## Code

- https://github.com/Zhiyuan-Yue/G2C-NET.git

## Applications

Smart home audio front-ends, video conferencing room tracking, robot auditory navigation, and multi-microphone smart speakers.

## Institutions / 機構

Inner Mongolia University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
