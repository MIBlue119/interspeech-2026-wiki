---
id: turetzky26_interspeech
category: tts
labels: [dataset-or-benchmark-release]
institutions: ["Hebrew University of Jerusalem", "IBM"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2743
pdf: https://www.isca-archive.org/interspeech_2026/turetzky26_interspeech.pdf
---

# Knowing What to Stress: A Discourse-Conditioned Text-to-Speech Benchmark

*Arnon Turetzky, Avihu Dekel, Hagai Aronowitz, Ron Hoory, Yossi Adi*

[PDF](https://www.isca-archive.org/interspeech_2026/turetzky26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/turetzky26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2743)

**Category:** `tts` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The paper introduces CAST, a benchmark showing that while text-only language models easily infer context-dependent sentence stress from discourse, state-of-the-art text-to-speech (TTS) systems fail to realize this stress in speech.

## Key contributions

- CAST: A benchmark for evaluating context-conditioned word-level stress in TTS using contrastive context pairs.
- A scalable automated data generation pipeline utilizing structured prompts and multi-judge validation filters (gpt-5-nano and gemini-2.5-flash).
- A systematic evaluation of diverse state-of-the-art TTS systems (Kokoro, Chatterbox, CosyVoice3, HiggsAudio V2, Qwen3-TTS, GPT-4o-mini-tts) across multiple conditioning modes.
- An open-source synthetic training corpus of approximately 10,000 context-sentence-audio triples generated using an extended pipeline.

## Problem

Spoken communication relies heavily on sentence stress and contrastive focus to disambiguate meaning from discourse context, such as correcting an assumption or highlighting a specific actor. Although modern neural TTS systems generate high-quality expressive speech, it remains unproven whether they dynamically infer appropriate stress from preceding text without explicit markers. Prior benchmarks focus on text-only understanding, speech-to-speech translation, or explicit prompt control, leaving a major gap in evaluating end-to-end contextual stress realization in speech synthesis.

## Method

The CAST evaluation set is constructed at the textual level by prompting gpt-5-mini to jointly generate a target sentence with exactly two plausible stress candidates and two contrastive discourse contexts (Context A and Context B). These generated items are filtered using a multi-judge consistency check requiring agreement between gpt-5-nano and gemini-2.5-flash, discarding items where judges disagree on the intended word. The final benchmark contains 113 contrastive pairs (226 items) balanced across sentence positions and pragmatic phenomena like correction and role disambiguation.

During evaluation, TTS systems ingest text under various conditioning modes: (1) Concat, where the discourse context is prepended to the target sentence and target boundaries are isolated via Whisper-based forced alignment; (2) Instruct, where context is embedded in a natural language prompt; and (3) Explicit, where the target word is directly marked via model-supported syntax. Because standard precision/recall metrics fail to penalize invariant monotone outputs, the authors introduce strict contrastive metrics based on WHISTRESS—a Whisper-based automatic stress detector fine-tuned for prominence. The core metrics are Hit (presence of target stress), Pair-Contrast (target present and alternative absent), and Pair-Correct (Pair-Contrast satisfied for both sides of the contrastive pair simultaneously).

## Experimental setup

The evaluation utilizes the CAST benchmark consisting of 113 contrastive context pairs (226 items) balanced across initial, early, medial, and final stress positions. Evaluated systems include Kokoro, Chatterbox, CosyVoice3, HiggsAudio V2, Qwen3-TTS, and GPT-4o-mini-tts. Metrics include Hit, Pair-Contrast, and Pair-Correct evaluated on synthesized audio, accompanied by 95% bootstrap confidence intervals over 10K resamplings. Human validation was conducted using fluent English annotators and Fleiss' kappa scoring.

## Results

Across all end-to-end TTS systems, Pair-Correct scores remain near zero (ranging from 0.0% to 3.5%), indicating that models default to sentence-internal biases rather than adapting to discourse context regardless of whether context is supplied via concatenation or instruction. CosyVoice3 achieves a Hit score of 32.3% and Pair-Contrast of 23.5% under base conditions, which improves only under explicit oracle markup to 52.2% Hit and 40.3% Pair-Contrast. In contrast, text-only language models evaluated on the same benchmark show high contextual comprehension, with Claude-Haiku-4.5 achieving 88.1% Contrast and 76.1% Correct.

| System | Conditioning | Hit (%) | Contrast (%) | Correct (%) |
|---|---|---|---|---|
| Kokoro | - | 38.1 | 22.1 | 0.0 |
| Chatterbox | - | 23.0 | 16.8 | 0.0 |
| CosyVoice3 | Instruct | 32.3 | 23.0 | 0.9 |
| CosyVoice3 | Explicit | 52.2 | 40.3 | 10.6 |
| GPT-4o-mini-tts | Instruct | 35.4 | 26.1 | 3.5 |
| Qwen3-TTS | Instruct | 38.9 | 22.6 | 3.5 |

## Limitations

The benchmark relies on WHISTRESS, an automatic detector that may prioritize acoustic cues such as loudness over subtle pitch shifts. The evaluation scope is restricted to English lexical stress and two-candidate contrastive sentences, leaving out complex multi-word prosodic phrasing, intonation contours, and multi-lingual generalization.

## Why read this

Researchers building context-aware or conversational text-to-speech systems should read this paper to understand the severe limitations of current architectures in translating text-level discourse comprehension into acoustic prosody. It provides a rigorous benchmark and pipeline to shift future research toward genuine context-driven stress realization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Conversational AI, expressive voice assistants, audiobook narration, and multilingual dubbing systems requiring context-sensitive emphasis.

## Institutions / 機構

Hebrew University of Jerusalem, IBM

## Related

- (link related pages by id as the wiki grows)
