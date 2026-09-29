---
id: xuan26_interspeech
category: deepfake-security
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-36
pdf: https://www.isca-archive.org/interspeech_2026/xuan26_interspeech.pdf
---

# Disentangling Speaker Traits for Deepfake Source Verification via Chebyshev Polynomial and Riemannian Metric Learning

*Xi Xuan, Wenxin Zhang, Zhiyu Li, Jennifer Williams, Ville Hautamäki, Tomi H. Kinnunen*

[PDF](https://www.isca-archive.org/interspeech_2026/xuan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xuan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-36)

**Category:** `deepfake-security`

**TL;DR** — This paper investigates speaker entanglement in speech deepfake source verification and introduces a speaker-disentangled metric learning (SDML) framework using Chebyshev polynomials and Riemannian geometry to learn robust, speaker-invariant source embeddings, reducing average equal error rate (EER) from 5.19% down to 4.13% on the MLAAD benchmark.

## Key contributions

- Demonstrates via cross-task pilot experiments that standard speech deepfake source verification embeddings heavily entangle speaker traits, causing shortcut learning.
- Proposes ChebySD-AAM, which extends Chebyshev polynomial approximations with a thresholded adaptive speaker margin to stabilize gradients and penalize speaker alignment.
- Proposes RiemannSD-AAM, which projects source and speaker embeddings into hyperbolic space (Poincaré ball) to model hierarchical source distributions and suppress identity leakage via Riemannian distances.
- Establishes four rigorous evaluation protocols (P-I through P-IV) combining seen/unseen sources with same/different speaker trials to rigorously test disentanglement.

## Problem

Speech deepfake source verification aims to determine whether two synthetic utterances share the same generator, but prior models implicitly entangle synthesis artifacts with speaker characteristics, speaking styles, and acoustic conditions. Because multi-speaker training forces embedding models to rely on prominent speaker cues rather than true generation artifacts (shortcut learning), performance collapses when evaluating across unseen speakers and generators. Standard angular margin losses like AAM-Softmax fail to isolate these factors, creating an urgent need for explicit speaker-disentanglement mechanisms in deepfake tracing frameworks.

## Method

The SDML framework employs a dual-branch architecture combining a trainable source encoder with a frozen speaker verification model (ReDimNet-B6). Given an input utterance, the source encoder extracts a deepfake source embedding while the speaker model extracts a speaker embedding. To suppress speaker interference, the framework evaluates two specialized angular margin losses. The first variant, ChebySD-AAM, uses a degree-K Chebyshev polynomial approximation F_cheb(x, m) for target class logits to avoid the unbounded gradients of arccos near +/- 1, while augmenting non-target logits with a thresholded adaptive speaker margin M_spk based on cosine similarity between source and speaker embeddings.

The second variant, RiemannSD-AAM, projects both source and speaker embeddings onto the Poincaré ball via an exponential map at the origin, defining margins using hyperbolic distance d_H to capture tree-like hierarchical structures of synthetic traces. The hyperbolic speaker margin M_H raises non-target logits whenever source-to-speaker distances fall below a curvature-dependent threshold gamma. Both losses rely on a disentanglement coefficient lambda to balance class separation and speaker suppression.

Training uses the combined MLAAD v8 train and dev sets (23,100 samples) downsampled to 16 kHz with 3-second segments. The front-end uses 80-dimensional linear filterbanks extracted with a 25ms Hanning window and 10ms shift. Data augmentation incorporates MUSAN noise and room impulse responses. Optimization uses the Adam optimizer with a learning rate of 1e-3 (decaying 10% per epoch), weight decay of 1e-7, a 2k-step linear warmup, and a batch size of 200.

## Experimental setup

Evaluated on the MLAAD v8 dataset (totaling 378 hours across 38 languages and 82 TTS models), using the official test split (33,900 samples) organized into four evaluation protocols (P-I to P-IV) with 27,530 trials each (1:1 positive-negative ratio). Compares four encoder backbones: ECAPA-TDNN, ResNet34, AASIST, and Mamba. Metrics reported are Equal Error Rate (EER) and Area Under Curve (AUC) with 95% confidence intervals from 1,000 bootstrap runs. Standard AAM-Softmax, ChebyAAM, and HAM-Softmax serve as baselines.

## Results

When paired with a ResNet34 encoder, RiemannSD-AAM achieves the best overall performance, reducing average EER from 4.78% (baseline AAM-Softmax) to 3.27% across all sets. On the most challenging unseen-source, different-speaker protocol (P-IV), ResNet34 with RiemannSD-AAM achieves an EER of 7.13% and AUC of 0.972, outperforming the baseline EER of 9.77%. Ablation experiments demonstrate that removing speaker disentanglement causes notable performance drops, and that higher hyperbolic curvature (c = 6) combined with an intermediate disentanglement coefficient (lambda = 1) yields optimal hierarchical modeling.

| System / Condition | P-I (Seen/Same) EER% | P-II (Seen/Diff) EER% | P-III (Unseen/Same) EER% | P-IV (Unseen/Diff) EER% | Average EER% |
|---|---|---|---|---|---|
| ResNet34 + Baseline | 0.73 | 1.38 | 7.24 | 9.77 | 4.78 |
| ResNet34 + ChebySD-AAM | 0.71 | 1.35 | 5.85 | 8.24 | 4.04 |
| ResNet34 + RiemannSD-AAM | 0.68 | 1.21 | 4.08 | 7.13 | 3.27 |
| ECAPA-TDNN + Baseline | 0.94 | 1.66 | 6.60 | 11.56 | 5.19 |
| ECAPA-TDNN + RiemannSD-AAM | 0.73 | 1.20 | 5.53 | 9.06 | 4.13 |

## Limitations

The evaluation relies on pseudo-speaker labels derived via cosine similarity thresholds (0.5) from a pre-trained speaker verification model because the underlying MLAAD metadata lacks explicit speaker annotations. The scope is restricted to source generator tracing and does not explicitly control for other confounding attributes such as room acoustics, language accents, or speaking style variations. Furthermore, the approach requires a frozen, high-performing auxiliary speaker verification model (ReDimNet-B6), introducing inference dependency on external speaker embedding extractors.

## Why read this

Read this paper if you work on speech deepfake attribution, source tracing, or metric learning and want to understand how speaker identity leaks into artifact representations. The paper provides a clear blueprint for combining Riemannian geometry and Chebyshev polynomials to enforce orthogonality between speaker traits and generative fingerprints.

## Code

- https://github.com/xxuan-acoustics/RiemannSD-Net

## Applications

Forensic audio analysis, speech deepfake source tracing, automated speaker-agnostic attribution of synthetic speech generators.

## Institutions / 機構

University of Eastern Finland, University of Illinois Urbana-Champaign, University of Southampton, University of Chinese Academy of Sciences, University of Science and Technology of China

**Funding / 經費:** Finnish AI-DOC project, Research Council of Finland

## Related

- (link related pages by id as the wiki grows)
