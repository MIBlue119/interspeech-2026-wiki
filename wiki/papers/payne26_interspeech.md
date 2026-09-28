---
id: payne26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2691
pdf: https://www.isca-archive.org/interspeech_2026/payne26_interspeech.pdf
---

# Broad Focus Rise(-fall) Declaratives in Venetan: Investigating Typological Outliers in Italo-Romance Intonation

*Elinor Payne, Angelo Dian*

[PDF](https://www.isca-archive.org/interspeech_2026/payne26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/payne26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2691)

**TL;DR** — This paper investigates intonational rise(-falls) in broad focus declaratives (BFDs) within gambellarese, a central-western Venetan dialect, finding them to be roughly as common as traditional falls (47% prevalence) and independent of lexical stress position. This challenges standard Italo-Romance assumptions and highlights an alternative unmarked rising nuclear tune.

## Key contributions

- Identifies a 47% prevalence of alternative unmarked declarative rise(-falls) in semi-spontaneous speech from older, predominantly monolingual dialectophone speakers of gambellarese.
- Demonstrates via Chi-squared testing that nuclear contour choice (FALL vs. RISE(-FALL)) is orthogonal to lexical stress position across oxytonic, paroxytonic, and proparoxytonic words.
- Applies Generalized Additive Mixed Models (GAMMs) to show statistically significant differences in both f0 height and contour shape across contour types and word types (p < 0.001).
- Provides phonetic evidence that segmental material availability conditions surface realization (e.g., truncation to pure rises in oxytones due to tonal crowding).

## Problem

Unmarked intonational rises for declarative statements are crosslinguistically rare and generally contravene aerodynamic constraints and the frequency code, which links low pitch with finality. While Italo-Romance languages like Italian typically use a falling nuclear tune (H+L* L%) for broad focus declaratives, anecdotal and limited read-speech reports suggest Venetan dialects possess alternative rising contours. However, little is known about their acoustic-phonetic properties, distribution in spontaneous speech, or dependency on lexical stress, leaving a gap in understanding regional prosodic typological outliers.

## Method

The authors analyzed 1 hour and 22 minutes of semi-spontaneous conversation, sociolinguistic questionnaires, and map tasks from 8 older native speakers (aged 59–81) of gambellarese (a central-western Venetan dialect). Audio was recorded using a Zoom H1n Handy Recorder at 44.1 kHz / 16-bit. Acoustic analysis was performed in Praat, and F0 tracks were extracted in R via readtextgrid, praatsauce, and sauceshelf, converted to semitones by speaker, and corrected using PitchMendR.

The Region of Interest (RoI) was defined from the start of the pre-nuclear syllable to the end of the utterance to capture the entire nuclear tone unit. Contours were categorized into FALL, RISE, and RISE-FALL, with RISE and RISE-FALL collapsed into a single RISE(-FALL) category due to allophony and data sparsity. Word types were categorized into oxytonic and non-oxytonic (collapsing paroxytonic and proparoxytonic) to study tonal crowding.

Statistical evaluation utilized Generalized Additive Mixed Models (GAMMs) via the mgcv package. Three models (full model with contour and word type parametric/smooth terms, plus two reduced models) were compared using Maximum Likelihood (ML), incorporating random smooths for speaker and token to control for residual autocorrelation.

## Experimental setup

The study utilized a corpus of 269 broad focus declarative tokens in full intonational phrases extracted from 1 hour and 22 minutes of recorded semi-spontaneous speech by 8 older gambellarese speakers. The dataset breakdown included 59 oxytonic tokens (31 falls, 28 rises/rise-falls), 193 paroxytonic tokens, and 17 proparoxytonic tokens (collapsed into 210 non-oxytonic tokens: 114 falls, 96 rises/rise-falls). Metrics included normalized relative time, semitone-converted f0 values, and temporal alignment. Analysis relied on Pearson's Chi-squared tests with Yates' continuity correction and GAMM difference smooths generated using itsadug.

## Results

GAMM comparisons revealed significant overall effects for both contour type (difference = 122.874, df = 5, p < 0.001) and word type (difference = 25.909, df = 5, p < 0.001). Specifically, RISE(-FALL) contours exhibited a significantly higher overall f0 and distinct shape compared to FALLs, with differences significant between 59.6% and 100% of the normalized duration (p < 0.01 parametric, p < 0.001 non-linear). Word type also significantly impacted implementation, where oxytonic tokens showed higher pitch and different shapes than non-oxytonic tokens (p < 0.01), reflecting tonal crowding constraints.

In terms of distribution, RISE(-FALL) accounted for 47% of all broad focus declaratives (124 out of 269 tokens), proving as common as FALLs (145 tokens) and matching rates previously observed in younger read-speech cohorts. However, the study did not find sufficient proparoxytonic tokens in gambellarese to draw definitive statistical conclusions for that specific word class, and phonological target assignments (e.g., L* H-H% vs. H+L* L-L%) remain tentative pending pre-nuclear tonal alignment analysis.

| System / Condition | Total BFD Tokens | Fall Count (%) | Rise(-Fall) Count (%) | Chi-Square (p-value) |
|---|---|---|---|---|
| Oxytonic | 59 | 31 (52.5%) | 28 (47.5%) | χ²(1) = 0.008 |
| Non-Oxytonic (Par/Propar) | 210 | 114 (54.3%) | 96 (45.7%) | (p = 0.929) |
| Overall Corpus | 269 | 145 (53.9%) | 124 (46.1%) | - |

## Limitations

The study is limited by a relatively small corpus of 269 validated tokens from 8 speakers of a single Venetan dialect (gambellarese), restricting broader generalizations across all Romance varieties. Proparoxytonic tokens were sparse (17 total), preventing granular statistical evaluation for that subclass. Furthermore, the analysis relies on acoustic-phonetic modeling without perception tests or deep generative modeling, leaving the precise phonological representations (e.g., tonal targets like L* vs. H+L*) open to alternative interpretations.

## Why read this

Phoneticians and speech researchers studying intonational typology and dialectology should read this paper to understand how non-standard declarative rises function outside of Germanic languages. It provides robust GAMM-based acoustic evidence that challenges the universal assumption of falling declarative contours in Romance languages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving dialect-aware text-to-speech (TTS) synthesis and automated speech recognition (ASR) adaptation for regional Italo-Romance and minority languages.

## Related

- (link related pages by id as the wiki grows)
