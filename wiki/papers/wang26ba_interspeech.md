---
id: wang26ba_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1691
pdf: https://www.isca-archive.org/interspeech_2026/wang26ba_interspeech.pdf
---

# Optimal Source Placement for TDoA-based Geometry Calibration of Distributed Microphone Arrays

[PDF](https://www.isca-archive.org/interspeech_2026/wang26ba_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26ba_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1691)

**TL;DR** — This paper proposes an optimal calibration source placement strategy using a mobile robot to minimize the Cramer-Rao lower bound for time-difference-of-arrival-based geometry calibration of distributed microphone arrays.

## Problem

Most existing geometry calibration methods for distributed microphone arrays rely on randomly placed calibration sources, which often leads to suboptimal self-localization accuracy due to a high Cramer-Rao lower bound (CRLB). Minimizing this bound requires strategic placement of sources, but optimal source placement for array geometry calibration remains an open problem. Solving this is crucial for improving downstream audio processing tasks like source localization and beamforming that depend on accurate spatial priors.

## Method

The authors formulate the calibration problem using time-difference-of-arrival (TDoA) measurements that explicitly account for capture time offsets across microphones. They derive the Fisher information matrix and the corresponding CRLB, treating the source coordinates as design variables subject to room boundary box constraints. To handle the non-convex optimization efficiently, they propose a one-stage solution using the Adam optimizer combined with simultaneous perturbation stochastic approximation (SPSA) for gradient estimation and a projection mechanism for boundary constraints. Furthermore, they develop a multi-stage approach that first optimizes a minimal subset of source positions and then sequentially optimizes remaining sources one by one to drastically reduce computational complexity.

## Results

Numerical simulation studies validate the effectiveness of the proposed placement methods against baseline approaches. The framework generalizes to both 2D and 3D environments. Experiments demonstrate that the multi-stage algorithm achieves competitive localization performance compared to the computationally expensive one-stage method while significantly lowering runtime and computational load. The study also confirms that using rough initial microphone position estimates instead of ground truth has a negligible impact on the optimization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio engineers and researchers deploying wireless acoustic sensor networks or smart-device distributed arrays for indoor localization, monitoring, and beamforming.

## Related

- (link related pages by id as the wiki grows)
