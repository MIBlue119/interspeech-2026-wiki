---
id: wilkinghoff26_interspeech
category: audio-understanding
institutions: ["Aalborg University", "Pioneer Centre for Artificial Intelligence", "Mitsubishi Electric Research Laboratories"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-177
pdf: https://www.isca-archive.org/interspeech_2026/wilkinghoff26_interspeech.pdf
---

# Mind the Gap: Detecting Cluster Exits for Robust Local Density-Based Score Normalization in Anomalous Sound Detection

*Kevin Wilkinghoff, Gordon Wichern, Jonathan Le Roux, Zheng-Hua Tan*

[PDF](https://www.isca-archive.org/interspeech_2026/wilkinghoff26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wilkinghoff26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-177)

**Category:** `audio-understanding`

**TL;DR** — The paper identifies that local density-based score normalization (LDN) in anomalous sound detection degrades with large neighborhoods because expansion crosses cluster boundaries, and introduces cluster exit detection (CED) to adaptively select neighborhood sizes.
CED improves anomaly detection performance across five datasets and embedding models without requiring training or labels.

## Key contributions

- Identifies that performance degradation in LDN with large neighborhood sizes ($K$) is caused by structural locality violations when expanding across cluster boundaries in embedding spaces.
- Proposes Cluster Exit Detection (CED), a lightweight, training-free, label-free algorithm that detects distance jumps to determine per-sample adaptive neighborhood boundaries.
- Incorporates a conservative fallback mechanism into CED for sparse regions to avoid unreliable truncation.
- Demonstrates consistent performance gains and stabilization across five diverse embedding models and four DCASE domain-generalization benchmarks.

## Problem

Semi-supervised anomalous sound detection systems often encounter severe domain shifts between source training conditions and target deployment environments. While local density-based score normalization (LDN) helps mitigate these shifts by normalizing distances using local neighborhood statistics, its performance collapses if the neighborhood size $K$ is set beyond one or two neighbors. Prior techniques like variance minimization (VarMin) only partially mitigate this instability, leaving an unresolved sensitivity to neighborhood scale. This sensitivity stems from assuming uniform local density, which is violated when expanding neighborhoods cross cluster boundaries, corrupting local density estimates and rendering global detection thresholds unreliable.

## Method

The CED framework operates entirely in the embedding space using pre-computed distances between test samples and reference normal training samples ($X_{ref}$). For a given reference sample $y$, its $K$ nearest neighbors are ordered by increasing distance to compute sequential distance ratios $r_k(y) = d(y, y_k) / d(y, y_{k+1})$. For $K > 2$, adjacent ratios are averaged to yield smoothed ratios $\tilde{r}_k(y)$ that minimize sensitivity to isolated fluctuations. Cluster exits are detected by locating the minimum ratio value or by testing whether ratios drop below a conservative 4th percentile adaptive threshold $Q_{0.04}(\tilde{\mathbf{r}}(y))$.

If a significant drop is detected, neighborhood expansion is truncated at the earliest candidate index $k_{ext}(y)$; otherwise, it defaults to $K-2$. To handle sparse regions, if the minimum ratio across the sequence falls below a strict threshold, the algorithm uses a safe fallback of exactly two neighbors. The resulting adaptive neighborhood size $\hat{K}(y)$ is substituted directly into standard LDN and variance-minimized LDN (VarMin) formulations, scaling the anomaly scores without adding inference-time or training overhead.

## Experimental setup

Evaluated across five publicly available machine condition monitoring datasets: DCASE2020 (single domain, MIMII/ToyADMOS), DCASE2022, DCASE2023, DCASE2024, and DCASE2025 (all featuring domain generalization setups with 990 source and 10 target normal training samples per machine type). Evaluated using five embedding models: task-specific Direct-ACT (dimension 32) and pre-trained openL3 (dimension 512, $\gamma=8$), BEATs ($\gamma=16$), EAT ($\gamma=1$), and Dasheng ($\gamma=20$). Metrics reported are the harmonic mean of domain-specific AUCs and domain-independent partial AUC ($p=0.1$).

## Results

Equipping baseline LDN with CED shifts optimal neighborhood sizes from $K \in \{1, 2\}$ to a robust plateau at $K \in \{16, 32, 64\}$ while preventing performance degradation at large $K$. On domain generalization benchmarks (DCASE2022–2025), LDN+CED improves average performance across embedding models by up to $+0.32\%$ on DCASE2023, with peak single-split gains reaching $+1.39\%$. When combined with VarMin, CED yields smaller incremental gains (up to $+0.19\%$ average on DCASE2023 and $+1.12\%$ peak) because VarMin already absorbs some density variance. Predictably, CED yields no systematic improvements on DCASE2020, which lacks domain shifts and heterogeneous sub-cluster structures.

| System | Direct-ACT | openL3 | BEATs | EAT | Dasheng | Average |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| LDN ($K=2$) | 67.79% | 64.62% | 68.04% | 64.99% | 64.07% | 65.90% |
| LDN+CED ($K=64$) | 67.91% | 64.88% | 68.36% | 65.14% | 64.18% | 66.09% |
| LDN+VarMin ($K=2$) | 69.25% | 65.56% | 68.95% | 65.88% | 64.81% | 66.89% |
| LDN+VarMin+CED ($K=64$) | 69.24% | 65.75% | 69.20% | 65.80% | 64.86% | 66.96% |

## Limitations

The approach assumes that reference embeddings form reasonably distinct clusters where distance jumps cleanly delineate boundaries; in extremely uniform or dense continuous manifolds, jump detection becomes noisy. The evaluation is restricted to machine condition monitoring tasks under DCASE domain generalization challenges, leaving open how well cluster exit detection transfers to speech tasks like speaker verification or keyword spotting. Hyperparameters such as the percentile threshold ($Q_{0.04}$) and smoothing configurations are tuned heuristically rather than learned adaptively per dataset.

## Why read this

Researchers and practitioners working on embedding-based anomaly detection or domain generalization will learn why standard score normalization scales poorly with neighborhood size and how simple geometry-based adjustments can stabilize performance without incurring training costs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Unsupervised industrial machine condition monitoring, acoustic anomaly detection, and robust out-of-domain audio verification systems.

## Institutions / 機構

Aalborg University, Pioneer Centre for Artificial Intelligence, Mitsubishi Electric Research Laboratories

## Related

- [UD-ASD: A Unified Diffusion Model for Anomalous Sound Detection](gao26c_interspeech.md) — same problem · relatedness 2.2/3
- [GRIDS: Dimensionality-Aware Anomaly Detection in Learned Representations of Self-Supervised Speech Models](arcosholzinger26_interspeech.md) — same problem · relatedness 2.0/3
- [Toward Multimodal Industrial Fault Analysis: A Single-Speed Chain Conveyor Dataset with Audio and Vibration Signals](chen26f_interspeech.md) — complementary · relatedness 1.7/3
- [MultiLinguahah : A New Unsupervised Multilingual Acoustic Laughter Segmentation Method](callejas26_interspeech.md) — shared technique · relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
