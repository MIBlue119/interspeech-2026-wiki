---
id: ye26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-21
pdf: https://www.isca-archive.org/interspeech_2026/ye26_interspeech.pdf
---

# Which Speech Representation Better Matches Text-Native Reasoning? A Study of Speech-Text Alignment on Frame Rate and Representation

[PDF](https://www.isca-archive.org/interspeech_2026/ye26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ye26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-21)

**TL;DR** — This paper investigates speech-text alignment for spoken dialogue models by freezing the text LLM backbone and matching speech frame rates closer to text token rates, identifying an optimal regime at 4.17 Hz.

## Problem

Spoken dialogue models built on text LLM backbones frequently suffer from degraded reasoning capabilities when processing speech instead of text. The authors attribute this modality gap to a temporal-granularity mismatch, where traditional high-rate speech tokenizers (12.5–50 Hz) create excessive sequence lengths that dilute per-token semantic density and disrupt text-native pretraining dynamics. Because prior systems typically adapt the full model end-to-end, the isolated impact of speech representation choices and frame rates has remained undiagnosed.

## Method

The study freezes the text LLM backbone and treats speech tokenization as a representation selection problem under a fixed information rate. To prevent severe information bottlenecks at extreme low frame rates down to 2.08 Hz, the authors introduce a factorized finite scalar quantization (FSQ) scheme combined with a lightweight non-autoregressive (NAR) audio LM head that processes parallel slot-augmented queries. Additionally, they employ an InfoNCE-based contrastive loss for intermediate-layer representation alignment between speech and text embeddings.

## Results

Evaluating on LibriSpeech-960h and speech QA benchmarks using approximately 2.5k hours of training data and an LLM backbone with around 100M trainable parameters, the framework demonstrates that mid-layer representation alignment significantly outperforms embedding-level or late-layer alignment. Systematic sweeps reveal a consistent optimal operating point for speech QA at a frame rate of 4.17 Hz combined with intermediate-layer cross-modal alignment. The proposed factorized FSQ avoids the sharp word error rate (WER) explosions seen in standard single-codebook designs at low frame rates.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building end-to-end spoken dialogue systems, speech-to-speech translation pipelines, and voice assistants can use these findings to optimize tokenization frame rates and cross-modal alignment strategies without retraining the core text LLM.

## Limitations

The study scope is restricted to a frozen text LLM setup evaluated primarily on English speech tasks (LibriSpeech), leaving full joint end-to-end multi-modal adaptation and multilingual generalization as open grounds.

## Related

- (link related pages by id as the wiki grows)
