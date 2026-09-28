---
id: mahapatra26_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-831
pdf: https://www.isca-archive.org/interspeech_2026/mahapatra26_interspeech.pdf
---

# ProSDD: Learning Prosodic Representations for Speech Deepfake Detection against Expressive and Emotional Attacks

*Aurosweta Mahapatra, Ismail Rasim Ulgen, Kong Aik Lee, Nicholas Andrews, Berrak Sisman*

[PDF](https://www.isca-archive.org/interspeech_2026/mahapatra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mahapatra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-831)

**TL;DR** — ProSDD is a two-stage speech deepfake detection framework that improves generalization to expressive and emotional attacks by incorporating supervised masked prediction of speaker-conditioned prosodic variation, reducing the ASVspoof 2024 EER from 39.62% to 7.38% when trained on ASVspoof 2024.

## Key contributions

- Introduces ProSDD, a two-stage training paradigm that structures self-supervised backbone representations using speaker-conditioned prosodic targets.
- Proposes Stage I real-only prosodic pretraining to help models internalize natural prosodic variability before exposure to spoofed speech distributions.
- Uses a two-pass Stage II training strategy combining spoof classification with an auxiliary supervised masked prediction objective.
- Demonstrates massive cross-domain and cross-attack robustness on emotional/expressive datasets (EmoFake, EmoSpoof-TTS, ASVspoof 2024 Track 1) without complex classifier architectures.

## Problem

Current speech deepfake detection (SDD) models driven purely by spoof-classification objectives tend to overfit to dataset-specific artifacts, causing severe performance degradation when evaluated on expressive, emotional, or unseen synthetic speech (such as EmoFake and ASVspoof 2024). While prior end-to-end models like RawNet2, AASIST, and SSL-based systems like XLSR-SLS excel on traditional static benchmarks, they lack robustness against distribution shifts in prosody. This paper addresses the gap by leveraging human perceptual intuition: humans detect fakes not by memorizing spoof artifacts, but by identifying deviations from the fundamental structure of authentic speech variability.

## Method

ProSDD builds upon an XLS-R self-supervised backbone in two distinct training stages. In Stage I, the model is trained exclusively on bona fide speech (LibriSpeech train-clean-100) using a supervised masked prediction objective. The targets consist of a 448-dimensional joint embedding formed by concatenating a 192-dimensional utterance-level speaker embedding (averaged and L2-normalized from an ECAPA-TDNN model) and a 256-dimensional frame-level prosodic embedding capturing pitch (F0), voice activity, and energy. Span masking is applied to the latent representations with a length of 8 and a masking probability of 0.25, and an InfoNCE loss with temperature tau = 0.07 is optimized using 100 negatives split equally between intra-speaker (same speaker, different prosody) and inter-speaker samples.

In Stage II, the backbone is initialized from Stage I weights and trained on spoof detection datasets (ASVspoof 2019/2024) using a two-pass training strategy per step: a masked pass computing the supervised prosodic loss, and an unmasked pass feeding time-mean-pooled contextual representations (1024-dimensional) through a lightweight classifier head (linear, dropout, ReLU, linear) to compute weighted cross-entropy loss. The overall Stage II objective combines the classification loss and the auxiliary masked prediction loss weighted by coefficients alpha = 1 and beta (set to 0.2 for the first 4 epochs, then reduced to 0.05). RawBoost (Method 3) data augmentation is applied during Stage II. During inference, only the XLS-R backbone and the lightweight classification head are executed.

## Experimental setup

Stage I uses LibriSpeech train-clean-100 and dev (bona fide only). Stage II uses ASVspoof 2019 LA and ASVspoof 2024 train/dev splits. Evaluation is conducted on ASVspoof 2019 LA, ASVspoof 2021 LA, EmoFake, EmoSpoof-TTS, and ASVspoof 2024 Track 1. Baselines include RawNet2, AASIST, and XLSR-SLS. Models are trained for 50 epochs with a batch size of 64 on 4-second segments using layerwise learning rates (1e-6 for backbone, 1e-4 for projection, 1e-5 for classifier).

## Results

When trained on ASVspoof 2019 LA, ProSDD achieves an EER of 0.42% on ASVspoof 2019 (outperforming XLSR-SLS at 0.56%), 3.87% on ASVspoof 2021, 16.14% on ASVspoof 2024 (down from 25.43% for XLSR-SLS), 3.70% on EmoFake (down from 8.84%), and 9.54% on EmoSpoof-TTS (down from 18.92%). When trained on ASVspoof 2024, ProSDD attains 19.04% on ASVspoof 2019, 18.08% on ASVspoof 2021, 7.38% on ASVspoof 2024 (massive drop from 39.62% for XLSR-SLS), 25.06% on EmoFake, and 11.96% on EmoSpoof-TTS.

Ablation studies demonstrate that stripping real-only pretraining and masked prediction (w/o MP-SI) degrades performance severely, pushing the ASVspoof 2019 EER from 0.42% up to 6.78% and ASVspoof 2024 up to 28.12%. Retaining masked prediction exclusively in Stage II without real-only pretraining yields intermediate performance (e.g., 15.55% on ASVspoof 2024), confirming that the two-stage pipeline with bona fide initialization is vital for robust generalization.

| Models | ASV19 | ASV21 | ASV24 | EmoFake | EmoSpoof |
|---|---|---|---|---|---|
| RawNet2 | 4.60 | 8.08 | 40.67 | 21.71 | 43.04 |
| AASIST | 0.83 | 8.15 | 35.53 | 13.64 | 31.06 |
| XLSR-SLS | 0.56 | 3.04 | 25.43 | 8.84 | 18.92 |
| ProSDD | 0.42 | 3.87 | 16.14 | 3.70 | 9.54 |

## Limitations

The framework relies on accurate extraction of prosodic features (pitch, voice activity, energy) and precomputed speaker embeddings, which may degrade under extreme acoustic noise, reverberation, or overlapping speech conditions. The evaluation is currently restricted to English and standard benchmark datasets, leaving multilingual and in-the-wild channel variations largely unaddressed. Additionally, the two-stage training scheme and dual-pass forward steps impose higher training compute overhead compared to standard single-stage fine-tuning.

## Why read this

Researchers and engineers working on robust speech deepfake detection under expressive or emotional distribution shifts should read this paper to see how auxiliary supervised prosodic representation learning can replace complex classifier engineering.

## Code

- https://prosdd.github.io/ProSDD_website/

## Applications

Speech deepfake detection systems deployed in security-critical authentication pipelines, call centers, and media verification platforms to counter expressive text-to-speech and voice conversion attacks.

## Related

- (link related pages by id as the wiki grows)
