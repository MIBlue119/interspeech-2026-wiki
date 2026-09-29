---
id: palka26_interspeech
category: speaker
institutions: ["Brno University of Technology", "NTT"]
code: https://github.com/BUTSpeechFIT/DiariZen
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2224
pdf: https://www.isca-archive.org/interspeech_2026/palka26_interspeech.pdf
---

# SphereVBx: Spherical Variational Bayes Clustering for Simplified EEND-VC Diarization

*Petr Pálka, Jiangyu Han, Prachi Singh, Marc Delcroix, Naohiro Tawara, Lukáš Burget*

[PDF](https://www.isca-archive.org/interspeech_2026/palka26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/palka26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2224)

**Category:** `speaker`

**TL;DR** — SphereVBx replaces the Gaussian PLDA backend in VBx with Toroidal Probabilistic Spherical Discriminant Analysis (T-PSDA), providing a principled Bayesian clustering framework for hyperspherical embeddings that simplifies end-to-end neural diarization with vector clustering (EEND-VC) while improving diarization error rate (DER). It achieves an average DER of 12.48% across eight benchmarks compared to the 12.65% baseline, while eliminating ad-hoc heuristic post-processing steps.

## Key contributions

- Introduces SphereVBx, substituting the Gaussian PLDA backend in VBx with T-PSDA to better model length-normalized hyperspherical embeddings trained with angular-margin objectives.
- Proposes a parameter-free variant (SphereVBx-PF) based on cosine scoring that matches tuned backend performance without requiring pretrained T-PSDA model parameters.
- Replaces heuristic short-embedding removal with continuous duration-based reliability weights that scale down the contribution of noisy segments during variational inference.
- Develops a Multi-Stream (MS) variant (MS-SphereVBx) that natively enforces the intra-window cannot-link constraint directly inside the probabilistic inference loop via an outer-sum tensor formulation.

## Problem

Modern speaker embeddings are length-normalized and optimized using angular-margin losses, making cosine similarity or spherical distributions theoretically more appropriate than traditional Gaussian PLDA models. However, standard VBx relies on Gaussian assumptions, forcing state-of-the-art EEND-VC systems to rely on heuristic steps such as filtering out unreliable short embeddings (<1.6s) and ad-hoc cosine-similarity reassignment. These decoupled pipelines complicate the architecture and hurt generalization, making a unified, geometry-aware probabilistic clustering framework necessary.

## Method

SphereVBx reformulates the Variational Bayes clustering framework by substituting the Gaussian PLDA distributions with Toroidal Probabilistic Spherical Discriminant Analysis (T-PSDA), modeling embeddings on the unit hypersphere via von Mises–Fisher (vMF) mixtures. The speaker-specific directions live on the hypersphere, mapped through a subspace matrix $K \in \mathbb{R}^{D \times d}$ (with $d=128$ dimensions projected from 256D inputs via LDA equivalent), where concentration parameters $\kappa_w$ and $\kappa_b$ control within- and between-speaker variances. In the parameter-free variant (SphereVBx-PF), setting $d=D$, $\kappa_b=0$, and $\kappa_w=1$ reduces the log-likelihood ratio scores to a monotonic function of cosine similarity without requiring training data or pretrained weights.

Instead of discarding short segments, duration-based reliability weights $w_t$ are multiplied by posterior responsibilities ($\gamma_{ts}' = w_t \gamma_{ts}$) to smoothly dampen the impact of unreliable frames during variational updates. The inference alternates between estimating the vMF variational posterior $q(\mathbf{y}_s)$ and updating the posterior responsibilities $\gamma_{ts}$. To honor the EEND-VC intra-window 'cannot-link' constraint—where local speakers from the same 16-second window cannot share global identities—the Multi-Stream (MS-SphereVBx) variant builds an $L$-way tensor via an outer sum of row-wise log-scores. Invalid joint assignments containing repeated global speaker indices are pruned, and marginalizing the valid normalized tensor yields the speaker-level responsibilities required for the standard vMF variational update equations.

## Experimental setup

Evaluated across eight standard diarization benchmarks: AMI (far-field ch1), AISHELL-4, AliMeeting (far-field ch1), NOTSOFAR-1, MSDWild, DIHARD3 full, RAMC, and VoxConverse. Systems are compared against standard VBx cascades and the state-of-the-art DiariZen EEND-VC baseline built on a WavLM Large feature extractor and Conformer encoder. Performance metrics include Diarization Error Rate (DER) without a forgiving collar, macro-averaged DER, and Mean Speaker Count Error (MSCE).

## Results

In the cascaded VAD+VBx+OSD pipeline, SphereVBx achieves an average DER of 22.1% across datasets (improving upon the 22.7% re-evaluated baseline and 22.6% original VBx), while its parameter-free variant SphereVBx-PF scores 22.2% DER. Within the EEND-VC framework, the baseline DiariZen system records an average DER of 12.65% with an MSCE of 0.37, whereas standard SphereVBx improves average DER to 12.52% (MSCE 0.34). The fully-constrained MS-SphereVBx-PF model achieves the best average DER of 12.48% (MSCE 0.37), matching or beating concurrent published SOTA while requiring no pretrained backend parameters.

| System | AIS | AliM | AMI | DH3 | MSD | NSF | RAMC | VoxC | Average DER (%) |
|---|---|---|---|---|---|---|---|---|---|
| Baseline [25] | 9.9 | 10.8 | 13.9 | 14.5 | 15.7 | 16.7 | 11.0 | 8.8 | 12.65 |
| SphereVBx | 9.6 | 10.7 | 13.7 | 14.3 | 15.5 | 16.7 | 10.9 | 8.8 | 12.52 |
| MS-SphereVBx | 9.6 | 10.7 | 13.7 | 14.2 | 15.6 | 16.6 | 10.9 | 8.9 | 12.52 |
| MS-SphereVBx-PF | 9.7 | 10.6 | 13.7 | 14.1 | 15.8 | 16.5 | 10.6 | 8.9 | 12.48 |

## Limitations

The current reliability weighting strategy relies entirely on a simple binary threshold derived from segment duration (1.6s) rather than continuous confidence metrics extracted from acoustic features. Multi-stream combinatorial tensor expansions can become computationally expensive for windows with very high local speaker counts ($L$). The evaluation is restricted to speaker diarization benchmarks, leaving the integration with face recognition or spatial audio source separation for future work.

## Why read this

Speech engineers and ML researchers working on speaker diarization or vector clustering should read this paper to learn how to replace heuristic post-processing rules and Gaussian PLDA backends with a unified, geometry-aware spherical Bayesian framework.

## Code

- https://github.com/BUTSpeechFIT/DiariZen

## Applications

Speaker diarization pipelines, multi-speaker conversational transcription systems, and acoustic meeting analysis tools.

## Institutions / 機構

Brno University of Technology, NTT

**Funding / 經費:** European Union, Czech Ministry of Education, Youth and Sports

## Related

- [Bidirectional Retention Network-based Segmentation Model for Speaker Diarization](you26b_interspeech.md) — same problem · relatedness 2.8/3
- [Two-Level Uncertainty Suppression for Robust Meeting Diarization](asaka26_interspeech.md) — same problem · relatedness 2.6/3
- [Hierarchical Permutation Consistency Learning for Self-Conditioned End-to-End Speaker Diarization](jung26b_interspeech.md) — same problem · relatedness 2.6/3
- [Neural Multichannel Distant Speaker Diarization and Source Separation with Beta Speaker Activity Prior](mao26_interspeech.md) — same problem · relatedness 2.5/3
- [Delayed-Commitment Online Speaker Tracking for Robust Many-Speaker Diarization](kwon26_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
