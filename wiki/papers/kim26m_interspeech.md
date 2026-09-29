---
id: kim26m_interspeech
category: deepfake-security
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1541
pdf: https://www.isca-archive.org/interspeech_2026/kim26m_interspeech.pdf
---

# Physics-Aware Deepfake Detection via Distance–Speech Consistency

*Kyeongrae Kim, Kim Sung-Bin, Oh Hyun-Bin, Tae-Hyun Oh*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1541)

**Category:** `deepfake-security`

**TL;DR** — This paper proposes a physics-aware audio-visual deepfake detector that catches inconsistencies between visual speaker-to-camera distance and speech energy (SNR and C50), outperforming lip-sync-based models by 19.3% ROC-AUC on dynamic video subsets.

## Key contributions

- Introduces a distance-speech consistency measure leveraging the acoustic inverse-square law for deepfake forensics in unconstrained videos.
- Proposes an audio-visual detection pipeline extracting monocular depth via MiDaS, speech via SAM-Audio, and statistical modeling over distance bins.
- Demonstrates that physical-consistency cues strongly complement existing lip-sync detectors, yielding consistent ensemble gains across diverse benchmarks.

## Problem

State-of-the-art audio-visual deepfake detectors, such as SpeechForensics and AuViRe, rely heavily on lip-speech synchronization and clean frontal views. These methods break down in dynamic in-the-wild videos where speakers move through space and facial cues are obscured by motion blur, pose changes, or occlusions. Because generative video/audio models synthesize realistic facial expressions while completely ignoring acoustic propagation physics, there is an urgent need for spatial-acoustic consistency checks.

## Method

The framework processes video and audio streams independently before combining them via statistical binning. For the visual stream, RetinaFace localizes the speaker's facial region, and MiDaS estimates a dense depth map, from which the inverse average depth provides the relative speaker distance (dspk). For the audio stream, SAM-Audio isolates target speech using a text prompt, allowing the extraction of Signal-to-Noise Ratio (SNR) and Clarity at 50ms (C50) over 300 ms temporal windows.

To bridge the modalities, the system uses distance-wise binning, grouping acoustic measures by dspk bins to neutralize phonetic fluctuations. Within each bin, variance and entropy are calculated: deepfakes exhibit higher acoustic variance and lower entropy due to unnatural synthesis and decoupled audio-visual rendering. These features are aggregated into a 5-dimensional vector comprising variance and entropy for both SNR and C50 plus a cross-feature variance ratio.

A lightweight multi-layer perceptron (MLP) with a single hidden layer maps this 5D feature vector to a scalar deepfake score between 0 and 1, trained using binary cross-entropy on the DF24 training split.

## Experimental setup

Evaluated on Deepfake-Eval-2024 (DF24, containing 300 training and 180 test videos), the AuViRe Real-World (RW) cross-dataset benchmark (330 test videos), and a curated dynamic subset (DF-Dynamic, 40 videos with heavy motion). Compared against baseline detectors SpeechForensics and AuViRe (both built on AV-HuBERT backbones). Metrics are reported in ROC-AUC. Models are trained on the DF24 train split and evaluated in-domain and cross-dataset.

## Results

On the DF-Dynamic subset, the proposed method achieves an ROC-AUC of 0.7449 compared to 0.5096 for SpeechForensics and 0.5517 for AuViRe. On the full in-domain DF24 test set, our standalone model scores 0.7329 (beating SpeechForensics' 0.6957 and AuViRe's 0.6890), while scoring 0.6510 on the static-heavy RW cross-dataset benchmark. A score-averaging ensemble of our model and SpeechForensics boosts in-domain DF24 performance to 0.7786 and cross-dataset RW performance to 0.7971. Ablations confirm that removing SAM-Audio sound separation collapses DF24 performance from 0.7329 down to 0.5945, and removing C50 stats causes a massive 0.1169 drop in ROC-AUC.

| System / Condition | DF-Dynamic ROC-AUC | DF24 (In-Domain) ROC-AUC | RW (Cross-Dataset) ROC-AUC |
|---|---|---|---|
| SpeechForensics | 0.5096 | 0.6957 | 0.7819 |
| AuViRe | 0.5517 | 0.6890 | 0.6430 |
| Ours (Physics-Aware) | 0.7449 | 0.7329 | 0.6510 |
| Ours + SpeechForensics (Ensemble) | - | 0.7786 | 0.7971 |
| Ours + AuViRe (Ensemble) | - | 0.7797 | 0.6634 |

## Limitations

The framework relies on physical acoustic propagation, meaning close-up microphone placements can weaken the distance-speech relationship. Rapidly fluctuating background noise, monocular depth estimation errors, and inaccurate face landmark localization can severely degrade feature extraction quality.

## Why read this

Read this paper if you work on audio-visual deepfake detection and need a robust defense mechanism for moving subjects where lip-sync fails. It introduces a clever blueprint for marrying monocular computer vision depth estimates with classical room acoustics metrics.

## Code

- https://byulharang.github.io/PADD/

## Applications

On-device or server-side video forensics, social media trust and safety filtering, and verification of unconstrained user-generated video content.

## Institutions / 機構

KAIST, POSTECH

**Funding / 經費:** IITP, Ministry of Science and ICT, KAIST Undergraduate Research Program

## Related

- (link related pages by id as the wiki grows)
