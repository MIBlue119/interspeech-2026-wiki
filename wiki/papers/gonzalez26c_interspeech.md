---
id: gonzalez26c_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-920
pdf: https://www.isca-archive.org/interspeech_2026/gonzalez26c_interspeech.pdf
---

# How Linguistic Dimension Interactions Shape Meaning Preservation in Multilingual ASR

[PDF](https://www.isca-archive.org/interspeech_2026/gonzalez26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gonzalez26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-920)

**TL;DR** — This study analyzes multilingual ASR substitution errors across 42 languages using Whisper and Seamless, revealing that sentence-level semantic preservation emerges from systematic interactions among phonetic, morphological, syntactic, and semantic dimensions rather than isolated error types.

## Problem

Standard ASR evaluation metrics like Word Error Rate (WER) treat all errors as equally costly and fail to capture how different linguistic properties affect semantic preservation and intelligibility. Prior work has largely relied on aggregated typological features rather than token-level measurements derived directly from ASR outputs, leaving the true functional consequences of multi-dimensional linguistic interactions unclear.

## Method

The authors analyze substitution errors on over 48,000 audio files from the FLEURS dataset (>154 hours) across 42 languages, comparing OpenAI's Whisper and Meta's Seamless models. Using Stanza for universal dependency parsing, phonemizer for phonetic transcriptions, fastText for word embeddings, and sentence-transformers for semantic embeddings, they extract four token-level similarity dimensions: phonetic, morphological, syntactic, and semantic. These measures are evaluated within a mixed-effects beta regression framework (using glmmTMB in R) to model baseline effects, pairwise dimension interactions, and system/language-specific moderators.

## Results

Baseline mixed-effects models show phonetic similarity has a strong negative effect on semantic preservation (beta=-0.31) while word-level semantic similarity has a strong positive effect (beta=0.84). Likelihood-ratio tests confirm significant pairwise interactions, notably between morphology and syntax (beta=0.24, p<0.001) and phonology and semantics (chi-squared=21.7, p<0.001). Comparing architectures reveals that while Seamless achieves higher baseline performance, Whisper exhibits greater error sensitivity to linguistic divergence yet leverages morphological information and joint phonological-syntactic accuracy more effectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers, NLP researchers, and developers of spoken language understanding or dialogue systems seeking more linguistically grounded evaluation metrics beyond traditional WER.

## Limitations

Analyses are strictly limited to substitution errors, excluding insertions and deletions, and rely on standardized tools like Stanza and eSpeak-ng which may introduce parsing and phonemization errors.

## Related

- (link related pages by id as the wiki grows)
