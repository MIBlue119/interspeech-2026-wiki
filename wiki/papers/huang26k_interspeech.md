---
id: huang26k_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1610
pdf: https://www.isca-archive.org/interspeech_2026/huang26k_interspeech.pdf
---

# Noise-Aware In-Context Learning for Hallucination Mitigation in ALLMs

[PDF](https://www.isca-archive.org/interspeech_2026/huang26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1610)

**TL;DR** — The paper introduces a plug-and-play Noise-Aware In-Context Learning method to mitigate auditory hallucinations in Auditory Large Language Models, reducing the overall hallucination rate from 26.53% to 16.98%.

## Problem

Auditory Large Language Models frequently generate incorrect interpretations when faced with ambiguous acoustic evidence, background noise, or overlapping sound events, relying excessively on linguistic priors. Existing evaluation methods are often binary classification tasks that fail to capture nuanced generative errors or conflate missed events with actual hallucinations. Furthermore, current datasets like AudioSet and Clotho exhibit subjectivity, limited event coverage, or high annotator divergence, hindering rigorous hallucination research.

## Method

The authors propose Noise-Aware In-Context Learning (NAICL), which treats diverse broadband noise as an acoustic lower-bound prior with weak semantic properties to regulate semantic commitment during inference. A structured noise prior library is constructed by pairing broadband noise segments with conservative, acoustics-level textual templates (e.g., "continuous background noise"). During inference, an acoustic encoder retrieves the top-K most similar noise-description pairs based on cosine similarity in the embedding space using BEATs, conditioning the model alongside the input audio. The method is primarily evaluated on Qwen2.5-Omni-7B using an LLM-as-a-Judge pipeline powered by Qwen3-Next-80B-A3B-Instruct.

## Results

The study introduces the Clotho-1K benchmark comprising 1,000 multi-event audio samples manually verified and categorized into four hallucination types: acoustic attribute, source or material, prior-driven, and fabricated event. Evaluated on 12 mainstream models, baseline hallucination rates range from 19.42% (Gemini-2.5-pro) to 40.50% (SALMONN-7B). Applying NAICL to Qwen2.5-Omni-7B reduces its overall hallucination rate from 26.53% to 16.98%, with consistent drops across all four error categories. Ablation studies confirm that 3-shot retrieval with structured captions yields optimal performance, while word-frequency analysis shows that NAICL successfully suppresses event and definite terms in favor of conservative acoustic descriptions.

## Code

- https://github.com/OrgHuang/NAICL-Clotho1k.git

## Applications

Speech and ML engineers developing voice assistants, audio captioning systems, or general auditory intelligence models who need to improve model reliability and factual grounding in complex acoustic environments.

## Limitations

The current benchmark scale and scenario diversity are limited, leaving room for broader dataset coverage and specialized audio fine-tuning schemes.

## Related

- (link related pages by id as the wiki grows)
