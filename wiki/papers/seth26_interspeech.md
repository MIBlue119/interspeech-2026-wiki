---
id: seth26_interspeech
category: speech-llm-dialogue
labels: [dataset-or-benchmark-release]
institutions: ["University of Maryland, College Park", "Adobe Research"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2448
pdf: https://www.isca-archive.org/interspeech_2026/seth26_interspeech.pdf
---

# Audio Hallucination Attacks: Probing the Reliability of Large Audio Language Models

*Ashish Seth, Sonal Kumar, Ramaneswaran Selvakuma, Nishit Anand, Utkarsh Tyagi, Prem Seetharaman, Ramani Duraiswami, Dinesh Manocha*

[PDF](https://www.isca-archive.org/interspeech_2026/seth26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/seth26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2448)

**Category:** `speech-llm-dialogue` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The paper introduces Audio Hallucination Attacks (AHA), revealing that state-of-the-art Large Audio Language Models (LALMs) suffer from severe reliability gaps and routinely bypass audio grounding when tested with implicit questions or audio primes. The authors propose AHA-Guard, a 120K preference dataset trained via Direct Preference Optimization (DPO), which reduces Attack Success Rates (ASR) by up to 49%.

## Key contributions

- Introduces AHA-Eval, a 6.5K QA benchmark suite designed to evaluate audio hallucination vulnerabilities across explicit vs. implicit queries and adversarial vs. random sound events.
- Proposes an audio-based attack vector that prepends TTS-synthesized utterances describing non-existent events to evaluate susceptibility to false acoustic cues.
- Shows that state-of-the-art models like Audio Flamingo 3 and Gemini 3 Pro achieve alarmingly high ASRs (up to 95.35% and 79.65%, respectively) driven by language model priors rather than audio grounding.
- Constructs AHA-Guard, a 120K DPO post-alignment dataset that significantly improves model reliability and curbs hallucination without inducing a blanket rejection bias.

## Problem

While Large Audio Language Models (LALMs) score highly on complex audio reasoning benchmarks, their fundamental reliability in real-world settings remains underexplored because they often skip the critical grounding step of verifying whether a sound actually exists. Prior work has exclusively focused on explicit queries (e.g., asking directly if a sound is present), which fails to expose failures under implicit queries that presuppose a sound's existence (e.g., asking 'how far away is the seagull' when no seagulls are present). This reliance on language-model priors rather than actual audio verification exposes a critical reliability gap that standard benchmarks hide.

## Method

The AHA pipeline curates audio from AudioCaps, Clotho, and MusicCaps, using an LLM-based consistency filter with Gemini 3 Pro to retain 8K high-quality pairs. For each verified clip, four counterfactual sound events are generated: two adversarial (contextually plausible, e.g., cow mooing in nature) and two random (out-of-context, e.g., beeping in nature). These are turned into explicit queries (binary questions on presence) and implicit queries (open-ended how/why/where/counting questions presupposing existence). Furthermore, audio-based attacks use Gemini 2.5 Flash TTS to synthesize natural spoken statements claiming the presence of non-existent sounds, which are prepended to the original audio.

For mitigation, the authors explore inference-time strategies such as Chain-of-Thought (CoT) prompting ('Let's think step by step') and training-time alignment. They construct AHA-Guard, a 120K DPO preference dataset consisting of chosen-rejected pairs spanning factual, adversarial, and random attack scenarios across text and audio modalities. To prevent rejection bias, factual questions are included where the rejected response incorrectly omits or introduces sounds. Qwen2.5-Omni is fine-tuned using LoRA on 8 A100 GPUs with a rank of 6 for 5 epochs.

## Experimental setup

Evaluated on 6 state-of-the-art LALMs including 4 open-source models (Qwen2.5-Omni, R1-AQA, Audio Flamingo 3, Qwen3-Omni) and 2 closed-source models (Gemini 3 Pro, GPT-4 Audio). The evaluation benchmark AHA-Eval contains 6.5K QA attack pairs, and the mitigation dataset AHA-Guard contains 120K DPO pairs. Attack Success Rate (ASR) is measured using GPT-5.2 as an LLM-as-Judge, validated via a human agreement study showing 92.4% agreement on 200 samples.

## Results

State-of-the-art LALMs show severe vulnerability, with Audio Flamingo 3 reaching an ASR of 95.35% and Gemini 3 Pro reaching 79.65% under specific attack conditions. Implicit queries are vastly more effective than explicit queries; for instance, Gemini 3 Pro's ASR for random sounds surges from 10.88% (explicit) to 59.67% (implicit). Furthermore, audio-based attacks amplify vulnerability: Audio Flamingo 3's random explicit ASR jumps from 1.90% in text mode to 53.40% in audio mode. Adversarial sounds induce higher ASR and greater confidence ('yes' log-probabilities) than random sounds due to language model priors.

Test-time CoT prompting fails to mitigate implicit attacks, actually increasing random implicit ASR for Qwen2.5-Omni from 68.74% to 82.90%. In contrast, training-time alignment via DPO on AHA-Guard successfully drops random implicit ASR from 68.74% to 39.01% (Text) and adversarial implicit ASR from 79.19% to 40.24% (Text).

| System & Condition | Expl. Random ASR | Impl. Random ASR | Expl. Adversarial ASR | Impl. Adversarial ASR |
|---|---|---|---|---|
| Audio Flamingo 3 (Text) | 1.90% | 87.05% | 15.63% | 89.03% |
| Audio Flamingo 3 (Audio) | 58.50% | 98.66% | 58.24% | 99.19% |
| Gemini 3 Pro (Text) | 10.88% | 59.67% | 22.02% | 71.07% |
| Gemini 3 Pro (Audio) | 26.19% | 67.01% | 38.82% | 79.65% |
| Qwen2.5-Omni + DPO (Text) | 13.88% | 39.01% | 33.16% | 40.24% |

## Limitations

The evaluation relies heavily on an LLM-as-Judge (GPT-5.2) rather than manual verification for the entire 6.5K benchmark, though validated on a 200-sample subset. The synthetic audio attacks rely on TTS generation which may carry distinct acoustic artifacts separate from natural human speech. The mitigation was primarily tested on a single open-source architecture (Qwen2.5-Omni), leaving cross-architecture transferability of AHA-Guard an open question.

## Why read this

Speech and ML researchers building audio-language models will learn why standard benchmarks fail to expose hidden hallucination risks and how implicit text/audio prompts bypass grounding, making AHA-Guard an essential recipe for robust alignment.

## Code

- https://cs20s030.github.io/AHA-website/

## Applications

Improving the reliability, factuality, and safety of audio-language assistants, voice agents, and acoustic scene understanding systems deployed in real-world environments.

## Institutions / 機構

University of Maryland, College Park, Adobe Research

## Related

- (link related pages by id as the wiki grows)
