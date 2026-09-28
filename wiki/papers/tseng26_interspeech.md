---
id: tseng26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-793
pdf: https://www.isca-archive.org/interspeech_2026/tseng26_interspeech.pdf
---

# Time-normalized spectrograms reveal segmental differences in English heterographic homophones

[PDF](https://www.isca-archive.org/interspeech_2026/tseng26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tseng26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-793)

**TL;DR** — This study analyzes time-normalized spectrograms and contextualized embeddings across 14,000 English heterographic homophone tokens to demonstrate that homophones are not phonetically identical, with their fine-grained segmental realizations being systematically shaped by utterance-context semantics.

## Problem

Classical mental lexicon models assume homophones share identical underlying phonological and form representations because they sound the same despite having different meanings. However, this abstract separation between form and semantics is challenged by empirical observations that phonetic realizations often vary systematically. Investigating whether these differences emerge directly from spectrograms and correlate with context-specific meaning helps resolve whether lexical models require token-level form-meaning alignment.

## Method

The authors extracted 35 heterographic homophone pairs (70 word types, 14,000 tokens downsampled to 200 tokens each) from the Redhen 2016 TV news broadcast dataset. Form representations were built using time-normalized Mel spectrograms (fixed to 50 timesteps via dynamic hop sizes, 21 Mel bands, and PCA-compressed to 50 dimensions), while token meanings were captured as 768-dimensional contextualized embeddings from GPT-2 (137M parameters). They trained multi-class linear discriminant analysis (LDA) acoustic models to derive phone-level logits along the normalized time axis, and employed Generalized Additive Models (GAMs) to evaluate the impact of word identity and semantic discriminability (spectral vs. CE logits) on pronunciation trajectories while controlling for duration, frequency, and pause indicators.

## Results

LDA form vectors predicted homophone pairs with a mean 10-fold cross-validation accuracy of 79.30% (compared to a 2.82% permutation baseline) and individual word types with 51.13% accuracy (1.43% baseline). Across segment models, target GAMs incorporating word identity consistently outperformed baseline models, yielding a mean AIC difference of 54.28 (e.g., mail/male showed a mean delta AIC of 187.43). For example, wait exhibited a slower vowel onset compared to its homophone weight, while weight showed a more pronounced w onset. GAM analysis confirmed that semantic discriminability (CE logits) positively predicts spectral logit differences, indicating that stronger contextual semantic contrast leads to more distinct phonetic realizations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, psycholinguists, and speech engineers studying fine-grained phonetic variation, lexical representation models, and the direct mapping between speech signals and contextual semantics.

## Limitations

The study is restricted to 35 English heterographic homophone pairs from a single broadcast news corpus, meaning findings may need broader verification across diverse speech styles and languages.

## Related

- (link related pages by id as the wiki grows)
