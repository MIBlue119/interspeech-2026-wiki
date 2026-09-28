---
id: li26z_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1597
pdf: https://www.isca-archive.org/interspeech_2026/li26z_interspeech.pdf
---

# Phonetic evidence for contrastive length in Nakanamanga monophthongs

[PDF](https://www.isca-archive.org/interspeech_2026/li26z_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26z_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1597)

**TL;DR** — This paper presents an acoustic phonetic analysis of Nakanamanga monophthongs, demonstrating that long vowels average 2.08 times the duration of short vowels to robustly support a phonological length contrast.

## Problem

Previous descriptive materials and dictionaries on Nakanamanga, an Oceanic language of Vanuatu, have been unclear about whether vowel length is contrastive across all five vowel qualities. While recent phonological work proposed a ten-vowel system based on minimal pairs, empirical acoustic evidence confirming duration as the primary phonetic correlate was missing. Establishing this phonetic foundation is essential for accurately documenting under-described languages in central Vanuatu.

## Method

The study collected 2,622 vowel tokens from 14 native speakers using a 50-item wordlist of disyllabic CV.CV lexical items elicited via image prompts and carrier frames. Speech data was manually segmented at word, syllable, and phoneme levels in Praat. Durational data was extracted using the EMU Speech Database Management System in R, and analyzed via additive and interaction linear mixed-effects models incorporating fixed effects for vowel length, vowel quality, and word length, alongside random intercepts for speaker and word.

## Results

Across 2,622 analyzed tokens, short vowels averaged 85 ms (SD = 25) while long vowels averaged 177 ms (SD = 36), yielding an overall long-to-short duration ratio of 2.08. Linear mixed-effects modeling confirmed a highly significant main effect of vowel length (estimated increase of 82.59 ms to 92.75 ms for long vowels, p < 0.001). Close vowels (/i/, /u/) were found to be intrinsically shorter overall compared to /5/ (p < 0.01), and longer words exhibited slight durational compression (p < 0.001). Crucially, interaction models showed that the magnitude of the vowel length contrast does not significantly vary across the five vowel qualities.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Field linguists, typologists, and speech scientists studying phonetic documentation, phonological typology, and acoustic characteristics of under-described Oceanic languages.

## Limitations

The final dataset was skewed due to short monophthongs occurring strictly within verbs, which were less reliably elicited than nouns.

## Related

- (link related pages by id as the wiki grows)
