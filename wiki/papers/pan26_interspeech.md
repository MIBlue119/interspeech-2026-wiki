---
id: pan26_interspeech
category: deepfake-security
labels: [self-supervised, robustness-noise]
institutions: ["Agency for Science, Technology and Research"]
code: https://github.com/pandarialTJU/Mix-Frame-Post-Training
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-908
pdf: https://www.isca-archive.org/interspeech_2026/pan26_interspeech.pdf
---

# Supervised Post-training of Speech Foundation Models for Robust Adaptation in Speech Deepfake Detection

*Zihan Pan, Sailor Hardik, Jinyang Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/pan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-908)

**Category:** `deepfake-security` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — The paper introduces Mix-Frames Post-Training (MFPT), a perturbation-driven intermediate training strategy with frame-level supervision that adapts speech foundation models for robust deepfake detection. It achieves a state-of-the-art single-model EER of 4.50% on ASVspoof5 without data augmentation and high cross-condition stability on ASVspoof2021.

## Key contributions

- Proposed Mix-Frames Post-Training (MFPT) to construct localized perturbations and inject frame-level supervision before utterance-level fine-tuning.
- Demonstrated consistent improvements in out-of-domain and low-resource adaptation settings across ASVspoof 2019, 2021, and ASV5 benchmarks.
- Showed that post-training increases sensitivity to local spectral and phase irregularities (such as abrupt temporal or spectral discontinuities) associated with synthetic speech.
- Achieved state-of-the-art performance for a single unaugmented model on ASVspoof5 (4.50% EER) with an exceptionally balanced LA-DF gap (0.16%) on ASVspoof2021.

## Problem

Large speech foundation models like WavLM and HuBERT are pre-trained on masked prediction or contrastive objectives that prioritize phonetic and speaker-related structure over the subtle, localized artifacts characterizing audio deepfakes. Direct end-to-end fine-tuning with utterance-level supervision often gets diluted by dominant phonetic content, causing models to overfit to known attack types or struggle in low-resource and out-of-domain settings. Spoofing cues typically occupy only small fractions of an utterance through abrupt temporal or spectral boundaries, making an intermediate representation-shaping stage essential for robust detection.

## Method

The framework operates in three stages using WavLM-Large as the backbone encoder. In Stage 1 (Mix-Frame Perturbation Generation), waveforms are fixed-length padded or cropped to 64,600 samples (4s duration). A cut-and-paste splicing operation replaces a segment of a base utterance with a segment drawn from an injector utterance of the opposite class, using a splice mix ratio $r^{\text{mix}}$ uniformly sampled in [10%, 30%]. Frame-level binary labels are automatically assigned based on whether each frame's center falls within the injected boundary.

In Stage 2 (Post-training), a lightweight linear frame classifier $q_\psi$ with Xavier uniform weights is attached to the $L$-th layer frame features. The encoder is updated using binary cross-entropy loss over frame predictions. To minimize parameter updates, Low-Rank Adaptation (LoRA) adapters with rank $32$ are applied to self-attention projections ($W_Q, W_K, W_V$) and feed-forward dense networks ($W_{\text{fc}1}, W_{\text{fc}2}$), while backbone weights remain frozen. The classifier $q_\psi$ is then discarded.

In Stage 3 (Fine-tuning), the post-trained encoder with LoRA weights is preserved and paired with an attentive merging (AttM) module and an utterance-level task classifier (comparing LSTM, ECAPA-TDNN, and Nes2Net backends). The model is optimized end-to-end using cross-entropy loss on utterance-level labels. Training utilizes 4 NVIDIA H200 GPUs with DDP, a batch size of 256, and learning rates set to $4 \times 10^{-4}$ for post-training and $5 \times 10^{-5}$ for fine-tuning.

## Experimental setup

Evaluated on ASVspoof 2019 LA, ASVspoof 2021 LA and DF, and ASVspoof 5 (ASV5) datasets following official train/dev/eval splits. Compared against diverse baselines including Wav2vec2-XLSR, WavLM+MFA, SLIM, and MoLEx. Metrics reported use Equal Error Rate (EER %). Implemented using PyTorch on 4 NVIDIA H200 GPUs with WavLM-Large backbone.

## Results

On ASVspoof5, the method achieves 4.50% EER, outperforming single models like MoLEx (5.56%) and SLIM (5.50%) without requiring data augmentation or complex score fusion. On ASVspoof2021, it achieves a competitive average EER of 3.96% with a minimal absolute LA-DF gap of 0.16% (ASV21LA 3.88%, ASV21DF 4.04%), demonstrating superior cross-condition stability compared to augmentation-dependent baselines.

Ablations on the mix ratio $r^{\text{mix}}$ confirm that 10–30% mixing achieves the optimal 4.50% EER, whereas aggressive mixing like 50–70% degrades performance to 7.31% EER. Low-resource evaluations using fractions of ASV19LA show that post-training heavily cushions performance drops when target data is scarce (e.g., at 20% training data, ASV21DF EER drops from 9.32% to 4.34% with post-training).

| System / Condition | ASV21LA EER (%) | ASV21DF EER (%) | Avg. EER (%) | Gap (|LA - DF|) |
|---|---|---|---|---|
| Wav2vec2-XLSR [19] | 7.18 | 5.44 | 6.31 | 1.74 |
| Donas et al. [20] | 3.54 | 4.98 | 4.26 | 1.44 |
| WavLM + MFA [21] | 5.08 | 2.56 | 3.82 | 2.52 |
| WavLM + ASP [22] | 3.31 | 4.47 | 3.89 | 1.16 |
| **Ours (MFPT)** | 3.88 | 4.04 | 3.96 | **0.16** |

## Limitations

The evaluation is restricted to binary logical access and deepfake detection benchmarks (ASVspoof 2019/2021/5) and does not cover physical access or compressed telephony environments. The method relies heavily on WavLM-Large as the fixed SSL backbone, and scaling behavior to even larger or multilingual foundational encoders remains unexplored.

## Why read this

Researchers and practitioners working on audio deepfake detection or speech foundation model adaptation should read this paper to learn how intermediate mix-frame post-training with localized frame supervision can dramatically improve out-of-domain generalization and low-resource robustness.

## Code

- https://github.com/pandarialTJU/Mix-Frame-Post-Training

## Applications

Automated voice biometric security systems, media forensics tools, and online trust and safety software designed to detect synthetic speech and voice conversion attacks across diverse compression codecs.

## Institutions / 機構

Agency for Science, Technology and Research

## Related

- [Towards Robust Speech Deepfake Detection via Human-Inspired Reasoning](dvirniak26_interspeech.md) — same problem · relatedness 2.9/3
- [Domain-Adaptive Dual-Gating Mixture of Experts for Generalizable Speech Deepfake Detection](qin26b_interspeech.md) — same problem · relatedness 2.9/3
- [Does Fine-tuning by Reinforcement Learning Improve Generalization in Binary Speech Deepfake Detection?](wang26k_interspeech.md) — same problem · relatedness 2.8/3
- [Quantizer-Aware Hierarchical Neural Codec Modeling for Speech Deepfake Detection](wu26n_interspeech.md) — same problem · relatedness 2.8/3
- [ProSDD: Learning Prosodic Representations for Speech Deepfake Detection against Expressive and Emotional Attacks](mahapatra26_interspeech.md) — same problem · relatedness 2.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
