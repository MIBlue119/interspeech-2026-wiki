---
id: kim26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-185
pdf: https://www.isca-archive.org/interspeech_2026/kim26_interspeech.pdf
---

# ZipL-Dialog: Memory-Efficient Long-Form Spoken Dialog Synthesis via Latent Flow Matching

[PDF](https://www.isca-archive.org/interspeech_2026/kim26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-185)

**TL;DR** — ZipL-Dialog is a latent-space conditional flow matching framework for long-form spoken dialog synthesis that reduces peak GPU memory by up to 11.22x and accelerates inference by 2.23x compared to uncompressed frame-level baselines.

## Problem

Generating multi-minute, multi-turn conversational audio using autoregressive models incurs high latency, while non-autoregressive flow matching models processing dense frame-level mel-spectrograms face severe memory bottlenecks where activation storage and attention costs grow rapidly with sequence duration. This often forces unnatural chunked synthesis or truncation, weakening long-range conversational modeling.

## Method

The framework maps frame-level mel-spectrograms into a 4x time-compressed (25 Hz) continuous latent space via a deterministic mel autoencoder (34M parameters) using 2D patch embedding, Transformer encoder layers, and ConvNeXt-style decoder blocks. Masked conditional flow matching is performed in this latent domain using a ZipFormer-based flow decoder (123M parameters) with an optimized [1,1,2,1,1] downsampling schedule. The model is trained using a masked velocity-matching objective combined with an auxiliary mel-domain reconstruction loss weighted at lambda = 0.5.

## Results

Evaluated on the CoVoMix2 and OpenDialog test sets, ZipL-Dialog reduces maximum peak GPU memory from 36.21 GB down to 3.23 GB on CoVoMix2 and accelerates inference (RTF 0.056 vs 0.089). In quality comparisons against the ZipVoice-Dialog baseline, ZipL-Dialog achieves competitive or tied-best UTMOS (3.523 on CoVoMix2, 3.198 on OpenDialog) though with slightly higher WER (5.203% vs 4.229% on CoVoMix2). Ablations confirm that a deterministic autoencoder with auxiliary mel-supervision and the modified downsampling schedule substantially outperform variational latents and default dense schedules.

## Code

- https://speechdemos.github.io/

## Applications

Engineers building real-time interactive voice agents, multi-turn conversational systems, podcasts, and role-play dialog generation tools requiring low memory footprints and multi-minute context handling.

## Limitations

Temporal compression introduces modest trade-offs in objective intelligibility (WER) and speaker-similarity metrics compared to uncompressed frame-level models.

## Related

- (link related pages by id as the wiki grows)
