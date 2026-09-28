---
id: kolos26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1464
pdf: https://www.isca-archive.org/interspeech_2026/kolos26_interspeech.pdf
---

# Controlled Generation of Synthetic Speaker Vectors for Voice Anonymization

[PDF](https://www.isca-archive.org/interspeech_2026/kolos26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kolos26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1464)

**TL;DR** — The paper introduces attribute-conditioned WGAN-QC and diffusion models with classifier guidance for generating synthetic speaker vectors in voice anonymization, achieving strong attribute control while maintaining privacy and utility.

## Problem

Resynthesis-based voice anonymization substitutes original speaker vectors with artificial ones to protect speaker identity, but unconditional generation methods lack fine-grained control over preserved attributes like gender or age. While latent-space traversal can alter characteristics, explicit and transparent conditioning is needed to maintain specific demographic properties without leaking real identities. This capability is vital for applications requiring human-centric authenticity, such as whistle-blowing or medical data sharing, where balancing privacy and utility remains a key challenge.

## Method

The framework builds on the Voice Privacy Challenge (VPC) 2024 B3 pipeline, which decomposes speech into content, prosody, and 128-dimensional Global Style Token (GST) speaker vectors. The authors extend unconditional WGAN-QC and introduce two conditioning approaches: label-concatenation in cWGAN-QC with class-wise optimal transport, and classifier-guided synthesis using a noise-robust 2-layer MLP classifier for diffusion models. Training utilizes a diverse pool of 1,151 LibriTTS speakers combined with emotional speech datasets (ESD and RAVDESS). The generative models employ residual multi-layer perceptrons with DDIM schedulers for efficient sampling.

## Results

Evaluated on the VPC 2024 benchmark using LibriSpeech for Equal Error Rate (EER) and Word Error Rate (WER), and IEMOCAP for Unweighted Accuracy Rate (UAR), the conditional models achieve high gender classification accuracy (over 90% for both male and female targets) while matching the privacy (EER) and utility (WER/UAR) of unconditional baselines. The study evaluates vector pools using Wasserstein-2 distance, pairwise cosine diversity, and copying similarity against natural embeddings. Downstream text-to-speech synthesis tests on the Harvard sentence corpus confirm high word accuracy and filter out configurations prone to generating corrupted acoustic waveforms.

## Code

- https://github.com/katja-kolos/synthetic-speaker-vectors

## Applications

Speech and ML engineers building privacy-preserving voice anonymization systems, secure text-to-speech applications, or anonymized spoken data pipelines for medical and behavioral research.

## Limitations

Experiments primarily focus on gender matching as a case study, though the framework is designed to support other attributes.

## Related

- (link related pages by id as the wiki grows)
