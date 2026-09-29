---
id: qin26b_interspeech
category: deepfake-security
labels: [self-supervised, robustness-noise]
institutions: ["Hong Kong Polytechnic University", "University of Hong Kong"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1778
pdf: https://www.isca-archive.org/interspeech_2026/qin26b_interspeech.pdf
---

# Domain-Adaptive Dual-Gating Mixture of Experts for Generalizable Speech Deepfake Detection

*Siqing Qin, Zhe Li, Kong Aik Lee, Man-Wai Mak*

[PDF](https://www.isca-archive.org/interspeech_2026/qin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/qin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1778)

**Category:** `deepfake-security` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — The paper introduces DADGMoE, a domain-adaptive dual-gating Mixture of Experts framework that processes both raw audio waveforms and self-supervised representations to improve speech deepfake detection under unseen conditions, achieving up to a 40.8% relative EER reduction.

## Key contributions

- A dual-gating mechanism using Sinc-layer-based band-pass filters to extract low-level waveform artifacts and a depthwise Sinc layer on SSL features to capture high-level temporal inconsistencies.
- Learnable domain prototypes within the routing network that use cosine similarity to guide experts based on implicit deepfake patterns without needing explicit domain labels.
- Extremely lightweight affine experts implemented as single Batch Normalization layers with learnable gamma and beta parameters, adding only 0.17M parameters.
- Comprehensive validation showing substantial out-of-domain improvements across ASVspoof 2021 Deepfake, In-the-Wild, and Fake-or-Real benchmarks.

## Problem

Speech deepfake detectors often fail when deployed in the wild due to distribution shifts caused by unseen spoofing algorithms, varying acoustic environments, and codecs. Traditional mixture of experts architectures rely on generic feed-forward routing networks that completely ignore speech-specific acoustic and temporal artifacts. Furthermore, existing models struggle to generalize across diverse domains because they lack explicit mechanisms to route samples based on underlying artifact characteristics, resulting in high error rates on out-of-dataset benchmarks like In-the-Wild.

## Method

The DADGMoE framework attaches an MoE module containing N lightweight affine experts to a pre-trained XLSR self-supervised backend. The routing decision is handled by a dual-gating network consisting of two parallel branches: a waveform branch and an SSL-feature branch. The waveform branch passes raw audio through a Sinc layer of learnable band-pass filters, followed by a 1D convolution and global average pooling to yield a 128-dimensional embedding targeting low-level physical artifacts. The SSL branch passes frame-level representations through a channel-mixing 1D convolution, a depthwise Sinc layer for channel-specific filtering, two residual blocks, and attentive pooling to target higher-level temporal dynamics.

To compute routing weights, the system combines content logits (derived from concatenating both gating embeddings followed by a linear layer) and prototype logits (computed via cosine similarity between the SSL embedding and N learnable domain prototypes). These are fused using a learnable scalar alpha and temperature, followed by softmax normalization. Each affine expert is implemented solely as a Batch Normalization layer utilizing expert-specific learnable scale gamma and shift beta parameters alongside running statistics, allowing efficient adaptation to distinct deepfake distributions.

During inference, a top-k routing strategy (specifically setting k=2 out of N=5 experts) selects the most compatible experts to transform the intermediate features via a weighted sum, which are then passed to an AASIST classification backend. The network is trained using cross-entropy loss, Adam optimization with a learning rate of 1e-6, and Rawboost data augmentation.

## Experimental setup

Models were trained on the ASVspoof 2019 LA training set and evaluated on multiple out-of-domain datasets: ASVspoof 2021 Deepfake (21DF), In-the-Wild (ITW), Fake-or-Real (FoR), and ADD 2023 test sets (ADDR1 & ADDR2). Evaluation is reported using Equal Error Rate (EER). The backbone utilizes XLSR with an AASIST classifier, trained with batch size 20 on a single Nvidia 4090 GPU.

## Results

DADGMoE achieves an EER of 2.54% on 21DF (31.2% relative reduction), 6.35% on ITW (39.3% relative reduction), and 4.42% on FoR (40.8% relative reduction compared to the XLSR-AASIST baseline of 7.47%). Ablations demonstrate that removing raw-waveform gating causes catastrophic failure on the FoR dataset (increasing EER by 8.25%), while dropping domain prototypes increases ITW EER by 2.11%. A top-k value of k=2 achieves the optimal balance, whereas activating too many experts (k >= 3) degrades domain specialization.

| System | 21DF (EER%) | ITW (EER%) | FoR (EER%) |
|---|---|---|---|
| XLSR-AASIST | 3.69 | 10.46 | 7.47 |
| XLSR-MoE [9] | 2.54 | 9.17 | - |
| XLSR-SLS [30] | 1.92 | 7.46 | 5.07 |
| DADGMoE (k=2) | 2.54 | 6.35 | 4.42 |

## Limitations

The framework's evaluation is primarily restricted to English-centric or standard benchmark spoofing datasets, leaving multilingual and low-resource deepfake resilience under-explored. While parameter efficiency is high, the reliance on frozen or fine-tuned massive SSL backbones like XLSR implies heavy compute requirements during feature extraction. Additionally, performance heavily depends on the careful tuning of the top-k parameter and the number of initialized domain prototypes.

## Why read this

Speech and ML security researchers looking to design parameter-efficient, generalizable mixture-of-experts architectures without scaling up backbone parameters will find this a blueprint for combining raw-audio band-pass filtering with prototype-guided routing.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech deepfake detection systems for telephony security, automated media verification, and audio forensics against unseen voice cloning attacks.

## Institutions / 機構

Hong Kong Polytechnic University, University of Hong Kong

**Funding / 經費:** Innovation and Technology Fund of the Hong Kong SAR, National Key R&D Program of China

## Related

- [Diffusion Reconstruction towards Generalizable Audio Deepfake Detection](cheng26_interspeech.md) — same problem · relatedness 2.9/3
- [Supervised Post-training of Speech Foundation Models for Robust Adaptation in Speech Deepfake Detection](pan26_interspeech.md) — same problem · relatedness 2.9/3
- [Mixture of Spectral Experts for Audio Deepfake Detection](qiu26_interspeech.md) — same problem · relatedness 2.9/3
- [ProSDD: Learning Prosodic Representations for Speech Deepfake Detection against Expressive and Emotional Attacks](mahapatra26_interspeech.md) — same problem · relatedness 2.9/3
- [Improving Generalization in Speech Deepfake Detection via Orthogonality-Constrained Common-Specific Feature Decorrelation](kim26l_interspeech.md) — same problem · relatedness 2.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
