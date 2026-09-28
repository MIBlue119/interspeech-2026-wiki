---
id: skorzewska26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2606
pdf: https://www.isca-archive.org/interspeech_2026/skorzewska26_interspeech.pdf
---

# Informativity of high-frequency bands on the place of articulation shift in retroflex sibilants produced by children

[PDF](https://www.isca-archive.org/interspeech_2026/skorzewska26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/skorzewska26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2606)

**TL;DR** — This study analyzes high-frequency acoustic bands up to 16 kHz in pediatric retroflex sibilants to evaluate speech distortions (sigmatism), demonstrating that energy-ratio features capture place-of-articulation variations with up to nearly 30% variance explained.

## Problem

Standard acoustic analyses of children's speech typically apply a low-pass filter cutoff, which can obscure critical high-frequency diagnostic cues located above 7–8 kHz. Because children have shorter vocal tracts, their spectral energy shifts upward, making high-frequency regions vital for distinguishing between normative sibilant productions and speech disorders like sigmatism. Overlooking these bands hinders objective, quantitative clinical assessment for speech-language pathologists.

## Method

The authors analyze 4,429 speech segments from 186 Polish preschool children aged 4 to 8 years drawn from the PAVSig dataset, focusing on retroflex fricatives (/ù/, /ü/) and affricates (/tù/) categorized into four places of articulation (PoA): retroflex, dental, postalveolar, and interdental. Signals are segmented into 20 ms frames (10 ms overlap), and 34 frame-level features are extracted, comprising 28 Noise Energy (NE) subbands of 500 Hz spanning 2 kHz to 16 kHz, integrated Fricative Noise Energies (FNE), and Fricative Noise Energy Ratios (FNER). Linear Mixed-Effects (LME) models with speaker and parent word as random effects are used to evaluate how PoA affects spectral energy distribution independently of voicing.

## Results

Evaluating across datasets of 4,429 segments, Linear Mixed-Effects models revealed that newly introduced Fricative Noise Energy Ratios—specifically FNER(12,23) and FNER(12,34)—yielded the highest marginal R2 values, explaining up to 29.8% of variance for /tù/ (Rm = 0.298), 22.8% for /ü/, and 19.5% for /ù/. Dental realizations showed broad, global spectral differences across nearly the entire frequency spectrum compared to normative retroflex productions. In contrast, interdental and postalveolar errors exhibited localized high-frequency deviations stretching up to 14 kHz.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathologists and automated computer-aided speech diagnostic systems can use these high-frequency acoustic features and mixed-effects modeling frameworks to objectively assess and classify pediatric articulation disorders.

## Limitations

The dataset exhibits natural imbalances in speaker distribution across various places of articulation due to unstratified corpus collection.

## Related

- (link related pages by id as the wiki grows)
