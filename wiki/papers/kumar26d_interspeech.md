---
id: kumar26d_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2006
pdf: https://www.isca-archive.org/interspeech_2026/kumar26d_interspeech.pdf
---

# Search-GRT: Guided Retrieval Training of Search Agents to Optimize for Complex Question Answering

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2006)

**TL;DR** — Guided Retrieval Training (GRT) improves LLM search agents for complex question answering by restricting the training retrieval space to ground-truth-relevant documents, achieving over 40% performance gains on multi-hop question answering over Search-R1.

## Problem

Reinforcement learning (RL) trains search-augmented language models to formulate subqueries and synthesize answers, but early training stages suffer from poor reward signals because untrained models generate suboptimal queries that retrieve irrelevant documents. In multi-hop question answering (MHQA), this causes cascading errors where bad initial retrieval ruins subsequent subqueries, leading to zero rewards and stagnant learning. This work addresses the sparsity and cascading error bottlenecks in agentic RL training.

## Method

The authors propose Guided Retrieval Training (GRT), which restricts the search engine's retrieval corpus during RL training to a small subset of highly relevant documents based on ground truth data. Specifically, for each training sample, a restricted corpus is formed by selecting the top-kappa documents from Wikipedia 2018 that have the highest cosine similarity (using E5 text embeddings) to the ground truth passages or concatenated query-answer pairs. The agent policy is optimized via Proximal Policy Optimization (PPO) with a KL-divergence penalty against a reference model, using a 3 billion parameter Qwen-2.5 base model over 600 training steps.

## Results

Evaluated on general QA (Natural Questions, TriviaQA, PopQA) and multi-hop QA datasets (HotpotQA, 2Wiki, Musique, Bamboogle) using Exact Match (EM). GRT outperforms baselines like Search-R1, SFT, RAG, and IRCoT across tasks, achieving over 40% performance improvements specifically on multi-hop question-answering benchmarks. GRT also improves training efficiency by reaching higher accuracy with fewer steps.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building search-augmented LLMs, conversational assistants, and complex open-domain question-answering systems.

## Related

- (link related pages by id as the wiki grows)
