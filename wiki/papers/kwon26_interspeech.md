---
id: kwon26_interspeech
category: speaker
labels: [streaming-real-time]
institutions: ["NAVER Cloud Corporation"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-898
pdf: https://www.isca-archive.org/interspeech_2026/kwon26_interspeech.pdf
---

# Delayed-Commitment Online Speaker Tracking for Robust Many-Speaker Diarization

*Youngki Kwon, Hee-Soo Heo, Minjae Lee, Han-Gyu Kim, Bong-Jin Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/kwon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kwon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-898)

**Category:** `speaker` · **Labels:** `streaming-real-time`

**TL;DR** — Delayed-Commitment Online Speaker Tracking (DC-OST) is a centroid-based online speaker diarization system that decouples immediate label emission from deferred speaker registration to eliminate arbitrary speaker caps and maintain consistent accuracy in many-speaker meetings. It achieves 9.53% DER on VoxConverse and 9.12% DER on VoxSRC-23 at 0.5s latency, nearly halving the error of baseline systems.

## Key contributions

- Proposes Delayed-Commitment Online Speaker Tracking (DC-OST), a centroid-based tracking module that requires no explicit speaker-count cap.
- Introduces a delayed-commitment buffering scheme (K=5) that defers centroid creation until multiple candidate embeddings accumulate, guaranteeing high centroid purity without delaying real-time output labels.
- Implements an adaptive distance threshold scaled linearly with the number of registered speakers to suppress spurious registrations that accumulate under fixed thresholds.
- Establishes extensive many-speaker evaluations (up to 21 speakers on VoxConverse and 28 on VoxSRC-23) demonstrating stable accuracy across diverse speaker counts with a consistency metric Std(∆) as low as 2.04.

## Problem

Online speaker diarization systems must assign persistent speaker identities in real time without complete session context, but scaling them to realistic many-speaker environments remains a major bottleneck. Fixed-capacity models are architecturally restricted to small speaker constants (typically four), while conventional online clustering methods suffer from progressive over-segmentation and error cascades as the speaker count grows. Furthermore, standard benchmarks like DIHARD III heavily concentrate sessions in the two-speaker bin, masking the performance degradation of prior online systems under broader, realistic speaker distributions and system voice activity detection (VAD) conditions.

## Method

The pipeline consists of a VAD module, a speaker embedding extractor operating on a 1.5s sliding window with a 0.5s step (yielding 0.5s system latency), and the DC-OST tracking module using cosine distance. DC-OST processes incoming embeddings via an adaptive distance threshold τ = min(τ_base + λ * N, τ_max), where N is the current number of registered speakers, τ_base = 0.55, λ = 0.005, and τ_max = 0.8. If an embedding falls below τ, it matches an existing speaker centroid (updated via cumulative moving average and L2 re-normalization) with labels managed via Agglomerative Hierarchical Clustering (AHC) mapping. If it exceeds τ, rather than immediately spawning a new centroid, the embedding is placed into a buffer while instantly emitting a provisional label (N + 1). Once the buffer accumulates K embeddings, a new centroid is committed using the medoid of the buffer to filter out outliers.

The training and feature extraction rely on a 256-dimensional embedding network trained on VoxCeleb1&2 using angular margin softmax. The DC-OST module operates entirely on CPU without any explicit overlap detection mechanism; overlapped speech frames are assigned to a single speaker. AHC label mapping uses a distance threshold of 0.6.

## Experimental setup

Evaluated on VoxConverse (up to 21 speakers, ~103 hours total across datasets) and VoxSRC-23 (up to 28 speakers) under realistic system VAD conditions (and additionally tested with pyannote VAD). Compared against online baselines DIART (0.5s latency) and Sortformer (1.04s latency, 4-speaker capacity), alongside offline reference winners. Metrics include Diarization Error Rate (DER) broken down into False Alarm (FA), Miss (MS), and Speaker Confusion (SC), and Jaccard Error Rate (JER) using a 0.25s collar.

## Results

The proposed system achieves a global DER of 9.53% (JER 24.77%) on VoxConverse and 9.12% (JER 25.79%) on VoxSRC-23 at 0.5s latency, substantially outperforming DIART (17.02% and 17.46% DER) and Sortformer (16.97% and 20.79% DER). The performance delta is heavily driven by Speaker Confusion reductions (SC of 5.20 vs 11.40 for DIART on VoxConverse). Per-speaker-count evaluation confirms stable performance across bins with a consistency metric Std(∆) of 2.04 on VoxConverse, whereas DIART and Sortformer reach 4.14 and 9.14, respectively. Ablation tests demonstrate that combining delayed commitment (K=5) and adaptive thresholding is essential, as individual components each drop performance compared to the joint model (e.g., VoxConverse DER drops from 12.18% base to 9.53%).

| System | Latency (s) | VoxConverse DER (%) | VoxSRC-23 DER (%) |
|---|---|---|---|
| DIART | 0.5 | 17.02 | 17.46 |
| Sortformer | 1.04 | 16.97 | 20.79 |
| Ours (pyannote VAD) | 0.5 | 10.74 | 10.63 |
| Ours (Proposed) | 0.5 | 9.53 | 9.12 |
| Challenge Winner [27] | Offline | 4.49 | 5.32 |

## Limitations

The system lacks a dedicated overlap handling mechanism, assigning overlapped speech segments to a single speaker, which directly contributes to remaining Miss (MS) errors. The scope is bounded to moderate-overlap, many-speaker settings, and has not been validated under heavy conversational overlap or noisy acoustic environments. Furthermore, the buffer size hyperparameter (K) requires tuning based on embedding domain and speaking rate.

## Why read this

Speech and ML engineers building real-time meeting transcription or streaming diarization systems should read this paper to learn how to decouple output latency from speaker registration stability using a lightweight CPU-bound centroid tracking algorithm.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time meeting transcription, streaming multi-speaker diarization, and live teleconferencing systems.

## Institutions / 機構

NAVER Cloud Corporation

## Related

- (link related pages by id as the wiki grows)
