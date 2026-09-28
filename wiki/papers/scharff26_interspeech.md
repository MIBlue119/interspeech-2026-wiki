---
id: scharff26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2920
pdf: https://www.isca-archive.org/interspeech_2026/scharff26_interspeech.pdf
---

# Gradient phonetic detail is less detrimental to word segmentation in infant-directed speech

[PDF](https://www.isca-archive.org/interspeech_2026/scharff26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/scharff26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2920)

**TL;DR** — Evaluating unsupervised word segmentation on infant-directed speech with gradient phonetic detail shows that two out of four algorithms experience no performance degradation, while the other two show only modest drops compared to adult-directed speech.

## Problem

Computational models of word segmentation typically assume clean phonemic dictionary inputs, ignoring real-world gradient phonetic variation. Prior adult-directed speech studies found that encoding phonetic detail severely degrades segmentation performance, but it remains unclear if this holds for infant-directed speech, which differs structurally with shorter utterances, isolated single-word utterances, and smaller vocabularies.

## Method

The authors evaluated four unsupervised word segmentation algorithms using the PhonProv corpus derived from the Providence Corpus of parent-child interactions containing 31,198 word tokens. The algorithms tested include two bottom-up models (DiBS for diphone-based segmentation, and Transitional Probability/TP) and two joint-learning models that use a proto-lexicon (PUDDLE and Adaptor Grammars/AG). Experiments compared performance on phonemically transcribed versus phonetically transcribed inputs (incorporating 35 consonant and 21 vowel symbols capturing aspiration, flapping, and glottalization), using both the full corpus and a reduced 1/10 subset to simulate less language experience.

## Results

On the full corpus, AG achieved the highest F-score of 0.58 on phonemic and 0.52 on phonetic input, while TP scored 0.30 (phonemic) and 0.32 (phonetic), showing zero degradation. PUDDLE achieved 0.40 (phonemic) and 0.39 (phonetic), also showing high resilience, whereas DiBS dropped from 0.41 to 0.34. On the 1/10 reduced corpus, TP showed no degradation (0.29 vs 0.30), while PUDDLE dropped substantially due to lexicon fragmentation when data and consistency are limited. All algorithms performed significantly better than a random baseline score of approximately 0.09 to 0.10.

## Code

- https://doi.org/10.5281/zenodo.20767608

## Applications

Cognitive scientists, computational linguists, and speech researchers studying language acquisition and unsupervised speech processing.

## Limitations

The infant-directed speech corpus encodes consonantal variation but lacks vowel variation, which may lead to underestimating the full cost of phonetic variation.

## Related

- (link related pages by id as the wiki grows)
