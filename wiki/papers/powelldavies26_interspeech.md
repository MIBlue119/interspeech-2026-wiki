---
id: powelldavies26_interspeech
category: phonetics-linguistics
institutions: ["Australian National University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1555
pdf: https://www.isca-archive.org/interspeech_2026/powelldavies26_interspeech.pdf
---

# An investigation of post-stop breathiness in Australian English

*Thomas Powell-Davies, Rosey Billington*

[PDF](https://www.isca-archive.org/interspeech_2026/powelldavies26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/powelldavies26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1555)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates post-stop breathiness following voiceless onset stops (/p, t, k/) in Australian English, revealing that complex release phases with breathy voicing occur in over 40% of tokens. It demonstrates that accounting for these breathy phases alters standard durational and sociophonetic metrics like Voice Onset Time (VOT).

## Key contributions

- Identifies and documents post-stop breathiness in Australian English voiceless stops, a phenomenon previously unreported in English varieties.
- Proposes a multi-tier annotation and segmentation methodology in Praat combining aspiration phase (ACT) and superimposed aspiration/breathy voicing (SA).
- Analyzes 1,638 wordlist tokens from 37 Tasmanian speakers, finding breathiness occurs in 42% of tokens with significant variation by speaker gender and place of articulation.
- Shows that including breathy phases in combined VOT measurements modifies the relationship between alveolar and velar stop durations.

## Problem

Traditional descriptions of English stop contrasts rely strictly on Voice Onset Time (VOT) as a one-dimensional measure, ignoring complex release dynamics. While post-aspiration breathiness is known in languages with four-way stop contrasts like Bengali, it has been largely overlooked in English varieties. This gap matters because treating stop releases as purely consisting of aspiration misses key linguistic and sociophonetic variation tied to gender, age, and place of articulation.

## Method

Audio data was recorded at 24-bit 96 kHz using a RØDE NT3 cardioid microphone and Zoom H6 recorder, then downsampled to 16-bit 44.1 kHz for processing. Forced alignments were generated using the Montreal Forced Aligned (MFA) English model v.3.1.0 with a custom Australian English phone dictionary. Annotations were conducted using a two-tier Praat TextGrid system: Tier 1 measured overall Voice Onset Time from the burst release to vowel onset, while Tier 2 separated the release into an initial aperiodic aspiration phase (ACT) and a subsequent breathy voicing phase (Superimposed Aspiration, SA) characterized by periodicity, a visible voicing bar, and frication lasting at least two cycles (8-15ms).

Statistical modeling was performed using R via the EMU-SDMS database package and lme4 for generalised linear mixed effects models. A binomial GLMM tested the presence of breathy phases against gender, age group, place of articulation, and syllable count, with speaker and target word as random effects. Additional linear mixed effects models examined the durational properties of aspiration-only versus combined VOT durations across these factors.

## Experimental setup

The dataset comprises 1,638 tokens from 37 Tasmanian speakers of Australian English (22 female, 13 male, 2 other genders; 18 younger aged 18-35, 19 older aged 50-70) uttering 9 wordlist items featuring initial /p, t, k/ before /æ/. Measurements were evaluated using counts, proportions, and mixed-effects regression models, comparing aspiration-only durations against combined VOT durations.

## Results

Breathy phases occurred in 42% (689/1,638) of total tokens. Female speakers exhibited breathiness in 55% of their tokens compared to 21% for male speakers, a statistically significant difference (p < 0.001). Place of articulation was also significant (p = 0.04), with velar stops showing lower rates of breathiness (38%) than bilabial (44%) and alveolar (44%) stops.

For durational properties, aspiration-only means were 73.8 ms for /p/, 82.4 ms for /t/, and 84.0 ms for /k/. When adding mean breathy phase durations (8.6 ms for /p/, 8.5 ms for /t/, 6.7 ms for /k/), the combined VOT for alveolar stops increased to 90.8 ms, nearly matching velar stops at 90.6 ms (while bilabial remained shorter at 82.4 ms). Breathy phase durations generally ranged from 8 ms to 30 ms, with over 100 tokens exceeding this range.

| Phone | Aspiration Only (ms) | Breathy Only (ms) | Combined VOT (ms) | Breathy Proportion (%) |
|---|---|---|---|---|
| /p/ | 73.8 | 8.6 | 82.4 | 44% |
| /t/ | 82.4 | 8.5 | 90.8 | 44% |
| /k/ | 84.0 | 6.7 | 90.6 | 38% |
| Total/Mean | 80.1 | 7.9 | 88.0 | 42% |

## Limitations

The dataset is geographically restricted to 37 speakers from Tasmania, limiting immediate generalizability to all dialects of Australian or global English. The data relies on a controlled wordlist rather than fully unconstrained spontaneous speech corpora. Furthermore, the acoustic analysis focuses primarily on durational properties and broad phonation categories without exhaustive spectral or airflow measurements.

## Why read this

Phoneticians and sociolinguists studying English stop consonants and voice quality should read this paper to understand how multi-tier release segmentation uncovers hidden phonation variation. It challenges standard VOT-only assumptions and provides a concrete methodological framework for analyzing post-stop breathiness in Germanic languages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving acoustic-phonetic transcription guidelines, enhancing sociolinguistic speaker profiling models, and refining acoustic modeling for under-resourced phonation phenomena in English varieties.

## Institutions / 機構

Australian National University

**Funding / 經費:** Australian Government Research Training Program, HDR funding from the School of Literature, Language and Linguistics at the Australian National University

## Related

- (link related pages by id as the wiki grows)
