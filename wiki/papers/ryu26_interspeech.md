---
id: ryu26_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1399
pdf: https://www.isca-archive.org/interspeech_2026/ryu26_interspeech.pdf
---

# Modality Importance is Not Static: Temporal Dynamics via Gating in Multimodal Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/ryu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ryu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1399)

**TL;DR** — This paper models multimodal emotion recognition as a dynamic decision process by introducing an emotion-query gating mechanism that adapts modality importance over time, achieving a 57.31% Macro-F1 on IEMOCAP.

## Problem

Standard multimodal emotion recognition systems rely on static, time-invariant fusion strategies that assume constant modality contributions across conversational turns. This practice ignores the inherently temporal and context-dependent nature of human emotion expression, where the relative importance of text, speech, and visual cues shifts dynamically over dialogue history. Failing to account for this temporal variation limits both predictive accuracy and interpretability in dialogue settings.

## Method

The framework decouples unimodal representation learning from temporal fusion. Unimodal features are extracted using frozen GPT-2 for text, HuBERT (hubert-base-ls960) for speech, and VideoMAE (videomae-base) with partially unfrozen blocks for video. A GRU-based temporal backbone processes a context window of length K=8. To dynamically weight modalities without circular dependency, an emotion-query gate computes class-conditional, time-dependent modality distributions using a previous hidden state query and modality projection matrices.

## Results

Evaluated on the 6-class IEMOCAP dataset using 5-fold leave-one-session-out (LOSO) cross-validation, the proposed temporal emotion-query gating model achieves 0.5731 Macro-F1 and 0.5734 unweighted accuracy (UA), outperforming a static logits MLP (0.4821 Macro-F1) and a non-gated temporal GRU (0.5568 Macro-F1). It also surpasses sequence-modeling baselines such as Transformer, MulT, and MMER while utilizing significantly fewer parameters (0.076M versus 0.452M to 1.939M). Perturbation-based Area Over the Perturbation Curve (AOPC) analysis confirms the faithfulness and non-stationary nature of the learned temporal modality dynamics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on conversational AI agents, affective computing systems, and multimodal dialogue understanding platforms.

## Limitations

Evaluated primarily on the partially scripted IEMOCAP corpus; further testing on more naturalistic, unscripted conversational datasets is required.

## Related

- (link related pages by id as the wiki grows)
