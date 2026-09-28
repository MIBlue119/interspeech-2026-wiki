---
id: song26_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-48
pdf: https://www.isca-archive.org/interspeech_2026/song26_interspeech.pdf
---

# CFLOW-VC: An unsupervised cycle training strategy based on normalizing flows for Voice Conversion

[PDF](https://www.isca-archive.org/interspeech_2026/song26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-48)

**TL;DR** — CFLOW-VC integrates normalizing flows into a StarGAN-style cyclic adversarial training framework for non-parallel voice conversion, achieving a speaker similarity of 73.5% and a UTMOS of 3.948 on clean test data.

## Problem

In non-parallel voice conversion, models frequently suffer from a train-test mismatch because training utterances typically derive content and timbre from the same speaker, hindering proper disentanglement during inference. While prior architectures like FreeVC leverage self-supervised learning features, they fail to adequately sample content-timbre combinations during training, leading to poor generalization. This work addresses the resulting trade-off between content preservation and timbre transformation without incurring audio distortions.

## Method

Built upon the end-to-end VITS and FreeVC frameworks, CFLOW-VC introduces a Cycle Training Strategy (CTS) utilizing normalizing flow invertibility and StarGANv2-style adversarial and consistency losses. A mel-style encoder extracts global style features to boost expressiveness, while a speaker encoder handles target timbre. WavAugment adds noise and reverberation to training data, and a gradient reversal layer decouples prior distributions from speaker identity. The model is pre-trained on VCTK using four NVIDIA 4090 GPUs for 500k steps, followed by an additional 200k steps of CTS training with frozen posterior and decoder modules.

## Results

Evaluated on the Libritts test-clean dataset and noisy/accented variants, CFLOW-VC is compared against DiffVC, Diff-HierVC, StarGANv2-VC, and FreeVC. On clean data, it achieves a UTMOS of 3.948 and speaker similarity (SIM) of 73.5%, outperforming FreeVC (3.712 UTMOS, 65.51% SIM). In noisy conditions, CFLOW-VC exhibits superior robustness with a Word Error Rate (WER) of 8.75% compared to FreeVC's 14.41%. Subjective MOS tests confirm higher naturalness and expressiveness at 4.39 for clean speech and 3.54 for noisy speech. Ablation studies confirm the individual contributions of CTS, style encoding, and data augmentation.

## Code

- https://bigdan12.github.io/CFLOW_VC_demo/

## Applications

Speech engineers and developers building robust voice conversion systems, personalized text-to-speech agents, or cross-speaker dubbing pipelines that must operate reliably in noisy real-world environments.

## Related

- (link related pages by id as the wiki grows)
