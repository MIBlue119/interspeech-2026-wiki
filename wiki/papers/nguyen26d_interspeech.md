---
id: nguyen26d_interspeech
category: tts
labels: [efficient-on-device, streaming-real-time, generative-model]
institutions: ["FPT Software", "University of Alabama at Birmingham"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1043
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26d_interspeech.pdf
---

# DiFlow-TTS: Compact and Low-Latency Zero-Shot Text-to-Speech with Discrete Flow Matching

*Son Nguyen, Thanh Tran, Nghia Huynh, Son Hy, Van Nguyen*

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1043)

**Category:** `tts` · **Labels:** `efficient-on-device`, `streaming-real-time`, `generative-model`

**TL;DR** — DiFlow-TTS is a compact zero-shot text-to-speech framework built on discrete flow matching that simultaneously generates prosody and acoustic token streams, achieving state-of-the-art naturalness while running up to 34× faster than baselines.

## Key contributions

- Introduces DiFlow-TTS, an initial baseline applying Discrete Flow Matching (DFM) directly to the discrete space of factorized codec tokens for zero-shot TTS.
- Proposes a Factorized Discrete Flow Denoiser (FDFD) featuring dedicated prediction heads for prosody and acoustic details to model multiple subspaces simultaneously.
- Designs a Phoneme-Content Mapper (PCM) that operates directly on discrete codec tokens using duration-based alignment rather than continuous frames.
- Achieves a compact parameter footprint (down to 122M for DiFlow-TTS-Small) and low inference latency with up to 34× speedup over traditional autoregressive and diffusion models.

## Problem

Zero-shot TTS models face a persistent trade-off between generation quality and inference efficiency. Autoregressive token models (like VALL-E and VoiceCraft) provide high fidelity but suffer from high latency due to step-by-step sequential decoding. Conversely, diffusion and continuous flow-matching models operate in complex, unbounded continuous representation spaces that complicate density estimation and cause out-of-distribution artifacts, while also coupling training and sampling schedules. DiFlow-TTS addresses these gaps by performing flow matching directly in a structured, finite discrete token space using a factorized representation.

## Method

The framework utilizes a pre-trained FACodec as a speech tokenizer, decomposing raw reference audio into a speaker embedding, 1 prosody token sequence, 2 content token sequences, and 3 acoustic token sequences (each codebook of size v=1024 at 80 tokens/s). The Phoneme-Content Mapper (PCM) translates text inputs into phoneme sequences, passes them through a duration predictor and length regulator, and processes them via 2 Feed-Forward Transformer (FFT) layers to output content embeddings and cross-entropy content head logits.

The Factorized Discrete Flow Denoiser (FDFD) takes corrupted discrete tokens at timestep t and concatenates them with reference prompt tokens, content conditioning embeddings, and learnable attribute-type embeddings (p, c, a). This unified tensor is projected and processed by 12 Diffusion Transformer (DiT) blocks (hidden size 768, 12 attention heads, RoPE) modulated via adaptive layer normalization (AdaLN) conditioned on a global vector summing an MLP-projected speaker embedding and timestep embedding. A parallel multi-head prediction mechanism splits the output into a prosody head and an acoustic head to independently predict categorical probability distributions over the discrete vocabulary.

Training is performed using a mixture path scheduler (kappa_t = t^2) optimized via a combined objective function comprising log-scale MSE duration loss, cross-entropy content loss, and cross-entropy denoising loss. Inference uses discrete solvers over NFE steps (tested from 1 to 128), reconstructing the final waveform via the Codec Decoder.

## Experimental setup

Trained on a 470-hour subset of LibriTTS using 4 NVIDIA A100 GPUs for 315K steps with batch size 16 (AdamW, lr=1e-4, 200K warm-up steps). Evaluated on the 2.2-hour LibriSpeech test-clean set using 3-second audio prompts. Compared against VoiceCraft, VALL-E, NaturalSpeech2, F5-TTS, OZSpeech, and MaskGCT using UTMOS, WER, SIM-O, F0/Energy accuracy and RMSE, and Real-Time Factor (RTF).

## Results

DiFlow-TTS achieves a top-tier UTMOS naturalness score of 3.98 and a WER of 0.05, outperforming or matching heavier baselines despite using only 470 hours of training data. In prosody preservation, it achieves an F0 accuracy of 0.88 and a low F0-RMSE of 7.97, outperforming larger diffusion and AR systems. A smaller variant (DiFlow-TTS-Small, 122M parameters) attains an RTF of 0.03 at 4 NFEs, delivering a 34× speedup over models like VoiceCraft while maintaining strong intelligibility.

In ablations, removing speaker conditioning drastically hurts SIM-O (dropping from 0.45 to 0.38) and F0 accuracy (from 0.88 to 0.68), while dropping content embeddings causes severe degradation in naturalness (UTMOS falling to 3.08). The primary weakness lies in speaker similarity, where DiFlow-TTS scores lower than top baselines due to simple global AdaLN speaker conditioning.

| System | UTMOS ↑ | WER ↓ | SIM-O ↑ | F0 Accuracy ↑ | F0 RMSE ↓ |
|---|---|---|---|---|---|
| Ground Truth | 4.10 | 0.02 | - | - | - |
| VoiceCraft (9K hrs) | 3.55 | 0.18 | 0.51 | 0.78 | 17.22 |
| F5-TTS (500 hrs) | 3.76 | 0.24 | 0.52 | 0.80 | 13.78 |
| MaskGCT (100K hrs) | 3.83 | 0.09 | 0.67 | 0.77 | 14.33 |
| DiFlow-TTS (Ours, 470 hrs) | 3.98 | 0.05 | 0.45 | 0.88 | 7.97 |

## Limitations

The model exhibits suboptimal voice cloning quality and lower objective speaker similarity compared to state-of-the-art baselines, stemming from its simplistic global AdaLN speaker conditioning strategy. Evaluation is restricted to clean English corpora (LibriSpeech/LibriTTS), leaving multilingual and heavy background noise robustness largely untested outside of synthetic SNR sweeps.

## Why read this

Speech engineers and researchers exploring non-autoregressive generative modeling should read this paper to understand how to formulate flow matching directly in discrete, factorized token spaces rather than continuous mel-spectrogram or latent spaces.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-latency zero-shot text-to-speech systems, on-device voice cloning assistants, and resource-constrained conversational agents.

## Institutions / 機構

FPT Software, University of Alabama at Birmingham

## Related

- (link related pages by id as the wiki grows)
