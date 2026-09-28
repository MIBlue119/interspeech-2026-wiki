---
id: zhu26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2455
pdf: https://www.isca-archive.org/interspeech_2026/zhu26c_interspeech.pdf
---

# Token-Independent Language Representations for Low-Latency Configurable Multilingual Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/zhu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2455)

**TL;DR** — The paper introduces token-independent language representations for configurable multilingual automatic speech recognition to eliminate per-token decoding latency overheads while matching the accuracy of existing neural language-specific modules.

## Problem

Configurable multilingual speech recognition models use language-specific modules (LSMs) in their decoders to let users activate custom language combinations at inference time. However, because these LSMs operate as neural layers executed autoregressively at every decoding step, their computational overhead scales linearly with output token length and quadratic relative to hidden dimensions. This creates a severe latency bottleneck for long utterances in real-world deployment scenarios.

## Method

The authors propose decoupling language identity from the autoregressive loop by replacing per-token decoder LSM neural projections with static token-independent vectors (CMM-S). To restore model capacity lost from dropping token-level dynamics, they introduce CMM-D, which fuses static vectors with utterance-level dynamic cues extracted via global average pooling and a small adapter from the top CTC-supervised encoder layer. The resulting encoder-informed language representations are computed once per utterance and cached. The architecture is built on a 12-layer Conformer encoder and 6-layer Transformer decoder (dmodel=512) using ESPnet, trained on 7K hours of MLS data and a 3K-hour-per-language in-house 4-language corpus.

## Results

Evaluated on LibriSpeech, Multilingual Librispeech (MLS), and a 4-language custom corpus (Cantonese, Mandarin, English, Malay), CMM-D matches the exact Word Error Rate (WER) accuracy of the original token-dependent CMM baseline (e.g., 8.70 average WER on MLS all-hot). While the original CMM adds up to 107.88 seconds of latency overhead for long utterances (110-130 tokens), the proposed CMM-S and CMM-D maintain a near-constant overhead of approximately 2.5s and 7.3s, respectively, reducing peak inference latency overhead by over 90%. Additionally, CMM-S reduces language-specific parameter footprints by 256x per language compared to the baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice assistants, real-time transcription services, and multilingual translation systems requiring low-latency deployment of configurable multi-language models on edge or server hardware.

## Limitations

The effectiveness of language-specific specialization strongly depends on having sufficient training data volume per language to properly optimize the underlying LSMs.

## Related

- (link related pages by id as the wiki grows)
