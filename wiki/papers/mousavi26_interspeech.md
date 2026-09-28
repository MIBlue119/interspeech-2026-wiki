---
id: mousavi26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1533
pdf: https://www.isca-archive.org/interspeech_2026/mousavi26_interspeech.pdf
---

# Investigating Faithfulness in Large Audio Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/mousavi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mousavi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1533)

**TL;DR** — This paper introduces a systematic evaluation framework to test the faithfulness of chain-of-thought reasoning in large audio language models, revealing a multimodal disconnect where generated rationales are often ungrounded in the audio input or vulnerable to hallucinations.

## Problem

While large audio language models (LALMs) can generate step-by-step chain-of-thought (CoT) explanations to boost interpretability in complex audio question-answering tasks, it remains unclear whether these reasoning paths faithfully reflect the model's true internal decision process. Without rigorous evaluation, unfaithful explanations can generate plausible-sounding hallucinations that undermine trustworthiness in high-stakes domains like healthcare and forensics.

## Method

The authors propose a benchmarking suite utilizing context-preserving audio interventions (Gaussian white noise down to -20 dB SNR, random masking up to 100%, guided modality masking on speech versus background audio, and adversarial speech injection of correct/wrong hints) and CoT interventions (paraphrasing, filler tokens, and prompt edits). They evaluate two prominent open-source LALMs, Audio Flamingo 3-Think and Qwen2.5-Omni, across multiple reasoning tracks. Consistency between baseline and intervened chains is measured via semantic similarity scoring using an LLM judge (Mistral-Small-3.1-24B-Instruct-2503).

## Results

Evaluations across SAKURA, MMAR, and MMAU benchmarks show that both models retain performance down to 0 dB SNR and 60% random masking ratios before suffering severe drops. However, Audio Flamingo 3 exhibits heavy hallucination tendencies, maintaining a high CoT consistency score of 3.65 on MMAU even under 100% masking (complete silence), whereas Qwen2.5-Omni more reliably reports being unable to hear an audible signal. Guided masking and adversarial injections further demonstrate that LALMs lean heavily on speech transcripts rather than holistic acoustic evidence, frequently misaligning their stated rationale from actual audio features.

## Code

- https://poonehmousavi.github.io/faithfulness/

## Applications

Speech and machine learning engineers developing or auditing multimodal audio-language models for trustworthy, safety-critical decision-making systems.

## Limitations

The study focuses specifically on two representative open-source LALM architectures and selected audio-reasoning benchmarks.

## Related

- (link related pages by id as the wiki grows)
