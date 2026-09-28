---
id: xu26k_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1160
pdf: https://www.isca-archive.org/interspeech_2026/xu26k_interspeech.pdf
---

# From Reactive to Proactive: Assessing the Proactivity of Voice Agents via ProVoice-Bench

[PDF](https://www.isca-archive.org/interspeech_2026/xu26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1160)

**TL;DR** — ProVoice-Bench is a new evaluation framework with 1,182 samples across four tasks that measures the ability of multimodal voice agents to proactively intervene based on audio cues and digital contexts, revealing significant shortcomings in current models.

## Problem

Current multimodal large language model (MLLM) voice agents operate primarily in a reactive paradigm, waiting for explicit user instructions while failing to infer implicit needs or detect background trigger points that require intervention. Existing proactive agent benchmarks focus heavily on visual cues while ignoring audio information and user-defined triggers. This gap prevents voice agents from engaging in natural, context-aware, proactive interventions such as error correction or ambient monitoring.

## Method

The authors introduce ProVoice-Bench containing 1,182 high-quality samples across four tasks: Proactive Intent Capture (PIC), Latent Topic Monitor (LTM), Context Fact Checking (CFC), and Environment Sound Sensing (ESS). The multi-stage data synthesis pipeline constructs digital states using Qwen3-Max, generates conversational scripts via LLMs, synthesizes speech using CosyVoice3 with prompt audio, applies far-field and room impulse response acoustic simulations, and assembles conversations with Gaussian-distributed temporal intervals and background noise. The evaluation tests state-of-the-art MLLMs ranging from 7B to 33B parameters, including models utilizing chain-of-thought (thinking) reasoning paradigms.

## Results

Evaluated on models like Mimo-Audio (7B), Qwen3-Omni (30B), Step-Audio-R1 (33B), and Qwen2.5-Omni (7B) using metrics including Recall (Rec), False Positive Rate (FPR), Accuracy (Acc), and Response Accuracy (Racc). Results show a widespread propensity for over-triggering, particularly in LTM and CFC tasks where models frequently fail to recognize the absence of violations. Chain-of-thought reasoning significantly improves analysis-intensive tasks like CFC, LTM, and PIC, but a notable discrepancy remains between deciding to speak and executing accurate tool calls or textual responses.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers developing proactive multimodal voice assistants, smart speakers, and ambient monitoring devices that need to autonomously decide when to intervene in human conversations.

## Limitations

Current open-source MLLMs suffer from high false-positive rates and struggle with bridging the gap between decision-to-speak and correct task execution.

## Related

- (link related pages by id as the wiki grows)
