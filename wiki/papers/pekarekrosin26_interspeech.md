---
id: pekarekrosin26_interspeech
category: asr
labels: [dataset-or-benchmark-release, robustness-noise]
institutions: ["University of Hamburg"]
code: https://huggingface.co/datasets/TPekarekRosin/modicol
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2111
pdf: https://www.isca-archive.org/interspeech_2026/pekarekrosin26_interspeech.pdf
---

# MoDiCoL: A Modular Diagnostic Continual Learning Dataset for Robust Speech Recognition

*Theresa Pekarek Rosin, Matthias Kerzel, Stefan Wermter*

[PDF](https://www.isca-archive.org/interspeech_2026/pekarekrosin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pekarekrosin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2111)

**Category:** `asr` · **Labels:** `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — MoDiCoL is a modular diagnostic continual learning dataset and curriculum designed to systematically study ASR robustness under compounding distributional shifts. Experience Replay with a 10% buffer achieves a headline average WER of 17.31%, outperforming joint training baselines.

## Key contributions

- Introduces MoDiCoL, an 18.79-hour dataset of 8,100 samples combining real and XTTS-v2 synthetic speech structured via an L27 orthogonal array Taguchi design.
- Proposes a real-world-inspired continual learning curriculum isolating acoustic environment, speaker characteristics, linguistic content, and compound drifts.
- Evaluates three continual learning strategies (Experience Replay, Representation-level Regularization, and Orthogonal Gradient Descent) against sequential fine-tuning and joint training baselines.
- Demonstrates via gradient subspace analysis that catastrophic forgetting in ASR under distribution shifts stems primarily from gradient interference rather than high-level representational drift.

## Problem

Modern automatic speech recognition systems degrade severely under real-world distribution shifts caused by recording conditions, speaker accents, speech impairments, and noise. Existing benchmarks evaluate these factors in isolation, failing to reflect how real-world variations accumulate sequentially. Furthermore, while continual learning is used for domain adaptation, its potential as a diagnostic tool for uncovering how pretrained ASR models acquire, transfer, and forget robustness remains largely unexplored.

## Method

The dataset is constructed using an L27 orthogonal array with foldover dimensions to yield 108 run configurations, each populated with 75 samples (14.08 hours synthetic generated via XTTS-v2 and 4.71 hours real speech). The augmentation pipeline handles denoising (using a DNN-HMM hybrid system), disfluency insertion, prosodic/spectral impairment simulation (jitter, shimmer, tremor), pause manipulation, reverberation distance simulation, and noise injection (babble and fan noise from MS-SNSD at clean, 10dB, and 20dB SNRs).

Model experiments use whisper-small.en as the backbone, operating in an online, streaming continual learning setting with a batch size of one and a learning rate of 1e-5. The continual learning curriculum streams tasks sequentially: t0 (control/LibriSpeech), t1 (acoustic drift: noise, SNR, distance), t2 (speaker drift: children, elderly, accents, impairments), t3 (linguistic drift: medical, ATC domains, conversational/spontaneous styles), and t4 (compound drift). Three strategies are evaluated: Experience Replay (ER) with 5% and 10% memory buffers, Representation-level Regularization (RLR) penalizing cosine distance of mean-pooled encoder outputs, and Orthogonal Gradient Descent (OGD) projecting updates orthogonally to past task gradients.

## Experimental setup

Evaluated on the 18.79-hour MoDiCoL dataset (8,100 samples, 16 kHz WAV). Compares sequential fine-tuning (FT) and joint training (JOINT) baselines against Experience Replay (ER-5%, ER-10%), Representation-level Regularization (RLR), and Orthogonal Gradient Descent (OGD) using whisper-small.en. Metrics include Average Word Error Rate (A-WER), Average Incremental WER (AI-WER), Forgetting Measure (FM), Backward Transfer (BWT), Forward Transfer (FWT), and Intransigence Measure (IM), alongside BERTScore F1 for semantic evaluation.

## Results

ER-10% achieves the best A-WER of 17.31 ± 0.48, outperforming both joint training (27.24) and sequential fine-tuning (34.14). OGD achieves the strongest AI-WER of 21.19 ± 1.18, proving superior to RLR (34.28 A-WER), which suffers from severe forgetting (-22.34 FM) due to the information loss of mean-pooling encoder representations. Orthogonal gradient cosine similarities ranging between 10^-3 and 10^-6 confirm that task gradients reside in distinct geometric subspaces.

| System | A-WER (↓) | AI-WER (↓) | FM (target=0) | BWT (↓) |
|---|---|---|---|---|
| ER-5% | 25.75 | 23.40 | -12.89 | 12.89 |
| ER-10% | 17.31 | 22.83 | -1.95 | 1.78 |
| RLR | 34.28 | 24.30 | -22.34 | 22.33 |
| OGD | 26.87 | 21.19 | -12.75 | 12.16 |
| JOINT | 27.24 | - | - | - |
| FT | 34.14 | 23.73 | -24.55 | 24.55 |

## Limitations

The dataset scale is relatively small (18.79 hours total, predominantly synthetic at 14.08 hours), limiting the diversity of real-world interactions. The evaluation relies strictly on whisper-small.en, leaving open whether findings generalize to larger scale encoder-decoder or entirely end-to-end models. Task order sensitivity remains a pronounced vulnerability across all methods except for high-capacity rehearsal buffers.

## Why read this

Speech researchers and ML engineers building adaptive or streaming ASR systems should read this to understand how gradient interference drives forgetting during incremental updates, and why simple rehearsal buffers outperform complex regularization for robustness retention.

## Code

- https://huggingface.co/datasets/TPekarekRosin/modicol

## Applications

Adapting on-device speech recognition systems to evolving user accents, noisy environments, and specialized medical or aviation domains without catastrophic forgetting.

## Institutions / 機構

University of Hamburg

**Funding / 經費:** Horizon Europe

## Related

- (link related pages by id as the wiki grows)
