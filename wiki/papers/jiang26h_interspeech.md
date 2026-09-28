---
id: jiang26h_interspeech
category: speech-coding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3506
pdf: https://www.isca-archive.org/interspeech_2026/jiang26h_interspeech.pdf
---

# An Ultra-Low-Bitrate Neural Speech Codec with Plain-to-Pseudo Synergistic Vector Quantization

[PDF](https://www.isca-archive.org/interspeech_2026/jiang26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jiang26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3506)

**TL;DR** — P2PSynCodec introduces a plain-to-pseudo synergistic vector quantizer to achieve 75% bitrate reduction, matching 2.0 kbps baseline quality at only 0.5 kbps.

## Problem

Most neural speech codecs rely on residual vector quantization where every stage consumes identical bitrates, causing severe quality degradation at ultra-low bitrates like 0.5 kbps. Alternatively, scaling up model capacity yields heavy models that are impractical for real-world deployment on resource-constrained devices. This creates a critical tension between maintaining lightweight model complexity and preserving long-term spectral structure and expressiveness at ultra-low bitrates.

## Method

The codec operates on modified discrete cosine transform (MDCT) spectra using a fully convolutional encoder and decoder built on modified ConvNeXt v2 blocks. At its core, the plain-to-pseudo synergistic vector quantizer (P2PSVQ) cascades one plain VQ with N pseudo VQs (set to N=3). The plain VQ computes basic tokens that are transmitted and contribute to the bitrate, while the pseudo VQs predict auxiliary tokens via neural prediction using 3 Conformer blocks and 2 bidirectional LSTM layers without incurring any transmitted bitrate. Training employs a two-stage paradigm: first training an RVQ-based teacher codec, and subsequently freezing all components except the pseudo VQs, which are trained via teacher forcing and cross-entropy loss under the supervision of the teacher codec.

## Results

Evaluated on the LibriTTS (16 kHz) and VCTK (48 kHz) datasets using metrics including UTMOS, SIGMOS, STOI, and ViSQOL alongside MUSHRA and ABX subjective listening tests. P2PSynCodec at 0.5 kbps outperforms equal-bitrate RVQ and single-codebook baselines (surpassing MDCTCodec and DAC by over one point on UTMOS at 16 kHz) and achieves reconstruction quality comparable to competing codecs operating at 2.0 kbps (a 75% bitrate reduction). It achieves comparable quality to BigCodec while utilizing only about 5% of its FLOPs and 14% of its parameters. Ablation studies on the number of pseudo VQs N demonstrate that N=3 provides the optimal balance, as excessively large N causes the plain VQ to carry insufficient information, leading to degraded prediction accuracy and lower subjective quality.

## Code

- https://pb20000090.github.io/P2PSynCodec/

## Applications

Engineers building satellite communications, on-device audio storage, and IoT-based voice interfaces under strict bandwidth or storage constraints.

## Limitations

The current architecture uses non-causal operations, making it unsuitable for real-time and streaming applications without future adaptations.

## Related

- (link related pages by id as the wiki grows)
