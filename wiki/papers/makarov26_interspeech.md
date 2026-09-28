---
id: makarov26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3448
---

# Repurposing a Speech Classifier for Guided Diffusion-Based Speech Generation

**TL;DR** — A conventionally trained speech classifier can be repurposed, with only a small added subnetwork, as the backbone for classifier-guided diffusion speech generation, avoiding the need to train two separate models.

## Problem

Classifier guidance steers diffusion-based generation toward a target class using a noise-conditioned classifier, but this normally requires training two separate models — a classifier and a diffusion model — adding cost and complexity.

## Method

Starting from a frozen noise-conditioned classifier operating in log-Mel space, the authors attach a lightweight subnetwork that reuses the classifier's intermediate representations and train only this subnetwork under a Denoising Score Matching objective.

## Results

The approach shows a pretrained classifier can be repurposed for conditional generation, providing a bridge between discriminative modeling and conditional speech synthesis that reaches high speech quality within a single-backbone model, with reduced memory footprint and compute cost.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient, resource-constrained conditional speech generation systems that want to reuse an existing classifier rather than train a separate generative model from scratch.

## Related

- (link related pages by id as the wiki grows)
