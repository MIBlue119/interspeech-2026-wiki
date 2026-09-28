---
id: chang26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-637
---

# TAD: Token-Adaptive Contrastive Decoding with Confidence-Guided Gating for Hallucination Mitigation in Large Audio-Language Models

**TL;DR** — TAD is a training-free decoding trick that contrasts a model's logits on real vs. silent audio to stop large audio-language models from hallucinating sounds that aren't there.

## Problem

Large audio-language models can hallucinate the presence of sound events that were never in the audio, answering "yes" to absent objects and undermining reliability in audio question answering.

## Method

Token-Adaptive Decoding (TAD) contrasts the model's logits under the real audio against a matched silent reference at the critical first yes/no decoding step, using a confidence-guided, class-conditional gate keyed to the audio-silent margin to avoid overcorrecting when evidence is weak or already clear.

## Results

On AudioCaps-Hallucination, TAD improves F1 over the Audio-Aware Decoding baseline by 0.059–0.117 for Qwen2 and 0.025–0.064 for Gemma across Popular, Adversarial, and Random splits, and raises F1 from 0.810 to 0.816 for Qwen2 on Clotho-AQA while remaining comparable to the baseline on Gemma.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Plug-in decoding-time hallucination mitigation for audio question-answering systems built on large audio-language models, without retraining.

## Related

- (link related pages by id as the wiki grows)
