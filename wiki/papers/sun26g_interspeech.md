---
id: sun26g_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1847
pdf: https://www.isca-archive.org/interspeech_2026/sun26g_interspeech.pdf
---

# ADD-DINO: A Two-Stage Self-Distillation Framework for Audio Deepfake Detection

*Zhaorui Sun, Yihao Chen, Qiao Chen, Minqiang Xu, Sian Fang, Lin Liu, Jianbo Zhan, Yan Song, Guoping Hu, Lirong Dai*

[PDF](https://www.isca-archive.org/interspeech_2026/sun26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1847)

**TL;DR** — ADD-DINO is a two-stage self-distillation framework for audio deepfake detection that leverages non-contrastive pretraining on 1 million unlabeled audio samples, achieving near fully-supervised performance using only 20% of labeled data and robust cross-domain generalization.

## Key contributions

- Proposes a non-contrastive self-distillation teacher-student architecture that enforces global-local semantic and feature consistency for audio deepfake detection.
- Demonstrates data-efficient fine-tuning where models attain fully-supervised performance levels using only 20% of the labeled dataset.
- Significantly enhances cross-domain generalization and out-of-domain robustness against modern, unseen speech synthesis models and generative APIs.

## Problem

Audio deepfake detection models typically rely heavily on large-scale supervised datasets, which are expensive and time-consuming to curate. Furthermore, standard models overfit to known training distributions, causing severe performance degradation when deployed against unseen synthesis architectures, novel vocoders, or cross-domain test environments. Prior self-supervised approaches like wav2vec2 often focus on local masked prediction rather than capturing multi-scale forgery artifacts, limiting their robustness in real-world threat scenarios.

## Method

The framework operates in two distinct stages. In Stage 1, unsupervised self-distillation is performed using dual branches: a teacher network processing an unmodified global long segment (64,600 samples) and a student network processing a noise-augmented local short segment (32,300 samples). The backbone couples a 0.3B parameter XLS-R self-supervised model with an AASIST front-end. AASIST constructs parallel spectral and temporal graphs processed by Graph Attention Layers (GAL) and a Max Graph Operation (MGO) to produce a fused high-grade embedding vector. The student network is updated via backpropagation, while teacher weights are synchronized via an exponential moving average (EMA). Training minimizes a DINO cross-entropy loss that aligns the global and local predicted output distributions, forcing the encoder to learn forgery-related artifacts invariant to length and noise.

In Stage 2, the projection head from pretraining is discarded, and a binary classification head is attached to the frozen-or-tuned teacher backbone. Supervised fine-tuning utilizes weighted binary cross-entropy loss with positive/negative class weights set to 0.9 and 0.1, combined with robust data augmentations including MUSAN noise, room impulse responses (RIR), Rawboost, codec variations, and speed perturbation ranging from 0.9 to 1.1.

## Experimental setup

Stage 1 uses 1,000,000 unlabelled audio samples sampled uniformly from public repositories. Stage 2 fine-tuning uses the training and development partitions of ASVspoof 2019 LA, evaluated across ASVspoof 2019 LA, 2021 LA, and 2021 DF datasets, alongside cross-domain test sets (In-the-Wild, FoR, DFADD, ADD2023 R1/R2, HABLA) and 8 unseen modern synthesis APIs/models (e.g., Udio, CosyVoice, F5-TTS, MaskGCT) generating 1,000 fake samples each. Baselines include fully supervised XLS-R, WavLM-Large, XLSR-53, and Whisper-Medium backbones paired with AASIST. Implementation details include 4 NVIDIA RTX 4090 GPUs, Adam optimizer with a learning rate of 1e-6 for the backbone and 1e-3 for classifiers, weight decay of 5e-5, single-GPU batch size of 32 for 180 epochs in pretraining, and batch size 16 for fine-tuning.

## Results

When fine-tuned on only 20% of the ASVspoof 2019 LA dataset, ADD-DINO with XLS-R+AASIST yields EERs of 0.55%, 1.25%, and 2.95% on 19LA, 21LA, and 21DF respectively, closely approaching the fully-supervised 100% data baseline (0.23%, 0.84%, and 2.85%). On cross-domain benchmarks using only 20% fine-tuning data, ADD-DINO outperforms the fully-supervised 100% baseline by reducing average EER from 15.31% to 12.25% (a 19.99% relative improvement), with standout gains on DFADD (15.77% down to 9.29%). Against modern unseen synthesis engines (Udio, AudioBox, CosyVoice, F5-TTS, FireRed-TTS, MaskGCT, Kokoro-TTS, Oute-TTS), ADD-DINO boosts average detection accuracy from 66.5% to 81.6%—notably improving Udio detection from 34.20% to 71.00% and MaskGCT from 62.10% to 81.30%.

| System / Condition | 19LA EER (%) | 21LA EER (%) | 21DF EER (%) | ITW EER (%) | Unseen TTS ACC (%) |
|---|---|---|---|---|---|
| XLS-R + AASIST (100% Data) | 0.23 | 0.84 | 2.85 | 13.56 | 66.5 |
| ADD-DINO (10% Fine-tune Data) | 0.76 | 1.77 | 3.56 | - | - |
| ADD-DINO (20% Fine-tune Data) | 0.55 | 1.25 | 2.95 | 11.18 | 81.6 |
| ADD-DINO (100% Fine-tune Data) | 0.33 | 0.88 | 2.69 | - | - |

## Limitations

The framework relies on a fixed 0.3B parameter XLS-R backbone, meaning compute scaling behaviors for larger speech foundation models (e.g., 1B+ parameter models) remain untested. While evaluated on diverse synthesis tools, the pretraining pool of 1 million unlabeled samples may still miss extreme acoustic conditions, highly compressed telephony channels, or adversarial codec manipulations. The method requires significant multi-GPU compute during Stage 1 pretraining (180 epochs across 4 GPUs).

## Why read this

Speech security researchers and engineers aiming to build label-efficient deepfake detectors that generalize effectively to zero-shot synthesis architectures will find a complete blueprint here. It demonstrates how non-contrastive global-local self-distillation can replace massive supervised data requirements.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio deepfake detection, speech security verification systems, conversational AI safety guardrails, and automated fraud prevention.

## Related

- (link related pages by id as the wiki grows)
