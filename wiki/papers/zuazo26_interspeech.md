---
id: zuazo26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-439
pdf: https://www.isca-archive.org/interspeech_2026/zuazo26_interspeech.pdf
---

# MEG-to-MEG Transfer Learning and Cross-Task Speech/Silence Detection with Limited Data

*Xabier de Zuazo, Vincenzo Verbeni, Eva Navas, Ibon Saratxaga, Mathieu Bourguignon, Nicola Molinaro*

[PDF](https://www.isca-archive.org/interspeech_2026/zuazo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zuazo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-439)

**TL;DR** — This paper presents the first demonstration of MEG-to-MEG transfer learning and cross-task decoding for speech perception and production, using 50 hours of single-subject pre-training followed by fine-tuning on just 5 minutes of data per subject across 18 participants. Pre-training yields consistent performance gains, improving in-task accuracy by 1-4% and cross-task generalization by up to 5-6%.

## Key contributions

- First application of transfer learning to MEG speech decoding, showing that pre-training on large-scale single-subject listening data benefits low-data fine-tuning.
- First demonstration of cross-task MEG speech decoding between perception (listening/playback) and production tasks.
- Discovery of systematic asymmetries in cross-task transfer, where perception-to-production transfer substantially outperforms production-to-perception.
- Empirical proof that production models successfully decode passive listening above chance, confirming they learn shared neural speech representations rather than purely motor activity.

## Problem

Brain-computer interfaces (BCIs) for speech restoration require robust neural decoders, but collecting large volumes of training data per individual is practically infeasible in clinical settings, typically limiting calibration data to minutes rather than hours. Current approaches train separate models from scratch for each subject and task, ignoring the benefits of transfer learning that have driven progress in computer vision, NLP, and EEG/fMRI. Furthermore, whether neural representations learned during speech perception transfer to speech production (and vice versa) remains poorly understood, hindering data-efficient cross-task BCI adaptation.

## Method

The architecture is MEGConformer, a compact Conformer-based encoder adapted for MEG time-series that operates directly on 0.5-second windowed raw sensor segments (306 channels downsampled to 250 Hz). For pre-training, the model is trained from scratch on 50 hours of single-subject listening data from the LibriBrain dataset on a binary speech/silence detection task. During fine-tuning on the Bourguignon2020 multi-subject dataset (18 participants, 3 tasks at 5 minutes each), output smoothing is disabled, checkpoints are selected via validation loss instead of F1-macro, and early-stopping patience is reduced to 10 epochs.

To maximize data efficiency under severe scarcity, two specific recipe additions are introduced: RollAugment (a fast temporal augmentation that circularly shifts frames by 25%, 50%, and 75% and concatenates them) and soft targets representing the fraction of speech within each window instead of hard binary labels. Input windows are z-scored per subject and task using training set statistics, and all models are trained on individual NVIDIA H100 GPUs using decimation by 4 for anti-aliased resampling.

## Experimental setup

Evaluated on two MEG datasets: LibriBrain (50 hours of single-subject listening data from one male native English speaker) for pre-training, and a multi-subject Spanish dataset (18 healthy adults, ~5 minutes per task across listening, playback, and production) for fine-tuning and evaluation. Performance is measured via F1-macro, balanced accuracy, and AUC-macro, comparing models trained from scratch against pre-trained-then-fine-tuned models using paired Wilcoxon signed-rank tests with Holm-Bonferroni correction and permutation sign-flip tests (10,000 iterations).

## Results

In-task transfer learning improved listening accuracy from 76.2% to 79.0% (F1: 85.5% to 87.7%, AUC: 64.0% to 68.7%), playback accuracy from 75.1% to 76.0% (F1: 84.0% to 85.4%), and production accuracy from 83.6% to 84.2% (F1: 89.7% to 90.3%). Cross-task transfer learning yielded even larger improvements across all task pairs, with listen-to-playback accuracy jumping from 72.5% to 76.9% and production-to-listen accuracy rising from 66.1% to 69.3%.

Ablations reveal systematic directional asymmetry: perception-to-production transfer achieved higher performance (e.g., Listen-to-Production F1 of 85.3%) than production-to-perception transfer (e.g., Production-to-Listen F1 of 80.1%). While overall subject-level trends were predominantly positive (15/18 subjects improved in perception, 16/18 in production), a small number of subjects exhibited negative transfer (decreases up to 13.3% F1), demonstrating high inter-subject variability.

| System / Condition | Accuracy (%) | F1 Score (%) | AUC (%) |
|---|---|---|---|
| Scratch (Listen In-Task) | 76.2 ± 4.8 | 85.5 ± 3.2 | 64.0 ± 9.4 |
| Transfer (Listen In-Task) | 79.0 ± 4.8 | 87.7 ± 3.2 | 68.7 ± 6.2 |
| Scratch (Production In-Task) | 83.6 ± 5.4 | 89.7 ± 3.5 | 81.1 ± 8.6 |
| Transfer (Production In-Task) | 84.2 ± 4.9 | 90.3 ± 3.4 | 82.0 ± 8.0 |
| Scratch (Listen → Playback) | 72.5 ± 3.6 | 83.0 ± 2.7 | 59.4 ± 5.3 |
| Transfer (Listen → Playback) | 76.9 ± 4.0 | 86.5 ± 2.8 | 61.1 ± 4.5 |

## Limitations

The study focuses exclusively on binary speech/silence detection, omitting higher-level linguistic units like phonemes, words, or semantics. Pre-training and fine-tuning datasets involved different languages (English vs. Spanish) and were restricted to a single-subject pre-training source. Furthermore, performance exhibits notable inter-subject variance with occasional negative transfer, indicating that transfer learning remains a complement to rather than a replacement for subject-specific calibration.

## Why read this

Speech and BCI researchers tackling low-resource neural decoding should read this paper to understand how large-scale single-subject MEG pre-training and cross-task transfer can mitigate extreme data scarcity. It provides concrete recipes—such as RollAugment and soft target smoothing—for adapting temporal encoders across different speech production and perception paradigms.

## Code

- https://github.com/hitz-zentroa/meg-phone-decoding

## Applications

Low-resource speech brain-computer interfaces, clinical neural speech restoration, and multi-task neuroimaging decoding pipelines.

## Related

- (link related pages by id as the wiki grows)
