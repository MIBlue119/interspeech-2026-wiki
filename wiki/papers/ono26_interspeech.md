---
id: ono26_interspeech
category: enhancement-separation
labels: [robustness-noise]
institutions: ["Kyoto University", "RIKEN", "National Institute of Advanced Industrial Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2139
pdf: https://www.isca-archive.org/interspeech_2026/ono26_interspeech.pdf
---

# Fast Multichannel Nonnegative Matrix Factorization with Directivity Regularization for DOA-Informed Speech Separation

*Ryosuke Ono, Aditya Arie Nugraha, Yoshiaki Bando, Kazuyoshi Yoshii*

[PDF](https://www.isca-archive.org/interspeech_2026/ono26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ono26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2139)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — The paper introduces directivity-regularized FastMNMF for DOA-informed speech separation, incorporating soft von Mises angular weights into full-rank spatial covariance matrix diagonalization to achieve robust separation. It yields a striking 4.4 dB SDR improvement over standard FastMNMF for single-source separation in reverberant environments.

## Key contributions

- Proposes a directivity-regularized objective for FastMNMF that shapes beam patterns across a continuous angular domain rather than enforcing rigid point-wise constraints.
- Formulates angle-dependent weights using von Mises probability density functions to robustly handle DOA estimation errors, head movement, and speech directivity spread.
- Derives a closed-form vector coordinate descent (VCD) and multiplicative update optimization recipe for the regularized model.
- Demonstrates substantial performance and convergence speed gains over classical BSS (IVA, ILRMA, FastMNMF) and hard-constrained variants in reverberant multi-speaker environments.

## Problem

Blind source separation (BSS) methods like standard MNMF and FastMNMF suffer from high degrees of freedom in their full-rank spatial covariance matrices (SCMs), making iterative optimization prone to poor local optima in unknown acoustic environments. While visual sensors on wearable devices can now provide reliable direction of arrival (DOA) estimates, conventional BSS frameworks cannot natively exploit this prior metadata. Existing geometrically constrained approaches rely on hard point-wise steering vector constraints, which fail catastrophically under DOA estimation errors, speaker movement, and reverberation.

## Method

The proposed method builds on FastMNMF by integrating a directivity regularization term $R(\mathbf{Q})$ into the negative log-likelihood objective function. The spatial model restricts source SCMs via a joint-diagonalization matrix $\mathbf{Q}_f$, where row vectors $\mathbf{q}_{fm}^H$ act as virtual spatial separation filters. The regularization term encourages a distortionless response toward target speaker DOAs $\phi_m^{(\text{target})}$ while penalizing responses toward null directions $\Phi_m^{(\text{null)}}$.

Unlike rigid point-constraint models, the angular weights are modeled using von Mises probability density functions centered on the target and null angles: $\omega_{m\theta}^{(\text{target})} = \alpha_m \frac{\exp(\kappa \cos(\theta - \phi_m^{(\text{target})}))}{2\pi I_0(\kappa)}$, where $\kappa$ controls directional concentration (fixed empirically to $\kappa = 132$) and $\alpha_m$ determines the overall regularization weight. This smoothly accommodates continuous spatial spread and DOA uncertainty. As the concentration parameter $\kappa \to \infty$, the von Mises distribution collapses to conventional hard point constraints.

All non-spatial parameters (source PSD bases $W$, activations $H$, and non-negative spatial vectors $\tilde{\mathbf{G}}$) are optimized using standard FastMNMF multiplicative updates, while the joint diagonalization matrix $\mathbf{Q}_f$ is updated via closed-form vector coordinate descent (VCD). The system uses 5 microphones in an arc array (5 cm inter-mic spacing), STFT features at 16 kHz, and $K=8$ NMF bases.

## Experimental setup

Simulated acoustic mixtures in an $8 \times 8 \times 3$ m room using an arc-shaped 5-microphone array ($M=5$) with an RT60 of 0.3 s and 20 dB SNR environmental interfering noise. Evaluated across $N \in \{1, 2, 3, 4\}$ sources using CMU ARCTIC corpus speech data (10 speakers). Baselines include IVA, ILRMA, FastMNMF, SR-FastMNMF, and their point-constraint regularized variants. Evaluated via source-to-distortion ratio (SDR), PESQ, and STOI over 10 independent trials.

## Results

For $N=1$ source, the proposed DR-FastMNMF with von Mises weighting achieves a headline SDR of $18.2 \pm 2.4$ dB, PESQ of $2.94$, and STOI of $0.96$, outperforming standard FastMNMF ($13.8$ dB SDR) and the point-constraint variant ($13.3$ dB SDR). For $N=2$ sources, the proposed method achieves $9.2$ dB SDR compared to $4.9$ dB for FastMNMF and $4.5$ dB for the point-constraint variant, proving the necessity of soft probabilistic weighting over hard constraints. Convergence analysis shows the von Mises variant hits ~6 dB SDR within 10 iterations and converges around 10.5 dB.

In congested conditions ($N=3$ and $N=4$), the proposed method loses its top-1 advantage to SR-FastMNMF with point weighting, indicating that distortionless-response assumptions struggle when source overlap becomes extreme.

| System | Weight | N=1 SDR (dB) | N=2 SDR (dB) | N=3 SDR (dB) | N=4 SDR (dB) |
|---|---|---|---|---|---|
| FastMNMF [6] | - | 13.8 (4.0) | 4.9 (3.4) | 2.6 (2.0) | -0.6 (1.6) |
| SR-FastMNMF [21] | - | 10.1 (1.8) | 5.1 (3.5) | 3.0 (2.4) | -0.5 (1.6) |
| SR-FastMNMF | Point | 9.6 (2.1) | 7.6 (1.1) | 5.9 (0.9) | 3.4 (0.7) |
| DR-FastMNMF (Proposed) | von Mises | 18.2 (2.4) | 9.2 (2.5) | 4.1 (0.6) | -0.1 (0.6) |

## Limitations

Evaluated exclusively on simulated room impulse responses with a fixed RT60 of 0.3 s and clean oracle DOAs rather than estimated tracker outputs. Performance degrades in dense acoustic scenes ($N \ge 3$) where spatial congestion limits the effectiveness of distortionless-response beam patterns. Lacks validation on real hardware recordings, mobile form factors, and dynamic head movements.

## Why read this

Speech signal processing researchers and audio engineers working on wearable front-ends will learn how to inject probabilistic spatial priors into full-rank matrix factorization frameworks. It offers a mathematically rigorous alternative to hard geometrical constraints for multi-microphone source enhancement.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart glasses, wearable audio enhancement, hearing aids, and distant-speech recognition front-ends operating in noisy multi-talker environments.

## Institutions / 機構

Kyoto University, RIKEN, National Institute of Advanced Industrial Science and Technology

## Related

- (link related pages by id as the wiki grows)
