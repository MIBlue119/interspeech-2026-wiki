---
id: dai26c_interspeech
category: tts
labels: [efficient-on-device, generative-model]
institutions: ["Chinese University of Hong Kong", "Tencent", "Hong Kong University of Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-791
pdf: https://www.isca-archive.org/interspeech_2026/dai26c_interspeech.pdf
---

# One-Step Token-to-Waveform Generation with MeanFlow in Latent Space

*Zheqi Dai, Guangyan Zhang, Zhen Ye, Jingyu Li, Haolin He, Chunyat Wu, Yiwen Guo, Qiuqiang Kong*

[PDF](https://www.isca-archive.org/interspeech_2026/dai26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dai26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-791)

**Category:** `tts` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — The paper introduces a latent-space MeanFlow token-to-waveform decoder that eliminates multi-step iterative sampling, achieving a 17x real-time factor speedup with minimal perceptual quality loss.

## Key contributions

- A Token2Wav framework applying MeanFlow-based one-step conditional generation within a compressed latent space to circumvent waveform-level flow instability.
- Empirical analysis of latent dimensionalities (8, 16, 24) and model capacities (140M vs 600M DiT) under latency constraints.
- Refinement strategies including decoder-only fine-tuning and end-to-end joint fine-tuning to fix latent distribution mismatch without increasing inference-time costs.

## Problem

Modern LLM-based text-to-speech systems rely on discrete semantic tokens that discard fine-grained acoustic information, shifting the burden to Token-to-Waveform decoders. While flow-matching decoders offer high audio quality, they require tens of neural function evaluations (NFEs) via iterative ODE integration, creating a severe quality-latency trade-off unsuited for real-time and on-device use. Directly applying one-step flow models in raw waveform space fails due to memory limits, training instability, and amplified single-step errors on long sequences.

## Method

The architecture divides Token2Wav synthesis into a lightweight waveform variational autoencoder (VAE) and a latent generative model. First, an Oobleck-style strided convolution encoder (strides [2, 4, 4, 6, 5]) maps 24 kHz audio to a compressed latent space at a 25 Hz frame rate (matching semantic token rate), using a deterministic decoder for waveform reconstruction. The latent generation is handled by a 1D Diffusion Transformer (DiT-1D) conditional on semantic tokens (from CosyVoice2, 6561 vocabulary size) and a 192-dim CAM++ speaker embedding via adaptive layer normalization (adaLN-Zero). 

Instead of instantaneous velocity fields requiring multi-step integration, the model is trained using MeanFlow objectives to predict an average velocity over an interval [r, t] via Jacobian-vector products and adaptive reweighting. At inference, a single Gaussian noise sample undergoes a one-step update to produce the latent sequence, which the VAE decoder turns into audio. To combat latent distribution mismatch between generated latents and VAE training targets, the system applies two training strategies with zero inference overhead: (i) Decoder-only refinement, freezing the generator and updating the VAE decoder using multi-resolution STFT, adversarial hinge, and feature-matching losses; and (ii) End-to-end joint fine-tuning, backpropagating waveform losses through the one-step sampling step to update both generator and decoder.

## Experimental setup

Models are trained on LibriTTS and evaluated on the LibriSpeech test-clean subset (resampled to 16 kHz for metric computation). Evaluated metrics include Word Error Rate (WER) using a fine-tuned HuBERT-Large ASR model, Speaker Similarity (SpkSim) via WavLM-Large, UTMOS, and Mean Opinion Score (MOS) from 20 listeners. Real-Time Factor (RTF) is measured using FP16 inference with batch size 1 on an NVIDIA H20 GPU. The 1D DiT generator comes in 140M (768 hidden, 12 layers, 12 heads) and 600M (1152 hidden, 28 layers, 16 heads) variants.

## Results

The best configuration (140M DiT, latent dimension D=24, with joint fine-tuning) achieves an RTF of 0.0046, representing a 17x speedup over the 10-step CosyVoice2 baseline (RTF 0.0775). It maintains a competitive WER of 3.41% (vs 3.18% for CosyVoice2), SpkSim of 0.932 (vs 0.940), UTMOS of 3.64 (vs 3.76), and MOS of 3.85 (vs 4.05). 

Ablations on latent dimensions show that increasing D from 8 to 24 improves MOS from 3.45 to 3.85 and lowers WER from 4.82% to 3.41%. Model capacity scaling reveals that the 140M model slightly outperforms the 600M model on UTMOS (3.64 vs 3.57) and MOS (3.85 vs 3.78) while running faster (RTF 0.0047 vs 0.0075), indicating single-step models overfit larger parameters without careful regularization. Refinement strategy ablations demonstrate that skipping fine-tuning (No-FT) results in poor UTMOS (3.11) and MOS (3.35) due to latent mismatch, which decoder-only fine-tuning elevates to 3.70 MOS and joint fine-tuning maximizes at 3.85 MOS.

| System | Dim | WER(%) ↓ | SpkSim ↑ | UTMOS ↑ | MOS ↑ | RTF ↓ |
| --- | --- | --- | --- | --- | --- | --- |
| CosyVoice2 (10-step) | – | 3.18 | 0.940 | 3.76 | 4.05 | 0.0775 |
| VAE reconstruction (oracle) | 24 | 2.14 | 0.966 | 3.67 | 4.10 | – |
| Latent MeanFlow (Joint-FT) | 24 | 3.41 | 0.932 | 3.64 | 3.85 | 0.0046 |
| Latent MeanFlow (Joint-FT) | 16 | 3.62 | 0.927 | 3.56 | 3.72 | 0.0046 |
| Latent MeanFlow (No-FT) | 24 | 3.52 | 0.931 | 3.11 | 3.35 | 0.0046 |

## Limitations

The evaluation is restricted to clean English speech from LibriSpeech, leaving multilingual capability, noisy environments, and out-of-domain expressive styles untested. The gap between the VAE oracle reconstruction (MOS 4.10) and the best generative model (MOS 3.85) highlights that one-step latent generation still introduces bottleneck distortions. Additionally, larger 600M models underperformed relative to 140M parameters, showing that scaling single-step generation requires new architectural or regularization recipes.

## Why read this

Speech and ML engineers working on real-time interactive voice assistants or on-device generative audio should read this to learn how to replace multi-step ODE sampling with one-step MeanFlow in compressed latent spaces. It provides concrete recipes for overcoming latent mismatch using joint waveform-domain fine-tuning without adding inference overhead.

## Code

- https://github.com/dzq84/meantok

## Applications

Real-time interactive text-to-speech, edge and on-device voice generation, and low-latency LLM-based multimodal spoken dialog systems.

## Institutions / 機構

Chinese University of Hong Kong, Tencent, Hong Kong University of Science and Technology

## Related

- (link related pages by id as the wiki grows)
