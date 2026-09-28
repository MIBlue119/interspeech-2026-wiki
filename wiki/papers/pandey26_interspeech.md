---
id: pandey26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1914
pdf: https://www.isca-archive.org/interspeech_2026/pandey26_interspeech.pdf
---

# Beyond Speaker Independence: Evaluating Cross-Lingual Acoustic-to-Articulatory Inversion Across Finnish and Russian

[PDF](https://www.isca-archive.org/interspeech_2026/pandey26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pandey26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1914)

**TL;DR** — This paper establishes acoustic-to-articulatory inversion (AAI) benchmarks on the bilingual Finnish-Russian FROST-EMA corpus, demonstrating that cross-language domain shifts degrade inversion performance more severely than cross-gender shifts.

## Problem

Existing acoustic-to-articulatory inversion research is heavily biased toward English datasets, which lack speaker, language, and recording diversity. Furthermore, prior cross-linguistic studies fail to systematically isolate the independent impacts of speaker gender and language mismatch on inversion robustness.

## Method

The study benchmarks 18 speakers from the FROST-EMA corpus across various configurations: acoustic front-ends (MFCCs, Wav2Vec 2.0, XLSR-53, MMS-300m), articulatory targets (raw 10-dimensional EMA coordinates versus 5-dimensional tract variables), and inversion back-ends (BiLSTM versus a lightweight Transformer encoder). Models are trained using MSE loss with Adam, taking 100-frame input windows downsampled to 50 Hz. Leave-one-speaker-out (LOSO), cross-gender, and cross-language evaluation protocols are enacted.

## Results

Evaluating on FROST-EMA using Pearson correlation (r), cross-gender mismatch drops performance by approximately 0.05-0.10, whereas cross-language mismatch causes larger drops of 0.10-0.20, with combined shifts compounding the degradation. Wav2Vec 2.0 and MMS-300m SSL front-ends consistently outperform MFCCs, while BiLSTM generally beats the attention-based model. Raw EMA and tract variables achieve comparable aggregate accuracy, but tract variables reveal that lip parameters remain stable across languages while tongue constriction locations degrade significantly.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers studying cross-lingual speech recognition, articulatory synthesis, and pronunciation training under domain shift.

## Limitations

The evaluation relies on a relatively small bilingual corpus of 18 speakers with restricted representation in specific groups (e.g., only 2 Russian female speakers), and focuses exclusively on L1 productions.

## Related

- (link related pages by id as the wiki grows)
