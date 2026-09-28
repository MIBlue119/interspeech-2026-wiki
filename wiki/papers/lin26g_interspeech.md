---
id: lin26g_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1421
pdf: https://www.isca-archive.org/interspeech_2026/lin26g_interspeech.pdf
---

# Silence is Golden: Mitigating Hallucinations in Large Audio-Language Models via Layer-Weighted Vector Steering

[PDF](https://www.isca-archive.org/interspeech_2026/lin26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1421)

**TL;DR** — The paper introduces Layer-Weighted Vector Steering (LWVS), a training-free intervention that mitigates audio hallucinations in large audio-language models by amplifying contrastive steering vectors in influential deeper layers, boosting recall on Gemma by 15.6%.

## Problem

Large Audio-Language Models (LALMs) frequently generate content ungrounded in input audio, termed hallucinations. Conventional text-only or uniform activation steering strategies fail to capture acoustic characteristics or apply corrections uniformly across layers where sensitivities heavily vary. Addressing this is crucial for reliable audio QA and general audio understanding without expensive fine-tuning or decoding-time overhead.

## Method

The method uses Modality-Aware Vector Steering (MAVS), constructing a steering vector by subtracting the final-token hidden states of a silent audio baseline of identical length from the active audio-plus-query input. Through internal state probing using cosine similarity and Cohen's d effect sizes, the authors discover that later layers have a disproportionately higher influence on output correctness. Based on this, Layer-Weighted Vector Steering (LWVS) applies an adaptive layer-specific strength schedule (with a base strength lambda = 0.05 and beta = 0.5) that boosts intervention in deeper layers (e.g., layers 16-32 for Gemma, 14-29 for Qwen) while suppressing it in early and final layers to protect the logit distribution.

## Results

Evaluated on the Audio Hallucination QA dataset using Gemma-3n-E4B-It and Qwen2-Audio-7B-Instruct models with greedy decoding. LWVS boosts Recall on the Gemma model from 53.4% to 69.0% (Total F1 rising to 61.9 from 55.0) and Qwen's Total F1 to 63.2 from 60.2. On the 10,000-question MMAU benchmark, LWVS preserves or enhances general audio understanding, achieving a relative accuracy increase on Qwen from 54.8% to 59.2% while maintaining Gemma's performance at 64.1%. Baselines compared include Original models, Text-Only Vector Steering (TVS), and standard uniform MAVS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and practitioners deploying Large Audio-Language Models for spoken dialogue, audio question answering, and audio captioning tasks to suppress ungrounded hallucinations at inference time.

## Related

- (link related pages by id as the wiki grows)
