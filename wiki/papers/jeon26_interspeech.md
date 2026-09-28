---
id: jeon26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1247
pdf: https://www.isca-archive.org/interspeech_2026/jeon26_interspeech.pdf
---

# Disentangling Depression from Cognitive Decline in Elderly Speech Using Concurrent Clinical Assessments

[PDF](https://www.isca-archive.org/interspeech_2026/jeon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1247)

**TL;DR** — This paper isolates depression-specific acoustic markers in elderly individuals with mild cognitive impairment by controlling for cognitive decline, revealing that formant features achieve an unweighted average recall of 0.760 while traditional F0 features carry no signal.

## Problem

Speech-based depression detection in elderly populations with mild cognitive impairment (MCI) is confounded by overlapping acoustic changes caused by cognitive decline, such as altered pitch range and vocal energy. Classifiers trained without controlling for these cognitive confounders risk learning general cognitive decline patterns rather than depression-specific markers. Furthermore, prior studies lack concurrent clinical assessments of both depression and cognition to systematically separate these overlapping effects.

## Method

The authors introduce a 3-year longitudinal Korean elderly speech corpus of 89 MCI participants (209 total observations) with concurrent geriatric depression (SGDS) and cognitive (MMSE) scores. They analyze 88 eGeMAPS acoustic features categorized into seven functionally motivated groups, utilizing linear mixed-effects models (LMMs) to capture within-subject longitudinal changes and partial correlations to capture between-subject differences while controlling for MMSE, age, and gender. For classification, they evaluate support vector machines (SVMs) with an RBF kernel using leave-one-subject-out (LOSO) cross-validation across individual feature groups and compare them against full eGeMAPS baselines and self-supervised models.

## Results

Both LMMs and partial correlations consistently identify formant features as the only group significantly associated with depression after controlling for cognitive function, while F0 features show no significant association. Using leave-one-subject-out cross-validation, the 18-feature formant group achieves an unweighted average recall (UAR) of 0.747, and an optimized 12-feature F1+F2 subset reaches 0.760. This outperforms the full 88-feature eGeMAPS baseline (UAR 0.655) and self-supervised models such as HuBERT with a linear head (UAR 0.729).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and health engineers building non-invasive, objective screening and monitoring tools for psychiatric and cognitive health in geriatric care.

## Limitations

The study's primary scope is restricted to passage reading tasks and a specific Korean elderly MCI demographic.

## Related

- (link related pages by id as the wiki grows)
