---
id: boo26_interspeech
category: deepfake-detection
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1246
pdf: https://www.isca-archive.org/interspeech_2026/boo26_interspeech.pdf
---

# Referee: Reference-aware Audiovisual Deepfake Detection

*Hyemin Boo, Eunsang Lee, Jiyoung Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/boo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/boo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1246)

**TL;DR** — Referee is a reference-aware audiovisual deepfake detection framework that leverages learnable identity bottleneck queries and cross-modal biometric alignment to catch unseen manipulations, achieving 99.4% AUC on cross-lingual KoDF evaluation.

## Key contributions

- Proposes a reference-aware audiovisual deepfake detection method (Referee) leveraging identity- and temporal-level correspondence.
- Introduces an identity bottleneck module (IDB) with learnable query tokens and a cross-identity matching mechanism.
- Implements an auxiliary identity verification task optimized via identity matching loss to enforce robust cross-modal biometric alignment.
- Demonstrates state-of-the-art generalization across unseen forgery types and cross-lingual testbeds (FakeAVCeleb, FF++, KoDF) without requiring million-scale external pretraining datasets.

## Problem

Prior vision-based and audio-based deepfake detectors easily overfit to low-level synthesis artifacts, spatial boundary anomalies, or spectral patterns, making them brittle against high-fidelity generative models. Existing audiovisual fusion methods typically rely on naïve feature concatenation or local lip-synchronization cues, rendering them highly vulnerable to partial occlusions, low-resolution degradations, and unseen manipulation classes. Furthermore, prior identity-based matching approaches often demand excessively long reference footage (over 5 minutes) or massive external datasets like VoxCeleb2 (1M+ utterances), limiting their practical, real-world deployment.

## Method

Referee processes target and reference video streams by extracting segment-level token embeddings via pretrained audiovisual encoders (Synchformer initialized on LRS3). Input streams are divided into Nseg fixed-length segments of 0.64 seconds (16 frames at 25 fps, audio at 16 kHz converted to 128-channel mel-spectrograms). A learnable modality-separation token constructs joint audiovisual sequences. To isolate speaker identity from transient factors (speech content, expressions, head pose), an identity bottleneck module (IDB) uses Nq learnable queries (Q_ID in R^(Nq x D)) with a weight-sharing scheme across target and reference branches over L identical transformer blocks (self-attention, cross-attention, FFN).

The ID matching module aligns target identity tokens (T_ID^TGT) with reference tokens (T_ID^REF) using M stacked cross-attention blocks where target tokens serve as Queries and reference tokens act as Keys and Values. This yields reference-aware identity tokens (T_bar_ID^TGT). An auxiliary identity verification head computes binary cross-entropy loss (L_ID) on average-pooled identity representations, treating any forged content as a distinct identity from the reference speaker. Finally, the refined identity tokens are concatenated with the [CLS] token and target audiovisual features, processed through an AV-Transformer, and classified via standard cross-entropy deepfake loss (L_RF) combined with L_ID.

## Experimental setup

Trained on FakeAVCeleb (containing visual manipulations like FaceSwap, FSGAN, Wav2Lip, and audio SV2TTS, split 70% train / 30% test) alongside 37k real videos from 500 identities sourced from VoxCeleb2 as reference footage. Evaluated on FaceForensics++ (FF++) and zero-shot cross-lingual KoDF (Korean speech deepfake dataset with 100 real and 100 fake videos). Compared against unimodal and audiovisual baselines including Xception, LipForensics, FTCN, RealForensics, AVAD, POI-Forensics, AVFF, FRADE, ICSAV, and FoVB. Metrics include Accuracy (ACC), Average Precision (AP), and Area Under the ROC Curve (AUC). Optimized using Adam with an initial learning rate of 1e-5, cosine annealing scheduler with linear warmup to 1e-6, and weighted sampling for class imbalance.

## Results

On the cross-lingual KoDF dataset, Referee achieves state-of-the-art performance with 99.4% AUC and 99.4% AP, significantly outperforming prior audiovisual models like ICSAV (99.2% AUC) and FRADE (92.4% AUC). On the FakeAVCeleb intra-dataset benchmark, Referee attains 99.2% ACC and 99.7% AUC, outperforming strong visual models like RealForensics (89.9% ACC, 94.6% AUC). In cross-dataset evaluations on FaceForensics++, Referee reaches 79.78% AUC and 91.00% AP, exceeding prior reference-based methods such as POI-Forensics (51.33% AUC) and Xception (59.48% AUC). Ablation studies confirm that removing reference identity queries drops AUC to 99.33%, while removing the identity matching loss drops AUC to 99.69%. Robustness evaluations show stability under extreme spatial perturbations (99.65% AUC under 90% random crop) and compressed reference length (99.71% AUC with a 1-second reference clip).

| System / Condition | Modality | Reference? | KoDF AUC | KoDF AP |
|---|---|---|---|---|
| RealForensics [36] | V | ✗ | 93.6 | 95.7 |
| AVFF [17] | AV | ✗ | 95.5 | 93.1 |
| FRADE [23] | AV | ✗ | 92.4 | - |
| ICSAV [24] | AV | ✗ | 99.2 | 98.6 |
| POI-Forensics [22] | AV | ✓ | 70.5 | 64.9 |
| **Referee** (Ours) | AV | ✓ | **99.4** | **99.4** |

## Limitations

The framework assumes clean reference videos are reliably available for target identities, which may fail in unconstrained wild scenarios where authentic biometrics are missing. Performance depends on the quality of pretrained audiovisual encoders (Synchformer) and may degrade under extreme acoustic noise or multi-speaker overlapping speech. The approach was evaluated primarily on English and Korean datasets, leaving tone-language or highly low-resource dialectal generalization unverified.

## Why read this

Researchers and engineers tackling robust deepfake detection under cross-lingual and unseen forgery conditions should read this to learn how explicit reference-aware biometric cross-attention outperforms artifact-based or unimodal fusion architectures.

## Code

- https://github.com/ewha-mmai/referee

## Applications

Automated media forensics for verifying authentic human speech and video in news broadcasting, legal evidence authentication, and social media platform moderation.

## Related

- (link related pages by id as the wiki grows)
