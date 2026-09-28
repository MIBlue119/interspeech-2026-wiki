---
id: deng26c_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1611
---

# Confidence Score Guided Incremental and Speaker Adaptive Pseudo-Labeling for Semi-Supervised Elderly Speech Recognition

**TL;DR** — A confidence-guided, speaker-adaptive pseudo-labeling strategy improves semi-supervised ASR for elderly speech, where speaker variability and scarce labeled data are both major obstacles.

## Problem

Elderly speech recognition suffers from high speaker heterogeneity and limited labeled data, and standard pseudo-labeling approaches for semi-supervised ASR don't rank label reliability or adapt to individual speakers.

## Method

The authors design a confidence estimation module that ranks the reliability of untranscribed data to drive a curriculum that gradually folds in unlabeled data from high to low confidence, combined with speaker-adaptive training using learnable prompts to capture individual speaker characteristics.

## Results

On the English DementiaBank Pitt and Cantonese JCCOCC MoCA elderly speech datasets, the method gives statistically significant WER/CER reductions of 1.45 and 2.27 points absolute (6.21% and 6.98% relative) over a semi-supervised baseline without confidence-guided or speaker-adaptive pseudo-labeling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical and assistive ASR systems for elderly and cognitively impaired speakers, where labeled training data is inherently scarce.

## Related

- (link related pages by id as the wiki grows)
