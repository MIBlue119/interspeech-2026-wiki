---
id: wang26m_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-787
pdf: https://www.isca-archive.org/interspeech_2026/wang26m_interspeech.pdf
---

# Position-Aware Target Speaker Extraction for Long-Form Multi-Party Conversations: A Diarization-Free Framework for ASR

[PDF](https://www.isca-archive.org/interspeech_2026/wang26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-787)

**TL;DR** — PATSE is a multi-channel position-aware target speaker extraction frontend that uses speaker direction of arrival as a spatial prior to achieve diarization-free conversational ASR, outperforming baseline continuous speech separation and diarization pipelines.

## Problem

Long-form multi-party conversations feature highly imbalanced speaker activity and frequent overlapping speech, making it difficult to identify who spoke when and what. Sliding-window continuous speech separation (CSS) avoids sparse supervision but suffers from cross-window speaker inconsistency and residual crosstalk, while explicit speaker diarization pipelines face challenges in estimating temporal boundaries during overlapping speech. This creates an open problem in cleanly interacting separation and diarization architectures for robust downstream automatic speech recognition.

## Method

The framework integrates a TIGER-based separation backbone, a multi-channel feature fusion (MCFF) module using transform-average-concatenate strategies, and a DOA-guided spatial encoder. The spatial encoder computes interaural phase differences (IPDs), theoretical phase differences (TPDs) from the target direction of arrival, and phase similarity features (PSFs), which are refined via stacked self-attention. A feature-wise linear modulation (FiLM) spatial conditioner then injects these target-specific spatial features into the separation backbone. Training uses an activity-aware loss function combining a residual log-energy loss for silent regions and an SNR loss for non-silent regions.

## Results

Evaluated on the newly introduced LibriReplay-DOA dataset (456 recordings across varying overlap and angular configurations) and the real-world TEIDAN triadic dialogue corpus, PATSE consistently reduces Word Error Rate compared to DSB+Gate, FastMNMF, Sortformer+GSS, and CSS baselines. On LibriReplay-DOA, PATSE achieves an overall WER of 14.0% with pre-training and fine-tuning, compared to 21.1% for Sortformer+GSS and 32.8% for TIGER-based CSS. On the TEIDAN real-world dataset, PATSE yields superior WER and diarization error rate metrics without requiring complex explicit diarization modules.

## Code

- https://huggingface.co/datasets/real-recordings

## Applications

Speech and ML engineers building automated meeting transcription systems, multi-party conversational agents, and real-time speech recognition pipelines for complex acoustic environments.

## Limitations

The framework assumes stationary or stable speaker directions of arrival and relies on multi-microphone array spatial geometry.

## Related

- (link related pages by id as the wiki grows)
