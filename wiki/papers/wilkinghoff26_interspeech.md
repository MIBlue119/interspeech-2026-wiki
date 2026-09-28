---
id: wilkinghoff26_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-177
pdf: https://www.isca-archive.org/interspeech_2026/wilkinghoff26_interspeech.pdf
---

# Mind the Gap: Detecting Cluster Exits for Robust Local Density-Based Score Normalization in Anomalous Sound Detection

[PDF](https://www.isca-archive.org/interspeech_2026/wilkinghoff26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wilkinghoff26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-177)

**TL;DR** — The paper introduces cluster exit detection, a lightweight mechanism that dynamically adapts neighborhood sizes for local density-based score normalization to improve anomalous sound detection under domain shifts.

## Problem

Local density-based score normalization (LDN) mitigates domain shifts in anomalous sound detection by normalizing embedding distances using local reference neighborhoods, but its performance heavily relies on a fixed neighborhood size. Expanding the neighborhood size frequently degrades accuracy because crossing cluster boundaries violates the core locality assumption of density estimation. Existing systems lack a principled way to prevent this breakdown when operating across domains with varying data densities.

## Method

The paper proposes Cluster Exit Detection (CED), a training-free algorithm that identifies distance discontinuities and adapts neighborhood sizes on a per-sample basis. CED computes ratios between sorted neighbor distances for each reference sample, averages adjacent ratios to smooth out fluctuations, and detects potential cluster exits via sharp drops or thresholding against the 4th percentile of the ratio sequence. A conservative fallback handles sparse regions by reverting to two neighbors if initial ratios fall outside expected bounds. This adaptive neighborhood size replaces the fixed parameter in standard LDN and variance-minimized LDN (VarMin) backends without requiring labels or additional training.

## Results

Evaluated across five benchmarks (DCASE 2020, 2022, 2023, 2024, and 2025 datasets) using five embedding models (Direct-ACT, OpenL3, BEATs, EAT, and Dasheng), LDN+CED consistently outperformed fixed-neighborhood LDN baselines. For instance, pairing LDN with CED on BEATs embeddings raised performance from 68.04% to 68.36% (+0.32%), and OpenL3 improved from 64.62% to 64.88% (+0.26%). When combined with variance minimization (LDN+VarMin+CED), consistent stability gains were also observed across diverse machine types and domain shift conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Machine condition monitoring engineers and researchers building anomalous sound detection systems for industrial settings with severe domain shifts.

## Limitations

The method relies on empirically set conservative fallback thresholds and percentile cutoffs to govern sparse regions and truncation points.

## Related

- (link related pages by id as the wiki grows)
