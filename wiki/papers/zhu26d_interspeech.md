---
id: zhu26d_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3245
pdf: https://www.isca-archive.org/interspeech_2026/zhu26d_interspeech.pdf
---

# DASM: Detecting AI-Synthetic Music via Authentic Manifold Deviation Modeling

*Xinya Zhu, Mengyu Qiao, Wenqiang Li, Zhihui Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3245)

**TL;DR** — DASM is an AI-synthetic music detection framework that models the stable manifold of authentic audio using a learnable memory bank, identifying forgeries via manifold-space deviation rather than tracking generator-specific artifacts. It achieves a state-of-the-art 0.13% Equal Error Rate on the SONICS dataset.

## Key contributions

- A real-audio-anchored detection paradigm that reframes audio forensics from tracking evolving generator artifacts to measuring geometric deviation from an authentic distribution.
- A decoupled two-phase training strategy where a memory bank is first trained exclusively on real audio via reconstruction loss, followed by frozen-memory classification.
- A dual-branch classifier that concatenates absolute audio representations and their directional/magnitude departures from the real audio manifold.
- A Parameter-Efficient Fine-Tuning (PEFT) strategy utilizing 10 learnable prompt tokens per layer to adapt a frozen MERT-330M encoder with minimal parameter updates.

## Problem

Current audio deepfake and music spoofing detectors rely on discriminative paradigms that fit decision boundaries to known fake distributions (e.g., using models like AASIST, RawNet2, or SingGraph). As generative models evolve rapidly (such as Suno and Udio), these classifiers suffer from structural vulnerability and blind spots under distribution shift because they learn generator-specific artifacts instead of intrinsic authenticity properties. This matters because robust detection requires generalizing to unseen synthesis algorithms without constantly retraining on every new generator.

## Method

The DASM framework is structured into two distinct training phases built on top of a frozen MERT-330M music encoder. In Phase 1, a memory bank matrix $B \in \mathbb{R}^{N \times D}$ (with $N=2048$ orthogonal learnable priors) is optimized exclusively on real music samples. Using sparse multi-head cross-attention (retrieving top-$k=64$ entries), input features $F_{orig}$ are projected onto the memory bank to yield reconstructed features $F_{recon}$. The objective combines an MSE reconstruction loss with an orthogonality regularization term ($\beta = 0.1$) to ensure manifold diversity, updated for 10 epochs using AdamW ($\eta_1 = 10^{-4}$). 

In Phase 2, the memory bank and MERT encoder are frozen while a lightweight prompt-tuning strategy prepends $N_p = 10$ learnable prompt tokens ($10,240$ parameters) to the encoder. The system extracts original features $z_{orig}$ and reconstructed features $z_{recon}$ via average pooling, computing the deviation vector as $z_{dev} = z_{orig} - z_{recon}$. Branch 1 processes absolute characteristics ($z_{orig}$) and Branch 2 processes geometric departures ($z_{dev}$). Both branches are fused via concatenation and passed to a classifier optimized jointly with Cross-Entropy and A-Softmax loss ($m=4$, $s=30$, $\alpha=0.5$) for 20 epochs using AdamW ($\eta_2 = 2 \times 10^{-5}$).

## Experimental setup

Evaluated primarily on the SONICS dataset (97,164 songs; 48,090 real from YouTube, 49,074 synthetic from Suno/Udio sampled at 24 kHz; 7:1:2 split). Cross-dataset evaluation uses FakeMusicCaps (39,056 clips across 5 generators). Compared against traditional/speech baselines (M5, RawNet2, AASIST, SSL Anti-spoofing) and music-specific baselines (SingGraph, WPT-XLSR-AASIST). Metrics include Equal Error Rate (EER), Accuracy (ACC), and Area Under Curve (AUC). Implemented with PyTorch on an RTX 4090 using 10-second audio clips (240,000 samples).

## Results

On the SONICS test set, DASM achieves a headline 0.13% EER, 99.89% ACC, and 99.98% AUC, heavily outperforming the strongest baseline WPT-XLSR-AASIST (1.04% EER). Ablation studies confirm that removing the memory bank degrades EER to 0.52%, relying solely on original features yields 0.43% EER, and dropping prompt tuning spikes EER to 0.89%. Under heavy acoustic degradations (heavy stationary noise, compression, and impulse responses), DASM maintains strong stability with an average accuracy drop of only 1.74% compared to 4.7% for WPT-XLSR-AASIST. However, under strict cross-dataset evaluation on FakeMusicCaps, absolute performance drops significantly to 25.59% EER, illustrating that cross-domain generalization remains a formidable challenge.

| Method | EER (%) | ACC (%) | AUC (%) |
|---|---|---|---|
| M5 | 15.22 | 87.88 | 91.51 |
| AASIST | 2.40 | 97.78 | 99.12 |
| SingGraph | 1.59 | 98.47 | 99.73 |
| WPT-XLSR-AASIST | 1.04 | 98.91 | 99.94 |
| **DASM (ours)** | **0.13** | **99.89** | **99.98** |

## Limitations

While DASM avoids overfitting to known generators, its cross-dataset EER degrades to 25.59% on FakeMusicCaps, revealing an acoustic domain gap between different training and evaluation corpora. The framework relies heavily on a high-capacity pre-trained music SSL model (MERT-330M) and a large memory bank, which imposes memory overhead during feature projection. The scope is primarily validated on full-track musical compositions, leaving partial vocal-only or purely instrumental mixed generations less deeply analyzed under diverse real-world mixing conditions.

## Why read this

Researchers and audio security engineers working on robust deepfake detection should read this paper to understand how unsupervised manifold modeling of real audio can replace brittle, generator-dependent discriminative classification.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated moderation of AI-generated music on streaming platforms, copyright protection enforcement against unauthorized deepfake tracks, and forensic verification of authentic musical compositions.

## Related

- (link related pages by id as the wiki grows)
