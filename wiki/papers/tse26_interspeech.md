---
id: tse26_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2165
pdf: https://www.isca-archive.org/interspeech_2026/tse26_interspeech.pdf
---

# AudioNoisePrints: Model-free audio watermarking using spatial correlation in flow matching TTS

*Timothy Tin-Long Tse, Jian Zhu, Aidan Pine, Mengzhe Geng*

[PDF](https://www.isca-archive.org/interspeech_2026/tse26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tse26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2165)

**TL;DR** — AudioNoisePrints is a training-free, model-free watermarking framework for flow-matching and diffusion-based speech synthesis models that leverages spatial correlations between initial Gaussian noise and generated outputs, outperforming AudioSeal under strong augmentations like speed changes and cropping without affecting generation quality.

## Key contributions

- Adapts the NoisePrints spatial correlation watermarking paradigm to audio domain for the first time, eliminating the need to retrain TTS models or modify generation inference pipelines.
- Introduces an optional lightweight 4-layer Conv2D ResNet external detector trained with binary cross-entropy loss to handle aggressive signal augmentations.
- Demonstrates that spatial correlations between initial noise and generated output generalize across diverse architectures including F5-TTS, Matcha-TTS, and the DiffWave vocoder.
- Outperforms AudioSeal under challenging non-destructive and destructive perturbations such as cropping and speed adjustments while requiring no generation-time overhead.

## Problem

Current audio watermarking approaches predominantly rely on post-hoc schemes (such as AudioSeal) which alter audio after generation, introducing computational overhead, generation latency, and a strict trade-off between audio fidelity and watermark robustness. Alternatively, in-model watermarking strategies require resource-intensive retraining of the underlying generative speech models and can degrade audio quality. Furthermore, open-source post-hoc watermarks remain vulnerable to overwriting attacks where adversaries detect and replace the watermark using the same publicly available models.

## Method

The core mechanism exploits the strong intrinsic spatial correlation present between the initial Gaussian noise vector and the final generated Mel-spectrogram in diffusion and flow matching models. Instead of operating in a latent VAE space, the approach computes distance directly in the audio or Mel-spectrogram domain using cosine similarity ($f_{dist}(x_0, x_L)$). To determine watermark presence in the model-free setup, an empirical p-value is calculated by comparing the target similarity against $N=500$ randomly sampled initial noise vectors, evaluating against a threshold $\tau_p$. 

To withstand aggressive temporal and spectral degradations, the authors introduce a Detector approach using a lightweight 4-layer Conv2D ResNet trained via binary cross-entropy (BCE) loss. The special initialization noise is periodically sampled with a fixed length of 100 Mel-space frames and repeated across the target audio length to facilitate robust sequence handling. Training data consists of synthetic outputs generated from both designated special initialization noises and random Gaussian draws, subjected to data augmentations including MP3 and AAC compression.

The system utilizes the Euler ODE solver for generation across all evaluated models. F5-TTS v1 Base checkpoint with Vocos vocoder, Matcha-TTS VCTK checkpoints, and DiffWave with LJSpeech checkpoints serve as the primary generative backbones. Cosine similarity and dot product functions are selected after ablation, with cosine similarity yielding optimal detection performance across cutoff thresholds.

## Experimental setup

Experiments utilize standard Text-to-Speech datasets including LibriTTS, LJSpeech, and an auxiliary emotion detection text classification dataset for synthetic data generation. The proposed framework is compared against AudioSeal (using its 16k pretrained checkpoint trained on 4.5k hours of VoxPopuli data). Evaluation metrics include detection accuracy, precision, and robustness under diverse signal augmentations such as AAC compression, echo, white/pink noise, high-pass/low-pass filtering, MP3 bit-rate compression, audio cropping, and speed scaling factors.

## Results

AudioNoisePrints achieves near-perfect accuracy on AAC compression (~0.987 to 0.9947) matching AudioSeal (1.0), but significantly outperforms AudioSeal on temporal perturbations like speed scaling and audio cropping, where AudioSeal fails entirely with a 1% change in stretching. Ablations over distance functions show that cosine similarity achieves superior accuracy (reaching 0.988 at cutoff 1.0) compared to L1 (0.497) and L2 (0.497). The primary weakness lies in echo augmentations, where the model-free and detector configurations achieve ~0.50 accuracy because the detector was not pretrained on echo artifacts.

| System / Condition | AAC Compression | Audio Cropping | Speed Scaling | Echo Augmentation |
|---|---|---|---|---|
| AudioNoisePrints (CoSim) | 0.987 | High Robustness | High Robustness | 0.504 |
| AudioNoisePrints (Detector) | 0.9947 | High Robustness | High Robustness | 0.499 |
| AudioSeal (Baseline) | 1.0 | Fails (<1% change) | Fails (<1% change) | 1.0 |

## Limitations

The framework exhibits poor performance against echo augmentations unless explicitly included in the detector's training augmentations. The evaluation is currently bounded to English speech datasets (LibriTTS and LJSpeech) and specific model architectures (F5-TTS, Matcha-TTS, DiffWave), leaving multi-lingual scalability and real-time streaming constraints untested.

## Why read this

Speech and machine learning researchers working on generative audio security, provenance tracking, and deepfake detection should read this paper to learn how to exploit intrinsic noise-output correlations for zero-overhead, high-robustness watermarking.

## Code

- https://github.com/SWivid/F5-TTS

## Applications

Deepfake detection, generative speech provenance tracking, audio copyright protection, and forensic verification of synthetic speech outputs.

## Related

- (link related pages by id as the wiki grows)
