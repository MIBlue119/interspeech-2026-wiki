---
id: singh26e_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3451
pdf: https://www.isca-archive.org/interspeech_2026/singh26e_interspeech.pdf
---

# ProSarc: Prosody-Aware Sarcasm Recognition Framework via Temporal Prosodic Incongruity

[PDF](https://www.isca-archive.org/interspeech_2026/singh26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/singh26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3451)

**TL;DR** — ProSarc is an audio-only sarcasm detection framework that models temporal prosodic incongruity and achieves an F1 score of 75.3 on MUStARD++.

## Problem

Prior audio-only sarcasm detection systems predominantly rely on static utterance-level acoustic statistics or implicit temporal representations, ignoring the local prosodic dynamics through which sarcasm is actually realized. Multimodal models, on the other hand, tend to be dominated by textual or visual cues while treating audio merely as an auxiliary signal. Explicitly capturing the mismatch between fine-grained local prosodic changes and the global emotional baseline is crucial for robust, unimodal speech understanding under ambiguity.

## Method

ProSarc uses a dual-path architecture combining a Global Emotion Encoder (extracting a 10-dimensional prosodic feature vector via librosa processed through a 3-layer MLP) and a Temporal Prosody Encoder (employing a partially fine-tuned self-supervised speech model like Wav2Vec 2.0, HuBERT, or WavLM, followed by a bidirectional LSTM and multi-head self-attention). A Prosodic Incongruity Analyzer computes an explicit scalar incongruity score via an MLP and sigmoid, acting as a gating mechanism to adaptively fuse local and the global representations. The framework uses Monte Carlo dropout at inference for uncertainty estimation and an attention-based mechanism for weakly supervised temporal onset localisation.

## Results

Evaluated across four benchmarks using 5-fold cross-validation, ProSarc achieves an F1 score of 75.3 on MUStARD++, 74.4 on MUStARD, 62.9 on PodSarc, and 65.6 on MuSaG. Statistical validation via a 10-run evaluation confirms the effectiveness of incongruity modelling with a Wilcoxon p-value of 0.002 and a Cohen's d of 1.51. Human evaluations verify that model uncertainty successfully tracks perceptual ambiguity and predicted onset windows align with human annotations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and affective computing researchers building on-device or audio-first spoken language understanding applications for content moderation, conversational agents, and media analysis.

## Related

- (link related pages by id as the wiki grows)
