---
id: huang26o_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2234
pdf: https://www.isca-archive.org/interspeech_2026/huang26o_interspeech.pdf
---

# Neural Directional Coding: Joint Spatial Coding and Filtering with Configurable Directivity Patterns

[PDF](https://www.isca-archive.org/interspeech_2026/huang26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2234)

**TL;DR** — Neural Directional Coding (NDC) jointly performs spatial coding and filtering to synthesize configurable virtual directional microphones from a compressed spatial bitstream and a single-channel reference, achieving superior quality at 0.25 kbps compared to a 7.5 kbps baseline.

## Problem

Transmitting full multichannel microphone array data for receiver-side spatial filtering requires unacceptably high bit rates. While standard neural audio codecs can compress single channels and spatial codecs can reconstruct full arrays, cascading them with neural directional filtering is inefficient. NDC addresses this gap by directly compressing only the necessary spatial information and estimating a single-channel complex mask at the decoder based on user-configured directivity patterns.

## Method

The architecture features a spatial information coding module based on a modified SpatialCodec encoder-quantizer-decoder, and a non-linear spatial filter estimation module based on FiLM-conditioned BLSTMs. The encoder processes real-valued multichannel tensor representations to output low-dimensional spatial latents compressed via Residual Vector Quantization (RVQ) down to 0.25 or 0.5 kbps. At the receiver, these spatial latents are concatenated with an EVS-coded single-channel reference signal and modulated with user-specified directivity pattern vectors sampled at 72 angles using feature-wise linear modulation (FiLM). A two-stage training strategy first exposes the encoder to diverse source setups using simple patterns before freezing it to train the pattern-adaptive mask estimation module on 144 hours of simulated room data.

## Results

Evaluated on speech samples from the EARS dataset using a 4-channel, 16 kHz microphone array, NDC compressed spatial information to 0.25 kbps with a 1.4 M parameter model. It matched or surpassed a 7.5 kbps baseline utilizing the original SpatialCodec (90.8 M parameters) combined with independent UNDF filtering. Ablations confirmed that unnormalized spectral inputs work better than absolute-magnitude-normalized inputs for spatial encoding.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech communication systems, spatial audio streaming, and teleconferencing applications requiring high-order directional microphone synthesis at very low bit rates.

## Limitations

Evaluated primarily in simulated anechoic environments with up to three sound sources.

## Related

- (link related pages by id as the wiki grows)
