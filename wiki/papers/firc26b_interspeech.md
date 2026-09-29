---
id: firc26b_interspeech
category: deepfake-security
labels: [efficient-on-device, self-supervised, robustness-noise]
institutions: ["Brno University of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2430
pdf: https://www.isca-archive.org/interspeech_2026/firc26b_interspeech.pdf
---

# SpAArSIST: Sparsified AASIST for Efficient and Reliable Anti-Spoofing

*Anton Firc, Vojtěch Staněk, Zbyněk Lička, Kamil Malinka, Martin Perešíni*

[PDF](https://www.isca-archive.org/interspeech_2026/firc26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/firc26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2430)

**Category:** `deepfake-security` · **Labels:** `efficient-on-device`, `self-supervised`, `robustness-noise`

**TL;DR** — SpAArSIST streamlines the AASIST graph pooling backend for SSL-based audio anti-spoofing by replacing learned scoring and stack-node attention with explicit magnitude proxies and mean pooling. The optimized pipeline cuts backend compute by 20.7% and model size by 4.1% while improving out-of-domain In-the-Wild EER from 4.64% to 2.82%.

## Key contributions

- Proposed SpAArSIST, a deployment-oriented redesign of the AASIST graph pooling backend eliminating redundant parameters and operations.
- Introduced explicit, separate train-time and inference-time pooling ratios (ktr, kin) to quantify and exploit the trade-off between compute and accuracy.
- Replaced attention-heavy components with a parameter-free magnitude-based node scoring proxy and mean aggregation.
- Established a two-track composite score combining accuracy, calibration (Cllr, actDCF, ECE), and compute metrics for reliable model selection.

## Problem

Public implementations of the popular AASIST graph-pooling backend contain redundant and weakly conditioned operations that inflate computational cost without providing representational benefits. Specifically, learned scoring projections and attention-heavy stack node aggregations operate inefficiently, limiting deployability. Furthermore, standard models often suffer from poor calibration and severe performance degradation under out-of-domain shifts such as the In-the-Wild dataset, making robust deployment challenging.

## Method

The architecture builds upon a fixed self-supervised learning frontend (Wav2Vec2.0 XLS-R 300M) that generates frame-level features, mapping utterance frames into parallel spectral and temporal graph views. SpAArSIST simplifies the subsequent graph processing by altering three core components. First, it introduces top-k node pooling controlled by separate train-time (ktr) and inference-time (kinf) retention ratios (studied at 0.5, 0.3, and 0.1), allowing aggressive sparsification of later graph operations during deployment.

Second, it replaces the parameterized linear projection and sigmoid scoring mechanism in GraphPool with a parameter-free magnitude score, evaluating each node by the squared l2-norm of its representation (si = ||ni||^2). This eliminates weight parameters and saturating nonlinearities while retaining salient, high-energy regions. Third, it simplifies stack-node aggregation by substituting the attention-weighted softmax sum—which empirically operates near a flat distribution due to high learned temperatures like tau=100—with an unweighted mean aggregation over retained nodes.

Training follows a dual-stage schedule using ASVspoof 5 Track 1: 10 epochs with a frozen XLS-R encoder using batch size 64, followed by 5 epochs of end-to-end fine-tuning with batch size 32 using the Adam optimizer at a learning rate of 1e-4. The optimization minimizes cross-entropy loss and incorporates a robust suite of data augmentations including starting silence trimming, time masking (p=0.3), Mu-law companding (p=0.3), RawBoost (LnL-ISD, p=0.3), and noise filtering (p=0.3).

## Experimental setup

Experiments are trained on the ASVspoof 5 Track 1 (ASV5) dataset and evaluated both in-domain on ASV5 and out-of-domain on the In-the-Wild (ITW) dataset. Systems are compared against baselines including standard AASIST, Mean pooling, and MHFA using Equal Error Rate (EER), minimum Detection Cost Function (minDCF), actual DCF (actDCF), log-likelihood ratio cost (Cllr), Expected Calibration Error (ECE), backend MACs (BE M-MACs), and backend forward latency measured on an NVIDIA RTX A5000 24GB GPU.

## Results

The best overall configuration (AST-03-01-Mag, using ktr=0.3, kinf=0.1, and magnitude scoring) cuts backend MACs by 20.7% (from 195.045M to 154.706M) and backend parameters by 4.1% (from 611.8k to 586.4k). On the out-of-domain In-the-Wild benchmark, it improves EER from 4.64% to 2.82%, minDCF from 0.133 to 0.078, actDCF from 0.291 to 0.081, and Cllr from 1.407 to 0.374, while staying competitive in-domain on ASVspoof 5 (EER 5.05% vs 4.49%, minDCF 0.146 vs 0.129).

Ablations show that lower train-time retention (ktr = 0.3) consistently benefits out-of-domain ITW generalization, and magnitude-based scoring excels specifically in this sparse regime. Conversely, combining magnitude scoring with extremely low retention (ktr = 0.1) or low softmax temperatures severely harms stability and performance, driving ITW EER up to 25.40%.

| System | BE Params (k) | BE M-MACs | ASV5 EER (%) | ITW EER (%) | ITW actDCF |
|---|---|---|---|---|---|
| AASIST (base) | 611.8 | 195.05 | 4.49 | 4.64 | 0.291 |
| Mean pooling | 0.0 | 0.31 | 4.72 | 4.29 | 0.496 |
| MHFA | 4461.9 | 99.49 | 6.05 | 4.98 | 0.350 |
| AST-03-01-Mag | 586.4 | 154.71 | 5.05 | 2.82 | 0.081 |

## Limitations

The study focuses exclusively on refining the AASIST backend atop a fixed Wav2Vec2.0 XLS-R (300M) frontend, leaving front-end architectural scalability unexplored. The approach is evaluated solely on ASVspoof 5 and In-the-Wild datasets, leaving multi-lingual, whispered, or highly compressed voice-spoofing domains unverified. Furthermore, aggressive sparsification settings (ktr = 0.1) lead to severe performance collapses, indicating that the pruning ratio is sensitive and requires careful tuning per domain.

## Why read this

Speech and ML engineers building deployable anti-spoofing systems should read this paper to learn how to systematically strip redundant parameters from graph-based backends without sacrificing accuracy. Researchers will take away a rigorous composite evaluation framework that balances compute, calibration, and discrimination under domain shift.

## Code

- https://github.com/Security-FIT/SpAArSIST

## Applications

Real-time speech deepfake detection, audio forensics, voice biometrics security, and on-device speaker verification pipelines.

## Institutions / 機構

Brno University of Technology

**Funding / 經費:** Brno University of Technology, Ministry of Education, Youth and Sports of the Czech Republic, e-INFRA CZ

## Related

- (link related pages by id as the wiki grows)
