---
id: hu26g_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2090
pdf: https://www.isca-archive.org/interspeech_2026/hu26g_interspeech.pdf
---

# Singing Voice Conversion via Shared Speaker Space and Min-Pooling Adversarially Enhanced Flow Matching

*Yuye Hu, Ayiduosi Tuohan, Tianqi Ning, CuiCui Zhu, Hao Huang*

[PDF](https://www.isca-archive.org/interspeech_2026/hu26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2090)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — MinFlow-SVC is a singing voice conversion framework utilizing a shared speaker space via KNN mapping and conditional flow matching, enhanced by min-pooling adversarial training to eliminate timbre leakage while maintaining acoustic quality. It achieves a superior zero-shot naturalness NMOS of 3.83 with 10 steps.

## Key contributions

- A KNN-based content extraction mapping that projects source features into a shared, speaker-agnostic space to eliminate source timbre leakage without vector quantization trade-offs.
- A min-pooling adversarial training strategy (DT) applied to the content encoder to detect and repair frame-level splicing discontinuities induced by KNN matching.
- An enhanced conditional flow matching vector field estimator guided by a harmonic-aware min-pooling adversarial loss (DV) and Dynamic Harmonic Masking (DHM).
- Demonstration of state-of-the-art zero-shot performance outperforming traditional So-Vits-SVC, DiffSVC, and NeuCoSVC in naturalness and prosody correlation.

## Problem

Singing voice conversion struggles with a fundamental trade-off between content-timbre disentanglement and generation quality. Vector quantization (VQ) approaches either suffer from fine-grained artifacts or reintroduce source timbre, while standard adversarial methods provide insufficient separation. Frame-level KNN mapping successfully strips timbre but introduces temporal discontinuities and splicing artifacts that degrade perceptual audio quality.

## Method

MinFlow-SVC consists of a content encoder, a vector field estimator, and two discriminators (DT and DV). First, WavLM-large features extracted from the input source are mapped via cosine similarity to a pre-constructed matching pool of a designated shared speaker to yield content features (x_cont). A U-Net content encoder compresses and restores dimensions, optimized by a min-pooling adversarial loss using LS-GAN where the discriminator focuses on the lowest-probability (most discontinuous) patches to enforce temporal smoothness.

For generation, optimal-transport conditional flow matching (OT-CFM) maps standard Gaussian noise to target Mel-spectrograms conditioned on x_cont and target speaker timbre embeddings from a pre-trained speaker encoder. To address spectral blurring in high-frequency harmonics, a harmonic-aware min-pooling adversarial loss is applied using Dynamic Harmonic Masking (DHM). DHM generates a mask M centered on predicted fundamental frequencies (f0) and their harmonics (controlled by parameter sigma). A StyleGAN-based discriminator DV evaluates these masked regions via a min-pooling worst-case constraint, forcing the vector field estimator to repair local transient harmonic distortions. Inference uses an ordinary differential equation (ODE) solver with 1 to 10 steps.

## Experimental setup

Models were trained on the multi-speaker M4singer corpus (10 sentences reserved per speaker for validation). Zero-shot evaluation used 6 random speakers from OpenSinger (10 sentences each), downsampled to 16 kHz. Baselines included So-Vits-SVC, DiffSVC, and NeuCoSVC. Evaluated using 5-scale Naturalness MOS (NMOS), 4-scale Similarity MOS (SMOS), F0 correlation (F0CORR), speaker embedding cosine similarity (SECS), MOSNet, and real-time factor (RTF). The content encoder was trained for 35K steps (batch size 10) and the vector field estimator for 70K steps (batch size 32) using the Adam optimizer at a learning rate of 1e-4 on two NVIDIA RTX 3090 GPUs.

## Results

MinFlow-SVC-10 achieves a top-tier NMOS of 3.83 (vs. So-Vits-SVC at 3.68, DiffSVC at 3.49, NeuCoSVC at 3.59) and an SMOS of 2.65, demonstrating superior perceptual similarity and naturalness. It also reaches an F0-CORR of 0.948 and a MOSNet score of 4.26, outperforming all baseline models. While So-Vits-SVC achieves a slightly higher objective SECS (0.671 vs. 0.663), MinFlow-SVC wins significantly on human-evaluated timbre similarity (SMOS). Ablation studies confirm the necessity of every component: removing min-pooling loss drops NMOS to 3.64 and causes visible spectrogram discontinuities; dropping harmonic-aware adversarial loss (w/o L_adv_harm) drops NMOS to 3.37; and removing DHM drops F0-CORR to 0.928.

| System | RTF | NMOS | SMOS | F0CORR | SECS | MOSNet |
|---|---|---|---|---|---|---|
| GT | - | 4.24 | - | - | - | 4.37 |
| So-Vits-SVC | 0.09 | 3.68 | 2.51 | 0.939 | 0.671 | 3.86 |
| DiffSVC | 0.28 | 3.49 | 2.33 | 0.906 | 0.609 | 3.27 |
| NeuCoSVC | 0.17 | 3.59 | 2.50 | 0.942 | 0.629 | 3.41 |
| MinFlow-SVC-1 | 0.04 | 3.58 | 2.49 | 0.939 | 0.664 | 4.11 |
| MinFlow-SVC-10 | 0.10 | 3.83 | 2.65 | 0.948 | 0.663 | 4.26 |

## Limitations

Evaluated exclusively on Mandarin singing datasets (M4singer and OpenSinger), limiting confirmed generalizability to polyglot or non-tonal singing styles. The framework relies on a pre-trained WavLM-large encoder and an external vocoder (HiFi-GAN), inheriting their potential failure modes. The zero-shot evaluation set is relatively small (6 speakers, 10 sentences each), and the approach requires a two-stage training recipe (freezing the content encoder before training the flow matching network).

## Why read this

Speech and audio researchers tackling timbre disentanglement without vector quantization artifacts should read this to see how min-pooling adversarial losses can effectively fix frame-level splicing flaws in KNN-based and flow matching frameworks.

## Code

- https://linoteye.github.io/minflowsvc/

## Applications

Zero-shot singing voice conversion, cross-lingual/cross-singer timbre transfer, and virtual singer music production.

## Institutions / 機構

Xinjiang University, Xinjiang Key Laboratory of Multi-lingual Information Technology, Joint International Research Laboratory of Silk Road Multilingual Cognitive Computing

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
