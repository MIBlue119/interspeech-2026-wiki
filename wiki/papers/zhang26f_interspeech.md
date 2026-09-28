---
id: zhang26f_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-656
---

# CoRE: Contrastive Evidence-Aware Rescoring for Multiple-Choice Audio Question Answering

**TL;DR** — CoRE is a training-free method that re-scores multiple-choice audio QA answers by comparing model confidence on the original audio against a counterfactual, temporally scrambled version, reducing large audio-language models' tendency to answer from text priors instead of the actual sound.

## Problem

Large audio-language models do well on multiple-choice audio question answering but often show modality bias, leaning on textual priors in the question and answer options rather than genuinely grounded acoustic evidence.

## Method

CoRE constructs counterfactual audio via chunk permutation and random segment reversal to disrupt long-range temporal structure while largely preserving short-time acoustics, estimates option-level evidence gain by contrasting model scores on original versus counterfactual audio, and applies an adaptive evidence-aware gate to make the final prediction, all without any additional training.

## Results

Under a unified option-scoring protocol, experiments on DCASE 2025 Task 5 and AIR-Bench SoundQA show consistent gains with both Qwen2-Audio and Kimi-Audio.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving reliability of audio-language QA systems by reducing reliance on textual shortcuts, applicable as a drop-in test-time technique.

## Related

- (link related pages by id as the wiki grows)
