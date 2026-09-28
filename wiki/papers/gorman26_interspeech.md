---
id: gorman26_interspeech
category: affect-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2829
pdf: https://www.isca-archive.org/interspeech_2026/gorman26_interspeech.pdf
---

# Shifting Relational Paradigms for Affective Computing: Affective Resonance, Vitality Affects, and Vocal Interaction Fields

[PDF](https://www.isca-archive.org/interspeech_2026/gorman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gorman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2829)

**TL;DR** — This paper introduces a relational framework and null-calibrated directional coupling analysis for affective computing, demonstrating that vocal expressive coupling in multi-party conversations is concentrated at sub-second timescales under mutual co-presence.

## Problem

Traditional affective computing relies on an individual-state paradigm that maps isolated speaker signals to discrete labels or arousal-valence dimensions, ignoring how relational dynamics unfold over time. Existing entrainment research typically measures feature convergence rather than directional interaction, while Granger-causal approaches remain rare and limited to bivariate, single-feature setups. This gap prevents systems from modeling field-level emergent phenomena like affective resonance and vitality dynamics.

## Method

The authors propose Affective Resonance Dynamic Ontologies (ARDO) and Artificial Affective Resonance Intelligence (AARI) to model vocal interaction fields. Using continuous floating-point hidden states extracted from all 12 transformer layers of WavLM-Base+ without quantization or clustering, the system preserves dense prosodic and paralinguistic dynamics. A cross-layer activation dispersion statistic measures moment-to-moment expressive richness, residualized against energy to avoid scalar energy confounds. Directional Granger causality is evaluated using both bivariate and four-speaker conditional vector autoregression (VAR) models on regime-contiguous episodes from the AMI Meeting Corpus. To counter short-series size inflation, the framework applies null-calibrated circular-shift tests and controls the false discovery rate using both Window-BH and Global-FDR methods across micro (<=1s) and macro (>1s) time lags.

## Results

Evaluated on four-speaker meeting audio from the AMI Meeting Corpus divided into interaction tiers (Tier A for overlapping speech, Tier B for pooled non-overlapping activity, and Tier C for directional exclusive activity), the results show that directional coupling is reliably detected primarily at sub-second micro-scale lags under mutual co-presence. Tier A micro exhibits the highest non-zero support mass with near-symmetric directional wins, whereas Tiers B and C shift strongly toward zero support. At a 5% false discovery rate, Tier A micro achieves approximately +6.6 percentage points under bivariate modeling and +7.4 percentage points under energy-controlled conditional analysis above the matched circular-shift null.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and human-computer interaction designers building social robotics, conversational agents, and affective computing systems that participate in dynamic interactional fields rather than merely classifying individual states.

## Limitations

The empirical study serves as a conceptual proof of principle restricted to the AMI Meeting Corpus, with generalisation to other corpora and non-linear extensions like transfer entropy left for future work.

## Related

- (link related pages by id as the wiki grows)
