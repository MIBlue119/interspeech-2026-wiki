---
id: kim26q_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2154
pdf: https://www.isca-archive.org/interspeech_2026/kim26q_interspeech.pdf
---

# A Reranker for Orchestrating Heterogeneous Speech and Text Retrievers

[PDF](https://www.isca-archive.org/interspeech_2026/kim26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2154)

**TL;DR** — The paper introduces STEREO, a cross-modal reranker that unifies speech and text evidence for retrieval-augmented generation, improving downstream QA Exact Match accuracy by up to 12.3% over baseline.

## Problem

Extending Retrieval-Augmented Generation (RAG) to natively support spoken knowledge bases alongside text is hindered by the lack of cross-modal relevance training data and the score imbalance caused by the modality gap. Applying modality-specific retrievers independently requires a robust cross-modal reranker, but existing listwise and cross-encoder methods are strictly unimodal and fail to evaluate heterogeneous candidate pools.

## Method

The framework first constructs a training dataset by merging candidates from specialized text (e.g., e5-mistral) and speech (HuBERT-based SpeechRAG) retrievers using Z-score normalization, then labels relevance using a foundation ALM (gpt-4o-audio-preview). STEREO adapts audio-native backbone models (Ultravox, Qwen-Audio-Chat, Qwen2-Audio) using Low-Rank Adaptation (LoRA) for autoregressive relevance scoring via Yes/No logit differences. It supports pointwise, pairwise, and listwise objectives, and handles long audio passages by splitting them into fixed-duration windows (e.g., 30s segments) aggregated via max or mean pooling.

## Results

Evaluated on a benchmark combining Spoken SQuAD and MS MARCO (~2.8K audio and 9.1K text passages), STEREO is compared against Z-score retrieval baselines. Using the pointwise objective on Qwen2-Audio yields strong performance across single and mixed domains, achieving mixed-domain Hit@1 of 0.775, MRR of 0.796, and NDCG@5 of 0.804 on Spoken SQuAD. Downstream QA Exact Match using Ultravox increases from 0.357 to 0.480 in the Spoken SQuAD mixed setting. Ablations show that Z-score normalization prevents modality collapse, Max pooling outperforms Mean pooling on speech-heavy tasks, and finer 30s audio windowing (30s×4) improves Hit@1.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building multimodal RAG systems that query both text databases and unstructured audio archives like meeting recordings or lectures.

## Limitations

The current study relies primarily on TTS-generated audio passages (Spoken SQuAD) rather than natural, spontaneous speech.

## Related

- (link related pages by id as the wiki grows)
