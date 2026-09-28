---
id: sharma26c_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2839
---

# LavaSR: Fast and Flexible Audio Bandwidth Extension via Vocos

**TL;DR** — A Vocos-based audio bandwidth-extension model that reconstructs missing high frequencies for any input rate between 8-48 kHz, running thousands of times faster than real time on GPU or CPU.

## Problem

Audio bandwidth extension needs to generate missing high-frequency content across a wide range of input sampling rates, but supporting arbitrary upsampling ratios efficiently and flexibly is challenging.

## Method

Resamples inputs to 48 kHz and processes them with a neural vocoder (Vocos) backbone so a single network supports arbitrary upsampling ratios, then merges the original low band with generated high frequencies through a lightweight Linkwitz-Riley-inspired crossover refiner.

## Results

Achieves competitive log-spectral distance while running at a real-time factor of 0.0001 on an NVIDIA A100 GPU and 0.0053 on an 8-core CPU, demonstrating high-quality bandwidth extension at extreme throughput.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time or batch upsampling of low-bandwidth telephony or archival audio to full-bandwidth quality.

## Related

- (link related pages by id as the wiki grows)
