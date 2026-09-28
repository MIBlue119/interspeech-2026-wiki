---
id: ren26f_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1807
pdf: https://www.isca-archive.org/interspeech_2026/ren26f_interspeech.pdf
---

# Can Hands Articulate? Kinematic, Acoustic, and Perceptual Analyses of Vowel Production via External Resonators in Kaxi

[PDF](https://www.isca-archive.org/interspeech_2026/ren26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1807)

**TL;DR** — This study investigates Kaxi, a Chinese folk art where a reed serves as a sound source and hand movements act as an external resonator, demonstrating that hands can articulate intelligible vowels with an overall perceptual accuracy of 83.7%.

## Problem

The classical source-filter model assumes speech is shaped internally by the vocal tract, leaving the capacity of external tools to replicate vocal filtering underexplored. High fundamental frequencies typically degrade formant estimation and vowel intelligibility, presenting a challenge for external acoustic modulation. Investigating alternative external speech filters informs speech plasticity theories and inspires non-invasive communication strategies for individuals with severe speech impairments.

## Method

The authors recorded a 22-year-old male native Mandarin speaker producing 197 monosyllabic words with a (C)V structure in both normal speech and Kaxi. Hand motion tracking was performed on right-hand videos using MediaPipe to capture 21 3D anatomical landmarks per frame, followed by principal component analysis (PCA) on normalized coordinates. Acoustic analysis utilized Praat and VoiceSauce to measure fundamental frequency (f0) and the first three formants, with outliers removed via Mahalanobis distance. Random Forest classifiers with 500 trees were trained on formant profiles to evaluate acoustic separability. A perceptual evaluation was conducted with 24 native Mandarin listeners performing a 5-way forced-choice vowel identification task using PSOLA-lengthened audio tokens, analyzed via mixed-effects logistic regression and linear mixed-effects models.

## Results

PCA revealed that the first two principal components accounted to 60.83% of the total variance, mapping hand shapes into a spatial configuration mirroring tongue height and advancement. Acoustically, Kaxi exhibited a staircase-like formant tuning strategy where formants periodically aligned with harmonics rather than rising continuously. Random Forest classification accuracy across the five vowels declined from 96.4% in normal speech to 84.1% in Kaxi. Perceptual identification accuracy reached 83.7% overall for Kaxi items, with vowel 'a' achieving near-perfect recognition (99.6%), though listeners experienced confusions between phonetically close vowels like 'o' and 'e'.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, phoneticians, and clinical rehabilitation specialists working on non-invasive assistive communication devices for individuals with vocal tract impairments such as glossectomies.

## Limitations

The study analyzed a single professional performer and focused exclusively on isolated monosyllabic vowels rather than continuous speech or consonants.

## Related

- (link related pages by id as the wiki grows)
