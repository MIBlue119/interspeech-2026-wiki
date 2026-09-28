---
id: nkouanga26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3191
pdf: https://www.isca-archive.org/interspeech_2026/nkouanga26_interspeech.pdf
---

# Mitigating Speaker Leakage in Cascaded Multi-talker ASR with Diarization-based Transcript Correction

[PDF](https://www.isca-archive.org/interspeech_2026/nkouanga26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nkouanga26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3191)

**TL;DR** — A novel diarization-based post-processing pruning algorithm is introduced to remove speaker leakage artifacts in cascaded multi-talker ASR, achieving relative cpWER reductions of up to 29% on high-leakage subsets.

## Problem

Cascaded multi-talker ASR systems decouple speech separation and speech recognition to leverage foundation models, but their overall accuracy is severely bottlenecked by separation imperfections such as speaker leakage. Existing post-processing correction methods primarily rely on lexical re-labeling or resource-heavy LLM proofreading, which often struggle with severe acoustic contamination and high latency. This work addresses the gap by introducing a complementary, acoustically-grounded pruning paradigm to cleanly eliminate corrupted transcript segments.

## Method

The proposed approach uses an independent pre-trained speaker diarization model (pyannote.audio 3.1) as a multimodal verifier to flag interfering speech intervals on each separated audio stream. A transcribed word tuple is pruned only if it satisfies a tripartite consensus of acoustic containment, lexical cross-validation with the parallel stream's transcript, and temporal alignment. An adaptive pattern-matching similarity filter (Ratcliff/Obershelp threshold set at 0.40) bypasses correction when separation is already reliable. Additionally, an exploratory joint architecture combines a MossFormer2 separation backbone with a 2-layer transformer diarization head using a multi-task loss objective.

## Results

Evaluated on Libri2Mix, LibriSpeechMix, and the AMI Meeting Corpus using Concatenated Permutation Word Error Rate (cpWER). Baselines utilized Sepformer and MossFormer2 for separation, Universal-2 for transcription, and pyannote.audio for diarization. The proposed pruning algorithm consistently reduced cpWER across diverse datasets, yielding relative improvements of up to 29.26% on high-leakage subsets. In contrast, the joint multi-task architecture showed sensitivity to domain shifts, degrading on cleaner corpora like LibriSpeechMix (+18.91%) and AMI IHM (+20.78%) while helping on far-field SDM data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers building modular or cascaded multi-talker ASR pipelines for meetings, phone calls, and multi-speaker conversational recordings.

## Limitations

The exploratory joint multi-task architecture struggles with generalization across different acoustic domains and SNR profiles.

## Related

- (link related pages by id as the wiki grows)
