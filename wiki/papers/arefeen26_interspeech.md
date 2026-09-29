---
id: arefeen26_interspeech
category: deepfake-security
labels: [self-supervised]
institutions: ["Singapore Institute of Technology", "Duke Kunshan University", "NVIDIA"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3094
pdf: https://www.isca-archive.org/interspeech_2026/arefeen26_interspeech.pdf
---

# DAST: A Dual-Stream Voice Anonymization Attacker with Staged Training

*Ridwan Arefeen, Xiaoxiao Miao, Rong Tong, Timothy Liu, Aik Beng Ng, Simon See*

[PDF](https://www.isca-archive.org/interspeech_2026/arefeen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arefeen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3094)

**Category:** `deepfake-security` · **Labels:** `self-supervised`

**TL;DR** — DAST is a dual-stream voice anonymization attacker fusing spectral and frozen SSL features with a three-stage training curriculum, achieving state-of-the-art attack equal error rates across the VoicePrivacy Attacker Challenge (VPAC) benchmarks while requiring as little as 10% target data.

## Key contributions

- A dual-stream architecture with independent ECAPA-TDNN frame encoders and mid-level Hadamard product fusion that integrates 80-dimensional Fbank and WavLM-Large hidden states.
- A three-stage training curriculum separating speaker foundation pre-training (Stage I), diversity-driven domain training on 9k hours of voice-converted data (Stage II), and task-specific adaptation (Stage III).
- Demonstration that Stage II acts as the primary driver of cross-system generalization, yielding strong zero-shot performance against unseen anonymization systems.
- Sample-efficient Stage III fine-tuning using only 10% of target anonymization data, consistently outperforming existing fully-trained baseline attackers.

## Problem

Voice anonymization masks vocal traits but frequently leaks residual speaker patterns, which must be accurately assessed via robust attacker models. Prior automatic speaker verification (ASV) attackers either overfit to single target anonymization systems or fail to generalize across diverse distortion pipelines because a single feature view or naive training strategy cannot simultaneously disentangle conversion artifacts and speaker identity. The VoicePrivacy Attacker Challenge (VPAC) benchmarks these vulnerabilities, but existing approaches lack cross-system robustness and sample-efficient adaptation.

## Method

The system processes inputs through two parallel streams: an 80-dimensional Mel-filterbank (Fbank) spectral stream and a self-supervised learning stream passing raw waveforms through a frozen WavLM-Large model. The SSL stream computes a learnable weighted sum across all 24 transformer layers. Each stream is encoded independently via a dedicated ECAPA-TDNN frame encoder containing 1,024 channels in the convolutional layers. Rather than early fusion, the system uses mid-level fusion via the Hadamard product (element-wise multiplication) to allow the SSL features to recalibrate the spectral stream and suppress conversion artifacts. Utterance-level embeddings are computed using Attentive Statistics Pooling (ASP), projected through a fully connected layer, and optimized with AAM-Softmax.

The three-stage training strategy governs the learning process: Stage I pre-trains downstream components on 1 million utterances from VoxCeleb2 (5,944 speakers) using unprocessed speech with a batch size of 64 and gradient accumulation over 4 steps for 1 epoch. Stage II trains on 2.6 million voice-converted utterances (~9,000 hours) from the Source Speaker Tracing Challenge (SSTC) dataset spanning 8 distinct voice conversion systems using the Muon optimizer for 2 epochs with a batch size of 64 and dropout of 0.3. Stage III fine-tunes the model on target anonymized datasets from VPAC (921 speakers, 104,014 utterances) using AdamW with a cyclical learning rate starting at 10^-3, running for 2 epochs with 100% data, 4 epochs for 50% data, and 6 epochs for low-resource settings (5-20%) with a batch size of 32.

## Experimental setup

Experiments use VoxCeleb2 for Stage I, SSTC (LibriSpeech source, VoxCeleb target across 8 voice conversion systems) for Stage II, and VPACLibriSpeech train-clean-360 data anonymized by 7 distinct systems (B3, B4, B5, T8-5, T10-2, T12-5, T25-1) for Stage III. Baselines include the VPAC baseline, VPAC-Top1, and VoxAttack. Evaluation metrics report Equal Error Rate (EER, %) averaged across female and male test sets. Implementation uses SpeechBrain and a single NVIDIA H200 GPU.

## Results

DAST (100%) achieves the lowest EER across all seven anonymization systems in VPAC, securing substantial margins on challenging targets such as T10-2 (7.04% EER vs. 22.46% for VPAC-Top1) and T12-5 (18.89% EER vs. 25.63%). When constrained to only 10% of target Stage III fine-tuning data, DAST (10% data) still outperforms all existing fully trained baseline systems across all benchmarks, proving the cross-system generalization strength of Stage II.

Ablations on the training stages show that training solely on Stage I yields poor generalization (>40% EER), whereas adding Stage II dramatically cuts EER by at least 12% absolute across all targets without any target-specific fine-tuning.

| System | B3 | B4 | B5 | T8-5 | T10-2 | T12-5 | T25-1 |
|---|---|---|---|---|---|---|---|
| VPAC-base | 27.32 | 30.26 | 34.34 | 41.28 | 40.36 | 42.75 | 42.13 |
| VPAC-Top1 | 20.51 | 19.56 | 25.51 | 26.39 | 22.46 | 25.63 | 27.77 |
| VoxAttack | 19.90 | 18.40 | 24.30 | 28.70 | 25.10 | 30.30 | 24.50 |
| DAST (10%) | 17.89 | 13.93 | 21.78 | 26.56 | 6.68 | 20.68 | 23.88 |
| DAST (100%) | 15.67 | 13.81 | 19.22 | 25.92 | 7.04 | 18.89 | 20.81 |

## Limitations

The evaluation is restricted to English-language speech corpora (LibriSpeech and VoxCeleb) and seven specific acoustic anonymization systems evaluated in the VPAC protocol. The approach requires access to source speaker training distributions and diverse voice conversion pipelines during Stage II, involving heavy computational overhead for large-scale pre-training before lightweight target adaptation can occur.

## Why read this

Researchers and security engineers working on speech privacy and voice anonymization should read this paper to understand how dual-stream feature fusion and multi-domain diversity training create sample-efficient, highly generalizable speaker re-identification attacks.

## Code

- https://github.com/monkeyDarefeen/DAST

## Applications

Auditing and stress-testing voice anonymization systems, improving speaker verification robustness against synthetic speech distortions, and evaluating biometric privacy leakage.

## Institutions / 機構

Singapore Institute of Technology, Duke Kunshan University, NVIDIA

**Funding / 經費:** Singapore Ministry of Education Academic Research Fund Tier 1

## Related

- (link related pages by id as the wiki grows)
