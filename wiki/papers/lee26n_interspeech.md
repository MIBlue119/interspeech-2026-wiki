---
id: lee26n_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1620
---

# DroFiT: A Lightweight Band-Fused Frequency Attention Toward Real-Time UAV Speech Enhancement

**TL;DR** — DroFiT is a tiny, streaming-capable speech enhancement network purpose-built for removing severe drone ego-noise, running 9-26x more efficiently than prior drone-oriented baselines.

## Problem

Drones (UAVs) generate severe, harmonic ego-noise that overwhelms speech captured by an onboard microphone, and existing enhancement models are too heavy for real-time onboard deployment.

## Method

DroFiT uses a Full/Sub-band encoder-decoder that compresses noisy input at different ratios — the sub-band path focused on low-frequency detail, the full-band path retaining global context — combined with a Pre-TCN to capture the harmonic, stationary structure of drone noise and a frequency-wise Transformer that fuses full/sub-band tokens in a shared attention space.

## Results

On VoiceBank-DEMAND mixed with recorded drone noise, DroFiT matches the enhancement performance of drone-oriented baselines DCU-net and SMoLnet-T while cutting computation by 15-26x and 9-15x respectively, using only 168k parameters and supporting frame-wise streaming inference.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech enhancement for drone-based communication, search-and-rescue audio capture, and other UAV applications where onboard compute is tightly limited.

## Related

- (link related pages by id as the wiki grows)
