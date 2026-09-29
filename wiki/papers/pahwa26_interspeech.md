---
id: pahwa26_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Rivian and Volkswagen Group Technologies"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2857
pdf: https://www.isca-archive.org/interspeech_2026/pahwa26_interspeech.pdf
---

# Audio2Tool: Speak, Call, Act - A Dataset for Benchmarking Speech Tool Use

*Ramit Pahwa, Apoorva Beedu, Parivesh Priye, Rutu Gandhi, Saloni Takawale, Aruna Baijal, Zengli Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/pahwa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pahwa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2857)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — Audio2Tool is a benchmark dataset of approximately 30,000 queries designed to evaluate speech-based tool-calling capabilities across smart car, smart home, and wearable domains. It demonstrates that state-of-the-art SpeechLMs excel at simple commands but experience severe performance drops below 35% exact match on compositional and multi-intent reasoning tasks.

## Key contributions

- A large-scale benchmark of ~30,000 queries spanning 152 verified functions and 23 categories across Smart Car, Smart Home, and Wearable domains.
- An 8-tier query complexity hierarchy ranging from direct commands to multi-intent, implicit reasoning, correction, dialogue, and intent blending.
- A zero-shot voice-cloning TTS and noise-mixing pipeline integrating diverse accents and environmental noise profiles (automotive/indoor).
- Comprehensive empirical evaluations comparing end-to-end SpeechLMs against cascaded ASR-LLM pipelines under various acoustic and compositional constraints.

## Problem

Voice assistants are transitioning to end-to-end SpeechLMs that map raw speech directly to executable API calls, yet existing speech language understanding benchmarks fail to test realistic tool-calling under complex acoustic and compositional conditions. Prior datasets lack domain breadth, multi-step dependency handling, and fine-grained diagnostic failure mode analysis. This leaves engineers without a systematic way to evaluate how well voice agents navigate phonetic ambiguity, parameter extraction, and background noise in high-stakes environments like automotive cabins.

## Method

The Audio2Tool dataset was constructed using closed-source frontier LLMs (GPT-5.2, Gemini 2.5 Pro, Claude Opus) to generate queries across an 8-tier taxonomic hierarchy, followed by LLM-as-a-judge verification and manual checks. The tiers isolate specific reasoning challenges: Tier 1 (Direct, 2-6 words), Tier 2 (Parametric slot filling), Tier 3 (Multi-intent combining 2-3 calls), Tier 4 (Implicit state-based reasoning), Tier 5 (Needle-in-a-haystack extraction from 25-60 words), Tier 6 (Mid-utterance correction/repairs), Tier 7 (4-8 turn multi-turn conversation), and Tier 8 (Intent blending with multi-speaker background speech).

To synthesize realistic audio, the authors combined a selected speaker pool of 230 speakers from Emilia-Yodas (100), 3D Speaker (30), and VoxPopuli (100)—chosen via Stratified and Farthest Point Sampling (FPS)—with zero-shot voice-cloning TTS models Qwen3-TTS and CosyVoice-3. These clean audio files were mixed with an environmental noise dataset (MS-SNSD) containing automotive, road, HVAC, and babble noise profiles at low (+15 dB), medium (+5 dB), and high (-5 dB) SNR levels.

Evaluation compares end-to-end SpeechLMs (such as Qwen-3-Omni-30B, Kimi Audio, Step-Audio-2, and Audio-Flamingo3 ranging from 7B to 30B parameters) against cascaded ASR-LLM pipelines using Whisper v3 for transcription coupled with text LLMs (Qwen 3 and Gemma 3 backbones). Metrics comprise Tool Accuracy (Acc), Exact Match (EM) for end-to-end tool and argument correctness, and Slot F1 for parameter-level micro-averaged accuracy.

## Experimental setup

Evaluations encompass ~30,000 synthesized queries across 8 complexity tiers, tested against diverse end-to-end SpeechLMs (7B-30B parameters) and cascaded Whisper-v3 + text-LLM pipelines. Robustness is tested using MS-SNSD babble, mechanical, and impulsive noise profiles across three SNR levels (+15dB, +5dB, -5dB).

## Results

On simple Tier-1 direct commands, top models like Qwen-3-Omni-30B achieve high performance with 92.4% Tool Accuracy, while cascaded Whisper v3 + Gemma 27B achieves 87.9%. However, performance drops drastically on intermediate and complex tiers: for Tier-3 multi-intent queries, exact match and F1 scores fall below 35% across almost all models. In challenging long-form, multi-turn, and intent-blending conditions (Tiers 5-8), overall accuracy drops below 56%, and Qwen-3-Omni-30B drops to 54.6% F1 on Tier 7 conversations and 41.7% accuracy on Tier 8 intent blending. Ablations demonstrate that performance degrades severely as SNR decreases from +15 dB to -5 dB across babble, mechanical, and impulsive noise conditions.

| System | Tier-1 Acc | Tier-2 EM | Tier-3 EM | Tier-5 EM | Tier-7 EM |
|---|---|---|---|---|---|
| Qwen 1.7B | 74.6% | 3.2% | 0.4% | 35.6% | 20.2% |
| Qwen 8B | 85.6% | 10.1% | 8.7% | 44.9% | 28.7% |
| Whisper v3 + Gemma 27B | 87.9% | 10.2% | 6.9% | 42.3% | 26.4% |
| Qwen-2.5-Omni-7B | 79.5% | 14.7% | 2.1% | 40.2% | 26.1% |
| Qwen-3-Omni-30B | 92.4% | 15.6% | 8.6% | 36.0% | 16.3% |

## Limitations

The benchmark currently relies entirely on synthetic speech generated via zero-shot voice cloning rather than native human in-the-wild recordings. The domain coverage is restricted to Smart Car, Smart Home, and Wearables, omitting other critical execution domains like finance or healthcare. Furthermore, safety-critical edge cases and multi-speaker separation scenarios require expansion in future iterations.

## Why read this

Speech and ML engineers building voice assistants or conversational audio agents should read this paper to understand the severe failure modes of current SpeechLMs when scaling to compositional, multi-intent, and noisy tool-calling tasks. It provides a standardized testbed and diagnostic baseline to evaluate whether end-to-end audio models truly outperform traditional cascaded ASR-LLM pipelines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automotive voice assistants, smart home IoT control hubs, wearable device hands-free navigation, and audio-native function-calling agent architectures.

## Institutions / 機構

Rivian and Volkswagen Group Technologies

## Related

- [UG-Bench: A Comprehensive Benchmark for Evaluating Large Audio-Language Models](zhou26c_interspeech.md) — shared data / evaluation · relatedness 2.3/3
- [MAC-SLU: Multi-Intent Automotive Cabin Spoken Language Understanding Benchmark](peng26d_interspeech.md) — shared data / evaluation · relatedness 2.1/3
- [Do What I Say: A Spoken Prompt Dataset for Instruction-Following](zufle26_interspeech.md) — shared data / evaluation · relatedness 2.0/3
- [From Reactive to Proactive: Assessing the Proactivity of Voice Agents via ProVoice-Bench](xu26k_interspeech.md) — shared data / evaluation · relatedness 2.0/3
- [A Unified and Reproducible Experimentation Framework for Speech Understanding](peng26e_interspeech.md) — shared data / evaluation · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
