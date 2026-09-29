---
id: ries26_interspeech
category: phonetics-linguistics
labels: [multilingual]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2492
pdf: https://www.isca-archive.org/interspeech_2026/ries26_interspeech.pdf
---

# On Entrainment in Semi-Spontaneous Multilingual Parliamentary Speech

*Jennifer Jane Ries, Debasmita Bhattacharya, Julia Hirschberg*

[PDF](https://www.isca-archive.org/interspeech_2026/ries26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ries26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2492)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — This paper investigates acoustic-prosodic and semantic entrainment in semi-spontaneous, multilingual parliamentary speech using the Canadian Hansard corpus, discovering that speakers entrain across languages following primacy and recency memory effects. Cross-lingual exchanges exhibit a unique, staggered two-stage planning mechanism where initial semantic entrainment predicts final acoustic-prosodic entrainment.

## Key contributions

- Presents the first study of linguistic entrainment within the Canadian Hansard corpus of French-English parliamentary proceedings, spanning over 12 hours and 7,500 utterances.
- Establishes that 57.5% of exchanges exhibit significant acoustic-prosodic entrainment and 17.5% exhibit significant semantic entrainment, proving that entrainment generalizes to semi-spontaneous, multilingual settings.
- Reveals temporal primacy and recency effects in entrainment, with acoustic-prosodic alignment driven by English-side contexts and semantic alignment driven by French-side contexts.
- Uncovers a cross-lingual two-stage planning interaction where initial semantic entrainment positively predicts final acoustic-prosodic entrainment (coefficient 2.812, p < 0.001), contrasting with monolingual trade-offs.
- Identifies sparse feature drivers—specifically MFCCs and loudness for acoustics, and policy/numerical token indices for semantics—whose ablation drops entrainment by up to 75%.

## Problem

Prior research on linguistic entrainment (or alignment/coordination) has predominantly focused on monolingual, spontaneous open-domain conversations or specialized task-oriented dialogues with fixed levels of spontaneity. Consequently, open questions remain regarding how speakers adapt their communication styles in mixed-spontaneity settings (such as legal or parliamentary proceedings) that require crossing language boundaries. Existing parliamentary studies (e.g., U.S. Supreme Court proceedings) are limited to English and United States contexts, while multilingual representation studies rarely investigate spoken conversational entrainment. This work addresses the gap by examining how speakers entrain across varying levels of spontaneity and multiple languages within single-turn exchanges.

## Method

The study analyzes a carefully curated subset of the Canadian Hansard corpus comprising 40 dyadic mixed-spontaneity exchanges (7,500 utterances, over 12 hours), divided evenly across four language settings (en-en, fr-fr, en-fr, fr-en). Each exchange consists of a prepared monologue (10-20 minutes) followed by a spontaneous response question (1-2 minutes). Intrasentential code-switching is excluded, and speaker power differentials (e.g., presiding officers) are removed to avoid confounds.

For feature extraction, the authors vectorize monologues and questions using two modalities: 88 acoustic-prosodic features from eGeMAPSv02 (covering F0, energy, spectral, cepstral, voice quality, and duration) and 1152-dimensional semantic embeddings from the multilingual encoder RemBERT. To establish baselines, speaker-specific features from unrelated monologues are used for normalization. Global entrainment is measured via cosine similarity between normalized vectors, validated against null distributions generated from 5,000 random monologue-question pairings per language setting. Finer-grained temporal dynamics are analyzed by splitting monologues into beginning, middle, and end thirds. Statistical evaluation employs Pearson correlation and linear mixed-effects modeling using statsmodels 0.14.6.

The key design choice to examine single-turn responses to long monologues enables rigorous control over memory-based priming effects (primacy and recency). The separation of acoustic-prosodic and semantic spaces highlights distinct cognitive planning channels: semantic entrainment captures content alignment (heavily influenced by initial arguments), while acoustic-prosodic entrainment captures surface-form alignment (heavily influenced by recency and auditory memory).

## Experimental setup

The dataset comprises 40 balanced dyadic exchanges (en-en, fr-fr, en-fr, fr-en) extracted from 175 chamber meetings (317 speakers) of the 39th Canadian Parliament (2006-2007 Hansard proceedings), totaling over 12 hours of audio and 7,500 utterances. Metrics include global and temporal cosine similarity scores against null-distribution baselines (p < 0.05 and p < 0.1 significance thresholds), Pearson correlation coefficients (r), and mixed-effects regression coefficients.

## Results

Global acoustic-prosodic entrainment is significant in 57.5% of exchanges (p < 0.05) with 20% approaching significance, whereas semantic entrainment is significant in 17.5% of exchanges with 10% approaching significance. Acoustic-prosodic and semantic global entrainment scores are negatively correlated in monolingual exchanges (r ≈ -0.3 to -0.5) but positively correlated in cross-lingual exchanges (r ≈ 0.3 to 0.4). Temporal analysis reveals primacy and recency effects in 82.5% of acoustic-prosodic and 67.5% of semantic profiles. In mixed-effects modeling (FinalAcoustic ~ InitialSemantic * LanguageSetting), cross-lingual exchanges show a highly significant positive interaction (coefficient 2.812, z = 4.862, p < 0.0001), indicating that semantic entrainment with the monologue's opening predicts acoustic entrainment with its close. Ablating top feature drivers reduces acoustic-prosodic entrainment by up to 75% (mean 14%) and semantic entrainment by up to 24% (mean 12%), with top feature ablation having a much larger impact on cross-lingual exchanges (e.g., 29% drop in fr-en) than monolingual ones (6% in en-en).

| System / Condition | Significant Acoustic-Prosodic (%) | Significant Semantic (%) | Top Feature Acoustic Drop (%) | Top Feature Semantic Drop (%) |
|---|---|---|---|---|
| en-en Exchanges | -- | -- | 6% | 5% |
| fr-fr Exchanges | -- | -- | 10% | 2% |
| en-fr Exchanges | -- | -- | 18% | 22% |
| fr-en Exchanges | -- | -- | 29% | 24% |
| Total Corpus Average | 57.5% | 17.5% | 14% (Mean) | 12% (Mean) |

## Limitations

The study is restricted to 40 dyadic exchanges (7,500 utterances) from a single parliamentary corpus (Canadian Hansard) involving only two languages (English and French), limiting immediate generalization to other low-resource languages or casual conversational domains. Intrasentential code-switched turns and speakers with formal titles were explicitly excluded, narrowing the scope to strictly monolingual utterances within bilingual legislative settings. The semantic analysis relies on text transcripts rather than direct speech-to-text embedding models, inheriting ASR or transcription constraints. Finally, evaluation is limited to single-turn responses rather than multi-turn conversational dynamics.

## Why read this

Speech and ML researchers studying conversational dynamics, multilingual dialogue modeling, or cognitive speech processing should read this to understand how memory effects (primacy/recency) and cross-lingual constraints alter acoustic-prosodic and semantic entrainment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving multi-turn conversational agents, spoken dialogue systems, and computer-assisted translation or interpretation tools by modeling cross-lingual speaker accommodation.

## Institutions / 機構

Columbia University

**Funding / 經費:** National Science Foundation

## Related

- (link related pages by id as the wiki grows)
