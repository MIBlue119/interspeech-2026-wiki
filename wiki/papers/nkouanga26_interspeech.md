---
id: nkouanga26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3191
---

# Mitigating Speaker Leakage in Cascaded Multi-talker ASR with Diarization-based Transcript Correction

**TL;DR** — Using a speaker-diarization model as a verifier to prune leaked transcript segments — by checking temporal containment, lexical cross-validation, and temporal alignment together — cuts speaker-attribution errors in cascaded multi-talker ASR by up to 29%.

## Problem

Cascaded multi-talker ASR (MT-ASR) built on strong foundation models is still capped by speaker leakage during source separation, and prior correction strategies mostly focus on lexical re-labeling for speaker attribution rather than removing the leaked content itself.

## Method

The authors propose a complementary pruning-based paradigm that uses a pretrained speaker diarization model as a multimodal verifier, removing transcribed segments unless they satisfy a tripartite consensus of temporal containment, lexical cross-validation, and temporal alignment.

## Results

On LibriMix, LibriSpeechMix, and the AMI Meeting corpus, the method consistently reduces cpWER across diverse overlap conditions, with relative cpWER reductions of up to 29% on subsets with high speaker leakage.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More reliable multi-talker meeting and conversation transcription pipelines, especially in high-overlap speaking scenarios.

## Related

- (link related pages by id as the wiki grows)
