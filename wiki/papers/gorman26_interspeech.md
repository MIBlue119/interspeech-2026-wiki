---
id: gorman26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2829
pdf: https://www.isca-archive.org/interspeech_2026/gorman26_interspeech.pdf
---

# Shifting Relational Paradigms for Affective Computing: Affective Resonance, Vitality Affects, and Vocal Interaction Fields

*Cy Gorman, Yihang Yao*

[PDF](https://www.isca-archive.org/interspeech_2026/gorman26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gorman26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2829)

**TL;DR** — This paper proposes shifting affective computing from an individual-state classification paradigm to a relational framework modeling interactional fields, demonstrating via WavLM representations on the AMI corpus that directional expressive coupling is regime-specific and concentrated at sub-second timescales under mutual co-presence. Grounded in affective resonance and vitality affects, the study introduces design frameworks (ARDO and AARI) for systems that participate in vocal interaction dynamics.

## Key contributions

- A null-calibrated directional coupling framework that corrects for size inflation in short-window autoregressive testing.
- An interaction-regime decomposition method that provides within-corpus empirical controls by separating overlapping and exclusive speech.
- A multi-speaker conditional analysis using 4-speaker vector autoregression to eliminate group-level confounds like shared laughter or topic shifts.
- Empirical findings on the AMI Meeting Corpus showing that expressive vocal coupling is concentrated at sub-second lags under mutual co-presence and collapses when mutual orientation is removed.

## Problem

Conventional affective computing models individual emotional states by mapping acoustic, linguistic, or physiological signals to discrete emotion categories or dimensional arousal-valence spaces, treating affect as an internal personal attribute. However, this individual-state framing fails to capture how affective behaviour unfolds relationally over time as an emergent property of a shared interactional field. Prior speech entrainment research typically treats coupling as growing feature similarity or relies on bivariate, single-feature Granger-causal approaches without interaction-regime decomposition. Consequently, the field lacks robust computational models for pre-semantic vocal resonance and vitality dynamics that operate upstream of categorical emotion labels.

## Method

The empirical study analyzes four-speaker meeting audio from the AMI Meeting Corpus, using close-talking headset channels resampled to 16 kHz and segmented into non-overlapping 60-second windows. Continuous hidden states from all 12 transformer layers of WavLM-Base+ are extracted without quantization or K-means clustering to preserve dense paralinguistic and prosodic information. A cross-layer activation dispersion statistic (expressiveness) is derived and residualized against energy within each regime-contiguous episode to isolate temporal-dynamic richness from overall magnitude. Interaction conditions are decomposed via voice activity masks into Tier A (overlapping speech/mutual co-presence), Tier B (pooled non-overlapping activity), and Tier C (directional exclusive activity as an empirical control). Directional Granger causality and linear predictive dependence are tested using bivariate and 4-speaker conditional vector autoregression (VAR) models across micro-scale (<= 1 s) and macro-scale (> 1 s) lags. Because short-series episode durations induce lag-selection size inflation, observed rejections are benchmarked against matched circular-shift nulls, with window-level directionality summarized using signed Directionality Support Scores (DSS) under False Discovery Rate control (Window-BH and Global-FDR).

## Experimental setup

The evaluation uses four-speaker meeting audio from the AMI Meeting Corpus processed in 60-second windows. The method compares bivariate versus 4-speaker conditional vector autoregression models across micro and macro timescales under different interaction tiers (A, B, C). Metrics include null-calibrated excess significance (OBS-NULL percentage points at q = 5% and q = 1%) and the signed Directionality Support Score distribution.

## Results

At the q = 5% operating point, Tier A (overlapping speech) micro-scale analysis shows approximately +6.6 percentage points of excess significance under the bivariate model and +7.4 percentage points under the energy-controlled conditional analysis. Window-level directionality is sparse but structured, with Tier A showing the highest non-zero support mass (e.g., 23.7% positive and 23.9% negative support under Window-BH), whereas Tiers B and C shift heavily toward zero support, indicating that coupling collapses outside mutual co-presence. Circular-shift null evaluations reveal that uncalibrated short-series lag selection suffers from 1.7x to 3.5x size inflation, validating the necessity of null calibration. The approach does not show strong macro-scale or non-co-present directional coupling, demonstrating that effects are strictly localized to sub-second mutual interaction regimes.

| Scale / Tier | Mode / Model | n_obs / n_null | OBS-NULL Excess (q=5%) | Notable DSS Distribution ||
|---|---|---|---|---|
| micro A | overlap / bivariate | 20,745 (null) | +6.6 pp | 23.7% (+1), 52.4% (0), 23.9% (-1) |
| micro A | overlap / conditional | - | +7.4 pp | - |
| micro B | xor / null-calibrated | 8,545 (null) | Near zero | 14.1% (+1), 66.2% (0), 19.7% (-1) |
| micro C | x not y / null-calibrated | 2,460 (null) | Near zero | 0.0% (+1), 98.4% (0), 1.6% (-1) |

## Limitations

The expressiveness proxy measures latent vocal-production modulation rather than subjective emotional valence or discrete categories. Granger analysis captures linear predictive dependence rather than non-linear transfer entropy or directional convergence/divergence. Results are restricted to the AMI Meeting Corpus, Tier B macro analysis is underpowered (n=18 windows), and directional support scores depend on sensitivity to FDR and run-fraction parameters.

## Why read this

Speech and ML researchers building conversational agents, affective computing pipelines, or social robotics systems should read this to understand how to model interactional fields and directional vocal coupling instead of relying solely on individual-state emotion classification.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Interactive social robotics, empathetic conversational agents, and real-time multi-party meeting analysis systems.

## Related

- (link related pages by id as the wiki grows)
