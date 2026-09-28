---
id: yuen26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1080
pdf: https://www.isca-archive.org/interspeech_2026/yuen26_interspeech.pdf
---

# How do word frequency and syllable surprisal affect response time and acoustic duration in sentence formulation?

[PDF](https://www.isca-archive.org/interspeech_2026/yuen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yuen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1080)

**TL;DR** — This study investigates how word frequency and syllable surprisal cross-affect speech initiation response times and acoustic vowel durations in German, revealing complex interactions that challenge traditional serial speech production models.

## Problem

Prior work on linguistic predictability typically isolates predictability to a single linguistic level, such as word or syllable, ignoring how these levels interact. Standard psycholinguistic models assume speech production is discrete, staged, and serial, implying additive effects of word frequency and syllable surprisal. Testing whether cross-level interactions exist is crucial to understanding whether speech planning operates serially or interactively.

## Method

The experiment utilized a picture-naming and sentence-generation task where 20 native German speakers produced 1,335 items consisting of mono- and disyllabic words varying in word frequency and syllable surprisal across medial and final utterance positions. Word frequency was extracted from SUBTLEX-DE and CELEX, while syllable-level unigram surprisal was computed using an SRILM language model trained on the deWaC web corpus. Statistical analyses were performed using linear mixed-effects models (lmerTest in R) on log10-transformed response times (RT) and stressed long vowel durations.

## Results

The evaluation analyzed 1,335 items and found significant interactions rather than additive effects. For monosyllabic words, low-frequency words showed faster RTs than high-frequency words, and high surprisal slowed RTs in high-frequency words while speeding them up in low-frequency ones. For disyllabic words, a significant two-way interaction between syllable surprisal and word frequency (p = .009) emerged for long vowel durations, where high surprisal unexpectedly led to shorter durations in low-frequency words. Overall, RT and acoustic duration metrics did not mirror each other, pointing to distinct underlying speech planning mechanisms.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, psycholinguists, and speech engineers modeling human speech production planning, lexical access, and acoustic duration control.

## Limitations

The dataset had a restricted range of syllable surprisal values within low-frequency monosyllabic words, preventing full factorial modeling of short vowels.

## Related

- (link related pages by id as the wiki grows)
