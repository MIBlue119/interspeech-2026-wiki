---
id: omidi26_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2992
pdf: https://www.isca-archive.org/interspeech_2026/omidi26_interspeech.pdf
---

# Learning from Annotation Uncertainty: Entropy-Aware Curriculum for Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/omidi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/omidi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2992)

**TL;DR** — This paper evaluates distribution-based supervision and entropy-aware curricula for speech emotion recognition on MSP-Podcast 2.0, showing that modeling annotator vote distributions reduces divergence (JSD down to ~0.185 vs 0.322) compared to hard-label consensus.

## Problem

Speech emotion recognition traditionally relies on hard consensus labels that discard annotator disagreement as noise, masking the genuine perceptual ambiguity of emotional expressions. This hard-label framing forces models to exploit catch-all residual categories (like 'Other') to absorb ambiguous samples. Evaluating systems solely on hard decisions obscures how well models capture listener variance and structured emotional overlap.

## Method

The model builds on a WavLM-Base backbone (95.96M parameters) combined with a temporal convolution and a two-layer GRU, projecting into a 256-dimensional shared embedding. It utilizes a multitask architecture with two heads: a categorical head predicting emotion distributions and a VAD regression head with heteroscedastic Gaussian NLL and CCC regularization (weight 0.1). Training optimizes Kullback–Leibler Divergence (KLD) against target distributions derived from primary annotator votes or merged primary-secondary vote distributions (using α weights of 0.8 or 0.9). Additionally, an entropy-aware curriculum uses normalized Shannon entropy derived from annotator disagreement for sample filtering or loss weighting across epochs.

## Results

Evaluated on the 9-class MSP-Podcast 2.0 benchmark across official Test1 (46,286 utterances) and Test2 (14,822 utterances). Distributional supervision significantly improves human distribution alignment, dropping Jensen-Shannon Divergence (JSD) from 0.322 (Hard CE) to 0.185 (M90-Filter) on Test1 and from 0.340 to 0.194 on Test2. While hard-label cross-entropy models achieve competitive Macro-F1 scores partly by exploiting the residual 'Other' category (Other-class F1 of 22.8 on Test1), distribution-based methods correctly redistribute uncertainty across specific emotion categories (Other-class F1 near zero). Entropy-stratified evaluation confirms that high-ambiguity utterances remain challenging, but standard entropy filtering (M90-Filter) and weighting (M90-Weight) yield strong Macro-F1 and cross-split stability.

## Code

- https://github.com/zahraomidi/MSP-PODCAST

## Applications

Speech and ML engineers building robust affective computing systems, conversational agents, or mental health monitoring tools that need to model subjective emotional ambiguity rather than forcing hard categorical decisions.

## Limitations

Normalized entropy computed from a limited number of annotators serves as an imperfect proxy for perceptual ambiguity, and high-ambiguity utterances remain difficult to classify correctly under hard-decision metrics.

## Related

- (link related pages by id as the wiki grows)
