---
id: huang26k_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1610
---

# Noise-Aware In-Context Learning for Hallucination Mitigation in ALLMs

**TL;DR** — Retrieving relevant noise examples as in-context priors cuts audio-LLM hallucination rate from 26.53% to 16.98% without any fine-tuning, and comes with a new fine-grained hallucination benchmark.

## Problem

Auditory Large Language Models (ALLMs) hallucinate content not actually present in the audio, existing hallucination-detection methods oversimplify this to binary classification, and mitigation usually requires costly fine-tuning.

## Method

Noise-Aware In-Context Learning (NAICL) is a plug-and-play method that builds a noise prior library, retrieves noise examples relevant to the input audio, and feeds them as contextual priors so the model generates more conservatively when acoustic evidence is insufficient; the authors also introduce the Clotho-1K benchmark defining four hallucination types with fine-grained metrics.

## Results

Evaluated ALLMs share similar hallucination behaviors, and NAICL reduces the hallucination rate from 26.53% to 16.98%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Making ALLM-based audio understanding systems more trustworthy in deployment (e.g., audio question answering, sound-event reporting) without expensive retraining.

## Related

- (link related pages by id as the wiki grows)
