---
id: zuazo26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-439
pdf: https://www.isca-archive.org/interspeech_2026/zuazo26_interspeech.pdf
---

# MEG-to-MEG Transfer Learning and Cross-Task Speech/Silence Detection with Limited Data

[PDF](https://www.isca-archive.org/interspeech_2026/zuazo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zuazo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-439)

**TL;DR** — This paper demonstrates that pre-training a Conformer model on 50 hours of MEG listening data and fine-tuning it on just 5 minutes of subject data improves speech/silence detection by 1-4% in-task and up to 5-6% across different speech perception and production tasks.

## Problem

Neural speech decoders for brain-computer interfaces typically require extensive per-subject training data, which is impractical to collect in clinical settings where only minutes of recordings are available per individual. Furthermore, existing MEG speech models are trained from scratch for isolated tasks, leaving open the question of whether representations can transfer across distinct speech modalities like passive listening and overt production. This work addresses both challenges by evaluating data-efficient transfer learning and cross-task generalization.

## Method

The architecture is based on MEGConformer, a compact Conformer encoder tailored to process raw 306-channel MEG sensor segments using 0.5-second input windows downsampled to 250 Hz. The model is first pre-trained on the 50-hour single-subject LibriBrain listening dataset using a binary speech-versus-silence detection objective. It is then fine-tuned on a multi-subject dataset of 18 participants (each contributing roughly 5 minutes of data per task across listening, playback, and speech production). Fine-tuning incorporates validation loss checkpoint selection, RollAugment (a temporal augmentation using circular shifts of 25%, 50%, and 75%), soft targets based on speech fraction per window, decimation by 4, and an early-stopping patience of 10 epochs.

## Results

Evaluated on the Bourguignon2020 dataset using F1-macro, balanced accuracy, and AUC-macro against training-from-scratch baselines. In-task transfer learning yielded significant listening task improvements of +3.7% accuracy, +2.6% F1, and +7.3% AUC (p = 0.005), alongside positive trends in playback and production. Cross-task fine-tuning without retraining achieved statistically significant decoding across all six train-test pairings (listen, playback, production), with transfer learning boosting cross-task accuracy and F1 by up to 6.3% and 4.2% respectively. Models trained solely on speech production successfully decoded passive listening above chance, confirming shared neural speech representations.

## Code

- https://github.com/hitz-zentroa/meg-phone-decoding

## Applications

Speech neuroprosthetics and brain-computer interface engineers aiming to build data-efficient neural decoders that require minimal calibration time per patient.

## Limitations

The fine-tuning dataset is restricted to 18 participants with limited per-subject recording time (5 minutes per task), and the pre-training set relies on a single male subject.

## Related

- (link related pages by id as the wiki grows)
