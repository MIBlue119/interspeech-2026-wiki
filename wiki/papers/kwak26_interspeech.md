---
id: kwak26_interspeech
category: source-separation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-706
---

# Plug-and-Steer: Decoupling Separation and Selection in Audio-Visual Target Speaker Extraction

**TL;DR** — Plug-and-Steer decouples audio-visual target speaker extraction into a frozen high-fidelity audio-only separator plus a lightweight Latent Steering Matrix that uses visual cues only for target selection, preserving separation quality across diverse backbones.

## Problem

Conventional audio-visual target speaker extraction (AV-TSE) systems deeply integrate audio and visual features to relearn the entire separation process, which can cap fidelity due to the noisy nature of in-the-wild audio-visual training data.

## Method

Plug-and-Steer assigns high-fidelity separation to a frozen audio-only backbone and restricts the visual modality's role strictly to target selection, using a minimalist linear Latent Steering Matrix (LSM) to re-route latent features within the backbone and anchor the target speaker to a designated channel.

## Results

Across four representative architectures, the method preserves the acoustic priors of diverse backbones, achieving perceptual quality comparable to the original backbones while adding visual target selection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to any deployed audio-only speaker separation system that needs to add visual target-selection capability without retraining or degrading its existing separation quality.

## Related

- (link related pages by id as the wiki grows)
