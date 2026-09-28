---
id: ishihara26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-303
pdf: https://www.isca-archive.org/interspeech_2026/ishihara26_interspeech.pdf
---

# Sub-band Cepstral Analysis of Speaker-Specific Information: A Case Study of Japanese Word /saN/

[PDF](https://www.isca-archive.org/interspeech_2026/ishihara26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ishihara26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-303)

**TL;DR** — This study applies band-limited cepstral coefficients (BLCCs) to forensic voice comparison of Japanese speech segments to map speaker-sensitive spectral regions, demonstrating that fusing just four optimal sub-bands approaches full-band performance.

## Problem

Speaker-discriminative information is distributed unevenly across the frequency spectrum, but most previous studies rely on running speech and broad phonemic contexts, making it unclear how specific phonetic segments encode speaker individuality. Filterbank-based sub-band analyses also suffer from difficulties in precise filter manipulation. Understanding these spectral distributions is vital for interpreting forensic voice comparison systems in legal contexts.

## Method

The authors employ the band-limited cepstral coefficient (BLCC) method to extract sub-band information via a linear transformation of full-band linear-frequency cepstral coefficients (LFCCs) without signal re-analysis. Using 16 kHz audio (0-8 kHz range) from 306 adult male speakers uttering the Japanese word /saN/ over two sessions, 38 overlapping 0.6-kHz sub-bands (shifted by 0.2 kHz) are evaluated. Six-fold cross-validation forensic voice comparison experiments estimate log-likelihood ratios (LLRs) using a multivariate kernel density model, calibrated via logistic regression.

## Results

Across full-band LFCC baselines, vowel /a/ achieves the best performance with a $C_{llr}$ of 0.38766 (EER 9.66%), followed by nasal /N/ ($C_{llr}$ = 0.43473, EER 12.09%) and fricative /s/ ($C_{llr}$ = 0.68110, EER 22.03%). Sub-band analysis reveals that speaker-discriminative cues vary by segment: /s/ shows dips around 1-2 kHz and 6.5 kHz, /a/ performs best around 5-6 kHz and near F2/F3, and /N/ concentrates in the lower spectrum below 4 kHz with a prominent minimum at 0.5-1 kHz. Fusing four carefully selected sub-bands yields $C_{llr}$ values substantially lower than individual sub-bands, closely approaching full-band system performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic scientists and voice comparison practitioners evaluating speaker individuality across specific frequency regions and phonetic segments in legal investigations.

## Limitations

The study is restricted exclusively to adult male speech samples and a single Japanese word /saN/.

## Related

- (link related pages by id as the wiki grows)
