---
id: hirose26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3059
pdf: https://www.isca-archive.org/interspeech_2026/hirose26_interspeech.pdf
---

# Self-adaptive Gradient Conflict Mitigator for Continuous-Time Diffusion Models

[PDF](https://www.isca-archive.org/interspeech_2026/hirose26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hirose26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3059)

**TL;DR** — The paper introduces a theoretical lower bound on loss reduction for continuous-time diffusion models and proposes a lightweight gradient conflict mitigator that improves speech enhancement performance.

## Problem

Continuous-time diffusion models suffer from gradient conflicts where parameter updates optimized for one timestep inadvertently interfere with and degrade the loss at other timesteps, slowing training convergence and capping peak performance. Directly tracking or minimizing these multi-timestep conflicts is computationally intractable. Resolving this interference is crucial to make diffusion training more efficient and effective across speech generation tasks.

## Method

The authors introduce Delta Loss Lower Bound (DELLBO), a tractable lower bound on the reduction of the integrated training loss, and apply Sion’s minimax theorem to analytically derive the optimal update direction corresponding to the closest point in the convex hull of per-timestep gradients to the origin. Based on this geometric insight, they propose the Self-adaptive Gradient Conflict Mitigator (SGCM), which rescales per-timestep gradient vectors using a learnable density function derived from signal-to-noise ratios. SGCM introduces only a single additional learnable parameter $\alpha$ (reparameterized via softplus to ensure positivity) and integrates smoothly into standard continuous-time diffusion pipelines.

## Results

Evaluated on the WSJ0-CHiME3 and VoiceBank+DEMAND speech enhancement benchmarks using SGMSE+ as the core diffusion framework, SGCM is compared against baseline SNR weighting, Max-SNR weighting, and Min-SNR weighting strategies. On WSJ0-CHiME3, SGCM achieves a PESQ of 3.04, ESTOI of 0.93, SI-SDR of 17.0 dB, and SI-SIR of 31.8 dB, outperforming the unweighted baseline (PESQ 2.96, SI-SDR 16.0 dB) and other weighting baselines. On VoiceBank+DEMAND, SGCM attains a PESQ of 2.85, ESTOI of 0.86, SI-SDR of 17.9 dB, and SI-SIR of 31.0 dB. The consistent improvements across perceptual and distortion metrics demonstrate that correcting gradient conflicts via the derived convex hull approximation yields superior speech restoration quality.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers training continuous-time diffusion models for speech enhancement, noise suppression, and related generative audio tasks.

## Related

- (link related pages by id as the wiki grows)
