---
id: moon26b_interspeech
category: paralinguistics-emotion
institutions: ["Dartmouth College"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2989
pdf: https://www.isca-archive.org/interspeech_2026/moon26b_interspeech.pdf
---

# When Does Quality-Aware Multimodal Fusion Matter? A Leakage-Safe Diagnostic for Decision-Level Dependence

*Jaden Moon, Arvind Pillai, Andrew Campbell*

[PDF](https://www.isca-archive.org/interspeech_2026/moon26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/moon26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2989)

**Category:** `paralinguistics-emotion`

**TL;DR** — The paper investigates whether quality-aware multimodal fusion models actually use estimated reliability scores during inference or if the improvements are coincidental. Using a leakage-safe diagnostic that shuffles test-time quality values while keeping evidence frozen, the authors demonstrate that native quality estimates produce near-zero performance changes, proving that current reliability signals have minimal decision-level influence.

## Key contributions

- Proposed a leakage-safe, alignment-breaking diagnostic that tests decision-level reliance on quality scores by shuffling quality estimates while freezing experts and fusion rules.
- Demonstrated empirically on StressID and CMU-MOSEI that native quality scores yield near-zero performance shifts despite significant headroom for optimal per-example routing.
- Validated the diagnostic with positive controls showing that artificial alignment with corruption or unimodal correctness yields large, statistically significant performance gaps.
- Separated availability (outage) from degradation (quality) to evaluate the true role of quality metrics in multimodal affect and stress recognition.

## Problem

Multimodal systems frequently integrate heterogeneous signals like speech, video, and physiology, often weighting them with estimated quality or reliability scores. However, it remains fundamentally unclear whether these quality scores actively drive model decisions at inference time or merely correlate with performance data through dataset biases or missingness patterns. Standard evaluations only report overall architectural performance rather than testing whether the quality signal itself is decision-relevant. This creates a false sense of security where systems are labeled as 'quality-aware' even if their routing mechanisms ignore the reliability estimates.

## Method

The authors evaluate multimodal inference through a decision rule separating evidence E, availability masks M, and quality scores Q. They train unimodal experts independently on observed training data: Wav2Vec2-base for audio, an AffectNet-based encoder for facial video, and MOMENT-1-large for physiological time-series (ECG and EDA). These unimodal encoders and their respective classifiers (logistic regression and histogram-based gradient boosting) are completely frozen after training. The fusion rules are then trained exclusively on top of the frozen expert posterior probabilities using either a quality-aware late-fusion rule (weighting experts by normalized quality) or a conditioning-aware mixture of experts (a linear softmax router taking availability and quality features as input).

To perform the diagnostic, the authors construct an alignment-breaking test where Clean-Q uses observed quality values at inference, and Broken-Q shuffles quality scores across held-out test rows for each modality while keeping sensory evidence E and availability M entirely fixed. This isolates the effect of quality-evidence alignment from missingness by restricting evaluation strictly to fully observed instances. The identifiability statistic measures the permutation gap (Delta_perm) via Balanced Accuracy, using a one-sided permutation test to calculate p-values under the null hypothesis that predictions are invariant to quality shuffling.

## Experimental setup

Evaluated primarily on StressID (combining 39+ hours across 65 participants and 11 tasks with natural asymmetric availability) and secondarily on CMU-MOSEI (23,453 opinion segments across 3,228 videos as a nearly fully observed boundary case). Baselines include uniform late fusion, quality-weighted late fusion, and conditioning-aware mixture-of-experts (MoE) models driven by logistic regression (LR) and histogram-based gradient boosting (HGB) classifiers. Cross-validation uses 5 seeds by 5 StratifiedGroupKFold splits (25 total folds) with subject-disjoint (StressID) or video-disjoint (CMU-MOSEI) partitions.

## Results

On StressID fully observed test rows, audio is the strongest unimodal expert with a Balanced Accuracy of 0.592 (LR) and 0.569 (HGB), compared to physiology (0.484/0.488) and video (0.454/0.466). Despite an oracle headroom of roughly 0.35 to 0.37 indicating massive room for improved routing, shuffling native quality values produces near-zero performance drops: Delta_perm is -0.002 for LR late fusion, -0.011 for HGB, and -0.003 for Mixture of Experts. In contrast, positive controls where quality is artificially aligned with corruption or unimodal correctness yield significant positive gaps of +0.071 (p=0.020) and +0.346 (p=0.005) respectively. Similarly, on the CMU-MOSEI boundary case, the Clean-Broken gap is small and non-significant at 0.004 despite an oracle headroom of 0.216.

Where it does not win: The diagnostic reveals that native quality estimates completely fail to drive decisions, showing that current quality-aware architectures do not successfully leverage native reliability metrics.

| System / Condition | Delta_perm | p_median | Oracle Headroom |
| --- | --- | --- | --- |
| LR Late/MoE Fusion | -0.002 ± 0.06 | 0.57 | 0.361 ± 0.08 |
| HGB Fusion | -0.011 ± 0.06 | 0.71 | 0.352 ± 0.08 |
| Mixture of Experts (MoE) | -0.003 ± 0.02 | 0.66 | 0.372 ± 0.07 |
| Corruption Control (Q_syn) | +0.071 ± 0.03 | 0.020 | N/A |
| Sufficiency Control (Q_align) | +0.346 ± 0.06 | 0.005 | N/A |

## Limitations

The proposed structural diagnostics require ground-truth labels and serve strictly as post-hoc evaluation tools rather than live deployment mechanisms. Fully observed evaluations successfully isolate quality effects but ignore complex interactions between quality and real-world modality outages. Furthermore, positive controls and dataset-specific validations are currently limited to StressID and CMU-MOSEI, lacking extension to early- or mid-fusion attention-based architectures without explicit representation-level interventions.

## Why read this

Speech and ML engineers building multimodal systems should read this paper to realize that architectural 'quality-awareness' does not guarantee that reliability scores actually influence model decisions. It provides a concrete, leakage-safe diagnostic framework to audit whether fusion models truly utilize reliability signals or merely benefit from data correlations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust multimodal affect recognition, stress detection, and sentiment analysis systems requiring reliable decision-making under noisy or degraded sensor conditions.

## Institutions / 機構

Dartmouth College

## Related

- [EmoEUS: Uncertainty Supervision for Multimodal Emotion Recognition in Conversation](huang26n_interspeech.md) — same problem · relatedness 2.3/3
- [The Illusion of Balanced Multimodal Sentiment Analysis: Beyond the Limits of Optimization-Based Methods](kaffeza26_interspeech.md) — same problem · relatedness 2.1/3
- [All That Glitters Is Not Audio: Rethinking Text Priors and Audio Reliance in Audio-Language Evaluation](foo26_interspeech.md) — shared technique · relatedness 2.0/3
- [Segregate, Refine, Integrate: Decomposing Multimodal Fusion for Sentiment Analysis](filippakopoulos26_interspeech.md) — same problem · relatedness 1.9/3
- [MER-Live: An Interactive Browser Demo of Prosody-Driven Multimodal Emotion Recognition](song26h_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
