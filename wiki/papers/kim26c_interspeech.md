---
id: kim26c_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-364
pdf: https://www.isca-archive.org/interspeech_2026/kim26c_interspeech.pdf
---

# Mixture Consistency Learning for Robust Speaker Verification in Noisy Environments

[PDF](https://www.isca-archive.org/interspeech_2026/kim26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-364)

**TL;DR** — The paper introduces Mixture Consistency Learning for Speaker Verification (MCL-SV), a target-free self-supervised decomposition framework that achieves state-of-the-art noise robustness by enforcing mixture consistency and task-driven gradient coupling.

## Problem

Standard speech enhancement (SE) frontends for speaker verification rely on supervised reconstruction objectives that target predefined clean reference signals. However, these reference targets frequently retain channel variability and environmental artifacts, causing the SE module to propagate non-discriminative factors that degrade downstream speaker verification performance. This target-dependent learning increases speaker embedding variance and limits real-world robustness.

## Method

The proposed MCL-SV system utilizes a Dual-Decoder SE (DDSE) architecture featuring a shared U-Net encoder and two parallel decoder paths: a speech enhancement (SE) path and a noise extraction (NE) path. Instead of training via supervised distance to clean audio, the system applies a target-free Mixture Consistency (MC) loss enforcing that the sum of the SE and NE path spectrogram outputs reconstructs the original noisy input mixture. Simultaneously, the speaker verification (SV) backend loss is coupled exclusively to the SE path output, utilizing ReDimNet-B2 with SphereFace2 loss to drive speaker-discriminative feature retention while routing nuisance variations into the NE path. The total model size is approximately 7.2M parameters, and training incorporates MUSAN noise mixing (0-20 dB SNR) and room impulse response augmentations.

## Results

Evaluated on the VoxCeleb1 test set mixed with MUSAN noise (0–20 dB SNR) and out-of-domain datasets (Nonspeech100, VoxSRC23, VC-Mix), MCL-SV consistently outperforms strong noise-robust baselines like Stable ExU-Net, NA-ExU-Net, and ParaNoise-SV. Across noise categories, MCL-SV achieves an overall average EER of 1.19%, improving upon the ReDimNet-B2 baseline and recent state-of-the-art models. Loss ablations demonstrate that combining the mixture consistency loss with direct speaker verification loss coupling yields superior EER reductions across clean, noise, music, and babble conditions compared to traditional SE supervision.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing robust biometric speaker recognition systems for noisy real-world environments, telephony, surveillance, or forensic audio analysis.

## Related

- (link related pages by id as the wiki grows)
