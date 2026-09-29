---
id: adelson26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2041
pdf: https://www.isca-archive.org/interspeech_2026/adelson26_interspeech.pdf
---

# Beyond Deep Learning: Speech Segmentation and Phone Classification with Neural Assemblies

*Trevor Adelson, Vidhyasaharan Sethu, Ting Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/adelson26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/adelson26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2041)

**Category:** `asr`

**TL;DR** — This paper introduces an Assembly Calculus (AC) speech processing framework that models continuous speech via sparse neuronal assemblies, local Hebbian plasticity, and winner-take-all competition, achieving an F1 of 0.69 for phone boundaries and 47.5% phone classification accuracy without backpropagation.

## Key contributions

- A probabilistic mel binarization and population-coded MFCC scheme mapping continuous speech to assembly-compatible sparse binary spike patterns.
- A hierarchical refractory assembly architecture operating with zero weight updates for unsupervised phone (F1=0.69) and word (F1=0.61) boundary detection.
- A set of independent per-class recurrent areas trained with Artola-Bröcher-Singer (ABS) heterosynaptic plasticity to score segment classes via trajectory resonance.
- Demonstrated data-efficient spoken word classification (45.1% accuracy on Google Speech Commands) using extremely small training sets (200 samples/class).

## Problem

Current deep learning speech systems (such as Whisper or Wav2Vec 2.0) rely on massive datasets spanning hundreds of thousands of hours, demand global backpropagation via stochastic gradient descent, update all model parameters simultaneously, and produce dense, non-sparse representations. These static, power-hungry pipelines contrast sharply with the human brain's ability to learn continuously, locally, and under strict metabolic constraints using sparse neuronal assemblies. Prior Assembly Calculus (AC) frameworks also fail to handle real speech because they exclusively assume discrete, linearly separable input symbols, lack hierarchical temporal-spectral scaling, and provide no direct mechanism to optimize task-level objectives without global loss functions.

## Method

The architecture converts 16 kHz audio through two separate pathways: probabilistic mel binarization (raising frames to power gamma=0.5 and Bernoulli sampling to form a 32-dim binary vector) and population-coded MFCCs (using Gaussian tuning curves across M coefficients to produce a sparse binary vector). For temporal segmentation, binarized mel frames pass through a two-level frozen-weight refractory hierarchy (beta=0) where neurons accumulate negative bias to suppress persistence. Level 1 (n=1,531, k=135, rho=0.989) detects phone boundaries, and Level 2 (n=6,557, k=588, rho=0.092) aggregates Level 1 activity to detect word boundaries using a normalized assembly change signal measuring the fraction of altered neurons between steps.

For classification, population-coded MFCCs drive C independent per-class RecurrentAreas (one per phone/word class) trained with ABS plasticity, which explicitly adds heterosynaptic long-term depression (LTD) to weaken connections when presynaptic neurons are inactive during postsynaptic firing. Each area receives feedforward input (W_ff) and recurrent input (W_rec) from the previous step, subject to a k-cap winner-take-all competition. During inference (plasticity disabled), a candidate segment is presented to all areas in parallel, and a cumulative resonance score sums the top-k pre-competition activations across frames. The class label is determined by the maximum resonance score across the C areas.

## Experimental setup

Evaluated on the TIMIT read speech corpus (24 test speakers, 39 phone classes, 20 test utterances for segmentation, 200 train/50 test utterances for classification) and the 10-word subset of Google Speech Commands (200 train/50 test samples per class). Metrics include Precision, Recall, and F1 for boundaries (within a tolerance window of +/-2 frames for phones, +/-5 frames for words, with oracle prominence threshold selection), and classification accuracy against chance baselines (2.6% for TIMIT phones, 10.0% for Speech Commands). Optimization was conducted using Bayesian optimization via Optuna and the TPE sampler over 200 trials.

## Results

Level 1 achieves a phone boundary F1 of 0.67 precision and 0.74 recall (0.69 F1), outperforming direct Level 1 word-level projection which scores 0.42 F1. Cascaded Level 2 achieves 0.51 precision and 0.80 recall (0.61 F1) for word boundaries. On classification tasks, per-class RecurrentAreas achieve 47.5% accuracy on TIMIT phone classification (39 classes, 4,328 test samples, 13 epochs, beta=3.1e-4) and 45.1% accuracy on Google Speech Commands word classification (10 classes, 2,000 test samples, 2 epochs, beta=3.6e-3). Confusion matrices on TIMIT reveal that errors follow biological phonetic similarities (clustering fricatives, low vowels, and nasals), while stop consonants remain the most challenging due to their brief transient spectra.

| System / Condition | Precision | Recall | F1 / Accuracy |
|---|---|---|---|
| Level 1 (Phone Boundary) | 0.67 | 0.74 | **0.69 (F1)** |
| Level 2 (Word Boundary) | 0.51 | 0.80 | **0.61 (F1)** |
| L1-Direct Word Baseline | 0.27 | 0.94 | 0.42 (F1) |
| TIMIT Phone Classification | - | - | **47.5% (Acc)** |
| Speech Commands Word Classification | - | - | **45.1% (Acc)** |

## Limitations

Boundary detection relies on an oracle-selected prominence threshold per utterance, and using a globally fixed threshold degrades F1 performance by 0.05 to 0.10. Classification requires supervised segment labels to train individual class areas rather than discovering categories completely unsupervised from continuous audio. Overall accuracy lags behind conventional deep learning architectures, and stop consonants are poorly classified due to insufficient transient frames.

## Why read this

Speech and ML researchers seeking alternatives to standard backpropagation-based Transformers and Conformer models will find this a foundational proof-of-concept for running speech tasks via dynamical systems and Hebbian assembly calculus. Readers will take away concrete recipes for binarizing continuous acoustics, setting up refractory hierarchies for unsupervised segmentation, and performing trajectory resonance scoring.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-power on-device speech segmentation, data-efficient keyword spotting, and brain-inspired neuromorphic speech processing hardware.

## Institutions / 機構

University of Melbourne, University of New South Wales

## Related

- (link related pages by id as the wiki grows)
