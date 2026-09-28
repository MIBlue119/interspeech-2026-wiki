---
id: wen26c_interspeech
category: speaker-diarization
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2156
pdf: https://www.isca-archive.org/interspeech_2026/wen26c_interspeech.pdf
---

# End-Fire Degradation-Robust DOA Estimation for Compact Linear Microphone Arrays

*Zheng Wen, Huayang Wang, Zhongxin Bai, Xin Guo, Gongping Huang, Qiqi Tong, Yaling Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/wen26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wen26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2156)

**TL;DR** — This paper demonstrates that end-fire localization degradation in compact linear microphone arrays stems from an ill-conditioned TDOA-to-azimuth mapping, and proposes two training-free, reliability-aware methods—W-SRP-PHAT and GCC-WLS—that reduce end-fire root-mean-square error from 4.83° to 3.18° at a 1 m source distance.

## Key contributions

- Derived a theoretical Fisher information and CRLB analysis proving that end-fire degradation arises from severe error amplification caused by the ill-conditioned inverse mapping of time-difference-of-arrival (TDOA) to azimuth.
- Proposed a CRLB-driven inverse-variance weighting strategy (W-SRP-PHAT) embedded with a coherence-based confidence factor to optimally suppress variance-driven peak flattening in end-fire regions.
- Introduced a TDOA refinement and cosine-domain weighted least squares fusion scheme (GCC-WLS) that avoids nonlinearly amplified angular errors by fusing estimates linearly before inversion.
- Collected and released a new real-world reverberant dataset using a compact 4-mic uniform linear array to benchmark end-fire DOA estimation performance.

## Problem

Direction-of-arrival (DOA) estimation using compact uniform linear arrays (ULAs) consistently suffers from degraded accuracy, severe bias, and broadened spatial spectrum main lobes when sources approach the end-fire axis ($0^\circ$ or $180^\circ$). Prior literature treated this primarily as an empirical observation rather than a fundamental geometric constraint. Conventional spatial processors like SRP-PHAT, MVDR, and MUSIC fail in these regions because compact apertures combined with indoor noise and reverberation cause small TDOA perturbations to map into massive angular errors.

## Method

The paper investigates a compact ULA setup and models propagation delays under a far-field plane-wave assumption. Through sensitivity analysis, the authors show that the derivative of azimuth with respect to TDOA approaches infinity as $\sin\theta \to 0$, rendering the inversion highly ill-conditioned. To counter this, two complementary strategies are designed within a reliability-aware phase transform framework without modifying array geometry.

First, the weighting-enhanced SRP approach (W-SRP-PHAT) constructs wideband SRP scores by incorporating a CRLB-inspired inverse-variance weighting structure $w_p \propto d_p^2$, where $d_p$ is the inter-microphone distance. This is modulated by a coherence-based confidence factor derived from auto- and cross-spectra to suppress spurious local maxima and emphasize informative high-resolution frequency components and baselines. The optimal hyperparameters are empirically and theoretically set to $\alpha=2$ and $\eta=2$.

Second, the GCC-WLS method avoids direct angle averaging by performing least-squares fusion in the linear cosine domain ($u = \cos\theta$) prior to applying the inverse cosine mapping. TDOA values are initially extracted via GCC-PHAT cross-correlation over a physically constrained delay search space with 16$\times$ oversampling and parabolic interpolation. By keeping perturbations additive and linear during aggregation, the method avoids repeated error amplification, applying the ill-conditioned arccos operation only once after fusion.

## Experimental setup

Experiments are conducted in a $5\times 4\times 3$ m room using a 4-microphone compact ULA with an inter-element spacing of 3.5 cm (total aperture 10.5 cm), positioned 1.5 m high and 0.2 m from a wall. A loudspeaker broadcasts clean speech across azimuths $20^\circ$–$160^\circ$ in $10^\circ$ increments at distances of 1 m and 2 m, generating roughly 100–200 one-second speech segments per condition under 10–20 dB SNR and typical home reverberation. Baselines include standard training-free zero-shot methods SRP-PHAT and SRP-MVDR, evaluated using overall RMSE ($E_{\text{all}}$), end-fire RMSE ($E_{\text{EF}}$ for $20^\circ$–$40^\circ$ and $140^\circ$–$160^\circ$), Cauchy soft-accuracy (S-ACC@$5^\circ$), and degraded span width.

## Results

At a 1 m source distance, the proposed GCC-WLS achieves an overall RMSE of $2.43^\circ$ and an end-fire RMSE ($E_{\text{EF}}$) of $3.14^\circ$, substantially outperforming baseline SRP-PHAT ($3.31^\circ$ overall, $4.83^\circ$ end-fire) and SRP-MVDR ($5.31^\circ$ overall, $9.01^\circ$ end-fire). W-SRP-PHAT performs comparably with an overall RMSE of $2.45^\circ$ and end-fire RMSE of $3.18^\circ$, while both proposed methods achieve an end-fire soft-accuracy (S-ACC$_{\text{EF}}$) of 0.82 (compared to 0.65 for SRP-PHAT and 0.51 for SRP-MVDR) and entirely eliminate the degraded span down to $0^\circ$ (from $30^\circ$ in baselines).

At a more challenging 2 m distance, W-SRP-PHAT leads with an overall RMSE of $3.71^\circ$ and an end-fire RMSE of $4.46^\circ$ (vs. SRP-PHAT's $5.38^\circ$ and $7.71^\circ$), maintaining a $0^\circ$ degraded span whereas baseline degradation spans widen to $40^\circ$–$50^\circ$. The methods do not win in terms of added computational complexity over basic frame-level argmax search due to oversampling and cosine-domain fusion overhead, though they remain entirely training-free.

| System/Condition | $E_{\text{all}}$ ($^\circ$) | $E_{\text{EF}}$ ($^\circ$) | S-ACC$_{\text{EF}}$ | Deg. Span ($^\circ$) |
|---|---|---|---|---|
| **1m: SRP-MVDR** | 5.31 | 9.01 | 0.51 | 30 |
| **1m: SRP-PHAT** | 3.31 | 4.83 | 0.65 | 30 |
| **1m: W-SRP-PHAT** | 2.45 | 3.18 | 0.82 | 0 |
| **1m: GCC-WLS** | 2.43 | 3.14 | 0.82 | 0 |
| **2m: SRP-PHAT** | 5.38 | 7.71 | 0.47 | 40 |
| **2m: W-SRP-PHAT** | 3.71 | 4.46 | 0.70 | 0 |

## Limitations

The evaluation is restricted to a single 4-element linear array configuration with a fixed 3.5 cm spacing in a single indoor reverberant environment. The analysis assumes a single far-field sound source, leaving multi-source scenarios and near-field spherical wavefront models unaddressed. Furthermore, performance is only tested on horizontal azimuths from $20^\circ$ to $160^\circ$, excluding extreme axial end-fire angles ($0^\circ$ and $180^\circ$) where division-by-zero singularities occur in the mathematical formulation.

## Why read this

Audio engineers and researchers working on resource-constrained edge hardware will learn how to stabilize traditional, zero-training spatial processors without resorting to heavy neural networks. It provides rigorous theoretical framing and practical signal-processing fixes for the long-standing problem of end-fire variance in compact linear microphone arrays.

## Code

- https://github.com/WwHhYy666/ULA_End_Fire_Robust_ASL

## Applications

Smart televisions, voice-controlled home appliances, and low-complexity edge devices requiring robust spatial audio capture and direction-of-arrival tracking.

## Related

- (link related pages by id as the wiki grows)
