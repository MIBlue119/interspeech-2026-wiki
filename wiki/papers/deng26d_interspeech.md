---
id: deng26d_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2212
pdf: https://www.isca-archive.org/interspeech_2026/deng26d_interspeech.pdf
---

# Joint Learning of Covariance Estimation and White Noise Gain for Robust MVDR Beamforming

[PDF](https://www.isca-archive.org/interspeech_2026/deng26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/deng26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2212)

**TL;DR** — This paper proposes a data-driven MVDR beamforming framework that jointly predicts a time-frequency noise mask and a frequency-dependent white noise gain (WNG) threshold, improving speech quality and intelligibility over fixed-WNG baselines.

## Problem

Minimum variance distortionless response (MVDR) beamformers are highly sensitive to microphone self-noise, array mismatches, and position errors, which causes white noise amplification and performance collapse. Traditional robust MVDR methods rely on fixed, manually tuned WNG thresholds or diagonal loading factors that fail to generalize across varying acoustic environments and shifting device characteristics. Treating robustness control as a heuristic external hyperparameter prevents the beamformer from dynamically balancing the trade-off between spatial directivity and robustness.

## Method

The authors introduce a dual-branch neural network architecture that takes multi-channel STFT signals and processes them through a multi-channel JNF backbone featuring frequency, narrowband temporal, subband, and fullband modules. The shared multi-scale representations feed into two prediction heads: a linear layer for the frequency-dependent WNG constraint and an MLP estimating the real and imaginary parts of a complex-valued time-frequency noise mask. The estimated noise mask is averaged over time to yield a spatial covariance matrix, which is combined with the predicted WNG constraint inside a differentiable quadratic eigenvalue problem (QEP) robust MVDR layer. The entire end-to-end network is optimized using mean absolute error against an early-reference clean speech signal without needing direct WNG supervision.

## Results

Evaluated using VCTK speech sources captured by an 8-microphone uniform linear array (ULA), the proposed adaptive approach consistently outperforms conventional MVDR baselines and FullSubNet configurations utilizing optimal fixed WNG settings across SNR, STOI, SDR, and PESQ metrics. Specifically, the method demonstrates superior robustness against both seen and unseen array mismatch conditions. Violin plots confirm that the adaptive WNG strategy yields tighter distributions with higher median scores compared to empirical fixed-WNG counterparts (such as -6 dB or optimal -8 dB variants). Notable ablations show the advantage of jointly estimating covariance masks and dynamic WNG constraints over optimizing either factor in isolation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech enhancement engineers and developers working on smart speakers, hearing aids, conferencing hardware, or voice capture devices deployed in noisy environments with array manufacturing variances.

## Related

- (link related pages by id as the wiki grows)
