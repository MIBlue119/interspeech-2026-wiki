---
id: park26k_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3285
pdf: https://www.isca-archive.org/interspeech_2026/park26k_interspeech.pdf
---

# MeloDISinger: Melody-Aware & Duration-Preserving Singing Voice Editing with Audio Infilling

[PDF](https://www.isca-archive.org/interspeech_2026/park26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3285)

**TL;DR** — MeloDISinger is a flow-matching-based singing voice editing model that leverages a melody-aware duration-ratio predictor to achieve strict duration preservation and seamless audio infilling.

## Problem

Text-based singing voice editing requires modifying sung lyrics while strictly preserving the total duration, rhythm, and melody to maintain synchronization with musical accompaniment. Existing implicit approaches fail to enforce hard duration constraints and often alter non-edited regions, while prior explicit methods lack melodic context for duration prediction and restrict replacements to same-length phoneme sequences. MeloDISinger addresses these gaps by explicitly controlling span-wise duration and incorporating melodic conditioning.

## Method

The architecture comprises three main components: a feature extraction and parsing stage, the Melody-aware Duration Ratio Predictor (MeloDRP), and a flow-matching-based mel decoder for audio infilling. MeloDRP takes phoneme-level linguistic cues and pseudo-MIDI melodic context derived from the original audio, fusing them via cross-attention to predict fixed-budget duration ratios within each edit span. Training utilizes Kullback-Leibler divergence, L1 word-level loss, penalty loss for minimum duration thresholds, and a guided-attention loss based on phoneme-note temporal overlap. The non-autoregressive conditional flow-matching mel decoder employs a WaveNet backbone with 20 residual layers to synthesize edited regions using random edit masks while preserving surrounding context.

## Results

Evaluated on 60 clips from the GTSinger-En dataset across six editing scenarios (including phoneme-matched, syllable-matched, syllable-mismatched replacement, insertion, deletion, and mixed edits) compared against EditSinger and Vevo2. MeloDISinger achieves superior objective performance, recording lower Word Error Rate (WER) and Character Error Rate (CER), higher Duration Consistency (DC), and better pitch alignment measured by F0 Pearson Correlation (FPC). In subjective mean opinion score (MOS) evaluations, it outperforms baselines across lyric adherence, melody adherence, and naturalness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Music production and vocal editing pipelines, enabling studio engineers to correct mispronunciations, insert missing words, or modify specific phrases in recorded singing vocals without manual waveform manipulation.

## Related

- (link related pages by id as the wiki grows)
