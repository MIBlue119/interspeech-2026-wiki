---
id: ozer26_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1822
pdf: https://www.isca-archive.org/interspeech_2026/ozer26_interspeech.pdf
---

# A Training-Free Proactive Defense Against Partial Speech Manipulation via Self-Embedding Steganography

*Yigitcan Özer, Zhe Zhang, Wanying Ge, Xin Wang, Junichi Yamagishi*

[PDF](https://www.isca-archive.org/interspeech_2026/ozer26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ozer26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1822)

**TL;DR** — This paper introduces a training-free, proactive steganographic defense against partial speech manipulation by embedding a self-referential compressed neural codec representation into the audio waveform. It achieves an equal error rate (EER) of 4.4% to 5.1% under two-word swapping attacks, significantly outperforming passive deepfake detectors.

## Key contributions

- First systematic formulation and investigation of self-embedding steganography as a proactive defense mechanism for the audio domain.
- A lightweight, training-free temporally repetitive least significant bit (LSB) embedding scheme that guarantees 100% error-free payload recovery.
- A dynamic time warping (DTW) based dissimilarity score evaluating alignment between a received signal and its codec-based self-reconstruction.
- Comprehensive experimental evaluation demonstrating robustness against word-swapping attacks across multiple vocoders, where passive baselines fail.

## Problem

Real-world deepfake attacks increasingly involve partial manipulations, where short segments of authentic utterances are swapped or replaced with synthetic speech. Existing passive detectors struggle with these localized edits because brief or sparse spoofed regions lack sufficient artifact footprints. Furthermore, identifying boundaries and restoring original content remains extremely difficult for current countermeasures. Proactive methods like watermarking focus primarily on attribution rather than content recovery, necessitating a new defense paradigm.

## Method

The clean audio carrier $x \in \mathbb{R}^T$ sampled at 16 kHz is converted into a compact latent representation $m = f(x)$ using the SNAC neural speech codec (resampled to 24 kHz, operating at 0.98 kbps). This payload, along with a 64-bit synchronization preamble, forms a 1044-bit frame. To survive tampering, the framework applies a temporally repetitive least significant bit (LSB) embedding scheme where message bits are embedded repeatedly at fixed intervals $P = M$. For a 16 kHz signal, this yields 15 non-overlapping repetitions per second, allowing error-free recovery via majority voting at decoding time, even after localized waveform tampering.

At verification time, the received signal $y$ (authentic $\tilde{x}$ or spoofed $\tilde{x}_{sp}$) is decoded back into latents and synthesized into a waveform self-reconstruction $R(y) = g(D(y))$. Because partial manipulations cause temporal and structural inconsistencies, Dynamic Time Warping (DTW) is computed between mel-log spectrogram features of $y$ and $R(y)$ using cosine distance. The resulting per-utterance score $s_{\text{DTW}}(y)$ measures the average alignment mismatch along the optimal warping path $\pi^*$, where higher scores designate manipulation.

The core design choices—using LSB with temporal redundancy and off-the-shelf neural codecs like SNAC—were made to achieve a completely training-free pipeline that avoids large-scale model training while ensuring robustness against localized tampering.

## Experimental setup

Evaluated on a subset of the validation split of the AV-Deepfake1M dataset (derived from VoxCeleb2). Compared against audio-only adaptations of cross-modal partial deepfake detectors LAV-DF, LAV-DF+, and a ResNet-based word deepfake detector. Performance is measured using Equal Error Rate (EER) across 5 re-synthesis models (GriffinLim, HiFiGAN, HNSincNSF, HNSincNSFHiFi, WaveGlow) under single-word and two-word swapping threat models.

## Results

Under single-word swapping, the proposed method achieves an EER ranging from 8.91% to 10.0%, whereas passive baselines LAV-DF, LAV-DF+, and ResNet perform near random (EERs between 43.98% and 50.37%). Under two-word swapping, the proposed method further reduces EER to between 4.44% and 5.10%, while baseline systems remain near chance level (42.07% to 50.11%).

Ablation over swapped-word duration reveals a clear monotonic trend: manipulations shorter than 0.1 seconds yield higher error rates (EER > 20%), whereas insertions longer than 0.3 seconds drop below 10% EER due to stronger structural mismatches in DTW self-reconstruction.

| System | Single-Word Swap EER (%) | Two-Word Swap EER (%) |
|---|---|---|
| LAV-DF [7] | ~50.17 - 50.37 | ~49.96 - 50.11 |
| LAV-DF+ [8] | ~49.90 | ~48.34 - 48.62 |
| ResNet [41] | ~43.98 - 47.52 | ~42.07 - 46.44 |
| **Ours (Proposed)** | **8.91 - 10.00** | **4.44 - 5.10** |

## Limitations

The approach assumes cooperation from the audio distributor to apply the self-embedding steganography prior to release, making it inapplicable to legacy or unwatermarked audio. Extremely brief manipulations (under 0.1 seconds) degrade detection sensitivity, pushing EER above 20%. The current proof-of-concept is validated exclusively on word-swapping attacks derived from VoxCeleb2 data without evaluation against heavy downstream lossy compression or multi-hop transmission channels.

## Why read this

Researchers and engineers working on audio security will learn how to bypass the limitations of passive deepfake detectors by framing partial spoofing detection as a self-reconstruction steganography task.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Secure media distribution pipelines, broadcast authentication, and proactive forensics for verifying the authenticity of speech recordings.

## Related

- (link related pages by id as the wiki grows)
