---
id: liang26c_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1135
pdf: https://www.isca-archive.org/interspeech_2026/liang26c_interspeech.pdf
---

# Text-Independent Speaker Verification Using Discrete Audio Tokens

*Zheng Liang, Junjie Li, Kong Aik Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/liang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1135)

**TL;DR** — The paper introduces Cross-Feature Knowledge Distillation (CFKD) to bridge the speaker recognition performance gap between neural audio codec tokens and continuous spectral features, achieving a 49.5% relative EER reduction on VoxCeleb2 at high bitrates.

## Key contributions

- Identifies via diagnostic analysis that neural audio codec tokens preserve speaker identity cues well, and the primary ASV performance drop stems from optimization bottlenecks under standard cross-entropy training rather than information loss.
- Proposes Cross-Feature Knowledge Distillation (CFKD) to align the embedding space of a token-based student with a high-performing Fbank-based teacher using a cosine similarity loss.
- Shows that order-agnostic 1D architectures (ECAPA-TDNN) substantially outperform 2D architectures (ResNet34) on discrete codec tokens due to the decorrelated nature of the latent codebook space.
- Demonstrates robust scaling across multiple EnCodec bitrates (1.5 kbps to 24 kbps) on VoxCeleb1 and VoxCeleb2 benchmarks.

## Problem

State-of-the-art automatic speaker verification (ASV) systems rely heavily on continuous spectral features such as filterbank energies (Fbanks). While neural audio codecs (NACs) efficiently compress audio into discrete tokens for generative tasks, feeding these discrete tokens directly into standard ASV models results in severe performance degradation. Prior methods like standard cross-entropy training fail to extract speaker-discriminative structures from the compressed and discrete latent space, creating an information accessibility gap that prevents codec tokens from matching spectral feature baselines.

## Method

The paper uses the official pre-trained EnCodec model with 32 residual vector quantization (RVQ) layers at 24 kHz. To generate token inputs, the discrete tokens from all RVQ layers are mapped to codebook embeddings, summed along the quantizer dimension to reconstruct an approximate latent frame, and linearly projected to an 80-dimensional space. The framework utilizes a dual-stream architecture containing a frozen, continuous Fbank-based teacher (Φ_T) and a trainable, token-based student (Φ_S) sharing the identical backbone network (ECAPA-TDNN with C=1024 or ResNet34 with C=32).

The training objective combines the standard classification loss (AAM-Softmax with margin m=0.2 and scale s=32) with a geometric distillation loss. A Cosine Similarity Loss aligns the student's 192-dimensional speaker embedding vector with the teacher's embedding vector to transfer structural knowledge. The total loss is L = L_CLS + λ * L_KD, where the distillation weight λ is set to an optimal value of 40—substantially higher than standard homogeneous distillation due to the cross-feature nature of the task, requiring stronger supervision to guide the token-based model.

During inference, raw audio is upsampled to 24 kHz, converted to discrete tokens through the EnCodec encoder, processed by the token-based student backbone, and evaluated via cosine scoring without requiring the teacher model.

## Experimental setup

Evaluated on VoxCeleb1 (dev set with 1,211 speakers for main experiments; Vox1-O, Vox1-E, and Vox1-H for test sets) and scaled to VoxCeleb2 (5,994 speakers). Models use ECAPA-TDNN (14.65M parameters) and ResNet34 (6.63M parameters). Training runs for 100 epochs using the Adam optimizer (initial learning rate 1.2 × 10^-3, weight decay 2 × 10^-5, step decay factor 0.97) with a batch size of 256 on 2-second audio segments augmented with speed perturbation, MUSAN noise, and RIR reverberation.

## Results

On the Vox1-O test set with ECAPA-TDNN, the naive token baseline (E3) yields an EER of 3.38% and minDCF of 0.366. Applying CFKD with λ=40 (E6) drops the EER to 2.25% and minDCF to 0.231, representing a 35.3% relative improvement and nearly matching the Fbank teacher model (E1: 2.21% EER). For ResNet34, CFKD (E12) improves the token baseline (E9: 7.55% EER) down to 4.03% EER (a 42.9% relative improvement). On VoxCeleb2 evaluations across bitrates, the proposed method at 24 kbps reduces EER from the prior codec-ASV baseline of 2.08% down to 1.05% (a 49.5% relative improvement). Feature shuffling experiments prove that ResNet34 heavily relies on spectral continuity and collapses on tokens (EER remains ~7.45%), whereas ECAPA-TDNN is order-agnostic and robust.

| System Setup / Condition | EER (%) | minDCF |
|---|---|---|
| Teacher (Fbank, ECAPA-TDNN) | 2.21 | 0.236 |
| Student Naive Tokens (E3) | 3.38 | 0.366 |
| Student + CFKD (λ=40, E6) | 2.25 | 0.231 |
| ResNet34 Naive Tokens (E9) | 7.55 | 0.669 |
| ResNet34 + CFKD (λ=40, E12) | 4.03 | 0.408 |

## Limitations

The evaluation is restricted to English-centric or standard benchmark datasets (VoxCeleb) and relies on a pre-trained EnCodec model operating at specific fixed bitrates. The method requires a pre-trained high-performance Fbank-based teacher model of identical architecture, introducing computational overhead during the training phase.

## Why read this

Speech and ML researchers working on generative speech models or token-based audio representations will learn how to effectively adapt neural codec tokens for discriminative tasks like speaker verification using embedding-level knowledge distillation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving speaker verification, voice biometrics for generative speech systems, and speaker diarization using compressed audio streams.

## Related

- (link related pages by id as the wiki grows)
