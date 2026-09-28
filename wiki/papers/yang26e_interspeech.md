---
id: yang26e_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-682
pdf: https://www.isca-archive.org/interspeech_2026/yang26e_interspeech.pdf
---

# Schrödinger Bridge Mamba for One-Step Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/yang26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-682)

**TL;DR** — Schrödinger Bridge Mamba (SBM) integrates the Schrödinger Bridge training paradigm with a Mamba selective state-space backbone to perform joint speech denoising and dereverberation in a single inference step with a highly competitive real-time factor.

## Problem

Current generative speech enhancement models relying on the Schrödinger Bridge (SB) paradigm typically require over ten iterative inference steps, hindering real-time streaming applications. Meanwhile, existing Mamba-based speech enhancement models utilize deterministic mapping or masking strategies rather than generative trajectory learning, failing to exploit the synergy between continuous-time diffusion processes and state-space architectures.

## Method

SBM formulates speech enhancement as an optimal transport process directly mapping degraded speech to clean speech using stochastic differential equations, generating intermediate states along the Schrödinger Bridge trajectory as training anchors. The model architecture uses a customized oSpatialNet-Mamba backbone with integrated Fourier timestep embeddings and a fullband Mamba layer to capture global spectral dynamics. It operates with a low algorithmic latency under 40 ms via a 2-4 frame lookahead and is optimized using a combined magnitude and complex domain data prediction loss over STFT representations.

## Results

Evaluated on the DNS Challenge (synthetic with/without reverb, real recordings) and VoiceBank-Demand test sets, SBM outperforms traditional multi-step SB-NCSN++, SBCTM, SB-UFOGen, ZipEnhancer, mapping-trained Mamba, and flow-matching Mamba baselines across multiple alignment-agnostic and alignment-sensitive metrics (such as DNSMOS SIG/BAK/OVRL, NISQA, and PESQ). Ablation studies show that the SB training paradigm consistently improves performance over conventional static mapping across Mamba, MHSA, and LSTM backbones, with Mamba delivering superior performance. SBM achieves a real-time factor of 0.0152 on the DNS With Reverb test set with a compact model size of 3.93M parameters.

## Code

- https://sbmse.github.io

## Applications

Real-time, low-latency speech communication systems and hearing enhancement devices requiring robust denoising and dereverberation under constrained computational budgets.

## Limitations

Training incorporates 25% double-talk scenarios to preserve secondary speakers, which causes the model to occasionally underperform on metrics penalizing non-target speech retention when evaluated on single-speaker isolation benchmarks.

## Related

- (link related pages by id as the wiki grows)
