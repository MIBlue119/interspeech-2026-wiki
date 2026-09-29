---
id: hu26d_interspeech
category: enhancement-separation
labels: [efficient-on-device]
institutions: ["Shanghai Jiao Tong University", "Microsoft"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1307
pdf: https://www.isca-archive.org/interspeech_2026/hu26d_interspeech.pdf
---

# TF-MoE: Time-Frequency Mixture-of-Experts for Efficient Speech Separation

*Qinzhe Hu, Chenda Li, Wangyou Zhang, Shujie Liu, Yan Lu, Yanmin Qian*

[PDF](https://www.isca-archive.org/interspeech_2026/hu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1307)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`

**TL;DR** — TF-MoE is a sparse Mixture-of-Experts time-frequency framework for speech separation that scales model capacity without increasing inference cost, outperforming BSRNN by +3.8 dB SDR on Libri2Mix at 4.1 GMACs/s.

## Key contributions

- Proposes TF-Conformer, a mel-scale band-split Conformer backbone achieving +2.5 dB SDR over BSRNN at a comparable 4.1 GMACs/s.
- Introduces TF-MoE, replacing feed-forward layers in both temporal and frequency Conformer blocks with sparsely-gated expert layers for compute-neutral parameter scaling.
- Demonstrates through visualization that time-wise and frequency-wise routers specialize in distinct acoustic patterns such as speaker states and frequency bands.
- Achieves 17.7 dB SDR on Libri2Mix 16 kHz with 4.6M parameters and 4.1 GMACs/s, eclipsing heavier models while remaining edge-viable.

## Problem

Recent speech separation models often feature small parameter counts under 10 million, yet continue to demand massive computational costs ranging in the tens or hundreds of GMACs/s, making real-time edge deployment impractical. Standard dimensionality reduction approaches successfully shrink the compute budget but critically damage model capacity and separation accuracy. Prior Mixture-of-Experts work either targeted phoneme-level enhancement or applied sparsity exclusively along the temporal dimension. This work addresses the urgent need to decouple parameter capacity from operational computation for resource-constrained speech separation hardware.

## Method

The TF-MoE framework builds upon a TF-Conformer backbone that processes complex input spectrograms Y through a mel-scale band-splitting module, yielding 80 mel-bands projected into an N = 32 dimensional feature space. The core architecture stacks R = 6 blocks containing alternating time-wise (T-module) and frequency-wise (F-module) macaron-style Conformer blocks, followed by a mask decoding module. In the TF-MoE design, standard feed-forward networks (FFNs) are replaced by sparsely-gated MoE FFNs containing E parallel expert sub-networks.

A lightweight gating router calculates a distribution over the E experts using a mean-pooled sequence descriptor, selecting the top-J experts (default J = 1) per token sequence. For the T-module, routing operates sub-band-wise across T time frames (dimension BK, T, N) to specialize experts in distinct spectral regions like harmonics. For the F-module, routing operates frame-wise across K mel-bands (dimension BT, K, N) to handle distinct acoustic states like voiced, unvoiced, or speaker transitions. An auxiliary balancing loss with weight alpha = 10^-3 prevents expert collapse and ensures uniform utilization.

With top-1 routing, expert computation matches a single standard FFN while parameter size scales by E. Gating overhead is exceptionally minor, adding less than 0.06% to total MACs (under 10^-3 GMACs/s), thereby achieving compute-neutral capacity expansion.

## Experimental setup

Experiments use Libri2Mix (16 kHz, min) with spectrograms extracted via a 32 ms Hanning window and 8 ms shift across K = 80 mel-bands. Models are trained using the AdamW optimizer with a cosine annealing scheduler, optimizing via SI-SNR loss with permutation invariant training (PIT). Evaluation metrics include SDR, SI-SDR, STOI, and PESQ, alongside parameters, MACs/s, and real-time factor (RTF) measured on a single-thread laptop CPU.

## Results

On Libri2Mix 16 kHz, TF-MoE (E = 12, J = 1) achieves 17.7 dB SDR, 17.2 dB SI-SDR, 96.3% STOI, and 2.81 PESQ at 4.1 GMACs/s, outperforming the BSRNN baseline (13.9 dB SDR) by +3.8 dB and the dense TF-Conformer backbone (16.4 dB SDR) by +1.3 dB with identical computation. Compared to alternative lightweight baselines, TF-MoE surpasses Tiger (17.1 dB SDR at 7.7 GMACs/s) and TDANet Large (16.1 dB SDR at 9.2 GMACs/s) while utilizing fewer operations.

Ablation studies show that scaling expert count E from 3 to 12 steadily improves SDR from 16.5 dB to 17.7 dB, but further increasing E to 24 causes performance to drop to 16.6 dB due to routing optimization difficulties.

| Model | Params (M) | MACs/s (G) | SDR (dB) | SI-SDR (dB) | PESQ |
|---|---|---|---|---|---|
| BSRNN | 2.4 | 4.2 | 13.9 | 13.4 | 2.31 |
| TDANet Large | 2.3 | 9.2 | 16.1 | 15.6 | - |
| Tiger | 0.8 | 7.7 | 17.1 | 16.7 | - |
| TF-Conformer | 2.3 | 4.1 | 16.4 | 16.0 | 2.63 |
| TF-MoE (E=12) | 4.6 | 4.1 | 17.7 | 17.2 | 2.81 |

## Limitations

The evaluation is restricted to the 16 kHz Libri2Mix dataset, leaving multi-language or real-world reverberant and noisy multi-channel scenarios untested. The model suffers performance degradation when the expert count E becomes excessively large (e.g., E = 24), highlighting sensitivity in routing convergence. Real-time factor (RTF) is evaluated only on a single-threaded CPU, without comprehensive benchmarking on dedicated edge accelerators or NPUs.

## Why read this

Speech engineers and researchers targeting resource-constrained hardware will learn how to scale model capacity without inflating GMAC budgets using dual-dimension mixture-of-experts routing.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time on-device speech separation, edge-based hearing aids, and local offline communication tools.

## Institutions / 機構

Shanghai Jiao Tong University, Microsoft

**Funding / 經費:** China STI 2030–Major Projects, National Natural Science Foundation of China, SJTU Med-X Translational Research Grant

## Related

- (link related pages by id as the wiki grows)
