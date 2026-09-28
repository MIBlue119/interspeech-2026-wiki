---
id: sohn26_interspeech
category: speech-coding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2984
pdf: https://www.isca-archive.org/interspeech_2026/sohn26_interspeech.pdf
---

# DTM-Codec: Dynamic Token Masking for VFR Speech Coding with Efficient Boundary Selection

[PDF](https://www.isca-archive.org/interspeech_2026/sohn26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sohn26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2984)

**TL;DR** — DTM-Codec is a 127M-parameter neural speech codec utilizing dynamic token masking and a linear-time boundary selector, achieving superior reconstruction and intelligibility over fixed-frame-rate baselines under a strict matched-total-bitrate protocol.

## Problem

Variable frame rate (VFR) neural speech codecs aim to allocate fewer tokens to redundant acoustic regions and more to rapid transitions, but prior works often omit timing-side-information overhead from their bitrate calculations or rely on complex post-training adaptation. Without a controlled same-architecture VFR-versus-FFR comparison incorporating side information, whether VFR truly yields reliable reconstruction gains at a matched total bitrate remains unclear.

## Method

The 127M-parameter DTM-Codec builds on a two-stage transformer encoder-decoder backbone using an STFT/iSTFT front-end/back-end, a single-codebook VQ bottleneck of 16,384 entries (14 bits/token), SwiGLU, RMSNorm, and RoPE. Between encoder stages, it introduces Dynamic Token Masking (DTM): a content-adaptive boundary selector keeps selected tokens, packs them for compressed Stage-2 processing, and fills missing slots with a learnable <MASK> embedding while transmitting a 1-bit binary keep-mask for position-aware decoding. Boundary selection is performed via Path Length Equalization (PLE), an O(N) linear-time algorithm that partitions cumulative feature changes along the encoder trajectory into equal-length segments with negligible overhead. The model is trained solely on LibriSpeech-960 using an adversarial objective combining MPD and MS-STFT discriminators with multi-scale mel-spectrogram L1 and feature-matching losses.

## Results

Trained and evaluated on LibriSpeech-960 under a strict matched-total-bitrate protocol accounting for both content and timing side-information bits, DTM-Codec is compared against fixed-frame-rate (FFR) baselines across low-to-mid bitrates. Across operating points, DTM-Codec broadly improves reconstruction quality and speech intelligibility, outperforming or matching larger external codecs despite its modest scale and single-dataset training. Ablations demonstrate that the masking and packing formulation provides superior reconstruction compared to alternative down/upsampling approaches, and PLE yields well-spread temporal coverage with minimal runtime overhead compared to heuristic or optimization-based boundary selectors.

## Code

- https://github.com/hoyso48/DTM-Codec

## Applications

Speech and ML engineers building downstream applications like speech language models, text-to-speech systems, and low-bitrate audio transmission can use DTM-Codec for efficient tokenization.

## Limitations

The text does not state any specific limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
