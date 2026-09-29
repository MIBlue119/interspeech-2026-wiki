---
id: girish26_interspeech
category: deepfake-security
labels: [dataset-or-benchmark-release]
institutions: ["UPES", "National Tsing Hua University", "VBSPU", "Indraprastha Institute of Information Technology Delhi"]
code: https://helixometry.github.io/SHAC/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2116
pdf: https://www.isca-archive.org/interspeech_2026/girish26_interspeech.pdf
---

# Towards Detecting Neural Audio Codec Synthesized Heart Sounds

*Girish, Orchid Chetia Phukan, Mohd Mujtaba Akhtar, Bhavinkumar Vinodbhai Kuwar, Swarup Ranjan Behera, Arun Balaji Buduru*

[PDF](https://www.isca-archive.org/interspeech_2026/girish26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/girish26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2116)

**Category:** `deepfake-security` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The paper introduces Synthetic Heart Sound Detection (SHAC) to counter neural audio codec (NAC) spoofing attacks on heart sound biometrics, releasing the CARDIOFAKE dataset and the GROOT fusion framework which achieves state-of-the-art performance.

## Key contributions

- Formulates Synthetic Heart Sound Detection (SHAC) as a novel task for securing phonocardiogram (PCG) biometric authentication against neural audio codec spoofing.
- Releases CARDIOFAKE, the first benchmark dataset comprising 3,163 real and 22,141 codec-synthesized PCG recordings generated across 7 different neural audio codecs.
- Introduces GROOT, a representation fusion framework utilizing Grammian Optimal Transport (Gram-OT) to align complementary spectral (MFCC) and self-supervised (WavLM) features.
- Establishes comprehensive baselines and outperforms general audio deepfake models like AASIST and MiO, achieving 93.20% accuracy on seen codecs and 86.10% on unseen codecs.

## Problem

Phonocardiograms (PCGs), or heart sounds, are traditionally viewed as secure, non-invasive biometrics due to their physiological liveness and inherent resistance to conventional voice or facial spoofing. However, rapid advancements in neural audio codecs (NACs) allow adversaries to synthesize highly realistic heart sounds that preserve patient identity while carrying subtle codec artifacts. Because biometric authentication systems are vulnerable to these synthetic recordings, there is an urgent need to detect NAC-generated heart sound deepfakes, a gap that prior spoofing detection tasks in speech and face recognition fail to address.

## Method

The paper evaluates spectral features (40-dimensional MFCCs and 14-dimensional LFCCs) and 768-dimensional self-supervised learning (SSL) representations extracted from frozen models (Wav2vec2, UniSpeech-SAT, and WavLM) resampled at 16 kHz. Downstream models include fully connected networks (FCNs) and 1D-CNNs with pooling layers. The proposed GROOT framework takes two feature streams, projects them to 120 dimensions via 1D-CNN blocks, and computes their respective Gram matrices to capture global relational patterns and correlations across feature space. 

Instead of vanilla optimal transport (which operates directly on raw noisy features), GROOT computes a cost matrix using the Frobenius distance between the two Gram matrices. It then applies the Sinkhorn algorithm to obtain an optimal transport plan, aligns and transports the feature spaces into one another, and concatenates the transported features with their original representations. The fused vectors pass through parallel FCN layers (80 neurons) before concatenation and classification through dense layers (120 and 30 neurons) with binary cross-entropy loss, Adam optimizer, learning rate of 1e-3, batch size of 32, and 50 epochs.

## Experimental setup

Evaluated on the CirCor DigiScope dataset from PhysioNet, containing 3,163 PCG recordings from 963 patients spanning 5 to 65 seconds. CARDIOFAKE splits synthesis across 7 neural audio codecs: SNAC, DAC, EnCodec, Soundstream, Speech Tokenizer (seen train/test condition), and FunCodec, AudioDec (unseen generalization condition). Compared against individual features, naive feature concatenation, optimal transport (OT), AASIST, and MiO. Metrics include Accuracy (ACC) and Equal Error Rate (EER).

## Results

GROOT combining MFCC and WavLM achieves the headline SOTA performance, reaching 93.20% accuracy and 5.86% EER under seen codec conditions, and 86.10% accuracy and 9.75% EER under unseen codec conditions. In comparison, competitive baseline AASIST scores 85.15% ACC / 14.91% EER (seen) and 73.13% ACC / 16.43% EER (unseen), while MiO reaches 86.98% ACC / 12.34% EER (seen) and 75.89% ACC / 14.40% EER (unseen). Ablations prove that heterogeneous fusion (spectral + SSL) universally beats homogeneous fusion, and Gram-OT consistently outperforms both raw concatenation and vanilla Euclidean-distance optimal transport.

| System / Condition | Seen ACC (%) | Seen EER (%) | Unseen ACC (%) | Unseen EER (%) |
|---|---|---|---|---|
| AASIST | 85.15 | 14.91 | 73.13 | 16.43 |
| MiO | 86.98 | 12.34 | 75.89 | 14.09 |
| WavLM (Individual CNN) | 87.72 | 9.45 | 84.02 | 13.39 |
| MF + WAL (Concat) | 87.70 | 7.40 | 84.33 | 13.11 |
| MF + WAL (OT) | 89.07 | 6.86 | 84.99 | 12.06 |
| GROOT (MF + WAL) | 93.20 | 5.86 | 86.10 | 9.75 |

## Limitations

The study relies exclusively on the CirCor DigiScope database for real PCG recordings, limiting evaluation to its specific patient demographics and clinical recording conditions. The benchmark is restricted to 7 specific neural audio codecs, and generalization to future or proprietary codec architectures remains untested. Additionally, performance degrades under unseen codecs (EER jumping from 5.86% to 9.75%), indicating that cross-codec robustness requires further research.

## Why read this

Read this paper if you work on audio deepfake detection, spoofing countermeasures, or biometric security and want to explore how neural audio codecs threaten physiological modalities beyond speech. It provides a blueprint for leveraging Grammian Optimal Transport to fuse heterogeneous spectral and self-supervised features.

## Code

- https://helixometry.github.io/SHAC/

## Applications

Secure phonocardiogram-based biometric authentication systems, healthcare patient identity verification, and medical IoT anti-spoofing defense software.

## Institutions / 機構

UPES, National Tsing Hua University, VBSPU, Indraprastha Institute of Information Technology Delhi

## Related

- (link related pages by id as the wiki grows)
