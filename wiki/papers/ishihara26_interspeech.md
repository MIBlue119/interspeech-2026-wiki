---
id: ishihara26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-303
---

# Sub-band Cepstral Analysis of Speaker-Specific Information: A Case Study of Japanese Word /saN/

**TL;DR** — A forensic-voice-comparison study of 306 Japanese male speakers finds that speaker-discriminative information in /s/, /a/, and /N/ sounds is concentrated in specific, not always predictable, frequency sub-bands.

## Problem

Forensic voice comparison needs to know which spectral regions carry the most speaker-identifying information for particular speech sounds, but this is not well characterized for Japanese phonemes.

## Method

The authors apply band-limited cepstral coefficients (BLCCs), derived via linear transformation from full-band cepstral coefficients, to scan 0.6 kHz sub-bands in 0.2 kHz steps across 0-8 kHz for the fricative /s/, vowel /a/, and nasal /N/ in the Japanese word /saN/, running forensic voice comparison experiments on each segment.

## Results

The vowel /a/ and nasal /N/ carry more speaker information than the fricative /s/, all three segments show weak speaker information above 7 kHz, and the most speaker-sensitive sub-bands differ by segment in ways not always predictable from articulatory or acoustic properties.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic voice comparison casework and feature-selection guidance for speaker recognition systems targeting specific phoneme classes.

## Related

- (link related pages by id as the wiki grows)
