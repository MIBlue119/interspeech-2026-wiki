---
id: ryu26b_interspeech
category: speech-llm-dialogue
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3011
pdf: https://www.isca-archive.org/interspeech_2026/ryu26b_interspeech.pdf
---

# Segment-level Tree Search for Long Meeting Document Summarization

*Sangwon Ryu, Heejin Do, Jun Seo, Daehui Kim, Yunsu Kim, Gary Geunbae Lee, Jungseul Ok*

[PDF](https://www.isca-archive.org/interspeech_2026/ryu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ryu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3011)

**Category:** `speech-llm-dialogue` · **Labels:** `generative-model`

**TL;DR** — The paper introduces S3, a training-free framework that uses Monte Carlo Tree Search (MCTS) over segment-level summary candidates to solve long meeting document summarization. Using a 7B model, S3 achieves performance comparable to a much larger 72B model and significantly outperforms standard single-pass baselines.

## Key contributions

- Proposes segment-level summarization via Monte Carlo Tree Search (S3), a training-free framework that composes segment-level summary candidates to capture globally dispersed meeting details without cumulative error propagation.
- Implements an offline search tree construction where each segment corresponds to a tree depth, utilizing self-reward-guided MCTS to evaluate and select optimal summary combinations.
- Introduces a post-search refinement stage that removes redundant discourse markers and generic initial phrases, improving global structural coherence across concatenated segment summaries.
- Demonstrates that S3 with a 7B model surpasses 72B single-pass summary-level baselines on the QMSum benchmark while producing length-appropriate, higher-coverage summaries.

## Problem

Long meeting documents feature complex conversational structures and decisions sparsely distributed across unstructured transcripts, making them difficult to summarize effectively. Existing multi-stage pipelines suffer from cumulative error propagation due to a lack of intermediate validation, while short reference summaries in standard datasets implicitly penalize comprehensive outputs. Although modern large language models boast context windows exceeding 100K tokens, naive single-pass processing fails to handle globally dispersed information and degrades significantly as input length grows.

## Method

The S3 framework operates in three main stages: segment-level sampling, MCTS search, and refinement. First, long meeting documents are partitioned into overlapping segments using a sliding window with a window size of $w=2048$ tokens and a stride of $r=256$ tokens. For each segment $t_i$, $k=5$ candidate summaries are generated offline via nucleus sampling ($p=0.9$, temperature 1.1) or diverse beam search, ensuring focused context handling and mitigating coreference issues near boundaries.

Next, these candidates are structured into a search tree where each depth level corresponds to a document segment, and available actions are the pre-generated candidates. S3 uses UCT-based MCTS to select paths from root to leaf, where each complete path represents a full draft summary formed by concatenating segment summaries. A self-reward $z$ is computed by evaluating the draft summary across coherence, consistency, fluency, and relevance using an LLM on a 1-5 Likert scale, linearly normalized to $[-1, 1]$. This reward is backpropagated to update state-action visit counts and Q-values over 30 simulations.

Finally, the best path is traversed to extract the optimal segment-level combinations, which are concatenated into a draft summary. A post-processing refinement step then eliminates redundant high-level phrases and discourse markers introduced by individual segment summaries, yielding a coherent final output.

## Experimental setup

Experiments are evaluated on the QMSum dataset, incorporating multi-domain transcripts from ICSI, AMI, and parliamentary proceedings. The authors compare S3 against zero-shot summary-level models (Base), refinement-added variants (Base + Refine), and a greedy single-candidate segment-level baseline (S2) across backbone architectures including Qwen-2.5-7B-Instruct, Qwen-2.5-72B-Instruct, and Gemma-3-12b-it. Performance is measured primarily via G-Eval across coherence, consistency, fluency, and relevance dimensions, alongside ROUGE-1 for lexical overlap.

## Results

S3-7B achieves an average G-Eval score of 4.56, outperforming the Qwen2.5-7B base model (4.37) and outperforming the massive Qwen2.5-72B summary-level baseline (4.54). Similarly, S3-12B with Gemma-3 achieves 4.74 compared to its base variant at 4.43. In length bin analyses, S3's relevance score remains robust as inputs increase beyond 10K tokens, whereas base models degrade sharply and compress summaries to under 1% of source length. S3 generates summaries averaging 4.66% of document length, providing higher informational coverage than reference summaries (0.62%) and summary-level outputs (1.56%).

Ablations on decoding strategies show that nucleus sampling outperforms diverse beam search (DBS) for S3 (average G-Eval of 4.56 vs 4.51), as stochastic sampling induces higher structural diversity in the candidate search space.

| Model | Granularity | Params | Coherence | Consistency | Fluency | Relevance | Average |
|---|---|---|---|---|---|---|---|
| Qwen2.5-Instruct | Summary-level | 7B | 4.01 | 4.22 | 4.90 | 4.36 | 4.37 |
| w/ Refine | Summary-level | 7B | 4.00 | 4.18 | 4.93 | 4.34 | 4.36 |
| w/ S2 | Segment-level | 7B | 4.10 | 4.33 | 4.91 | 4.55 | 4.47 |
| w/ **S3** | Segment-level | 7B | **4.22** | **4.43** | **4.94** | **4.65** | **4.56** |
| Qwen2.5-Instruct | Summary-level | 72B | 4.19 | 4.43 | 4.95 | 4.58 | 4.54 |

## Limitations

The framework relies heavily on offline candidate generation and multiple MCTS simulations, introducing high inference-time compute overhead compared to single-pass generation. The self-evaluation reward model depends entirely on LLM-as-a-judge scoring, which can suffer from internal biases or judge inconsistencies. Furthermore, evaluation is primarily constrained to the QMSum dataset, and the method's scaling properties on extremely long meetings exceeding tens of thousands of tokens without sliding windows remain bounded by segment division strategies.

## Why read this

Researchers and engineers dealing with long-form conversational text or meeting transcription pipelines should read this to understand how structured search and segment-level composition can outperform brute-force long-context LLM scaling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated meeting minutes generation, corporate governance transcription summaries, and long conversational document analysis.

## Institutions / 機構

POSTECH, ETH Zurich, LILT

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Korea Creative Content Agency, Ministry of Science and ICT, Ministry of Culture, Sports and Tourism

## Related

- (link related pages by id as the wiki grows)
