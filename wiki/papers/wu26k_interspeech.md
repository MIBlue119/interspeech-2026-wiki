---
id: wu26k_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2124
pdf: https://www.isca-archive.org/interspeech_2026/wu26k_interspeech.pdf
---

# Leveraging Temporal Redundancy via Layer-wise Key-Value Pooling Attention for Efficient ASR

[PDF](https://www.isca-archive.org/interspeech_2026/wu26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2124)

**TL;DR** — The paper introduces Key-Value Pooling Attention (KV-Pooling) for ASR, which reduces self-attention complexity by downsampling Keys and Values using layer-wise differential average pooling while keeping Queries at full resolution, improving AISHELL-1 CER by 0.2% absolute and inference RTF by 10%.

## Problem

Standard Transformer-based ASR models suffer from $O(T^2)$ computational complexity in self-attention due to processing long speech sequences frame-by-frame. Existing macro-level downsampling methods cause temporal aliasing and destroy fine-grained acoustic boundaries, while speech inherently contains extreme temporal redundancy that makes full-sequence Key-Value computations inefficient.

## Method

The authors propose KV-Pooling Attention, which decouples Query and Key/Value temporal resolutions by applying temporal average pooling to Key and Value tensors with a stride of $s$, reducing complexity to $O(T^2/s)$. To resolve positional granularity mismatch, they introduce a Center-Aligned Relative Positional Encoding strategy that maps pooled Key indices back to the temporal centers of their acoustic windows. They also design strict causal and padding mask adaptations to ensure streaming compatibility. Guided by inter-frame cosine similarity and information entropy analyses across encoder layers, a Layer-wise Differential Pooling strategy is integrated into Zipformer (using optimal strides of {4, 2, 1, 2} across macro-stages). Experiments use Small, Medium, and Large Zipformer configurations with RNN-T loss, trained with SpecAugment and speed perturbation.

## Results

Evaluated on Mandarin AISHELL-1 (178 hours) and English LibriSpeech (960 hours) datasets using Pruned RNN-T, compared against native Zipformer baselines. On AISHELL-1, the Large model reduces test CER from 6.58% to 6.35% while improving RTF from 0.1280 to 0.1121 on an AMD EPYC 7763 CPU. On LibriSpeech, the Large model improves test-clean/test-other WER from 3.33%/8.32% to 3.30%/8.09%, and Medium/Small models show notable WER improvements on the harder test-other sets. Ablation studies confirm that parameter-free average pooling outperforms convolutional pooling, and the layer-wise differential stride {4, 2, 1, 2} achieves the best accuracy-speed trade-off compared to uniform or monotonic strides.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building on-device, streaming, or long-form ASR systems who need to reduce computational latency and memory footprint without sacrificing recognition accuracy.

## Limitations

Smoothing clean speech features via pooling can occasionally cause minor word error rate regressions on high-resolution clean subsets (e.g., LibriSpeech test-clean for smaller model scales) due to obscuring subtle phonetic details.

## Related

- (link related pages by id as the wiki grows)
