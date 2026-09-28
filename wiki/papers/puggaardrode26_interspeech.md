---
id: puggaardrode26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1430
pdf: https://www.isca-archive.org/interspeech_2026/puggaardrode26_interspeech.pdf
---

# Automatic identification of the onset of creaky voice according to F0 instability

[PDF](https://www.isca-archive.org/interspeech_2026/puggaardrode26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/puggaardrode26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1430)

**TL;DR** — A signal-processing method is proposed to automatically locate modal-to-creaky voice transitions using fundamental frequency instability and REAPER epoch extraction, achieving substantial agreement with human manual annotations.

## Problem

Manual annotation of modal-to-creaky voice transitions is time-consuming, subjective, and prone to perceptual bias, while existing automatic tools only detect the general presence of creak within speech windows rather than precise temporal onsets. This gap hinders large-scale phonetic analyses of segmental creak, prosodic boundaries, and phonological contrasts that require fine-grained temporal measurements.

## Method

The method uses the REAPER pitch estimator to extract fundamental frequency (F0) and glottal closure instants (GCIs) with a 5 ms frame shift, exploiting unpenalized octave shifts that accompany glottalization. Praat is used to compute RMS amplitude to restrict the search window to the region following the vowel's amplitude peak (32 ms window, 8 ms shift). Creak onset is identified as the GCI closest to the first F0 frame where the frame-to-frame derivative reaches at least 80% of its peak value. Implemented as an R function, the pipeline can analyze individual audio files or directories, outputting rPraat TextGrids and diagnostic plots.

## Results

Evaluated on a subset of 474 monosyllabic /hVt/ items from the AusTalk corpus produced by young Australian English speakers, the method was compared against human-annotated creak onsets. A two-way single-measure intraclass correlation coefficient (ICC) of 0.762 (95% CI [0.712, 0.813]) demonstrated good reliability (F(472, 175) = 8.12, p < 0.001), though the automatic method tended to place creak onset 1-2 pulses earlier than humans. Linear mixed-effects models predicting glottalization-to-vowel (G/V) ratios using automatic versus human annotations yielded functionally identical phonetic findings: a significant overall effect of vowel type where short vowels differed significantly from long vowels, with no significant gender effects.

## Code

- https://osf.io/C8627

## Applications

Phoneticians, sociophoneticians, and speech researchers studying voice quality, segmental creak, glottalization, and prosodic boundaries at scale.

## Limitations

Tested exclusively on word-final segmental creak (coda voicing contrast) in Australian English; generalizability to other languages, dialects, or phonological sources of creak remains to be validated.

## Related

- (link related pages by id as the wiki grows)
