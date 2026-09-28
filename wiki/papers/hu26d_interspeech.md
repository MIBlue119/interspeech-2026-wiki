---
id: hu26d_interspeech
category: speech-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1307
pdf: https://www.isca-archive.org/interspeech_2026/hu26d_interspeech.pdf
---

# TF-MoE: Time-Frequency Mixture-of-Experts for Efficient Speech Separation

[PDF](https://www.isca-archive.org/interspeech_2026/hu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1307)

**TL;DR** — TF-MoE is a sparse mixture-of-experts speech separation framework that introduces dual time-frequency routing to scale model capacity, achieving 17.7 dB SDR on Libri2Mix at an ultra-lightweight inference cost of 4.1 GMACs/s.

## Problem

Many parameter-compact speech separation models still incur massive computational costs (tens to hundreds of GMACs/s), creating a mismatch with real-time edge deployment constraints. While scaling down hidden dimensions reduces compute, it severely limits model capacity and degrades separation performance.

## Method

The architecture builds upon a mel-band-splitting Conformer backbone (TF-Conformer) using K=80 mel bands and R=6 repeated blocks. It replaces standard feed-forward modules with sparsely-gated Mixture-of-Experts (MoE) FFNs containing E parallel expert networks. Dual-dimension routing is applied via time-wise MoE modules (operating per mel band across time frames) and frequency-wise MoE modules (operating per time frame across mel bands), using top-J expert selection (default J=1) paired with an auxiliary balance loss.

## Results

Evaluated on the 16 kHz Libri2Mix dataset, TF-MoE achieves 17.7 dB SDR, 16.0 dB SI-SDR, 96.3% STOI, and 2.81 PESQ at 4.1 GMACs/s with 4.6M parameters. It outperforms the BSRNN baseline by +3.8 dB SDR and surpasses A-FRCNN-16 by +1.0 dB SDR while consuming nearly 20x fewer MACs. Ablations confirm that E=12 experts yields optimal performance, whereas E=24 leads to a 1.1 dB SDR drop due to routing complexity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech separation and source enhancement running on resource-constrained edge devices, mobile phones, or offline embedded systems.

## Related

- (link related pages by id as the wiki grows)
