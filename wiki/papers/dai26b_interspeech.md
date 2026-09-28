---
id: dai26b_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-774
pdf: https://www.isca-archive.org/interspeech_2026/dai26b_interspeech.pdf
---

# Joint Learning Global-Local Speaker Classification to Enhance End-to-End Speaker Diarization and Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/dai26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dai26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-774)

**TL;DR** — GLSC-SDR introduces a hierarchical global-local speaker classification joint training paradigm for large audio-language models, improving end-to-end speaker diarization and recognition without requiring large-scale conversational datasets.

## Problem

Current end-to-end Large Audio-Language Models (LALMs) struggle with speaker discriminability in multi-speaker conversations because speaker identity modeling remains implicit and conversational training data is scarce. Without explicit speaker representation optimization, models fail to separate acoustically similar speakers and suffer from high speaker attribution errors. Standard flat speaker classification methods also easily overfit or fail to capture cross-segment global consistency.

## Method

The framework utilizes Qwen2.5-Omni-7B as the LALM backbone, fine-tuning the AudioEncoder, Aligner, and Thinker modules via LoRA (rank 8) for 30 epochs with an initial learning rate of 1e-4. It introduces a Global-Local Speaker Classification (GLSC) strategy jointly optimized with the Speaker Diarization and Recognition (SDR) task using a combined loss weighted by alpha. The GLSC data pipeline extracts single-speaker segments, filters out noisy speech via an ASR model (discarding segments with WER > 30% or > 2 insertion errors), extracts speaker embeddings via ERes2Net, and applies HDBSCAN with centroid cosine similarity > 0.75 for macro-clustering (global labels) combined with sequential encoding for micro-identification (local labels).

## Results

Evaluated on AliMeeting, AISHELL-4, and AMI-SDM benchmarks, GLSC-SDR achieves state-of-the-art end-to-end performance. On AliMeeting, it achieves a WER of 29.33, cpWER of 24.65, delta-cp of 4.17, and Speaker Count Accuracy (SCA) of 81.28. Ablation studies show that the proposed GLSC configuration outperforms Global-Only (GSC) and direct Speaker Classification (SC) methods, reducing delta-cp to 7.22 and raising SCA to 79.74. Furthermore, density-based clustering via HDBSCAN outperforms K-means, and setting an optimal cluster granularity of 200 clusters achieves the best trade-off with a cpWER of 30.32.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building unified, end-to-end multi-speaker conversational transcription systems, meeting transcription tools, and automated speaker diarization applications.

## Related

- (link related pages by id as the wiki grows)
