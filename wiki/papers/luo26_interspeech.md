---
id: luo26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-500
pdf: https://www.isca-archive.org/interspeech_2026/luo26_interspeech.pdf
---

# FCPE: A Fast Context-based Pitch Estimation Model

[PDF](https://www.isca-archive.org/interspeech_2026/luo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/luo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-500)

**TL;DR** — FCPE is a fast, depthwise-separable convolution-based pitch estimation model that achieves competitive Raw Pitch Accuracy while delivering an ultra-fast Real-Time Factor of 0.0062 on an RTX 4090.

## Problem

Traditional signal processing pitch estimators struggle in noisy and polyphonic environments, whereas deep learning alternatives like RMVPE and CREPE deliver high accuracy at the cost of excessive computational demands and inference latency. This lack of efficiency limits their deployment in real-time pipelines such as live voice conversion and interactive music production.

## Method

The model takes a log-mel spectrogram and passes it through an initial embedding block followed by a lightweight convolutional backbone inspired by the Conformer architecture. Its primary building block utilizes depthwise separable 1D convolutions alongside pointwise convolutions and residual connections to capture local patterns and temporal context efficiently. The output layer projects features into a 360-bin pitch probability matrix covering six octaves with 20-cent intervals, trained using binary cross-entropy loss against DDSP re-synthesized M4Singer and VCTK targets. Training incorporates data augmentation strategies including white/colored noise superposition, random spectrogram blank or Gaussian masking, and key shifting.

## Results

Evaluated on MIR-1K, THCHS30-Synth, Vocadito, and TONAS datasets, FCPE achieves 96.79% Raw Pitch Accuracy on clean MIR-1K data and exhibits strong robustness under colored and CHiME real-world noise conditions. In terms of efficiency, it requires only 1.02 GFLOPS and yields an RTF of 0.0062, running 5.3x faster than RMVPE and 77x faster than CREPE on an RTX 4090 GPU. Ablation studies confirm that noise augmentation is critical for low-SNR environments, spectrogram masking prevents performance collapse under structured noise, and key shifting expands the detected vocal range by 29.8% to 1139 Hz.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers can deploy this model in real-time singing voice conversion pipelines, automated MIDI transcription systems, and resource-constrained edge applications.

## Related

- (link related pages by id as the wiki grows)
