---
id: viakhirev26_interspeech
category: asr
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1420
pdf: https://www.isca-archive.org/interspeech_2026/viakhirev26_interspeech.pdf
---

# From Dispersion to Attraction: Spectral Dynamics of Hallucination Across Whisper Model Scales

*Ivan Viakhirev, Kirill Borodin, Grach Mkrtchian*

[PDF](https://www.isca-archive.org/interspeech_2026/viakhirev26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/viakhirev26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1420)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper introduces the Spectral Sensitivity Theorem to explain ASR hallucinations, revealing a scale-dependent phase transition where small models suffer from signal dispersion in cross-attention while large models enter a rank-1 attractor state that suppresses acoustic evidence.

## Key contributions

- Formulates the Spectral Sensitivity Theorem, characterizing transformer layer-wise signal propagation through gain, alignment, and spectral gap parameters.
- Proves two distinct mathematical regimes: Regime I (Disintegration, where effective gain rho < 1 causes exponential decay of early acoustic injections) and Regime II (Attractor, where stable gain and alignment drive rank-1 collapse).
- Introduces the 'Hell' dataset comprising 5,559 perturbed LibriSpeech samples (time stretch, 6-speaker mixing, 0dB Gaussian noise) exhibiting high WER (>0.5) to trigger hallucinations.
- Provides empirical SVD activation analysis across Whisper scales (Tiny 39M, Small 244M, Large-v3-Turbo 809M) mapping effective rank, Kirchhoff index, and spectral decay (alpha).

## Problem

Large ASR models like Whisper frequently produce confident hallucinations when subjected to silence, noise, or adversarial stress, yet standard performance metrics (WER, token log-probabilities) fail to predict these failures because the model remains locally confident. Prior work on hallucination detection is purely symptomatic (e.g., semantic entropy, auxiliary LLMs), and theoretical analyses of transformer rank collapse usually focus on initialization rather than acoustic decoupling. This lack of internal representational understanding prevents principled mitigation of speech hallucinations.

## Method

The authors model discrete signal propagation through an L-layer transformer as a dynamical system, defining a per-layer propagator W_l = I + partial f_l / partial h_{l-1} and external context injection G_l = partial f_l / partial c. They decompose W_j into a rank-1 dominant component and a residual perturbation bounded by the spectral gap xi_j = sigma_{2,j} / sigma_{1,j} << 1, inter-layer alignment kappa_j = v_{j+1}^T u_j, and effective gain rho_j = sigma_{1,j} |kappa_j|. Through Lemma 1, they track perturbation accumulation and prove the Spectral Sensitivity Theorem, showing that when effective gain is below unity (Regime I), sensitivity to early layers decays exponentially, whereas under strict stability, alignment, and injection coherence conditions (Regime II), the accumulated Jacobian collapses to a rank-1 structure J_L approx u_L Psi^T + G_L + R_Sigma with noise bounded by xi_L / gamma.

To validate this, the authors extract layer-wise latent representations from Whisper Tiny (39M), Small (244M), and Large-v3-Turbo (809M, D=1280) evaluated on the adversarial 'Hell' dataset. They track spectral observables across Cross-Attention, Self-Attention, and Feed-Forward Network activations: Effective Rank (N_eff) to measure latent dimensionality, Spectral Alpha (alpha) via linear regression on log-log eigenspectrum tails for spectral hardening, and the Kirchhoff Index (Kf) as a proxy for activation covariance resistance.

## Experimental setup

Evaluations use the LibriSpeech dataset (test-clean and test-other splits) augmented into the 5,559-sample 'Hell' dataset via 3.5x time stretch, 6-speaker mixing, and 0dB Gaussian noise, filtering specifically for samples with WER > 0.5. The study analyzes three Whisper scales: Tiny (39M parameters), Small (244M parameters), and Large-v3-Turbo (809M parameters, hidden dimension D=1280). Metrics include changes in Effective Rank (Delta N_eff), Kirchhoff Index log-scale shifts (Delta log10 Kf), and Spectral Decay Slope shifts (Delta alpha) for dominant modes (K=10) and spectral tails (K=50).

## Results

Small models experience structural disintegration under adversarial stress, demonstrated by a 13.40% collapse in Cross-Attention rank (K=50) and a Kirchhoff index increase of Delta log10 Kf = 3.87, confirming that acoustic signals are washed out before reaching final layers (Regime I). Conversely, Large-v3-Turbo resists global disintegration but enters an autoregressive lock-in state, showing self-attention rank compression (Delta N_eff = -2.34% at K=50) and spectral hardening (alpha > 9, Delta alpha = +0.008), where tail eigenvalues consistently exceed clean baselines (lambda_hell / lambda_clean > 1, reaching up to 1.05 in the tail). This confirms that large models are not suffering from stochastic noise, but rather deterministic geometric projection onto a rigid internal attractor manifold that blinds them to orthogonal acoustic evidence.

| Component | Model | Delta N_eff (%) (K=50) | Delta log10 Kf (K=50) | Delta alpha (K=50) |
|---|---|---|---|---|
| Dec Cross-Attn | Tiny | -11.98% | 2.93 | +0.17 |
| Dec Cross-Attn | Small | -13.40% | 3.87 | +0.21 |
| Dec Cross-Attn | Large | -4.70% | 3.83 | +0.14 |
| Dec Self-Attn | Large | -2.34% | 4.05 | +0.008 |
| Dec FFN | Small | -13.59% | 4.65 | +0.22 |

## Limitations

The empirical findings and spectral proofs are strictly restricted to the Whisper model family, and future work is required to verify whether findings generalize to alternative encoder-decoder architectures like Canary or OWSM. The study infers inter-layer alignment indirectly via spectral hardening and rank compression rather than directly computing cross-layer subspace angles. Furthermore, the analysis focuses purely on post-hoc diagnosis of adversarial failure cases without proposing or evaluating real-time runtime mitigation techniques.

## Why read this

Speech and ML researchers studying model scaling pathologies, hallucinations, or internal Transformer representations should read this paper to understand why large ASR models fail via deterministic attractor lock-in rather than high-entropy noise. It provides a rigorous spectral framework linking layer-wise gain and alignment to catastrophic acoustic decoupling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving safety guardrails, developing real-time hallucination detectors, and designing spectral regularization techniques to prevent low-rank collapse in large speech transformers.

## Institutions / 機構

Information Technologies, Mechanics and Optics University, Moscow Technical University of Communications and Informatics, BitmanagerAI

## Related

- (link related pages by id as the wiki grows)
