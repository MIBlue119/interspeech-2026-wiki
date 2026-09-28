---
id: lipari26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2975
pdf: https://www.isca-archive.org/interspeech_2026/lipari26_interspeech.pdf
---

# Disentangling sociophonetic and physiological variation in /s/ acoustics across 12 languages

[PDF](https://www.isca-archive.org/interspeech_2026/lipari26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lipari26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2975)

**TL;DR** — Using a new multilingual phonetic corpus of 1,386 speakers across 12 languages and causal mediation analysis, this paper disentangles anatomical and social drivers of gender variation in /s/ acoustics, finding that while vocal tract length predicts spectral peak globally, the relative contributions of physiology and performance vary drastically by language.

## Problem

Sibilant fricatives like /s/ consistently exhibit gendered acoustic variation across languages, but it is difficult to determine whether these differences stem purely from physical vocal tract length (VTL) or from social performance. Without separating these pathways, researchers cannot reliably interpret whether observed gender differences are physiological artifacts or intentional social markers. Addressing this requires causal inference tools and large-scale multilingual acoustic data, which have previously been lacking.

## Method

The authors assembled a new purpose-built database combining read speech from GlobalPhone, the NCHLT corpus, and LibriSpeech, covering 12 languages, 1,403 speakers (filtered to 1,386), 3.8M+ vowel tokens, and 128,949 /s/ tokens. Formants F1-F3 were extracted at 33% duration using iterative LPC refinement to estimate average formant spacing delta-F as a proxy for VTL. Word-initial pre-vocalic /s/ tokens longer than 50ms were analyzed using multitaper spectra normalized against silence/speech amplitudes to find the highest spectral peak above 1 kHz. They then applied linear mixed-effects regression and causal mediation analysis to model the direct effect of gender and indirect effects mediated by VTL.

## Results

The full outcome model yielded a conditional R2 of 0.444 and marginal R2 of 0.247, showing a strong positive effect of delta-F on /s/ peak frequency (beta = 547 Hz, p = 0.001) where shorter VTL yields higher peaks. The global indirect effect of gender mediated by VTL was significant (-493 Hz, p < 0.001), while the direct effect of gender was smaller and marginal (-245 Hz, p = 0.10). Cross-linguistic breakdown revealed that languages like English, Arabic, and Czech display large gender effects in the expected direction, whereas Japanese, Polish, and Russian show no significant direct difference. Mandarin uniquely exhibits a direct gender effect that opposes the physiological trend of VTL.

## Code

- https://osf.io/m58e3/

## Applications

Phoneticians, sociolinguists, and speech engineers studying cross-linguistic variation, speaker normalization, and sociophonetic indexing in multilingual text-to-speech or speech recognition systems.

## Limitations

The dataset is restricted to read speech corpora and relies on formant-derived delta-F proxies rather than direct anatomical body size measurements.

## Related

- (link related pages by id as the wiki grows)
