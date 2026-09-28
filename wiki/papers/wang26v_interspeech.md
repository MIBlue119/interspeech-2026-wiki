---
id: wang26v_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1242
pdf: https://www.isca-archive.org/interspeech_2026/wang26v_interspeech.pdf
---

# TC-DBI: A Plug-and-Play Trajectory Confidence-Guided Dynamic Block Inference Strategy for Speech Synthesis with Continuous Block Flow Matching

[PDF](https://www.isca-archive.org/interspeech_2026/wang26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1242)

**TL;DR** — TC-DBI is a training-free, plug-and-play decoding strategy for block flow matching text-to-speech that dynamically adjusts block sizes using trajectory confidence, improving word error rate and naturalness mos.

## Problem

Continuous Block Flow Matching models generate speech in fixed-size blocks, which ignores the non-uniform modeling difficulty of speech signals. Small blocks hurt generation efficiency, whereas large blocks provide insufficient contextual conditioning during complex transitions, leading to error accumulation and instability. This creates a need for a lightweight, on-the-fly reliability metric that can guide adaptive block truncation and regeneration without altering model architecture.

## Method

The method introduces Trajectory Confidence (TC), a geometric metric computed from the straightness of ODE integration paths during inference without any training. Using TC as a reliability signal, TC-Guided Dynamic Block Inference (TC-DBI) evaluates candidate blocks of maximum length Lmax, finds the longest reliable prefix based on a confidence threshold tau, and truncates and regenerates unreliable suffixes with refreshed context. The base model employs a 22-layer Diffusion Transformer (DiT) with a hidden dimension of 1024 and 16 attention heads, conditioned on text, historical blocks, and a reference latent. The system uses a frozen VoxCPM VAE neural codec and is trained on 100k hours of Emilia speech data using 32-step ODE integration and a threshold tau of 0.75.

## Results

Evaluated on the Seed-eval benchmark (Mandarin and English) comparing against CosyVoice2, F5-TTS, MaskGCT, and a reproduced Block Flow Matching (BFM) baseline. On seed-test-zh, BFM with TC-DBI achieves a WER of 1.568%, a SIM of 0.753, and an N-MOS of 3.809, improving over the fixed-block BFM baseline (WER 1.628%, N-MOS 3.673). On seed-test-en, it achieves a WER of 1.798%, a SIM of 0.676, and an N-MOS of 3.973, compared to the baseline (WER 1.921%, N-MOS 3.727). Ablation studies show that setting the confidence threshold to tau = 0.75 achieves the optimal balance between WER reduction and a modest 1.08x relative RTF overhead.

## Code

- https://thuhcsi.github.io/interspeech2026-TC-DBI/

## Applications

Speech/ML engineers and researchers building high-fidelity, robust text-to-speech (TTS) systems can adopt TC-DBI as a drop-in decoding strategy to improve perceptual quality and intelligibility.

## Limitations

Aggressive threshold tuning (e.g., tau = 0.80) increases inference time significantly (1.63x relative RTF) with diminishing performance returns.

## Related

- (link related pages by id as the wiki grows)
