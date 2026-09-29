---
id: sirbu26_interspeech
category: asr
labels: [dataset-or-benchmark-release]
institutions: ["University of Bucharest", "Romanian Academy"]
code: https://github.com/RoITN
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3454
pdf: https://www.isca-archive.org/interspeech_2026/sirbu26_interspeech.pdf
---

# Inverse Text Normalization in Romanian: A Comparative Study of Rule-Based, Neural, and Large Language Model Approaches

*Oana Sirbu, Alexandra Diaconu, Sergiu Nisioi, Bogdan Alexe*

[PDF](https://www.isca-archive.org/interspeech_2026/sirbu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sirbu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3454)

**Category:** `asr` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — This paper presents the first empirical study and benchmark for Inverse Text Normalization (ITN) in Romanian, comparing rule-based, neural, and large language model approaches across 24k annotated pairs. Few-shot proprietary LLM prompting achieves near-human performance (2.57% Mean WER), while traditional deterministic grammars remain competitive (4.56% Mean WER) at significantly higher throughput.

## Key contributions

- Introduces the first standardized benchmark dataset for Romanian ITN comprising 24,753 manually annotated spoken-written pairs derived from broadcast news.
- Develops a linguistically grounded Romanian ITN guide covering eight distinct normalization categories and addressing language-specific phenomena like inflectional agreement.
- Establishes a rigorous evaluation framework separating global error rates into copy spans (NI-WER) and normalization spans (I-WER).
- Performs a comprehensive comparative study across rule-based weighted finite-state transducers, fine-tuned multilingual and monolingual transformers, few-shot LLMs, and agentic tool-augmented pipelines.

## Problem

Inverse Text Normalization converts spoken-form ASR outputs into standardized written text, yet systematic evaluations remain largely restricted to English and a few high-resource languages. Romanian presents unique syntactic challenges—such as inflectional number-noun agreement, flexible numeric constructions, and complex punctuation/formatting conventions—that combine syntactic sensitivity with strict numerical fidelity. Prior approaches lack standardized evaluation frameworks that decouple copy preservation from normalization failures, making it difficult for practitioners to weigh accuracy against inference latency and deployment costs.

## Method

The study evaluates five distinct paradigms: (1) A deterministic grammar-based baseline built using NeMo Text Processing 1.1.0 and Pynini 2.1.6, consisting of roughly 15 expert-crafted normalization rules per class. (2) mT5-small, a multilingual transformer fine-tuned for 5 epochs with a learning rate of 2e-4, batch size 16, weight decay 0.01, and AdamW optimization on a single NVIDIA H100 (80GB). (3) RoLlama3.1-8b-Instruct, fully fine-tuned for 2 epochs using Axolotl with an effective batch size of 32, AdamW 8-bit, learning rate 2e-5, and cosine scheduling. (4) Direct few-shot prompting of o4-mini via API, incorporating task instructions, the ITN guide, and representative category examples. (5) An agentic tool-augmented pipeline using LangChain where GPT-4o acts as a controller that dynamically invokes specialized normalization tools per span.

These models address the trade-off between strict adherence to syntactic rules and contextual language understanding. Rule-based grammars ensure high fidelity on unchanged copy spans but lack flexibility under domain shifts. LLM-based prompting leverages vast pretraining priors for robust contextual normalization, albeit at a steep computational and financial cost (~$0.0073 per sentence versus CPU-based deterministic execution).

## Experimental setup

Evaluated on 24,753 spoken-written pairs from RO-N3WS broadcast news (22,365 training/validation, 1,988 in-domain test), plus a 400-instance out-of-distribution (OOD) test set spanning audiobooks, children's stories, film dialog, and conversational podcasts (100 sentences per domain). Systems are compared using Global WER, Copy WER (C-WER), Normalization WER (N-WER), and Mean WER. Human inter-annotator evaluation is performed across five native speakers.

## Results

In the out-of-distribution evaluation, LLM Prompting achieves the lowest Mean WER of 2.57% (Global WER 1.49%, Copy WER 0.70%, Normalization WER 5.51%), closely approaching human performance (Mean WER 2.45%). The NeMo/Pynini grammar achieves a competitive Mean WER of 4.56%, excelling particularly on copy preservation with a C-WER of 0.11%, but struggling on normalization spans with an N-WER of 11.62%. The fine-tuned RoLlama model yields a 3.97% Mean WER, while Agentic ITN lags behind with a 6.59% Mean WER due to occasional missed tool invocations and reintegration errors. In terms of inference speed, the grammar-based system processes ~60 sentences/s on CPU, whereas prompt-based and agentic LLMs drop to ~0.21 and ~0.45 sentences/s respectively.

| System | G-WER (%) | C-WER (%) | N-WER (%) | Mean WER (%) |
|---|---|---|---|---|
| LLM Prompting | 1.49 | 0.70 | 5.51 | 2.57 |
| RoLLaMA | 5.23 | 0.24 | 6.45 | 3.97 |
| NeMo/Pynini | 1.94 | 0.11 | 11.62 | 4.56 |
| Agentic ITN | 2.67 | 0.80 | 16.27 | 6.59 |
| Human Average | 1.46 | 0.66 | 5.24 | 2.45 |

## Limitations

Proprietary LLMs may have been contaminated by prior exposure to Romanian web data during pretraining, confounding zero-shot generalization claims. Agentic pipelines suffer from fragile controller routing and span reintegration errors. Grammar-based systems require heavy manual engineering (80 person-hours) and scale poorly to unseen stylistic domains.

## Why read this

Speech and ML engineers building production speech pipelines for non-English languages will learn how to choose between latency-friendly rule-based grammars and accurate but costly LLM methods. Researchers gain a rigorously annotated Romanian benchmark and a decoupled evaluation framework that exposes the hidden trade-off between copy preservation and normalization accuracy.

## Code

- https://github.com/RoITN

## Applications

Post-processing automatic speech recognition transcripts for subtitle generation, text search indexing, and downstream natural language processing pipelines in Romanian.

## Institutions / 機構

University of Bucharest, Romanian Academy

**Funding / 經費:** Romanian Hub for Artificial Intelligence - HRIA, Smart Growth, Digitization and Financial Instruments Program, CNCS - UEFISCDI

## Related

- [Towards Efficient Simultaneous Inverse Text Normalization with Pretrained Text-to-Text Language Model and Read-Tag-Write Policy](hoang26_interspeech.md) — same problem · relatedness 2.3/3
- [IPA-Guided Dual Transcription for Data-Centric Speech Corpus Refinement](choi26f_interspeech.md) — same problem · relatedness 2.1/3
- [Preference-ASR: A Preference-Aware Test Set for Benchmarking ASR in the Era of Speech LLMs](koluguri26_interspeech.md) — shared data / evaluation · relatedness 1.9/3
- [Benchmarking Large Language Models for Grapheme-to-Phoneme Conversion: A Japanese Case Study](koriyama26_interspeech.md) — shared technique · relatedness 1.7/3
- [Open ASR Leaderboard: Towards Reproducible and Transparent Multilingual and Long-Form Speech Recognition Evaluation](srivastav26_interspeech.md) — shared data / evaluation · relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
