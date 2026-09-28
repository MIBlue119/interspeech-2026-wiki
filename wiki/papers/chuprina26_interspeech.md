---
id: chuprina26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3400
pdf: https://www.isca-archive.org/interspeech_2026/chuprina26_interspeech.pdf
---

# Sorting Clusters into the Shape of the Word: Positional Distribution of Probabilities

[PDF](https://www.isca-archive.org/interspeech_2026/chuprina26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chuprina26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3400)

**TL;DR** — This study analyzes positional entropy in consonant cluster production across six languages using longitudinal child speech data from CHILDES, revealing that children's actual speech exhibits higher cross-linguistic instability and weaker word-edge contrasts compared to adult-like model phonologies.

## Problem

While motor control theories suggest that early child speech goes through a high-entropy exploration phase before narrowing down to native phonotactic constraints, it remains unclear how positional organization (initial, medial, and final word positions) emerges across languages with complex syllabic structures. Understanding this developmental gap helps explain how children balance immature motor control with target language constraints. Investigating these dynamics sheds light on how vocabulary growth and syntactic complexity modulate phonological acquisition.

## Method

The authors analyzed longitudinal IPA-transcribed child speech corpora from the CHILDES database covering six languages (English, French, Portuguese, Dutch, German, and Polish) involving 57 children aged 8 to 58 months. A custom Python script stripped transcriptions of diacritics and extracted two-consonant clusters in word-initial, intervocalic (medial), and word-final positions for words up to four syllables. To control for sample size differences, cluster sequences were binned into fixed-size lists of 50 per position per child. Four bias-corrected entropy estimators—primarily the Dirichlet-Schürmann-Grassberger and Chao-Shen estimators—were applied to compute information diversity in bits, followed by linear mixed-effects modeling to evaluate positional asymmetries, cross-linguistic differences, and developmental convergence.

## Results

Across all languages, both actual child productions and adult-like models showed strong positional asymmetry, with medial clusters exhibiting the highest entropy and final positions generally showing reduced diversity compared to initial positions. Polish actual speech demonstrated significantly higher cluster diversity than Dutch, English, French, and Portuguese. In child productions, vocabulary size and age showed negative associations with entropy under specific estimators, whereas adult-like models showed positive correlations between entropy and both age and vocabulary size. Convergence analyses indicated that lexical and syntactic development (measured via MLU) help narrow the gap between actual child productions and adult-like phonology, particularly across word positions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Developmental linguists, speech-language pathologists, and researchers modeling speech acquisition or automatic child speech recognition use these insights to understand phonotactic mastery and error patterns.

## Limitations

The dataset was restricted to words of up to four syllables and predominantly two-consonant clusters, and relied on proxy measures for vocabulary and syntax due to the absence of word lemma annotations.

## Related

- (link related pages by id as the wiki grows)
