---
id: kilpatrick26_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1551
pdf: https://www.isca-archive.org/interspeech_2026/kilpatrick26_interspeech.pdf
---

# Word Iconicity and Phonological Surprisal as Predictors of Age of Acquisition

*Alexander Kilpatrick, Rikke Bundgaard-Nielsen*

[PDF](https://www.isca-archive.org/interspeech_2026/kilpatrick26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kilpatrick26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1551)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper investigates the developmental dissociation between word iconicity and phonological surprisal in predicting age of acquisition (AoA) versus adult processing outcomes. Using regression and XGBoost models, it demonstrates that iconicity robustly predicts earlier word acquisition, whereas information-theoretic surprisal measures strongly drive adult psycholinguistic processing efficiency.

## Key contributions

- Evaluates eight distinct phoneme-level information-theoretic metrics (surprisal and entropy across first, last, max, and average positions) alongside lexical predictors using extreme gradient boosting (XGBoost).
- Establishes a developmental dissociation where form-meaning iconicity scaffolds early word learning, while phonological unpredictability mainly supports adult processing efficiency.
- Performs sliding window regression and quartile analyses showing that the relationship between iconicity and acquisition varies non-linearly across the vocabulary continuum.
- Demonstrates via XGBoost feature importance (SHAP values) that information-theoretic measures strongly impact adult recognition memory, semantic decision, and lexical decision tasks, but have minimal impact on AoA.

## Problem

Prior literature establishes that iconic words are learned earlier by children due to transparent form-meaning mappings, yet paradoxically, adults show better recall and deeper encoding for unusual or high-surprisal word forms. However, it remains unknown when and how this developmental transition occurs, and whether information-theoretic measures systematically predict child age of acquisition (AoA). Previous studies evaluated these factors in isolation, leaving a gap in understanding how phonological surprisal and iconicity jointly shape lexical acquisition and adult processing.

## Method

The authors synthesized multiple lexical and psycholinguistic datasets including SUBTLEX-US (approx. 50 million words), the CMU Pronouncing Dictionary, crowdsourced iconicity ratings (over 14,000 words), and several AoA norm databases spanning child and adult vocabularies (8 months to 13 years of age). Eight phoneme-level information-theoretic features—surprisal and entropy at the first position, last position, maximum, and average across all positions—were calculated based on phonemic transitions. Additional lexical controls included word frequency, concreteness, valence, phonemic length, and morphemic length.

To manage multicollinearity among the correlated information-theoretic predictors, the authors employed extreme gradient-boosted machine learning models (XGBoost) trained with 500 boosting rounds, a learning rate of 0.05, a maximum tree depth of 4, and subsampling/column sampling set to 0.8. Feature importance was quantified using absolute SHAP values. Additionally, sliding window regressions and a four-quartile linear regression model (accounting for interactions between predictors and AoA quartiles) were fitted to evaluate shifts in effect sizes across the vocabulary acquisition span.

## Experimental setup

Datasets used include SUBTLEX-US (~50M words), CMU Pronouncing Dictionary, MacArthur–Bates Communicative Development Inventories (CDI, 8–30 months), adult retrospective AoA norms (5–13 years), test-based AoA norms, recognition memory databases, the Calgary Semantic Decision Project, and the Massive Auditory Lexical Decision database. Baselines include lexical control features such as word frequency, concreteness, valence, phonemic length, and morphemic length. Evaluation metrics rely on SHAP feature importance proportions from XGBoost models, standardized regression coefficients (beta values), t-statistics, p-values, and overall model R-squared.

## Results

XGBoost feature importance models revealed that lexical predictors like frequency, concreteness, and phonemic length dominate age of acquisition predictions, whereas information-theoretic measures (average entropy and surprisal) heavily dominate adult recognition memory, semantic decision, and auditory lexical decision models. In linear regression predicting AoA, iconicity yielded a robust negative coefficient (b = -0.442, SE = 0.026, t = -17.14, p < 0.001), indicating that highly iconic words are acquired significantly earlier. Average surprisal and average entropy showed small positive associations with AoA (b = 3.47, p < 0.001 for surprisal), meaning higher surprisal weakly predicts later acquisition.

Quartile interaction models (R-squared = 0.908) demonstrated that the negative effect of iconicity is present in the earliest quartile (Q1) and deepens sharply in the latest quartile (Q4, interaction b = -0.137, p < 0.001). Conversely, average surprisal exhibited a minor positive interaction in Q4 (b = 0.062, p = 0.008), confirming that phonological surprisal has a negligible role in early child acquisition compared to adult processing outcomes.

| System / Condition | Iconicity Coeff (b) | Avg Surprisal Coeff (b) | Model R² / Fit | Notable Finding |
|---|---|---|---|---|
| Full AoA Regression | -0.442 (p < 0.001) | 3.47 t-stat (p < 0.001) | N/A | Iconicity strongly predicts earlier AoA |
| Quartile Interaction Model | -0.085 (p < 0.001) | -0.26 t-stat (p = 0.799) | R² = 0.908 | Q4 late-acquired words show sharp iconicity interaction |
| XGBoost (AoA Task) | Low SHAP importance | Minimal SHAP importance | N/A | Lexical length & frequency dominate AoA |
| XGBoost (Adult Processing) | Moderate | High SHAP importance | N/A | Surprisal/Entropy dominate adult memory & decisions |

## Limitations

The study relies entirely on correlational analyses of existing lexical and psycholinguistic norms, meaning longitudinal or experimental causal validation is missing. The analysis is restricted primarily to English (leveraging SUBTLEX-US and American English pronunciations), limiting cross-linguistic generalizability. Furthermore, combined datasets merge parent-reported CDI vocabulary checklists with adult retrospective AoA ratings, introducing potential methodological noise.

## Why read this

Speech and ML researchers studying lexical acquisition, speech perception, or information-theoretic properties of language should read this to understand how form-meaning iconicity and phonological surprisal play divergent roles across human development rather than acting uniformly across the lifespan.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving computational models of language acquisition, vocabulary growth simulation, cognitive modeling of psycholinguistic processing, and text-to-speech or lexical generation systems that factor in human-like processing efficiency.

## Institutions / 機構

University of Aizu, University of Melbourne

## Related

- (link related pages by id as the wiki grows)
