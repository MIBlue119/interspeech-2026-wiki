---
id: wang26l_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-648
pdf: https://www.isca-archive.org/interspeech_2026/wang26l_interspeech.pdf
---

# An All-neural Distributed Filtering Algorithm for Speech Extraction in Wireless Acoustic Sensor Networks

*Jiawei Wang, Xiaoqing Hu, Feiran Yang, Jianfei Tong, Guohua Sun*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-648)

**TL;DR** — ANDFilter is an all-neural distributed filtering framework for wireless acoustic sensor networks (WASNs) that replaces classical iterative covariance optimization with end-to-end complex filter weight synthesis, achieving significant improvements in speech quality and intelligibility over state-of-the-art baselines.

## Key contributions

- Replaces fragile iterative second-order statistics and matrix inversion in classical WASN algorithms with direct, data-driven frame-wise complex filter synthesis.
- Proposes a three-stage modular architecture consisting of a single-node filter module (SNFM), a node selection module (NSM) with cosine-similarity attention, and a multi-node filter module (MNFM).
- Introduces module-level supervision and entropy-based regularization to optimize local filtering and global spatial fusion end-to-end without auxiliary front-ends.
- Demonstrates robust performance across extremely low-to-high SNR regimes (-20 dB to 20 dB) using simulated acoustic environments with real-world noise.

## Problem

Microphone arrays are limited by spatial aperture and sensor power constraints, which wireless acoustic sensor networks (WASNs) mitigate by distributing sensors spatially. However, classical distributed algorithms like DANSE, LCMV, and PEVD-based approaches rely heavily on explicit second-order statistics, synchronization assumptions, and iterative covariance updates. These assumptions fail under low-SNR (-20 to 0 dB) and non-stationary noise conditions, leading to numerical instability, high estimation errors, and convergence failures.

## Method

ANDFilter mirrors the two-stage protocol of distributed adaptive node-specific signal estimation (DANSE) where each node transmits a single compressed scalar signal, but executes it via feedforward neural modules. The architecture consists of three core components: the single-node filter module (SNFM), the node selection module (NSM), and the multi-node filter module (MNFM).

The SNFM processes concatenated real and imaginary components of local multichannel observations through a U2-Encoder backbone (gated 2D convolutions, instance normalization, PReLU activations), an S-TCN module for long-range temporal and inter-channel dependencies, a U2-Decoder, and a lightweight recurrent filter-mapping stage to output local filter weights and a compressed scalar signal z_j.

The NSM acts on incoming compressed signals from remote nodes (z_-j), computing cosine similarity via L2-normalized query-key pairs to weight and suppress uninformative or corrupted remote node contributions. An entropy-based regularization term penalizes node selection weights for sparsity.

The MNFM concatenates the local observation vector with the NSM-refined compressed signal and feeds it into an architecture identical to the SNFM (differing only in input channels) to map to global filter weights approximating a centralized SDW-MWF solution.

The model is trained using an RI-Mag loss combining real-imaginary and magnitude constraints with root compression for spectral stability, alongside the entropy regularization term. Hyperparameters include batch size 8, Adam optimizer with learning rate warmed up to 1e-3 over 10 epochs followed by cosine decay, and a 32 ms square-root Hann window with 50% overlap and 512-point FFT.

## Experimental setup

Simulated rooms sized 3-8m length, 3-5m width, 2.5-3m height generated using Pyroomacoustics with RT60 uniformly drawn from 0.15 to 0.4s. A WASN of J=4 nodes, each equipped with a 4-microphone cross-shaped array (radius 5cm), one target speech source (LibriSpeech clean subset), and one environmental noise source (Freesound recordings). Training set: 15,000 utterances; validation set: 1,500 utterances; testing set: 500 utterances (10 seconds each, 16 kHz sampling rate). Baselines compared: C-MWF, DANSE, C-PEVD, D-PEVD, and TANGO. Metrics: PESQ, ESTOI, and DNSMOS. Trained for 100 epochs with early stopping.

## Results

ANDFilter significantly outperforms all centralized and distributed baselines across all SNR ranges. In terms of average performance over the testing set, ANDFilter achieves an average PESQ of 2.86, ESTOI of 0.83, and DNSMOS of 2.60, compared to the strongest baseline TANGO which achieves an average PESQ of 1.60, ESTOI of 0.59, and DNSMOS of 1.91, and classical DANSE at 1.44/0.61/1.86. In extreme low-SNR conditions ([-20, -10] dB), ANDFilter maintains a score of 2.26 PESQ / 0.74 ESTOI / 2.37 DNSMOS, whereas classical methods collapse below 1.30 PESQ. Ablation studies confirm that relying solely on compressed signals (ONLYZ) results in poor performance (1.13 PESQ), proving that localized observations are mandatory; combining SNFM and MNFM yields a synergistic jump to 2.80 PESQ.

| System | [-20,-10] dB | [-10,0] dB | [0,10] dB | [10,20] dB | Average |
|---|---|---|---|---|---|
| C-MWF | 1.25/0.58/1.60 | 1.31/0.58/1.76 | 1.29/0.57/1.73 | 1.28/0.56/1.85 | 1.28/0.57/1.74 |
| DANSE | 1.29/0.55/1.56 | 1.42/0.58/1.72 | 1.48/0.61/1.90 | 1.58/0.68/2.27 | 1.44/0.61/1.86 |
| TANGO | 1.55/0.52/1.68 | 1.61/0.56/1.75 | 1.62/0.61/1.97 | 1.61/0.67/2.24 | 1.60/0.59/1.91 |
| ANDFilter | 2.26/0.74/2.37 | 2.57/0.79/2.52 | 3.06/0.85/2.64 | 3.55/0.90/2.86 | 2.86/0.83/2.60 |

## Limitations

Evaluated exclusively on simulated room impulse responses with a fixed network topology of J=4 nodes and a single target source in simulated isotropic or point-source noise fields. The approach assumes fully-connected WASNs and does not address dynamic node dropouts, asynchronous clock drifts, or multi-speaker overlapping target scenarios.

## Why read this

Researchers and audio engineers working on distributed microphone networks or decentralized speech enhancement should read this to see how end-to-end neural filter synthesis completely supplants fragile iterative covariance matrix inversion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Distributed smart home assistant networks, multi-room acoustic surveillance, meeting room microphone arrays, and wearable sensor networks.

## Related

- (link related pages by id as the wiki grows)
