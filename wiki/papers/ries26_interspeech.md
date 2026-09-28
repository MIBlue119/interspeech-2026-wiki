---
id: ries26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2492
pdf: https://www.isca-archive.org/interspeech_2026/ries26_interspeech.pdf
---

# On Entrainment in Semi-Spontaneous Multilingual Parliamentary Speech

[PDF](https://www.isca-archive.org/interspeech_2026/ries26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ries26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2492)

**TL;DR** — This paper investigates acoustic-prosodic and semantic entrainment in semi-spontaneous, multilingual parliamentary speech, revealing that speakers adapt across linguistic dimensions in accordance with primacy and recency memory effects.

## Problem

Prior research on speech entrainment has predominantly focused on monolingual open-domain conversations or task-oriented dialogues, leaving open questions about how speakers adapt in mixed-spontaneity settings and across multiple languages. Understanding these dynamics is challenging because parliamentary proceedings involve long prepared monologues followed by short spontaneous responses in varied language combinations (English and French). Addressing this gap matters for uncovering universal dialogue behaviors versus unique cross-lingual cognitive planning mechanisms.

## Method

The study uses a subset of the Canadian Hansard corpus comprising 40 balanced dyadic exchanges (12+ hours, 7,500 utterances) spanning four language settings (en-en, fr-fr, en-fr, fr-en) with speaker power differentials removed. Acoustic-prosodic representations are extracted using the 88-dimensional eGeMAPSv02 feature set, normalized against speaker-specific monologue baselines, while semantic representations are generated using the multilingual RemBERT encoder. Entrainment is quantified via cosine similarity against null distributions derived from 5,000 random pairings, and analyzed temporally by dividing monologues into beginning, middle, and end segments. Statistical verification relies on Pearson correlations, linear mixed-effects models, and feature ablation tests.

## Results

Across exchanges, 57.5% exhibit significant above-null global acoustic-prosodic entrainment (p < 0.05), while 17.5% show significant semantic entrainment. Temporal analysis reveals primacy and recency effects in 82.5% of acoustic-prosodic cases (strongest in English questions) and 67.5% of semantic cases (strongest in French questions). In cross-lingual exchanges, initial semantic entrainment positively predicts final acoustic-prosodic entrainment (p = 0.001), whereas monolingual exchanges exhibit a slight negative correlation, pointing to a distinct two-stage cross-lingual planning mechanism. Feature contribution analysis shows F0 features consistently impact all settings, MFCCs account for up to 26% in English-involved settings, and loudness standard deviation accounts for up to 8% in French-involved settings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building conversational agents, multilingual dialogue systems, or social analysis tools that model human conversational dynamics and linguistic accommodation.

## Limitations

The analysis is scoped to a subset of the Canadian Hansard corpus, excluding intrasentential code-switching and speakers with special titles to control for power differentials.

## Related

- (link related pages by id as the wiki grows)
