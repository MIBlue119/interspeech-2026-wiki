---
id: mondal26b_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2640
pdf: https://www.isca-archive.org/interspeech_2026/mondal26b_interspeech.pdf
---

# Spontaneous Dialect-Aware Speech Corpus for Low-Resource Dakhini, A Southern Indo-Aryan Language: Methods, Challenges, and Insights

[PDF](https://www.isca-archive.org/interspeech_2026/mondal26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mondal26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2640)

**TL;DR** — This paper presents a data-centric methodology and corpus development framework for Dakhini, an under-resourced contact dialect of southern India, combining sociolinguistic recruitment strategies with rule-based dialect annotation.

## Problem

Spontaneous regional dialects like Dakhini lack formal written standards and suffer from the Observer's Effect during data collection, causing speakers to unconsciously shift toward standard Hindi or Urdu. Furthermore, standard ASR systems fail to recognize dialect-specific phonology and morphosyntax, treating genuine regional features as transcription errors.

## Method

The corpus collection uses telephonic conversational recordings of 160 participants (70% male, 30% female) aged 17-50 via an asymmetric awareness protocol where an uninformed participant is paired with a briefed anchor speaker. The annotation pipeline leverages IndicConformer Hindi ASR outputs alongside specialized rule-based detection modules for phonological assimilation, vowel length reduction, auxiliary omission, participle constructions, and lexical markers (using pyannote speaker-diarization-3.1 with ECAPA-TDNN VoxCeleb embeddings). Segments with high tag density are prioritized for human verification.

## Results

The study analyzes 160 speakers from Hyderabad, India, across diverse socioeconomic backgrounds, showing that educated speakers and females are more prone to code-switching to standard Hindi/Urdu in formal contexts (e.g., only 2 out of 15 educated females used Dakhini formally compared to 11 out of 15 disadvantaged females). The framework successfully combines automated ASR mismatch flagging with rule-based tag density triage to surface dialect-authentic segments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building dialect-aware ASR, conversational agents, or speech corpora for low-resource and contact language varieties.

## Limitations

Telephonic recording modality yields reduced acoustic signal fidelity compared to studio environments.

## Related

- (link related pages by id as the wiki grows)
