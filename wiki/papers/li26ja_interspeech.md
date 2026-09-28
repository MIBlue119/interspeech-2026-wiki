---
id: li26ja_interspeech
category: paralinguistic
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3235
pdf: https://www.isca-archive.org/interspeech_2026/li26ja_interspeech.pdf
---

# A Corpus-Based Study of Creaky Voice Production in English and Mandarin

[PDF](https://www.isca-archive.org/interspeech_2026/li26ja_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ja_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3235)

**TL;DR** — An acoustic corpus study comparing US English and Mandarin Chinese shows that men produce significantly more creaky voice than women in both languages, contradicting the stereotype that creakiness is primarily a female speech trait.

## Problem

Creaky voice has been heavily researched in English—often associated with young women and negative social evaluations—while cross-linguistic and sociophonetic production data remains scarce and methodologically inconsistent. Furthermore, prior perceptual studies report conflicting gender trends across different languages. Understanding whether production patterns align with social perceptions across typologically distinct languages is critical for robust sociophonetic theory.

## Method

The study constructed parallel read-speech corpora featuring 66 Mandarin Chinese speakers from Mainland China and 61 US English speakers reading 5 emotion-neutral sentences each (10–15 syllables). Audio was recorded via the Gorilla platform (48 kHz) with rigorous quality screening, then processed through Montreal Forced Aligner for phoneme segmentation and VoiceSauce for acoustic extraction. Vowel tokens (3,002 Mandarin, 2,872 English) were measured over their 70% mid-portion for F0, corrected first-to-second harmonic amplitude difference (H1–H2c), harmonics-to-noise ratio up to 3.5 kHz (HNR35), and cepstral peak prominence (CPP). Linear mixed-effects models tested the fixed effects of Language, Gender, and VowelHeight, with random intercepts for Talker and Word.

## Results

Linear mixed-effects modeling revealed significant main effects of Gender on H1–H2c (β = 2.09, p < .001) and HNR35 (β = 2.77, p < .001), indicating that men produced creakier speech characterized by depressed spectral tilt and lower noise ratios in both languages. A significant Language × Gender interaction emerged for HNR35 (β = -0.95, p = .012), driven by a larger gender gap in Mandarin (est. female–male = 7.26, p < .001) compared to English (est. = 3.61, p < .0001), with Mandarin males exhibiting lower HNR35 than English males (p = .004). F0 showed only a standard physiological gender effect, while CPP showed no significant gender or language effects but varied by vowel height.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Sociophonetic researchers, speech technologists, and linguists studying cross-lingual voice quality, speaker demographics, and socio-indexical speech variation.

## Limitations

The English cohort used remote recordings with varying hardware, severely creaky tokens with untrackable F0 were excluded (potentially underestimating total creak), and the data relied strictly on read speech rather than spontaneous conversation.

## Related

- (link related pages by id as the wiki grows)
