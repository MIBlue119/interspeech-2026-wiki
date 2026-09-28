---
id: viakhirev26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1420
pdf: https://www.isca-archive.org/interspeech_2026/viakhirev26_interspeech.pdf
---

# From Dispersion to Attraction: Spectral Dynamics of Hallucination Across Whisper Model Scales

[PDF](https://www.isca-archive.org/interspeech_2026/viakhirev26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/viakhirev26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1420)

**TL;DR** — This paper proposes the Spectral Sensitivity Theorem to explain ASR hallucinations as a scale-dependent phase transition from signal dispersion to rank-1 attractor collapse, validated on Whisper models under adversarial stress.

## Problem

Large speech recognition models frequently hallucinate outputs that are fluent yet completely decoupled from the acoustic input, especially under adverse conditions like noise or silence. Standard confidence metrics and log-probabilities fail to catch these failures because the models remain locally certain of their states. Existing work treats these errors via post-hoc detection or general transformer rank collapse without explaining the internal representational dynamics that drive acoustic decoupling across different model scales.

## Method

The authors introduce the Spectral Propagation Instability (SPI) framework and the Spectral Sensitivity Theorem, modeling layer-wise signal propagation and cumulative Jacobians with respect to context. They analyze Whisper models ranging from Tiny (39M) to Large-v3-Turbo (809M) using an adversarial 'Hell' dataset of 5,559 LibriSpeech samples modified with time stretching, multi-speaker mixing, and 0dB Gaussian noise. SVD-based spectral observables are tracked across layers, including Effective Rank (Neff), spectral decay slope (Alpha), and the Kirchhoff Index (Kf), to quantify cross-attention coupling and self-attention attractor formation.

## Results

Evaluated on LibriSpeech clean and other test splits under adversarial stress, intermediate models (Small) exhibit Structural Disintegration (Regime I) marked by a 13.4% collapse in Cross-Attention rank and exponential growth in Kirchhoff Index. Conversely, large models (Large-v3-Turbo) enter a Compression-Seeking Attractor state (Regime II), where Self-Attention actively compresses rank by 2.34% and steepens the spectral slope, decoupling the model from acoustic evidence. Ablations across tiny, small, and large scales reveal that smaller models suffer severe signal decay in cross-attention while larger models undergo spectral hardening.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers studying model reliability can use these spectral diagnostics for real-time hallucination detection and to design spectral regularizations against low-rank collapse in encoder-decoder ASR architectures.

## Limitations

The theoretical and empirical analysis is strictly restricted to the Whisper model family.

## Related

- (link related pages by id as the wiki grows)
