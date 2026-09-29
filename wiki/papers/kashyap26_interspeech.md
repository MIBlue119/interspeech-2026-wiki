---
id: kashyap26_interspeech
category: resources-evaluation
institutions: ["Deakin University", "Technical University of Munich", "Imperial College London"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1654
pdf: https://www.isca-archive.org/interspeech_2026/kashyap26_interspeech.pdf
---

# Quantifying Dimensional Independence in Speech: An Information-Theoretic Framework for Disentangled Representation Learning

*Bipasha Kashyap, Bjoern Schuller, Pubudu N. Pathirana*

[PDF](https://www.isca-archive.org/interspeech_2026/kashyap26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kashyap26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1654)

**Category:** `resources-evaluation`

**TL;DR** — This paper introduces a bounded information-theoretic framework combining MINE, CLUB, and KSG estimators to quantify cross-dimension statistical dependence in speech. Across six corpora, emotional, linguistic, and pathological handcrafted feature sets exhibit near-zero mutual information (<0.15 nats), whereas source-filter coupling is substantially higher at 0.47 nats.

## Key contributions

- A bounded mutual information estimation framework integrating MINE (lower bound), CLUB (upper bound), and KSG (non-parametric validation) with EMA-stabilised training and adaptive uncertainty weighting.
- Empirical demonstration of weak statistical coupling (MI < 0.15 nats) across emotional, linguistic, and pathological handcrafted feature dimensions over six diverse speech corpora.
- A source-filter attribution analysis showing that emotional dimensions are source-dominated (80%), while linguistic and pathological dimensions are filter-dominated (60% and 58%).
- Cross-corpus validation across eight dataset combinations covering diverse accents, emotional expressions, and clinical speech disorders with estimation uncertainty under 0.35 nats.

## Problem

Speech signals simultaneously encode emotional, linguistic, and pathological information through a shared acoustic channel, but existing disentanglement methods evaluate separation indirectly via downstream task performance rather than principled metrics. It remains unclear to what degree these dimensions are statistically independent, and whether such properties hold across diverse speaker populations and languages. Prior work focuses heavily on pairwise separations without addressing the full three-dimensional information structure. Addressing this gap requires robust, non-linear, and bounded mutual information estimators capable of handling high-dimensional continuous speech representations.

## Method

The framework partitions speech utterances into five operationally defined feature sets: source (s ∈ R^9, glottal/F0/voice quality), filter (f ∈ R^32, formant/MFCC vocal tract), emotional (e ∈ R^28, source + energy/spectral descriptors), linguistic (l ∈ R^33, filter + delta-delta MFCCs/temporal parameters), and pathological (p ∈ R^16, voice quality/formant stability/F2 transition velocity). Pairwise mutual information is estimated using three distinct estimators. MINE provides a variational lower bound using a 2-layer MLP critic network (hidden dimension 256, LayerNorm, LeakyReLU with slope 0.2) trained with Adam (learning rate 10^-4, weight decay 10^-5) and an EMA-stabilized partition function (α = 0.01) to reduce gradient variance. CLUB yields a contrastive upper bound with log-variance clamped between [-6, 2] to prevent divergence in low-MI regimes. KSG non-parametric validation uses 5-nearest neighbors via Chebyshev L∞ norm with kd-trees.

An adaptive weighting mechanism combines the neural estimates and anchors them to the KSG estimate based on the uncertainty gap Δ = I_CLUB - I_MINE. Experiments use 500 stratified samples per dataset and ensemble training with M=3 independent estimator pairs. Convergence uses early stopping when Δ < 0.1 for 7+ consecutive epochs, averaging the final 10 of 100 training epochs. Source-filter attribution decomposes each semantic dimension's mutual information into source and filter proportions using conditional expectations via bootstrap resampling.

## Experimental setup

Evaluated on six English speech corpora spanning three dimensions: Emotional (RAVDESS with 1,440 utterances/24 actors; IEMOCAP with 10,039 utterances), Linguistic (L2-ARCTIC with 26,867 utterances/24 non-native speakers; GMU Speech Accent Archive with 2,140 speakers across 177 languages), and Pathological (UA-Speech with 15 dysarthric speakers; MDVR-KCL with Parkinson's disease mobile recordings). All eight possible dataset combinations (2x2x2) are analyzed. Metrics include estimated mutual information in nats across MINE, CLUB, KSG, and final weighted consensus, alongside estimation uncertainty Δ.

## Results

Across all dataset combinations, cross-dimension pairs exhibit final mean mutual information below 0.15 nats with tight bounds: Emotion-Linguistic at 0.12 ± 0.05 nats (Δ = 0.14), Emotion-Pathology at 0.10 ± 0.06 nats (Δ = 0.07), and Linguistic-Pathology at 0.10 ± 0.05 nats (Δ = 0.10). In contrast, Source-Filter coupling is significantly higher at 0.47 ± 0.38 nats with a wider estimation uncertainty (Δ = 0.35). Convergence analysis shows rapid convergence (8-16 epochs) for cross-dimension pairs due to low true MI, whereas Source-Filter requires full 100-epoch training.

The attribution analysis indicates emotional features are 80% source-dominated (95% CI [0.76, 0.85]), linguistic features are 60% filter-dominated, and pathological features are 58% filter-dominated. The method does not win or provide direct insights on temporal dynamics or learned neural representations, as the scope is strictly limited to static handcrafted acoustic features.

| Pair | MINE | CLUB | Δ | KSG | Final (Mean ± Std) |
|---|---|---|---|---|---|
| Emotion–Linguistic | 0.00 | 0.14 | 0.14 | 0.25 | 0.12 ± 0.05 |
| Emotion–Pathology | 0.00 | 0.07 | 0.07 | 0.26 | 0.10 ± 0.06 |
| Linguistic–Pathology | 0.00 | 0.10 | 0.10 | 0.21 | 0.10 ± 0.05 |
| Source–Filter | 0.24 | 0.59 | 0.35 | 0.60 | 0.47 ± 0.38 |

## Limitations

The analysis is strictly restricted to handcrafted acoustic features, leaving open whether learned representations from self-supervised models like wav2vec 2.0 or HuBERT preserve dimensional independence. The static feature distribution setup ignores temporal dynamics over utterances which may introduce hidden cross-dimension dependencies. The operational feature groupings involve partial overlaps (e.g., shared formants and voice quality markers), meaning results reflect the chosen feature partitioning rather than abstract speech dimensions. Furthermore, corpus demographics are constrained and do not exhaustively represent all global accents, pathologies, or emotional expressions.

## Why read this

Speech and ML researchers building disentangled representation architectures or multi-task speech models should read this to understand whether semantic speech dimensions are statistically independent. It provides rigorous mathematical tooling (bounded MINE/CLUB/KSG estimation) and empirical baselines demonstrating that acoustic dimensions operate in near-independent subspaces.

## Code

- https://github.com/avrpixel-design/P1

## Applications

Guiding the design of multi-task speech encoders with separate pathways, setting principled regularization targets for disentanglement, and informing feature selection for emotion recognition and clinical speech assessment.

## Institutions / 機構

Deakin University, Technical University of Munich, Imperial College London

**Funding / 經費:** Networked Sensing and Biomedical Engineering Research Lab, Deakin University

## Related

- (link related pages by id as the wiki grows)
