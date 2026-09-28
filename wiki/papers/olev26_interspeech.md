---
id: olev26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3297
pdf: https://www.isca-archive.org/interspeech_2026/olev26_interspeech.pdf
---

# Multi-Source Evidence Fusion for Audio Question Answering

[PDF](https://www.isca-archive.org/interspeech_2026/olev26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/olev26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3297)

**TL;DR** — The TalTech system won the Agent Track of the Interspeech 2026 Audio Reasoning Challenge by using dual speech LLMs and a reliability-tiered acoustic tool ensemble, achieving a top reasoning quality score of 69.83 and 76.9% accuracy.

## Problem

Large audio language models frequently generate opaque reasoning chains and suffer from hallucination and confirmation bias, making them unreliable for complex multi-step audio tasks. Traditional benchmarks only measure final-answer accuracy, ignoring the factual soundness, logic, and completeness of the underlying reasoning process.

## Method

The pipeline uses two independent open-weight LALMs (StepAudioR1 and Qwen3-Omni) analyzing audio across full-length and three equal-duration segments to generate observations. A text-only reasoning model (Kimi-K2-Thinking) cross-validates these observations against 25 acoustic tools grouped into a four-tier reliability framework with confidence caps, relevance scoring, and domain adjustments. Contradictions trigger an iterative verification loop with target tool calls, and final answers are selected before a separate reasoning generation prompt writes prose justifications.

## Results

Evaluated on the 1,000-sample MMAR benchmark, the system ranked first in the Agent Track with a reasoning quality score of 69.83 and 76.9% accuracy. Ablation tests show that dual-source evidence fusion provides a statistically significant boost to accuracy, and accuracy scales monotonically with confidence (91.1% for confidence >=0.80 down to 39.4% for 0.40-0.59). Semantic tasks proved easiest (84.0% accuracy), while music theory (61.9%) and temporal analysis (57.1%) were the most challenging subcategories.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building audiospacial reasoning, automated tutoring, or multi-modal assistant systems requiring verifiable and explainable chains of thought.

## Limitations

The end-to-end latency averages 8 to 10 minutes per sample, which currently limits real-time deployment capabilities.

## Related

- (link related pages by id as the wiki grows)
