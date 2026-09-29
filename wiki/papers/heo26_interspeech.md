---
id: heo26_interspeech
category: speaker
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-896
pdf: https://www.isca-archive.org/interspeech_2026/heo26_interspeech.pdf
---

# Leveraging Diarization Labels for Robust Score Calibration in Target Speaker Tagging via Gaussian Mixture Modeling

*Hee-Soo Heo, Minjae Lee, Youngki Kwon, Han-Gyu Kim, Bong-Jin Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/heo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/heo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-896)

**Category:** `speaker`

**TL;DR** — The paper introduces a Gaussian mixture model (GMM) based score calibration method for target speaker tagging that aggregates session-level verification scores while remaining resilient to diarization errors. It achieves consistent improvements on TST-Bench and the ICSI Meeting Corpus, notably raising detection and identification rate (DIR) at a strict 0.5% false alarm rate from 88.79% to 93.64% using an ECAPA-TDNN extractor.

## Key contributions

- Identifies that naive session-level score aggregation (such as label-level averaging) fails under diarization under-clustering errors, causing severe performance drops at strict operating points.
- Proposes a two-component GMM score calibration method fitted per diarization cluster to separate correctly clustered segments from misclustered ones without supervision.
- Validates the method across multiple embedding architectures (ECAPA-TDNN, ResNet34, ResNet293) and datasets (TST-Bench and ICSI Meeting Corpus), demonstrating robust architecture-agnostic gains.
- Conducts comprehensive ablations on the number of GMM components, showing that C=2 provides the optimal balance between modeling capacity and reliable parameter estimation.

## Problem

Target speaker tagging (TST) integrates speaker diarization and open-set speaker identification into a unified pipeline, processing conversational audio where speaker turns vary wildly from 1 to tens of seconds. Short segments generate high-variance, unreliable verification scores, necessitating score aggregation across co-labeled segments within a session. However, naive averaging or top-K neighbor averaging strategies are fragile and break down when diarization errors (especially under-clustering) merge segments from different speakers into the same cluster. This paper addresses this vulnerability by developing a robust calibration mechanism that leverages session-level context while explicitly discounting misclustered outlier segments.

## Method

The pipeline begins with voice activity detection, sliding-window speaker embedding extraction, and spectral clustering to yield single-speaker segments and diarization labels. For each segment, similarity scores against enrolled gallery speakers are computed via cosine similarity and adaptive symmetric score normalization (AS-Norm). To calibrate these scores, the verification scores of all segments sharing the same diarization label are modeled using a Gaussian mixture model.

Specifically, a 2-component GMM is fitted to the score set of each label via the Expectation-Maximization algorithm, requiring a minimum of 5 segments per label. One component captures high scores from genuinely matching segments, while the other absorbs low scores from misclustered segments. Each segment is then assigned the mean of its most probable component based on posterior responsibility. This completely bypasses the severe distortion introduced by naive label-level averaging while smoothing out the high variance of short-segment embeddings.

## Experimental setup

Evaluated on TST-Bench (300 synthetic sessions, ~200 hours, ~204k evaluation segments) and the ICSI Meeting Corpus (~52k evaluation segments across 15 enrolled speakers). Compared against uncalibrated scoring, Top-K neighborhood averaging (K=1, 2, 3), and label-level averaging. Utilizes ECAPA-TDNN, ResNet34, and ResNet293 speaker embedding extractors trained on VoxCeleb1/2, with score normalization cohorts drawn from VoxBlink2. Metrics reported are Detection and Identification Rate (DIR) at fixed False Alarm Rates (FAR) of 0.5%, 1.0%, 5.0%, and 10.0%.

## Results

On TST-Bench using the ECAPA-TDNN extractor, the proposed GMM method achieves a DIR of 93.64% at FAR=0.5%, substantially outperforming the uncalibrated baseline (88.79%), Top-3 averaging (89.03%), and collapsing label-level averaging (81.82%). Across embedding architectures (ECAPA-TDNN, ResNet34, ResNet293) and datasets (TST-Bench and ICSI), GMM consistently secures top performance, particularly at strict operating points (FAR=0.5% and 1.0%) where score unreliability is most acute. Ablations on GMM components demonstrate that C=2 maximizes performance at strict thresholds, whereas higher components yield marginal or negative returns due to data sparsity in individual labels.

| System (ECAPA-TDNN) | DIR@FAR=0.5% | DIR@FAR=1.0% | DIR@FAR=5.0% | DIR@FAR=10% |
|---|---|---|---|---|
| Baseline | 88.79 | 93.00 | 96.80 | 97.61 |
| Top-1 | 88.95 | 93.39 | 96.98 | 97.72 |
| Top-3 | 89.03 | 94.15 | 97.21 | 97.85 |
| Label-level | 81.82 | 95.32 | 97.40 | 97.78 |
| GMM (Proposed) | 93.64 | 96.15 | 97.73 | 98.08 |

## Limitations

The method requires a minimum threshold of segments per diarization label (set to 5) to fit the GMM reliably, falling back to uncalibrated scores for overly sparse clusters. It assumes a bimodal distribution which may break down under complex multi-speaker overlap or severe channel/device variations within the same cluster. The evaluation is currently bounded to English-centric corpora (MLS-derived TST-Bench and ICSI) and does not explore online streaming TST scenarios.

## Why read this

Researchers and engineers working on multi-speaker conversational pipelines or target speaker tagging will learn how to robustly combine verification scores with session-level clustering metadata without suffering from downstream diarization error propagation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated meeting transcription, multi-speaker diarization tagging systems, courtroom recording analysis, and conversational audio indexing.

## Institutions / 機構

NAVER Cloud Corporation

## Related

- (link related pages by id as the wiki grows)
