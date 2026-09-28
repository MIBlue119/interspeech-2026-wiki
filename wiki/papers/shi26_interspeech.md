---
id: shi26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-612
pdf: https://www.isca-archive.org/interspeech_2026/shi26_interspeech.pdf
---

# Distilling LLM Semantic Priors into Encoder-Only Multi-Talker ASR with Talker-Count Routing

[PDF](https://www.isca-archive.org/interspeech_2026/shi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-612)

**TL;DR** — This paper proposes an encoder-only multi-talker ASR framework that distills semantic priors from a frozen LLM teacher during training to enable fast, non-autoregressive serialized CTC decoding at inference time, achieving competitive two-talker performance and substantial gains on three-talker mixtures.

## Problem

Large language models (LLMs) used as autoregressive decoders provide strong semantic priors for multi-talker ASR, but they remain computationally expensive and degrade significantly under heavy speech overlap. Conversely, traditional encoder-only serialized CTC approaches are fast but suffer from training instability without semantic guidance and typically require a fixed, a priori assumption about the number of speakers. This restricts their flexibility and robustness in real-world conversational audio where speaker counts vary dynamically.

## Method

The architecture builds upon a WavLM-Large encoder split into a shared feature extractor, 12 shared Transformer layers, and separate 12-layer Transformer branches dedicated to two- and three-talker configurations. Training occurs in two phases: first, an SOT-based objective adapts a LLaMA-3.2-1B decoder via LoRA and backpropagates semantic guidance into the encoder; second, a post-encoder LSTM separator and serialized CTC heads are optimized using a hybrid objective combining serialized CTC loss and the frozen LLM's SOT teacher signal. To handle variable talker counts, a Talker-Count Head (TCH) uses attentive-statistics pooling over encoder frames to classify mixture dimensionality and dynamically route inference to the correct speaker branch.

## Results

Evaluated on Libri2Mix and Libri3Mix datasets, the proposed encoder-only model matches or approaches the word error rate (WER) of heavyweight LLM-decoding baselines on two-talker mixtures while significantly outperforming them on the more challenging three-talker mixtures. On the Libri3Mix evaluation set, the model achieves a clean WER of 14.3% and a noisy WER of 24.5%, outperforming SOT-Llama-1B (21.6% / 39.1%) and SOT-Llama-3B (22.0% / 31.7%). Real-time factor (RTF) measurements on an NVIDIA H100 GPU demonstrate dramatic inference acceleration compared to autoregressive LLM decoders, dropping from 0.0981 to 0.0106 on 3-mix datasets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech recognition engineers and developers building real-time multi-speaker transcription systems, meeting transcription tools, or voice assistant backends that need to process overlapping speech efficiently without the latency of generative LLM decoders.

## Limitations

While talker-count classification accuracy is extremely high for two-talker conditions, predicting the exact speaker count for three-talker mixtures remains difficult and less reliable.

## Related

- (link related pages by id as the wiki grows)
