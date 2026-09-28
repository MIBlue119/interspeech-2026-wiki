---
id: foo26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-913
pdf: https://www.isca-archive.org/interspeech_2026/foo26_interspeech.pdf
---

# All That Glitters Is Not Audio: Rethinking Text Priors and Audio Reliance in Audio-Language Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/foo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/foo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-913)

**TL;DR** — A diagnostic framework for large audio-language models reveals that models achieve 60-72% of their full-audio benchmark scores without any audio input and can solve most audio-dependent items using short local fragments rather than global context.

## Problem

High scores on current audio-language benchmarks are widely interpreted as evidence of strong auditory understanding, but models may exploit textual priors and general knowledge to answer questions without processing acoustic signals. Previous verification methods using silent signals introduce confounding factors or fail to quantify text-only performance, obscuring whether benchmarks genuinely measure holistic audio perception.

## Method

The study introduces a diagnostic framework evaluating models along two axes: text prior, measured by removing audio input entirely rather than substituting silence, and audio reliance, measured by partitioning audio clips into N equal-duration segments (N from 2 to 5) to test retention rates. It also establishes an exhaustive five-category item decomposition (Text-Solvable, Fragment-Sufficient, Cross-Segment, Audio-Harmful, Unsolvable). The framework is applied to 8 prominent large audio-language models ranging from 3B to 30B parameters across three prominent benchmarks (MMAU, MMAR, MMAU-Pro). A hybrid MCQ scoring strategy using regex backed by Claude 4.5 Haiku handles format-sensitive responses.

## Results

Across eight evaluated large audio-language models, text backbone accuracy significantly exceeds random chance by 12.4%, 5.4%, and 3.6% on MMAU, MMAR, and MMAU-Pro, respectively. Without any audio input, models retain 60% to 72% of their full-audio accuracy (text-prior rate RTP > 60%), demonstrating that multimodal training strengthens language-only priors. Furthermore, among items strictly requiring audio, only 3.0% to 4.2% depend on cross-segment information across the entire clip, while the overwhelming majority are fragment-sufficient and can be solved using isolated local snippets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing or benchmarking large audio-language models can use these diagnostic axes and decomposition protocols to construct more reliable evaluation pipelines that isolate genuine auditory perception from textual shortcuts.

## Related

- (link related pages by id as the wiki grows)
