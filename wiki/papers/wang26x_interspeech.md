---
id: wang26x_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1345
pdf: https://www.isca-archive.org/interspeech_2026/wang26x_interspeech.pdf
---

# Eliminating Stability Hallucinations in LLM-based TTS models via Attention Guidance

[PDF](https://www.isca-archive.org/interspeech_2026/wang26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1345)

**TL;DR** — This paper mitigates stability hallucinations in LLM-based text-to-speech models by introducing an Optimal Alignment Score and a teacher-guided distillation approach, significantly reducing word error rates on challenging text inputs.

## Problem

Decoder-only LLM-based text-to-speech models lack explicit text-speech alignment processes, making them prone to stability hallucinations like infinite repetitions or missing segments when handling long or complex texts. While traditional encoder-decoder architectures use constrained cross-attention or forced alignment labels, these solutions are either incompatible with decoder-only setups or overly reliant on hard-to-acquire alignments.

## Method

The authors analyze CosyVoice2 (built on a Qwen-0.5B LLM with 24 layers and 14 heads) and find that middle-layer heads act as text-speech alignment heads. They propose the Optimal Alignment Score (OAS) metric using the Viterbi algorithm to evaluate alignment quality without supervision, integrating it directly as a training loss on designated layers (layers 8 and 9). Furthermore, they employ a chain-of-thought distillation framework where a pre-trained teacher's optimal alignment path serves as a pseudo label, paired with a sparse target repetition strategy and an auxiliary progress bar loss to track absolute positional progress.

## Results

Evaluated on the Seed-TTS-Eval and CV3-Eval datasets using word error rate (WER), speaker similarity (SIM), and UTMOS, the proposed methods substantially improve stability. On the hard text subset of Seed-TTS-Eval, the baseline CosyVoice2 model yields a WER of 4.032% on common text and 13.568% on hard text, whereas the fully attention-guided model (CV2 AG) reduces hard text WER down to 11.472% (and further down to 9.984% with progress bar integration) while preserving high audio naturalness and speaker similarity.

## Code

- https://wsmzzz.github.io/llm_attn/index.html

## Applications

Speech engineers and developers building zero-shot text-to-speech systems or conversational speech LLMs can use this method to enhance robustness and prevent repetitive or omitted speech artifacts on complex inputs.

## Limitations

The approach relies on extracting reasonable alignment paths from a pre-trained teacher model, which assumes the base model can already handle common text scenarios reliably.

## Related

- (link related pages by id as the wiki grows)
