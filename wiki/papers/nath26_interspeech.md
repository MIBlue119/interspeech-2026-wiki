---
id: nath26_interspeech
category: phonetics-linguistics
institutions: ["Australian National University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3034
pdf: https://www.isca-archive.org/interspeech_2026/nath26_interspeech.pdf
---

# An Acoustic Investigation of Mid Front Vowel Harmony in Assamese

*Saurabh Nath, Rosey Billington, Danielle Barth*

[PDF](https://www.isca-archive.org/interspeech_2026/nath26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nath26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3034)

**Category:** `phonetics-linguistics`

**TL;DR** — This study provides a systematic acoustic investigation of mid front vowel harmony (/E/-raising) across three major dialect regions of Assamese, confirming significant and consistent vowel height (F1) and frontness (F2) shifts in harmonic (/CECi/) versus non-harmonic (/CECa/) contexts. The magnitude of the F1 raising effect varies significantly across dialect-style combinations, demonstrating an acoustic asymmetry where vowel height shows a complex three-way interaction while frontness remains stable.

## Key contributions

- Provides the first systematic acoustic phonetic analysis of mid front vowel harmony in Assamese across three major dialect regions (Western, Central, and Eastern).
- Analyzes a balanced dataset of 371 tokens combining careful wordlist elicitations and spontaneous connected speech from 18 speakers.
- Applies Nearey1 formant normalization and linear mixed-effects modeling to isolate the effects of harmonic context, vowel duration, dialect, speech style, and gender.
- Reveals a structural acoustic asymmetry showing a significant three-way interaction for vowel height (F1) across dialect, style, and context, contrasted with stable frontness (F2) shifts.

## Problem

Prior descriptions of Assamese have debated whether mid front vowel harmony represents a categorical phonological raising process, a neutralization pattern, or an [+ATR] feature spread triggered by following close vowels like /i/ and /u/. However, existing formal analyses relied heavily on idealized standard varieties, while conflicting articulatory ultrasound studies showed high inter-speaker variability and a lack of uniform application. Systematic acoustic evidence across regional dialects and naturalistic speech styles has remained severely limited, leaving the phonetic reality and uniformity of Assamese vowel harmony unclear.

## Method

The study analyzes acoustic tokens extracted from the Corpus of Contemporary Assamese (COCAS), focusing on bisyllabic words comparing harmonic (/CECi/, e.g., /bEki/, /sEki/) and non-harmonic (/CECa/, e.g., /bEka/, /sEka/) contexts. Formant frequencies (F1 and F2) were extracted at five temporal points using Fast Track, with midpoints (50%) used for analysis, and normalized using the speaker-intrinsic Nearey1 log-mean method scaled back to Hz.

Statistical modeling was conducted in R using linear mixed-effects models via the lme4 package, incorporating random intercepts for speaker and word to handle repeated measures. For both F1 and F2, models were built sequentially from an intercept-only baseline to main effects, two-way interactions (harmonic context, style, dialect), and a three-way interaction model, alongside additive controls for vowel duration and gender. Likelihood ratio tests based on AIC and maximum likelihood estimation determined that F1 required a three-way interaction model, whereas F2 was best captured by a model retaining only two-way interactions.

## Experimental setup

Data comprise 371 tokens (212 from wordlists, 159 from connected speech) sourced from 18 native Assamese adult speakers (ages 50-65, balanced 3 male/female per region) across Sorbhog, Bihaguri, and Gogamukh dialect regions. Measurements were evaluated using linear mixed-effects models and Tukey-adjusted estimated marginal means via the emmeans package.

## Results

Harmonic context significantly shifted vowel quality across all conditions: F1 values for /E/ in /CECi/ words were consistently lower than in /CECa/ words (reflecting a 111 to 156 Hz raising effect, p < 0.001), while F2 values were significantly higher (reflecting a fronting effect of ~290 to 337 Hz, p < 0.001). The F1 model revealed a significant three-way interaction between harmonic context, speech style, and dialect region (χ²(2) = 11.30, p = 0.004), indicating context-dependent modulation of vowel height. In contrast, the F2 model showed only two-way interactions without a higher-order term, demonstrating that frontness is structurally stable across dialects and styles.

| System / Condition | Location | Style | F1 E-a Diff (Hz) | F2 E-a Diff (Hz) |
|---|---|---|---|---|
| Harmonic vs Non-Harmonic | Bihaguri | Connected | 152 | 337 |
| Harmonic vs Non-Harmonic | Bihaguri | Wordlist | 130 | 290 |
| Harmonic vs Non-Harmonic | Gogamukh | Connected | 153 | 337 |
| Harmonic vs Non-Harmonic | Gogamukh | Wordlist | 111 | 290 |
| Harmonic vs Non-Harmonic | Sorbhog | Connected | 129 | 337 |
| Harmonic vs Non-Harmonic | Sorbhog | Wordlist | 156 | 290 |

## Limitations

The study's scope is restricted to bisyllabic words with specific phonological environments (/CECi/ vs /CECa/) and a modest token count of 371 items from 18 speakers, limiting broad lexical generalization. Spontaneous speech tokens were sparser and exhibited greater variance than careful wordlist recordings. The analysis focuses entirely on mid front vowels, omitting parallel back vowel harmonic pairs (/o, O/) and potential coarticulatory interactions with intervening consonants beyond obstruents and sibilants.

## Why read this

Phoneticians and speech researchers studying vowel harmony, regional dialect variation, and acoustic phonetic modeling will appreciate this work for its rigorous mixed-effects separation of dialect and stylistic variance. It offers crucial empirical baseline data showing how phonetic height and frontness dimensions decouple under harmonic pressure.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving acoustic modeling, pronunciation dictionaries, and forced alignment tools for low-resource Indo-Aryan languages like Assamese by accounting for dialect-specific phonological variation and vowel harmony.

## Institutions / 機構

Australian National University

**Funding / 經費:** Australian Linguistic Society Research Grant, Bhati Family India Travel Grant, South Asian Research Institute Student Support Grant

## Related

- (link related pages by id as the wiki grows)
