---
id: liu26c_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-404
pdf: https://www.isca-archive.org/interspeech_2026/liu26c_interspeech.pdf
---

# StyleStream: Real-Time Zero-Shot Voice Style Conversion

[PDF](https://www.isca-archive.org/interspeech_2026/liu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-404)

**TL;DR** — StyleStream is a real-time zero-shot speech-to-speech voice style conversion system that transfers speaker timbre, accent, and emotion with an end-to-end latency of 1 second.

## Problem

Zero-shot voice style conversion requires transferring a speaker's timbre, accent, and emotion while preserving linguistic content, but existing models struggle to disentangle content from style without leaking acoustic artifacts or degrading intelligibility. Furthermore, prior frameworks operate strictly offline, leaving real-time streaming voice style conversion unaddressed.

## Method

The system consists of a Destylizer and a Stylizer. The Destylizer uses a frozen HuBERT-Large encoder, Conformer blocks, and a finite scalar quantization (FSQ) bottleneck with a compact codebook size of 45, supervised by an ASR sequence-to-sequence loss, taking continuous pre-quantization representations as content features. The Stylizer employs a diffusion transformer (DiT) trained with a spectrogram inpainting objective and conditional flow matching (CFG), alongside a WavLM-TDNN style encoder for global style conditioning. A causal Vocos-based vocoder synthesizes 16 kHz audio, and streaming is enabled via chunked-causal attention masks and MSE distillation for the Destylizer. It is trained on 50k hours of English data.

## Results

Trained on 50k hours of English speech data, StyleStream achieves state-of-the-art accent and emotion similarity while maintaining high intelligibility. Ablations demonstrate that combining text supervision with a narrow FSQ bottleneck (codebook size 45) and continuous pre-quantization representations eliminates style leakage far more effectively than self-supervised large codebooks (like CosyVoice 2's codebook of 6561) or unconstrained VQ bottlenecks (like Vevo).

## Code

- https://berkeley-speech-group.github.io/StyleStream

## Applications

Real-time speech-to-speech translation, live voice avatars, and interactive voice conversion systems requiring preservation of emotional and expressive delivery.

## Related

- (link related pages by id as the wiki grows)
