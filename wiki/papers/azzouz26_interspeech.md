---
id: azzouz26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-734
pdf: https://www.isca-archive.org/interspeech_2026/azzouz26_interspeech.pdf
---

# Acoustic-to-Articulatory Inversion of Clean Speech Using an MRI-Trained Model

[PDF](https://www.isca-archive.org/interspeech_2026/azzouz26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/azzouz26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-734)

**TL;DR** — This study evaluates acoustic-to-articulatory inversion using clean acoustic speech instead of noise-corrupted MRI recordings, achieving a competitive root mean square error of 1.56 mm.

## Problem

Real-time magnetic resonance imaging (rt-MRI) is valuable for capturing vocal tract geometry alongside speech, but the recorded audio is severely degraded by scanner noise and denoising artifacts. Consequently, articulatory inversion models trained on noisy MRI audio often fail to generalize to natural, clean speech spoken in quiet environments. Developing models that operate directly on clean audio while utilizing MRI-derived training targets is crucial for practical speech production applications.

## Method

The architecture comprises five layers: two fully connected layers (300 units each), two bidirectional LSTM layers (300 units each), and a dense output layer predicting 8 articulators represented by 100 coordinates (50 X and 50 Y points per contour). Inputs are 768-dimensional HuBERT-Base embeddings extracted from 16 kHz audio sampled at a 50 Hz frame rate. A hierarchical phonetic and string-matching alignment algorithm bridges the MRI corpus and a separately recorded clean speech corpus using Gestalt pattern matching and phone-level relative position time stretching. Models are trained using Mean Squared Error loss with the Adam optimizer for up to 300 epochs and a batch size of 10.

## Results

Evaluated on a dataset of 412,000 frames from a native French female speaker across 2.5 hours of acquisitions, comparing M2M (MRI train/eval), M2C (MRI train, clean eval), and C2C (clean train/eval) configurations. The M2M baseline achieves a mean RMSE of 1.51 mm and median error of 1.33 mm. Testing the MRI-trained model directly on clean speech (M2C) degrades performance to 1.64 mm RMSE and 1.39 mm median. However, training and evaluating entirely on clean speech with the proposed hierarchical alignment (C2C) recovers performance to a mean RMSE of 1.56 mm and median of 1.33 mm, significantly outperforming dynamic time warping alignment variants.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building articulatory inversion systems for speech therapy, visualization tools, and physiological speech analysis applications that require operating on natural, uncorrupted microphones.

## Limitations

The study is restricted to a single native French female speaker and does not account for physiological variations caused by the Lombard effect or supine body positioning inside the MRI scanner.

## Related

- (link related pages by id as the wiki grows)
