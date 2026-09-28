---
id: hu26c_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1130
pdf: https://www.isca-archive.org/interspeech_2026/hu26c_interspeech.pdf
---

# Personalized Keyword Spotting for User-Defined Keywords Leveraging Text-Independent Speaker Verification

[PDF](https://www.isca-archive.org/interspeech_2026/hu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1130)

**TL;DR** — The paper introduces ZP-KWS, a 1.55M-parameter framework for personalized user-defined keyword spotting that reduces target-only false rejection rate at 1% FAR by up to 60% relative to baselines.

## Problem

Existing zero-shot user-defined keyword spotting (UD-KWS) systems learn speaker-invariant representations that fail to reject impostors or playback audio uttering the correct keyword. While multi-task approaches like PK-MTL attempt to integrate speaker verification, their text-dependent formulation breaks zero-shot keyword flexibility. Extending personalization to UD-KWS requires text-independent speaker verification (TI-SV), but standard TI-SV models degrade on sub-second utterances and are too heavy for edge devices.

## Method

ZP-KWS combines a phoneme-supervised audio encoder with a GE2E-pretrained EfficientTDNN-Small speaker encoder (approx. 0.9M parameters) using multiplicative late fusion at inference time. The audio encoder features a parallel architecture with a frozen pre-trained embedder and a trainable stream supervised by an auxiliary frame-level phoneme classification loss. A calibrated linear mapping converts speaker cosine similarity into a probability, which is multiplicatively combined with semantic keyword probability to enforce an independent veto power. The total parameter budget is 1.55M, and the model supports conventional, target-biased, and target-only modes without retraining.

## Results

Evaluated on LibriPhrase (Easy and Hard splits), Google Speech Commands, and Qualcomm datasets using EER, FRR@1% FAR, and FRR@10% FAR against PhonMatchNet and PK-MTL baselines. In the stringent target-only (TO-KWS) mode at 1% FAR, ZP-KWS reduced FRR to 29.47% on LibriPhrase Easy (a ~60% relative reduction over PK-MTL) and 33.12% on Qualcomm. GE2E pre-training reduced isolated speaker verification EER on LibriPhrase from 22.19% to 8.41% (62% relative), and ablations confirmed that GE2E pre-training, calibrated linear layers, and phoneme supervision each provide essential performance gains.

## Code

- https://github.com/Padawan101/ZP-KWS

## Applications

Edge-device voice user interfaces and wake-word detection systems requiring secure, personalized, and zero-shot activation.

## Limitations

Frame-level phoneme supervision can over-regularize on tasks with low interclass phonetic overlap, and future work is required to improve confidence calibration under noisy conditions.

## Related

- (link related pages by id as the wiki grows)
