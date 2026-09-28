---
id: ishihara26b_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1028
pdf: https://www.isca-archive.org/interspeech_2026/ishihara26b_interspeech.pdf
---

# Band-Limited Cepstral Analysis of Speaker Sensitivity in Forensic Voice Comparison

[PDF](https://www.isca-archive.org/interspeech_2026/ishihara26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ishihara26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1028)

**TL;DR** — This study maps speaker-discriminative frequency regions for forensic voice comparison using band-limited cepstral coefficients, finding that the 0-0.6 kHz and 4-6 kHz bands offer the strongest cues while frequencies above 7 kHz are the least informative.

## Problem

Speaker-discriminative information is unevenly distributed across the audio spectrum, but traditional full-band feature extractions obscure regional contributions. A detailed understanding of which frequency sub-bands encode the most speaker-specific information is crucial for improving the interpretability and transparency of likelihood-ratio-based forensic voice comparison (FVC). Without this localization, forensic practitioners lack rigorous justifications for weighting specific spectral regions.

## Method

The authors adopt the Band-Limited Cepstral Coefficient (BLCC) method, applying a linear transformation to full-band linear-frequency cepstral coefficients (LFCCs) without needing to re-analyse the original audio signal. The experiments utilize approximately 30 seconds of running speech from 162 native male Australian English speakers drawn from the AusEng 500+ database, downsampled to 16 kHz (0–8 kHz range). A systematic scan across the spectrum uses sub-band widths of 0.6 kHz (shifted by 0.2 kHz) and 1.2 kHz (shifted by 0.4 kHz), producing 38 and 18 BLCC matrices respectively. FVC experiments are conducted using a diagonal-covariance GMM-UBM with 256 Gaussian components and mean-only MAP adaptation, with scores converted to likelihood ratios via logistic regression calibration across a 6-fold rotation scheme.

## Results

System performance is evaluated primarily via the log-likelihood-ratio cost ($C_{llr}$), its calibration component ($C_{llr}^{cal}$), and equal error rate (EER), compared against a full-band LFCC baseline yielding a $C_{llr}$ of 0.13643. While all sub-bands yield $C_{llr} < 1$ (indicating useful information), frequencies above approximately 7 kHz show the weakest speaker discrimination ($C_{llr}$ up to 0.82571 for 0.6 kHz widths), whereas the 0–0.6 kHz band (yielding the lowest single-band $C_{llr}$ of 0.58339 for 0.6 kHz width) and the 4–6 kHz region exhibit strong speaker-discriminative cues. Fusing LRs from up to four complementary, well-spaced sub-bands substantially improves overall FVC performance compared to individual sub-bands and approaches or exceeds full-band baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic speech scientists and law enforcement agencies building transparent, highly interpretable automated forensic voice comparison systems.

## Limitations

The study is restricted exclusively to native male speakers of Australian English using an arbitrary speech sample duration of approximately 30 seconds.

## Related

- (link related pages by id as the wiki grows)
