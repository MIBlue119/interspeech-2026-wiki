---
id: long26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1748
pdf: https://www.isca-archive.org/interspeech_2026/long26_interspeech.pdf
---

# Benchmarking Language Modeling for Lossless Compression of Full-Fidelity Audio

*Phillip Long, Zachary Novack, Chris Donahue*

[PDF](https://www.isca-archive.org/interspeech_2026/long26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/long26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1748)

**TL;DR** — The paper introduces Trilobyte, a hierarchical byte-level tokenization scheme that reduces autoregressive language model vocabulary scaling from exponential to constant, enabling the first tractable neural lossless compression of full-fidelity 24-bit audio.

## Key contributions

- Proposed Trilobyte, a hierarchical byte-level tokenization scheme that reduces vocabulary scaling from O(2^b) to O(1) in bit depth.
- Provided the first comprehensive benchmarking of autoregressive language model-based lossless compression on full-fidelity 16-bit and 24-bit audio across diverse domains (speech, music, bioacoustics).
- Introduced a multi-bit-rate masking strategy allowing a single generalist model to losslessly compress arbitrary bit depths (8-bit, 16-bit, 24-bit) without retraining.
- Demonstrated that learned autoregressive compression consistently outperforms FLAC at 8-bit and modestly at 16-bit, while trailing FLAC by 9% at 24-bit due to inherent least-significant-bit noise.

## Problem

Prior autoregressive language model lossless compression approaches were strictly limited to 8-bit audio at 16 kHz because sample-level tokenization creates exponentially scaling vocabularies—65K tokens for 16-bit and 16.7M tokens for 24-bit—which require tens of billions of parameters just for output projections. This makes them computationally intractable for professional or CD-quality audio (16-bit/24-bit at 44.1 kHz+). Without addressing this vocabulary explosion, it remained an open question whether neural compression could scale to practical fidelities and compete with traditional codecs like FLAC.

## Method

The authors utilize decoder-only Transformer architectures (GPT-2 style, 90M parameters for 8/16-bit and larger for 24-bit) combined with arithmetic coding to perform lossless compression via next-token prediction, where negative log-likelihood directly dictates the expected bits per token. Standard sample-level tokenization treats every PCM sample as a discrete token, yielding vocabularies of size 2^b that quickly exceed memory limits. To solve this, Trilobyte decomposes each b-bit sample into B = ceil(b/8) bytes and interleaves them (MSB to LSB), maintaining a constant vocabulary size of |V| = 256 regardless of bit depth while implicitly learning byte-position distributions autoregressively.

For stereo audio, left and right channels are concatenated in random order rather than sample-level interleaved to allow the model to leverage cross-channel correlations across longer spans. Training is performed using cross-entropy loss over 300K steps. For multi-bit-rate transfer experiments, a single model is trained by randomly dropping out lower-significance bytes using a learned null token (p = 0.1), enabling arbitrary bit-depth compression at inference time.

## Experimental setup

Evaluated across multiple domains: music (MusDB18, Beethoven, YouTube Mix, Commercial 16/24-bit up to 192 kHz), speech (LibriSpeech, LJSpeech, SC09, VCTK), bioacoustics (Birdvox), and sound effects (Epidemic Sound). Evaluated at native bit depths (8-bit, 16-bit, 24-bit) and sample rates ranging from 16 kHz to 48 kHz. Baselines include FLAC (compression level 8), sample-level tokenization, and in-context compression using pre-trained Llama-2-7B. Models were trained for a fixed 300K steps with a standard 90M parameter backbone.

## Results

At 8-bit, Trilobyte matches standard tokenization and substantially outperforms FLAC, achieving 370%, 163%, and 119% improvements on Beethoven, YouTube Mix, and SC09 respectively. At 16-bit, Trilobyte yields modest but consistent gains over FLAC (e.g., 31% on MusDB18 Mono, 21% on LibriSpeech, 29% on Epidemic Sound). At 24-bit commercial music, Trilobyte achieves a 1.48x compression rate, trailing FLAC (1.63x) by 9%, which the authors attribute to FLAC's Rice coding efficiently compressing imperceptible least-significant-bit noise. The pre-trained Llama-2-7B in-context baseline underperforms both FLAC and trained models across nearly all settings.

| System / Condition | SC09 (8-bit) | LibriSpeech (16-bit) | MusDB18 Mixes (16-bit) | Commercial 24-bit | Average Gain vs FLAC |
|---|---|---|---|---|---|
| FLAC (Level 8) | 0.95x | 1.74x | 1.87x | 1.63x | Baseline |
| In-context (Llama-2-7B) | 1.80x | 1.64x | 1.27x | 1.07x | Worse |
| Standard (Sample-level) | 2.08x | 2.06x | 1.85x | Intractable | Strong at low bit depth |
| Trilobyte (Proposed) | 2.08x | 2.11x | 2.08x | 1.48x | +18% at 16-bit |
| Trilobyte (Transfer) | 2.88x | 2.10x | 1.98x | 1.47x | Universal multi-bit model |

## Limitations

ML-based compression models are orders of magnitude slower than FLAC, meaning their modest compression wins do not currently justify their high computational and inference costs for real-world deployment. At 24-bit, the model trails FLAC by 9%, likely struggling with high-resolution least-significant-bit noise patterns. The evaluation is primarily constrained to datasets with controlled resampling (mostly 44.1 kHz/48 kHz) and does not explore extreme multi-channel setups beyond stereo.

## Why read this

Speech and ML researchers working on autoregressive waveform modeling or neural compression should read this paper to understand how byte-level tokenization overcomes vocabulary bottlenecks at scale, and to realistically assess the limits of neural lossless compression against traditional algorithms like FLAC.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Lossless audio archiving, on-device audio storage optimization, and general-purpose byte-stream neural compression.

## Related

- (link related pages by id as the wiki grows)
