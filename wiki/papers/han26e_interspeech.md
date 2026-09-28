---
id: han26e_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2294
pdf: https://www.isca-archive.org/interspeech_2026/han26e_interspeech.pdf
---

# Soft-Gating Score-Level Fusion for Spoofing-Aware Speaker Verification

[PDF](https://www.isca-archive.org/interspeech_2026/han26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2294)

**TL;DR** — This paper proposes a training-free, soft gating score-level fusion method for spoofing-aware speaker verification that dynamically adjusts subsystem weights based on decision confidence, achieving up to a 90% relative improvement in a-DCF over baselines.

## Problem

Combining automatic speaker verification (ASV) and countermeasure (CM) subsystems is crucial for spoofing-aware speaker verification (SASV), but existing score-level fusion strategies rely on static weighting schemes. These fixed rules apply uniform weights across all trials, failing to reflect the complementary roles of ASV (for speaker discrimination) and CM (for spoof detection) under varying trial types and score distribution shifts. While recent gated integration approaches attempt dynamic weighting, they demand complex alternating training procedures and additional learnable parameters.

## Method

The paper introduces a soft gating score-level fusion framework that requires zero additional training or learnable parameters. It computes a confidence score for each subsystem by measuring the margin between normalized subsystem scores and their respective development-set Equal Error Rate (EER) thresholds. Three trial-wise gating variations are explored: CM Gating (where the CM margin scales the CM score and modulates the ASV influence), ASV Gating (where the ASV margin controls fusion), and Double Gating (where both subsystems are independently scaled by their respective margins). The study tests four combinations using two ASV backbones (ECAPA-TDNN and ReDimNet, trained on VoxCeleb2) and two CM backbones (AASIST and Conformer-TCM).

## Results

Evaluated on ASVspoof 2019 LA (LA19) and ASVspoof5 (Track 2 closed condition) datasets using SV-EER, SPF-EER, SASV-EER, and a-DCF metrics, the proposed dynamic gating framework consistently outperforms simple score summation (Baseline 1) and trainable DNN back-end embedding fusion (Baseline 2). On LA19, the method reduces a-DCF by approximately 90% on average compared to baselines, with Double Gating achieving the strongest performance in three out of four model configurations. Ablation analyses indicate that performance drops can occur when subsystem EER thresholds lie extremely close to 0 or 1, causing one modality to overwhelmingly dominate the fused score.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building secure speech authentication systems, mobile voice banking applications, and defense pipelines against deepfake audio and voice conversion attacks.

## Limitations

Performance degrades when subsystem EER thresholds are extremely close to 0 or 1, which causes score imbalances that excessively amplify one modality while suppressing the other.

## Related

- (link related pages by id as the wiki grows)
