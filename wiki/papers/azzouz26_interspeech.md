---
id: azzouz26_interspeech
category: phonetics-linguistics
institutions: ["Universite de Lorraine", "CNRS", "Inria"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-734
pdf: https://www.isca-archive.org/interspeech_2026/azzouz26_interspeech.pdf
---

# Acoustic-to-Articulatory Inversion of Clean Speech Using an MRI-Trained Model

*Sofiane Azzouz*

[PDF](https://www.isca-archive.org/interspeech_2026/azzouz26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/azzouz26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-734)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates acoustic-to-articulatory inversion using clean speech instead of noisy MRI-recorded audio, introducing a phonetic-hierarchical alignment method that achieves a competitive mean RMSE of 1.56 mm.

## Key contributions

- Evaluates acoustic-to-articulatory inversion using natural clean speech as an alternative to denoised rt-MRI audio to overcome real-world acoustic domain mismatch.
- Proposes a hierarchical, phoneme-aware alignment algorithm combining Gestalt pattern matching, word-level relative positioning, and phone-level local temporal normalization.
- Compares three data configurations (M2M, M2C, C2C) and demonstrates that training and testing on aligned clean speech (C2C) yields an average RMSE of 1.56 mm, approaching upper-bound MRI-audio performance.
- Shows that phonetic-hierarchical alignment outperforms standard Dynamic Time Warping (DTW) across all configurations.

## Problem

Acoustic-to-articulatory inversion typically relies on audio recorded inside an rt-MRI scanner, which suffers from severe scanner noise and altered high-frequency energy profiles even after denoising. Applying models trained on this noisy domain to normal, quiet speech causes substantial performance drops due to domain mismatch. Prior generative and contour-tracking inversion methods evaluated on MRI audio fail to bridge this real-world deployment gap, necessitating a training strategy that leverages clean speech data.

## Method

The network architecture consists of five layers: two fully connected layers (300 units each), two Bi-LSTM layers (300 units each), and a final dense output layer projecting to a tensor of size 8 x 100. This output models eight distinct vocal tract articulators (arytenoid cartilage, epiglottis, lower lip, pharyngeal wall, velum, tongue, upper lip, vocal folds), with each articulator represented by 50 X and 50 Y coordinate points (100 values total). The model takes 768-dimensional HuBERT-Base embeddings sampled at 50 Hz from 16 kHz audio as inputs and is optimized using Mean Squared Error (MSE) loss.

To align the MRI corpus with the clean corpus, a hierarchical alignment algorithm is used. First, sentences are matched via Gestalt pattern matching with a threshold >= 75%. Words are aligned using exact text matches resolved by relative sentence position. Finally, phone-level local temporal normalization stretches or compresses MRI frame indices into corresponding clean phone durations using linear interpolation with an epsilon offset to prevent division by zero.

Models are trained for up to 300 epochs using the Adam optimizer with a batch size of 10 and a learning rate of 0.001. Early stopping with a patience of 10 epochs on validation performance is applied.

## Experimental setup

The dataset comprises two corpora from a single native French female speaker: an rt-MRI corpus (2.5 hours, 105 acquisitions, 412,000 frames at 20 fps, 136x136 spatial resolution, 1.62 mm pixel size) recorded with an optical mic at 16 kHz, and a clean-environment audio corpus of the exact same sentences downsampled to 16 kHz. Data is split by acquisition into 80% train, 10% validation, and 10% test. Baselines include M2M (denoised MRI train/test), M2C (MRI train, clean test), and DTW-based alignment variants (M2C-DTW, C2C-DTW). Metrics used are Root Mean Square Error (RMSE in mm) and Median Error (in mm) calculated on denormalized contours after removing silence segments.

## Results

The M2M configuration (MRI-to-MRI) achieves the best overall performance with a mean RMSE of 1.51 mm and median of 1.33 mm. Testing the MRI-trained model directly on clean speech without adaptation (M2C) degrades performance to an average RMSE of 1.64 mm and median of 1.39 mm. However, training and evaluating directly on clean speech using the proposed phonetic alignment (C2C) recovers performance significantly, achieving a mean RMSE of 1.56 mm and median of 1.33 mm, closely approaching the M2M upper bound. 

In comparison, using DTW alignment instead of phonetic alignment substantially degrades performance across the board, yielding 1.71 mm for M2C-DTW and 1.68 mm for C2C-DTW.

| System | Mean RMSE (mm) | Mean Median (mm) |
|---|---|---|
| M2M | 1.51 | 1.33 |
| M2C | 1.64 | 1.39 |
| C2C | 1.56 | 1.33 |
| M2C-DTW | 1.71 | 1.45 |
| C2C-DTW | 1.68 | 1.43 |

## Limitations

The study is experimentally limited to a single French female speaker, restricting conclusions regarding speaker and language generalization. The dataset does not account for the Lombard effect or speaker posture changes caused by the supine MRI scanner position versus vertical clean recordings. Additionally, the approach relies heavily on manually corrected phonetic alignments for data pairing, which may be costly to scale to larger multi-speaker corpora.

## Why read this

Researchers and engineers working on speech production and articulatory inversion will learn how to bypass MRI scanner noise bottlenecks by successfully training models on clean acoustic environments using hierarchical phonetic alignment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-world silent speech interfaces, computer-assisted language and pronunciation learning, speech therapy, and articulatory-aware speech animation systems.

## Institutions / 機構

Universite de Lorraine, CNRS, Inria

## Related

- (link related pages by id as the wiki grows)
