---
id: liu26o_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2002
pdf: https://www.isca-archive.org/interspeech_2026/liu26o_interspeech.pdf
---

# WhisperVC: Decoupled Cross-Domain Alignment and Speech Generation for Low-Resource Whisper-to-Normal Conversion

[PDF](https://www.isca-archive.org/interspeech_2026/liu26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2002)

**TL;DR** — WhisperVC is a three-stage framework for low-resource whisper-to-normal speech conversion that decouples cross-domain alignment from speech generation, achieving a character error rate of 11.389% on English wTIMIT.

## Problem

Whispered speech lacks vocal-fold excitation, exhibits reduced energy, and has large spectral and temporal mismatches compared to normal speech, leading to severe degradation in intelligibility and naturalness. Existing single-stage conversion frameworks struggle with limited training data, and parallel whisper-voiced speech corpora are scarce, making stable voicing reconstruction difficult.

## Method

WhisperVC consists of three sequential components: a whisper-specific domain alignment module using a Conformer-based VAE with soft-DTW regularization on Whisper-large V3 content features; a coarse-to-fine residual generation module combining length-channel alignment, a feed-forward Transformer coarse mel predictor, and an optimal-transport conditional flow matching (OT-CFM) residual refiner conditioned on a SimAM-ResNet34 speaker embedding; and a HiFi-GAN vocoder fine-tuned on predicted mel-spectrograms. A gated dual-path routing sigmoid classifier allows normal inputs to bypass VAE alignment to unify whisper-to-normal conversion and conventional voice conversion.

## Results

Evaluated on the Mandarin AISHELL6-Whisper corpus (30 hours) and the English wTIMIT dataset under an unseen-speaker evaluation protocol. On AISHELL6-Whisper, WhisperVC achieves a DNSMOSovrl of 3.072, UTMOS of 2.831, CER of 16.932%, and WavLM speaker similarity of 0.945, outperforming the zero-shot Seed-VC baseline (CER 46.423%). On English wTIMIT, WhisperVC reaches a CER of 11.389%, surpassing WESPER (30.724%) and DistillW2N (36.028%). Ablations show that removing the VAE alignment spikes the CER to 40.155%, and removing OT-CFM residual refinement or vocoder fine-tuning reduces performance.

## Code

- https://demo-whispervc.github.io/demo-whispervc/

## Applications

Individuals with voice disorders, post-surgical vocal-fold patients requiring rehabilitation, and users needing private or nonvocal communication in noise-sensitive environments.

## Limitations

Future work needs to explore improving model efficiency and enabling real-time operation.

## Related

- (link related pages by id as the wiki grows)
