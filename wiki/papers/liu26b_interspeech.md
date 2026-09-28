---
id: liu26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-191
---

# LMPAN: A Lightweight Multi-Path Alignment Network for Joint Full-Duplex Acoustic Echo Cancellation and Noise Suppression

**TL;DR** — A tiny (480K-parameter) on-device network that jointly handles echo cancellation and noise suppression for full-duplex voice devices, matching a larger state-of-the-art lightweight model in real time.

## Problem

On-device full-duplex spoken dialogue systems need joint acoustic echo cancellation and noise suppression that is robust to hardware-induced distortions and dynamic acoustic conditions, without exceeding tight resource budgets.

## Method

LMPAN uses a multi-path alignment stage to correct temporal/energy mismatches across reference, linear-AEC, and microphone signals, an attention mechanism to dynamically integrate features under varying acoustic scenarios, a post-filtering module with dynamic target generation for downstream ASR/VAD, and two-stage training that leverages self-supervised representations.

## Results

With only 480K parameters and 126 MACs, LMPAN achieves performance comparable to the state-of-the-art lightweight model DeepVQE-S while maintaining real-time inference.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device full-duplex voice assistants and smart speakers needing efficient joint echo cancellation and denoising.

## Related

- (link related pages by id as the wiki grows)
