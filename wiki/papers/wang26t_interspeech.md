---
id: wang26t_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1212
---

# MATA: A Training-Free Approach to Mitigate Cross-Modal Attention Imbalance in Large Audio Language Models

**TL;DR** — A training-free intervention that nudges self-attention toward audio tokens took 2nd place in the Interspeech 2026 Audio Reasoning Challenge's Single Model Track, without adding any parameters.

## Problem

Large Audio Language Models often show audio-textual attention imbalance, prioritizing text over acoustic information during multi-modal fusion, which limits use of acoustic cues and hurts audio reasoning.

## Method

MATA dynamically pushes the model to attend More To Audio tokens within self-attention, intervening after raw attention scoring and targeting only the last token in intermediate layers, without adding parameters or computational overhead, and requires no training.

## Results

Experiments on MMAU and MMAR show consistent performance gains; combined with Qwen3-Omni-Thinking, MATA secured 2nd place in the Single Model Track of the Interspeech 2026 Audio Reasoning Challenge, the only training-free approach among the top solutions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Drop-in inference-time fix for improving audio reasoning in any large audio language model suffering from text-dominant attention bias.

## Related

- (link related pages by id as the wiki grows)
