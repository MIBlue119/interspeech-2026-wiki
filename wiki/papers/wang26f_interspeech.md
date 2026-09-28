---
id: wang26f_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-409
pdf: https://www.isca-archive.org/interspeech_2026/wang26f_interspeech.pdf
---

# Dual-Space Constrained Face-Based Zero-Shot Text-to-Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/wang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-409)

**TL;DR** — The paper introduces DSC-TTS, a modular face-based zero-shot text-to-speech framework that mitigates identity drift by enforcing dual-space identity constraints, achieving superior speaker similarity (SECS of 0.677 on VoxCeleb2) and consistency compared to existing baselines.

## Problem

Modular face-based text-to-speech systems typically train their acoustic models exclusively on speech-derived speaker representations while introducing face-derived representations only during inference. This fundamental training-inference mismatch, combined with corpus-dependent variation and weak unidirectional face-voice alignment, leads to severe speaker identity drift and instability when generating speech from a single face image. These flaws undermine speaker consistency and timbre stability, particularly under domain shifts or heterogeneous data conditions.

## Method

The framework operates in three stages: first, training a speech encoder using AAM-Softmax, domain-adversarial training via a gradient reversal layer, and supervised contrastive learning (SupCon) to extract corpus-invariant, speaker-discriminative embeddings. Second, a symmetric, bidirectional face-voice alignment module maps 256-dimensional face and speech embeddings into a shared latent space using CLIP-style contrastive loss, reconstruction loss, and latent consistency loss. Third, the acoustic model (built upon YourTTS) is fine-tuned using a dual-space constrained strategy that penalizes deviations in both the speech-derived embedding space (SCL) and the shared identity space (SICL). The system utilizes an ECAPA-TDNN speech backbone, an AntelopeV2 face encoder utilizing attention pooling over 5 sampled frames, and two-layer residual MLPs for projection and decoding networks.

## Results

Evaluated on VoxCeleb2 and LRS2 datasets, DSC-TTS is compared against FaceTTS, Face2Speech, SYNTHE-SEES, and Face-StyleSpeech using Whisper-derived WER/CER, Resemblyzer-based SECS, SEC, SED, and subjective Similarity Mean Opinion Score (SMOS). On VoxCeleb2, DSC-TTS achieves a WER of 0.072, CER of 0.037, SECS of 0.677, SEC of 0.842, and an SMOS of 3.172, outperforming all modular baselines. On LRS2, it records a WER of 0.057, CER of 0.032, SECS of 0.653, and an SMOS of 3.416. Ablation studies confirm that combining domain-adversarial learning, supervised contrastive objectives, and dual-space consistency constraints progressively improves speaker embedding consistency and cross-corpus generalization without hurting speech intelligibility.

## Code

- https://zsj23.github.io/dsc-tts

## Applications

Speech and ML engineers building zero-shot text-to-speech systems for silent film dubbing, virtual avatar animation, and face-based human-computer interaction where reference enrollment audio is absent.

## Limitations

The text does not explicitly state limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
