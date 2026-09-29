---
id: yuen26_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1080
pdf: https://www.isca-archive.org/interspeech_2026/yuen26_interspeech.pdf
---

# How do word frequency and syllable surprisal affect response time and acoustic duration in sentence formulation?

*Ivan Yuen, Bernd Möbius, Bistra Andreeva, Mitko Sabev*

[PDF](https://www.isca-archive.org/interspeech_2026/yuen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yuen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1080)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates how word frequency and syllable surprisal interact to affect speech initiation response times and acoustic vowel duration in German, finding selective interaction patterns that challenge traditional serial models of speech production. Contrary to additive hypotheses, cross-level interactions reveal distinct behaviors for monosyllabic versus disyllabic words.

## Key contributions

- Evaluated cross-level interactions between lexical word frequency and syllable-level surprisal on speech production planning using both response times and acoustic vowel durations.
- Utilized a carefully controlled set of German monosyllabic and disyllabic words across medial and final utterance positions elicited via targeted auditory prompt questions.
- Demonstrated that response time is influenced by word frequency and position for monosyllabic words, but by syllable surprisal for disyllabic words.
- Showed that acoustic long vowel duration in disyllabic words exhibits a significant three-way interaction between syllable surprisal, word frequency, and utterance position.

## Problem

Traditional psycholinguistic models of speech production (such as Levelt's framework) assume discrete, staged, and serial processing across linguistic levels, predicting clean additive effects of word frequency and syllable predictability. Prior studies mostly examined predictability at a single linguistic level (either word or syllable) or relied on pseudo-words where word and syllable frequencies covaried. It remains unclear how frequency at multiple embedded levels (word and syllable) jointly impacts lexical access, phonetic encoding, response latency, and acoustic realization.

## Method

The experiment used a picture-naming and sentence-generation task with 20 native German speakers (9 male, 11 female, mean age 23.4 years) producing target words embedded in carrier sentences in utterance-medial and utterance-final positions. Word frequency was derived from SUBTLEX-DE and CELEX (high frequency: >1000/million; low frequency: <630/million), while syllable-level unigram surprisal (-log2 probability) was estimated using an SRILM language model trained on the deWaC web corpus (1.7 billion tokens) with Witten-Bell smoothing.

Speech initiation response time (RT) was measured from the onset of the auditory prompt question to the start of the vocal response, and stressed vowel durations were manually annotated using precise acoustic landmarks in Praat. Linear mixed-effects models (fitted via lmerTest in R) analyzed log10-transformed RT and vowel duration, treating speaker and word as random effects with intercepts and by-factor slopes, and utilizing Satterthwaite approximations for degrees of freedom.

## Experimental setup

The dataset comprised 1,335 analyzed experimental items from 20 participants. Controls matched vowel identities (tense/long vs. lax/short), consonantal voicing, and syllable structures as closely as possible while varying pictureable word frequencies and syllable surprisal across medial and final utterance positions. Evaluation relied on linear mixed-effects model ANOVA tests examining main effects and higher-order interactions for log10(RT) and log10(vowel duration).

## Results

For monosyllabic words, RT models revealed significant main effects of word frequency (F(1, 7.55) = 7.55, p = .026) and utterance position (F(1, 20.43) = 4.82, p = .04), where low-frequency words showed faster RTs than high-frequency words, and medial positions took longer than final positions. For disyllabic words, a marginal main effect of syllable surprisal was observed (F(1, 9.3) = 4.3, p = .06), suggesting faster speech initiation for less frequent syllables.

For long vowel duration, disyllabic words yielded significant main effects of word frequency (F(1, 5.61) = 8.49, p = .03), syllable surprisal (F(1, 5.61) = 29.5, p = .002), and position (F(1, 24.02) = 174.7, p < .001), alongside a significant two-way interaction between syllable surprisal and word frequency (F(1, 408.17) = 14.8, p = .009). Counter to traditional serial hypotheses, high syllable surprisal unexpectedly correlated with shorter vowel durations in low-frequency disyllabic words, and monosyllabic vowel durations showed no surprisal or frequency main effects.

## Limitations

The study is restricted to German words and relies on a relatively narrow set of picturable concrete nouns matched across specific vowel classes. Low-frequency monosyllabic words exhibited a restricted range of syllable surprisal values, limiting statistical power for certain interactions. The sample size of 20 participants, while typical for controlled psycholinguistic production experiments, limits generalizability across broader speaker demographics.

## Why read this

Speech researchers and psycholinguists studying the interaction between lexical access and phonetic encoding should read this to understand why traditional serial processing assumptions fail when cross-level frequency measures are analyzed simultaneously.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving cognitive and computational models of human speech production, text-to-speech prosody generation, and psycholinguistic stimulus design.

## Institutions / 機構

Saarland University

**Funding / 經費:** Deutsche Forschungsgemeinschaft

## Related

- (link related pages by id as the wiki grows)
