---
id: rubenchik26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1401
pdf: https://www.isca-archive.org/interspeech_2026/rubenchik26_interspeech.pdf
---

# Latent Flow Matching Based Speech Separation Using Speaker Diarization

[PDF](https://www.isca-archive.org/interspeech_2026/rubenchik26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rubenchik26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1401)

**TL;DR** — This paper presents a generative single-channel speech separation framework combining end-to-end speaker diarization with latent flow matching, utilizing an Adversarial Speaker Guidance mechanism to reduce speaker confusion.

## Problem

Traditional discriminative speech separation models often suffer from over-smoothing and perceptual artifacts due to pointwise regression under ambiguous conditions. Meanwhile, generative approaches and target extraction methods frequently experience speaker confusion—extracting the wrong speaker or duplicating voices—when conditioning signals are weak or derived from imperfect diarization segmentation.

## Method

The architecture integrates a frozen End-to-End Neural Diarization with Encoder-Decoder-Based Attractors (EEND-EDA) model to extract per-speaker activity probabilities and attractors from mixtures. These condition a trainable latent-space Flow Matching U-Net via Feature-wise Linear Modulation (FiLM), operating over mel-spectrogram latents produced by a frozen VAE and synthesized via BigVGAN. Permutation Invariant Training (PIT) is employed during training to resolve speaker permutation ambiguities. Additionally, an Adversarial Speaker Guidance (ASG) strategy leverages the estimated vector field of the interfering speaker during inference to actively push the generative process away from the undesired source without requiring retraining.

## Results

The evaluation utilizes mixtures dynamically generated from the LibriSpeech corpus. The proposed method is compared against baseline architectures including ECAPA-TDNN-conditioned variants and traditional systems, demonstrating superior separation quality and intelligibility. The inclusion of Adversarial Speaker Guidance and permutation-aware training yields notable reductions in speaker confusion and improvements in objective perceptual metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers building robust communication, transcription, or multi-talker meeting analysis systems that require high-fidelity separation of overlapping speech without prior speaker enrollment.

## Limitations

The framework relies on pre-trained and frozen VAE, vocoder, and diarization components, meaning separation performance remains bounded by the quality of the upstream diarization estimates.

## Related

- (link related pages by id as the wiki grows)
