---
id: liao26b_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-209
pdf: https://www.isca-archive.org/interspeech_2026/liao26b_interspeech.pdf
---

# High-Precision Prosodic Boundary Anchors from Acoustic Cues under Weak Supervision

*Hanyu Liao, Xiaoluan Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/liao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-209)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper presents a weakly supervised framework that uses acoustic cues and positive-unlabeled (PU) learning to predict continuous prosodic boundary strengths without requiring manual ToBI labels, achieving a Prec@1% of 0.956 against punctuation proxies on Japanese speech.

## Key contributions

- A weakly supervised approach for identifying high-confidence prosodic boundary anchors from raw acoustic cues without manual label dependencies.
- A hierarchical anchor design (B1 and B2) that explicitly controls the precision-coverage trade-off using data-driven quantile thresholds.
- The application of non-negative positive-unlabeled (nnPU) learning to infer graded, continuous prosodic boundary strength scores over all candidate junctures.
- Comprehensive validation combining anchor statistics, acoustic cue-score consistency analyses, transcript punctuation enrichment, and a blinded perceptual audit (Fleiss' kappa of 0.657).

## Problem

Traditional prosodic boundary detection relies heavily on manual annotations like ToBI labels, which require extensive expert knowledge, are labor-intensive, and are completely absent in most speech corpora. Existing learning-based models typically assume fully labeled datasets or resort to rigid, dataset-specific heuristic rules combining acoustic and linguistic features. Furthermore, defining reliable negative "no-boundary" examples is fundamentally difficult because non-boundary cases are highly ambiguous and context-dependent. This paper addresses this gap by showing how reliable positive anchors can be automatically derived from acoustic evidence to enable principled weak supervision.

## Method

The framework operates on 164,323 word junctures extracted from a Japanese speech corpus, focusing on a pitch-valid subset of 132,031 instances where robust F0 is available. Stage 1 constructs a conservative positive anchor set (B1) using long pauses where pause duration $P \ge 200\text{ ms}$. Stage 2 refines B1 using data-driven quantile thresholds on pitch reset magnitude ($|\Delta F_0| \ge Q_{0.85}(|\Delta F_0|)$, yielding 5.58 semitones) and optional energy reduction ($\Delta \text{RMS} \le Q_{0.15}(\Delta \text{RMS})$, yielding $-7.71\text{ dB}$), producing a looser positive set ($B2_{base}$, 1,161 items) and a stricter subset ($B2_{strict}$, 250 items). A voicing gate requires at least 15 voiced frames (ratio $\ge 0.5$) in both pre- and post-boundary 0.3-second windows.

The system frames boundary detection as a strength estimation problem using the non-negative PU (nnPU) risk estimator with logistic loss. The classifier is a lightweight 1-layer MLP with 32 hidden units, ReLU activation, and a sigmoid output mapping to a continuous boundary strength score. Input features consist of five standardized cue variables: pause duration ($z_P$), pitch reset times voicing ($z_{F0} \times v$), energy change ($z_{RMS}$), and pre/post voicing ratios. The model is optimized using AdamW (learning rate $10^{-3}$, weight decay $10^{-4}$) for up to 4,000 steps with early stopping (patience 8), treating $B2_{base}$ as the positive set and the remaining candidates as unlabeled, with class prior $\pi = 0.01$.

## Experimental setup

Experiments are conducted on a large-scale Japanese speech corpus derived from the JVS corpus containing studio-quality read speech from 100 native speakers, yielding 164,323 total word junctures. The dataset is split speaker-disjointly into 80% training and 20% development sets. Evaluation metrics include class prior sensitivity ($\pi \in \{0.005, 0.01, 0.02\}$), transcript punctuation proxy enrichment (Precision@1% = 0.956, Prec@5% = 0.926, AUC = 0.740), and a blinded perceptual audit involving 60 high-score and 60 low-score samples judged by three raters.

## Results

The nnPU model achieves strong alignment with external proxies, yielding a Prec@1% of 0.956, a Prec@5% of 0.926, and an AUC of 0.740 against transcript punctuation marks. In a blinded perceptual audit, high-confidence $B2_{strict}$ anchors secured a perceived break rate of 0.467 compared to just 0.033 for low-score unlabeled candidates, with substantial inter-rater reliability (Fleiss' $\kappa = 0.657$). Sensitivity analysis over class priors $\pi \in \{0.005, 0.01, 0.02\}$ demonstrates stable ranking capability with Spearman correlations between $\rho \approx 0.89$ and $0.97$.

| System / Condition | Count | Punctuation Rate | Perceived Break Rate |
|---|---|---|---|
| Unlabeled (U) / Low-Score | 116,833 | 0.124 | 0.033 |
| B1 (Pause $\ge 200$ms) | 12,482 | 0.989 | - |
| B2_base (Voice + $\Delta F_0$) | 898 | 0.972 | - |
| B2_strict (Voice + $\Delta F_0$ + $\Delta$RMS) | 243 | 0.975 | 0.467 |

## Limitations

The study is currently restricted to read speech in a single language (Japanese), leaving cross-linguistic generalization and spontaneous speech adaptation unverified. The framework relies heavily on reliable automatic word alignments and stable F0 extraction, which can degrade in noisy acoustic environments or dense conversational dialogue. Additionally, the approach currently omits lexical, syntactic, and higher-level semantic contexts that often govern natural prosodic phrasing.

## Why read this

Speech researchers and engineers working on prosody, text-to-speech, or punctuation restoration will find this paper a practical blueprint for bypassing manual ToBI annotation bottlenecks using positive-unlabeled learning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving prosodic phrasing in text-to-speech (TTS) synthesis, automatic punctuation restoration, and acoustic modeling for spoken language understanding.

## Institutions / 機構

East China Normal University

## Related

- (link related pages by id as the wiki grows)
