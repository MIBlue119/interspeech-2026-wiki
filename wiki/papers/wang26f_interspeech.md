---
id: wang26f_interspeech
category: tts
labels: [generative-model]
institutions: ["Tianjin University", "Tianjin University of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-409
pdf: https://www.isca-archive.org/interspeech_2026/wang26f_interspeech.pdf
---

# Dual-Space Constrained Face-Based Zero-Shot Text-to-Speech Synthesis

*Jianrong Wang, Shengjie Zhou, Ju Zhang, Dengcheng Hu, Qi Li*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-409)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — Dual-Space Constrained TTS (DSC-TTS) is a modular face-based zero-shot text-to-speech framework that mitigates training-inference identity drift by enforcing consistency in both the speech speaker embedding space and a face-voice shared latent space. It achieves a superior speaker embedding cosine similarity (SECS) of 0.677 on VoxCeleb2 and 0.653 on LRS2 while reducing Word Error Rate.

## Key contributions

- A speaker embedding learning strategy combining AAM-Softmax, domain-adversarial training, and supervised contrastive learning (SupCon) to minimize corpus-dependent variations while keeping speaker-discriminative structure.
- A symmetric, bidirectional face-voice alignment method using a CLIP-style contrastive loss, reconstruction loss, and latent consistency loss over a 256-dimensional shared latent space.
- A three-stage modular training pipeline that jointly constrains the acoustic model in both the speech embedding space and the shared identity space.
- Identity-aware attention pooling over multiple sampled face frames that automatically down-weights blurred or poorly-posed frames.

## Problem

Generating speech from a single face image without reference audio suffers from unstable speaker identity and timbre drift due to training-inference mismatches. End-to-end face TTS systems struggle due to limited audio-visual data scale and quality, lagging behind large-scale speech-only TTS backbones. Prior modular architectures introduce face conditioning only at inference time while their acoustic models are trained exclusively on speech-derived embeddings, and their unidirectional alignment methods fail to handle cross-dataset domain shifts.

## Method

The framework operates in three sequential stages. First, a speech encoder ($E_s$) extracts $l_2$-normalized speaker embeddings from log-Mel spectrograms via an ECAPA-TDNN backbone optimized with AAM-Softmax, gradient-reversal domain-adversarial loss ($\lambda_{\text{Domain}} = 1.0$), and supervised contrastive learning ($\lambda_{\text{SupCon}} = 1.0$). Second, a symmetric bidirectional face-voice alignment module maps $K=5$ uniformly sampled face frames (aggregated via attention pooling using AntelopeV2 features) and audio speaker embeddings into a 256-dimensional shared latent space using two-layer residual MLPs with layer normalization. This module is trained with InfoNCE contrastive loss, cosine distance reconstruction losses ($\lambda_{\text{REC}} = 0.5$), and latent consistency regularization ($\lambda_{\text{LC}} = 0.1$).

In the third stage, the YourTTS acoustic model (pretrained on LJSpeech for 120K steps and fine-tuned on LibriTTS for 165K steps) is adapted with dual-space constraints. With $E_s$ and the voice-side projection network fixed, speaker identity is explicitly regularized during multi-speaker fine-tuning using both a speaker contrastive loss (SCL, $\lambda_{\text{SCL}} = 9.0$) in the speech embedding space and a shared identity consistency loss (SICL, $\lambda_{\text{SICL}} = 3.0$) in the joint latent space. At inference time, a face image replaces the acoustic enrollment, feeding through the aligned projection networks to condition the TTS model cleanly without discrepancy drift.

## Experimental setup

The speech encoder and alignment modules are trained on VoxCeleb2 and LibriTTS (train-clean-100 and train-clean-360 subsets), with LJSpeech used for single-speaker TTS pretraining. Evaluation uses 24 unseen disjoint speakers from VoxCeleb2 paired with LibriTTS text prompts, alongside LRS2 for cross-corpus mismatch testing. Metrics include WER and CER (via Whisper) for intelligibility, SECS, SEC, and SED (via Resemblyzer) for speaker similarity and consistency, and a 5-point Similarity Mean Opinion Score (SMOS) rated by 10 listeners. Experiments run on a single NVIDIA RTX 4090 (24 GB) using the AdamW optimizer with a learning rate of $10^{-4}$ and batch size of 256.

## Results

On the VoxCeleb2 benchmark, DSC-TTS outperforms modular baselines like Face-StyleSpeech and SYNTHE-SEES, achieving a lower WER of 0.072 (vs 0.087), CER of 0.037, and a higher SECS of 0.677 (vs 0.635) and SEC of 0.842. On the challenging LRS2 cross-corpus setting, it maintains superior intelligibility with a WER of 0.057 and boosts SECS to 0.653. Subjective evaluations mirror these trends, registering a top SMOS of 3.172 on VoxCeleb2 and 3.416 on LRS2. Ablations confirm that adding both the embedding losses ($L_{\text{Domain}}, L_{\text{SupCon}}$) and the dual-space constraints ($L_{\text{SCL}}, L_{\text{SICL}}$) incrementally improves SECS and SEC without compromising inter-speaker diversity (SED).

| System | VoxCeleb2 WER $\downarrow$ | VoxCeleb2 SECS $\uparrow$ | VoxCeleb2 SMOS $\uparrow$ | LRS2 WER $\downarrow$ | LRS2 SECS $\uparrow$ |
|---|---|---|---|---|---|
| FaceTTS (End-to-End) | 0.113 | 0.603 | 2.074 | 0.119 | 0.552 |
| Face2Speech (Modular) | 0.098 | 0.613 | 2.725 | 0.077 | 0.569 |
| SYNTHE-SEES (Modular) | 0.087 | 0.614 | 2.466 | 0.084 | 0.567 |
| Face-StyleSpeech (Modular) | 0.087 | 0.635 | 2.658 | 0.091 | 0.583 |
| **DSC-TTS (Ours)** | **0.072** | **0.677** | **3.172** | **0.057** | **0.653** |

## Limitations

The framework relies on pre-extracted face embeddings from AntelopeV2 and fixed pretrained models like YourTTS, binding its performance ceiling to these upstream components. While evaluated on VoxCeleb2 and LRS2, language coverage is restricted to English, and extreme profile angles or severe occlusions can still occasionally impair the attention-pooling mechanism.

## Why read this

Researchers and engineers building zero-shot modular TTS systems or cross-modal voice cloning pipelines should read this to learn how dual-space latent constraints successfully resolve the long-standing training-inference distribution gap between visual and acoustic representations.

## Code

- https://zsj23.github.io/dsc-tts

## Applications

Automated film dubbing, silent film voice restoration, personalized virtual avatar generation, and expressive face-driven human-computer interaction.

## Institutions / 機構

Tianjin University, Tianjin University of Technology

**Funding / 經費:** Key R&D Program of the Nanning Science Research and Technology Development Plan, Tianjin Science and Technology Program, Special Project for High-Quality Development of Manufacturing Industry

## Related

- (link related pages by id as the wiki grows)
