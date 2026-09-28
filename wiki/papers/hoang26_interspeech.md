---
id: hoang26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1060
pdf: https://www.isca-archive.org/interspeech_2026/hoang26_interspeech.pdf
---

# Towards Efficient Simultaneous Inverse Text Normalization with Pretrained Text-to-Text Language Model and Read-Tag-Write Policy

[PDF](https://www.isca-archive.org/interspeech_2026/hoang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hoang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1060)

**TL;DR** — This paper introduces an efficient streaming end-to-end Inverse Text Normalization (ITN) framework using a pretrained text-to-text language model and a Read-Tag-Write policy, achieving accuracy comparable to non-streaming baselines while satisfying real-time constraints.

## Problem

Inverse Text Normalization converts spoken-form ASR outputs into written form, but existing streaming methods rely on hybrid architectures that combine neural taggers with fragile, expert-crafted finite-state transducer (FST) rules and extensive IOB labeling. While standard sequence-to-sequence models offer data-driven scalability, their global attention mechanisms prevent them from operating in a streaming fashion. This lack of scalable streaming E2E ITN solutions impedes real-time applications like live ASR and meeting transcription.

## Method

The authors adapt the 275M-parameter EnViT5-base pretrained text-to-text model into a streaming architecture featuring a streaming encoder with Dynamic Right Context (DRC) masking, a joint 3-class {B, I, O} tagger, and an autoregressive decoder. They propose a Read-Tag-Write (RTW) decoding policy that instantly passes through verbatim tokens (O) and selectively invokes the decoder only upon completing normalization spans, supported by encoder KV caching and a Copy-Paste strategy. Training utilizes a multi-task objective combining tag classification cross-entropy and sequence generation loss, alongside a prefix-based training data augmentation strategy.

## Results

Evaluated on a newly curated 5-million-sentence Vietnamese ITN dataset featuring automated alignments and boundary tags, the proposed streaming end-to-end approach achieves accuracy comparable to offline non-streaming baselines. It successfully outperforms existing streaming hybrid methods while maintaining strict real-time low-latency constraints through selective span decoding and KV caching.

## Code

- https://huggingface.co/VietAI/envit5-base

## Applications

Engineers building real-time speech systems such as live ASR, streaming meeting transcription, and simultaneous speech translation can use this method to automatically format spoken transcripts into readable written text.

## Related

- (link related pages by id as the wiki grows)
