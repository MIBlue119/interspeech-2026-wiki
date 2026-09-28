---
id: kim26m_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1541
pdf: https://www.isca-archive.org/interspeech_2026/kim26m_interspeech.pdf
---

# Physics-Aware Deepfake Detection via Distance–Speech Consistency

[PDF](https://www.isca-archive.org/interspeech_2026/kim26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1541)

**TL;DR** — This paper proposes a physics-aware audio-visual deepfake detector that catches inconsistencies between speaker distance and speech energy, achieving 0.7449 ROC-AUC on a dynamic in-the-wild video subset.

## Problem

Current audio-visual deepfake detectors primarily rely on lip-speech synchronization, which breaks down in dynamic, in-the-wild recordings where speakers move and facial/lip cues are occluded, blurred, or missing. Because modern deepfake generation tools frequently ignore physical acoustic propagation rules—such as the inverse-square law linking speaker-to-camera distance to sound intensity—detectors fail to capture these spatial-acoustic violations. This limitation leaves a major security gap for handheld recordings, vlogs, and street interviews.

## Method

The framework estimates relative speaker distance from video frames using RetinaFace for facial landmark extraction and MiDaS to compute dense depth maps averaged over the face. For audio, it isolates target speech from background noise via SAM-Audio using a speech prompt, then extracts SNR and C50 (clarity at 50 ms) acoustic measures over 300 ms temporal windows. These measures are grouped via distance-wise binning based on estimated speaker distance, after which bin-level variance, entropy, and variance ratios are aggregated into a 5-dimensional feature vector. Finally, a lightweight multi-layer perceptron (MLP) with a single hidden layer maps these statistical features to a binary deepfake score.

## Results

Evaluated on the Deepfake-Eval-2024 (DF24) and AuViRe Real-World (RW) datasets, the standalone physics-aware detector achieves a 0.7329 ROC-AUC on the in-domain DF24 test set and outperforms existing lip-sync baselines (SpeechForensics, AuViRe) on the curated DF-Dynamic motion subset with 0.7449 ROC-AUC. Ensembling this method with lip-sync-based detectors yields consistent performance gains across both test benchmarks. Ablation studies confirm that removing sound separation drops DF24 ROC-AUC from 0.7329 down to 0.5945, and eliminating C50 features causes the steepest performance degradation among feature types.

## Code

- https://byulharang.github.io/PADD/

## Applications

Engineers and security analysts building video forensics systems or multimedia verification pipelines for unconstrained, in-the-wild media platforms.

## Limitations

Proximity microphones can weaken the distance-speech relationship, rapidly fluctuating background noise destabilizes acoustic measurements, and errors in monocular depth or face estimation degrade detection accuracy.

## Related

- (link related pages by id as the wiki grows)
