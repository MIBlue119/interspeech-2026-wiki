---
id: tanabu26_interspeech
category: tts
labels: [self-supervised]
institutions: ["University of Tokyo"]
code: https://github.com/tomoya-san/ssl-gmmvc
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1688
pdf: https://www.isca-archive.org/interspeech_2026/tanabu26_interspeech.pdf
---

# SSL-GMMVC: Interpretable Voice Conversion via Locally Linear GMM Transforms in Self-Supervised Representation Space

*Tomoya Tanabu, Hiroshi Nishijima, Daisuke Saito, Nobuaki Minematsu*

[PDF](https://www.isca-archive.org/interspeech_2026/tanabu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tanabu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1688)

**Category:** `tts` · **Labels:** `self-supervised`

**TL;DR** — SSL-GMMVC is an interpretable voice conversion method that replaces global linear mappings in self-supervised feature space with a mixture of locally linear affine transforms modeled via a Gaussian mixture model (GMM). It achieves higher speaker similarity than FreeVC and LinearVC while matching their intelligibility and naturalness.

## Key contributions

- Replaces the single global linear mapping of LinearVC with a multi-component GMM that performs posterior-weighted locally linear affine transformations in SSL space.
- Formulates both unconstrained full covariance (F) and constrained cross-diagonal (CD) GMM variants to study the trade-off between expressive capacity and estimation stability.
- Demonstrates through objective and subjective evaluations that increasing mixture components (up to K=4) scales speaker similarity performance with larger training sets.
- Provides interpretability analyses linking mixture component selection to phonetic structures like sonority and characterizing the learned transformations as contractive rotations.

## Problem

Voice conversion systems that utilize self-supervised learning (SSL) embeddings typically rely on either complex, black-box deep learning models (such as FreeVC) or overly simplistic global operations (such as kNN-VC and LinearVC). A single global linear transform fails to adapt to complex, heterogeneous local structures across different phonetic clusters in the embedding space. This lack of local adaptability limits their expressiveness and voice conversion performance, while complex neural networks sacrifice mathematical transparency and interpretability.

## Method

The method extracts 1024-dimensional frame-level features from the 6th layer of WavLM-Large using 20 ms frames from 16 kHz audio. Source and target features are aligned using bidirectional cosine-similarity nearest-neighbor matching to form joint source-target vectors z = [x^⊤, y^⊤]^⊤ in R^(2D). A K-component Gaussian mixture model is fitted to these joint vectors using the Expectation-Maximization (EM) algorithm. Two covariance configurations are tested: Full covariance (F), where the full unconstrained covariance matrix is estimated, and Cross Diagonal (CD), where all four block matrices in the partitioned covariance are restricted to diagonal forms to prevent overfitting.

At inference time, given a source feature x, the posterior probability of each mixture component p(k|x) is calculated from the source-side marginal distribution. The converted feature is computed as a posterior-weighted sum of component-wise affine transforms: F(x) = sum_k p(k|x) (mu_k^y + W_k^⊤ (x - mu_k^x)), where mu and W_k derive from the partitioned component means and covariances. Setting K=1 mathematically collapses this formulation to LinearVC. Waveforms are synthesized from the converted features using a pre-trained HiFi-GAN vocoder.

## Experimental setup

Evaluated using American English speech from the CMU ARCTIC dataset comprising 3 male (bdl, rms, aew) and 3 female (slt, clb, lnh) speakers (2-3 second utterances). Training-set sizes spanned N in {10, 20, 50, 100, 200, 300} utterances, with mixture components capped at K in {1, 2, 4} requiring N >= 50 for K=2 and N >= 100 for K=4. Baselines included LinearVC (No Constraint and Bias Only variants) and the zero-shot deep learning model FreeVC. Metrics included Equal Error Rate (EER) using an ECAPA-TDNN speaker verifier for speaker similarity, Word Error Rate (WER) using Whisper-base for intelligibility, UTMOS for objective naturalness, and Mean Opinion Score (MOS) via crowdsourcing for subjective similarity and naturalness.

## Results

In objective evaluations, SSL-GMMVC F with K=2 and K=4 surpassed LinearVC NC in speaker similarity at N >= 100 and N >= 200, reaching an EER of up to 27.35%. SSL-GMMVC CD consistently outperformed the LinearVC BO baseline across all configurations by learning both scaling and shifting. For subjective evaluations, unconstrained SSL-GMMVC models with N >= 20 outperformed FreeVC in speaker similarity and approached FreeVC-level naturalness at N >= 200, though they suffered from artifacts when training data was restricted to N = 10.

| System | N | EER (%) (^\uparrow) | WER (%) (\downarrow) | UTMOS (^\uparrow) |
|---|---|---|---|---|
| FreeVC (Baseline) | Pretrained | 28.85 | 3.85 | 4.25 |
| LinearVC NC | 300 | 25.73 | 2.70 | 4.33 |
| LinearVC BO | 300 | 0.62 | 3.28 | 4.08 |
| SSL-GMMVC F (K=1) | 300 | 25.77 | 2.70 | 4.33 |
| SSL-GMMVC F (K=4) | 300 | 27.35 | 2.79 | 4.33 |
| SSL-GMMVC CD (K=2) | 300 | 2.92 | 3.12 | 4.11 |

## Limitations

The method struggles with unstable parameter estimation when scaling the number of mixture components (K) under very limited training data (e.g., N = 10), resulting in severe conversion artifacts. The rotation-spectrum analysis for K > 1 is currently limited because a principled method to establish correspondences across rotational planes between different speaker pairs has not yet been established. The evaluation is restricted to clean American English speech from a small speaker set.

## Why read this

Researchers and engineers working on voice conversion and self-supervised speech representations should read this to understand how analytically tractable, locally linear GMM operations in SSL space can outperform black-box neural architectures in speaker similarity while offering high interpretability.

## Code

- https://github.com/tomoya-san/ssl-gmmvc

## Applications

Voice conversion, speaker anonymization, computer-assisted language learning, and speaking aids.

## Institutions / 機構

University of Tokyo

**Funding / 經費:** JSPS KAKENHI

## Related

- [From A to B to A: Palindromic Zero-Shot Voice Conversion with Non-Parallel Data](mandel26_interspeech.md) — same problem · relatedness 2.9/3
- [ProsoCodec: Prosody-Oriented Speech Codec for Voice Conversion](choi26d_interspeech.md) — same problem · relatedness 2.8/3
- [CFLOW-VC: An unsupervised cycle training strategy based on normalizing flows for Voice Conversion](song26_interspeech.md) — same problem · relatedness 2.8/3
- [Universal Speech Content Factorization](xinyuan26_interspeech.md) — same problem · relatedness 2.7/3
- [VOSSA: Voiceprint Optimization for Streaming Speech Architectures](tseng26c_interspeech.md) — same problem · relatedness 2.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
