---
id: awobade26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3140
pdf: https://www.isca-archive.org/interspeech_2026/awobade26_interspeech.pdf
---

# AfriVox-v2: A Domain-Verticalized Benchmark for In-the-Wild African Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/awobade26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/awobade26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3140)

**TL;DR** — AfriVox-v2 is a comprehensive domain-verticalized benchmark suite containing unscripted, in-the-wild audio across 14 African languages, revealing that region-optimized models substantially outperform larger global speech models and multimodal LLMs under realistic deployment conditions.

## Problem

Current speech benchmarks suffer from a read-speech bias, shallow domain coverage, and outdated model profiles, failing to capture the acoustic and phonetic diversity of spontaneous African speech. This gap leaves developers without reliable ways to evaluate voice AI deployment in specialized sectors like finance, health, and government, where models often experience massive performance degradation.

## Method

The AfriVox-v2 benchmark aggregates conversational data from sources like Africa Next Voices (AFN), Waxal, and a novel YouTube-derived corpus (Intron-YT) totaling over multiple languages and hundreds of hours, annotated with a 10-domain taxonomy plus numerical and named entity tags using an LLM-assisted pipeline validated by humans. The authors benchmark recent model architectures under identical conditions, including Omni-CTC models (300M, 1B, and 7B parameters), Gemini 3 Flash, and the region-optimized Sahara-v2 ASR system. Evaluation metrics include standard Word Error Rate (WER), Entity Error Rate (EWER), and Numeric Error Rate (NWER).

## Results

Across evaluations on AfriVox-v2, Sahara-v2 achieves the lowest average WER of 20.49%, outperforming all multilingual CTC models and multimodal LLMs. Scaling benefits are evident within the Omni-CTC family, where average WER drops from 36.82% (300M) down to 31.73% (1B) and 27.85% (7B). Gemini 3 Flash lags behind specialized ASR models, highlighting a weakness in exact acoustic decoding. Domain analysis shows high error rates in Telecommunications and Sports (exceeding 30-35% WER), alongside persistent challenges with numbers (20.32% WER) and named entities (23.11% WER).

## Code

- https://huggingface.co/datasets/intronhealth/afrivox-v2

## Applications

Speech engineers and developers building localized voice AI applications for African markets across sectors such as healthcare, agriculture, and finance will use this benchmark to rigorously evaluate and select robust ASR foundation models.

## Limitations

The benchmark covers only a fraction of Africa's linguistic diversity, some datasets feature small conversational sample sizes, and the LLM-assisted domain annotation pipeline introduces label noise with roughly 42% precision and 70% recall.

## Related

- (link related pages by id as the wiki grows)
