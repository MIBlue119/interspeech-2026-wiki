---
id: zhang26ga_interspeech
category: speech-coding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3314
pdf: https://www.isca-archive.org/interspeech_2026/zhang26ga_interspeech.pdf
---

# A Dual-Stream Discrete Neural Codec with Fixed-Length Global Speaker Tokens and Dynamic Frame Rates for Low-Bitrate Speech Tokenization

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26ga_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26ga_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3314)

**TL;DR** — The paper introduces DySTCodec, a low-bitrate dual-stream discrete neural speech codec combining a similarity-based dynamic frame aggregation semantic stream with fixed-length global speaker tokens.

## Problem

Many neural audio codecs rely on high token rates and entangle semantic content with speaker-specific timbre in a single sequence, which severely increases the modeling burden for downstream speech language models. Existing single-codebook or fixed-rate models either lack temporal redundancy reduction or fail to cleanly decouple speaker characteristics, leading to trade-offs between intelligibility, bitrate, and voice cloning fidelity.

## Method

DySTCodec features a global encoding pathway using an ECAPA-TDNN encoder and query-based token aggregation mapped via finite scalar quantization (FSQ) into 32 global tokens (4096 codebook size, 12 bits per token), and a semantic encoding pathway that extracts features from a timbre-perturbed waveform using a frozen Wav2Vec2.0 encoder. To reduce redundancy, a similarity-based dynamic frame aggregation module merges consecutive frames above a threshold tau, refined by a local-window transformer aggregation module and a 12-block ConvNeXt semantic encoder (codebook size 8192). An adaptive deaggregation module paired with a non-causal bottleneck transformer restores the 50 Hz frame timeline to eliminate boundary artifacts before a Vocos-style upsampling waveform decoder reconstructs the 16 kHz audio.

## Results

Evaluated on the 16 kHz LibriSpeech corpus, DySTCodec is compared against baselines including FACodec, FlexiCodec, DAC, TiCodec, SpeechTokenizer, WavTokenizer, and Single-Codec across varying low bitrates. The total bitrate is approximately 702 bps for the 50 Hz fixed-rate semantic variant and drops further using dynamic frame aggregation thresholds (tau = 0.90 yielding ~40 tokens/s, tau = 0.84 yielding ~25 tokens/s). The model demonstrates strong objective reconstruction scores and robust cross-dataset voice conversion capabilities from LibriSpeech sources to VCTK targets while maintaining speaker similarity and intelligibility.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech language model-based text-to-speech systems, ultra-low-bitrate speech compression, and zero-shot voice conversion pipelines.

## Limitations

The text does not explicitly state major limitations beyond the typical scope bounds of neural audio codec compression trade-offs.

## Related

- (link related pages by id as the wiki grows)
