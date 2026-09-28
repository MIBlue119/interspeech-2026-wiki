---
id: kachare26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/kachare26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/kachare26_interspeech.pdf
---

# ClinAware: Speech Enhancement Needs Clinical Awareness

[PDF](https://www.isca-archive.org/interspeech_2026/kachare26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kachare26_interspeech.html)

**TL;DR** — ClinAware is an interactive demonstration system that evaluates how various speech enhancement techniques inadvertently alter neurological voice biomarkers and downstream health risk scores.

## Problem

Speech enhancement is frequently applied as a preprocessing step in telehealth and home-based neurological monitoring, but its impact on clinically relevant voice biomarkers remains largely unexamined. Enhancement algorithms optimized purely for human perceptual quality or ASR performance can distort critical temporal, prosodic, and spectral features, potentially leading to misinterpretations in automated health assessments.

## Method

The system features a FastAPI backend and a browser-based frontend that runs offline on a standard laptop to process audio through three distinct enhancement strategies: a conservative spectral-gating baseline, an aggressive smoothing approach, and a pretrained neural model (DEMUCS). It extracts a seven-feature interpretable biomarker vector using Librosa—encompassing pause ratio, pitch mean, pitch standard deviation, spectral centroid standard deviation, jitter, shimmer, and speaking rate—and computes a lightweight, transparent risk score via normalized weighted sums. Users can upload audio, simulate noisy environments, listen to audio outputs, inspect spectrograms, and observe real-time feature drift and risk score shifts.

## Results

Qualitative evaluation across speech recordings demonstrates that different enhancement philosophies yield drastically divergent biomarker shifts despite achieving comparable perceptual improvements. Specifically, the spectral-gating baseline preserves spectro-temporal structures with minor risk changes, the aggressive smoothing method flattens fine-scale pitch variability while inducing spectral instability, and DEMUCS significantly amplifies pitch dynamics and temporal energy variations, driving a large spike in the calculated risk indicator. No external large-scale benchmark datasets or numerical error rates are evaluated, as the work is presented as an interactive proof-of-concept system.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, telehealth developers, and health researchers building robust, trustworthy speech processing pipelines for mobile and home-based neurological monitoring.

## Limitations

The risk score is a simplified heuristic sensitivity probe rather than a clinically validated diagnostic tool.

## Related

- (link related pages by id as the wiki grows)
