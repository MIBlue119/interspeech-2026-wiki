---
id: gan26_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2605
pdf: https://www.isca-archive.org/interspeech_2026/gan26_interspeech.pdf
---

# L2 Speakers Accommodate Differently to AI and Human Voices Across Phonetic Features

*Nan Gan, Elisa Pellegrino*

[PDF](https://www.isca-archive.org/interspeech_2026/gan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2605)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates how second-language (L2) Mandarin learners accommodate to human versus modern neural TTS voices during sentence shadowing, finding that VOT convergence is stronger toward human speech while vowel duration and intensity rhythm adjustments are stronger toward the AI voice.

## Key contributions

- First empirical comparison of L2 phonetic accommodation toward modern neural AI voices versus native human voices.
- Utilizes a controlled, within-participant crossover design with 28 L1 Mandarin speakers across 3,945 sentence-level speech clips.
- Examines multi-dimensional phonetic features: stop-consonant VOT, tense-lax vowel contrasts (/i/-/I/ in duration and spectral distance), and duration/intensity-based speech rhythm.
- Reveals a feature-dependent accommodation split, demonstrating that AI and human voices offer complementary strengths for L2 pronunciation training.

## Problem

Prior research on phonetic accommodation to AI versus human voices has focused exclusively on native speakers, leaving open whether plastic, developing L2 phonetic systems respond similarly to synthetic input. Understanding this is critical because phonetic accommodation serves as a core mechanism for L2 acquisition under perception-production loops like the Speech Learning Model (SLM-r). Previous findings are largely outdated (relying on diphone/HMM synthesis) and did not isolate whether neural TTS can effectively replace or complement human voices in pedagogical practice.

## Method

The experiment used a two-session crossover design where 28 female L1 Mandarin learners (upper-intermediate B2 English proficiency via CET-6) completed a baseline reading-aloud task followed by sentence shadowing. Stimuli comprised 47 declarative sentences and 3 fillers drawn from the ALLSSTAR corpus, produced by a 19-year-old female native American English human speaker and Microsoft Azure's neural TTS voice 'en-US-LunaNeural'. Model audios were pair-matched in loudness (22.5 LUFS) with 20 ms leading and 220 ms trailing silence. Data was force-aligned using Montreal Forced Aligner (MFA), with VOT extracted via AutoVOT, and vowels/formants/rhythm metrics extracted via Praat and custom Python scripts. Accommodation was operationalized via a difference-in-distance (DID) metric (absolute distance from baseline to model minus shadowing to model), capturing convergence (DID > 0), divergence, or maintenance. Linear mixed-effects models were fitted with participant, sentence, and word as random effects, controlling for baseline-to-model distance where baseline mismatch occurred.

## Experimental setup

The dataset comprises 3,945 sentence-level clips (1,315 baseline, 2,630 shadowing across AI and human conditions) from 28 participants. Acoustic metrics included normalized VOT, vowel duration ratio (DR), spectral distance (SD), duration-based rhythm metrics (e.g., Delta C, VarcoV, nPVI), and intensity-based rhythm metrics (stdevM, varcoP, rPVI). Statistical significance was evaluated using lmerTest in R, modeling DID against model voice type with speech rate and baseline distance as covariates.

## Results

Participants showed significantly stronger convergence toward the human voice in normalized VOT (beta = 0.00402, p = .008), hypothesized to stem from richer contextual timing and aspiration cue preservation. Conversely, accommodation in vowel duration ratio (DR) was significantly stronger toward the AI voice (beta = -0.2136, p < .001), likely due to the AI's stable and consistent temporal templates. Intensity-based rhythm accommodation also favored the AI model (beta = -0.427, p < .001), indicating that regularized AI prominence and stress patterns are easier for learners to track. No reliable AI-Human differences were found for vowel spectral distance (SD) (p = .470) or duration-based rhythm metrics across sessions (p > .06).

| Phonetic Feature | AI vs. Human Effect | p-value |
|---|---|---|
| VOTnorm | AI < Human | .008 |
| Vowel Duration Ratio (DR) | AI > Human | < .001 |
| Vowel Spectral Distance (SD) | n.s. | .470 |
| Duration-Based Rhythm (S1) | n.s. | .068 |
| Intensity-Based Rhythm | AI > Human | < .001 |

## Limitations

The study is restricted to female L1 Mandarin speakers of English and female model voices, limiting immediate generalizability to male speakers or other L1-L2 language pairs. The shadowing task is less interactive than natural conversation and lacked visual/social cues (e.g., face identity), which might otherwise modulate accommodation. Furthermore, the acoustic properties driving the AI advantage (such as perceived expressiveness vs. temporal regularity) were not explicitly decomposed.

## Why read this

Speech researchers and educational technology developers should read this to understand the nuanced, feature-specific impacts of neural TTS on L2 pronunciation training rather than assuming a blanket human-voice superiority.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Design of AI-driven language learning applications, interactive voice agents, and customized text-to-speech pronunciation tutors for second-language acquisition.

## Institutions / 機構

University of Zurich

## Related

- (link related pages by id as the wiki grows)
