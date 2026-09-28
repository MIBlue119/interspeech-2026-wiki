---
id: yu26d_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1631
pdf: https://www.isca-archive.org/interspeech_2026/yu26d_interspeech.pdf
---

# Sweep-RSE: Streaming Region-of-Interest Speech Extraction in Multi-Talker Scenarios via Explicit Spatial Sweeping

[PDF](https://www.isca-archive.org/interspeech_2026/yu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1631)

**TL;DR** — Sweep-RSE is a lightweight, fully causal streaming framework for Region-of-Interest speech extraction that utilizes an explicit Align & Sweep mechanism to achieve precise target isolation and over 96 dB of false alarm suppression in silent regions.

## Problem

Existing region-of-interest speech extraction methods rely on implicit boundary conditioning, which depends on the network to learn spatial mappings without enforcing physical geometric constraints. This causes suboptimal performance in dense multi-talker scenarios, spatial leakage when target regions are empty, and vulnerability to interference.

## Method

Sweep-RSE uses a boundary-aware encoder with a Complex Hybrid Split Dense Block (CH-SDB) for phase-consistent complex convolutions, a Physics-Informed Spatial Sweep Attention (SSA) module to virtually steer microphone arrays and scan target regions via phase coherency, and Gated Context Fusion (GCF) to combine reference, aligned target, and spatial difference features. It employs a causal Dual-Path Block adapted from SpatialNet for spectro-temporal refinement with O(1) streaming complexity and a Region Speech Detector (RSD) head to gate output during silence. The model contains 1.66 million parameters and requires 3.05 GMACs.

## Results

Evaluated on a Standard Set (3k samples) and a Realistic Set (6k samples) featuring up to 3 speakers and extreme interference stress tests using 16 kHz VCTK and WHAM! noise, the causal Sweep-RSE achieves 12.88 dB SI-SDR on single-target realistic scenarios (outperforming implicit ReZero and DPARNet proxies by over +2.4 dB) and over 96 dB energy decay on empty region false alarm suppression.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Augmented reality/virtual reality (AR/VR) interfaces and smart hearing aids requiring selective acoustic attention within customizable spatial windows.

## Related

- (link related pages by id as the wiki grows)
