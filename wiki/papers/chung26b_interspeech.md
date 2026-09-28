---
id: chung26b_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2770
pdf: https://www.isca-archive.org/interspeech_2026/chung26b_interspeech.pdf
---

# Robust Audio-Visual Emotion Recognition via Conditional Transformer U-Nets with Frequency-Injected Visual Stream

[PDF](https://www.isca-archive.org/interspeech_2026/chung26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chung26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2770)

**TL;DR** — The paper introduces a convolutional transformer-based dual U-Net for audio-visual emotion recognition that achieves strong noise and reverberation robustness via inverse filtering speech enhancement and frequency-injected visual modeling.

## Problem

Real-world acoustic degradations like background noise and reverberation severely impair speech emotion recognition and destabilize multimodal audio-visual systems. Prior audio-visual emotion recognition methods largely overlook explicit acoustic robustness, relying instead on data variability rather than targeted front-end processing or cross-modal consistency. Addressing this gap is critical for deploying reliable affective computing systems in adverse environments.

## Method

The framework uses a dual U-Net architecture comprising an audio stream module (ASM) and visual stream module (VSM) built from convolutional transformer (CTr) blocks that integrate convolutional attention and feed-forward layers. The ASM incorporates an inverse filtering-based front-end operating in the log-Mel filterbank domain to jointly handle noise and reverberation under the convolutive transfer function model. The VSM employs a frequency-injected architecture that concatenates spatial query, key, and value tensors with their 1D fast Fourier transform log-magnitude spectral counterparts. Both streams feature auxiliary U-Net decoders conditioned on predicted emotion embeddings via time-stretching and channel concatenation, while a prompt generation module guides the fused emotion decoder.

## Results

Evaluated on CREMA-D, RAVDESS, and IEMOCAP datasets mixed with NOISEX-92 and DEMAND noise and C4DM room impulse responses across -10 dB to 20 dB SNR levels. The proposed model achieves 91.69% WAR and 89.09% UAR on CREMA-D, and 90.97% WAR and 88.54% UAR on RAVDESS, outperforming baseline configurations. Ablation studies confirm that integrating the inverse filtering front-end and frequency-injected visual stream consistently lifts unweighted and weighted average recall metrics across both seen and unseen noise conditions compared to standard baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building affective computing interfaces, human-robot interaction systems, and smart healthcare assistants operating in noisy, reverberant real-world acoustic environments.

## Limitations

The current scope focuses solely on acoustic degradations while leaving visual degradations like blur and noise for future work.

## Related

- (link related pages by id as the wiki grows)
