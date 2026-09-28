---
id: sung26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1947
---

# fMRI Decoding of Speech Conditions Across Brain Regions of Interest for Neural Evaluation of Speech Enhancement

**TL;DR** — Decodes clean-vs-noisy-vs-enhanced speech listening conditions directly from fMRI brain activity, then uses this decoder as a novel neural metric that ranks DNN-based speech enhancement as sounding closer to clean speech than classical enhancement.

## Problem

Decoding Clean versus Noisy speech from fMRI is challenging due to high-dimensional multivoxel patterns and cross-subject variability, yet understanding how the brain represents enhanced speech matters for evaluating speech enhancement systems.

## Method

Develops NeuroPAS-Net, a three-phase fMRI decoding framework, evaluated on 25 participants listening to sentences under Clean, Noisy, DNN-based enhancement, and classical enhancement conditions across 12 speech-related brain regions of interest, then derives the Neuro-Perceptual Assessment Score (NeuroPAS) from the decoder.

## Results

The framework consistently outperforms SVM and CNN baselines, reaching a peak accuracy of 79% in the Right Precentral Gyrus; the resulting NeuroPAS metric correlates with intelligibility and ranks DNN-based enhancement closer to the Clean neural pattern than classical enhancement.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Neuroscience-grounded evaluation metrics for speech enhancement systems, and basic research into brain representations of speech in noise.

## Related

- (link related pages by id as the wiki grows)
