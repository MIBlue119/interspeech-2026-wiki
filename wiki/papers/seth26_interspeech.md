---
id: seth26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2448
---

# Audio Hallucination Attacks: Probing the Reliability of Large Audio Language Models

**TL;DR** — A new attack suite shows that state-of-the-art large audio language models can be tricked into confidently reporting sounds that were never in the audio at attack success rates above 79%, and a targeted post-alignment dataset cuts that rate substantially.

## Problem

Large audio language models perform well on standard benchmarks, but their real-world reliability — whether they genuinely ground responses in the audio rather than hallucinating — remains underexplored, and standard benchmarks hide this gap.

## Method

The authors introduce Audio Hallucination Attacks (AHA) with an evaluation suite, AHA-Eval, of 6.5K QA pairs targeting two attack surfaces: query-based attacks that exploit question phrasing to induce hallucinations about absent sounds, and audio-based attacks that inject synthetic speech describing non-existent events into the audio stream.

## Results

State-of-the-art LALMs including Audio Flamingo 3 and Gemini 3 Pro show high attack success rates of 95.35% and 79.65% respectively, revealing a reliability gap hidden by standard benchmarks; a proposed 120K QA post-alignment dataset, AHA-Guard, reduces attack success rates by up to 49%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Stress-testing and hardening audio-language assistants before deployment in settings where hallucinated audio claims could cause harm.

## Related

- (link related pages by id as the wiki grows)
