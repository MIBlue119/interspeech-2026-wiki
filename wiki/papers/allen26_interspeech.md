---
id: allen26_interspeech
category: phonetics-linguistics
labels: [multilingual]
institutions: ["Ohio State University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2391
pdf: https://www.isca-archive.org/interspeech_2026/allen26_interspeech.pdf
---

# Bilingual Speaker Phonetic Alignment to Voice Assistants

*Alyssa Allen, Kathryn Campbell-Kibler*

[PDF](https://www.isca-archive.org/interspeech_2026/allen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/allen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2391)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — This study examines whether Spanish-dominant bilingual speakers phonetically align (in vowel duration and voice onset time) when shadowing human versus synthetic voice assistant voices in Spanish and English. Results show robust convergence across both human and machine conditions, though modulated by social factors like speaker gender, dialect, and perceived system intelligibility.

## Key contributions

- Investigates bilingual (Spanish L1, English L2) phonetic alignment specifically directed toward synthetic voice assistants (Siri) versus human voices across two languages.
- Utilizes both linear combination analysis and difference-in-distance (DID) metrics to rigorously evaluate acoustic convergence on vowel duration and voice onset time (VOT).
- Demonstrates that bilingual speakers exhibit human-like phonetic convergence toward machine-generated voices in both their native and second languages.
- Reveals that social factors such as participant gender, regional dialect, and self-reported ASR intelligibility ratings significantly mitigate convergence patterns.

## Problem

Voice assistants like Siri and Alexa were originally developed primarily for Standard American English (SAE) and default to female-sounding voices, leading to well-documented ASR performance disparities and intelligibility gaps for non-SAE and L2 speakers. While companies have expanded voice options, updating synthetic voices does not solve the user-to-device intelligibility bottleneck or clarify how non-native users mentally perceive and interact with conversational AI. Under the Computers Are Social Actors (CASA) paradigm, humans often attribute human social traits to non-human entities, but it remains unclear if L2 speakers extend these human-like conversational accommodation behaviors (such as phonetic alignment) to machine voices in both their native and foreign languages.

## Method

Fifty Spanish-dominant Spanish(L1)-English(L2) bilingual participants residing in Mexico (ages 20-39) completed an online lexical shadowing experiment hosted on Pavlovia using PsychoPy. The experimental design featured two language blocks (Spanish and English). Within each language block, participants completed a baseline reading task followed by two lexical shadowing conditions: one hearing an adult female human talker, and one hearing a female-sounding synthetic voice assistant (Apple's Siri configured to Mexican-Spanish and US-English). English stimuli consisted of 9 low-frequency, high-familiarity monosyllabic words covering 9 monophthongs and word-initial voiceless stops (/k, t/). Spanish stimuli consisted of 9 words containing 5 vowels across stressed syllables and voiceless stop onsets (/k, p, t/). Acoustic processing was performed using the Montreal Forced Aligner (MFA) for vowel durations and AutoVOT for voice onset times, followed by manual review of all 1,800 vowel tokens and 706 VOT tokens. Statistical analysis employed linear mixed-effects models with sum-coded contrast fixed effects, evaluating linear combinations and difference-in-distance (DID) metrics, incorporating participant gender, regional dialect, and self-reported ASR intelligibility ratings as potential mediators.

For inference behavior and design choices, the study isolated production mechanics in a controlled environment to minimize conversational complexity. Vowel duration was measured as the total length in milliseconds, while VOT measured the duration from stop burst to voicing onset. Negative DID values in English VOT were carefully scrutinized and attributed to participants overshooting the raw acoustic signal due to hyper-aspiration, indicating they converged toward an abstract phonemic target rather than purely mirroring raw acoustics.

## Experimental setup

The study recruited 67 participants via Prolific (down to 50 after manual quality filtering of audio recordings). Datasets comprised 1,800 shadowed tokens and 900 baseline tokens for vowel duration, and 706 shadowed tokens and 353 baseline tokens for VOT. Evaluation metrics included linear combination slopes and difference-in-distance (DID) measures in milliseconds, analyzed via linear mixed-effects models. Notable implementation details include online execution via PsychoPy/Pavlovia, participant compensation at $16/hour, an average task duration of 19 minutes, and exhaustive manual verification of MFA/AutoVOT annotations.

## Results

Linear combination analysis for vowel duration revealed a significant three-way interaction between stimulus duration, condition, and language [t(1,744) = -2.00, p = 0.05], indicating convergence occurred across conditions with slope variations (strongest in Spanish human, weakest in Spanish machine). VOT linear combination showed a significant main effect of stimulus VOT [t(831) = 2.05, p = 0.04] confirming overall convergence regardless of language or talker type. Difference-in-distance (DID) analysis for VOT showed a significant condition-by-language interaction [t(831) = -2.12, p = 0.04], where Spanish yielded positive convergence values, but English yielded unexpected negative DID values driven by participants overshooting baseline VOT via hyper-aspiration toward abstract English phonemic targets.

Regarding social factors, female participants exhibited stronger overall convergence than male participants (attributable to female-sounding stimulus talkers). Participants from non-coastal Mexican regions and those reporting lower perceived ASR understanding in English showed modulated or weaker condition effects.

| Condition / System | Vowel Duration Convergence | VOT Convergence | Key Acoustic Behavior |
|---|---|---|---|
| Spanish - Human Talker | Positive (Strongest slope) | Positive DID | Direct acoustic matching |
| Spanish - Machine Talker | Positive (Weakest slope) | Positive DID | Moderate acoustic matching |
| English - Human Talker | Positive (Moderate slope) | Negative DID | Overshoot / Abstract target |
| English - Machine Talker | Positive (Moderate slope) | Negative DID | Overshoot / Abstract target |

## Limitations

The study relies on an online experimental setup which, while necessary for scale, introduced environmental audio variability requiring the exclusion of 17 participants. VOT stimuli lacked complete uniformity in word position (English stops were word-initial, whereas Spanish stops were predominantly word-medial though syllable-initial). The evaluation was restricted to isolated word-level lexical shadowing rather than continuous conversational dialogue, and participant demographics were constrained to Spanish-dominant bilinguals residing in Mexico.

## Why read this

Speech researchers and HCI engineers designing conversational agents for multilingual users should read this paper to understand that bilingual speakers naturally apply human-like phonetic accommodation toward synthetic voices. It provides concrete empirical evidence that users perceive voice assistants as social agents across languages, while highlighting how system intelligibility flaws and regional dialects alter user alignment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving multilingual text-to-speech design, adapting ASR acoustic models to account for user phonetic accommodation and dialectal variation, and enhancing conversational AI social realism.

## Institutions / 機構

Ohio State University

## Related

- (link related pages by id as the wiki grows)
