---
id: khanom26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2571
pdf: https://www.isca-archive.org/interspeech_2026/khanom26_interspeech.pdf
---

# SpiroPhonia: Non-Invasive Respiratory Health Assessment from Spontaneous Speech

[PDF](https://www.isca-archive.org/interspeech_2026/khanom26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khanom26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2571)

**TL;DR** — SpiroPhonia is a machine learning framework for non-invasive respiratory health assessment using spontaneous speech, achieving 78% accuracy and an 87% AUC in detecting COPD.

## Problem

Chronic Obstructive Pulmonary Disease affects over 400 million people globally, yet diagnosis relies on infrastructure-bound tools like spirometry that create a critical accessibility gap for early-stage screening and continuous monitoring. Speech production is tightly coupled with respiratory physiology, but prior speech-based methods primarily rely on controlled laboratory tasks such as sustained vowels or scripted reading rather than natural, everyday conversations.

## Method

The framework extracts 94 features grouped into acoustic perturbation (jitter, shimmer, F0, formants), spectral representations (13 MFCCs with summary statistics), and pulmonary-temporal features (pause ratio, pauses per minute, silence duration) from 10-30 second speech windows. A two-stage feature optimization strategy—first pruning correlated predictors and then applying Recursive Feature Elimination with Cross-Validation (RFECV)—selects compact biomarker subsets for classifiers including Linear SVM, Gradient Boosting, Random Forest, Logistic Regression, and a neural network. The dataset comprises 201 speakers (102 with COPD/respiratory conditions, 99 healthy controls) curated from publicly available real-world interviews.

## Results

Evaluated on a held-out test set of 41 speakers via subject-independent splitting, a Linear SVM achieved 78.05% accuracy and 85.00% specificity using only 5 features, while Gradient Boosting achieved 78.05% accuracy with 85.71% sensitivity using 59 features. Random Forest reached the highest AUC of 87.14% (95% CI: 74.61–96.77%). Local jitter, local shimmer, and pause ratio were selected by all classifiers as robust markers of respiratory impairment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and healthcare developers building voice-enabled consumer tech, mobile health apps, or remote telehealth monitoring systems for passive, at-home respiratory screening.

## Limitations

The dataset is limited to 201 speakers, restricting the evaluation of data-intensive modeling approaches, and requires broader validation across languages, recording devices, and acoustic environments.

## Related

- (link related pages by id as the wiki grows)
