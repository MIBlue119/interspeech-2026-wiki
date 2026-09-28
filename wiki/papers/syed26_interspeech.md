---
id: syed26_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/syed26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/syed26_interspeech.pdf
---

# corpusgen: An Open-Source Toolkit for Phoneme-Coverage-Optimized Speech Corpus Design Across Languages

[PDF](https://www.isca-archive.org/interspeech_2026/syed26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/syed26_interspeech.html)

**TL;DR** — The paper introduces corpusgen, an open-source Python toolkit for phoneme-coverage-optimized speech corpus design and generation across more than 100 languages.

## Problem

Designing phonetically balanced speech corpora for low-resource languages remains an ad-hoc process, forcing practitioners to build custom pipelines from scratch. Existing tools like FestVox are largely limited to specific languages and scripts, while a unified framework integrating phonetic evaluation, selection algorithms, and generation is missing.

## Method

The corpusgen toolkit integrates espeak-ng for grapheme-to-phoneme conversion, canonical phoneme inventories from PHOIBLE covering over 2,186 languages, and PanPan for articulatory feature distances. It provides six corpus selection algorithms including greedy set cover with CELF lazy evaluation acceleration, integer linear programming via PuLP, distribution-aware selection, and NSGA-II multi-objective optimization. For resource-scarce scenarios, it features a Phonotactically-Controlled Text Generation (Phon-CTG) module utilizing HuggingFace repositories, cloud LLMs via litellm, and local quantized transformers. The software is released as a pip-installable Python package and CLI under the Apache-2.0 license.

## Results

The evaluation module outputs phoneme, diphone, and triphone coverage percentages, Jensen-Shannon divergence, Shannon entropy, and Phoneme Coverage Diversity scores. The text demonstrates that coverage-optimized selection achieves near-optimal phoneme coverage with significantly fewer sentences than random baselines. Furthermore, CELF achieves equivalent coverage to standard greedy selection while yielding up to two orders of magnitude speedup in wall-clock time. The framework has been validated across 40 languages spanning 12 language families.

## Code

- https://github.com/jemsbhai/corpusgen

## Applications

Speech and ML engineers building text-to-speech (TTS) or automatic speech recognition (ASR) systems, particularly for underrepresented or low-resource languages.

## Related

- (link related pages by id as the wiki grows)
