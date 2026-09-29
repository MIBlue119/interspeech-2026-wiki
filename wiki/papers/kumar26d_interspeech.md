---
id: kumar26d_interspeech
category: speech-llm-dialogue
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2006
pdf: https://www.isca-archive.org/interspeech_2026/kumar26d_interspeech.pdf
---

# Search-GRT: Guided Retrieval Training of Search Agents to Optimize for Complex Question Answering

*Aounon Kumar, Sudipta Paul, Vivek Kulkarni, Vijay Srinivasan, Srinivas Chappidi*

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2006)

**Category:** `speech-llm-dialogue`

**TL;DR** — Guided Retrieval Training (GRT) restricts the retrieval corpus during reinforcement learning using ground truth information, mitigating sparse reward issues and improving search agents' multi-hop question answering performance by over 40% compared to Search-R1.

## Key contributions

- Introduces Guided Retrieval Training (GRT), which restricts retrieval during RL training to a curated subset of documents derived from ground truth data.
- Achieves an average exact match score of 0.375 across all QA tasks, outperforming baseline methods and yielding over 40% improvement specifically on multi-hop question-answering (MHQA) tasks.
- Demonstrates improved training efficiency (fewer steps to achieve better performance) and robust generalization to the full unrestricted Wikipedia 2018 corpus at inference time.

## Problem

LLMs acting as search agents often fail in multi-hop question-answering (MHQA) tasks because they must decompose queries, retrieve info, and synthesize answers sequentially. Untrained LLMs produce poor initial subqueries, pulling irrelevant information that leads to cascading failures and minimal or zero rewards during reinforcement learning. This sparse reward landscape severely hinders the agent's ability to learn effective query formulation and reasoning.

## Method

The base model is a 3B parameter Qwen-2.5 language model trained via Proximal Policy Optimization (PPO) for 600 steps using an interleaved format of reasoning (<think>), search queries (<search>), retrieved information (<information>), and final answers (<answer>).

During training, GRT prevents sparse rewards by restricting the search engine's retrieval corpus to a small subset of documents (ResCorp) that are most similar to the ground truth. Specifically, cosine similarity using E5 text embeddings is computed between all Wikipedia 2018 documents and the ground truth items, retaining the top-kappa ($\kappa=300$) documents. For HotpotQA, ground truth passages are used directly; for Natural Questions, queries and ground truth answers are concatenated to form the target text.

The RL objective maximizes expected rewards (exact match reward of 1 for correct answers, 0 otherwise) combined with a KL divergence penalty against a reference policy model, controlled by hyperparameter beta.

## Experimental setup

Evaluated on general QA datasets (Natural Questions, TriviaQA, PopQA) and multi-hop QA datasets (HotpotQA, 2WikiMultiHopQA, Musique, Bamboogle) with dataset sizes ranging from 125 (Bamboogle test) to nearly 90,000 training samples. Compared against direct inference, CoT, IRCoT, Search-o1, RAG, SFT, R1-base, R1-instruct, Rejection Sampling, and Search-R1. The primary evaluation metric is Exact Match (EM). Implemented using Qwen-2.5-3B, PPO for 600 steps, a dense retriever with E5 embeddings, and an unrestricted 2018 Wikipedia corpus at inference.

## Results

Search-GRT achieves an average Exact Match score of 0.375 across all QA tasks, compared to 0.318 for the strongest baseline, Search-R1. On multi-hop QA specifically, GRT reaches an average of 0.297 versus 0.206 for Search-R1, representing over a 40% relative performance gain. GRT also consistently improves both retrieval accuracy (finding ground truth docs more frequently) and answer synthesis accuracy given correct retrieval throughout training.

| Systems | NQ | TriviaQA | PopQA | HotpotQA | 2wiki | Musique | Bamboogle | MHQA Avg | All QA Avg |
|---|---|---|---|---|---|---|---|---|---|
| IRCoT | 0.111 | 0.312 | 0.200 | 0.164 | 0.171 | 0.067 | 0.240 | 0.161 | 0.181 |
| Search-o1 | 0.238 | 0.472 | 0.262 | 0.221 | 0.218 | 0.054 | 0.320 | 0.203 | 0.255 |
| RAG | 0.348 | 0.544 | 0.387 | 0.255 | 0.226 | 0.047 | 0.080 | 0.152 | 0.270 |
| Search-R1 | 0.392 | 0.575 | 0.440 | 0.293 | 0.253 | 0.082 | 0.194 | 0.206 | 0.318 |
| Search-GRT (Ours) | 0.435 | 0.589 | 0.412 | 0.371 | 0.391 | 0.142 | 0.282 | 0.297 | 0.375 |

## Limitations

The method relies heavily on the availability of explicit ground truth passages or answer contexts to construct the restricted training corpus, limiting application to datasets lacking such annotations. The evaluation is restricted to English-language Wikipedia QA tasks, leaving broader domains and alternative modalities unexplored.

## Why read this

Researchers building reinforcement learning agents for complex information retrieval and multi-hop reasoning will find GRT a practical blueprint for overcoming initial reward sparsity and catastrophic query drift.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated educational tools, advanced enterprise customer support search engines, and complex medical or technical research assistants.

## Institutions / 機構

Samsung Electronics

## Related

- (link related pages by id as the wiki grows)
