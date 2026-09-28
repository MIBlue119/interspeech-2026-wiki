---
id: fletcher26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-899
pdf: https://www.isca-archive.org/interspeech_2026/fletcher26_interspeech.pdf
---

# Oral stop realisation in three French Polynesian languages

[PDF](https://www.isca-archive.org/interspeech_2026/fletcher26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fletcher26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-899)

**TL;DR** — This study presents an acoustic phonetic analysis of voice onset time (VOT), closure duration, and voicing patterns for oral stops across three endangered French Polynesian languages, finding that stops are predominantly short-lag and voiceless with strong coarticulatory effects from following vowels.

## Problem

French Polynesian languages such as Tahitian, Marquesan, and Rurutu feature small oral stop inventories and are currently experiencing low levels of inter-generational transmission alongside prolonged contact with French. Despite impressionistic descriptions, there has been a significant lack of quantitative acoustic studies examining voice onset time, closure duration, and potential stop lenition or voicing variation in these languages. Addressing this gap is crucial for documenting phonetic realities and understanding contextual variation in languages with small stop inventories.

## Method

The authors analyzed a corpus of 3,839 stop tokens recorded from 12 bilingual speakers (Tahitian, Northern/Southern Marquesan, and Rurutu) using a head-mounted microphone in a quiet room. The speech data comprised sentence frame tasks for Tahitian and a modified Swadesh word list for Marquesan and Rurutu, all produced under narrow focus. Audio files were force-aligned using an adapted version of WebMaus and manually verified in Praat. Linear mixed-effects models were fitted in R using emuR and lmerTest to evaluate fixed effects including phoneme, language, prominence (accented vs. unaccented), following vowel, and word position, with speaker and word as random effects.

## Results

Across all three languages, stops are voiceless and short-lag with mean VOT values around 20 ms, though Marquesan velars (/k/) exhibit longer mean VOT (41 ms) than bilabials and dentals. Following vowel quality exerts the strongest influence on VOT, with significantly longer durations for /t/ before close front vowels (/i/) and /p/ before close back rounded vowels (/u/). Medial stop closure durations were comparable across languages, but Tahitian showed significantly longer closures in accented versus unaccented syllables. Voicing proportion levels were generally low during occlusion, and no widespread evidence of manner lenition or spirantisation was observed in this controlled corpus.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Field linguists, phoneticians, and language documentation engineers studying Oceanic languages, endangered language phonetics, and cross-linguistic acoustic typology.

## Limitations

The dataset relied on controlled laboratory speech tasks rather than naturalistic discourse, and the corpus sizes and speaking tasks were unbalanced across the different languages.

## Related

- (link related pages by id as the wiki grows)
