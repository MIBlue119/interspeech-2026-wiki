---
id: keetha26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2097
pdf: https://www.isca-archive.org/interspeech_2026/keetha26_interspeech.pdf
---

# Progressive Learning for Robust Speaker Representation

[PDF](https://www.isca-archive.org/interspeech_2026/keetha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/keetha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2097)

**TL;DR** — A progressive two-stage training approach using ReDimNet-B6 and metric learning improves cross-lingual speaker verification, achieving a 1.58% Equal Error Rate on the TidyVoice benchmark.

## Problem

Speaker embeddings often encode irrelevant linguistic content, causing systems to misclassify speakers when languages shift or when different speakers share common phonetic patterns in multilingual scenarios. This vulnerability undermines voice authentication, speaker diarization, and target speaker extraction in real-world cross-lingual environments. Robust cross-lingual speaker verification requires models that can disentangle speaker identity from both language variability and acoustic noise.

## Method

The system employs a two-stage training pipeline built on a ReDimNet-B6 backbone that takes 72-dimensional log-mel filterbank features. Stage 1 trains the backbone as a speaker classifier using Additive Angular Margin (ArcMargin) loss on the TidyVoice dataset, augmented with MUSAN noise (5-20 dB SNR), room impulse responses, and speed perturbations. Stage 2 freezes the backbone and trains a lightweight 256.13K-parameter residual projection network (three 1D conv layers with channel sizes 64, 128, and 256) using a balanced triplet loss objective. Balanced random triplet mining samples anchors, same-speaker positives (across same or different languages), and negatives (same-language or cross-language impostors) to project 192-dimensional intermediate embeddings into a 256-dimensional language-invariant hypersphere.

## Results

Evaluated on the TidyVoice Challenge dataset containing 4,474 speakers across 40 languages, the model achieves an overall Equal Error Rate (EER) of 1.58% and minDCF of 0.6481 on the development set, outperforming the challenge baseline SimAM-ResNet34 (3.07% EER) and the unadapted ReDimNet-B6 (2.70% EER). On the blind evaluation sets, Stage 2 fine-tuning lowers overall EER from 9.06% to 4.81% on seen-language enrolment (eval-A) and from 11.60% to 7.01% on fully unseen languages (eval-U). Robustness analyses using ESC-50 environmental noise and RIR reverberation confirm stable performance across matched and mismatched acoustic conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building voice authentication systems, speaker diarization pipelines, and target speaker extraction modules for multilingual contact centers and smart home platforms.

## Related

- (link related pages by id as the wiki grows)
