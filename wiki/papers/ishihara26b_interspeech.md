---
id: ishihara26b_interspeech
category: speaker
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1028
pdf: https://www.isca-archive.org/interspeech_2026/ishihara26b_interspeech.pdf
---

# Band-Limited Cepstral Analysis of Speaker Sensitivity in Forensic Voice Comparison

*Shunichi Ishihara, Satoru Tsuge, Frantz Clermont*

[PDF](https://www.isca-archive.org/interspeech_2026/ishihara26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ishihara26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1028)

**Category:** `speaker`

**TL;DR** — This paper investigates the distribution of speaker-discriminative information across different frequency sub-bands using Band-Limited Cepstral Coefficients (BLCCs) for forensic voice comparison, finding that the 0–0.6 kHz and 4–6 kHz regions provide the strongest speaker cues while frequencies above 7 kHz are the least informative.

## Key contributions

- Evaluated the speaker-discriminative information of individual sub-bands across the 0–8 kHz full-band spectrum using systematic 0.6 kHz and 1.2 kHz BLCC scans.
- Demonstrated that while all sub-bands yield useful speaker-specific information (Cllr < 1), speaker sensitivity is highly non-uniform, peaking in the 0–0.6 kHz and 4–6 kHz ranges.
- Showed that fusing likelihood ratios from strategically selected, non-overlapping sub-bands significantly improves forensic voice comparison performance compared to individual sub-bands.
- Established a flexible linear transformation pipeline for extracting sub-band cepstral coefficients without needing to re-analyze the original acoustic signals.

## Problem

Prior forensic voice comparison studies disagree on precisely which frequency bands carry the most speaker-specific information, with existing works pointing variously to low, mid, or mid-to-high frequency regions. Furthermore, conventional sub-band analyses require computationally expensive re-processing of the original speech signal for every frequency range of interest. Understanding these spectral distributions is crucial for providing transparent, interpretable evidence in forensic contexts.

## Method

The study employs Band-Limited Cepstral Coefficients (BLCCs) derived via a three-step pipeline: short-time filter-bank spectral analysis with a linear frequency scale (25 triangular filters, 25-ms frames, 5-ms shift), extraction of 14 full-band linear-frequency cepstral coefficients (LFCCs), and a linear transformation matrix converting full-band cepstra to sub-band cepstra. The 0–8 kHz frequency range was systematically scanned using 0.6 kHz sub-bands (shifted by 0.2 kHz, yielding 2 BLCC coefficients) and 1.2 kHz sub-bands (shifted by 0.4 kHz, yielding 3 BLCC coefficients). 

Experiments were conducted within a Gaussian Mixture Model–Universal Background Model (GMM-UBM) framework utilizing diagonal-covariance models with 256 Gaussian components and mean-only MAP adaptation. System scores were converted to likelihood ratios using logistic-regression calibration across a 6-fold rotation scheme.

## Experimental setup

Evaluated on pseudo-police interview recordings from the AusEng 500+ database comprising 30 seconds of running speech per session from 162 native male Australian English speakers. Systems were compared against a full-band LFCC baseline (Cllr = 0.13643, Ccal_llr = 0.02894, EER = 3.396%). Evaluation metrics include the log-likelihood-ratio cost (Cllr), its calibration component (Ccal_llr), and equal error rate (EER).

## Results

All individual sub-bands achieved Cllr values below 1.0, but performance varied sharply across the spectrum. For 0.6 kHz sub-bands, the lowest Cllr (strongest discrimination) occurred at the 0–0.6 kHz band (0.58339) and a secondary prominent dip around 4–5 kHz, whereas frequencies above 7 kHz showed the weakest performance, with the final sub-band reaching Cllr values up to 0.82571. Fusing the likelihood ratios of up to four well-spaced, highly informative sub-bands substantially outperformed any individual sub-band and improved upon the full-band LFCC baseline.

| System / Condition | Cllr | C_cal,llr | EER (%) |
|---|---|---|---|
| Full-Band LFCC Baseline | 0.13643 | 0.02894 | 3.396 |
| Best 0.6 kHz Sub-band (0–0.6 kHz) | 0.58339 | — | — |
| Worst 0.6 kHz Sub-band (Final band) | 0.82571 | — | — |
| Best 1.2 kHz Sub-band | ~0.50 | — | — |
| Worst 1.2 kHz Sub-band (Final band) | 0.67020 | — | — |

## Limitations

The study is restricted to 162 native male speakers of a single accent (Australian English) using clean pseudo-interview speech sampled at 16 kHz, limiting generalizability to female speakers, cross-linguistic scenarios, and telephony channels. Sub-band combinations were constrained to a maximum of four sub-bands due to computational limitations in the fusion analysis.

## Why read this

Speech and forensic audio researchers will find this paper valuable for its rigorous mapping of speaker-discriminative cues across frequency bands using BLCCs, offering a blueprint for building multi-band or weighted feature-fusion systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic voice comparison, speaker verification, and multi-band acoustic feature weighting for speaker recognition.

## Institutions / 機構

Australian National University, Daido University

## Related

- (link related pages by id as the wiki grows)
