---
id: guan26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1545
pdf: https://www.isca-archive.org/interspeech_2026/guan26_interspeech.pdf
---

# Effects of body position on vowel formants in New Zealand English

[PDF](https://www.isca-archive.org/interspeech_2026/guan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1545)

**TL;DR** — This study evaluates how static body position (supine, sitting, standing) affects vowel formants F1 and F2 in New Zealand English, demonstrating small, vowel- and demographic-dependent shifts primarily between supine and upright postures.

## Problem

Speech acoustics are routinely analyzed without controlling for speaker body position, even though recording setups vary wildly between standard upright laboratory environments and constrained contexts like supine MRI scanners. This lack of standardization makes it difficult to reliably combine or compare vowel-formant measurements across different recording configurations. It remains unclear whether position shifts impact the entire vowel system uniformly or if they selectively target specific vowels and interact with demographic factors like age and sex.

## Method

The authors analyzed a balanced /hVd/ corpus containing 11 vowels across 3 static positions (sitting, standing, supine) recorded from 9 native New Zealand English speakers (5 male, 4 female; split into 20-25 and 45-50 age bands) inside a sound-isolation enclosure. Formant tracks (F1 and F2) were automatically aligned using WebMAUS Basic, manually corrected in Praat and EMU-R, and converted from Hz to Bark. Linear mixed-effects models were fitted with fixed effects for Position, Vowel, Age, and Sex, and a random intercept for Speaker, followed by backward elimination of interaction terms and Tukey-adjusted pairwise estimated marginal means (EMMs) contrasts.

## Results

Aggregate vowel spaces largely overlapped across positions, with centers of gravity showing only modest displacement for the supine condition. For F1, significant position-related differences were isolated to the supine-sitting comparison within high vowels (/I/, /i:/, /u:/), with clearer overall offsets observed for female speakers. For F2, significant posture contrasts concentrated in the high-front region (/I/, /i:/) for the supine-standing comparison, with the younger female demographic group exhibiting statistically significant differences across all three position contrasts (p < 0.05). Overall position-related acoustic shifts proved small and highly non-uniform across the vowel inventory and speaker groups.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, speech scientists, and clinical researchers comparing acoustic datasets collected under disparate postures—such as matching upright laboratory corpora against supine MRI speech sessions.

## Limitations

The dataset is limited to a small sample of 9 speakers, necessitating cautious interpretation of demographic-specific interaction patterns.

## Related

- (link related pages by id as the wiki grows)
