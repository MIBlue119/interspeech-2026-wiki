---
id: dai26c_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-791
pdf: https://www.isca-archive.org/interspeech_2026/dai26c_interspeech.pdf
---

# One-Step Token-to-Waveform Generation with MeanFlow in Latent Space

[PDF](https://www.isca-archive.org/interspeech_2026/dai26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dai26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-791)

**TL;DR** — The paper introduces a one-step Token-to-Waveform decoder using MeanFlow in a compressed latent space, achieving a 17x real-time factor speedup over multi-step baselines with negligible quality loss.

## Problem

Multi-step flow-matching decoders in neural audio codecs provide high perceptual quality for LLM-based speech generation, but suffer from high inference latency due to iterative ODE sampling. Directly applying one-step flow models in raw waveform space is memory-intensive and unstable due to extremely long sequence lengths and magnification of integration errors.

## Method

The method first trains a lightweight waveform VAE to encode 24 kHz speech into a 25 Hz low-dimensional latent sequence with a downsampling ratio of 960 and latent channel dimension D up to 24. A conditional 1D Diffusion Transformer (DiT-1D) ranging from 140M to 600M parameters is trained using the MeanFlow objective to predict average velocities, enabling single-step generation conditioned on 25 Hz semantic tokens and 192-dimensional CAM++ speaker embeddings via adaLN-Zero. To mitigate latent distribution mismatch, the authors introduce two refinement strategies: decoder-only fine-tuning of the VAE decoder with the generator frozen, and end-to-end joint fine-tuning backpropagating through the single-step sampling using multi-resolution STFT, adversarial, and feature-matching losses.

## Results

Evaluated on the LibriSpeech test-clean dataset (models trained on LibriTTS), the best configuration (140M DiT, D=24, Joint-FT) achieves an end-to-end RTF of 0.0046 (a 17x speedup compared to the 10-step CosyVoice2 baseline RTF of 0.0775), a Word Error Rate (WER) of 3.41%, a speaker similarity (SpkSim) of 0.932, a UTMOS score of 3.64, and a MOS of 3.85. Ablations show that latent dimensionality D=16–24 yields optimal trade-offs, and that joint fine-tuning significantly outperforms unrefined generation (MOS 3.85 vs. 3.35).

## Code

- https://github.com/dzq84/meantok

## Applications

Real-time, interactive, and on-device large language model-based Text-to-Speech and multimodal speech generation systems.

## Limitations

One-step generation remains sensitive to large-step integration error, and scaling the DiT model size from 140M to 600M parameters did not automatically improve perceptual quality.

## Related

- (link related pages by id as the wiki grows)
