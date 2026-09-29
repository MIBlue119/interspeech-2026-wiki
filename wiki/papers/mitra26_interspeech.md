---
id: mitra26_interspeech
category: speech-llm-dialogue
labels: [streaming-real-time, generative-model]
institutions: ["Amazon", "IIT Kharagpur"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2493
pdf: https://www.isca-archive.org/interspeech_2026/mitra26_interspeech.pdf
---

# Adaptive Turn-Taking for Real-time Multi-Party Voice Agents

*Soumyajit Mitra, Prabhat Pandey, Abhinav Jain, Shanmukha Sahith, K V Vijay Girish*

[PDF](https://www.isca-archive.org/interspeech_2026/mitra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mitra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2493)

**Category:** `speech-llm-dialogue` · **Labels:** `streaming-real-time`, `generative-model`

**TL;DR** — ModeratorLM is a role-conditioned speech LLM designed for real-time turn-taking in multi-party conversations, improving precision by over 40% and recall by more than 70% compared to non-role-conditioned baselines.

## Key contributions

- Proposes the first role-conditioned voice agent (ModeratorLM) that delegates turn-taking and response generation decisions directly to a speech LLM in a chunk-wise streaming fashion.
- Introduces ModeratorLM-Think, a reasoning-augmented variant leveraging chain-of-thought traces over conversational context and assigned roles prior to acting.
- Constructs RolePlayConv, a large-scale synthetic corpus of 75K multi-party conversational sessions spanning 125 distinct assistant roles.
- Demonstrates substantial performance gains on real-world meetings (NOTSOFAR-1) and synthetic evaluation sets, achieving higher role fidelity and lower false-positive interruptions.

## Problem

Traditional conversational agents are engineered primarily for dyadic (two-party) dialogues relying on simple pause duration and silence detection cues. In multi-party settings featuring overlapping speech, dynamic floor competition, and diverse user expectations (from passive listeners to active facilitators), these assumptions fail. Prior text-based role-playing language agents ignore real-time voice dynamics, while existing multi-party datasets lack assistant-role conditioning, causing frequent false-positive interruptions and misaligned turn allocation.

## Method

ModeratorLM integrates an in-house speech encoder with a Qwen3-4B-Instruct-2507 backbone LLM (or Qwen3-4B-Thinking-2507 for the Think variant). Incoming multi-channel audio is downmixed to single-channel, split into variable chunks (0.5s to 3s with dynamic training schedules), encoded independently, and projected via a trainable linear layer into the LLM embedding space alongside synchronized speaker-annotated ASR text transcripts. For each chunk, the LLM outputs either a 'Turn-taking + Response' action (emitting a control token followed by text response) or a 'No-turn' empty sequence. ModeratorLM-Think injects an intermediate reasoning trace bracketed by <think>...</think> control tokens using sampling mode (Temperature=0.7, TopP=0.8, TopK=20) before deciding whether to take the floor.

The training pipeline consists of three frozen/unfrozen stages: (1) Speech-LLM Alignment on 90K hours of public speech data (VoxPopuli, MLS, Common Voice, People's Speech) updating only the linear projection layer; (2) Conversation Pretraining on AMI and Fisher datasets simulating rotating assistant roles; and (3) Role-Conditioning Fine-tuning exclusively on the RolePlayConv dataset using LoRA on LLM parameters (13.4M trainable parameters total, Adam optimizer, peak LR 1e-5).

## Experimental setup

Evaluated on NOTSOFAR-1 (NSF-1, real meeting recordings averaging 6 minutes) and a zero-shot RolePlayConv test set built using QwQ-32B with unseen roles. Compared against Moshi (Moshika dyadic model) and MP-Baseline (multi-party fine-tuned without role conditioning). Evaluated using precision (@P), recall (@R), F1-score (@F1), macro-accuracy (@A), false-positive rate (@FP), reactive miss rate (@RM), and Claude-Sonnet-3.5 LLM-as-a-Judge scores for role fidelity.

## Results

On the RolePlayConv test set, ModeratorLM achieves 0.71 precision, 0.57 recall, and 0.05 false-positive rate, outperforming MP-Baseline (0.40 precision, 0.48 recall, 0.14 false-positive rate) and Moshi (0.15 precision, 0.34 recall). The reasoning-augmented ModeratorLM-Think further boosts performance to 0.79 precision, 0.82 recall, 0.79 F1, and 0.03 false-positive rate. On the real-world NOTSOFAR-1 meetings, ModeratorLM-Think achieves 0.81 precision and 0.74 recall (vs 0.58/0.33 for MP-Baseline). Ablations show that removing transcriptions causes severe degradation (precision drops to 0.39 for Think), confirming heavy reliance on textual cues, whereas swapping ASR text for ground-truth transcripts yields minor drops, proving robustness to realistic 6.7% WER.

| System | NSF-1 @P | NSF-1 @R | NSF-1 @F1 | RPC @P | RPC @R | RPC @F1 |
| --- | --- | --- | --- | --- | --- | --- |
| Moshi | 0.14 | 0.10 | 0.11 | 0.15 | 0.34 | 0.21 |
| MP-Baseline | 0.58 | 0.33 | 0.38 | 0.40 | 0.48 | 0.42 |
| ModeratorLM | 0.77 | 0.51 | 0.57 | 0.71 | 0.57 | 0.61 |
| ModeratorLM-Think | 0.81 | 0.74 | 0.76 | 0.79 | 0.82 | 0.79 |

## Limitations

The system relies heavily on textual transcripts for optimal turn-taking performance, exhibiting significant degradation when text inputs are withheld. Response generation is evaluated primarily in text form rather than streaming native speech codes, and the evaluation relies on synthetic role-playing splits and LLM-as-a-judge scoring alongside limited real meeting data.

## Why read this

Researchers building real-time multi-party voice assistants will learn how to condition streaming LLM turn-taking on complex agent personas using chain-of-thought reasoning and dynamic chunking.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-party voice assistants, automated meeting moderators, and role-playing conversational companions.

## Institutions / 機構

Amazon, IIT Kharagpur

## Related

- [Speak or Stay Silent: Context-Aware Turn-Taking in Multi-Party Dialogue](bhagtani26_interspeech.md) — same problem · relatedness 2.8/3
- [Evaluating Large Language Models Abilities for Addressee, Turn-change, and Next Speaker Prediction in Meetings](fukuda26b_interspeech.md) — same problem · relatedness 2.5/3
- [MuVAP: Multimodal Multiparty Voice Activity Projection for Turn-taking Prediction in the wild](qi26_interspeech.md) — same problem · relatedness 2.3/3
- [DualTurn: Learning Turn-Taking from Dual-Channel Generative Speech Pretraining](rajaa26_interspeech.md) — same problem · relatedness 2.3/3
- [Endpoint Anticipation for Low-Latency Spoken Dialogue](udupa26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
