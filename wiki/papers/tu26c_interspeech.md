---
id: tu26c_interspeech
category: audio-visual
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3227
pdf: https://www.isca-archive.org/interspeech_2026/tu26c_interspeech.pdf
---

# AV-SNINet: A multi-channel audio-visual speech-noise interaction network for Target Speaker Extraction with cross-beam attention

[PDF](https://www.isca-archive.org/interspeech_2026/tu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3227)

**TL;DR** — AV-SNINet proposes a multi-channel audio-visual speech-noise interaction network using cross-beam attention for target speaker extraction, achieving an average relative word error rate reduction of 28.23% on real recordings.

## Problem

Distant-microphone speech signals are heavily degraded by reverberation, background noise, and interfering speakers, particularly in low-SNR environments. While incorporating visual lip cues helps, existing audio-visual separation methods focus primarily on target enhancement rather than explicitly modeling target-noise mutual exclusion to prevent interference leakage.

## Method

The framework uses a two-stage architecture: first, an AV-DPCRN-guided GEVD beamformer generates spatial target and interference beams from log-power spectrum, inter-channel phase difference, and ResNet-16 lip embeddings (25 fps); second, AV-SNINet applies a dual-branch DPCRN backbone with bottleneck cross-beam attention modules to jointly estimate target and noise ideal ratio masks. The cross-beam interactor uses a parallel two-tower structure calculating frame-level cross-attention matrices between speech and noise features to execute mutual-exclusion style suppression. The model is trained using joint magnitude-domain mask losses for both speech and noise branches with equal weighting.

## Results

Evaluated on an in-house real-recording dataset and an LRS2 far-field simulation set (300 hours, 16 kHz, circular microphone array of 4.25 cm radius, T60 = 80 ms), AV-SNINet reduces average WER from 28.40% to 20.38% over the first-stage baseline. On the LRS2 far-field simulation set, it achieves the best average WER of 17.20%, outperforming USEV+GEVD (19.37%) and RTFS-Net+GEVD (20.47%). Ablations confirm that the two-tower interactor design provides significant relative WER improvements over single-matrix shared attention variants.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building smart interactive devices, kiosks, or far-field speech recognition systems operating in noisy public environments.

## Limitations

Evaluated primarily on circular arrays and simulated/real setups with 0.5 to 2 m distances; future extension to stronger backbones like Conformer or Mamba is suggested.

## Related

- (link related pages by id as the wiki grows)
