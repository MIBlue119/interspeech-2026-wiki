---
id: viakhirev26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1420
---

# From Dispersion to Attraction: Spectral Dynamics of Hallucination Across Whisper Model Scales

**TL;DR** — A new Spectral Sensitivity Theorem predicts and empirically confirms a phase transition in Whisper models from a dispersive 'signal decay' regime to a compression-seeking 'attractor' regime as scale increases, showing how large ASR models can decouple from acoustic evidence and hallucinate.

## Problem

Hallucinations in large ASR models present a critical safety risk, and the underlying dynamics causing models to disconnect from acoustic evidence are not well understood theoretically.

## Method

The authors propose the Spectral Sensitivity Theorem, predicting a phase transition in deep networks from a dispersive regime (signal decay) to an attractor regime (rank-1 collapse) governed by layer-wise gain and alignment, and validate it by analyzing eigenspectra of activation graphs in Whisper models (Tiny to Large-v3-Turbo) under adversarial stress.

## Results

Intermediate models show Structural Disintegration (Regime I) with a 13.4% collapse in cross-attention rank, while large models enter a Compression-Seeking Attractor state (Regime II) where self-attention actively compresses rank (-2.34%) and hardens the spectral slope, decoupling the model from acoustic evidence.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Offers a theoretical diagnostic for ASR developers investigating why and when larger Whisper-scale models are prone to hallucination, potentially informing mitigation strategies.

## Related

- (link related pages by id as the wiki grows)
