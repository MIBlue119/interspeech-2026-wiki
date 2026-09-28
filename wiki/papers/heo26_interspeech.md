---
id: heo26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-896
pdf: https://www.isca-archive.org/interspeech_2026/heo26_interspeech.pdf
---

# Leveraging Diarization Labels for Robust Score Calibration in Target Speaker Tagging via Gaussian Mixture Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/heo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/heo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-896)

**TL;DR** — A Gaussian mixture model based score calibration method is proposed for target speaker tagging, improving detection and identification rates by robustly aggregating session-level verification scores while handling diarization errors.

## Problem

Target speaker tagging combines speaker diarization and open-set identification, but short conversational turns lead to high variance and unreliable segment-level verification scores. While aggregating scores across co-labeled segments from the same session can mitigate this, naive averaging is highly fragile and gets distorted by under-clustering diarization errors that mix multiple speakers into a single label.

## Method

The method fits a two-component Gaussian mixture model (GMM) using the Expectation-Maximization algorithm to the distribution of verification scores within each diarization cluster. One component captures correctly clustered segments while the other absorbs misclustered ones, separating genuine target scores from erroneous ones without supervision. Each segment's verification score is then calibrated by replacing it with the mean of its most probable mixture component. The framework requires a minimum of 5 segments per label for GMM fitting and is evaluated with embedding extractors including ECAPA-TDNN, ResNet34, and ResNet293 trained on VoxCeleb.

## Results

Evaluated on TST-Bench (over 204k segments across 300 sessions) and the ICSI Meeting Corpus (52k segments from 15 speakers), the GMM calibration consistently outperforms uncalibrated scoring and conventional baselines like label-level averaging and top-K nearest-neighbor averaging across multiple false alarm rate operating points and embedding architectures. The approach effectively prevents score distortion caused by under-clustering errors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building multi-speaker meeting transcription, diarization, and automated indexing systems for conversational audio.

## Limitations

The GMM fitting requires a minimum of 5 segments per diarization label; labels with fewer segments fall back to uncalibrated scores.

## Related

- (link related pages by id as the wiki grows)
