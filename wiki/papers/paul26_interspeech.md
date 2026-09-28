---
id: paul26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2760
pdf: https://www.isca-archive.org/interspeech_2026/paul26_interspeech.pdf
---

# PROGRESS: Coverage-guided RL to Train Search-augmented LLM Agent

*Sudipta Paul, Vijay Srinivasan, Vivek Kulkarni, Aounon Kumar, Yashas Malur Saidutta, Wenbo Li, Srinivas Chappidi*

[PDF](https://www.isca-archive.org/interspeech_2026/paul26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/paul26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2760)

**TL;DR** — PROGRESS is a teacher-guided reinforcement learning framework that trains search-augmented LLM agents using a trajectory-level coverage reward, achieving a 2-5% absolute exact match improvement across multi-hop question-answering benchmarks.

## Key contributions

- Introduces PROGRESS, a teacher-guided training framework that structures supervision over search behaviors in RL-trained search-augmented LLMs.
- Proposes a trajectory-level coverage reward based on the F1-score overlap between policy-generated search queries and teacher-generated essential queries, evaluated via an LLM judge.
- Demonstrates 2-5% absolute accuracy improvements on multi-hop QA datasets (HotpotQA, 2Wiki, MuSiQue) compared to baseline methods without requiring dense step-level manual annotations.

## Problem

Existing search-augmented LLM agents optimized with reinforcement learning primarily rely on outcome-level rewards (like exact-match accuracy), which fail to provide direct supervision over intermediate search behaviors. This leads to inefficient retrieval, composite search queries, and over-reliance on memorized reasoning patterns, especially in smaller language models. Consequently, prior methods struggle with decomposing complex multi-hop queries properly and ensuring complete coverage over essential latent information needs.

## Method

The framework models the search-augmented LLM agent as a policy model interacting with an external search engine environment, where generations are interleaved with special tokens like <search>, </search>, <information>, </information>, and <think>. The training objective maximizes expected trajectory-level rewards under a PPO formulation with KL-regularization against a frozen reference policy.

To address the limitations of outcome-only rewards, PROGRESS introduces a trajectory-level coverage reward. For each input question, a frozen teacher model (Qwen2.5-72B-Instruct) generates an essential set of anchor search queries representing latent information needs. During rollouts, the policy model generates its own search queries, which are matched against the teacher anchors by an LLM judge based on semantic similarity and granularity. A coverage F1-score is computed using precision (penalizing redundant or irrelevant queries) and recall (measuring coverage of sub-questions).

The final reward combines exact-match task performance, format reward, and the coverage reward scaled by a hyperparameter lambda_cov. The policy is optimized using PPO, encouraging the agent to produce atomic, granular, and comprehensive multi-hop query decompositions without manual step-by-step supervision.

## Experimental setup

Evaluated on open-domain factual reasoning datasets (Natural Questions, TriviaQA, PopQA) and multi-hop reasoning datasets (HotpotQA, 2WikiMultiHopQA, MuSiQue) using the 2018 Wikipedia dump and E5 retriever. The primary policy model is Qwen2.5-3B Base (with additional generalizability tests on Qwen2.5-1.5B), trained for 600 steps on 8 A100 GPUs using Qwen2.5-72B-Instruct as both the teacher generator and LLM judge, with lambda_cov set to 0.2.

## Results

On multi-hop QA tasks, PROGRESS achieves an average score of 30.19% compared to 28.64% for Search-R1 (EM, FR) and 27.13% for Zero-search, with notable gains on MuSiQue (16.01% vs 13.65%). When trained exclusively on multi-hop data (HotpotQA), PROGRESS reaches 31.28% average multi-hop accuracy, beating Search-R1's 26.96% and securing a 5% absolute gain on MuSiQue. Retrieval accuracy also increases significantly, rising to an average of 44.96% compared to Search-R1's 38.66%. Ablations and query quality analyses confirm substantial improvements in both query completeness (e.g., 40.63 vs 29.77 on 2Wiki) and granularity.

| Method | Trainset | HotpotQA | 2Wiki | MuSiQue | Multi-hop Average |
|---|---|---|---|---|---|
| Search-R1 (EM) | NQ, HotpotQA | 28.40 | 27.30 | 4.90 | 20.20 |
| Zero-search | NQ, HotpotQA | 33.80 | 34.60 | 13.00 | 27.13 |
| Search-R1 (EM, FR) | NQ, HotpotQA | 36.04 | 36.23 | 13.65 | 28.64 |
| PROGRESS | NQ, HotpotQA | 36.45 | 38.12 | 16.01 | 30.19 |
| PROGRESS (Hotpot-only) | HotpotQA | 36.33 | 38.95 | 18.57 | 31.28 |

## Limitations

The framework relies on a significantly larger, frozen teacher model and an LLM judge to evaluate semantic matching and compute coverage rewards, adding compute overhead during data generation and evaluation. Qualitative examples reveal that the model still occasionally falls back on using complex, un-decomposed queries directly for search. Evaluation is restricted to English-language question-answering benchmarks and Wikipedia-based retrieval setups.

## Why read this

Speech and ML researchers building agentic LLMs or tool-use architectures should read this to see how weak supervision from a larger teacher model can shape intermediate reasoning and tool invocation without expensive manual step-by-step annotations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving multi-hop open-domain question answering, complex information retrieval agents, and search-augmented conversational assistants.

## Related

- (link related pages by id as the wiki grows)
