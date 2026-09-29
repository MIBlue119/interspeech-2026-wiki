---
id: syed26_interspeech
category: resources-evaluation
labels: [low-resource, multilingual]
institutions: ["Florida Institute of Technology", "Daffodil International University", "Deakin University"]
code: https://github.com/jemsbhai/corpusgen
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/syed26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/syed26_interspeech.pdf
---

# corpusgen: An Open-Source Toolkit for Phoneme-Coverage-Optimized Speech Corpus Design Across Languages

*Muntaser Syed, Marius Silaghi, Sharun Akter Khushbu, Fariha Jaigirdar*

[PDF](https://www.isca-archive.org/interspeech_2026/syed26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/syed26_interspeech.html)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`

**TL;DR** — The paper introduces corpusgen, an open-source Python toolkit for designing speech corpora with maximal phoneme, diphone, and triphone coverage across more than 100 languages. It unifies phonetic evaluation, six corpus selection algorithms, and targeted text generation into a single pip-installable framework.

## Key contributions

- Integrates espeak-ng G2P conversion with PHOIBLE canonical IPA inventories spanning 2,186 languages and PanPhon articulatory distance features.
- Implements six distinct selection algorithms ranging from standard greedy set cover and CELF lazy evaluation to ILP, stochastic greedy, distribution-aware selection, and NSGA-II multi-objective optimization.
- Provides a Phonotactically-Controlled Text Generation (Phon-CTG) module utilizing repository retrieval, LLM APIs, and local transformer models to fill specific phonetic coverage gaps.
- Includes a comprehensive evaluation module computing phoneme, diphone, and triphone coverage, Jensen-Shannon divergence, Shannon entropy, and Phoneme Coverage Diversity (PCD) scores.
- Released as an open-source, Apache-2.0 licensed Python package available on PyPI and GitHub, validated across 40 languages and 12 language families.

## Problem

Constructing phonetically balanced speech corpora for training TTS and ASR systems is historically an ad-hoc process restricted to well-resourced languages via isolated tools like FestVox. For under-resourced and low-resource languages, practitioners are forced to build custom scripts from scratch, frequently leading to severe phonetic coverage gaps. Formally, selecting a minimal set of sentences covering all phonetic units maps to the NP-hard Set Cover Problem, yet despite mature algorithmic foundations like greedy logarithmic approximations and submodular CELF acceleration, no unified, language-agnostic toolkit has existed to integrate evaluation, selection, and generation.

## Method

The corpusgen system architecture is centered on an infrastructure layer that wraps espeak-ng through Phonemizer to provide IPA transcriptions, aligns output symbols to PHOIBLE canonical IPA inventories, and uses PanPhon for articulatory feature vector computations. A CoverageTracker tracks running counts of phonemes, diphones, and triphones to enable O(1) marginal gain lookups during optimization.

The selection module offers six algorithms: standard greedy set cover for (ln n + 1)-approximation, CELF for up to two orders of magnitude speedup via submodular lazy evaluation, stochastic greedy for linear-time scaling, PuLP-based ILP for exact ground-truth solutions on small instances, distribution-aware selection incorporating KL-divergence matching, and NSGA-II for Pareto-optimal trade-offs between coverage, size, and naturalness.

The Phon-CTG generation module uses a GenerationLoop to target missing phonetic units by dispatching requests to three pluggable backends: a repository search backend over HuggingFace datasets, a cloud LLM API backend via litellm with phonetic constraints, and a local quantized transformer backend with inference-time guidance. Generated sentences are filtered and scored using a phonetic scorer and an n-gram phonotactic model before being added to the corpus.

## Experimental setup

The framework is validated across 40 languages spanning 12 language families using PHOIBLE inventories covering 2,186 languages. The system is packaged as a pip-installable Python library supporting both a Python API and a command-line interface (CLI) under the Apache-2.0 license.

## Results

The toolkit successfully demonstrates that coverage-optimized selection algorithms achieve near-optimal phoneme coverage using significantly fewer sentences than random selection baselines. CELF delivers equivalent coverage performance to standard greedy algorithms while reducing wall-clock computation time by up to two orders of magnitude.

## Limitations

The toolkit relies heavily on the accuracy of underlying G2P tools (espeak-ng) and phoneme inventories (PHOIBLE), which may introduce transcription errors or lack fine-grained dialectal nuance for extremely under-documented languages. The generated text backend depends on the quality and faithfulness of external LLM APIs or local models, requiring manual verification of naturalness and phonotactic correctness. Furthermore, evaluation metrics assume standardized phonemic mappings that may not capture all continuous acoustic variability.

## Why read this

Speech researchers and TTS/ASR engineers building corpora for low-resource or multilingual environments should read this to adopt a unified, highly optimized toolkit that replaces ad-hoc scripts with rigorous set-cover and generative gap-filling pipelines.

## Code

- https://github.com

## Applications

Training data curation for text-to-speech (TTS) and automatic speech recognition (ASR) systems across low-resource and multilingual domains.

## Institutions / 機構

Florida Institute of Technology, Daffodil International University, Deakin University

## Related

- [VāṇīSetu: A Human-AI Collaborative Framework for Scalable Conversational Speech Corpus Creation in Low-Resource Settings](kumar26h_interspeech.md) — same problem · relatedness 2.0/3
- [Collection and Curation of a Spontaneous Multilingual Speech Corpus for Low-Resource Himalayan Languages](sinha26_interspeech.md) — complementary · relatedness 1.9/3
- [Genealogical Priors in Self-Supervised Learning: Improving Speech Technology for Low-Resource Languages](granda26_interspeech.md) — complementary · relatedness 1.9/3
- [Pashto Common Voice: Building the First Open Speech Corpus for a 60-Million-Speaker Low-Resource Language](rahman26_interspeech.md) — complementary · relatedness 1.9/3
- [Indigenising Speech Technology: Building a TTS Model for te Reo Māori](leoni26_interspeech.md) — complementary · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
