---
id: kim26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-185
pdf: https://www.isca-archive.org/interspeech_2026/kim26_interspeech.pdf
---

# ZipL-Dialog: Memory-Efficient Long-Form Spoken Dialog Synthesis via Latent Flow Matching

*Jihwan Kim, Nam Soo Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-185)

**TL;DR** — ZipL-Dialog shifts conditional flow-matching for long-form dialog synthesis into a 4x time-compressed (25 Hz) continuous latent space, reducing maximum peak GPU memory by up to 11.22x and accelerating inference by 2.23x compared to uncompressed baselines.

## Key contributions

- Proposes ZipL-Dialog, a latent conditional flow-matching framework operating in a 4x time-compressed (25 Hz) latent space to mitigate sequence-length memory bottlenecks in long-form dialog.
- Demonstrates that a deterministic mel autoencoder combined with an auxiliary mel-domain reconstruction loss preserves acoustic detail and intelligibility better than variational latent alternatives under strong compression.
- Redesigns the ZipFormer downsampling schedule to a milder hierarchy ([1,1,2,1,1]) that balances contextual aggregation and local acoustic resolution for compressed latent sequences.
- Achieves up to 11.22x lower maximum peak GPU memory and up to 2.23x faster inference on multi-minute dialog benchmarks while maintaining competitive perceptual naturalness (UTMOS).

## Problem

Synthesizing multi-minute, multi-turn spoken dialog using autoregressive (AR) models leads to a linear increase in inference latency with output duration. Non-autoregressive (NAR) diffusion and conditional flow-matching (CFM) models bypass sequential generation steps, but operating directly on dense frame-level mel-spectrograms causes memory to grow rapidly due to activation storage, intermediate states, and attention costs over long horizons. Consequently, minute-scale generation often requires aggressive truncation, short-segment training, or chunked synthesis, which undermines long-range conversational modeling and naturalness.

## Method

ZipL-Dialog encodes an input frame-level mel-spectrogram Y into a time-compressed continuous latent sequence Z using a deterministic mel autoencoder. The encoder applies a 2D convolutional patch embedding with temporal compression factor r = 4, followed by depthwise 1D convolutions, Transformer layers, and a 1D convolutional bottleneck yielding a 25 Hz latent dimension D = 100. This avoids the over-smoothing caused by variational autoencoders (VAEs). The decoder utilizes ConvNeXt-style residual blocks and transposed convolutions.

Masked conditional flow matching is performed entirely in this 25 Hz latent space. The latent sequence Z is partitioned via a binary mask into an observed prefix context and a target region initialized from Gaussian noise. Text embeddings augmented with speaker and turn tokens are average-upsampled to latent-frame-level embeddings and concatenated with the noisy latents and mask embeddings. A ZipFormer-based flow decoder with an optimized [1,1,2,1,1] downsampling schedule predicts the target velocity field using a 16-step Euler ODE solver.

To ensure acoustic fidelity, a denoised latent estimate is decoded back to the mel domain, and an auxiliary masked mel-domain reconstruction loss (weighted at lambda = 0.5) is jointly optimized alongside the latent velocity loss. The model is pretrained on 52.2k hours of single-speaker and multi-speaker English corpora and fine-tuned on 5k hours of the OpenDialog corpus.

## Experimental setup

Evaluated on the OpenDialog test set and the CoVoMix2 dialog test set (containing 1k DailyDialog transcripts with LibriSpeech prompts), alongside a single-speaker zero-shot ablation on LibriSpeech-PC. Compared against ZipVoice-Dialog (NAR baseline) and VibeVoice 1.5B (AR baseline). Metrics include Word Error Rate (WER via WhisperD), speaker similarity (cpSIM / SIM-o), perceptual naturalness (UTMOS), RTF, and GPU memory. Implemented on four NVIDIA A100 (80GB) GPUs; models use 100-bin 24 kHz Vocos mel-spectrograms.

## Results

ZipL-Dialog substantially outperforms the frame-level NAR baseline in memory and speed, reducing peak memory on the CoVoMix2 set from 4.01 GB to 1.10 GB and maximum peak memory from 36.21 GB to 3.23 GB, while achieving an RTF of 0.056 (2.23x speedup over ZipVoice-Dialog's 0.089 and roughly 26x-43x faster than VibeVoice). On the OpenDialog test set, maximum peak memory drops from 5.94 GB to 1.30 GB. In objective quality metrics, ZipVoice-Dialog attains lower WER (4.229% vs 5.203% on CoVoMix2; 3.550% vs 5.362% on OpenDialog) and slightly higher speaker similarity (cpSIM). However, ZipL-Dialog achieves a competitive or superior UTMOS score (3.523 on CoVoMix2, tying VibeVoice and beating ZipVoice-Dialog's 3.477; 3.198 on OpenDialog, beating both baselines).

Ablation studies confirm that the deterministic autoencoder significantly outperforms VAEs on WER (3.634% vs 6.535%), the auxiliary mel loss improves all metrics, and the modified [1,1,2,1,1] downsampling schedule drastically outperforms both no downsampling and the aggressive default [1,2,4,2,1] schedule.

| System | CoVoMix2 WER (%) | CoVoMix2 UTMOS | CoVoMix2 Max Mem (GB) | OpenDialog WER (%) | OpenDialog UTMOS | OpenDialog Max Mem (GB) |
| --- | --- | --- | --- | --- | --- | --- |
| VibeVoice 1.5B (AR) | 4.959 | 3.523 | 5.20 | 12.979 | 2.312 | 5.41 |
| ZipVoice-Dialog (NAR) | 4.229 | 3.477 | 36.21 | 3.550 | 3.089 | 5.94 |
| ZipL-Dialog (Ours) | 5.203 | 3.523 | 3.23 | 5.362 | 3.198 | 1.30 |

## Limitations

Subject to trade-offs in objective intelligibility and speaker-similarity metrics compared to uncompressed frame-level models, manifesting as slightly higher WER and lower cpSIM scores. Evaluated exclusively in English, leaving multilingual robustness and cross-lingual transfer unverified. Performance depends heavily on the pretraining mixture and requires fine-tuning on domain-specific conversational data.

## Why read this

Speech and ML engineers building real-time interactive voice agents or multi-minute dialogue systems will find this paper essential for drastically cutting memory consumption and latency via latent space flow-matching without sacrificing perceptual quality.

## Code

- https://speechdemos.github.io/

## Applications

Multi-turn conversational AI, interactive voice agents, automated podcast generation, and long-form spoken dialog synthesis.

## Related

- (link related pages by id as the wiki grows)
