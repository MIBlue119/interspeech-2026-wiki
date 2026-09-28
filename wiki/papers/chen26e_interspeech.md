---
id: chen26e_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-645
---

# CAAD: Contrastive Audio-Aware Distillation for Efficient Speech Language Models

**TL;DR** — CAAD distills the accuracy benefits of contrastive decoding directly into a speech language model's weights, giving audio-grounded reasoning gains without the extra inference cost that contrastive decoding normally adds.

## Problem

Speech language models can reason well but are large and tend to lean on linguistic priors over the actual acoustic signal; contrastive decoding fixes the grounding problem but slows inference by requiring two forward passes.

## Method

CAAD trains a student model to internalize a teacher's contrastive audio-aware versus text-only reasoning using a synchronized teacher-forcing strategy anchored by unified pseudo-ground-truths, letting the teacher's full-sequence contrastive distributions be generated and distilled efficiently in one pass.

## Results

CAAD gives roughly an 8% relative gain over standard knowledge distillation on Dynamic-SUPERB and reduces linguistic bias on MCR-BENCH.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying smaller, faster speech-language models that still stay well grounded in the audio, e.g. for on-device or latency-sensitive audio assistants.

## Related

- (link related pages by id as the wiki grows)
