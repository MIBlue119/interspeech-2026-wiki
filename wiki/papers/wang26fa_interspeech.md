---
id: wang26fa_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2938
pdf: https://www.isca-archive.org/interspeech_2026/wang26fa_interspeech.pdf
---

# StanceBench: A Benchmark for Audio LLM-Based Interpersonal Stance Evaluation from Speech

[PDF](https://www.isca-archive.org/interspeech_2026/wang26fa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26fa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2938)

**TL;DR** — StanceBench introduces a standardized evaluation benchmark for measuring interpersonal stance in conversational speech using audio-capable LLMs as automated judges across nine dimensions.

## Problem

Current speech-to-speech dialogue models and evaluation metrics primarily focus on transcription fidelity, intelligibility, or utterance-level emotion, failing to capture complex interaction-level social cues like empathy, dominance, and politeness. Because interpersonal stance is inherently context-dependent, perceptual, and expressed through a combination of prosody, timing, and lexical choice, robust automated evaluation remains a major challenge. StanceBench addresses this gap by providing a principled benchmark to evaluate how well audio-aware LLM judges can recover fine-grained stance signals from speech.

## Method

The benchmark defines nine interpersonal stance dimensions split into single-speaker (warmth, empathy, politeness, assertiveness, honesty, attentiveness) and interaction-based categories (social engagement, power orientation, conflict regulation), mapped to positive and negative poles using established psychological frameworks and role prompts. Inputs are segmented into Inter-Pausal Units (IPUs) using an energy-based VAD (0.3s silence gap threshold, excluding backchannels and turns over 45s) to construct single-speaker audio segments or dyadic context pairs. Five judge models are benchmarked under a unified prompt rubric with pole-order consistency checks: Qwen2.5-Omni-7B, Kimi-Audio-7B-Instruct, IBM Granite Speech 3.3-8B (transcription-based), GPT-audio, and Gemini-2.5-Flash. Evaluation is conducted on a fixed random 25% subset of the Improvised subset of the Seamless Interaction corpus, containing 2,431 conversations from 484 speakers.

## Results

Across evaluated dimensions, empathy and politeness are found to be the easiest to judge, whereas warmth and assertiveness show moderate separability with positivity skew. Honesty proves to be the hardest dimension, exhibiting high prompt order bias due to its reliance on cross-turn evidence, and attentiveness aligns weakly with human expectations. Interaction-based stances such as conflict regulation display high variance and threshold gaps due to heightened context-sensitivity. The evaluation frameworks measure judge reliability, robustness, bias, and stance separability against weak role-prompt labels.

## Code

- https://github.com/YuzheWangjhu/StanceBench

## Applications

Speech and ML engineers building speech-to-speech dialogue systems, voice assistants, and social interaction models can use StanceBench to automatically evaluate and audit conversational naturalness and social intent.

## Limitations

Evaluations rely on weak supervision from role-prompt assignments rather than direct dense human perceptual annotations, and runtimes require subsampling 25% of the dataset.

## Related

- (link related pages by id as the wiki grows)
