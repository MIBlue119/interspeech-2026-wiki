---
id: kwon26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-898
pdf: https://www.isca-archive.org/interspeech_2026/kwon26_interspeech.pdf
---

# Delayed-Commitment Online Speaker Tracking for Robust Many-Speaker Diarization

[PDF](https://www.isca-archive.org/interspeech_2026/kwon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kwon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-898)

**TL;DR** — The paper introduces Delayed-Commitment Online Speaker Tracking (DC-OST), an online speaker diarization system with no speaker-count cap that achieves 9.53% DER on VoxConverse and 9.12% DER on VoxSRC-23 at 0.5 s latency.

## Problem

Traditional online diarization systems degrade significantly as the number of speakers grows, and benchmarks like DIHARD III disproportionately test two-speaker sessions, leaving many-speaker scenarios underexplored. Fixed-capacity models are architecturally bounded by small constants (like four speakers), while standard clustering approaches suffer from over-segmentation and corrupted centroids when handling many participants in real time. This makes accurate, real-time speaker tracking difficult for realistic meeting transcription where speaker counts are high and unknown in advance.

## Method

The pipeline consists of a CRNN VAD, a 256-dimensional angular margin softmax embedding model (operating on 1.5 s windows with a 0.5 s step), and the DC-OST tracking module. DC-OST decouples real-time label emission from centroid construction by outputting provisional labels immediately while buffering candidate embeddings until $K=5$ are accumulated, selecting the medoid as the committed centroid. It employs an adaptive cosine distance threshold $\min(\tau_{\text{base}} + \lambda \cdot N, \tau_{\text{max}})$ where $\tau_{\text{base}}=0.55$, $\lambda=0.005$, and $\tau_{\text{max}}=0.8$ to scale with the number of registered speakers $N$ and suppress spurious registrations. Matched centroids are updated via cumulative moving average and L2-normalization, using AHC with a 0.6 threshold for label mapping.

## Results

Evaluated on VoxConverse and VoxSRC-23 test sets (containing up to 21 and 28 speakers respectively) using system VAD, the system achieves DERs of 9.53% and 9.12%, substantially outperforming online baselines DIART (17.02% and 17.46%) and Sortformer (16.97% and 20.79%). Speaker confusion is heavily reduced, dropping to 5.20 and 5.04. Consistency analysis across speaker-count bins demonstrates that the system maintains uniform performance with a standard deviation of deviations ($\\text{Std}(\\Delta)$) of 2.04 on VoxConverse and 2.60 on VoxSRC-23, compared to up to 9.14 for baselines. Ablations show that combining delayed commitment and adaptive thresholding yields optimal accuracy, and buffer sizes $K$ between 5 and 11 perform best.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building real-time meeting transcription, voice assistants, and multi-speaker audio stream analysis applications.

## Limitations

The system lacks a dedicated overlap handling module and attributes overlapped speech segments to a single speaker, and relies on a single-buffer assumption.

## Related

- (link related pages by id as the wiki grows)
