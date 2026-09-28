---
id: lipari26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2975
pdf: https://www.isca-archive.org/interspeech_2026/lipari26_interspeech.pdf
---

# Disentangling sociophonetic and physiological variation in /s/ acoustics across 12 languages

*Massimo Lipari, Morgan Sonderegger, Meghan Clayards*

[PDF](https://www.isca-archive.org/interspeech_2026/lipari26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lipari26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2975)

**TL;DR** — This paper investigates whether gender differences in /s/ sibilant acoustics are driven by physical vocal tract length (VTL) or social performance, using causal mediation analysis on a new multilingual database of 12 languages and 1,386 speakers. The results show that while VTL reliably predicts /s/ peak frequency across nearly all languages, the relative contributions of anatomy and social performance vary drastically—revealing hidden social effects or cancelling effects in specific languages like Mandarin.

## Key contributions

- Assembled a new multilingual phonetic database combining GlobalPhone, NCHLT, and LibriSpeech, spanning 12 languages, 1,386 speakers, 3.8 million vowel tokens, and 128,949 /s/ tokens.
- Applied causal mediation analysis to phonetics to mathematically disentangle the direct effect of gender (social performance) from the indirect effect mediated by vocal tract length (anatomy).
- Demonstrated that estimated VTL ($\Delta_F$) predicts /s/ peak frequency consistently across 11 out of 12 languages (with Arabic as the sole exception).
- Uncovered hidden social effects in languages like Mandarin and Arabic, where direct (social) and indirect (physiological) effects run in opposite directions and cancel out total effects.

## Problem

Sibilant fricatives like /s/ often exhibit acoustic differences between male and female speakers, but it is historically difficult to determine from acoustic data alone whether this variation stems from physiological differences (such as vocal tract length and front cavity size) or from the active performance of social identity. Prior approaches either ignored VTL or assumed a direct mapping, missing cases where speakers override anatomy for social reasons (e.g., working-class Glaswegian girls sounding more masculine) or where social performance masks physiological realities. Without proper causal modeling, researchers risk misattributing anatomical differences to social performance or overlooking true sociophonetic variation.

## Method

The study analyzes read speech sampled at 16 kHz from a curated set of ASR corpora. Vowel formants (F1–F3) were extracted at 33% duration for all vowels longer than 50 ms using PolyglotDB and a basic LPC refinement procedure with acoustic prototypes mapped from Buckeye and Quebec French. Speaker-level vocal tract length proxy $\Delta_F$ (average formant spacing) was computed using the inverse relationship. For sibilants, multitaper spectra (8 tapers, time-bandwidth 4) were computed over a 20 ms window at the midpoint of word-initial pre-vocalic /s/ tokens longer than 50 ms, with amplitude normalized against local silence and speech. The highest spectral peak above 1 kHz was measured as a proxy for front cavity length.

To separate physiological and social pathways, the authors implemented causal mediation analysis using linear mixed-effects regression models via lme4 and the mediation package in R. The full outcome model regressed /s/ peak frequency on $\Delta_F$, GENDER (binary-coded and mean-centered), and their interaction, with maximal by-language random effects. The full mediator model regressed $\Delta_F$ on GENDER. The direct effect of gender is captured by the GENDER coefficient in the outcome model (controlling for VTL), while the indirect effect is the product of the GENDER coefficient in the mediator model and the $\Delta_F$ coefficient in the outcome model. By-language models without random effects were also fitted individually to evaluate cross-linguistic heterogeneity.

## Experimental setup

The final dataset contains 1,386 speakers across 12 languages (Czech, Polish, Russian, Afrikaans, English, Swedish, French, Spanish, Arabic, Japanese, Korean, Mandarin), encompassing 3,806,272 vowel tokens and 128,949 /s/ tokens. Force alignment was performed using the Montreal Forced Aligner (MFA) with custom acoustic models and pronunciation dictionaries (supplemented by Epitran for Japanese and G2P for Arabic). Statistical significance for mediation pathways was assessed using quasi-Bayesian confidence intervals.

## Results

The full outcome model yielded a conditional $R^2$ of 0.444 and a marginal $R^2$ of 0.247. There is a strong, statistically significant effect of $\Delta_F$ ($\hat{\beta} = 547 \pm 217$ Hz, $p = 0.001$), where shorter VTL ($\Delta_F$) predicts higher /s/ peak frequency. The direct effect of GENDER is smaller and marginal ($\hat{\beta} = -245 \pm 268$ Hz, $p = 0.10$), while the indirect effect mediated by $\Delta_F$ is highly significant ($-493 \pm 218$ Hz, $p < 0.001$). Across individual languages, Afrikaans, Czech, and English show both significant direct and indirect effects. Mandarin exhibits significant direct and indirect effects of similar magnitude but opposite signs, which cancel out to yield a non-significant total effect. Arabic is the only language showing no significant relationship between $\Delta_F$ and peak frequency.

| System / Language Condition | Direct Effect (Social) | Indirect Effect (VTL-Mediated) | Total Effect |
|---|---|---|---|
| Full Model (Average) | $-245 \pm 268$ Hz ($p=0.10$) | $-493 \pm 218$ Hz ($p<0.001$) | $-738 \pm 244$ Hz ($p<0.001$) |
| English | Significant | Significant | Significant |
| Mandarin | Significant (Positive) | Significant (Negative) | Non-significant (Cancel out) |
| Japanese | Non-significant | Non-significant | Significant |
| Arabic | Non-significant | Non-significant | Borderline significant |

## Limitations

The dataset relies exclusively on read speech, which is typically less conducive to social identity performance than spontaneous conversational speech. Gender and sex are conflated in the metadata, meaning sex-based morphological differences in vocal tract shape rather than pure social performance could bleed into the direct effect. The 16 kHz sampling rate limits spectral resolution above 8 kHz, potentially capping peak measurements for female speakers with extremely short vocal tracts. Additionally, using overall peak frequency is a noisy index for front cavity resonance compared to narrow-band targeted searches.

## Why read this

Phoneticians, sociolinguists, and speech researchers should read this paper to understand how to rigorously separate anatomical traits from social performance in acoustic data without requiring physical body measurements. It provides a blueprint for applying causal mediation analysis across multilingual corpora, demonstrating that standard acoustic gender differences cannot be taken at face value.

## Code

- https://osf.io/m58e3/

## Applications

Improving sociolinguistic speech analysis, building more robust and culturally aware speaker normalization algorithms, and designing unbiased speech recognition systems that distinguish physiological anatomy from stylistic speech variation.

## Related

- (link related pages by id as the wiki grows)
