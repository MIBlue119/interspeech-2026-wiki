---
id: wu26n_interspeech
category: speech-deepfake-detection
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3212
pdf: https://www.isca-archive.org/interspeech_2026/wu26n_interspeech.pdf
---

# Quantizer-Aware Hierarchical Neural Codec Modeling for Speech Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/wu26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3212)

**TL;DR** — The paper introduces Quantizer-Aware Static Fusion (QAF-Static), a lightweight method that integrates neural audio codec residual hierarchies with self-supervised speech models, achieving a 46.2% relative EER reduction on ASVspoof 2019.

## Problem

Self-supervised learning (SSL) speech encoders provide powerful contextual representations for deepfake detection, but their high-level abstractions often smooth out fine-grained acoustic and transient artifacts left by synthetic speech generation. Conversely, neural audio codecs discretize speech through residual vector quantization (RVQ) into a coarse-to-fine hierarchy that naturally captures residual synthesis details, yet existing forensic systems either ignore this quantizer hierarchy or treat codec outputs as flat, continuous embeddings. Explicitly modeling and aligning the RVQ quantizer hierarchy with SSL features remains an unexplored challenge in speech anti-spoofing.

## Method

The framework freezes a WavLM-Large SSL backbone (using the first 12 layers combined via Attentive Merging) and integrates it with a Facebook EnCodec feature extractor containing Q=8 residual quantizers, codebook size of 1024, and embedding dimension of 128. To exploit the RVQ hierarchy, the authors propose Quantizer-Aware Static Fusion (QAF-Static), a parameter-efficient operator that learns a dimension-wise static reweighting matrix across residual quantizers, normalized using a temperature parameter to form a hierarchy-guided codec representation. This aggregated codec feature is temporally aligned and combined with SSL features via late concatenation and a single linear projection, followed by a lightweight single-layer LSTM classifier and linear output layer. The EnCodec branch adds only 4.4% additional parameters relative to the SSL backbone, and is evaluated under both frozen (codecF) and fine-tuned (codecT) settings.

## Results

Evaluated on ASVspoof 2019 Logical Access and ASVspoof 5 datasets using Equal Error Rate (EER, %) as the primary metric. On ASVspoof 2019 LA, QAF-Static achieves an EER of 0.44% (frozen codec) compared to the AttM baseline of 0.65%, yielding a 32.3% relative improvement. On ASVspoof 5, QAF-Static with a fine-tuned codec (codecT) reaches 5.68% EER, representing a 13.9% relative improvement over the AttM baseline (6.60%) and outperforming fully fine-tuned SSL baseline models. Compared against quantizer mean pooling (Method 1), the QAF-Static approach (Method 2) consistently demonstrates superior forensic performance across benchmarks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and security system developers building robust audio deepfake detection and voice anti-spoofing countermeasures for telephony, media verification, and forensic auditing.

## Limitations

The current QAF-Static framework employs a static, input-independent weighting mechanism across quantizer dimensions to preserve training stability, leaving sample-specific adaptive weighting to future work.

## Related

- (link related pages by id as the wiki grows)
