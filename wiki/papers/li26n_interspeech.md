---
id: li26n_interspeech
category: source-separation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-948
---

# Online Audio-Visual Target Speaker Extraction with Viseme-Guided Lightweight Visual Pretraining

**TL;DR** — Using visemes instead of standard visual-speech-recognition features as the visual guidance signal makes online audio-visual target speaker extraction lighter, more robust, and more interpretable, enabling real-time deployment.

## Problem

Audio-visual target speaker extraction uses visual cues to recover a target speaker from a mixture, but most systems are non-causal and computationally heavy, and prior efficiency work has focused on the separation backbone rather than the visual branch.

## Method

The authors revisit the visual-cue design and use visemes — rather than conventional VSR-pretrained visual representations — as a lighter, more robust, and more interpretable guidance signal, building an online viseme-guided target speaker extraction system around it.

## Results

The viseme-guided approach achieves strong extraction performance under the lowest computational budget among compared designs, showing visemes are an effective, cheaper alternative to standard visual pretraining for this task.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time audio-visual speaker extraction for video calls, hearing aids with camera input, and other latency-sensitive multi-speaker separation settings.

## Related

- (link related pages by id as the wiki grows)
