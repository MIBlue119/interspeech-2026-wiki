---
id: zhao26_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-218
pdf: https://www.isca-archive.org/interspeech_2026/zhao26_interspeech.pdf
---

# TF-MossFormer: Integrating Convolution Gated Local-Global Attentions for Enhanced Time-Frequency Domain Monaural Speech Separation

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-218)

**TL;DR** — TF-MossFormer combines local and global self-attentions with convolutional gating in the time-frequency domain to achieve a scale-dependent SI-SDR improvement up to 24.4 dB on WSJ0-2Mix.

## Problem

Pure global attention transformers excel at capturing long-range speech context but frequently neglect fine-grained local spectral continuity like harmonic structures and phoneme transitions. Conversely, conventional time-domain or rigid convolution methods struggle to jointly model multi-scale temporal and frequency dependencies across 2D spectrograms. Overcoming this gap is crucial for robust monaural speech separation where both speaker identity and fine acoustic details must be preserved.

## Method

TF-MossFormer operates in the STFT domain, predicting real and imaginary complex spectra via a dual-path encoder-separator-decoder layout adapted from TF-GridNet. The core separator stacks B alternating frequency and temporal blocks, each leveraging RMSGroupNorm, Conv-SwiGLU feed-forward networks, and a hybrid attention module. This attention module combines content-aware sliding-window local multi-head self-attention with full-sequence global attention. Furthermore, it applies a 1D convolution and Swish-based gating mechanism to optimize feature selection and information flow.

## Results

Evaluated on the WSJ0-2Mix monaural speech separation benchmark sampled at 8 kHz using the ESPnet pipeline. The small (S), medium (M), and large (L) variants achieve SI-SDR improvements of 22.6 dB (5.9M params), 24.0 dB (16.9M params), and 24.4 dB (25.4M params), respectively. Ablation studies confirm that a cascading local-then-global attention layout with a sliding window of wT = 31 and wF = 7 delivers optimal separation performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers building front-ends for robust automatic speech recognition, hearing aids, or multi-talker communication systems.

## Related

- (link related pages by id as the wiki grows)
