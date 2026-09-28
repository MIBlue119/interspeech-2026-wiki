---
id: carne26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3166
pdf: https://www.isca-archive.org/interspeech_2026/carne26_interspeech.pdf
---

# Function words: a topic independent approach to word n-gram selection for forensic speaker comparison

[PDF](https://www.isca-archive.org/interspeech_2026/carne26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/carne26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3166)

**TL;DR** — This paper evaluates topic-independent feature selection using explicitly defined function words to mitigate topic bias in likelihood ratio-based forensic speaker comparison, achieving an optimal Cllr of 0.78 with 50 features using an ANOVA F-ratio filter.

## Problem

Likelihood ratio-based forensic speaker comparison systems that leverage word n-grams frequently suffer from unintended topic-dependent terms entering the feature set. This flaw compromises the validity of speaker comparison by misattributing topical similarities to speaker-specific idiolectal word choices, ultimately overestimating the strength of forensic evidence.

## Method

The system processes manually transcribed verbatim casual telephone speech via Python's scikit-learn CountVectorizer using word unigrams and a two-level multinomial likelihood ratio model with a conjugate Dirichlet prior. The data is partitioned using a 20% test, 40% reference, and 40% calibration split with 5-fold cross-validation. The approach replaces implicit frequency-based n-gram selection with an explicitly defined control list of 156 function words, followed by evaluating five filter-based feature selection techniques: frequency, mutual information, ANOVA F-ratio, chi-squared, and variance threshold.

## Results

Experiments use transcripts from 104 Australian male speakers from the AusEng 500+ database (208 total non-contemporaneous recordings). The unconstrained baseline using frequency selection yields a Cllr of 0.60 with 450 features. The explicit control set of 156 function words yields a poorer Cllr of 0.83, primarily due to increased discrimination loss. Applying the ANOVA F-ratio procedure improves performance to a Cllr of 0.78 while drastically compressing the feature set down to just k=50 dimensions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic scientists and speech engineers building automated forensic voice comparison systems or text-comparison tools requiring immunity to conversational topic mismatches.

## Limitations

Constrained to a set of 104 Australian male speakers from a single database, and utilizing function words results in a higher error cost compared to unconstrained vocabulary baselines.

## Related

- (link related pages by id as the wiki grows)
