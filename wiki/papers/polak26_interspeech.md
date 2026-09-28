---
id: polak26_interspeech
category: speech-translation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-575
pdf: https://www.isca-archive.org/interspeech_2026/polak26_interspeech.pdf
---

# Better Late Than Never: Meta-Evaluation of Latency Metrics for Simultaneous Speech-to-Text Translation

*Peter Polák, Sara Papi, Luisa Bentivogli, Ondřej Bojar*

[PDF](https://www.isca-archive.org/interspeech_2026/polak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/polak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-575)

**TL;DR** — This paper presents the first comprehensive meta-evaluation of latency metrics for simultaneous speech-to-text translation (SimulST), uncovering structural segmentation biases and introducing YAAL, LongYAAL, and SOFTSEGMENTER within the OMNISTEVAL toolkit. Through extensive analysis of IWSLT shared task systems, the authors demonstrate that while traditional metrics suffer from anomalies caused by tail words and degenerate policies, the proposed methods achieve over 93-98% accuracy in approximating true latency.

## Key contributions

- Comprehensive meta-evaluation of existing short-form and long-form SimulST latency metrics (AL, LAAL, DAL, ATD, AP, StreamLAAL) across multiple language pairs and datasets.
- Identification of a structural segmentation bias and 'degenerate simultaneous policies' where models output a low-latency prefix but translate most content offline after segment ends.
- Introduction of YAAL (Yet Another Average Lagging) for short-form evaluation and LongYAAL for continuous unsegmented audio streams.
- Proposal of SOFTSEGMENTER, a soft word-level alignment resegmentation tool that improves long-form latency measurement accuracy over standard MWERSEGMENTER baselines.
- Release of all metrics, tools, and evaluation infrastructure within the OMNISTEVAL open-source toolkit.

## Problem

Evaluating latency in simultaneous speech translation is challenging because current metrics (AL, LAAL, DAL, AP, ATD) rely on simplifying and unrealistic assumptions such as uniform word durations, lack of pauses, and strict monotonic alignments. These metrics frequently produce conflicting system rankings, as highlighted by inconsistencies in the IWSLT 2023 Shared Task. Furthermore, shifting from artificial short-form pre-segmented audio to unsegmented long-form audio introduces severe boundary ambiguity, making standard metrics unreliable and susceptible to distortion from tail words and system overgeneration.

## Method

The paper analyzes how short-form chunking forces simulators to request remaining translations as instantaneous 'tail words' once an input segment is consumed, distorting standard metrics. To isolate true simultaneous behavior, the authors introduce YAAL, which shifts the cutoff point to include only words generated strictly before the end of the input stream. Additionally, a diagnostic test based on the difference between expected and observed simultaneous word fractions is established to detect degenerate policies where |W_expected - W_actual| > 20%.

For unsegmented long-form evaluations, direct application of short-form metrics fails due to variable source-to-target length ratios (gamma) across segments. To fix this, the authors develop SOFTSEGMENTER, a resegmentation tool that matches translation hypotheses to reference segments using a soft alignment scoring function. This function prevents token alignment to future reference segments, restricts punctuation-to-non-punctuation mappings, and maximizes character-level similarity S_char(tr, th) = (tr intersect th) / (tr union th).

Finally, LongYAAL extends YAAL to continuous audio streams by including words generated beyond intermediate segment boundaries up until the end of the full stream S, while still omitting final stream tail words. All implementations are consolidated in the OMNISTEVAL codebase.

## Experimental setup

Evaluated on short-form logs from IWSLT 2022 and 2023 Simultaneous tracks and MuST-C tst-COMMON across EN->DE, EN->JA, and EN->ZH. Long-form evaluation utilizes IWSLT 2025 logs, ACL 60/60 dataset, and IWSLT 2024/2025 development and test sets for EN->DE, EN->ZH, EN->JA, and CS->EN. Metrics are assessed using pairwise system comparisons, bootstrap resampling (N=10000), and binary classification accuracy against a gold-standard 'true latency' calculated via Montreal Forced Aligner / WhisperX word timestamps and awesome-align.

## Results

Across short-form evaluations, YAAL achieves a headline accuracy of 98% in predicting true system rankings when considering all systems, compared to AL (64%), LAAL (67%), DAL (57%), ATD (54%), and AP (73%). When filtering out degenerate simultaneous policies, YAAL and LAAL tie at 99% accuracy. In long-form regimes, unsegmented metrics perform poorly (AL at 65%), but resegmentation dramatically improves accuracy. SOFTSEGMENTER combined with LongYAAL, LongLAAL, or LongDAL reaches 94% accuracy, outperforming the baseline StreamLAAL (using MWERSEGMENTER) which scores 82%. LongAP performs worst at 71% accuracy due to sensitivity to variable segment lengths.

| System / Metric Condition | Accuracy (Short-Form All) | Accuracy (Short-Form Filtered) | Accuracy (Long-Form Resegmented) |
| :--- | :--- | :--- | :--- |
| AL / LongAL | 0.64 | 0.96 | 0.92 |
| LAAL / LongLAAL | 0.67 | 0.99 | 0.94 |
| DAL / LongDAL | 0.57 | 0.97 | 0.94 |
| ATD / LongATD | 0.54 | 0.93 | 0.93 |
| AP / LongAP | 0.39 | 0.88 | 0.71 |
| YAAL / LongYAAL (Proposed) | **0.98** | **0.99** | **0.94** |

## Limitations

The study's empirical analysis is constrained to IWSLT shared task submissions, which may not capture the full diversity of industrial architectures or streaming paradigms. Evaluations focus primarily on high-resource language pairs due to data availability, leaving low-resource validation for future work. Furthermore, word-level alignment tools (like awesome-align and WhisperX) remain vulnerable to errors in noisy audio or disfluent speech.

## Why read this

Speech translation researchers and ML engineers building streaming systems should read this to understand why standard latency metrics yield inconsistent evaluations and how to rigorously benchmark simultaneous models without segmentation bias.

## Code

- https://github.com/pe-trik/OmniSTEval

## Applications

Simultaneous speech translation system evaluation, benchmark design for real-time speech-to-text pipelines, and diagnostic auditing of commercial translation latency.

## Related

- (link related pages by id as the wiki grows)
