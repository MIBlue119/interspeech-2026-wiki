---
id: gu26_interspeech
category: speech-perception
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1290
pdf: https://www.isca-archive.org/interspeech_2026/gu26_interspeech.pdf
---

# Mutual Cancellation between Masking Effects Benefits Speech Intelligibility

*Yixin Gu, Yan Tang*

[PDF](https://www.isca-archive.org/interspeech_2026/gu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1290)

**TL;DR** — This study investigates how informational masking (IM) and modulation masking (MM) interact with energetic masking (EM) in cross-language speech perception, finding that releasing modulation masking can cancel out increased energetic masking to improve intelligibility. Word recognition rates (WRR) improved by up to 5.6 percentage points when masking with Mandarin competing speech compared to English at low EM levels.

## Key contributions

- Controlled energetic masking (EM) independently of global SNR across different maskers using High-Energy Glimpse Proportion (HEGP) at three distinct levels (0.3, 0.4, and 0.5).
- Isolated linguistic similarity effects by comparing English and Mandarin competing speech (CS) while synthesizing modulation-controlled noise maskers (STM-50, STM-12, STM-5, TM, and TS) via linear predictive coding (LPC) and temporal envelope modulation.
- Demonstrated that release from modulation masking (MM) can compensate for increased energetic masking, maintaining or improving word recognition rates in stationary noise (TS) compared to temporally modulated (TM) noise.
- Revealed that linguistic similarity effects on IM are masked by level cues under high EM (low SNR) conditions and only surface when EM is low (0.5 HEGP).

## Problem

Prior speech perception studies attempting to isolate informational masking (IM) from energetic masking (EM) typically manipulated global SNRs or speech-to-reversal techniques, which inadvertently confounded EM with the masker's periodicity, linguistic intelligibility, and modulation properties. Specifically, competing speech introduces IM when sharing acoustic and linguistic traits with the target, while modulation masking (MM) disrupts the spectro-temporal modulation domain independently. Because these masking forms interact concurrently, failing to tightly constrain EM via glimpse-based metrics obscures the true underlying contributions of language dissimilarity, periodicity, and spectro-temporal modulation on human speech intelligibility.

## Method

Target materials comprised Harvard sentences spoken by an American male, restricted to sentences beginning with the word 'the' to provide a consistent listener prompt. Competing speech (CS) was constructed using 30-minute concatenated bases from English Harvard sentences and a TIMIT-like Mandarin corpus. To generate modulation-controlled noise maskers without the periodicity that introduces heavy IM, white noise frames were filtered using linear predictive coding (LPC) coefficients estimated from the CS every 20 ms with a 50% overlap Hamming window. LPC orders of 50, 12, and 5 were selected to build STM-50, STM-12, and STM-5 maskers, capturing decreasing granularities of spectro-temporal modulation (with mean cross-correlation coefficients to original CS dropping from 0.89). Temporally-modulated (TM) noise was created by applying smoothed Hilbert envelopes of the CS to temporally-stationary (TS) noise, and TS noise was generated using long-term average spectra.

EM was controlled using the High-Energy Glimpse Proportion (HEGP) metric. Rather than applying a flat SNR, an adaptive procedure adjusted each individual target-masker pair to achieve specific HEGP targets of 0.3, 0.4, and 0.5 (where lower HEGP indicates stronger EM). This generated a complete design of 36 experimental conditions (2 languages × 3 EM levels × 6 noise types). Twenty-five native English-speaking listeners with normal hearing completed a word-transcription listening test consisting of 180 unique sentences presented at roughly 67 dBA in a sound-treated booth. Listener responses were evaluated using word recognition rate (WRR).

## Experimental setup

Evaluated using a human listening experiment with 25 native American English speakers (ages 18-34, mean 21.0) with normal hearing. Stimuli consisted of American English target sentences masked by English competing speech, Mandarin competing speech, and derived noise maskers (STM-50, STM-12, STM-5, TM, TS) at three HEGP levels (0.3, 0.4, 0.5). Metrics evaluated included word recognition rate (WRR) percentage, repeated-measures ANOVA, and high-energy glimpse counts.

## Results

Overall word recognition rate (WRR) scaled heavily with EM levels, showing mean WRRs of 17.4% at 0.3 HEGP, 33.8% at 0.4 HEGP, and significantly higher performance at 0.5 HEGP. At 0.5 HEGP, Mandarin-derived maskers yielded a WRR of 56.9%, which was 5.6 percentage points higher than English-derived maskers. Across masker types, raw competing speech (CS) consistently produced the lowest WRRs due to combined IM and MM, with progressive WRR improvements observed as modulation preservation decreased from STM-50 down to TM. A three-way repeated-measures ANOVA confirmed significant main effects for EM level (F(2,48) = 396.388, p < 0.001, η² = 0.508) and masker type (F(5,120) = 75.365, p < 0.001, η² = 0.341), alongside a smaller but significant language effect (F(1,24) = 4.356, p = 0.048, η² = 0.005).

| Condition / Masker | 0.3 HEGP WRR (%) | 0.4 HEGP WRR (%) | 0.5 HEGP WRR (%) |
| :--- | :--- | :--- | :--- |
| English CS | ~17.4 | ~33.8 | ~51.3 |
| English STM-50 | -- | -- | -- |
| Mandarin CS | ~17.4 | ~33.8 | ~56.9 |
| Mandarin STM-50 | -- | -- | -- |

## Limitations

The study is restricted to native American English listeners evaluating American English targets masked by English and Mandarin speech, limiting its cross-linguistic scope. The experiments rely exclusively on human behavioral listening tests with a limited participant pool (25 subjects) rather than automated or machine speech recognition pipelines. Furthermore, the LPC-based synthesis approach may leave residual linguistic envelope cues in low-order maskers, making complete isolation of pure informational masking versus modulation masking technically complex.

## Why read this

Speech perception researchers and computational auditory modelers should read this paper to understand how High-Energy Glimpse Proportion (HEGP) can successfully decouple energetic masking from informational and modulation masking. It provides rigorous behavioral evidence proving that modulation release can actively offset energetic penalties in human speech intelligibility.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving speech enhancement and noise-suppression algorithms for communication devices by targeting modulation masking rather than just global energetic SNR.

## Related

- (link related pages by id as the wiki grows)
