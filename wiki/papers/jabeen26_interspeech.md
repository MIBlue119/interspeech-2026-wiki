---
id: jabeen26_interspeech
category: phonetics-linguistics
labels: [multilingual]
institutions: ["Bielefeld University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-707
pdf: https://www.isca-archive.org/interspeech_2026/jabeen26_interspeech.pdf
---

# The (non-)universality of prominence and Intonation Phrases: German and Hungarian listeners'' perception of an unfamiliar language

*Farhat Jabeen, Ákos Buza, Ella Reimann*

[PDF](https://www.isca-archive.org/interspeech_2026/jabeen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jabeen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-707)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — This study investigates cross-linguistic perception of prosodic prominence and Intonation Phrase (IP) boundaries by presenting spoken Urdu extracts to native German and Hungarian listeners. The findings challenge the alleged universality of acoustic cues, demonstrating that listener L1 backgrounds and speaker variability significantly shape how pitch contours and boundaries are interpreted.

## Key contributions

- Challenges the prevailing assumption of cue universality in IP boundary perception by testing typologically diverse listener groups (West Germanic German, Finno-Hungarian Hungarian) on an unknown language (Indo-Aryan Urdu).
- Employs Rapid Prosody Transcription (RPT) coupled with Generalized Additive Mixed Models (GAMMs) to precisely map time-normalized F0 contours of perceived prominent words.
- Reveals that German listeners identify a markedly higher percentage of words as prominent (84-97%) compared to Hungarian listeners (49-64%), tied to language-specific F0 expectations.
- Demonstrates a significant three-way interaction between prominence perception, listener L1, and individual stimuli speakers, confirming that speaker-based acoustic differences modulate cross-linguistic perception.

## Problem

Prior research claiming the universality of acoustic cues for Intonation Phrase (IP) boundaries often compares listeners' L1 performance against unfamiliar languages or relies heavily on negative agreement (agreement on where boundaries do not occur). Such methodologies fail to isolate whether high agreement stems from true universal cues or listeners uniformly applying their native language strategies. Furthermore, while most work emphasizes IP boundaries, the perception of prosodic prominence remains under-explored cross-linguistically. This paper addresses these gaps by evaluating both prominence and IP boundary identification in an unfamiliar language across listeners from typologically distinct backgrounds.

## Method

The study utilized four Urdu speech extracts (~18 seconds each, 5-8 syntactic clauses per extract) read by two male and two female native Urdu speakers. Transliterated text without punctuation was provided to 26 German listeners and 21 Hungarian listeners who completed a Rapid Prosody Transcription task, listening up to five times to mark IP boundaries with slashes and underline prominent words. Word boundaries were manually annotated in PRAAT to extract time-normalised F0 values relative to each speaker's mean F0.

To analyze the time series data, Generalised Additive Mixed Models (GAMMs) were implemented in R, incorporating stimuli speakers and listeners' L1 as fixed factors alongside random smooths for listeners. Non-linear tensor smooths checked for interactions between prosodic prominence, speakers, and L1 backgrounds, with autocorrelation accounted for via Rho values and model selection determined by comparing AIC scores.

## Experimental setup

The evaluation dataset consists of four Urdu audio extracts totaling approximately 72 seconds of speech from 4 speakers, evaluated by 26 German speakers (ages 19-60) and 21 Hungarian speakers (ages 22-60). Metrics include Fleiss' Kappa for inter-rater agreement (within- and between-group) and estimated differences in F0 curves derived from GAMM difference curves. The experiment was conducted via worksheets with written instructions in the respective L1s, averaging 15 minutes per participant.

## Results

Aggregated Fleiss' Kappa values for IP boundary identification showed weak to moderate agreement between German and Hungarian groups across speakers (ranging from k=0.47 to k=0.63). GLMER analysis indicated a significant interaction between listeners' L1 and speakers (chi-squared(3) = 90.9, p < 0.0001). For prosodic prominence, aggregated Kappa values showed minimal to no agreement (k=0.16 to k=0.28), with German listeners marking 84-97% of words as prominent versus 49-64% for Hungarians. GAMM analysis confirmed a significant three-way interaction between prominence perception, L1, and speakers (F = 55.2, p = 0.001), showing that German listeners associated prominence with rising F0 contours while Hungarian listeners favored falling F0 contours.

| System / Condition | IP Boundary Agreement (Fleiss' k) | Prominence Agreement (Fleiss' k) | Prominence % (German / Hungarian) |
|---|---|---|---|
| Female Speaker 1 | 0.52 | 0.26 | 86% / 64% |
| Female Speaker 2 | 0.56 | 0.25 | 84% / 49% |
| Male Speaker 1 | 0.63 | 0.16 | 89% / 55% |
| Male Speaker 2 | 0.47 | 0.28 | 97% / 61% |

## Limitations

The study is constrained by a small stimulus set consisting of only four short Urdu passages and four speakers, limiting broad acoustic generalizability. Only two listener L1 backgrounds (German and Hungarian) were tested, omitting a wider typological spectrum of tonal and non-tonal languages. Additionally, the between-participant design precluded random effects for L1 in the primary regression models.

## Why read this

Phoneticians and speech researchers studying cross-linguistic prosody should read this paper to understand how native language phonology biases the perception of prominence and phrasing in unknown tongues. It provides a methodological blueprint using GAMMs and RPT to disentangle universal acoustic properties from language-specific perceptual filters.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual speech understanding, multilingual text-to-speech prosody transfer, and acoustic modeling for under-documented languages.

## Institutions / 機構

Bielefeld University

**Funding / 經費:** Deutsche Forschungsgemeinschaft

## Related

- [Speaker or Language? Explaining Variance in Charismatic Prosody Across Luxembourgish and French](hosseinikivanani26_interspeech.md) — same problem · relatedness 1.9/3
- [Do Speech Emphasis Models Generalize across Languages and Emotions?](wei26e_interspeech.md) — same problem · relatedness 1.9/3
- [Prosodic Realization of Focus in Yi-Mandarin Bilingual Speakers: On-Focus Expansion without Post-Focus Compression](zhang26g_interspeech.md) — same problem · relatedness 1.8/3
- [Speaker-Specific and Language-Dependent Temporal Organization in Bilingual Political Speech](hosseinikivanani26b_interspeech.md) — relatedness 1.8/3
- [The Sound of Code-Switching: Prosodic Profiles of Spontaneous Spanish-English Speech](bhattacharya26_interspeech.md) — relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
