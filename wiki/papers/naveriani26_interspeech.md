---
id: naveriani26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2070
---

# Diffusion Language Models for Speech Recognition

**TL;DR** — Masked and uniform-state diffusion language models can rescore ASR hypotheses effectively, and a new joint-decoding method that fuses CTC's framewise probabilities with a uniform-state diffusion model's labelwise probabilities significantly improves recognition accuracy.

## Problem

Diffusion language models offer bidirectional attention and parallel text generation, but their applicability to speech recognition rescoring and decoding had not been comprehensively explored.

## Method

The authors provide a guide to incorporating masked diffusion language models (MDLM) and uniform-state diffusion models (USDM) for rescoring ASR hypotheses, and design a new joint-decoding method that integrates CTC's framewise probability distributions with USDM's labelwise probability distributions at each decoding step.

## Results

Both USDM and MDLM significantly improve recognized-text accuracy, with the joint CTC+USDM decoding combining strong language knowledge from USDM with acoustic information from CTC; code and recipes are published.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Provides ASR system builders a new rescoring/decoding technique that can improve accuracy by combining diffusion language modeling with CTC acoustic decoding.

## Related

- (link related pages by id as the wiki grows)
