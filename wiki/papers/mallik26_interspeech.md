---
id: mallik26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-384
---

# MAC-VAD: A Modality-Aligned Cross-Attentive Framework for Robust Voice Activity Detection

**TL;DR** — A dual cross-attention audio-visual framework, trained with knowledge distillation, improves voice activity detection robustness over prior multimodal approaches.

## Problem

Voice activity detection (VAD) accuracy can be improved by combining audio and visual cues, but effectively fusing multimodal information across diverse content to get robust, accurate VAD remains difficult.

## Method

MAC-VAD uses a modality-aligned dual cross-attention framework: an audio encoder adaptively extracts spectral and temporal representations from raw audio, a visual encoder predicts speech onsets from face and lip features, and knowledge distillation from a teacher network steadily guides multimodal training.

## Results

On the MMVAD dataset, MAC-VAD shows superior performance, validating the benefit of modality-aligned cross-attention and self-supervised distillation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust voice activity detection for audio-visual systems such as video conferencing and smart devices with cameras, particularly in acoustically challenging conditions.

## Related

- (link related pages by id as the wiki grows)
