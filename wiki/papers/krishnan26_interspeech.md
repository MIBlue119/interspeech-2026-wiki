---
id: krishnan26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-309
---

# On Optimizing Multimodal Jailbreaks for Spoken Language Models

**TL;DR** — Jointly optimizing adversarial perturbations across both text and audio jailbreaks Spoken Language Models 1.5x to 20x more effectively than attacking either modality alone.

## Problem

Spoken Language Models inherit the safety vulnerabilities of their LLM backbone plus an expanded attack surface, and while unimodal jailbreak attacks on SLMs are known, existing attacks optimize either text or audio in isolation rather than jointly.

## Method

The authors explore gradient-based multimodal jailbreaks and introduce JAMA (Joint Audio-text Multimodal Attack), a joint optimization framework combining Greedy Coordinate Gradient (GCG) and Projected Gradient Descent (PGD) that simultaneously perturbs both input modalities, and also study a faster sequential attack variant.

## Results

Across four state-of-the-art SLMs and four audio types, JAMA surpasses unimodal jailbreak rates by 1.5x to 20x, and the sequential attack variant runs 4x to 6x faster than the fully joint attack.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Red-teaming and safety evaluation for spoken language models and voice assistants before deployment.

## Related

- (link related pages by id as the wiki grows)
