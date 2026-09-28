---
id: seth26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2448
pdf: https://www.isca-archive.org/interspeech_2026/seth26_interspeech.pdf
---

# Audio Hallucination Attacks: Probing the Reliability of Large Audio Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/seth26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/seth26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2448)

**TL;DR** — The paper introduces Audio Hallucination Attacks (AHA), revealing that state-of-the-art Large Audio Language Models achieve attack success rates up to 95.35% under implicit queries and audio prompts, and proposes the AHA-Guard alignment dataset to mitigate this vulnerability.

## Problem

Large Audio Language Models often bypass the crucial grounding step of verifying whether a sound actually exists in an audio stream before reasoning about it. While prior work examined explicit queries, models remain highly vulnerable to implicit queries and audio-based cues that presuppose non-existent sounds. This creates a severe reliability gap hidden by standard benchmark performance.

## Method

The authors introduce AHA-Eval (6.5K QA pairs) and AHA-Guard (120K DPO preference pairs), derived from AudioCaps, Clotho, and MusicCaps using an LLM consistency filter. The attack suite uses query-based attacks (explicit vs. implicit questions) and audio-based attacks (TTS-synthesized utterances prepended to streams) targeting adversarial and random sounds. Qwen2.5-Omni is fine-tuned via LoRA using Direct Preference Optimization on 8 A100 GPUs with a rank of 6 for 5 epochs.

## Results

Evaluated on models including Audio Flamingo 3, Gemini 3 Pro, and Qwen2.5-Omni, measuring Attack Success Rate via an LLM-as-Judge verified by human study (92.4% agreement). Audio-based attacks prove substantially more effective than text-based ones (e.g., Audio Flamingo 3 random explicit ASR rises from 1.90% to 53.40%). DPO training on AHA-Guard reduces random implicit ASR for Qwen2.5-Omni from 68.74% to 39.01% in text space and 59.59% to 40.62% in audio space, whereas Chain-of-Thought prompting fails on implicit attacks.

## Code

- https://cs20s030.github.io/AHA-website/

## Applications

Speech engineers and researchers developing robust Large Audio Language Models and conversational agents requiring genuine audio grounding.

## Limitations

Evaluated primarily on audio-caption datasets (AudioCaps, Clotho, MusicCaps) and selected frontier models.

## Related

- (link related pages by id as the wiki grows)
