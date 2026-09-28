---
id: long26_interspeech
category: speech-coding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1748
pdf: https://www.isca-archive.org/interspeech_2026/long26_interspeech.pdf
---

# Benchmarking Language Modeling for Lossless Compression of Full-Fidelity Audio

[PDF](https://www.isca-archive.org/interspeech_2026/long26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/long26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1748)

**TL;DR** — The paper benchmarks autoregressive language models for lossless audio compression across various bit depths, introducing a byte-level tokenization scheme called Trilobyte that achieves the first tractable 24-bit neural lossless compression.

## Problem

Prior neural lossless audio compression research is restricted to low-fidelity 8-bit audio at 16 kHz, which lacks practical relevance since professional workflows demand 16-bit or 24-bit formats. Direct application of autoregressive language models to higher bit depths causes exponential vocabulary explosion (65K tokens for 16-bit, 16.7M for 24-bit), rendering standard sample-level modeling computationally intractable. Investigating whether language model compression can successfully scale to full-fidelity regimes is therefore critical.

## Method

The authors introduce Trilobyte, a hierarchical byte-level tokenization scheme that decomposes b-bit audio samples into B = ceil(b/8) bytes and predicts over a constant vocabulary of 256 possible byte values regardless of bit depth. This reduces vocabulary scaling from exponential O(2^b) to constant O(1) while implicitly learning separate distributions for each byte position autoregressively. For stereo audio, left and right channels are concatenated in random order rather than interleaved to enable the model to capture cross-channel correlations. The architecture uses a standard decoder-only Transformer similar to GPT-2 (90M parameters), paired with arithmetic coding to convert token probabilities into compressed bitstreams.

## Results

Experiments evaluate models trained for 300K steps across diverse datasets including music (MusDB18, Beethoven, YouTube Mix, and a commercial corpus of 1,569 16-bit songs and 933 24-bit songs up to 192 kHz), speech (LibriSpeech, LJSpeech, SC09, VCTK), and bioacoustics/sound effects (Birdvox, Epidemic Sound). Language models consistently outperform the industry-standard FLAC codec at 8-bit, but compression gains diminish substantially as bit depth increases beyond 8-bit. Trilobyte successfully enables the first tractable language model compression of 24-bit audio while matching full softmax 16-bit modeling performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers designing next-generation audio archiving systems, lossless storage solutions, or general-purpose neural compression frameworks.

## Limitations

Compression gains of language model approaches become increasingly modest compared to traditional codecs like FLAC as bit depth increases beyond 8-bit.

## Related

- (link related pages by id as the wiki grows)
