---
id: sirbu26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3454
pdf: https://www.isca-archive.org/interspeech_2026/sirbu26_interspeech.pdf
---

# Inverse Text Normalization in Romanian: A Comparative Study of Rule-Based, Neural, and Large Language Model Approaches

[PDF](https://www.isca-archive.org/interspeech_2026/sirbu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sirbu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3454)

**TL;DR** — This paper presents the first empirical study of Inverse Text Normalization (ITN) for Romanian, comparing rule-based, neural, and large language model approaches, with few-shot LLM prompting achieving a near-human mean word error rate of 2.57% out-of-distribution.

## Problem

Inverse Text Normalization maps spoken-form ASR transcripts into standardized written text, which is critical for downstream readability and search but lacks systematic evaluation for morphologically rich and flexible languages like Romanian. Differences in numerical agreement, spelling conventions, and scarce annotated resources make deploying ITN challenging, forcing engineers to navigate trade-offs between deterministic grammars and expensive neural or LLM alternatives.

## Method

The authors created a linguistically grounded Romanian ITN guide covering eight categories (e.g., cardinals, ordinals, currencies, dates) and annotated a corpus of 24,753 spoken-written pairs derived from broadcast news. They evaluated five distinct paradigms: deterministic weighted finite-state grammars using NeMo/Pynini, fine-tuned multilingual mT5-small, a fully fine-tuned OpenLLM-Ro/RoLlama3.1-8b-Instruct model, direct few-shot prompting with o4-mini, and a LangChain-based agentic pipeline using GPT-4o as a controller. Evaluation used a unified framework separating global, copy, and normalization word error rates (WER).

## Results

Experiments on a 400-instance out-of-distribution (OOD) test set across audiobooks, children's stories, film dialog, and podcasts show that few-shot LLM prompting achieved the lowest Mean WER of 2.57% (1.49% global WER), coming close to the human average of 2.45%. The fine-tuned RoLlama model achieved 3.97% Mean WER, the rule-based NeMo/Pynini system achieved 4.56% Mean WER (with exceptional copy preservation at 0.11% C-WER), and the agentic system reached 6.59% Mean WER. In-domain results showed similar trends, with direct LLM prompting achieving 1.21% and NeMo/Pynini achieving 1.92% Mean WER.

## Code

- https://github.com/RoITN

## Applications

Speech engineers and NLP developers working on Romanian ASR post-processing pipelines to convert spoken transcripts into standardized written text for subtitle generation, search, and downstream language tasks.

## Limitations

Proprietary LLMs may have had prior exposure to Romanian news text in their pretraining data, and LLM-based approaches incur significantly higher computational costs and latency compared to deterministic grammars.

## Related

- (link related pages by id as the wiki grows)
