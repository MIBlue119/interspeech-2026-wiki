---
id: gao26_interspeech
category: speaker
labels: [efficient-on-device, robustness-noise]
institutions: ["Soochow University", "Beijing Jiaotong University", "Renmin University of China", "Qilu University of Technology", "Shandong Academy of Sciences"]
code: https://github.com/peter112231/NoiseLoRA-SV
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-64
pdf: https://www.isca-archive.org/interspeech_2026/gao26_interspeech.pdf
---

# NoiseLoRA-SV: Hierarchical Noise-Conditioned Adaptation with Embedding Distillation for Robust Speaker Verification

*Dai Gao, Chen Jiang, Sizhe Liu, Peng Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/gao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-64)

**Category:** `speaker` · **Labels:** `efficient-on-device`, `robustness-noise`

**TL;DR** — NoiseLoRA-SV is a dynamic, parameter-efficient adaptation framework for noise-robust speaker verification that uses a CRN-based hypernetwork and local gating to modulate backbone weights on-the-fly, achieving an average EER of 3.05% on seen noisy conditions.

## Key contributions

- Proposed a hierarchical noise-conditioned LoRA framework using a hypernetwork driven by global noise representations to dynamically adapt model weights.
- Designed a time-varying frame-level gating mechanism conditioned on local multi-scale noise embeddings to handle non-stationary and transient noise.
- Integrated explicit noise spectrogram reconstruction and a supervised InfoNCE contrastive distillation objective to align noisy features with the clean speaker manifold.
- Demonstrated cross-backbone applicability and robust generalization across both in-domain (MUSAN) and out-of-domain (NonSpeech100) noise environments.

## Problem

Standard speaker verification (SV) backends rely on static parameters during inference, which restricts their representational capacity against dynamic background noise. Separately trained speech enhancement frontends often introduce disruptive artifacts that distort speaker embeddings, while joint adversarial methods or large-scale SSL models impose high computational demands on resource-constrained devices. Standard Low-Rank Adaptation (LoRA) variants also fail because their fixed low-rank matrices lack real-time responsiveness to non-stationary acoustic fluctuations. Resolving this balance between noise suppression and speaker-discriminative preservation without heavy full-network retraining is essential for real-world secure authentication.

## Method

NoiseLoRA-SV consists of two tightly coupled branches: a Noise Representation and Reconstruction Network (CRN-based) and a Speaker Encoder (ECAPA-TDNN backbone). The CRN processes noisy log-Mel spectrograms using four encoder stages (E1-E4), a bottleneck (R), and four decoder stages (D1-D4) with skip connections to explicitly reconstruct the noise spectrogram via MSE supervision (L_noise).

A Multi-Scale Noise Representation Head (MS-NRH) attached to the noise encoder extracts a global noise embedding Z_global via global average pooling on E4, and a local multi-scale noise embedding Z_local by aligning and fusing features E2-E4 through a Multi-scale Aggregation Gating Fusion (MAGF) module. In the speaker encoder, Global LoRA (G) blocks in shallower layers take Z_global and use a hypernetwork to dynamically generate low-rank projection matrices (rank r=4, Swish activation) for macro acoustic adaptations via residual injection. Deeper layers employ Hierarchical Noise-Conditioned LoRA (HNC) blocks, which additionally map Z_local via a convolutional network to a Sigmoid frame-level gating sequence g to modulate the LoRA path element-wise for transient interference.

The framework is optimized with a multi-task objective: Additive Angular Margin (AAM) Softmax loss for speaker classification (L_spk), noise reconstruction MSE (L_noise, weighted 0.1), and a supervised InfoNCE contrastive distillation loss (L_dist, weighted 1.0) using a frozen clean-speech teacher. The InfoNCE denominator masks out same-speaker samples to prevent false negatives. Training runs for 200 epochs with the Adam optimizer, batch size 300, learning rate 0.001 (decayed by 0.97/epoch, backbone scaled by 0.1), and LoRA scaling alpha=8.

## Experimental setup

Evaluated using base clean speech from the VoxCeleb1 training set mixed with the MUSAN corpus for seen in-domain noise (0-20 dB SNR) and the NonSpeech100 dataset for unseen out-of-domain evaluation. Performance is measured via Equal Error Rate (EER) on the VoxCeleb1 test set. Implemented on an NVIDIA A100 GPU with 3-second speech crops producing 80-dimensional log-Mel spectrograms and 192-dimensional speaker embedding vectors, comparing against baselines such as NDML, Diff-SV, NA-ExU-Net, and ParaNoise-SV.

## Results

NoiseLoRA-SV achieves an average EER of 3.05% across seen MUSAN noise conditions and 1.70% on clean speech, outperforming static and joint baselines such as Diff-SV (3.90%) and ParaNoise-SV (3.40%). On the unseen NonSpeech100 out-of-domain dataset, it yields an average EER of 3.60%, demonstrating superior generalization compared to Diff-SV (4.65%) and ParaNoise-SV (3.90%).

Ablations confirm that removing the contrastive distillation (w/o Distill) raises the average EER to 3.34%, while omitting noise loss (w/o NoiseLoss) increases it to 3.47%. Explicit noise reconstruction outperforms alternative attribute-estimation methods (Class+SNR variant yielding 4.09% unseen EER vs 3.60% for NoiseLoRA-SV).

| Systems / Conditions | Clean EER (%) | Seen Avg. EER (%) | Unseen Avg. EER (%) |
|---|---|---|---|
| Diff-SV [10] | 2.35 | 3.90 | 4.65 |
| NA-ExU-Net [30] | 1.99 | 3.71 | 4.25 |
| ParaNoise-SV [33] | 1.75 | 3.40 | 3.90 |
| LoRA (static) | 1.84 | 3.28 | - |
| NoiseLoRA-SV (full) | 1.70 | 3.05 | 3.60 |

## Limitations

The framework introduces parameter overhead by augmenting backbones with auxiliary CRN networks and LoRA blocks (expanding ECAPA-TDNN parameters from 14.73M to 24.19M). Evaluation is limited to standard benchmark corpora (VoxCeleb1, MUSAN, NonSpeech100) and short 3-second speech crops, leaving open-domain real-world streaming deployment latency and multi-talker overlap untested.

## Why read this

Researchers and engineers working on noise-robust speaker verification and parameter-efficient fine-tuning will find a novel blueprint for combining hypernetworks with frame-level temporal gating for instance-adaptive feature alignment.

## Code

- https://github.com/peter112231/NoiseLoRA-SV

## Applications

Robust biometric speaker authentication, secure voice-controlled edge devices, and forensic speaker recognition in adverse acoustic environments.

## Institutions / 機構

Soochow University, Beijing Jiaotong University, Renmin University of China, Qilu University of Technology, Shandong Academy of Sciences

## Related

- [Mixture Consistency Learning for Robust Speaker Verification in Noisy Environments](kim26c_interspeech.md) — same problem · relatedness 2.8/3
- [Revisiting Label-Free Speaker Embedding Enhancement with vMF Profile Likelihood](kim26i_interspeech.md) — same problem · relatedness 2.4/3
- [Temporal Ensembling Threshold and Neighbor-Aware Label Mixup for Speaker Verification with Open-Set Noisy Labels](fang26_interspeech.md) — same problem · relatedness 2.3/3
- [Speaker Verification with Speech-Aware LLMs: Evaluation and Augmentation](thebaud26_interspeech.md) — same problem · relatedness 2.2/3
- [Adapting Audio Large Language Models for Speaker Verification](ren26c_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
