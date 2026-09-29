---
id: ji26_interspeech
category: enhancement-separation
labels: [dataset-or-benchmark-release]
institutions: ["Xiaomi", "Central Conservatory of Music"]
code: https://github.com/scottishfold0621/ACMID
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-190
pdf: https://www.isca-archive.org/interspeech_2026/ji26_interspeech.pdf
---

# Automatic Curation of Large-Scale, High-Quality, Multi-Category Music Source Separation Dataset

*Yu Ji, Shuo Yang, Yuetonghui Xu, Mengmei Liu, Qiang Ji, zerui Han*

[PDF](https://www.isca-archive.org/interspeech_2026/ji26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ji26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-190)

**Category:** `enhancement-separation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — This paper presents ACMID, an automated pipeline that crawls and cleans web audio to construct a large-scale, 7-stem instrument source separation dataset, yielding a 1.16 dB average SDR improvement on standard benchmarks.

## Key contributions

- Designed a fine-grained 7-category musical instrument taxonomy (Piano, Drums, Bass, Acoustic Guitar, Electric Guitar, Strings, and Wind-Brass) for music source separation.
- Proposed an automated cleaning framework leveraging frozen self-supervised audio encoders (Dasheng) that achieves 97.14% average accuracy in single-source instrument detection.
- Constructed ACMID (Automatic Curated Musical Instruments Dataset), addressing the scarcity of large-scale fine-grained multi-instrument training data.
- Demonstrated that augmenting standard training data with ACMID-Cleaned improves state-of-the-art source separation model performance by 1.16 dB average SDR.
- Open-sourced web crawling scripts, detector code, and pretrained weights to facilitate reproducibility.

## Problem

Current supervised music source separation (MSS) models like HT-Demucs and BS-Roformer are bottlenecked by the high cost of manual dataset construction and a heavy reliance on coarse-grained 4-stem separations (vocals, bass, drums, others). Harvesting raw solo instrument tracks from web platforms like YouTube introduces severe label noise, audio-label mismatches, and multi-instrument contamination. Without precise multi-instrument supervision, models struggle to generalize to fine-grained instrument isolation in real-world pop music scenarios.

## Method

The framework operates in three main phases: taxonomy design, multi-lingual web crawling, and automated detector-based cleaning. First, the authors defined a 7-category fixed-stem taxonomy (Piano, Drums, Bass, Acoustic Guitar, Electric Guitar, Strings with 4 subcategories, and Wind-Brass with 12 subcategories). Second, raw audio tracks were harvested from YouTube via a standardized query template ("instrument + solo") localized into 9 languages, extracted at stereo 48 kHz (forming ACMID-Uncleaned).

In the third phase, 3-second audio segments downsampled to monophonic 16 kHz were passed through a binary classifier to retain only pure target-instrument segments. The binary classifier utilizes a frozen Dasheng self-supervised masked autoencoder as its audio feature extractor. Features are averaged across the time dimension and passed through three Linear-ReLU hidden layers with dimensions [D, D/2, D/4], followed by a linear layer with sigmoid activation to output a purity probability score. A strict threshold of 0.995 was chosen via human listening tests to eliminate interference while retaining sufficient training data duration.

The binary classifiers were trained on balanced positive samples (pure target stems from MedleyDB, MoisesDB, Bach10, ARME-Strings, SynthTab, and Maestro) and negative samples (mixtures of 1-5 interference sources including other instruments, vocals, speech, and noise). Training utilized online augmentations: random room impulse response convolution (RT60 0.3-1.5s), dynamic compression (ratios 2-4), and random EQ adjustments, all normalized for loudness using LUFS ranges.

## Experimental setup

Experiments utilized MedleyDB and MoisesDB for evaluation, comparing models trained on MoisesDB+MedleyDB, Slakh (synthetic), ACMID-Uncleaned, ACMID-Cleaned, a balanced 11-hour subset (ACMID-Cleaned-11h), and MoisesDB+MedleyDB augmented with ACMID-Cleaned. Performance was evaluated using Signal-to-Distortion Ratio (SDR) in dB. Detectors were evaluated on Accuracy, Precision, Recall, and F1-score across 7 instrument classes.

## Results

Models trained solely on the unfiltered ACMID-Uncleaned achieved an average SDR of 2.24 dB, whereas training on the filtered ACMID-Cleaned boosted the average SDR to 4.63 dB. Combining the baseline datasets (MoisesDB + MedleyDB) with ACMID-Cleaned achieved the highest overall average SDR of 6.05 dB, outperforming the baseline-only model (4.89 dB) by an average gain of 1.16 dB. The synthetic Slakh dataset lagged significantly behind real data at 2.32 dB average SDR, showing severe domain mismatch.

In detector ablations, the Dasheng encoder achieved 97.14% average accuracy across the seven categories, outperforming Music2Latent (lower across most classes) and a baseline CNN encoder (random-guess performance around 48-50% accuracy). A threshold ablation showed that lowering the classification threshold to 0.9 introduced noticeable non-target background noise, while a 0.999 threshold reduced the retained data duration to an unusable 0.05 hours, making 0.995 the optimal trade-off point.

| Training Data | Piano | Drums | Bass | Acoustic Guitar | Electric Guitar | Strings | Wind & Brass | Average |
|---|---|---|---|---|---|---|---|---|
| MoisesDB + MedleyDB | 4.36 | 8.06 | 6.72 | 4.93 | 4.28 | 3.72 | 2.18 | 4.89 |
| Slakh | 2.36 | 5.88 | 3.88 | 1.61 | 0.52 | 0.70 | 1.29 | 2.32 |
| ACMID (Uncleaned) | 0.08 | 4.88 | 3.62 | 1.76 | 1.13 | 1.74 | 2.46 | 2.24 |
| ACMID (Cleaned) | 4.36 | 7.11 | 5.25 | 3.63 | 3.53 | 4.91 | 3.65 | 4.63 |
| MoisesDB + MedleyDB + ACMID (Cleaned) | 6.07 | 8.05 | 6.84 | 5.49 | 5.72 | 5.93 | 4.24 | 6.05 |

## Limitations

The dataset and pipeline focus heavily on pop music instruments within a fixed 7-stem taxonomy, excluding vocals and niche world instruments without dedicated taxonomy expansions. The automatic cleaning pipeline relies on a pre-trained detector threshold that discards substantial raw web data (reducing massive raw hours down to cleaner subsets) and may still inherit long-tail label noise or artifacts if the Dasheng encoder fails on highly distorted or heavily reverberant web recordings.

## Why read this

Speech and ML engineers working on music source separation or audio tagging should read this to see how self-supervised encoders can be repurposed as automated data-cleaning filters for web-scale audio mining. It offers actionable recipes for constructing multi-instrument datasets with rigorous data augmentation and threshold tuning.

## Code

- https://github.com/scottishfold0621/ACMID

## Applications

Multi-track music source separation, automated karaoke/remix stems generation, and intelligent music production tools.

## Institutions / 機構

Xiaomi, Central Conservatory of Music

## Related

- (link related pages by id as the wiki grows)
