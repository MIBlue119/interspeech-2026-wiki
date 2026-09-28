---
id: dang26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1508
pdf: https://www.isca-archive.org/interspeech_2026/dang26_interspeech.pdf
---

# Rhythmic Patterning in Vietnamese: The Case of Quadrisyllabic Reduplicative Words

[PDF](https://www.isca-archive.org/interspeech_2026/dang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1508)

**TL;DR** — This study investigates Vietnamese prosodic structure by analyzing quadrisyllabic reduplicative words, finding robust iambic duration patterns (second and fourth syllables significantly longer) that support word-level stress and a disyllabic foot domain.

## Problem

Vietnamese prosody literature features an ongoing debate regarding the existence of word-level stress, the role of morphosyntactic headedness, and whether prosodic groupings are strictly phrasal or feature intermediate domains like feet. Resolving these conflicting views helps clarify the prosodic hierarchy of isolating, monosyllabic tone languages.

## Method

The study analyzed 576 tokens from eight native speakers reading eight existing quadrisyllabic reduplicative words (four head-initial, four head-final) embedded across three carrier sentences with varying pre- and post-target syllable counts. Acoustic measures included syllable duration, rhyme-to-word intensity ratio, and mean rhyme F0 across five equidistant points. Mixed-effects linear regression models were fitted using lme4 in R, incorporating maximal random effects structures for subjects and items with Satterthwaite approximations for F-tests.

## Results

Syllable duration revealed a significant main effect of position and an iambic pattern where S2 > S1 and S4 > S3 across both head-initial and head-final words [F(3,2248.99) = 166.96, p < 0.001], indicating headedness does not alter rhythm. Intensity ratios showed a gradual decrease from S1 to S4 rather than an iambic shape [F(3,2249.07) = 56.64, p < 0.001]. Mean rhyme F0 decreased gradually for head-initial words while showing the highest value on S1 for head-final words. Varying carrier sentences did not disrupt the internal iambic duration pattern, though the shortest carrier context induced minor durational reduction.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians and speech engineers modeling prosody, duration, and rhythm in tonal and isolating languages like Vietnamese.

## Limitations

The use of static carrier sentences may have induced list-reading artifacts or phrase-initial strengthening on target words.

## Related

- (link related pages by id as the wiki grows)
