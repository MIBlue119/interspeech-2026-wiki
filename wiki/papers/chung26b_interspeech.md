---
id: chung26b_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2770
pdf: https://www.isca-archive.org/interspeech_2026/chung26b_interspeech.pdf
---

# Robust Audio-Visual Emotion Recognition via Conditional Transformer U-Nets with Frequency-Injected Visual Stream

*Hanwook Chung*

[PDF](https://www.isca-archive.org/interspeech_2026/chung26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chung26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2770)

**TL;DR** — This paper presents a convolutional transformer-based dual U-Net framework for robust audio-visual emotion recognition under severe noise and reverberation, achieving 89.14% UAR on CREMA-D.

## Key contributions

- A dual U-Net architecture (ASM and VSM) utilizing convolutional transformers (CTr) to learn modality-specific bottlenecks for emotion recognition.
- An inverse-filtering speech front-end operating in the log-Mel filterbank domain that directly targets both additive noise and strong room reverberation.
- A frequency-injected visual stream module applying 1D FFT along spatial dimensions to fuse spatial and spectral facial expression cues.
- Emotion-conditioned auxiliary decoders that reconstruct intermediate features to regularize training and reinforce cross-modal consistency.

## Problem

Real-world speech emotion recognition (SER) and audio-visual emotion recognition (AVER) degrade severely under adverse acoustic environments like background noise and reverberation. Prior work has largely relied on unconditioned data augmentation or masking-based speech enhancement that fails under strong reverberation, while visual emotion recognition (VER) methods rarely incorporate frequency-domain spectral cues to capture subtle facial dynamics. Addressing this gap is critical for deploying reliable affective computing systems in real-world interactive and healthcare environments.

## Method

The framework features an Audio Stream Module (ASM) and a Visual Stream Module (VSM) acting as encoders feeding into a joint fusion emotion decoder. The ASM processes 64-dimensional log-Mel filterbank (LMFB) features extracted via a 512-sample Hamming window with 50% overlap. Its front-end employs an inverse-filtering convolutive transfer function (CTF) model, multiplying time-shifted stacked LMFB frames by a time-varying inverse filter of length P to directly mitigate noise and reverberation. The ASM and VSM U-Nets leverage convolutional transformers (CTr) where query, key, and value vectors are processed via 3x3 temporal convolutions and multi-head attention across heads H = {4, 8, 16, 16}. 

The VSM utilizes EfficientFace for facial feature extraction from video frames downsampled temporally by a factor of 4. Its CTr blocks integrate a frequency-injected process: a 1D fast Fourier transform (FFT) is applied along the spatial dimensions of Q, K, and V, and their log-magnitude spectra are convolved with a 3x3 kernel before channel-wise concatenation with the spatial features. Auxiliary feature decoders reconstruct intermediate unimodal features by taking predicted emotion embeddings, aligning them via time-stretching, and applying channel-wise concatenation, convolutions, and residual connections.

The fused emotion decoder aligns the compressed bottleneck features temporally, passes them through a CTr block, and incorporates a Prompt Generation Module (PGM) that learns emotion-specific prompts (CP = 256) via element-wise operations and concatenation. Training proceeds in two stages: first, the speech front-end is optimized using mean-absolute error (MAE) on clean speech LMFBs; second, the front-end is frozen while the rest of the network is trained end-to-end using cross-entropy loss for emotion classification combined with MAE reconstruction losses weighted by lambda = 10^-3 for both modalities.

## Experimental setup

Experiments use CREMA-D (6 emotions, 4s max clips), RAVDESS (8 emotions, 4s clips), and IEMOCAP (4 emotions, improvised and combined sessions, 8s clips). Acoustic degradation is simulated using NOISEX-92 and DEMAND noise datasets paired with C4DM room impulse responses at SNR levels from -10 to 20 dB, split into seen and unseen categories. Models are optimized using the Adam optimizer with batch size 20, initial learning rate 10^-4 decaying by 15% every 20 epochs for 200 epochs, evaluated via 5-fold cross-validation using unweighted and weighted average recall (UAR and WAR).

## Results

On clean and degraded CREMA-D, the proposed cCTrU model achieves an AVER UAR of 89.14% and WAR of 89.11%, outperforming standard transformer baselines. For robust SER evaluated across seen and unseen noise types on IEMOCAP and NOISEX, the inverse-filtering front-end (FE-IF) improves average UAR to 65.01% (seen/unseen mix) compared to 62.28% for unenhanced baselines. In unimodal visual emotion recognition on CREMA-D, frequency injection boosts baseline UAR from 80.38% to 84.92%. However, the model does not achieve state-of-the-art results on clean RAVDESS fusion (90.97% vs 97.92% reported by prior work [9]).

| System / Condition | Modality | CREMA-D UAR | CREMA-D WAR | RAVDESS UAR | RAVDESS WAR |
|---|---|---|---|---|---|
| Baseline (Unimodal A) | Audio | 71.11 | 71.01 | 70.38 | 72.29 |
| Proposed cCTrU (A) | Audio | 71.34 | 71.30 | 82.32 | 83.33 |
| Baseline (Unimodal V) | Visual | 77.25 | 77.21 | 71.50 | 70.97 |
| Proposed cCTrU (V) | Visual | 84.92 | 85.28 | 76.43 | 77.43 |
| Baseline (A+V Fusion) | Audio-Visual | 84.91 | 84.89 | 87.96 | 87.99 |
| Proposed cCTrU (A+V) | Audio-Visual | 89.14 | 89.11 | 91.69 | 90.97 |

## Limitations

The evaluation relies entirely on simulated acoustic degradation (additive noise and synthetic room impulse responses) rather than real-world recordings in natural acoustic environments. The visual pipeline assumes clean facial bounding boxes are available via MTCNN and does not explicitly evaluate robustness against visual degradations such as motion blur, variable lighting, or occlusion. Furthermore, computational complexity and latency figures for the dual U-Net architecture with CTr blocks and FFT injections are not reported, leaving its suitability for real-time on-device deployment unverified.

## Why read this

Researchers working on multimodal affective computing or speech enhancement under severe acoustic mismatch will find a rigorous formulation for combining inverse-filtering spectral front-ends with cross-modal U-Net bottlenecks. Engineers will take away concrete implementation details for integrating frequency-injected visual representations and emotion-conditioned auxiliary decoders.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time affective computing systems, healthcare patient monitoring, customer analytics call centers, and safety-critical human-machine interaction interfaces.

## Related

- (link related pages by id as the wiki grows)
