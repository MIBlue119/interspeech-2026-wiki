---
id: gao26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-64
pdf: https://www.isca-archive.org/interspeech_2026/gao26_interspeech.pdf
---

# NoiseLoRA-SV: Hierarchical Noise-Conditioned Adaptation with Embedding Distillation for Robust Speaker Verification

[PDF](https://www.isca-archive.org/interspeech_2026/gao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-64)

**TL;DR** — NoiseLoRA-SV introduces a hierarchical, dynamic noise-conditioned LoRA framework for robust speaker verification that achieves a lower average equal error rate (3.05%) under seen noisy conditions compared to static baselines.

## Problem

Conventional speaker verification models rely on static inference-time parameters, limiting their representational capacity and responsiveness to rapidly fluctuating, non-stationary background noise. While separating or jointly optimizing speech enhancement frontends can help, they often introduce suppression artifacts that destroy speaker-discriminative features and speaker embeddings. Parameter-efficient fine-tuning methods like standard LoRA lack awareness of ambient acoustic variations because their adaptation weights remain fixed post-training.

## Method

The framework couples an ECAPA-TDNN speaker encoder backbone with a Convolutional Recurrent Network (CRN) noise representation and reconstruction network. A Multi-Scale Noise Representation Head (MS-NRH) extracts a global noise embedding (Zglobal) to drive a hypernetwork that generates Global LoRA weights, and a local time-varying noise embedding (Zlocal) processed via a Multi-scale Aggregation Gating Fusion (MAGF) module to control frame-level gating in deeper Hierarchical Noise-Conditioned LoRA (HNC) blocks. The network is optimized via a multi-task objective combining Additive Angular Margin (AAM) Softmax speaker loss, explicit noise spectrogram MSE reconstruction loss, and an InfoNCE-based contrastive distillation loss (weighted at 1.0) using a frozen clean-speech teacher model. Experiments use a bottleneck rank r = 4, training for 200 epochs on an NVIDIA A100 GPU.

## Results

Evaluated on the VoxCeleb1 test set using MUSAN seen noises and out-of-domain NonSpeech100 unseen noises, NoiseLoRA-SV achieves an average seen-noise EER of 3.05% and an unseen-noise EER of 3.60%, outperforming baselines like Diff-SV (3.90% seen, 4.65% unseen) and ParaNoise-SV (3.40% seen, 3.90% unseen). Ablations demonstrate that removing contrastive distillation or noise reconstruction increases average EER to 3.34% and 3.47%, respectively. Cross-backbone experiments confirm consistent gains when applied to ECAPA-TDNN (14.73M to 24.19M parameters), HuBERT Base, and WavLM Base+.

## Code

- https://github.com/peter112231/NoiseLoRA-SV

## Applications

Speech and ML engineers building robust speaker recognition or biometric authentication systems for edge and real-world noisy acoustic environments.

## Related

- (link related pages by id as the wiki grows)
