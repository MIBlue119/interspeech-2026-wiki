---
id: cao26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1737
pdf: https://www.isca-archive.org/interspeech_2026/cao26b_interspeech.pdf
---

# Audio-NSP: Data-Centric Semi-Autoregressive Generation for Large Audio-Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/cao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1737)

**TL;DR** — Audio-NSP uses data-centric supervised fine-tuning and a modality-aware dynamic truncation strategy to enable semi-autoregressive parallel decoding in large audio-language models, achieving up to a 3.42x speedup with minimal quality loss.

## Problem

Large audio-language models unify speech and text modalities within a shared autoregressive decoder, but decoding long discrete audio sequences sequentially introduces severe inference latency. Traditional parallel approaches like non-autoregressive models require expensive training from scratch, while multi-token prediction baselines rely on auxiliary draft heads that struggle with complex acoustic mappings and suffer from significant quality degradation.

## Method

The framework, named Audio-NSP, avoids architectural modifications by restructuring training sequences through appended anchor-mask blocks of length W=4, customized attention masks for intra-block visibility, and cross-entropy loss computed on mask tokens. It handles the entropy gap between deterministic text and high-entropy speech via a modality-aware dynamic truncation strategy that assigns distinct confidence thresholds (tau_text = 0.8 and tau_audio = 0.2). Built upon the VITA-Audio-Plus-Vanilla model, the network is trained with a dynamic packing strategy using a learning rate of 5e-6 and a batch size of 256 for 140k steps.

## Results

Evaluated across ASR, spoken question answering (SQA), and TTS benchmarks including WenetSpeech, AIShell, LibriSpeech, and Seed-TTS, Audio-NSP achieves speedups ranging from 1.88x to 3.42x tokens per step. On ASR tasks, it limits Word Error Rate degradation to a marginal +0.35% while yielding an average speedup of around 3.17x, substantially outperforming multi-token prediction baselines. In TTS tasks, the modality-aware truncation strategy prevents acoustic corruption, consistently preserving lower WER and CER compared to baseline multi-token architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers deploying large audio-language models for real-time speech interaction, spoken question answering, and streaming text-to-speech synthesis.

## Limitations

Audio generation speedups are more moderate (~1.9x) than understanding tasks (~3.0x) due to the necessity of fine-grained steps in high-entropy acoustic transitions to preserve fidelity.

## Related

- (link related pages by id as the wiki grows)
