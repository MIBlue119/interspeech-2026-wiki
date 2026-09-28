---
id: sun26c_interspeech
category: prosody
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1062
pdf: https://www.isca-archive.org/interspeech_2026/sun26c_interspeech.pdf
---

# Non-linear Effects of Semantic Relevance on Word Duration in Spontaneous Speech

[PDF](https://www.isca-archive.org/interspeech_2026/sun26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1062)

**TL;DR** — Semantic relevance significantly predicts word duration in spontaneous speech through a non-linear U-shaped effect, improving AIC fit compared to standard linear controls.

## Problem

Traditional measures of word predictability like lexical frequency and n-gram probability only capture surface-level transitions and model context linearly, overlooking deeper semantic relationships. This limitation obscures how contextual semantic support modulates lexical retrieval ease, articulatory preparation, and speech timing in spontaneous conversation.

## Method

The study uses 262,342 word tokens from the Buckeye Corpus of Conversational Speech, analyzing timing data with Generalized Additive Mixed Models (GAMMs) implemented via the mgcv package. Semantic relevance is quantified using a recency-weighted sum of cosine similarities between 300-dimensional pretrained fastText embeddings of a target word and its three preceding context words (using decay weights 0.9, 0.6, and 0.3). Control predictors include word length, log word frequency, phrase rate, phonological deletions, and speaker identity as a random effect.

## Results

Model comparisons via AIC show that including semantic relevance (Model M1, AIC -471,129.9) provides a superior fit compared to removing it (Model M4, delta AIC = 23.2). Semantic relevance exhibits a significant non-linear (U-shaped) relationship with word duration (p < 0.001), showing facilitation (shorter durations) at low-to-moderate levels and lengthening at high levels. Stratified analyses reveal this semantic relevance effect is strong for low-frequency words (F = 18.90, p < 0.0001) but absent for high-frequency items (F = 1.29, p = 0.256).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and language engineers can use these cognitively grounded timing predictors to improve human-like prosody generation and speech synthesis models that currently rely purely on next-token prediction.

## Limitations

The analysis is restricted to monologic spontaneous speech from English sociolinguistic interviews and excludes utterance-initial words with fewer than three preceding context words.

## Related

- (link related pages by id as the wiki grows)
