---
id: variani26_interspeech
category: speech-coding
labels: [multilingual, self-supervised]
institutions: ["Google"]
code: https://github.com/google-research/mseb/tree/main/mseb
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2487
pdf: https://www.isca-archive.org/interspeech_2026/variani26_interspeech.pdf
---

# Representational Instability in Decoupled Audio Encoders

*Ehsan Variani, Tom Bagby, Georg Heigold, Ke Wu, Cyril Allauzen*

[PDF](https://www.isca-archive.org/interspeech_2026/variani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/variani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2487)

**Category:** `speech-coding` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — The paper introduces the Stability-Rate-Distortion (SRD) framework and Continuous Edit Distance (CED) to measure representational drift in audio encoders, revealing that neural codecs suffer from a catastrophic "Quantization Penalty" while semantic ASR models pay a cross-lingual "Language Tax."

## Key contributions

- Formulates the Stability-Rate-Distortion (SRD) trade-off framework, establishing representational stability as a mandatory third evaluation axis alongside bitrate and reconstruction distortion.
- Introduces Continuous Edit Distance (CED), an architecture-agnostic metric utilizing a unit hypersphere projection and bounded substitution/temporal gap costs (w_ins = w_del = 2.0) to quantify geometric drift.
- Isolates the Quantization Penalty through an empirical benchmark showing that while continuous neural codec latents remain stable, vector quantization (VQ/RVQ) shatters them into disparate discrete token sequences.
- Exposes the cross-lingual "Language Tax," demonstrating that while Whisper's acoustic encoder hidden states are uniformly stable, its discrete transcript stability collapses on low-resource dialects due to weak linguistic priors.

## Problem

Modern audio processing increasingly relies on decoupled or open-loop architectures where compressed latent representations or discrete tokens serve as universal inputs for downstream models like Large Language Models and speech translators. However, traditional audio codecs and semantic encoders are optimized strictly for reconstruction distortion or perceptual realism, leaving their latent manifolds hyper-sensitive to localized acoustic nuisances. When an encoder lacks representational stability, minor perturbations that do not alter the underlying semantic manifold trigger catastrophic representational drift or sequence-level token flips. This architectural fragility causes semantic hallucinations and failures in downstream downstream multi-modal generative systems, highlighting the need for a unified evaluation framework and stability-aware training objectives.

## Method

The evaluation framework assesses representations across spectral baselines, Whisper (Large-v3), EnCodec, and SoundStream using a controlled frequency-domain FFT-SpecAugment protocol. The waveform is transformed via STFT (N-FFT=2048, Hop Length=512) and subjected to randomized continuous magnitude masking (up to 20% temporal steps, max 100 frames; up to 15% frequency bins, max 27 bins) before inverse-STFT reconstruction, creating semantic-preserving perturbations that simulate the stochastic nuisance process N while keeping the unmasked regions bit-perfect.

To measure continuous drift without the unbounded scaling of Dynamic Time Warping (DTW) or the phase-jitter sensitivity of L2 norms, Continuous Edit Distance (CED) projects all latent frames onto a unit hypersphere via L2 normalization (bounding frame substitution cost at 2.0) and uses a dynamic programming recurrence with strict temporal elasticity penalties (w_ins = w_del = 2.0). For discrete tokens, Unit Edit Distance (UED) calculates corpus-level micro-averaged Levenshtein operations (insertions, deletions, substitutions). The work further outlines an analytical extension toward a fully differentiable Soft-CED loss function via Log-Sum-Exp smoothing to internalize stability constraints during training.

## Experimental setup

Evaluated on clean studio-quality reference audio from the Massive Sound Embedding Benchmark (MSEB) Simple Voice Questions (SVQ) dataset across 26 diverse dialects. Compares raw spectrograms, Whisper Large-v3 (continuous acoustic encoder hiddens and discrete transcripts), EnCodec (projected latents, quantized latents, and discrete RVQ codes), and SoundStream (projected latents and discrete codes). Metrics include Continuous Edit Distance (CED), Unit Edit Distance (UED), L2 distance, Dynamic Time Warping (DTW), and Word Error Rate (WER).

## Results

Continuous representations demonstrated high structural stability across all 26 evaluated languages, with baseline spectrogram CED bounded near 0.008 and Whisper hidden states maintaining a stable CED near 0.11 regardless of dialect. In stark contrast, discrete symbolic representations suffered severe degradation: EnCodec discrete codes spiked in drift, while SoundStream experienced near-total token sequence shattering with a baseline en-US UED reaching 0.888 despite its continuous latents remaining structurally stable.

In cross-lingual evaluations, Whisper's acoustic encoder exhibited flat, uniform stability across all 26 languages, but its discrete transcript stability correlated directly with its baseline Word Error Rate, causing severe token degradation and collapse on low-resource dialects such as Bengali (bn-IN), Telugu (te-IN), and Arabic (ar-X-Gulf) due to weak internal language model priors.

| System / Condition | CED (Continuous) | UED (Discrete) | Baseline WER | Notable Behavior |
| --- | --- | --- | --- | --- |
| Spectrogram Baseline | ~0.008 | — | — | Highly stable acoustic envelope |
| Whisper (Large-v3) | ~0.11 (Hiddens) | ~0.089 (en-US) | Low (High-res) | Stable high-res, collapses on low-res |
| EnCodec | ~0.02 (Latents) | ~0.195 (en-US) | — | Quantization bottleneck spikes drift |
| SoundStream | ~0.05 (Latents) | ~0.888 (en-US) | — | Severe token shattering/collapse |

## Limitations

The empirical evaluation is restricted to synthetic localized FFT-based SpecAugment masking and does not test performance under complex real-world global noise or reverberation conditions. The cross-lingual analysis is limited to 26 dialects within a single benchmark dataset (MSEB SVQ). Furthermore, CED and Soft-CED remain diagnostic and analytical frameworks in this work rather than being fully integrated as active training constraints.

## Why read this

Speech and machine learning engineers building audio-LLMs or decoupled multimodal systems will take away a rigorous foundational critique of standard neural audio tokens, learning why discrete vector quantization causes catastrophic sequence shattering under minor perturbations.

## Code

- https://github.com/google-research/mseb/tree/main/mseb

## Applications

Improving the robustness of speech foundation models, audio-LLMs, speech-to-speech translation pipelines, and stable tokenization schemes for multi-modal generation.

## Institutions / 機構

Google

## Related

- (link related pages by id as the wiki grows)
