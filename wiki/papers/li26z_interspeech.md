---
id: li26z_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1597
pdf: https://www.isca-archive.org/interspeech_2026/li26z_interspeech.pdf
---

# Phonetic evidence for contrastive length in Nakanamanga monophthongs

*Shubo Li*

[PDF](https://www.isca-archive.org/interspeech_2026/li26z_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26z_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1597)

**TL;DR** — This paper presents the first acoustic phonetic investigation of Nakanamanga, demonstrating that vowel duration provides robust evidence for a phonological length contrast across all five monophthong qualities with long vowels averaging 2.08 times the length of short vowels.

## Key contributions

- Provides the first acoustic phonetic analysis of vowel length in Nakanamanga, confirming a ten-vowel system of five short-long pairs.
- Analyzes a carefully elicited dataset of 2,622 tokens from 14 native speakers across all five monophthong qualities (/i, e, ɑ, o, u/).
- Uses linear mixed-effects models to control for intrinsic vowel quality and word length compression, demonstrating that phonological length is the dominant predictor of duration.
- Archives all speech data with PARADISEC to establish an open empirical baseline for underdescribed Oceanic languages.

## Problem

Nakanamanga, an Oceanic language of Vanuatu spoken by roughly 10,000 people, has long lacked clear consensus regarding whether vowel length is phonemically contrastive and whether such a contrast applies to all five vowel qualities. While recent phonological studies proposed a ten-vowel system based on minimal pairs, prior descriptions were inconsistent and lacked systematic acoustic phonetic validation. This uncertainty is part of a broader gap in central Vanuatu and Oceanic linguistics, where vowel length is frequently inferred from limited lexical descriptions rather than backed by quantitative duration measurements.

## Method

The study utilized a 50-item wordlist designed to capture the vowel length contrast, restricted to disyllabic CV.CV lexical items with target vowels in the initial stem syllable. Data was gathered from 14 native speakers (8 female, 6 male; ages 22-80) in quiet field settings using a Zoom H6 portable recorder and RØDE NT3 microphone at 96 kHz/24-bit. Speakers produced 5 consecutive repetitions of each item within a standard carrier frame, and stimuli were presented pictorially or via Bislama prompts to avoid orthographic bias.

Audio was downsampled to 44.1 kHz/16-bit, and 2,622 valid vowel tokens were manually segmented in Praat by defining onsets at the start of regular periodicity and offsets at the final glottal pulse. An EMU Speech Database was constructed, and statistical modeling was executed in R using lmerTest and emuR. Two linear mixed-effects models were evaluated: an additive model incorporating fixed effects for VowelLength, VowelQuality, and WordLength alongside random intercepts for Speaker and Word, and an interaction model adding the VowelLength-by-VowelQuality interaction to test if the magnitude of the contrast varied across qualities.

## Experimental setup

The final dataset comprised 2,622 analysed tokens (936 short, 1,686 long) produced by 14 speakers. The primary metrics evaluated were vowel duration in milliseconds (measured via Praat and EMU) and associated long-to-short duration ratios. Statistical evaluation utilized linear mixed-effects models with emmeans for post-hoc pairwise comparisons.

## Results

Short monophthongs averaged 85 ms (SD = 25) while long monophthongs averaged 177 ms (SD = 36), yielding an overall long-to-short ratio of 2.08:1. The additive linear mixed-effects model revealed that long vowels are estimated to be 82.59 ms longer than short vowels (p < .001), establishing length as the primary driver of duration compared to secondary factors like word length compression (-4.54 ms per additional syllable, p < .001) and intrinsic vowel height (close vowels /i/ and /u/ being roughly 20-22 ms shorter than /ɑ/, p < .01).

Crucially, the interaction model showed no significant interaction between VowelLength and VowelQuality, demonstrating that the magnitude of the durational contrast remains stable across all five vowel qualities (with per-quality long-to-short ratios spanning from 1.88 for /e/ to 2.24 for /u/, and all pairwise length contrasts maintaining p < .001). The study does not evaluate perceptual classification by human listeners or analyze higher-order spectral trajectories such as formants.

| Vowel Quality | Short Mean (SD) | Long Mean (SD) | Ratio | p-value |
|---|---|---|---|---|
| /i/ - /i:/ | 79 ms (30) | 164 ms (34) | 2.08 | < 0.001 |
| /e/ - /e:/ | 95 ms (20) | 178 ms (38) | 1.88 | < 0.001 |
| /ɑ/ - /ɑ:/ | 89 ms (21) | 192 ms (28) | 2.15 | < 0.001 |
| /o/ - /o:/ | 89 ms (22) | 182 ms (37) | 2.06 | < 0.001 |
| /u/ - /u:/ | 76 ms (20) | 169 ms (35) | 2.24 | < 0.001 |

## Limitations

The dataset is constrained by an asymmetry where short monophthongs were elicited exclusively from verbs while long monophthongs predominantly occurred in nouns due to lexical constraints in Nakanamanga. The study is strictly limited to production data from a controlled wordlist collected in field settings, excluding naturalistic continuous speech, sociolinguistic variation, and perceptual experiments to verify cue integration by listeners. Furthermore, spectral features such as formant trajectories, although extracted, were excluded from the scope of this paper.

## Why read this

Phoneticians and field linguists studying Oceanic or underdocumented languages will find a rigorous template for validating phonemic length contrasts using mixed-effects modeling. It provides concrete empirical baselines for distinguishing categorical phonological length from intrinsic durational variations like vowel quality and word compression.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Field linguistics documentation, phonetic analysis tools for underdescribed languages, and improvement of pronunciation dictionaries for Oceanic languages.

## Related

- (link related pages by id as the wiki grows)
