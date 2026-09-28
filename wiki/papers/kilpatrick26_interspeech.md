---
id: kilpatrick26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1551
pdf: https://www.isca-archive.org/interspeech_2026/kilpatrick26_interspeech.pdf
---

# Word Iconicity and Phonological Surprisal as Predictors of Age of Acquisition

[PDF](https://www.isca-archive.org/interspeech_2026/kilpatrick26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kilpatrick26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1551)

**TL;DR** — Using machine learning and regression analyses across large lexical databases, this paper demonstrates that iconicity robustly predicts earlier age of acquisition (AoA) across the lexicon, whereas phonological surprisal and entropy show weak effects on acquisition but substantially predict adult processing outcomes.

## Problem

While prior work shows iconic words are acquired earlier by children due to transparent form-meaning mappings, these words often contain unusual phonological sequences (high surprisal), which laboratory studies show children actually find harder to learn. Conversely, adults process unusual and iconic word forms more deeply and accurately. It remains unclear when this developmental transition occurs and how information-theoretic measures interact with age of acquisition versus adult processing.

## Method

The study utilized extreme gradient-boosted machine learning (XGBoost) models trained with 500 boosting rounds, a learning rate of 0.05, and max tree depth of 4 to evaluate feature importances via SHAP values across multiple datasets. Predictors included crowdsourced iconicity scores, word frequency, concreteness, valence, phonemic/morphemic length, and eight information-theoretic measures (surprisal and entropy calculated at first, last, maximum, and average positions via SUBTLEX-US and the CMU Pronouncing Dictionary). Dependent variables spanned AoA norms, recognition memory, semantic decision accuracy/RT, and auditory lexical decision accuracy/RT. In addition, sliding window regressions and quartile interaction linear models were conducted across the acquisition continuum.

## Results

XGBoost models revealed that information-theoretic measures dominated adult processing tasks (recognition memory and lexical/semantic decisions) but contributed little to AoA models, where frequency, concreteness, and length dominated. A linear regression predicting AoA found iconicity to be a significant negative predictor (b = -0.442, t = -17.14, p < 0.001), while average surprisal and entropy showed minor positive relationships. The quartile interaction model accounted for R2 = 0.908 of the variance in AoA, showing a significant main effect for iconicity (b = -0.085, t = -5.94) and a strong negative interaction specifically in the latest-acquired quartile (Q4 interaction b = -0.137, t = -6.11). Surprisal showed a small positive interaction with Q4 (b = 0.062, t = 2.64, p = 0.008), indicating that phonologically surprising sequences associate slightly with later AoA.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech scientists, psycholinguists, and cognitive scientists studying lexical development, vocabulary acquisition, and adult speech processing efficiency.

## Limitations

The analyses are strictly correlational, meaning longitudinal or experimental work is required to establish direct causality.

## Related

- (link related pages by id as the wiki grows)
