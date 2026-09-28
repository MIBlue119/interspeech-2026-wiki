---
id: puggaardrode26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1430
pdf: https://www.isca-archive.org/interspeech_2026/puggaardrode26_interspeech.pdf
---

# Automatic identification of the onset of creaky voice according to F0 instability

*Rasmus Puggaard-Rode, Joshua Penney*

[PDF](https://www.isca-archive.org/interspeech_2026/puggaardrode26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/puggaardrode26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1430)

**TL;DR** — An automatic method for detecting modal-to-creaky voice transitions using F0 instability and REAPER pitch estimation achieves strong agreement with human annotators (ICC = 0.768) and yields functionally identical phonetic study outcomes.

## Key contributions

- Proposes a novel signal-processing automatic method to locate fine-grained modal-to-creak transitions via F0 derivatives and REAPER glottal closure instants (GCIs).
- Evaluates the tool on 474 Australian English /hVt/ words exhibiting segmental creak, comparing it against human annotations.
- Demonstrates good inter-annotator agreement (ICC = 0.768) and shows that both automatic and manual pipelines yield identical linguistic conclusions regarding vowel length and glottalization ratios.
- Releases an open-source R package featuring bulk analysis, TextGrid generation, and diagnostic plotting capabilities.

## Problem

Manual annotation of modal-to-creaky voice transitions is resource-intensive, subjective, and prone to perceptual bias. Existing automatic creak detection tools only predict the presence or absence of creak within a fixed speech window rather than marking precise temporal onsets. Furthermore, pitch trackers like Praat often smooth over or penalize octave shifts, rendering them incapable of detecting the fundamental frequency jumps that characterize the onset of creaky voice.

## Method

The method extracts fundamental frequency and glottal closure instants (GCIs) using the Robust Epoch And Pitch Estimator (REAPER), which uniquely does not penalize octave shifts and applies default F0 floor/ceiling boundaries of 40 Hz and 500 Hz respectively with a 5 ms window shift. Root-mean-squared (RMS) amplitude is calculated using Praat (32 ms window length, 8 ms window shift) to restrict the search window to the region following the RMS amplitude peak, thereby avoiding false triggers from initial /h/ aspiration noise. 

F0 instability is quantified by computing the first-order derivative of the F0 time series at a 1-frame time lag. The onset of creak is identified at the first frame where the F0 derivative reaches or exceeds 80% of the peak derivative, mapped directly to the temporally closest REAPER-predicted GCI. The system is implemented as an R function that accepts Praat TextGrids or raw audio, returning updated TextGrids and diagnostic plots.

## Experimental setup

Evaluated on a subset of 474 monosyllabic /hVt/ isolation words produced by 36 young Australian English speakers (17 female, 19 male) extracted from the AusTalk corpus. Performance is measured against manual human annotations using intraclass correlation coefficients (ICC, two-way single-measure), creak duration error distribution, and linear mixed-effects models (via lme4) predicting glottalization-to-vowel (G/V) ratios across vowel categories.

## Results

The automatic method achieved an intraclass correlation coefficient of ICC = 0.768 (95% CI [0.712, 0.813], F(472, 175) = 8.12, p < 0.001) compared to human labels, indicating good agreement despite a slight systematic tendency for the automatic algorithm to place creak onsets 1-2 pulses earlier. In linear mixed-effects modeling of G/V ratios, both human and automatic annotations revealed identical linguistic patterns: a significant main effect of vowel type (auto: chi-squared(6) = 97.6, p < 0.0001; human: chi-squared(6) = 70.8, p < 0.0001) showing higher glottalization ratios in short vowels than long vowels, with no significant effect of speaker gender or interactions.

| System | ICC vs Human | Primary G/V Vowel Effect | Outlier / Error Rate |
|---|---|---|---| 
| Human Annotation (Gold) | 1.000 | Significant (p < 0.0001) | 0.0% |
| REAPER-based Auto Method | 0.768 | Significant (p < 0.0001) | <0.3% (1 token) |

## Limitations

Tested exclusively on word-final segmental creak (/t/-glottalization) in a single regional variety of English, leaving generalizability to other phonological creak sources (e.g., register languages, stød) unverified. The search window heuristic relies on RMS amplitude peaks after vowel onset, which may require manual tuning for non-isolated words or different phonetic contexts. Residual periodicity past vowel offsets can occasionally trigger erroneous GCI selections requiring token discarding.

## Why read this

Phoneticians and speech engineers seeking a fast, transparent, non-neural alternative to manual annotation for high-precision voice quality boundary detection will find this R-based toolkit immediately practical.

## Code

- https://doi.org/10.17605/OSF.IO/C8627

## Applications

Automated socio-phonetic corpus annotation, large-scale acoustic analysis of glottalization and voice quality, and data cleaning for pitch-tracking pipelines.

## Related

- (link related pages by id as the wiki grows)
