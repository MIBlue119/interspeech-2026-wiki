---
id: hong26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1312
pdf: https://www.isca-archive.org/interspeech_2026/hong26_interspeech.pdf
---

# Convolutional Dynamic Rotary Positional Encoding

[PDF](https://www.isca-archive.org/interspeech_2026/hong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1312)

**TL;DR** — The paper introduces Convolutional Dynamic Rotary Positional Encoding (CD-RoPE), which dynamically warps the temporal index of Rotary Position Embedding using local acoustic context to improve ASR accuracy and robustness while reducing model parameters.

## Problem

Standard positional encoding methods like RoPE and RelPos use discrete, uniformly spaced integer indices that fail to align with the continuous and semantically variable nature of speech features. Furthermore, standard RoPE can diverge during ASR training, and architectures lacking local convolutional paths in their attention branches struggle to capture fine-grained local temporal dynamics. Addressing this is crucial for building robust speech recognition models that handle diverse acoustic contexts and temporal variations effectively.

## Method

The authors propose Convolutional Dynamic RoPE (CD-RoPE), which computes a continuous, input-conditioned positional time-shift using a lightweight depthwise-separable 1D convolution over the full model dimension before head splitting. This predicted shift is bounded to the range [-1, 1] using a hyperbolic tangent activation and scaled via a ReZero-style learnable gating parameter. The resulting time-shift is additively combined with the base integer index before multiplication by inverse frequencies, preserving RoPE's harmonic structure and geometric properties across frequency bands. CD-RoPE is integrated into the Branchformer encoder architecture, replacing standard relative positional encodings. The evaluated model comprises 18 encoder layers and 6 decoder layers with a model hidden dimension of 512 and 8 attention heads, totaling 107.6M parameters.

## Results

Evaluated on the 960-hour LibriSpeech dataset using CTC/attention joint decoding with language model rescoring, CD-RoPE achieves consistent word error rate improvements over the RelPos baseline across all test sets, recording WERs of 1.96% on dev-clean, 2.13% on test-clean, and 4.95% on test-other while utilizing 2.2M fewer parameters than RelPos. On Speech Robust Bench (SRB) test-clean perturbations, CD-RoPE demonstrates superior robustness particularly under temporal perturbations, outperforming the baseline across tempo and speed variations (e.g., speedup severity 4 WER of 72.98% compared to 75.69%). Preliminary kernel size sweeps on a 100-hour subset identified a kernel size of 9 as optimal and stable for the depthwise convolution.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech recognition engineers and researchers working on transformer-based ASR encoders, particularly those utilizing Branchformer architectures or seeking robust performance under temporal speech perturbations.

## Related

- (link related pages by id as the wiki grows)
