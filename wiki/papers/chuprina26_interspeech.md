---
id: chuprina26_interspeech
category: phonetics-linguistics
labels: [multilingual]
institutions: ["University of Cambridge"]
code: https://osf.io/v6uc7/overview
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3400
pdf: https://www.isca-archive.org/interspeech_2026/chuprina26_interspeech.pdf
---

# Sorting Clusters into the Shape of the Word: Positional Distribution of Probabilities

*Anastasia Chuprina*

[PDF](https://www.isca-archive.org/interspeech_2026/chuprina26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chuprina26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3400)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — This study analyzes the positional distribution and entropy of consonant clusters across word positions in child speech versus adult models using longitudinal CHILDES data across six languages, revealing that medial positions exhibit the highest entropy while edge stability emerges early. Vocabulary growth acts as a primary driving force that reduces child speech uncertainty and bridges the gap to adult phonotactics.

## Key contributions

- Analyzed the positional organization of consonant clusters (initial, medial, final) in child speech versus adult target models across 6 typologically diverse languages (English, French, Portuguese, Dutch, German, Polish).
- Applied four bias-corrected entropy estimators (including Dirichlet-Schürmann-Grassberger and Chao-Shen) on fixed-size bins of 50 clusters to achieve size-unbiased distribution comparisons.
- Uncovered a robust positional asymmetry where medial (intervocalic) clusters consistently exhibit the highest entropy across languages, whereas word edges show greater structural stability.
- Demonstrated that vocabulary size and chronological age significantly modulate entropy and system convergence, while syntactic complexity (MLU) selectively slows down phonological acquisition in specific positions.

## Problem

Investigating how children master phonologically complex consonant sequences requires understanding the interplay between immature motor control and strict native language phonotactics. Prior approaches lack a systematic multi-language cross-positional analysis of entropy in early child speech versus adult standards. Resolving this gap clarifies how motoric variation (relaxed constraints) transitions into systematic, language-specific phonotactic structures during early language acquisition.

## Method

The study utilizes longitudinal speech transcripts from the CHILDES database (version 2021.1) accessed via the R childesr library, spanning 6 languages: American/British English, Canadian/European French, European Portuguese, Dutch, German, and Polish. A custom Python script removed diacritics from IPA transcriptions to isolate phonemic inventories, extracting consonant clusters in word-onset, intervocalic (medial), and word-final positions. Exclusions applied to non-cluster combinations like glides (mj, kw), co-articulated consonants, isolated clusters, and words exceeding four syllables. To neutralize data-volume biases, tokens were binned into 50-cluster lists per position per child per month. Proxy measures for vocabulary (unique word forms per month averaged per bin) and syntax (Mean Length of Utterance, MLU) were computed alongside four bias-corrected entropy estimators: Dirichlet-Jeffreys, Dirichlet-Schürmann-Grassberger, Miller-Madow, and Chao-Shen.

Linear mixed-effects models were fitted using R's lme4 package in two stages to analyze raw entropy (as a function of language, position, age, vocabulary, and syntax) and system convergence (using the difference $D = H_{adult} - H_{child}$). Random intercepts and slopes for child loquacity were included to control for individual differences and session talkativeness. Tukey post-hoc tests via emmeans and likelihood-ratio tests guided model selection.

## Experimental setup

Evaluated on longitudinal CHILDES corpora across 6 languages comprising 45 children in total: English (13 children, age 8–48 months, mean session length 3,944 word tokens), French (7 children, 12–52 months, 2,721 tokens), Portuguese (5 children, 8–58 months, 1,205 tokens), Dutch (12 children, 13–35 months, 529 tokens), German (4 children, 12–25 months, 823 tokens), and Polish (4 children, 19–38 months, 938 tokens). The system compares actual child production against adultlike target models using Schürmann-Grassberger and Chao-Shen entropy metrics in bits, evaluated via linear mixed-effects regressions and Tukey-adjusted post-hoc comparisons.

## Results

Medial cluster positions consistently exhibited significantly higher entropy than initial ($p < 0.001$) and final ($p < 0.0001$) positions across both actual and model systems, with final positions showing lower entropy than initial positions ($p < 0.001$). Cross-linguistically, Polish showed significantly higher cluster diversity than Dutch, English, French, and Portuguese ($p < 0.05$). English uniquely exhibited higher entropy in the final position than the initial position ($p < 0.0001$), whereas Portuguese showed the highest entropy in the initial position ($p < 0.01$). In the actual child subsystem, vocabulary size ($Est. = -6.3, SE = 2.1, p < 0.01$) and age ($Est. = -2.3, SE = 1.2, p = 0.05$) reduced entropy in Chao-Shen models, indicating stabilization. Conversely, in adult models, age ($Est. = 0.13, SE = 0.02, p < 0.01$) and vocabulary ($Est. = 0.46, SE = 0.04, p < 0.01$) positively correlated with entropy.

| System / Condition | Initial Entropy (bits) | Medial Entropy (bits) | Final Entropy (bits) |
|---|---|---|---|
| English (Actual) | ~3.2 | ~4.4 | ~3.8 |
| English (Model) | ~3.0 | ~4.6 | ~3.9 |
| Polish (Actual) | ~3.8 | ~4.8 | ~3.5 |
| Polish (Model) | ~3.5 | ~4.9 | ~3.3 |

## Limitations

The dataset relies on naturalistic transcription corpora where transcription strategies and granularity can vary across different contributors and languages. The analysis is restricted to discrete phonological categories of consonant clusters, omitting continuous acoustic measurements and broader syllable structures such as CV alternations. Furthermore, explicit morphological-level annotations were absent from the corpora, limiting deeper investigation into morphophonotactic constraints.

## Why read this

Phoneticians, speech acquisition researchers, and computational linguists studying developmental phonotactics should read this paper to understand how positional entropy and vocabulary growth interact during early language learning. It provides rigorous cross-linguistic evidence on how motoric variation resolves into stable word-edge and medial structures.

## Code

- https://osf.io/v6uc7/overview

## Applications

Computational models of child language acquisition, automated speech evaluation tools for pediatric speech therapy, and cross-linguistic speech segmentation systems.

## Institutions / 機構

University of Cambridge

## Related

- (link related pages by id as the wiki grows)
