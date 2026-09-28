---
id: xu26g_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-879
---

# Whisper-Aware LLM: Self-Supervised Uncertainty Learning for Robust Whispered Speech Recognition

**TL;DR** — An Audio-LLM that learns to quantify its own uncertainty about ambiguous whispered speech and uses that self-awareness to cut hallucinated transcriptions from over 25% down to 4.5%.

## Problem

Whispered speech's inherent signal ambiguity pushes ASR toward two failure modes: missing whispered speech entirely, or hallucinating transcriptions from noise.

## Method

Whisper-Aware LLM teaches an Audio-LLM intrinsic self-awareness of acoustic signal deficiencies via targeted self-supervised tasks, then operationalizes this learned uncertainty through a Confidence-Fused Decoding mechanism that provides both high-level instructions and frame-level attention modulation to the LLM decoder.

## Results

Sets a new state-of-the-art on whispered speech with a 17% relative CER reduction on AISHELL6-Whisper, while cutting hallucination rates from over 25% to 4.5%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Reliable ASR for whisper-mode voice interfaces, such as quiet-environment or privacy-sensitive voice assistants.

## Related

- (link related pages by id as the wiki grows)
