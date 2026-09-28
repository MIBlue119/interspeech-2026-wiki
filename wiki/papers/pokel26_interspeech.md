---
id: pokel26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-776
---

# Data-Efficient ASR Personalization for Non-Normative Speech Using an Uncertainty-Based Phoneme Difficulty Score for Guided Sampling

**TL;DR** — Uses variational LoRA uncertainty estimates to build a phoneme-level difficulty score that guides which examples to oversample when personalizing ASR to impaired speech, improving accuracy with limited data.

## Problem

ASR personalization for non-normative (e.g. impaired) speech is hampered by high acoustic variability and scarce personalized training data, and computationally expensive ensembles are impractical for estimating where a model struggles.

## Method

The authors use Variational Low-Rank Adaptation (VI LoRA) to cheaply estimate epistemic uncertainty in a foundation ASR model at the phoneme level, combine this into a composite Phoneme Difficulty Score (PhDScore), and use it to drive targeted oversampling during fine-tuning.

## Results

On English and German datasets, including a year-apart longitudinal clinical comparison, VI LoRA-based uncertainty aligns better with expert clinical assessments than standard entropy, PhDScore captures stable persistent articulatory difficulties, and uncertainty-guided sampling significantly improves ASR accuracy for impaired speech.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Data-efficient ASR personalization for people with speech impairments or atypical speech, aiding assistive technology and clinical speech monitoring.

## Related

- (link related pages by id as the wiki grows)
