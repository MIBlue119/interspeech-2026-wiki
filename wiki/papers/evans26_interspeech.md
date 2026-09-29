---
id: evans26_interspeech
category: phonetics-linguistics
labels: [low-resource]
institutions: ["University of Auckland"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1561
pdf: https://www.isca-archive.org/interspeech_2026/evans26_interspeech.pdf
---

# Mapping Acceptable Pronunciation Range for te reo Māori through Perceptual, Acoustic, and Marker Evaluative Data

*Zoe E Evans, C. I. Watson, Peter J Keegan, Jesin James, Piata Allen*

[PDF](https://www.isca-archive.org/interspeech_2026/evans26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/evans26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1561)

**Category:** `phonetics-linguistics` · **Labels:** `low-resource`

**TL;DR** — This paper maps the acceptable pronunciation ranges for te reo Māori vowels by triangulating acoustic measures, phonetician transcriptions, and fluent speaker evaluations using a bespoke tool called FRED. The study reveals a structural asymmetry where variants acceptable as monophthongs are penalised in diphthongs, challenging the view of diphthongs as mere vowel sequences.

## Key contributions

- Developed a three-source evaluation framework combining perceptual transcription, acoustic analysis, and fluent speaker judgements to define acceptable pronunciation boundaries.
- Introduced FRED (Formant Research for EDucation), a bespoke software platform that integrates acoustic data with categorical labels via interactive F1/F2 and trajectory plots.
- Demonstrated a contextual asymmetry where backed variants acceptable for the monophthong /u/ are penalised when appearing as the second target in the diphthong /au/.
- Found evidence of an ongoing merger between the diphthongs /ai/ and /ae/ based on near-ceiling cross-substitution acceptance and overlapping acoustic realizations.

## Problem

Pronunciation pedagogy often assumes a rigid canonical target, ignoring the natural speech variation across speakers, generations, and contact languages like New Zealand English. For endangered or revitalising languages like te reo Māori, online resources frequently provide inaccurate phonetic descriptions, and formal studies distinguishing acceptable native variation from learner error are virtually non-existent. Without empirically grounded acceptable ranges, computer-aided pronunciation training (CAPT) systems and educators risk enforcing arbitrary or overly strict phonetic norms that fail to align with native speaker intuitions.

## Method

The study analyses speech data from 301 students enrolled in a university Māori language course who recorded a required personal introduction text (pepeha), yielding audio files converted to 44.1 kHz, 24-bit WAV format. These recordings were automatically aligned using the Munich Automatic Segmentation System (MAUS) across word, phonemic, and phoneme tiers, followed by manual correction of boundaries and phonetic labeling by a trained phonetician using Praat. A cohort of approximately 10 fluent Māori speakers evaluated the resulting syllables as binary 'accepted' or 'rejected' based on acceptability rather than a strict canonical target. Acoustic features including F0 (split at 160 Hz into high and low groups) and formant trajectories (F1/F2 extracted at 11 equidistant intervals using the FastTrack plugin) were compiled and analyzed alongside categorical judgements within the FRED visualization platform.

To evaluate the stability of vowel components, monophthongs (/a/ and /u/) and diphthongs (/ai/, /ae/, and /au/) were compared. Statistical validation employed Fisher's exact tests for categorical acceptance rates and Linear Mixed-Effects (LME) models with speaker random intercepts and Bonferroni corrections to evaluate formant differences across onset, midpoint, and offset intervals. The core design choice of data triangulation was implemented to expose divergences where raw acoustic distance fails to predict native perceptual tolerance.

## Experimental setup

The dataset comprises recordings from 301 university students reading a standardized pepeha text over academic years 2020 and 2021. Evaluations were performed by ~10 fluent Māori speaker markers at the syllable level, alongside phonetician-verified Praat/FastTrack acoustic extractions across 11 temporal points per vowel token. Statistical testing utilized Fisher's exact tests and LME models with Bonferroni correction for multiple comparisons.

## Results

For monophthongs, canonical [u] (552/577 accepted) and substituted [u] (251/268 accepted) showed no significant difference in acceptance (p = 0.23), and similarly canonical [a] (1954/1998 accepted) and schwa [@] (908/920 accepted) showed high mutual acceptance (p = 0.11). In contrast, while the raised onset variant [@au] achieved high acceptance comparable to canonical [au] (p = 0.84), the backed second target variant [au] was heavily penalized by markers (p < 0.001). Acoustic analysis confirmed large formant differences: monophthong [a] had a higher F1 (Mdn=845 Hz) than schwa (Mdn=670 Hz, U=1,248,952, p < 0.001, r=0.43), and monophthong [u] had a higher F2 (Mdn=1746 Hz) than backed [u] (Mdn=1073 Hz, U=152,668, p < 0.001, r=0.66).

| Vowel / Category | Canonical Form | Substituted Variant | Canonical Acceptance (%) | Substituted Acceptance (%) | Statistical Significance |
|---|---|---|---|---|---|
| Monophthong /u/ | [u] | [u] (backed) | 95.7% | 93.7% | p = 0.23 (ns) |
| Monophthong /a/ | [a] | [@] (schwa) | 97.8% | 98.7% | p = 0.11 (ns) |
| Diphthong /au/ | [au] | [@au] | 90.5% | 99.0% | p = 0.84 (ns) |
| Diphthong /au/ | [au] | [au] (backed target) | 90.5% | 71.4% | p < 0.001 ***

## Limitations

The study relies on L2 student speech data reading a fixed, highly constrained text (a pepeha), which may not fully represent spontaneous or conversational native speech variation. Inter-rater reliability metrics among the fluent marker cohort were not formally computed in this preliminary analysis. Furthermore, speaker metadata such as biological sex or gender was unavailable, requiring F0 ceiling estimations via heuristic splits.

## Why read this

Speech and ML researchers building computer-aided pronunciation training (CAPT) or Goodness of Pronunciation (GOP) scoring engines for endangered or revitalization languages should read this to understand why raw acoustic distance to a canonical norm is insufficient for error detection. It demonstrates how to integrate native perceptual acceptability into automated evaluation pipelines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-aided pronunciation training (CAPT) systems for te reo Māori and other indigenous languages undergoing revitalization, as well as pedagogical tool design for language teaching.

## Institutions / 機構

University of Auckland

## Related

- (link related pages by id as the wiki grows)
