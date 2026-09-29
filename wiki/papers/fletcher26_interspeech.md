---
id: fletcher26_interspeech
category: phonetics-linguistics
labels: [low-resource, multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-899
pdf: https://www.isca-archive.org/interspeech_2026/fletcher26_interspeech.pdf
---

# Oral stop realisation in three French Polynesian languages

*Janet Fletcher, Adele Gregory*

[PDF](https://www.isca-archive.org/interspeech_2026/fletcher26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fletcher26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-899)

**Category:** `phonetics-linguistics` · **Labels:** `low-resource`, `multilingual`

**TL;DR** — This study presents a quantitative acoustic analysis of voice onset time (VOT), closure duration, and voicing proportion for oral stops across three endangered French Polynesian languages (Tahitian, Marquesan, and Rurutu) using a corpus of 3,839 tokens. The findings confirm that these stops are predominantly short lag and voiceless (mean VOT around 20 ms, except for velars at 41 ms), showing strong coarticulatory vowel effects but no widespread lenition.

## Key contributions

- Delivers the first major quantitative acoustic investigation of voice onset time (VOT) and stop closure duration in Rurutu and Marquesan, alongside a comprehensive expansion of preliminary Tahitian data.
- Analyzes a curated speech corpus of 3,839 stop tokens collected from 12 native bilingual speakers across Tahitian, Northern/Southern Marquesan, and Rurutu.
- Demonstrates that following vowel quality is the primary driver of VOT variation across all three languages (e.g., longer VOT for /t/ before close front vowels like /i/ and /p/ before close back rounded vowels like /u/).
- Provides statistical evidence from linear mixed effects models showing minimal stop lenition or voicing during occlusion, contradicting assumptions of high contextual lenition for languages with small phonemic inventories.

## Problem

Seven indigenous Eastern Polynesian languages spoken in French Polynesia face low inter-generational transmission rates and endangerment due to prolonged contact with French. Impressionistic historical descriptions of their oral stop systems have yielded conflicting accounts regarding aspiration, glottalization, and potential lenition. Furthermore, aside from limited preliminary work on Tahitian, no rigorous quantitative acoustic studies of voice onset time (VOT) or stop closure duration existed for Rurutu and Marquesan, leaving a significant gap in documenting these vulnerable phonological systems.

## Method

Speech data were gathered from 12 native speakers (5 Tahitian, 5 Marquesan, 2 Rurutu) in Papeete, French Polynesia, using a Zoom H6 recorder and a Countryman ISOMAX head-mounted microphone at 44.1 kHz / 16-bit. Tahitian materials comprised a 90-word sentence frame task in phrase-medial position (3-4 repetitions), while Marquesan and Rurutu used a modified 160-word Swadesh list read in isolation (1-2 repetitions), totaling 3,839 disyllabic and trisyllabic stop tokens.

Audio files were force-aligned using an adapted WebMaus version for French Polynesian phoneme inventories, followed by manual boundary verification in Praat. An EMU-SDMS database was constructed using the emuR package in R to extract VOT intervals, medial stop closure durations, and voicing proportions. Statistical evaluations were performed using linear mixed effects models (lmerTest package) with fixed effects for phoneme, language, prominence (post-lexical accent vs. unstressed), following vowel (/i, e, a, o, u/), and word position, incorporating speaker and word as random effects.

## Experimental setup

The dataset contains 3,839 total tokens across three languages (Tahitian, Marquesan, Rurutu) spoken by 12 bilingual participants aged 18-70. Analysis utilized linear mixed effects regression models in R with Bonferroni-adjusted post-hoc tests via the emmeams package to evaluate factors affecting VOT, closure duration, and voicing fraction.

## Results

Across the corpus, mean VOT values hovered around 20 ms, characterizing the series as short lag voiceless stops. Marquesan velars (/k/) exhibited significantly longer VOT values (mean 41 ms, s.d. = 16.34) compared to bilabials (/p/, mean 23.5 ms) and dentals (/t/, mean 21.8 ms). Post-hoc interaction analyses revealed that bilabial VOT was significantly longer before /u/ (e.g., +17 ms vs /a/, p < 0.0001), while dental and velar VOT values were significantly longer before /i/ due to coarticulatory palatalization. Tahitian medial stops showed longer closure durations in accented versus unaccented syllables (beta = 39.97, p < 0.01), whereas other languages showed no significant prominence effects. Intervocalic lenition or fricative realization was virtually absent, with only a single token of /k/ spirantization observed across the entire dataset.

| Language & Phoneme | Mean VOT (ms) | Mean Closure Duration (ms) | Primary Vowel Coarticulation Effect |
|---|---|---|---|
| Tahitian /p/ | 16.98 | -- | Longer before /u/ |
| Tahitian /t/ | 22.57 | -- | Longer before /i/ |
| Marquesan /p/ | 23.50 | -- | Longer before /u/ |
| Marquesan /t/ | 21.80 | -- | Longer before /i/ |
| Marquesan /k/ | 41.00 | -- | Longer before /i/ |
| Rurutu /t/ | 21.89 | -- | Longer before /i/ |

## Limitations

The study relies on a constrained laboratory corpus consisting of careful citation forms and sentence frames rather than spontaneous, continuous discourse, which likely limits the observation of natural connected-speech lenition or prosodic variation. The dataset is unbalanced, heavily weighted toward Tahitian due to differing acquisition protocols, and features uneven token distributions across languages and place of articulation. Additionally, word-initial closure durations could not be reliably measured, and speakers were exclusively bilingual with French or local French vernacular.

## Why read this

Phoneticians and field linguists documenting endangered Oceanic languages should read this paper to understand the acoustic baseline of French Polynesian stop phonology and how coarticulatory vowel environments interact with small inventories. It challenges the assumption that languages with minimal phonemic stop inventories naturally exhibit high degrees of contextual lenition.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Documentation and revitalization of endangered indigenous languages, speech technology adaptation for low-resource Oceanic languages, and phonetic corpus building.

## Institutions / 機構

University of Melbourne

**Funding / 經費:** Faculty of Arts at the University of Melbourne, mission de recherche, Australian Research Council Centre of Excellence for the Dynamics of Language

## Related

- (link related pages by id as the wiki grows)
