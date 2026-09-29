---
id: awobade26_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, dataset-or-benchmark-release]
institutions: ["Intron"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3140
pdf: https://www.isca-archive.org/interspeech_2026/awobade26_interspeech.pdf
---

# AfriVox-v2: A Domain-Verticalized Benchmark for In-the-Wild African Speech Recognition

*Busayo Awobade, Gabrial Ashungafac, Oluwatoni Otokiti, Tobi Olatunji*

[PDF](https://www.isca-archive.org/interspeech_2026/awobade26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/awobade26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3140)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — AfriVox-v2 is a domain-verticalized, in-the-wild benchmark for African speech recognition covering 14+ languages across conversational datasets and 10 vertical sectors, demonstrating that region-optimized models (Sahara-v2) outperform massive multimodal speech LLMs (Gemini 3 Flash).

## Key contributions

- Introduces Intron-YT, a new unscripted conversational dataset collected from public multimedia sources with rigorous VAD segmentation and native-speaker crowdsourced transcription.
- Aggregates large-scale conversational corpora (Africa Next Voices and Waxal) across over 20 African languages, providing realistic acoustic variability and background noise.
- Establishes a unified domain-verticalized evaluation taxonomy spanning 10 distinct sectors (including Agriculture, Finance, Health, Telecommunications) plus numbers and named entities.
- Conducts the first independent benchmark of Omni-CTC models (300M, 1B, 7B), Gemini 3 Flash, and Sahara-v2 under identical deployment-like conditions.

## Problem

Prior African speech benchmarks suffer from read-speech bias by relying heavily on clean, scripted audio that fails to capture spontaneous conversational complexity. Furthermore, general models exhibit surface-level domain coverage, resulting in catastrophic error rates on verticalized sectors like finance, telecommunications, and named entities. Global leaderboards report low WERs on Western datasets, but this hides a 5x to 10x degradation when models encounter the rich phonetic, prosodic, and acoustic diversity of African linguistic environments.

## Method

The benchmark evaluates five model families with distinct architectures: Omni-ASR v2 CTC models scaled at 300M, 1B, and 7B parameters (chosen for fast inference compared to auto-regressive LLMs), Gemini 3 Flash (a multimodal speech LLM), and Sahara-v2 (a region-optimized ASR model). All models use their default preprocessing pipelines and hyperparameters, with language hints provided where supported to mitigate cross-language confusion. Evaluation spans both traditional Word Error Rate (WER) and deployment-specific metrics like Entity Error Rate (EWER) and Numeric Error Rate (NWER).

Because source datasets lacked consistent domain metadata, the authors constructed a multilabel tagging pipeline utilizing Gemini-3 to automatically annotate transcripts across 10 functional domains. Human validation on high-volume language subsets yielded a precision of 42% and recall of 70%, establishing an acceptable signal for macro-level trend analysis despite moderate label noise.

## Experimental setup

Evaluations encompass over 20 African languages using aggregated corpora including Waxal (~69.5 hours across 6 languages), Africa Next Voices (~100+ hours across 15 languages), and Intron-YT (10 hours across 7 languages). Models are compared against previous AfriVox-v1 read-speech baselines and across multiple architectural tiers using Word Error Rate (WER) as the primary metric, supplemented by sector-specific error rates on numbers and named entities.

## Results

On the in-the-wild AfriVox-v2 benchmark, Sahara-v2 achieves the lowest average WER overall at 20.49, outperforming the Omni-CTC 7B model (27.85 average WER) and Gemini 3 Flash (26.59 average WER). Model scaling within the Omni-CTC family shows clear gains, with average WER dropping from 36.82 (300M) to 31.73 (1B) and 27.85 (7B). However, multimodal LLMs like Gemini 3 Flash lag behind speech-native counterparts. Across domains, Telecommunications and Sports exhibit the highest error rates (>30-35% WER), while specialized numbers and named entities remain challenging failure modes with average error rates of 20.32% and 23.11% respectively, even for the top-performing models.

| Model | General | Health | Finance | Telecom | Numbers | Entity |
|---|---|---|---|---|---|---|
| Omni-CTC 300M | 44.58 | 43.75 | 45.94 | 48.23 | 42.66 | 45.23 |
| Omni-CTC 1B | 33.68 | 34.28 | 32.40 | 36.18 | 32.80 | 33.70 |
| Omni-CTC 7B | 28.54 | 28.52 | 26.95 | 30.96 | 27.19 | 27.87 |
| Gemini 3 Flash | 32.82 | 29.93 | 32.88 | 35.11 | 31.14 | 31.72 |
| Sahara-v2 | 16.12 | 16.12 | 17.00 | 25.38 | 20.32 | 23.11 |

## Limitations

The benchmark covers only a fraction of Africa's immense linguistic diversity, leaving many languages underrepresented. Conversational dataset sizes for certain languages are small, limiting statistical power. Furthermore, automated LLM-assisted domain labeling introduced label noise (42% precision, 70% recall), meaning domain-level findings should be interpreted as indicative trends rather than absolute precision figures.

## Why read this

Speech researchers and engineers building localized voice AI for low-resource or African markets should read this to understand why global multimodal LLMs fail on unscripted, domain-specific regional speech, and why specialized regional ASR architectures are necessary.

## Code

- https://huggingface.co/datasets/intronhealth/afrivox-v2

## Applications

Localized conversational agents, voice-enabled healthcare documentation, automated customer support intent detection, and financial inclusion applications across Africa.

## Institutions / 機構

Intron

## Related

- (link related pages by id as the wiki grows)
