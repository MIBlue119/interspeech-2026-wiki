---
id: hirose26_interspeech
category: enhancement-separation
labels: [generative-model]
institutions: ["Institute of Science Tokyo"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3059
pdf: https://www.isca-archive.org/interspeech_2026/hirose26_interspeech.pdf
---

# Self-adaptive Gradient Conflict Mitigator for Continuous-Time Diffusion Models

*Takumi Hirose, Zhiyang Li, Nakamasa Inoue*

[PDF](https://www.isca-archive.org/interspeech_2026/hirose26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hirose26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3059)

**Category:** `enhancement-separation` · **Labels:** `generative-model`

**TL;DR** — The paper introduces the Delta Loss Lower Bound (DELLBO) to theoretically analyze and resolve gradient conflicts across timesteps in continuous-time diffusion models, proposing a lightweight Self-adaptive Gradient Conflict Mitigator (SGCM) that improves speech enhancement quality.

## Key contributions

- Formulates DELLBO, a tractable lower bound on the reduction of the integrated training loss in continuous-time diffusion models.
- Proves mathematically via Sion's minimax theorem that the optimal gradient update direction points from the origin to the nearest point in the convex hull of per-timestep gradients.
- Introduces SGCM, a lightweight gradient-rescaling mechanism requiring only a single additional learnable parameter to approximate the optimal update direction during training.
- Demonstrates consistent performance gains across multiple speech enhancement benchmarks (WSJ0-CHiME3 and VoiceBank+DEMAND).

## Problem

Continuous-time diffusion models minimize an integrated training loss by uniformly sampling timesteps at each iteration, which leads to gradient conflicts where updates that reduce the loss at one timestep inadvertently increase it at others. Prior heuristic weighting strategies like fixed SNR, Max-SNR, or Min-SNR weightings lack theoretical grounding and often over-emphasize specific regions, slowing down convergence or degrading performance. Addressing this optimization bottleneck is critical to ensure that parameter updates consistently decrease the total integrated loss and maximize model capacity.

## Method

The paper builds on the continuous-time formulation where parameters are optimized over an integrated loss function. By analyzing the first-order Taylor expansion of the delta loss (the reduction in total loss from an update step), the authors define the Delta Loss Lower Bound (DELLBO) by replacing the Lebesgue measure over time with an adversarial probability measure. Applying Sion's minimax theorem to maximize DELLBO over a Euclidean ball constraint reveals that the optimal update direction is the vector pointing from the origin to the nearest point in the convex hull of per-timestep gradient vectors.

To implement this efficiently without heavy computational burdens, the Self-adaptive Gradient Conflict Mitigator (SGCM) approximates the optimal probability measure via a learnable density function $m_alpha(t) = \min\{\lambda s(t), 1\}$, where $s(t)$ is the signal-to-noise ratio and $\lambda$ is a learnable parameter reparameterized as $\text{softplus}(\alpha)$. This density is integrated directly into the gradient-weighting scheme during training. The upper bound on $m_alpha(t)$ prevents instability from over-emphasizing narrow subsets of timesteps, while $\alpha$ is updated jointly with the model parameters using standard backpropagation with negligible computational overhead.

## Experimental setup

Evaluated on two speech enhancement benchmarks: WSJ0-CHiME3 (12,777 training utterances, 651 test utterances, SNRs 0-20 dB) and VoiceBank+DEMAND (11,572 training pairs from 28 speakers, 824 test utterances with unseen speakers/noises). Compared against the SGMSE+ baseline and heuristic weighting baselines (SNR, Max-SNR, and Min-SNR). Metrics include PESQ, ESTOI, SI-SDR, SI-SIR, and SI-SAR. Implemented using the official SGMSE+ codebase with the Adam optimizer, initial learning rate of $10^{-4}$, and batch size of 16.

## Results

On the WSJ0-CHiME3 test set, SGCM achieves the best performance across all five evaluated metrics, scoring 3.04 PESQ, 0.93 ESTOI, 18.8 dB SI-SDR, 31.8 dB SI-SIR, and 19.0 dB SI-SAR, outperforming the unweighted baseline (2.96 PESQ, 18.3 dB SI-SDR) and Min-SNR weighting (2.89 PESQ, 18.2 dB SI-SDR). On VoiceBank+DEMAND, SGCM achieves 2.85 PESQ, 0.86 ESTOI, 17.0 dB SI-SDR, and 17.9 dB SI-SAR, closely matching or outperforming baseline and heuristic weighting strategies. Ablations measuring the squared norm of the optimization objective confirm that SGCM successfully yields the smallest norm value compared to all baselines, demonstrating its close alignment with the theoretical optimum.

| System / Condition | PESQ | ESTOI | SI-SDR (dB) | SI-SIR (dB) | SI-SAR (dB) |
|---|---|---|---|---|---|
| Mixture (WSJ0-CHiME3) | 2.01 | 0.81 | 13.5 | 18.7 | 15.4 |
| Baseline (SGMSE+) | 2.96 | 0.92 | 18.3 | 31.1 | 18.6 |
| Min-SNR | 2.89 | 0.92 | 18.2 | 31.0 | 18.4 |
| SGCM (Ours, WSJ0-CHiME3) | 3.04 | 0.93 | 18.8 | 31.8 | 19.0 |
| Baseline (VoiceBank+DEMAND) | 2.77 | 0.86 | 16.0 | 24.8 | 17.3 |
| SGCM (Ours, VoiceBank+DEMAND) | 2.85 | 0.86 | 17.0 | 27.0 | 17.9 |

## Limitations

The theoretical formulation relies on first-order Taylor approximations and assumes score vector behavior decomposes into stable mean components with uncorrelated zero-mean noise. The empirical validation is restricted to speech enhancement diffusion models (SGMSE+), leaving broader diffusion tasks like text-to-speech, audio generation, and speaker separation for future work.

## Why read this

Speech and ML researchers working on continuous-time diffusion models will find a rigorous optimization-theoretic framework for gradient conflicts and a simple, drop-in learnable conflict mitigator that requires only one extra parameter.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech enhancement, noise suppression, and robust audio restoration using continuous-time diffusion models.

## Institutions / 機構

Institute of Science Tokyo

**Funding / 經費:** JSPS KAKENHI

## Related

- [Time-Unconditional Generative Speech Enhancement via Autonomous Rectified Flow](zhang26z_interspeech.md) — same problem · relatedness 2.5/3
- [Speech Enhancement Based on Drifting Models](xu26d_interspeech.md) — same problem · relatedness 2.5/3
- [Schrödinger Bridge Mamba for One-Step Speech Enhancement](yang26e_interspeech.md) — same problem · relatedness 2.5/3
- [StuPASE: Towards Low-Hallucination Studio-Quality Generative Speech Enhancement](rong26_interspeech.md) — same problem · relatedness 2.4/3
- [Bridging Self-Supervised Learning and Speech Enhancement: A Wav2Vec2-Conditioned Framework](ojha26_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
