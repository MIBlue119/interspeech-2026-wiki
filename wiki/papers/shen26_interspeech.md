---
id: shen26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-974
pdf: https://www.isca-archive.org/interspeech_2026/shen26_interspeech.pdf
---

# CoDeTT: A Context-Aware Decision Benchmark for Turn-Taking Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/shen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-974)

**TL;DR** — CoDeTT is a context-aware diagnostic benchmark that formalizes turn-taking as a structured 14-class decision problem and introduces the Semantic Misalignment Rate to expose models that make correct functional actions for the wrong pragmatic reasons.

## Problem

Traditional turn-taking evaluation protocols are largely restricted to binary end-of-utterance detection and narrow interaction settings, treating conversational dynamics as a black box. This limits systematic comparison and obscures decision-level errors, making it difficult to determine whether a model's silence stems from noise, side-talk, a thinking pause, or intentional listening.

## Method

The benchmark comprises over 300 hours of bilingual English and Chinese multi-turn dialogues containing 18,000 decision instances categorized across 14 fine-grained scenarios and two system states. The dataset construction uses a six-stage hybrid pipeline incorporating Gemini 3-Pro for transcript generation, GPT-5 as a QA judge, Qwen3-TTS for synthesis, Qwen3-ASR for verification, soundscape noise simulation, and real conversational anchors from Candor and MagicData-RAMC. Evaluation is conducted via a two-stage funnel protocol examining action-level correctness across four core strategies (Maintain, Stop & Listen, Takeover, Dismiss) and intent-level accuracy across varying history lengths (H from 0 to 5).

## Results

Evaluated models include specialized controllers and Omni-SLMs such as Qwen3-Omni, MiniCPM-o-4.5, GPT-4o-audio, and Gemini 3-Pro. Results show that specialized controllers achieve high Takeover accuracy but fail completely on Maintain and Dismiss scenarios. Omni-SLM evaluations reveal a persistent Semantic Misalignment Rate (SMR) ranging between 15% and over 40%, confirming that models frequently achieve correct functional actions via superficial acoustic heuristics rather than robust pragmatic reasoning. Furthermore, increasing context history beyond 3 rounds non-monotonically increases SMR and semantic over-commitment in interruption scenarios.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building full-duplex spoken dialogue systems or conversational agents can use CoDeTT to diagnose pragmatic reasoning weaknesses and evaluate turn-taking robustness beyond simple timing metrics.

## Limitations

Speaker-role attribution remains a persistent bottleneck, and models struggle with multi-party pragmatic discrimination such as collaboration and exclusion scenarios.

## Related

- (link related pages by id as the wiki grows)
