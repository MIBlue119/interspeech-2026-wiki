---
id: kim26q_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2154
pdf: https://www.isca-archive.org/interspeech_2026/kim26q_interspeech.pdf
---

# A Reranker for Orchestrating Heterogeneous Speech and Text Retrievers

*Inho Kim, Sumyeong Ahn*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2154)

**TL;DR** — STEREO is a cross-modal reranker designed to orchestrate heterogeneous speech and text retrieval databases for retrieval-augmented generation, improving downstream QA Exact Match accuracy by up to 12.3% absolute over Z-score baselines.

## Key contributions

- Constructed a novel cross-modal dataset containing explicit relevance rankings for mixed-modality (speech and text) retrieval candidates annotated using a foundation audio language model.
- Proposed a modality-wise Z-score normalization and candidate fusion strategy that resolves modality collapse and score imbalance between disparate retrievers.
- Developed STEREO, a token-based scoring reranker built on audio-native LLM backbones that can be optimized via pointwise, pairwise, and listwise objectives.
- Integrated a stochastic audio windowing and score aggregation mechanism (mean/max pooling) to handle temporal localization and sequence-length constraints in long spoken passages.

## Problem

Modern Retrieval-Augmented Generation (RAG) systems are expanding beyond text to incorporate unstructured spoken content like lectures and meetings. While ASR-free speech retrieval and joint embedding approaches exist, they either remain restricted to single-modality speech corpora or suffer from severe modality gaps and score imbalances where one modality dominates retrieval results. Furthermore, existing listwise rerankers are inherently unimodal and fail to perform cross-modal comparisons due to a complete lack of training data with explicit cross-modal relevance judgments.

## Method

The STEREO framework operates in two main phases: dataset construction and reranker training. In Phase 1, modality-specific retrievers (e.g., e5-mistral-7b-instruct for text, HuBERT-based SpeechRAG for speech) generate candidate sets $C^m$. Because raw scores operate on disparate scales, Z-score normalization aligns the distributions using mean $\mu_m$ and standard deviation $\sigma_m$ per modality. The top-k fused candidates are then annotated by a foundation ALM (gpt-4o-audio-preview / gpt-4o) using structured prompts to yield relevance scores $\mathbf{y}$.

In Phase 2, audio-native decoder-based ALMs—specifically ULTRAVOX, QWEN-AUDIO-CHAT, and QWEN2-AUDIO—are fine-tuned as student rerankers using Parameter-Efficient Fine-Tuning via LoRA ($r=16, \alpha=32$, dropout 0.05). The model computes an autoregressive relevance score $s_i$ derived from the logit difference between 'Yes' and 'No' tokens at the final sequence position. The framework supports three training objectives: Pointwise (binary cross-entropy), Pairwise (RankNet-style margin loss), and Listwise (ApproxNDCG loss).

To manage long audio files within context limits, each speech candidate is segmented into $W$ fixed-duration windows (e.g., 30s segments). During training, a single window is randomly sampled for stochastic regularization. During inference, windows are scored independently and aggregated using passage-level mean or max pooling.

## Experimental setup

Evaluated on Spoken SQuAD (text queries paired with TTS-generated audio passages) and MS MARCO (text-only web passages), combining approximately 2.8K audio and 9.1K text passages. Evaluated under single-domain and mixed-domain retrieval pools across held-out sets of ~13K SQuAD and ~8.7K MS MARCO queries. Models were trained for 3 epochs using the AdamW optimizer (learning rate $2 \times 10^{-4}$, weight decay $10^{-2}$, 10% linear warmup). Baselines include Z-score score-fusion retrieval. Metrics include Hit@1, MRR, NDCG@5, and Exact Match (EM) for downstream QA.

## Results

In mixed-modality settings, the pointwise-optimized ULTRAVOX reranker achieves a Hit@1 of 0.7630 and MRR of 0.7892 on Spoken SQuAD, significantly outperforming the Z-score retrieval baseline (Hit@1: 0.5273, MRR: 0.6408). While pointwise training offers stable cross-modal performance across all backbones, listwise objectives exhibit extreme sensitivity, leading to severe performance drops (e.g., ULTRAVOX drop in MRR of 0.257 on MS MARCO). Downstream QA evaluation using an ULTRAVOX generator demonstrates a 12.3% absolute gain in Exact Match (from 0.357 to 0.480) on Spoken SQuAD mixed-domain tasks.

| System / Condition | Hit@1 | MRR | NDCG@5 |
|---|---|---|---|
| Z-Score Baseline (Mixed Spoken SQuAD) | 0.5273 | 0.6408 | 0.6857 |
| STEREO - ULTRAVOX / Pointwise (Mixed SQuAD) | 0.7630 | 0.7892 | 0.7971 |
| STEREO - QWEN2-AUDIO / Pairwise (Mixed SQuAD) | 0.7467 | 0.7803 | 0.7905 |
| Z-Score Baseline (Mixed MS MARCO) | 0.6621 | 0.7510 | 0.7846 |
| STEREO - ULTRAVOX / Pointwise (Mixed MS MARCO) | 0.6977 | 0.7755 | 0.8032 |
| STEREO - QWEN2-AUDIO / Pairwise (Mixed MS MARCO) | 0.7164 | 0.7885 | 0.8130 |

## Limitations

The current dataset construction relies on text-to-speech (TTS) synthesized audio passages (Spoken SQuAD) rather than natural, spontaneous speech, which may not fully capture acoustic variations like disfluencies, background noise, and overlapping speech. Furthermore, evaluation is currently restricted to English QA benchmarks, leaving multilingual generalization untested.

## Why read this

Read this if you are building multimodal RAG architectures or deploying audio-text neural search systems and need a principled way to fuse and rerank heterogeneous retrieval pools without suffering from modality collapse.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multimodal Retrieval-Augmented Generation (RAG) systems, spoken document question-answering agents, and voice-interactive assistant search backends.

## Related

- (link related pages by id as the wiki grows)
