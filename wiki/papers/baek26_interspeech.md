---
id: baek26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3336
---

# SPARK: Efficient Audio-Text Matching for User-Defined Keyword Spotting via Spiking Neural Networks

**TL;DR** — A spiking-neural-network keyword spotter matches user-typed keywords to audio nearly as accurately as conventional networks while using roughly 20x less energy.

## Problem

User-defined keyword spotting, letting users type custom keywords in text, is useful for hands-free control, but current models are too computationally and energy expensive for practical always-on deployment.

## Method

SPARK performs audio-text matching entirely within the spiking domain, using a spike-driven attention mechanism that replaces costly floating-point operations with low-cost accumulate operations end-to-end.

## Results

On the LibriPhrase test set, SPARK reaches competitive performance with 2.1x fewer parameters and 21.7x lower energy consumption than an equivalent artificial neural network.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Always-on, battery-constrained voice interfaces (wearables, IoT devices) needing custom, user-defined wake words or commands.

## Related

- (link related pages by id as the wiki grows)
