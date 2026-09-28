---
id: shen26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-974
pdf: https://www.isca-archive.org/interspeech_2026/shen26_interspeech.pdf
---

# CoDeTT: A Context-Aware Decision Benchmark for Turn-Taking Evaluation

*Huan Shen, Yingao Wang, Shangkun Huang, Wei Zou, Yunzhang Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/shen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-974)

**TL;DR** — CoDeTT is a context-aware diagnostic benchmark that reformulates spoken dialogue turn-taking into a structured 14-scenario decision problem, exposing a hidden "lucky guess" phenomenon where models succeed at actions while failing at semantic intent.

## Key contributions

- Presents CoDeTT, a benchmark reformulating turn-taking from binary end-of-utterance (EOU) detection into a structured, hierarchical multi-scenario decision problem.
- Constructs a 300-hour bilingual (English/Chinese) evaluation dataset comprising 18,000 balanced instances across 2 system states, 4 strategies, and 14 fine-grained scenarios.
- Introduces the Semantic Misalignment Rate (SMR) metric to expose 'action-correct but reason-wrong' failures where models achieve functional success via superficial acoustic heuristics.
- Evaluates representative specialized controllers and Omni-SLMs under varying history lengths, demonstrating non-monotonic performance trade-offs between context coherence and interactional agility.

## Problem

Traditional turn-taking evaluation protocols are primarily limited to binary end-of-utterance (EOU) detection and narrow interaction settings, treating conversational decisions as a black box. Consequently, existing frameworks cannot diagnose why a model failed to respond or determine whether silence arose from mistaking a query for side-talk, environmental noise, or a thinking pause. This fragmented landscape obscures fundamental model weaknesses and hinders systematic comparison across conversational conditions, making a principled diagnostic benchmark necessary.

## Method

CoDeTT establishes a two-stage evaluation funnel across 18,000 decision instances spanning 300 hours of bilingual (English and Chinese) multi-turn audio data. Stage 1 evaluates macroscopic action correctness across four core strategies (Maintain, Stop & Listen, Takeover, Dismiss), while Stage 2 probes fine-grained semantic intent across a 14-class hierarchical taxonomy conditioned on 5 rounds of dialogue history.

The dataset construction relies on a six-stage hybrid pipeline: (A) Gemini3-Pro dialogue generation paired with GPT-5 automated quality assurance; (B) Qwen3-TTS high-fidelity synthesis driven by dynamic speaker timbres and rate-filtered references from KeSpeech and Emilia; (C) Qwen3-ASR verification enforcing strict Word Error Rate thresholds to eliminate synthetic artifacts; (D) soundscape simulation utilizing random non-speech noise and Emilia babble for invalidation and exclusion scenarios; (E) integration of real-world spontaneous human anchors from Candor and MagicData-RAMC; and (F) final balanced benchmark consolidation.

At inference, models process dialog histories of varying lengths (H ∈ {0, 1, 3, 5}). The core diagnostic innovation is the Semantic Misalignment Rate (SMR), which quantifies the proportion of correctly executed macroscopic actions that stem from incorrect underlying intent reasoning. This metric exposes whether agent behavior is grounded in true pragmatic comprehension or superficial heuristics.

## Experimental setup

Evaluates 300 hours of bilingual (Chinese and English) data consisting of 18,000 annotated decision instances split evenly across 9,000 samples per system state (SystemSpeaking and SystemIdle). Evaluates multiple specialized controllers and Omni-SLMs (including Qwen3-Omni, MiniCPM-o-4.5, GPT-4o-audio, and Gemini3-Pro) tested across history lengths H ∈ {0, 1, 3, 5} using class-specific Accuracy (ACC) and Semantic Misalignment Rate (SMR).

## Results

Specialized controllers like FireRedChat achieve high Takeover accuracy (up to 88.20% in English) through endpoint optimization but fail entirely in Maintain and Dismiss scenarios due to a lack of intent-level outputs. Among Omni-SLMs, Gemini3-Pro exhibits the most robust reasoning, achieving top average accuracies (around 81-82%) and the lowest SMR (15-25%), indicating reliable pragmatic grounding.

Conversely, models such as MiniCPM-o-4.5 display high SMRs exceeding 40% in Maintain and Stop & Listen categories, confirming a 'lucky guess' phenomenon where correct binary actions are executed via superficial heuristics. Furthermore, history length ablation reveals a non-monotonic effect: while moderate context (H=1 or 3) improves discourse trajectory understanding, excessive history (H=5) in Interruption scenarios induces semantic over-commitment, degrades accuracy, and increases SMR.

| System / Condition | ZH Average ACC (%) | ZH SMR (Avg %) | EN Average ACC (%) | EN SMR (Avg %) |
|---|---|---|---|---|
| Qwen3-Omni (H=0) | 68.15 | -- | 70.68 | -- |
| MiniCPM-o-4.5 (H=0) | 60.53 | -- | 64.56 | -- |
| GPT-4o-audio (H=0) | 66.57 | -- | 71.91 | -- |
| Gemini3-Pro (H=0) | 80.83 | -- | 81.14 | -- |
| Gemini3-Pro (H=3) | 81.58 | ~19-25 | 81.91 | ~20-28 |

## Limitations

The dataset is limited to bilingual evaluation (English and Chinese) and relies partially on synthetic text generation and TTS pipelines despite strict ASR verification and real-world audio integration. Additionally, evaluation is restricted to offline decision prediction over fixed conversational histories, which may not fully capture live full-duplex latency dynamics or streaming drift. Speaker-role attribution across complex multi-party interactions like collaboration and exclusion remains a persistent bottleneck.

## Why read this

Speech and ML engineers building conversational agents should read this to understand why standard EOU metrics are insufficient and how to use Semantic Misalignment Rate (SMR) to diagnose pragmatic failures in Omni-SLMs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnostic evaluation and development of robust full-duplex spoken dialogue systems, conversational agents, and real-time voice assistants.

## Related

- (link related pages by id as the wiki grows)
