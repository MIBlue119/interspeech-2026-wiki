---
id: wang26ba_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1691
pdf: https://www.isca-archive.org/interspeech_2026/wang26ba_interspeech.pdf
---

# Optimal Source Placement for TDoA-based Geometry Calibration of Distributed Microphone Arrays

*Xu Wang, Qintuya Si, Qingying Zhao, De Hu*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26ba_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26ba_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1691)

**TL;DR** — This paper presents an optimal source placement strategy using a mobile robot to improve the time-difference-of-arrival (TDoA) based geometry calibration of distributed microphone arrays, significantly reducing self-localization mean squared error compared to random placement. By minimizing the Cramer-Rao lower bound (CRLB) of microphone positions and capture time offsets (CTOs), the approach achieves superior geometric conditioning.

## Key contributions

- Derives the Fisher Information Matrix (FIM) and Cramér-Rao Lower Bound (CRLB) for TDoA-based geometry calibration explicitly accounting for capture time offsets (CTOs).
- Proposes a one-stage optimal source placement method that jointly optimizes all robot calibration source positions via Adam combined with simultaneous perturbation stochastic approximation (SPSA) and projection constraints.
- Develops a computationally efficient multi-stage placement solution that iteratively optimizes source positions to balance runtime and localization accuracy.
- Provides extensive simulation validation under both synthetic Gaussian noise and realistic acoustic room impulse responses (RIRs) generated via the image source method.

## Problem

Distributed microphone arrays (DMAs) require precise geometric knowledge of sensor locations to perform high-resolution tasks like beamforming and sound source localization. Traditional self-localization methods often rely on randomly placed calibration sources, which lead to suboptimal relative geometries and inflate the Cramér-Rao lower bound (CRLB). Furthermore, unknown capture time offsets (CTOs) between asynchronous nodes bias time-of-arrival measurements, complicating calibration. Addressing this requires controllable source trajectories—such as those executed by a mobile robot—to strategically place calibration nodes and minimize calibration error.

## Method

The system models a 2D or 3D distributed microphone array with $M$ nodes and a mobile robot emitting acoustic signals from $N$ positions. The TDoA measurement model incorporates microphone positions $r_i$, source positions $s_n$, sound speed $c$, and node capture time offsets $\eta_i$. The authors construct the Fisher Information Matrix (FIM) and derive the CRLB of the unknown parameter vector $x = [r_1^T, \dots, r_M^T, \delta^T]^T$ (where $\delta_i = c \cdot \eta_i$), proving that the CRLB is independent of absolute CTOs but highly dependent on the source-sensor relative geometry.

To find optimal source coordinates $\theta$, a non-convex cost function minimizing the trace of the CRLB inverse is established under box constraints defining a restricted room boundary. Because exact gradients are intractable, the method employs the Adam optimizer coupled with simultaneous perturbation stochastic approximation (SPSA) for gradient estimation, alongside a projection operator to enforce room boundary feasibility. Initial microphone position estimates obtained from preliminary random sources initialize the loop, with experiments demonstrating robustness against initial position errors.

To mitigate the linear scaling of computational complexity with respect to the source count $N$, a multi-stage solution is introduced. The first stage jointly optimizes a small subset of $K$ sources ($K=4$ for $M>2$), while subsequent stages iteratively optimize remaining source positions one by one. This decouples the $2N$-dimensional optimization problem into smaller sub-problems, significantly cutting runtime while preserving calibration performance.

## Experimental setup

Simulations were conducted in MATLAB (R2022b) on an Intel i7-12700KF CPU with 32GB RAM. Rooms were sized dynamically between $6\text{m} \times 6\text{m}$ and $10\text{m} \times 10\text{m}$ (or $8\times10$ for RIR tests), with sound speed $c = 343\text{m}/\text{s}$ and random CTOs drawn from $[0, 1000]\,\mu\text{s}$. Baselines included random source placement. Metrics evaluated include Cramér-Rao Lower Bound and Mean Squared Error for microphone positions ($	ext{MSE}_r$) and distance offsets ($	ext{MSE}_\delta$) over $L=100$ Monte Carlo trials.

## Results

The proposed one-stage optimal placement method consistently outperforms random placement across varying Gaussian noise levels ($\sigma_d$), yielding substantially lower $\text{MSE}_r$ and $\text{MSE}_\delta$. In acoustic simulations with GCC-PHAT estimated TDoAs ($RT_{60}=0.3\text{s}$, $\text{SNR}=15\text{dB}$, $M=N=10$), the multi-stage method with $K=6$ cuts the position MSE from $0.240\text{m}^2$ (random) down to $0.0645\text{m}^2$ while running in $0.867$ seconds compared to $1.59$ seconds for the full one-stage method. Ablations over varying $K$ in the multi-stage algorithm show that increasing $K$ improves localization accuracy at the expense of runtime. The method experiences graceful degradation under harsher reverberation ($RT_{60}$ up to $0.4\text{s}$) and lower SNR (down to $0\text{dB}$), maintaining an advantage over random setups except in extreme noise conditions where TDoA outliers dominate.

| Placement Methods | Running Times (s) | $\text{MSE}_r$ ($\text{m}^2$) | $\text{MSE}_\delta$ ($\text{m}^2$) |
| --- | --- | --- | --- |
| Random Placement | N/A | 0.2400 | 0.1141 |
| Multi-Stage ($K=4$) | 0.743 | 0.1128 | 0.0785 |
| Multi-Stage ($K=6$) | 0.867 | 0.0645 | 0.0373 |
| Multi-Stage ($K=8$) | 1.270 | 0.0634 | 0.0353 |
| One-Stage Method | 1.590 | 0.0489 | 0.0294 |

## Limitations

The current framework assumes ideal line-of-sight propagation and lacks explicit modeling for TDoA outliers caused by severe multipath reflections or background noise clipping. Evaluations are strictly simulation-based (both synthetic Gaussian and image-source RIR models) without real-world hardware deployment validation. Furthermore, the optimization relies on rough initial microphone position estimates, which could degrade if initial errors exceed the evaluated tolerance bounds.

## Why read this

Speech and ML engineers building distributed acoustic sensor networks or smart-home multi-device audio systems should read this paper to learn how active, trajectory-optimized calibration sources can drastically reduce geometric self-localization errors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Distributed microphone array geometry calibration, wireless acoustic sensor networks, smart speaker spatial configuration.

## Related

- (link related pages by id as the wiki grows)
