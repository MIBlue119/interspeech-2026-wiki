---
id: xie26d_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2138
pdf: https://www.isca-archive.org/interspeech_2026/xie26d_interspeech.pdf
---

# Acoustic Differences Between Citation and Sandhi Tones Across Three Generations in Xiamen Southern Min

[PDF](https://www.isca-archive.org/interspeech_2026/xie26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xie26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2138)

**TL;DR** — This study investigates acoustic differences between citation and sandhi tones across three generations in Xiamen Southern Min, revealing subphonemic contrasts and an active age-graded divergence in the tonal sandhi system.

## Problem

Traditional descriptions of tone sandhi systems rely on auditory impressions and categorical transcriptions like the 'tone sandhi circle,' which obscure fine-grained phonetic details and subphonemic divergences. It remains unclear whether sandhi forms are acoustically identical to their citation counterparts or how these phonetic realizations shift across generations. Addressing these questions is vital for understanding sound change and real-world tonal implementation in tone languages.

## Method

The study analyzed 4,167 valid speech tokens collected from 49 native speakers divided into three age groups (teenagers: 13-19, middle-aged: 35-59, seniors: 61-87) using picture-naming tasks for monosyllabic and disyllabic real words. F0 contours were extracted using ProsodyPro and Praat, z-score normalized per speaker, and modeled using generalized additive mixed models (GAMMs) and linear mixed-effects models in R. Key experimental variables included tone categories, syllable positions (S1 vs. S2), stimulus types, and age groups.

## Results

Evaluated using one-way ANOVAs and linear mixed models, the data showed that sandhi tones differ significantly from their citation counterparts in both F0 height and slope despite traditional transcription equivalence. Teenagers displayed a compressed citation tonal space (e.g., smaller /44/ to /22/ ratio and smaller /24/ rise magnitude) but enhanced sandhi contrasts. Specifically, for the traditionally neutralized /22/ sandhi forms, teenagers maintained a distinct split between /44/ > [22a] and /24/ > [22b] (mean ratio 1.07), whereas seniors largely neutralized this distinction (mean ratio 1.02, p < .001). Interrater reliability for manual token screening reached an almost perfect Cohen's kappa of 0.95.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, dialectologists, and speech engineers designing multi-dialect automatic speech recognition (ASR) or text-to-speech (TTS) systems for Chinese dialects will benefit from understanding fine-grained subphonemic tonal variations and generational shifts.

## Related

- (link related pages by id as the wiki grows)
