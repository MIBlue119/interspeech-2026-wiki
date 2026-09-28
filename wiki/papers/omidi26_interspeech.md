---
id: omidi26_interspeech
category: speech-emotion-recognition
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2992
pdf: https://www.isca-archive.org/interspeech_2026/omidi26_interspeech.pdf
---

# Learning from Annotation Uncertainty: Entropy-Aware Curriculum for Speech Emotion Recognition

*Zahra Omidi, John Hansen*

[PDF](https://www.isca-archive.org/interspeech_2026/omidi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/omidi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2992)

**TL;DR** — This paper investigates distribution-based supervision for 9-class speech emotion recognition (SER) using a WavLM-Base multitask model, demonstrating that training on annotator vote distributions instead of hard consensus labels significantly improves human vote alignment and reduces distribution divergence.

## Key contributions

- A controlled evaluation comparing hard-label vs. distribution-based supervision on the full 9-class MSP-Podcast 2.0 benchmark.
- Formulation of merged primary-secondary emotion distributions (0.9P/0.1S and 0.8P/0.2S) to capture non-unique emotional perceptions and perceptual ambiguity.
- A unified WavLM-based multitask framework jointly predicting categorical emotion distributions and continuous VAD (Valence, Activation, Dominance).
- An entropy-aware analysis and curriculum design (filtering and weighting strategies based on normalized Shannon entropy) evaluated across ambiguity levels.

## Problem

Speech emotion recognition traditionally relies on hard consensus labels, collapsing multi-rater annotator disagreement into a single discrete ground truth. Prior work treats rating variance as annotation noise rather than meaningful perceptual ambiguity, obscuring mixed emotional interpretations. This is particularly problematic in imbalanced multi-class benchmarks like MSP-Podcast 2.0, where hard consensus training forces ambiguous utterances into a residual 'Other' category, limiting models' ability to capture graded human emotion perception.

## Method

The model builds on a Temporal Convolution (TC) and two-layer GRU framework taking frame-level representations from a pretrained WavLM-Base backbone (95.96M total parameters). WavLM layers are progressively unfrozen at epochs 1, 2, 4, and 12 with layer-wise learning rate scaling. The backbone outputs project into a shared 256-dimensional utterance embedding, which feeds two task-specific heads: a categorical emotion head (9 classes) and a VAD regression head parameterized by predicted mean and variance.

The multitask objective combines categorical loss (weighted 1.0) and VAD heteroscedastic Gaussian NLL loss with CCC regularization (weight 0.3). Hard-label baselines use cross-entropy (CE) or class-balanced CE (CBCE), while distribution-based systems minimize Kullback-Leibler Divergence (KLD) against primary or merged primary-secondary emotion distribution vectors (using alpha weights 0.9P/0.1S and 0.8P/0.2S). Normalized Shannon entropy computed from the merged distribution serves as a fixed utterance-level property for ambiguity-stratified evaluation and curriculum design.

Entropy-based curricula are applied exclusively to the categorical branch. Filtering schedules dynamically update the training subset across quantiles (0.50 to 1.00) at epochs 1, 2, 4, 8, 12, starting with either low-entropy (standard) or high-entropy (reverse) subsets. Weighting schedules scale sample loss contributions by entropy weights instead of dropping data.

## Experimental setup

Experiments use the official speaker-independent splits of MSP-Podcast 2.0 (169,190 train, 34,399 dev, 46,286 Test1, 14,822 Test2 utterances from 3,641 speakers). Baselines compare hard CE, hard CBCE, primary-distribution KLD, and merged-distribution KLD, alongside various entropy-aware filtering and weighting curricula. Metrics include Macro-F1, Unweighted Accuracy Rate (UAR), Jensen-Shannon Divergence (JSD), Kullback-Leibler Divergence (KLD), and Concordance Correlation Coefficient (CCC). Training uses AdamW (WavLM LR: 1e-5, heads LR: 1e-4), a NewBob scheduler, batch size 32, mixed precision, and early stopping on dev Macro-F1 up to 18 epochs on NVIDIA A30 GPUs.

## Results

Distribution-based supervision consistently reduces divergence metrics relative to hard training, achieving Test1 JSD of 0.185 (M90-Filter) and 0.189 (M90-KLD) compared to 0.322 for Hard-CE. On Test2, M90-Filter achieves a JSD of 0.194 vs 0.340 for Hard-CE. While hard-label systems maintain competitive Macro-F1 (e.g., Hard-CE achieving 28.7% on Test1 and 26.3% on Test2), analysis shows this is partly driven by the residual 'Other' class (Other-class F1 of 22.8 on Test1), whereas distributional models yield near-zero Other-class F1 by redistributing uncertainty across emotion categories. Entropy-aware curricula improve performance: M90-Filter achieves the highest Test1 Macro-F1 (34.8%), and M90-Weight achieves the highest Test2 Macro-F1 (31.8%).

| System | Test1 M-F1 (%) | Test1 JSD | Test2 M-F1 (%) | Test2 JSD |
|---|---|---|---|---|
| Hard - CE | 28.7 ± 2.1 | 0.322 | 26.3 ± 2.5 | 0.340 |
| Hard - CBCE | 28.4 ± 0.5 | 0.329 | 20.1 ± 3.2 | 0.356 |
| Prim - KLD | 28.4 ± 0.5 | 0.203 | 21.0 ± 3.1 | 0.211 |
| M90 - KLD | 29.2 ± 0.5 | 0.189 | 28.2 ± 2.7 | 0.199 |
| M90 - Filter | 34.8 ± 0.5 | 0.185 | 31.5 ± 3.6 | 0.194 |
| M90 - Weight | 27.5 ± 2.1 | 0.186 | 31.8 ± 3.3 | 0.194 |

## Limitations

Entropy estimated from a limited number of annotators per utterance is an imperfect proxy for true perceptual ambiguity. High-entropy utterances remain exceptionally challenging across all models, with performance dropping sharply in high-ambiguity bins regardless of supervision strategy. The scope is bounded to a single corpus (MSP-Podcast 2.0) and English-language speech, and relies on a fixed WavLM-Base backbone architecture.

## Why read this

Researchers and engineers building SER systems should read this to understand the limitations of hard consensus labels and how to implement distribution-based supervision and uncertainty-aware curricula for better probabilistic emotion modeling.

## Code

- https://github.com/zahraomidi/MSP-PODCAST

## Applications

Robust speech emotion recognition, affective computing, conversational agents, and mental health monitoring systems requiring nuanced modeling of emotional ambiguity.

## Related

- (link related pages by id as the wiki grows)
