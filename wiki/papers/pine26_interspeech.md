---
id: pine26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/pine26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/pine26_interspeech.pdf
---

# Two Lessons Learned from the SGILE project: Efficient Building and Evaluation of TTS Voices

[PDF](https://www.isca-archive.org/interspeech_2026/pine26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pine26_interspeech.html)

**TL;DR** — This paper introduces an interactive web app and open-source EveryVoice toolkit from the SGILE project that demonstrate how high-quality text-to-speech models can be trained on modest amounts of data while employing efficient Best-Worst Scaling (BWS) evaluations.

## Problem

Over 99% of the world's 7,100+ languages are considered under-resourced, lacking the massive datasets and computational resources typically demanded by modern neural TTS models. Furthermore, traditional subjective evaluations like Mean Opinion Score (MOS) or standard AB tests impose heavy listener burdens and are inefficient when available evaluator pools are extremely small.

## Method

The SGILE project developed the open-source EveryVoice TTS toolkit to enable non-expert users to build custom voices from scratch using only a few hours of speech data. For evaluation, the system implements Best-Worst Scaling (BWS) alongside traditional AB tests within an interactive web application framework. The BWS interface presents users with four audio stimuli simultaneously, requiring them to designate the best and worst samples, which efficiently yields five pairwise comparisons from a single listening and selection pass. The accompanying web demo serves as an informal listening test that blind-tests user preferences, reveals the underlying voice characteristics post-rating, and aggregates community comparisons across multiple languages.

## Results

The work showcases multi-language TTS voices trained successfully from scratch using limited speech data typical of under-resourced environments. While specific acoustic metric numbers are omitted, the paper highlights that BWS testing provides greater efficiency and statistical robustness by extracting more comparative information with significantly less listener effort compared to standard evaluation paradigms.

## Code

- https://github.com/EveryVoiceTTS/EveryVoice

## Applications

Speech engineers, educators, and language community members building custom text-to-speech technologies for under-resourced or indigenous languages with restricted data and evaluation pools.

## Limitations

The paper focuses primarily on presenting a demo application and practical framework lessons rather than conducting formal large-scale empirical benchmarks across diverse commercial architectures.

## Related

- (link related pages by id as the wiki grows)
