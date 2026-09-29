---
id: li26r_interspeech
category: resources-evaluation
labels: [self-supervised, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1026
pdf: https://www.isca-archive.org/interspeech_2026/li26r_interspeech.pdf
---

# INSPIRE: A Benchmark for Instruction-Aware Speech Retrieval

*Chen-An Li, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/li26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1026)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — We introduce INSPIRE, the first benchmark for instruction-aware speech retrieval that evaluates models across semantic, speaker, style, and environmental relevance constraints. The empirical study reveals that current text-centric models excel at semantic tasks while self-supervised speech models capture acoustic traits, but no single model handles multi-attribute composition.

## Key contributions

- Formalized instruction-aware speech retrieval where natural language dynamically alters query relevance.
- Created INSPIRE, a benchmark spanning 680 queries and 17,225 documents across DailyTalk, VCTK, Expresso, and Synthetic subsets.
- Conducted a comprehensive multi-paradigm evaluation covering Large Audio-Language Models (LALMs), cascaded pipelines, self-supervised embeddings, and contrastive audio-language architectures.
- Revealed a fundamental trade-off: cascaded text-based methods master semantic retrieval, whereas self-supervised speech representations capture paralinguistic and acoustic attributes.

## Problem

Traditional speech retrieval relies on fixed similarity matching over isolated criteria like acoustic or semantic closeness. Real-world information seeking is instruction-driven, requiring models to dynamically balance linguistic content, speaker identity, prosody, and background environments given a single spoken reference. Existing systems fail because they cannot adapt their similarity functions on-the-fly, and prior benchmarks like SUPERB or SQA only test static or isolated retrieval goals. Addressing this gap requires a unified evaluation framework to measure how well speech models handle compositional, instruction-conditioned relevance.

## Method

The paper formalizes instruction-aware speech retrieval using query-instruction pairs (q, z) searched against a database D partitioned into positive documents satisfying all constraints and negative documents violating at least one. Four primary retrieval paradigms are evaluated: (1) Large Audio-Language Models (LALMs) which concatenate the query, instruction, and a summarization prompt to extract last-layer hidden states; (2) Cascaded Pipelines which transcribe speech via Whisper-large-v3, caption audio via Qwen3-Omni-Captioner, and retrieve text using BM25, SentenceBERT, E5-Mistral, or Qwen3-Embedding; (3) Self-Supervised Speech Embeddings which extract frame- or layer-wise representations from models like HuBERT-Large and WavLM-Large without instruction conditioning; and (4) Contrastive Audio-Language Models like LAION-CLAP for joint text-audio space projections. Reranking experiments are also performed using LALM-based or text-based rerankers over top-100 retrieved documents.

Key design choices include building INSPIRE with four distinct domains to isolate capabilities: DailyTalk (conversational continuity/semantics), VCTK (speaker identity), Expresso (speaking styles like whisper, laugh, sad, confused), and Synthetic (multi-attribute composition using Natural Questions and ESC-50 sound effects). Prompt-based last-token extraction is chosen over mean pooling for LALMs because summarization prompts guide models to yield more discriminative text-audio representations. Oracle metadata ablation is introduced to determine if imperfect captioning bottlenecks cascaded architectures.

## Experimental setup

Evaluations are performed across four subsets totaling 680 unique spoken queries, 4,080 query-instruction pairs, and 17,225 documents. Baselines span 6 LALMs (Audio-Flamingo-3, Qwen2.5-Omni-3B/7B, Qwen3-Omni-30B, Voxtral-Mini-3B/Small-24B), sparse/dense text retrievers (BM25, SentenceBERT, E5-Mistral, Qwen3-Embedding), SSL speech models (HuBERT-Large, WavLM-Large), and LAION-CLAP. Primary metrics are Recall@10, Recall@50, Recall@100 for retrieval, and NDCG@10/50 for reranking.

## Results

On the semantic DailyTalk subset, cascaded text retrieval dominates: Qwen3-Embedding achieves a headline R@10 of 62.00% and R@100 of 89.50%, outperforming LALMs (Qwen3-Omni reaches 51.50% R@10). Conversely, on the speaker-focused VCTK subset, self-supervised speech representations heavily outperform text pipelines, with WavLM-Large securing 17.50% R@10 compared to Qwen3-Embedding's 1.88%. On the multi-attribute Synthetic subset, performance drops sharply across all models, with best-performing Qwen3-Embedding achieving only 7.02% R@10 and 11.07% R@100, demonstrating that compositional instruction following remains largely unsolved.

Ablations show that instruction sensitivity is virtually non-existent in unconditioned models like BM25 and base LALMs; only instruction-trained text retrievers (E5-Mistral, Qwen3-Embedding) show notable gains when instructions are provided. Reranking with LALMs or text models boosts NDCG significantly on DailyTalk (e.g., Qwen2.5-Omni-7B jumps from baseline to 48.32% N@50 with Voxtral-Mini-3B reranking), but yields minimal gains on paralinguistic subsets.

| System / Condition | DailyTalk R@10 | VCTK R@10 | Expresso R@10 | Synthetic R@10 |
|---|---|---|---|---|
| Random Baseline | 0.24 | 0.35 | 0.30 | 0.20 |
| Audio-Flamingo-3 (8B) | 30.00 | 1.25 | 2.19 | 3.82 |
| Qwen3-Omni (30B) | 51.50 | 1.25 | 0.94 | 4.88 |
| Qwen3-Embedding (8B) | 62.00 | 1.88 | 0.75 | 7.02 |
| WavLM-Large (0.3B) | 16.50 | 17.50 | 9.50 | 1.70 |
| LAION-CLAP (0.2B) | 0.00 | 1.94 | 1.88 | 0.80 |

## Limitations

The benchmark relies heavily on synthetic multi-attribute mixtures for complex evaluations, which may not fully capture the acoustic subtlety of natural multi-speaker ambient recordings. The scope is restricted to English datasets and a limited set of acoustic conditions (15 ESC-50 classes). Furthermore, cascaded pipelines remain bottlenecked by ASR and captioning errors, while native end-to-end LALMs lack explicit instruction-aware contrastive training.

## Why read this

Researchers building next-generation multimodal speech LLMs or unified speech-text embedding spaces should read this to understand why current models fail at compositional instruction-following. It provides the definitive benchmark suite and diagnostic breakdown showing the divide between semantic comprehension and acoustic feature preservation.

## Code

- https://github.com/lca0503/INSPIRE

## Applications

Advanced voice assistants, archival audio search engines, automated customer service call analysis, and context-aware media retrieval systems.

## Institutions / 機構

National Taiwan University, NTU Artificial Intelligence Center of Research Excellence

**Funding / 經費:** National Science and Technology Council, Ministry of Education, Taiwan Centers of Excellence in Artificial Intelligence

## Related

- (link related pages by id as the wiki grows)
