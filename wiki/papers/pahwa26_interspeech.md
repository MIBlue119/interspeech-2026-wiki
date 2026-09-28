---
id: pahwa26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2857
pdf: https://www.isca-archive.org/interspeech_2026/pahwa26_interspeech.pdf
---

# Audio2Tool: Speak, Call, Act - A Dataset for Benchmarking Speech Tool Use

[PDF](https://www.isca-archive.org/interspeech_2026/pahwa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pahwa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2857)

**TL;DR** — The paper introduces Audio2Tool, a large-scale benchmark of approximately 30,000 queries spanning multiple complexity tiers and domains to evaluate speech-to-tool function-calling capabilities.

## Problem

Existing spoken language understanding and tool-calling benchmarks lack domain breadth, multi-step compositional reasoning, and realistic acoustic diversity, restricting their ability to evaluate end-to-end voice agents in the wild. Traditional cascaded pipelines suffer from error propagation and discard paralinguistic cues, while newer audio models lack granular diagnostic frameworks to isolate failure modes.

## Method

The authors construct a unified taxonomy of 152 verified functions across Smart Car, Smart Home, and Wearable domains divided into 23 categories. They design an 8-tier query complexity hierarchy ranging from direct single-intent commands to multi-intent structures, implicit reasoning, needle-in-a-haystack tasks, corrections, multi-turn dialogues, and intentional blending. Synthetic audio is generated using state-of-the-art zero-shot voice cloning text-to-speech models (Qwen3-TTS and CosyVoice-3) combined with speakers sampled via farthest point sampling from open datasets and mixed with diverse automotive and indoor noise profiles.

## Results

Evaluations across state-of-the-art SpeechLMs (such as Qwen3-Omni 30B and Kimi) and ASR-LLM baselines (Whisper + Gemma 12B) reveal strong performance on basic direct commands but significant accuracy degradation under compositional reasoning and high-noise conditions. Performance drops sharply as noise levels transition from low (+15 dB) to high (-5 dB) acoustic profiles. Models struggle particularly with argument grounding and disambiguating primary speaker intentions from background distractions.

## Code

- https://audio2tool.github.io/

## Applications

Engineers and researchers developing voice assistants, smart automotive interfaces, and IoT agents can use Audio2Tool to benchmark and diagnose robustness in audio-to-tool function calling.

## Limitations

The queries and evaluation rely heavily on synthetic TTS generation and LLM-based judges, which may not completely capture every nuance of natural human speech variability.

## Related

- (link related pages by id as the wiki grows)
