---
id: thai26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-949
pdf: https://www.isca-archive.org/interspeech_2026/thai26_interspeech.pdf
---

# Contrastive Regularization for Accent-Robust ASR

[PDF](https://www.isca-archive.org/interspeech_2026/thai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/thai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-949)

**TL;DR** — This paper integrates supervised contrastive learning as an auxiliary regularization objective during CTC-based ASR fine-tuning, achieving up to a 29% relative word error rate reduction on unseen accents without architectural changes.

## Problem

Self-supervised ASR systems struggle with acoustic and pronunciation variability in non-native and multi-accent settings. Existing multi-accent strategies typically require explicit accent metadata, specialized classifiers, or heavy model modifications. This work targets an accent-invariant regularization approach that leverages transcript supervision alone without needing explicit accent labels or architectural alterations.

## Method

The framework pairs a standard self-supervised acoustic encoder (wav2vec 2.0 or WavLM, base and large variants) and a CTC decoding head with an auxiliary supervised contrastive loss (SupCon) applied at the utterance level. Utterances sharing identical transcripts spoken by different individuals are treated as positive pairs. Encoder frame-level hidden states are mean-pooled and mapped through a lightweight two-layer MLP projection head with ReLU and L2 normalization to compute the contrastive objective using cosine similarity and a temperature parameter. A scheduled warm-up strategy gradually ramps the contrastive loss weight to stabilize early training optimization, while the auxiliary projection head is discarded entirely during inference.

## Results

Evaluated on the L2-ARCTIC benchmark across unseen-transcript (UT) and unseen-accent (UA) settings using wav2vec 2.0 Large, the model reduces word error rate from 10.47% to 9.14% (UT) and from 9.98% to 7.41% (UA). Across an ablation study encompassing base and large variants of wav2vec 2.0 and WavLM with both greedy and 4-gram LM decoding, SupCon consistently improves performance, with relative gains being most prominent under unseen accent conditions. Representation geometry analysis via within-transcript cosine dispersion demonstrates a 17% relative reduction in mean dispersion, indicating more compact and stable embedding clusters.

## Code

- https://github.com/thaivanphat95/robust-atc-asr

## Applications

Speech engineers building robust global ASR systems or deploying speech recognition models in multi-accent environments with limited accent supervision.

## Limitations

The evaluation relies on benchmark conditions featuring naturally repeated transcripts across speakers, meaning scenarios lacking repeated transcripts require alternative positive-pair mining strategies.

## Related

- (link related pages by id as the wiki grows)
