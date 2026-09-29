---
id: parmonangan26_interspeech
category: paralinguistics-emotion
labels: [self-supervised, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-605
pdf: https://www.isca-archive.org/interspeech_2026/parmonangan26_interspeech.pdf
---

# Audio-Visual Feature Reconstruction Pretraining for Noise-Robust Emotion Recognition

*Ivan Halim Parmonangan, Tharindu Fernando, Simon Denman*

[PDF](https://www.isca-archive.org/interspeech_2026/parmonangan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/parmonangan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-605)

**Category:** `paralinguistics-emotion` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — This paper proposes a Mamba2 state-space model with a two-stage self-supervised cross-attention reconstruction pretraining strategy to learn noise-robust audiovisual representations for emotion recognition. The approach improves noisy audio emotion recognition accuracy by 4.6% to 5.8% over unimodal pretraining baselines.

## Key contributions

- Introduces an explicit feature-reconstruction self-supervised pretraining framework for audiovisual emotion recognition using corrupted inputs to combat noise-dominance.
- Replaces quadratic-complexity Transformers with Mamba2 state-space models in both encoders and decoders for efficient long-sequence multimodal processing.
- Implements a two-phase training recipe: 80 epochs for uni-modal encoder denoising, followed by 200 epochs of cross-attention fusion and decoder training with GradNorm.
- Exhaustively evaluates robustness against out-of-distribution severity shifts by varying background noise, reverberation, bit-depth drops, clipping, choppy speech, and video corruption probabilities by ±25% and ±50%.

## Problem

Real-world audiovisual emotion recognition systems suffer severe performance drops when one or both modalities are degraded by background noise, reverberation, or visual dropouts, because corrupted streams often dominate attention mechanisms and suppress clean signals. Prior self-supervised audiovisual pretraining methods focus heavily on semantic correspondence, synchronization, or contrastive alignment rather than explicit cross-modal denoising, leaving models vulnerable when transferred to affective tasks under acoustic/visual corruption. Furthermore, dominant Transformer architectures suffer from quadratic computational complexity, restricting their scalability and efficiency when processing long multimodal sequences in real-time or resource-constrained settings.

## Method

The system processes pre-extracted features from frozen EAT-base (ViT-B backbone for audio, 128 Mel-bins at 16kHz) and Timesformer-base (video at 25 fps, uniformly sampled into 8+ frames based on duration). The architecture uses 3-layer Mamba2 encoders for each modality, projecting features to a shared internal dimension of Dc = 768 with LayerNorm. Because video tokens contain rich spatial information and outnumber audio tokens, two unidirectional cross-attention layers are applied: audio tokens are updated conditioned on attention-pooled video tokens, and video tokens are conditioned on all audio tokens, flanked by trainable position embeddings (PEa, PEv). Afterward, linear BackProj layers map tokens back to original dimensions (Da, Dv) before passing through individual 3-layer Mamba2 decoders to reconstruct clean features.

Pretraining uses the LRS2 pretrain subset (96k records) augmented with FSDNoisy18K and AIR impulse responses, while the LRS2 main subset uses WHAM! and IR-C4DM for validation. Stage 1 trains only the encoders for 80 epochs using unweighted Mean Squared Error (MSE) loss. Stage 2 freezes encoders and trains cross-attention and decoders for 200 epochs using MSE loss weighted by initial coefficients (wa = 0.8, wv = 1.2) dynamically tuned via GradNorm. Downstream evaluation uses RAVDESS (24 actors, 8 emotion classes), split 80/20, feeding normalized tokens through an attention-pooling layer, a GeLU-activated linear layer with 0.1 dropout, and a cosine classifier.

## Experimental setup

Evaluated using LRS2 (96k pretrain, 48k main subset) for self-supervised pretraining and RAVDESS (8 emotion classes, 24 actors, 7-syllable spoken/sung utterances) for downstream emotion recognition. Background noise sources include FSDNoisy18K, WHAM!, and UrbanSound8K (5-20 dB); reverberation uses IR-C4DM, AIR, and MicIRP. Compared against non-pretrained EAT/Timesformer features and unimodal encoder-only pretrained Mamba2 models. Implementation metrics include accuracy under clean and varied noise severity levels (±25%, ±50%), evaluated via McNemar’s significance test. The phase 2 model contains 76M parameters and consumes 576 GFLOPs (compared to 73.4M parameters and 591 GFLOPs for a Transformer equivalent).

## Results

Without pretraining, clean audio scores 77% and clean video scores 93% on RAVDESS, with noisy audio plunging between 39% and 70%. Uni-modal encoder-only pretraining raises noisy audio accuracy to 44–76% and noisy video to 84–90%, though McNemar's tests show no statistically significant overall gain except at 25% lower noise (p = 0.002). 

With the proposed multimodal cross-attention fusion, downstream performance on noisy audio significantly jumps: fusing noisy audio with clean video (NACV) outperforms unimodal encoder-only features at matching noise levels (p = 0.045) and at +25% increased noise (p = 0.009). Noisy audio with noisy video (NANV) improves over unimodal baselines by 4.6% to 5.8% at +25% and +50% increased noise severity (p < 0.05). Conversely, video performance experiences a slight drop of 2.1% to 3.2% across conditions when fused with noise-sensitive audio, attributed to video performance already being saturated and clean audio having lower baseline accuracy.

| System Condition | Audio Accuracy Range | Video Accuracy Range | Notable Significance vs Baseline |
| --- | --- | --- | --- |
| Non-Pretrained Baseline | 39% - 70% (Noisy) / 77% (Clean) | 79% - 89% (Noisy) / 93% (Clean) | Baseline reference |
| Uni-modal Encoder-Only | 44% - 76% (Noisy) | 84% - 90% (Noisy) | Not significant overall (p > 0.05) |
| Proposed Fused (NACV) | Enhanced over unimodal | Maintained | p = 0.045 at default noise; p = 0.009 at +25% noise |
| Proposed Fused (NANV) | +4.6% to +5.8% over unimodal | Maintained | p < 0.05 at +25% and +50% increased noise |

## Limitations

The evaluation relies on a single downstream emotion dataset (RAVDESS) with limited lexical content (only two short sentences: 'Kids are talking by the door' and 'Dogs are sitting by the door') spoken by 24 actors, which may limit generalizability to spontaneous, naturalistic conversations. The approach utilizes frozen upstream feature extractors (EAT and Timesformer), bounding the model's capacity to adapt early-stage acoustic-visual token representations during pretraining. Furthermore, video performance experienced a slight degradation when fused with heavily degraded audio streams, highlighting the lack of an adaptive gating or confidence-based weighting mechanism to completely shield robust modalities from weak ones.

## Why read this

Speech and multimodal researchers seeking to replace quadratic Transformer fusion architectures with linear state-space models (Mamba2) while building noise-robust affective computing systems should read this paper. It provides a concrete blueprint for combining self-supervised cross-modal reconstruction pretraining with GradNorm loss balancing to protect robust modalities from noise-corrupted counterparts.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust human-computer interaction, affective computing, customer service analytics, and educational software operating in noisy real-world acoustic environments.

## Institutions / 機構

Queensland University of Technology

## Related

- (link related pages by id as the wiki grows)
