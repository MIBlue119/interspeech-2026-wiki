---
id: ai26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-228
---

# Stabilizing Short Duration Speaker Verification through Neural Re-scoring with Hybrid Enrollment

**TL;DR** — A hybrid text-dependent/text-independent enrollment re-scoring framework stabilizes speaker verification on very short (sub-3-second) utterances.

## Problem

Short-duration speaker verification, needed for personalized keyword spotting, suffers because limited speech duration makes speaker representations unstable and more sensitive to noise and phoneme variation.

## Method

The authors build VoxPhrase, a large short-utterance corpus segmented from VoxCeleb, then propose a hybrid-enrollment neural re-scoring framework that combines text-dependent and text-independent enrollment and compares them at the frame level via parallel cross-attention.

## Results

The hybrid re-scoring approach delivers consistent verification improvements over baseline speaker models on the VoxPhrase corpus.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device personalized keyword spotting and voice authentication systems that must verify identity from very short spoken snippets.

## Related

- (link related pages by id as the wiki grows)
