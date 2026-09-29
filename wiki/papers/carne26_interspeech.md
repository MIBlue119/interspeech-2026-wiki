---
id: carne26_interspeech
category: speaker
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3166
pdf: https://www.isca-archive.org/interspeech_2026/carne26_interspeech.pdf
---

# Function words: a topic independent approach to word n-gram selection for forensic speaker comparison

*Michael Carne*

[PDF](https://www.isca-archive.org/interspeech_2026/carne26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/carne26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3166)

**Category:** `speaker`

**TL;DR** — This paper investigates topic bias in likelihood ratio-based forensic speaker comparison systems using word n-grams, demonstrating that a topic-independent feature set restricted to function words combined with ANOVA F-ratio feature selection can mitigate topic confounding while reducing dimensionality.

## Key contributions

- Identifies and quantifies a critical vulnerability in conventional implicit frequency-based word n-gram feature selection for forensic speaker comparison, showing that 35% of selected unigrams are actually topic-dependent content words.
- Proposes a topic-independent explicit feature set comprising 156 closed-class function words (prepositions, pronouns, conjunctions, auxiliary verbs) for forensic text and speaker comparisons.
- Evaluates five filter-based feature selection methods (Frequency, Mutual Information, ANOVA F-ratio, Chi-squared, and Variance Threshold) applied to the function word set.
- Demonstrates that ANOVA F-ratio feature selection optimizes performance down to a compact subset of k = 50 features, improving the log-likelihood ratio cost function (Cllr) from 0.83 to 0.78.

## Problem

Likelihood ratio-based forensic speaker comparison (LR-based FSC) systems often exploit speaker word-choice idiosyncrasies using bag-of-words representations derived from transcripts. Traditional approaches rely on implicit frequency-based selection to pick the top k most frequent n-grams. However, this study reveals that this approach inadvertently captures topic-specific content words (such as 'weekend', 'work', 'birthday', and 'quidditch'), which can confound forensic evaluations by attributing topic mismatches to speaker differences and thus overestimating the strength of evidence. Eliminating this topic bias is crucial because forensic samples frequently exhibit mismatched conversational topics.

## Method

The system processes manually transcribed verbatim text from the first two minutes of net speech, applying regular expressions and lowercasing via Python's scikit-learn CountVectorizer. Text is tokenized into word unigrams using the regex pattern (?u)\b\w\w+\b, causing contracted forms like 'don't' to be split into separate tokens ('don' and 't').

The core model is a feature-based two-level multinomial likelihood ratio (LR) model. In this setup, multivariate probability density functions for the same-speaker hypothesis (Hp) and different-speaker hypothesis (Hd) are estimated directly from feature counts. A Dirichlet distribution serves as the conjugate prior for the multinomial distribution's parameters, parameterized via a multivariate beta function. This preserves the full multivariate structure of the data, capturing both similarity and typicality.

To remove topic dependency, an explicit set of 156 function words is utilized. Five filter-based feature selection techniques are evaluated on this set: frequency-based (f), mutual information (MI), ANOVA F-ratio, chi-squared (chi^2), and variance threshold (VT). Supervised methods (chi^2, MI, ANOVA F-ratio) use sparse count matrices alongside speaker ID class labels, while VT operates in an unsupervised manner. Model calibration is executed via a logistic-regression score-to-LR conversion procedure backed by 5-fold cross-validation on a dedicated calibration subset.

## Experimental setup

The study uses speech transcripts from 104 Australian male speakers sourced from the AusEng 500+ forensic voice comparison database (totaling 208 non-contemporaneous casual telephone conversation recordings). Data is randomly partitioned into 20% test data, 40% reference data (for prior Dirichlet estimation), and 40% calibration data (for score-to-LR conversion). Performance is evaluated using the log-likelihood-ratio cost function (Cllr), its decomposition into discrimination loss (Cllr^min) and calibration loss (Cllr^cal), Equal Error Rate (EER), and Tippett plots.

## Results

The baseline unigram system using frequency-based selection (k = 450) achieves a Cllr of 0.60 (Cllr^min = 0.48, Cllr^cal = 0.12, EER = 19.17%), but suffers from 35% topic-dependent content words in its feature space. Using the full control set of 156 function words yields a worse Cllr of 0.83 (Cllr^min = 0.73, Cllr^cal = 0.11, EER = 28.27%), indicating that enforcing topic independence introduces a discrimination penalty. However, applying the ANOVA F-ratio feature selection method recovers performance, optimizing Cllr down to 0.78 with Cllr^min = 0.66, Cllr^cal = 0.12, and EER = 24.41%, while compressing the feature dimension size down to k = 50. Mutual information selection yields a Cllr of 0.81 at k = 125, while chi-squared, variance threshold, and frequency methods match the control Cllr of 0.83.

| System / Condition | k | Cllr | Cllr^min | Cllr^cal | EER (%) |
|---|---|---|---|---|---|
| Baseline Unigrams | 450 | 0.60 | 0.48 | 0.12 | 19.17 |
| Control (All Function Words) | 156 | 0.83 | 0.73 | 0.11 | 28.27 |
| ANOVA F-ratio | 50 | 0.78 | 0.66 | 0.12 | 24.41 |
| Mutual Information (MI) | 125 | 0.81 | 0.70 | 0.11 | 27.49 |
| Chi-squared / VT / Frequency | 156 | 0.83 | 0.70 | 0.13 | 27.65 |

## Limitations

The study is experimentally limited to a homogenous demographic cohort of 104 Australian male speakers, leaving cross-dialect and cross-gender generalizability unverified. The evaluation assumes cooperative casual telephone speech and does not test robustness under severe speaking style mismatches (e.g., police interview Q&A versus narrative accounts) or heavy acoustic degradation. Furthermore, extralinguistic confounders such as age, social status, and psychological state affecting function word usage (e.g., pronoun 'I' frequency) remain unmitigated.

## Why read this

Speech and forensic ML researchers should read this to understand the hidden dangers of topic confounding in text-based forensic speaker comparison and to see how explicit closed-class function word filtering with ANOVA F-ratio selection offers a robust alternative.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic speaker comparison, automated authorship attribution, and text-independent speaker recognition systems operating on conversational transcripts.

## Institutions / 機構

Australian National University

## Related

- (link related pages by id as the wiki grows)
