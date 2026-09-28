---
id: li26r_interspeech
category: speech-retrieval
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1026
pdf: https://www.isca-archive.org/interspeech_2026/li26r_interspeech.pdf
---

# INSPIRE: A Benchmark for Instruction-Aware Speech Retrieval

[PDF](https://www.isca-archive.org/interspeech_2026/li26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1026)

**TL;DR** — The paper introduces INSPIRE, the first benchmark for instruction-aware speech retrieval, revealing that current retrieval paradigms fail to handle diverse natural-language instructions spanning semantic, speaker, style, and acoustic environment attributes.

## Problem

Traditional speech retrieval systems rely on rigid, fixed similarity metrics that cannot adapt to changing user intents specified in natural language. While instruction-aware retrieval is well-developed for text and images, it remains largely unexplored for speech, where queries are acoustic signals and target attributes are highly heterogeneous. This creates a critical gap in evaluating whether a single model can balance fine-grained acoustic properties and compositional instruction following.

## Method

The authors formalize instruction-aware speech retrieval and construct INSPIRE by combining four distinct datasets: DailyTalk (conversational context), VCTK (speaker verification), Expresso (expressive speaking styles), and a Synthetic subset built from Natural Questions. The synthetic subset uses GPT-4o-mini to generate speech across five voices, three styles, and 15 environmental sound effects from ESC-50. Free-form textual instructions are generated using GPT-5.2 to specify single or multi-attribute constraints. The benchmark evaluates four major retrieval paradigms: large audio-language models, cascaded pipelines (ASR/captioning followed by text retrieval), self-supervised speech models, and contrastive audio-language models.

## Results

INSPIRE comprises 680 unique spoken queries expanded into 4,080 query-instruction pairs against a database of 17,225 documents. Empirical evaluations demonstrate that existing methods struggle significantly with multi-attribute and paralinguistic retrieval tasks. Text-based cascaded approaches excel at semantic content retrieval but fail to capture speaker identity and acoustic environments. Conversely, speech-based models exhibit moderate success with acoustic properties but struggle to accurately follow complex textual instructions.

## Code

- https://github.com/lca0503/INSPIRE

## Applications

Speech and ML engineers can use this benchmark to evaluate and develop unified multimodal models capable of flexible, instruction-driven speech search for applications like customer service analytics and audio archive management.

## Related

- (link related pages by id as the wiki grows)
