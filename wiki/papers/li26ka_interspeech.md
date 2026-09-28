---
id: li26ka_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3434
---

# Read What You Hear: Reference-Free Hypotheses Evaluation with Acoustic Discrepancy

**TL;DR** — A reference-free ASR quality metric that uses a pretrained TTS model to check how well a candidate transcript's acoustics actually match the original audio, and can refine hypotheses without extra training.

## Problem

ASR evaluation usually needs reference transcriptions, while existing reference-free methods rely on internal confidence scores or auxiliary language models rather than direct grounding in the acoustic signal.

## Method

READ uses a pretrained autoregressive TTS model to compute the conditional likelihood of speech tokens given a text hypothesis, measuring fine-grained acoustic discrepancy between speech and text; the same score can then be used to rerank or refine hypotheses without additional training.

## Results

READ correlates with specific recognition errors and improves ASR outputs, achieving up to 20% relative error rate reduction, with particularly strong gains under noisy conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Reference-free ASR quality monitoring and hypothesis reranking/refinement, especially useful where ground-truth transcripts are unavailable.

## Related

- (link related pages by id as the wiki grows)
