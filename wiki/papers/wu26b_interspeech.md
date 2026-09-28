---
id: wu26b_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-538
pdf: https://www.isca-archive.org/interspeech_2026/wu26b_interspeech.pdf
---

# Towards Dys-XAI: Influence-Based Explanations for Dysarthria Severity Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/wu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-538)

**TL;DR** — This paper introduces an influence-based instance-level explainability framework for automatic dysarthria severity assessment that links blackbox model decisions to specific supportive or competing training utterances, validating the approach through controlled deletion experiments.

## Problem

Current deep learning models for dysarthria severity assessment achieve high performance but function as black boxes, limiting their adoption in clinical settings where transparency is crucial. Existing explainability techniques rely on post-hoc acoustic feature importance scores or spectrogram heatmaps, which fail to capture the ordinal continuum of speech impairment or align with how clinicians reason using perceptual reference examples.

## Method

The authors adapt gradient-based training data influence estimation to compute per-utterance influence scores over training checkpoints, identifying which training samples support or counteract a given test prediction. The approach aggregates influence at a class level to construct a 4x4 influence matrix mapping training labels to test severity categories, and at a model level to analyze ordinal sensitivity based on label distance. The base classifier uses 80-dimensional filterbank (FBank) features fed into a single fully connected layer with a softmax, trained via cross-entropy loss using the AdamW optimizer with a learning rate of 3e-4 and batch size of 32 for 40 epochs across 30 training checkpoints per fold.

## Results

Evaluated on the TORGO dataset (approximately 21 hours from 15 speakers, partitioned via stratified K-fold cross-validation with group-wise speaker splitting), controlled deletion experiments validate the influence scores. Removing the top 20% most influential training samples causes massive performance degradation, dropping Class-2 (Moderate) accuracy from 36.8% to 0.3% and Class-3 (Severe) accuracy from 72.3% to 43.1%. Conversely, removing the bottom 20% least influential (noisy or mislabeled) samples boosts accuracy across all categories, improving Class-2 from 36.8% to 47.0%, Class-3 from 72.3% to 81.1%, and Class-1 (Mild) from 5.5% to 17.6%. Furthermore, cross-severity analysis reveals a block-diagonal influence matrix confirming that model predictions rely primarily on same-level training evidence.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and clinical researchers building automated speech evaluation systems for motor speech disorders, therapy planning, and longitudinal patient monitoring.

## Related

- (link related pages by id as the wiki grows)
