---
id: dang26_interspeech
category: phonetics-linguistics
institutions: ["Ohio State University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1508
pdf: https://www.isca-archive.org/interspeech_2026/dang26_interspeech.pdf
---

# Rhythmic Patterning in Vietnamese: The Case of Quadrisyllabic Reduplicative Words

*Phuong Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/dang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1508)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates the rhythmic structure of Vietnamese quadrisyllabic reduplicative words and finds an iambic pattern in syllable duration (S2 > S1, S4 > S3), supporting word-level stress and a disyllabic foot domain.

## Key contributions

- Expanded Vietnamese prosody empirical analysis from disyllabic words to 8 natural existing quadrisyllabic reduplicative words.
- Tested and ruled out the role of morphosyntactic headedness (comparing head-initial vs. head-final structures) in shaping rhythmic patterns.
- Demonstrated that syllable duration, rather than rhyme intensity ratio or mean F0, serves as the primary acoustic correlate of iambic stress in Vietnamese words.
- Showed that framing target words in carrier sentences with varying pre- and post-target syllable counts preserves the intrinsic internal iambic foot structure.

## Problem

The prosody literature on Vietnamese has long been deadlocked over whether stress exists, what constitutes its prosodic domain, and whether morphosyntactic structures dictate prominence. Prior claims range from Vietnamese being strictly syllable-timed with zero word-level prominence, to having phrasal pause-groups of 2-5 syllables, to operating via syntax-driven stress. Resolving this requires moving beyond disyllabic tokens or unnatural polysyllabic nonce words to test real quadrisyllabic reduplicative words across varied syntactic carrier contexts.

## Method

The study analyzes 576 acoustic tokens collected from 8 native Southern Vietnamese speakers (4 male, 4 female, aged 23-40) reading a constructed list of 24 sentences. These sentences combined 8 quadrisyllabic reduplicative words—equally split between head-initial (base-reduplicant) and head-final (reduplicant-base) structures—with 3 fixed carrier sentences (C1: 1 pre / 1 post syllable; C2: 2 pre / 1 post syllable; C3: 1 pre / 2 post syllable). All target words were controlled to have CV syllable structures with non-high vowels and uniform tone pairings across base and reduplicant syllables to minimize intrinsic acoustic confounds.

Acoustic measurements extracted via Praat included syllable duration (ms), the ratio of the mean intensity of each syllable rhyme over the whole word's mean intensity, and mean rhyme F0 computed across 5 equidistant points. Statistical evaluation relied on mixed-effects linear regression models fitted using lme4 in R, utilizing maximal design-driven random effects structures for subjects and items. Fixed effects comprised syllable position (S1, S2, S3, S4), headedness, and carrier sentence, with statistical significance evaluated via F-tests with Satterthwaite degrees of freedom approximation.

## Experimental setup

Evaluated on 576 tokens total (8 words × 3 carrier sentences × 8 speakers × 3 repetitions) recorded at 44.1 kHz via Praat. Evaluated against three competing theoretical frameworks in Vietnamese literature: the syllable-timed/no-stress hypothesis, the phrase-level domain proposal, and the morphosyntactically-determined stress view. Metrics analyzed included raw syllable duration, rhyme-to-word intensity ratio, and mean rhyme F0 across positions.

## Results

Syllable duration showed a highly significant main effect of position (F(3, 2249.0) = 166.96, p < 0.001) and a significant position-by-headedness interaction (F(3, 2249.0) = 6.34, p < 0.001), revealing a robust iambic pairing where S2 was significantly longer than S1, and S4 longer than S3. Intensity ratios and mean F0 did not follow an iambic pattern; instead, intensity ratios exhibited a gradual decrease from S1 to S4 across both headedness types, while mean F0 showed a gradual decrease for head-initial words but peaked on S1 for head-final words due to phrase-initial strengthening and static carrier effects.

| System / Condition | S1 Duration (ms) | S2 Duration (ms) | S3 Duration (ms) | S4 Duration (ms) |
| :--- | :--- | :--- | :--- | :--- |
| Head-Initial Words | ~110 | ~150 | ~120 | ~160 |
| Head-Final Words | ~110 | ~150 | ~120 | ~160 |

## Limitations

The dataset is restricted to 8 speakers of a single dialect (Southern Vietnamese) and a narrow lexical class (8 existing quadrisyllabic reduplicative words), which limits direct generalization to non-reduplicative polysyllabic compounds or other regional dialects. The study relies on static carrier sentences which induced an unintended phrase-initial prominence boost on the first syllable of the target words, complicating raw intensity and F0 interpretations.

## Why read this

Phoneticians and speech researchers studying prosodic typology should read this to understand how durational cues isolate sub-phrasal foot domains in isolating, tonal languages. It provides clear empirical evidence separating duration from intensity and F0 when tracking word-level stress.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving prosodic modeling and duration generation in text-to-speech (TTS) systems for Vietnamese and isolating tonal languages.

## Institutions / 機構

Ohio State University

**Funding / 經費:** Ilse Lehiste Memorial Fund

## Related

- [From Rhythm Metrics to Latent Embeddings: Categorising English and Hindi Varieties in Northeast India](aheibam26_interspeech.md) — shared technique · relatedness 1.7/3
- [Speaker-Specific and Language-Dependent Temporal Organization in Bilingual Political Speech](hosseinikivanani26b_interspeech.md) — shared technique · relatedness 1.7/3
- [Age-related Differences in the Perception of Vowel Length Contrast in Northern Vietnamese: The Case of Hoang Van (Bac Ninh) Variety](ta26_interspeech.md) — relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
