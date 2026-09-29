---
id: mao26_interspeech
category: speaker
institutions: ["Telecom Paris", "Institut Polytechnique de Paris", "Universite du Mans"]
code: https://github.com/alephpi/neural-fcasa
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1248
pdf: https://www.isca-archive.org/interspeech_2026/mao26_interspeech.pdf
---

# Neural Multichannel Distant Speaker Diarization and Source Separation with Beta Speaker Activity Prior

*Sicheng Mao, Mathieu Fontaine, Anthony Larcher, Roland Badeau*

[PDF](https://www.isca-archive.org/interspeech_2026/mao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1248)

**Category:** `speaker`

**TL;DR** — This paper proposes a fully Bayesian formulation for multichannel distant speaker diarization using a beta distribution prior over speaker activity tendencies, reducing Diarization Error Rate (DER) by at least 3% (16% relatively) on the AMI dataset.

## Key contributions

- Formulates a generative diarization model with an explicit beta prior over speaker activity tendencies, replacing heuristic cross-entropy with a principled variational lower bound.
- Applies the PERT parametrization (mode $m$ and concentration $\lambda$) to make beta distribution hyperparameters differentiable and easy to learn.
- Derives a closed-form expression for the Evidence Lower Bound (ELBO) of the diarization likelihood, avoiding Monte Carlo approximations.
- Achieves consistent absolute DER improvements of 3% to 4% (16% to 30% relative) and JER improvements of 4% to 6% across multiple AMI evaluation protocols.

## Problem

Distant speaker diarization in meetings suffers from severe acoustic degradation, reverberation, variable speaker counts, and frequent overlaps. Prior data-driven end-to-end neural diarization (EEND) and model-driven hybrid systems like neural FCASA rely on non-Bayesian cross-entropy losses for speaker activity classification, ignoring conversational dynamics and speaker states. This limitation causes high false alarms and confusion errors during overlapping speech segments.

## Method

The model extends neural FCASA, combining a deep spectral generative model with a variational inference framework. The speech mixture is modeled in the STFT domain where source power spectral densities (PSDs), modulated by binary activity masks and jointly diagonalizable spatial covariance matrices (SCMs), sum to the multi-channel mixture PSD. To capture internal speaker activity tendencies $\eta_{nt} \in (0,1)$, the authors introduce a Beta prior governed by the PERT parametrization, using mode $m$ (speaking energy threshold) and concentration $\lambda$ (certainty). 

Rather than using heuristic cross-entropy, the diarization network outputs parameters $\alpha_{\phi,nt}$ and $\beta_{\phi,nt}$ through hidden states mapped via sigmoid and softplus activations. The training objective optimizes an Evidence Lower Bound (ELBO) that combines separation loss with a closed-form diarization log-likelihood and a KL-divergence regularization term matching the posterior to the beta prior. 

Inference uses an ISS diagonalizer for SCMs and a multichannel Wiener filter for separation, while speaker activities are binarized with a 0.5 threshold after 11-frame median filtering.

## Experimental setup

Evaluated on the AMI meeting corpus (80.7h train, 9.7h dev, 9.1h eval, 16 kHz, 8-mic array). Compared against the baseline neural FCASA (Gaussian/cross-entropy model) and referenced against Pyannote 3.1. Metrics include Diarization Error Rate (DER) and Jaccard Error Rate (JER) across Forgiving, Fair, Full, and Overlap protocols. Implemented with AdamW ($lr=10^{-4}$, weight decay $10^{-5}$), batch size 128, 200 epochs on 10-second random crops from 20-second segments.

## Results

The proposed beta neural FCASA outperforms the non-Bayesian baseline across all evaluation protocols. With hyperparameters set to $m=0.3$ and $\lambda=4$, the system achieves absolute DER reductions of 3% to 4% (16% to 30% relative) and JER improvements of 4% to 6% (20% to 27% relative). For instance, under the Full evaluation protocol, DER drops from 18.73% to 15.21%. Ablations show that tuning the mode $m$ (e.g., $m=0.3$ vs $0.5$) significantly impacts performance by capturing natural speaker willingness, while the concentration parameter $\lambda=4$ provides stable regularization.

| System/Condition | Miss | FA | Conf. | DER | JER |
|---|---|---|---|---|---|
| Baseline (Forgiving) | 5.59 | 8.16 | 0.73 | 14.48 | 13.50 |
| Beta FCASA ($m=0.3, \lambda=4$, Forgiving) | 5.37 | 4.31 | 0.43 | 10.11 | 9.73 |
| Baseline (Full) | 10.77 | 6.81 | 1.16 | 18.73 | 27.65 |
| Beta FCASA ($m=0.7, \lambda=4$, Full) | 9.69 | 4.77 | 0.75 | 15.21 | 22.57 |
| Baseline (Overlap) | 19.40 | 3.80 | 0.90 | 24.11 | 26.53 |
| Beta FCASA ($m=0.5, \lambda=4$, Overlap) | 15.23 | 3.47 | 0.64 | 19.35 | 20.96 |

## Limitations

The current approach assumes fixed hyperparameters for the beta prior rather than dynamically estimating them per speaker or conversation. Evaluation is restricted to the AMI meeting corpus and chunk-wise 10-second processing, limiting generalizations to non-meeting domains or continuous streaming inference. The model also relies on oracle counts for active speech sources ($N=6$).

## Why read this

Speech and ML researchers building joint separation and diarization systems will learn how to incorporate principled Bayesian priors into neural architectures using tractable variational inference and closed-form ELBO objectives.

## Code

- https://github.com/alephpi/neural-fcasa

## Applications

Distant multi-microphone meeting transcription, smart conference room recording analysis, and multi-speaker conversational AI front-ends.

## Institutions / 機構

Telecom Paris, Institut Polytechnique de Paris, Universite du Mans

**Funding / 經費:** ANR Project SAROUMANE

## Related

- [Spatially-Augmented Sequence-to-Sequence Neural Diarization for Meetings](li26la_interspeech.md) — same problem · relatedness 2.6/3
- [Multi-Speaker Embeddings With Weakly Supervised Speaker Activity Detection For Granular Speaker Diarization](thienpondt26_interspeech.md) — same problem · relatedness 2.6/3
- [Bidirectional Retention Network-based Segmentation Model for Speaker Diarization](you26b_interspeech.md) — same problem · relatedness 2.6/3
- [Two-Level Uncertainty Suppression for Robust Meeting Diarization](asaka26_interspeech.md) — same problem · relatedness 2.5/3
- [SphereVBx: Spherical Variational Bayes Clustering for Simplified EEND-VC Diarization](palka26_interspeech.md) — same problem · relatedness 2.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
