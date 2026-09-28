---
id: lee26p_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1786
pdf: https://www.isca-archive.org/interspeech_2026/lee26p_interspeech.pdf
---

# Cross-linguistic word-medial stop lenition: A Functional PCA approach

[PDF](https://www.isca-archive.org/interspeech_2026/lee26p_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26p_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1786)

**TL;DR** — This paper evaluates word-medial continuity lenition across nine languages using functional principal component analysis on intensity contours, revealing a near-universal tendency for intervocalic stops to be phonetically weaker.

## Problem

Stop lenition is widespread, but prior studies have examined few languages with disparate methods, making it difficult to separate genuine cross-linguistic differences from methodological artifacts. Resolving this gap clarifies whether continuity lenition acts as a universal speech segmentation cue for listeners.

## Method

The authors analyze 1.47 million intervocalic stop tokens from nine languages using read speech corpora (GlobalPhone, LibriSpeech) and spontaneous speech (Seoul Corpus), force-aligned via the Montreal Forced Aligner. They apply Functional Principal Component Analysis (FPCA) on time-normalized, median-centered intensity contours registered at consonant boundaries to extract the primary dimension of intensity transition and duration. Bayesian mixed-effects linear regression models are then fit per language to evaluate word position and stop type effects while controlling for covariates like speech rate, place of articulation, neighboring vowel height, and syllable predictability.

## Results

The first principal component accounts of 40.3% of intensity contour variation and successfully orders stop types consistently across languages (nasals < voiced < voiceless). Voiced stops exhibit the most uniform behavior globally, appearing shorter and more lenited word-medially in 8 out of 9 languages. While nasal and voiceless stops show greater cross-linguistic variation in whether duration or intensity transition changes, almost all instances align with the hypothesis that word-medial stops are weaker. Supplementary stress analyses across five languages confirm that word stress significantly conditions both duration and intensity, though the overarching position effects generally persist.

## Code

- https://doi.org/10.17605/OSF.IO/CE65H

## Applications

Phoneticians and speech scientists studying cross-linguistic phonetic variation, acoustic modeling, and the phonetics-prosody interface.

## Limitations

Potential variations in forced-alignment accuracy across languages, especially for highly lenited or elided tokens, and the approximation of prosodic structure using lexical word boundaries.

## Related

- (link related pages by id as the wiki grows)
