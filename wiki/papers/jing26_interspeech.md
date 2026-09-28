---
id: jing26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1046
pdf: https://www.isca-archive.org/interspeech_2026/jing26_interspeech.pdf
---

# EmoSURA: Towards Accurate Evaluation of Detailed and Long-Context Emotional Speech Captions

[PDF](https://www.isca-archive.org/interspeech_2026/jing26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jing26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1046)

**TL;DR** — EmoSURA is a structured evaluation framework for emotional speech captions that decomposes descriptions into atomic perceptual units and uses audio-grounded verification to achieve state-of-the-art correlation with human judgment.

## Problem

Evaluating long-form emotional speech captions is hindered by traditional N-gram metrics failing to capture semantic nuances and holistic LLM judges suffering from reasoning inconsistency and context collapse. Moreover, unconstrained generation models tend to produce verbose descriptions that lead to severe length penalties and unpenalized hallucinations under legacy scoring rules.

## Method

EmoSURA operates via a three-stage 'decompose-and-evaluate' pipeline: (1) breaking captions down into Atomic Perceptual Units (APUs) using Qwen2.5-7B-Instruct; (2) performing binary Yes/No audio-grounded verification of each APU against raw speech signals using Qwen2-Audio-7B-Instruct to catch hallucinations; and (3) computing precision and recall-based F1 matching scores against reference annotations. The authors also introduce SURABench, a balanced benchmark dataset of 1,018 utterances derived from MSP-Podcast using a stratified 10x10 Valence-Arousal grid sampling strategy.

## Results

Evaluated against human ratings from 14 experts across 320 audio-caption pairs, EmoSURA achieves strong positive correlation with human judgments (e.g., Pearson correlation and rank correlations), outperforming traditional rule-based metrics like BLEU-4, ROUGE-L, CIDEr, and SPIDER which exhibit negative correlations due to length sensitivity and zero-inflation.

## Code

- https://github.com/KeiKinn/EmoSURA

## Applications

Speech and ML engineers developing and benchmarking emotional speech captioning, text-to-speech, and audio-language models will use EmoSURA and SURABench to accurately evaluate descriptive richness and factual grounding.

## Limitations

The framework relies on powerful underlying LLM and ALM engines for decomposition and verification, which can introduce computational overhead.

## Related

- (link related pages by id as the wiki grows)
