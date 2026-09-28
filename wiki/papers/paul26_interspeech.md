---
id: paul26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2760
pdf: https://www.isca-archive.org/interspeech_2026/paul26_interspeech.pdf
---

# PROGRESS: Coverage-guided RL to Train Search-augmented LLM Agent

[PDF](https://www.isca-archive.org/interspeech_2026/paul26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/paul26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2760)

**TL;DR** — PROGRESS trains search-augmented LLM agents using a teacher-guided coverage reward in an R1-style reinforcement learning framework, achieving 2-5% absolute improvements on multi-hop question answering.

## Problem

Existing search-augmented LLM agents trained via reinforcement learning primarily rely on outcome-level rewards such as exact match accuracy, which provide zero supervision over intermediate search behavior. This limitation leads to inefficient search actions, composite queries, and poor query decomposition, particularly when using small language models.

## Method

The framework utilizes a frozen large teacher model (Qwen2.5-72B-Instruct) offline to generate essential search queries that capture necessary latent information needs for each complex query. During PPO-based reinforcement learning with a Qwen2.5-3B base policy, a trajectory-level coverage reward is computed based on the harmonic mean (F1-score) of precision and recall over matched policy and teacher queries. An LLM judge evaluates semantic and granularity matches between policy-generated and teacher-generated queries. The total reward combines exact-match, format, and coverage rewards with a weight of 0.2 for the coverage component.

## Results

Evaluated on open-domain and multi-hop QA benchmarks including Natural Questions, TriviaQA, PopQA, HotpotQA, 2WikiMultiHopQA, and MuSiQue using a 2018 Wikipedia dump and E5 retriever. PROGRESS outperforms baseline approaches like Search-R1 and Zero-Search across multi-hop datasets while maintaining general QA performance. Specifically, on multi-hop QA tasks, it achieves an average improvement of 2-5% absolute accuracy. In search quality analysis on 1000 samples from 2wiki and MuSiQue, PROGRESS significantly boosts query completeness and granularity compared to Search-R1.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building multi-hop question answering systems, open-domain search agents, and knowledge-intensive retrieval-augmented generation pipelines.

## Related

- (link related pages by id as the wiki grows)
