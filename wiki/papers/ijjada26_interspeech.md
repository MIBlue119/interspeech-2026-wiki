---
id: ijjada26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2115
---

# WaveNorm: A Low-Complexity Time-Domain Neural Adaptive Gain Control for Real-Time Speech Applications

**TL;DR** — A causal neural network that learns time-varying gain directly from raw waveforms replaces hand-crafted adaptive gain control, running in real time on just 49M MACs and 55KB of memory.

## Problem

Conventional adaptive gain control (AGC) relies on fixed attack and release constants, which limits effectiveness in dynamic environments and causes clipping, delayed adaptation, noise amplification, and audible gain fluctuations.

## Method

The authors propose WaveNorm AGC, a causal end-to-end approach that learns time-varying gain directly from raw waveforms, eliminating hand-crafted envelope detectors and spectral analysis, and designed to comply with ITU-T P.56 and P.79 loudness standards.

## Results

WaveNorm AGC delivers stable, level-invariant, speaker-independent normalization across diverse conditions, requiring only 49M MACs and 55 KB of memory for real-time edge processing, and improves downstream voice activity detection and noise suppression when used as a preprocessing module.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time gain normalization on resource-constrained edge devices such as headsets, hearables, and conferencing hardware.

## Related

- (link related pages by id as the wiki grows)
