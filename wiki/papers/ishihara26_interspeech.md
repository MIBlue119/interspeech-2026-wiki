---
id: ishihara26_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-303
pdf: https://www.isca-archive.org/interspeech_2026/ishihara26_interspeech.pdf
---

# Sub-band Cepstral Analysis of Speaker-Specific Information: A Case Study of Japanese Word /saN/

*Shunichi Ishihara, Frantz Clermont, Can Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/ishihara26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ishihara26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-303)

**TL;DR** — This study investigates how speaker-discriminative information is distributed across frequency sub-bands for Japanese segments /s/, /a/, and /N/ using Band-Limited Cepstral Coefficients (BLCCs) in a forensic voice comparison (FVC) framework. The vowel /a/ and nasal /N/ outperformed the fricative /s/, and fusing just four optimal sub-bands approached full-band FVC performance.

## Key contributions

- Applied the band-limited cepstral coefficient (BLCC) method via linear transformations to investigate sub-band speaker-specific information for consonants (/s/, /N/) and vowels (/a/) without signal re-analysis.
- Demonstrated that speaker-discriminative information is unevenly distributed across the 0-8 kHz spectrum, with performance degrading sharply in the final 1 kHz (7-8 kHz) across all segments.
- Identified optimal sub-band locations for each phoneme: 1-2 kHz for /s/, 5-6 kHz and formant regions F2/F3 for /a/, and <4 kHz (peaking near 0.5-1 kHz) for /N/.
- Showed that fusing a small number (up to 4) of well-spaced, highly informative sub-bands yields log-likelihood-ratio costs approaching those of full-band systems.

## Problem

Speaker-discriminative information is non-uniform across the audio spectrum, yet most prior forensic voice comparison (FVC) and running speech studies provide only broad, whole-spectrum views without detailing how speaker-specific cues localize across different phonemic contexts. Traditional filterbank-based sub-band analyses lack precise control and flexibility, while prior work on isolated segments has focused almost exclusively on vowels rather than consonants like fricatives (/s/) and nasals (/N/). Understanding these fine-grained spectral distributions is legally and forensically crucial for interpreting voice comparison evidence accurately in court.

## Method

The authors utilized the Band-Limited Cepstral Coefficient (BLCC) method to extract sub-band cepstral representations directly from full-band features via linear transformation matrices, avoiding signal re-analysis. Speech data was analyzed using 25-ms frames with 5-ms shifts, applying 25 triangular filters on a linear frequency scale from 0 to 8 kHz to extract 14 linear-frequency cepstral coefficients (LFCCs). The three central frames were averaged to form a stable full-band vector per segment. 

Sub-band analysis was performed using 0.6-kHz wide sub-bands shifted in 0.2-kHz increments across the 0–8 kHz range, yielding 38 overlapping sub-bands. The transformation parameter was set such that each BLCC vector contained two coefficients (including the 0th-order term). Likelihood ratios (LRs) were estimated using a multivariate kernel density model, calibrated via logistic regression, and evaluated using log-likelihood-ratio costs (C_llr). Experiment 2 systematically fused LRs from groups of two to four sub-bands to measure combinatorial performance gains against full-band baselines.

## Experimental setup

Evaluated using the National Research Institute of Police Science database of Japanese adult-male speakers (306 speakers, mean age 39.9 years) producing citation-form tokens of the word /saN/ across two recording sessions separated by 3–5 months. A six-fold cross-validation rotation scheme was used (102 speakers per batch, split into test, background, and calibration sets), yielding 102 same-speaker and 10,302 different-speaker comparisons per fold. Performance was measured via log-likelihood-ratio cost (C_llr, C_min, C_cal) and Equal Error Rate (EER), comparing sub-band models and multi-sub-band fusions against full-band LFCC baselines.

## Results

Full-band baseline performance showed that the vowel /a/ yielded the best results (C_llr = 0.38766, EER = 9.66%), followed by the nasal /N/ (C_llr = 0.43473, EER = 12.09%), while the fricative /s/ performed considerably worse (C_llr = 0.68110, EER = 22.03%). In sub-band analyses, all segments exhibited sharp performance degradation in the highest 7–8 kHz frequency band. For /s/, the best performance concentrated around 1–2 kHz and 6.5 kHz; for /a/, the peak single sub-band occurred at 5.2–5.9 kHz (C_llr = 0.76044) alongside F2/F3 regions; for /N/, performance concentrated below 4 kHz with a minimum around 0.5–1 kHz. Fusing four carefully selected sub-bands yielded C_llr values that closely approached the full-band system.

| System / Segment | Full-Band C_llr | Best Single Sub-band C_llr | Best 4-Fused Sub-band C_llr | Full-Band EER |
|---|---|---|---|---|
| /s/ (fricative) | 0.681 | ~0.85 | -- | 22.03% |
| /a/ (vowel) | 0.388 | 0.760 | -- | 9.66% |
| /N/ (nasal) | 0.435 | ~0.75 | -- | 12.09% |

## Limitations

The study is restricted to a single word token (/saN/), adult male speakers of a single language (Japanese), and laboratory-quality recordings downsampled to 16 kHz, which does not reflect severe telephone channel bandwidth constraints or channel mismatch conditions typical of real forensic casework. Furthermore, combinations exceeding four fused sub-bands were omitted due to computational constraints, and alternative filter scales (such as Mel or Bark) or linear prediction coefficients were not evaluated.

## Why read this

Speech and forensic science researchers will appreciate how the BLCC framework enables precise, computationally efficient sub-band extraction without signal re-analysis. It provides clear empirical evidence that speaker-discriminative cues are highly non-uniform and phoneme-dependent.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic voice comparison, speaker verification, and phonetic profiling of speech segments.

## Related

- (link related pages by id as the wiki grows)
