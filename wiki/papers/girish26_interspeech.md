---
id: girish26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2116
pdf: https://www.isca-archive.org/interspeech_2026/girish26_interspeech.pdf
---

# Towards Detecting Neural Audio Codec Synthesized Heart Sounds

[PDF](https://www.isca-archive.org/interspeech_2026/girish26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/girish26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2116)

**TL;DR** — This paper introduces Synthetic Heart Sound Detection (SHAC) to counter neural audio codec-based spoofing of phonocardiograms, releasing a benchmark dataset and a fusion framework (GROOT) that achieves 93.20% accuracy and 5.86% EER under seen conditions.

## Problem

Phonocardiograms (PCGs) have long been regarded as a secure biometric modality tied to physiological liveness and protected from traditional spoofing. However, modern neural audio codecs (NACs) can synthesize realistic heart sounds that are perceptually indistinguishable from authentic recordings, threatening biometric security. Because prior spoofing attack detection focuses primarily on speech or face modalities, there is an urgent need to formalize synthetic heart sound detection and build robust countermeasures.

## Method

The authors introduce CARDIOFAKE, containing 3,163 real heart sound records from CirCor DigiScope and 22,141 synthetic counterparts generated across seven neural audio codecs (DAC, EnCodec, Soundstream, Speech Tokenizer, FunCodec, AudioDec, SNAC). They benchmark spectral features (14-dim LFCC, 40-dim MFCC) against 768-dim SSL representations (Wav2vec2, Unispeech-SAT, WavLM) using FCN and 1D-CNN downstream classifiers. To combine complementary strengths, they propose GROOT (Fusion via Grammian Optimal Transport), which aligns feature spaces by computing Frobenius distances between Gram matrices of representations via the Sinkhorn algorithm, followed by concatenated dense projection layers.

## Results

Evaluated on both seen (same codecs) and unseen (FunCodec, AudioDec) test sets using Accuracy (ACC) and Equal Error Rate (EER). Individual SSL models (WavLM with CNN) outperform spectral features, hitting 84.54% ACC / 12.51% EER (seen) and 80.54% ACC / 15.01% EER (unseen). Heterogeneous fusion consistently outperforms homogeneous fusion; GROOT combining MFCC and WavLM achieves state-of-the-art results with 93.20% ACC / 5.86% EER on the seen setting and 86.10% ACC / 9.75% EER on the unseen setting. GROOT outperforms strong audio deepfake baselines AASIST (85.15% seen / 73.13% unseen ACC) and MiO (86.98% seen / 75.89% unseen ACC).

## Code

- https://helixometry.github.io/SHAC/

## Applications

Speech and ML engineers building secure biometric authentication systems or liveness detectors for medical and cardiac-based identification devices.

## Related

- (link related pages by id as the wiki grows)
