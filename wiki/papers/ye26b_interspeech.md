---
id: ye26b_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2284
---

# Refining Emphasis Control in Flow-Matching TTS via Preference Alignment and Reinforcement Learning

**TL;DR** — A three-stage pipeline — supervised fine-tuning, then preference optimization, then online RL — teaches an F5-TTS-based model much finer control over spoken emphasis while keeping prosody natural.

## Problem

Fine-grained emphasis control in speech synthesis is hard to achieve because of data scarcity and prosody's inherent complexity.

## Method

The authors extend F5-TTS with an additional Emphasis Encoder and a three-stage optimization framework: Supervised Fine-Tuning on manually annotated data, then Direct Preference Optimization using preference pairs built by ranking SFT outputs with the Wavelet Prosody Toolkit (WPT), and finally an adapted Flow-CPS online reinforcement learning stage that uses WPT as a reward model to refine flow trajectories via group relative advantage.

## Results

Experiments show the pipeline substantially improves emphasis intensity and controllability while preserving natural prosody.

## Code

Audio samples reported as available at https://thuhcsi.github.io/interspeech2026-F5Emphasis — no training/inference code confirmed; unverified by this wiki as of the `updated` date. If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Expressive TTS systems (audiobooks, virtual assistants, dubbing) needing precise, controllable emphasis on specific words or phrases.

## Related

- (link related pages by id as the wiki grows)
