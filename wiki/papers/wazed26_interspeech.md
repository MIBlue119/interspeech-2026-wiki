---
id: wazed26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-883
pdf: https://www.isca-archive.org/interspeech_2026/wazed26_interspeech.pdf
---

# CLEAR: Clinical LLM Embedding and Attention-based Reconstruction

*Eashita Wazed, Hieyong Jeong, Choonsung Shin, Shima Okada*

[PDF](https://www.isca-archive.org/interspeech_2026/wazed26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wazed26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-883)

**TL;DR** — CLEAR is a three-stage heart sound restoration framework combining a pretrained Whisper encoder, a Masked Graph Attention Network, and a Latent GAN to denoise clinical auscultation recordings, achieving a peak PESQ of 4.64 and SI-SDR of 64.35 dB under 10 dB SNR environmental noise.

## Key contributions

- Introduces CLEAR, a modular framework using pretrained Whisper embeddings to capture long-range physiological periodicity (S1, S2, and murmurs) in heart sounds.
- Proposes a Masked Graph Attention Network (GAT) with a bounded hypothesis space that guarantees a tighter generalization error bound and avoids unconstrained direct regression.
- Applies a Latent GAN operating in a low-dimensional embedding space to heal multiplicative masking holes and resolve exponential Wasserstein distance penalties found in high-dimensional waveform GANs.
- Demonstrates exceptional restoration performance on the BUET Multi-Disease Heart Sound Dataset mixed with 10 dB SNR hospital background noise.

## Problem

Traditional heart sound enhancement relies on simple bandpass filters and wavelet transforms, which fail under complex, non-stationary clinical noise or when noise overlaps with cardiac frequency bands. Modern data-driven deep learning models using CNNs or RNNs struggle because their local receptive fields lack high-level semantic understanding of the global cardiac cycle, leading to musical noise and obscured murmurs. This failure in noise suppression severely obstructs both physician auscultation and downstream computer-aided diagnostic systems, causing critical misdiagnoses.

## Method

The architecture operates in three sequential stages. First, raw audio is passed through a pretrained Whisper encoder to extract high-dimensional semantic embeddings. Unlike local CNNs with exponential mutual information decay, Whisper's self-attention maintains a stable lower bound of non-zero mutual information globally across the entire cardiac cycle sequence.

Second, these embeddings form a semantic graph fed into a Masked Graph Attention Network (GAT), which computes attention coefficients to predict a bounded noise-suppression mask within [0, 1]. Applying this mask via element-wise multiplication isolates pure heart sounds while leveraging statistical learning theory to bound Rademacher complexity and generalization error.

Third, to repair holes created by multiplicative masking, a Latent GAN operates entirely within a low-dimensional dense embedding space. The generator heals the masked representations, regularized by a Cosine Similarity semantic loss combined with an adversarial loss from a 1-Lipschitz continuous discriminator. Finally, a lightweight acoustic decoder maps the restored embeddings back to the time-domain waveform.

## Experimental setup

Evaluated using the BUET Multi-Disease Heart Sound Dataset containing normal and pathological recordings (S1, S2, murmurs). Input mixtures were constructed by synthesizing environmental noise (conversations, medical equipment, reverberations) at a harsh 10 dB SNR. Baselines compared in ablations include CNN encoders, direct GAT regression, CNN separation modules, and Diffusion models. Metrics include PESQ, SI-SDR, Log-Spectral Distance (LSD), CBAK, and COVL, evaluated via a dual-input reference protocol.

## Results

Under peak conditions with 10 dB SNR environmental noise, the noisy input degraded to a PESQ of 1.03 and SI-SDR of -29.37 dB, whereas the proposed CLEAR framework restored it to a peak PESQ of 4.64 and SI-SDR of 64.35 dB. Dataset-averaged evaluations show the full Whisper + GAT + GAN architecture achieves an average PESQ of 2.99, LSD of 1.78, CBAK of 2.67, and COVL of 3.38.

Ablations demonstrate that replacing Whisper with a CNN encoder causes severe degradation, substituting GAT with a CNN worsens spectral distortion (LSD rising to 3.55), and replacing the Latent GAN with a Diffusion model leads to overall metric drops.

| System / Condition | PESQ | SI-SDR (dB) | LSD | CBAK | COVL |
|---|---|---|---|---|---|
| Noisy Input | 1.03 | -29.37 | - | - | - |
| CNN + GAT + GAN (Avg) | 1.04 | - | 1.93 | 2.13 | 2.42 |
| Whisper + CNN + GAN (Avg) | 1.03 | - | 3.55 | 2.14 | 2.58 |
| Whisper + GAT + Diff (Avg) | 1.03 | - | 3.86 | 2.17 | 2.47 |
| **Whisper + GAT + GAN (Proposed, Avg)** | **3.00** | - | **1.79** | **2.67** | **3.39** |
| **Enhanced Output (Proposed, Peak)** | **4.64** | **64.36** | - | - | - |

## Limitations

The evaluation relies on artificially synthesized noise mixtures at a fixed 10 dB SNR rather than unconstrained in-the-wild recordings captured directly from diverse stethoscope hardware. The framework's generalization across various unseen clinical pathologies, extremely low-resource hardware deployment constraints, and real-time streaming latency are not thoroughly quantified.

## Why read this

Speech and audio engineers working on bio-acoustic enhancement or representation learning will learn how to adapt pretrained speech LLMs and latent GANs for non-speech physiological signals while avoiding high-dimensional manifold collapse.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart electronic stethoscopes, telemedicine diagnostic platforms, and robust frontend denoising for automated computer-aided cardiac disease classification systems.

## Related

- (link related pages by id as the wiki grows)
