---
id: zou26_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1552
---

# Less is More: Boosting Bimodal Music Emotion Recognition with Adaptive Audio Sequence Compression

**TL;DR** — A VQ-VAE-based adaptive pooling scheme compresses redundant audio frames while preserving emotionally salient moments, fixing the information-density mismatch between audio and MIDI that hurts bimodal music emotion recognition.

## Problem

Fusing audio and symbolic MIDI modalities gives comprehensive affective cues for music emotion classification, but audio features suffer severe temporal redundancy compared to compact MIDI representations, creating an information-density imbalance that can hinder effective bimodal fusion.

## Method

The author proposes PoolingVQ, which uses a Vector Quantized Variational Autoencoder (VQ-VAE) to quantize local audio features into index sequences indicating local variation intensity, guiding dynamic pooling (e.g. max pooling in high-variation segments, averaging in low-variation ones) that filters redundancy while retaining emotional dynamics.

## Results

On EMOPIA and VGMIDI, audio sequence compression via PoolingVQ facilitates effective bimodal fusion and achieves state-of-the-art performance for bimodal music emotion recognition.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Bimodal (audio + MIDI) music emotion recognition for music recommendation, generative music systems, and affective computing applications.

## Related

- (link related pages by id as the wiki grows)
