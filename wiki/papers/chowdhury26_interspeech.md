---
id: chowdhury26_interspeech
category: paralinguistics-emotion
institutions: ["Colby College"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3052
pdf: https://www.isca-archive.org/interspeech_2026/chowdhury26_interspeech.pdf
---

# Predicting Cognitive Load from Speech and Interaction Dynamics in Dyadic Conversations

*Tahiya Chowdhury*

[PDF](https://www.isca-archive.org/interspeech_2026/chowdhury26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chowdhury26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3052)

**Category:** `paralinguistics-emotion`

**TL;DR** — This paper investigates predicting continuous perceived cognitive load in dyadic conversations using speech acoustics and interaction dynamics, achieving a dyad-level CCC of 0.51 for temporal demand.

## Key contributions

- Formulates cognitive load estimation in collaborative conversations as a regression task rather than multi-class classification.
- Systematically evaluates static acoustic (eGeMAPS), temporally dynamic (deltas), and conversational interaction features.
- Uses a Leave-One-Dyad-Out (LODO) cross-validation protocol on 53 diverse dyads across 9 tasks to ensure cross-dyad generalizability.
- Demonstrates that combining turn-taking interaction features with acoustic features significantly boosts predictive performance.

## Problem

Estimating cognitive load from speech has traditionally relied on controlled laboratory settings and single-task evaluations, treating load as discrete classification classes. Prior approaches often use random data splits that risk data leakage and fail to generalize to unseen conversational partners (out-of-sample dyads). Furthermore, most works focus purely on individual vocal acoustics while ignoring conversational interaction dynamics and temporal coordination, which are crucial in remote collaborative work environments.

## Method

The dataset is pre-processed by splitting audio into non-overlapping 30-second windows and applying Silero VAD to filter out silence and extract speaking activity. Static acoustic features (88-dimensional eGeMAPS) and temporally dynamic features (first-order differences over consecutive windows) are extracted using OpenSMILE. In addition, 10 conversational interaction features—such as speaking fractions, dominance differences, turn switches, and overlap rates—are computed from VAD timing.

For sequence modeling, the paper uses a shared Gated Recurrent Unit (GRU) encoder. Paired participant sequences are processed, mean-pooled across time steps, concatenated, and fed into a fully connected layer with 128 hidden units, ReLU activation, and 0.2 dropout. Training uses a joint mean squared error (MSE) loss summed across both participants, optimized with Adam (learning rate 10^-3) for 25 epochs. A Random Forest regression baseline (300 estimators, minimum leaf size 2) is used alongside GRU variants with and without attention.

## Experimental setup

Evaluated on the AVCAffe dataset consisting of 53 dyads (106 participants from 18 countries) performing 9 diverse collaborative tasks ranging from open discussions to complex problem solving, totaling 475 task-level paired samples. Evaluated using Leave-One-Dyad-Out (LODO) cross-validation across 10 random seeds. Primary metrics include Concordance Correlation Coefficient (CCC), Pearson Correlation Coefficient (PCC), and Root Mean Squared Error (RMSE).

## Results

For temporal demand, the baseline Random Forest achieved a dyad-level CCC of 0.33, while the GRU model reached 0.41. Incorporating interaction features alongside acoustic features elevated the dyad-level CCC to 0.51 for temporal demand and improved mental demand prediction from 0.22 to 0.32. Permutation feature importance revealed that temporal demand is primarily driven by turn-taking dynamics, overlap, and switching rates, whereas mental demand is linked to speaking-time imbalances and conversational dominance.

Notably, Wilcoxon signed-rank tests with Holm-Bonferroni correction showed no statistically significant performance difference between the GRU model and the Random Forest baseline (p = 0.21, corrected p = 0.41), indicating that sequence modeling offers limited gains over aggregated features at this data scale. Performance also showed extreme heterogeneity across individual dyads, with CCC ranging from highly positive (0.6 to 0.9) to inverse (negative) values for certain pairs.

| Model & Features | Temporal (CCC) | Mental (CCC) | Effort (CCC) | Performance (CCC) |
|---|---|---|---|---|
| Acoustic (A) - RF | 0.33 | 0.22 | - | - |
| Acoustic (A) - GRU | 0.42 | 0.22 | 0.20 | 0.19 |
| Temporal (T) - GRU | 0.35 | 0.27 | 0.15 | 0.21 |
| Interaction (I) - GRU | 0.51 | 0.28 | 0.13 | 0.16 |
| Acoustic + Interaction (A+I) | 0.46 | 0.32 | 0.34 | 0.31 |

## Limitations

The study relies on a relatively small dataset of 53 dyads and 475 samples, which restricts the capacity of sequence models like attention-based GRUs. Cognitive load ground truth labels are collected only at the end of each task via NASA-TLX, missing fine-grained within-task temporal variations. The evaluation is restricted to voice-activity-derived interaction and acoustic features, omitting richer multimodal signals such as video, gaze, and lexical content.

## Why read this

Read this paper if you are building collaborative speech interfaces, meeting assistants, or affective computing models that need to quantify remote worker workload. It provides a sobering evaluation of cross-dyad generalization and demonstrates why conversational turn-taking features outperform raw vocal acoustics alone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time cognitive load monitoring for remote meeting platforms, adaptive voice-mediated collaboration tools, and safety-critical communication systems.

## Institutions / 機構

Colby College

**Funding / 經費:** Henry Luce Foundation

## Related

- [Shifting Relational Paradigms for Affective Computing: Affective Resonance, Vitality Affects, and Vocal Interaction Fields](gorman26_interspeech.md) — same problem · relatedness 1.8/3
- [Steps toward a wearable-informed model of real-world listening effort and fatigue among adults with hearing loss](meng26e_interspeech.md) — same problem · relatedness 1.8/3
- [Automatic Detection of Stress from Speech in the Trier Social Stress Test](drimalla26_interspeech.md) — shared technique · relatedness 1.8/3
- [Deep learning-based predictions of perceived listening effort and intelligibility across enhanced, synthetic, natural, and binaural speech](hoffner26_interspeech.md) — same problem · relatedness 1.7/3
- [Beyond Binary: Speech Representations Across the Cognitive Score Hierarchy](kopar26_interspeech.md) — same problem · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
