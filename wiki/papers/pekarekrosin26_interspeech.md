---
id: pekarekrosin26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2111
pdf: https://www.isca-archive.org/interspeech_2026/pekarekrosin26_interspeech.pdf
---

# MoDiCoL: A Modular Diagnostic Continual Learning Dataset for Robust Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/pekarekrosin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pekarekrosin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2111)

**TL;DR** — MoDiCoL introduces a modular diagnostic continual learning dataset and curriculum to evaluate ASR robustness under compounding real-world distribution shifts, revealing significant performance degradation on speaker and linguistic variations.

## Problem

Standard ASR benchmarks typically isolate individual distribution shifts such as accent, noise, or speech impairments, failing to capture how these factors co-occur and accumulate in real-world applications. Existing evaluation sets also lack control over confounding variables, making it difficult to isolate the primary causes of model failures. Treating robustness as a static attribute overlooks how it dynamically develops or degrades, creating a need for continual learning frameworks that simulate incremental real-world updates.

## Method

The authors construct MoDiCoL using a systematic orthogonal array (Taguchi design with foldover dimensions) to combine 10 distinct linguistic, speaker, and acoustic factors across 108 configurations and 8,100 samples totaling 18.79 hours of speech (14.08 hours synthetic). Synthetic speech and voice cloning via XTTS-v2 are used to fill infeasible or missing real-world combinations, complemented by an augmentation pipeline incorporating denoising, disfluency insertion, impairment simulation, pause modification, reverberation, and noise injection. A continual learning curriculum is established comprising control (t0), acoustic drift (t1), speaker drift (t2), linguistic drift (t3), and compound drift (t4). Using a whisper-small.en backbone, the evaluation tests three continual learning strategies: Experience Replay (5% and 10% buffers), Representation-level Regularization (RLR), and Orthogonal Gradient Descent (OGD).

## Results

Evaluated on whisper-small.en prior to continual learning, the base model achieves a low Word Error Rate (WER) of 7.42 and 99.90 BERTScore on the clean control set t0, but degrades drastically under distribution shifts. Acoustic drift (t1) results in a moderate WER increase (mean 47.62, median 14.29), whereas speaker drift (t2) and linguistic drift (t3) cause severe performance drops with mean WERs of 87.28 and 141.73 respectively. Interestingly, compound drift (t4) yields a lower mean WER of 43.37 than individual speaker or linguistic drifts, indicating that drift difficulties do not strictly accumulate additively. The wide gap between mean and median error rates shows that the baseline model retains strong transcription capabilities on many samples while failing catastrophically on others.

## Code

- https://huggingface.co/datasets/TPekarekRosin/modicol

## Applications

Speech and machine learning engineers studying ASR robustness, domain adaptation, and catastrophic forgetting under realistic, multi-factor distribution shifts.

## Limitations

The dataset scope is constrained to 18.79 total hours of speech heavily reliant on synthetic generation for rare factor combinations.

## Related

- (link related pages by id as the wiki grows)
