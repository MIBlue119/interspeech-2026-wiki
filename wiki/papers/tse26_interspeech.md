---
id: tse26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2165
pdf: https://www.isca-archive.org/interspeech_2026/tse26_interspeech.pdf
---

# AudioNoisePrints: Model-free audio watermarking using spatial correlation in flow matching TTS

[PDF](https://www.isca-archive.org/interspeech_2026/tse26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tse26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2165)

**TL;DR** — AudioNoisePrints introduces a training-free audio watermarking pipeline for flow matching and diffusion TTS models by exploiting spatial correlations between initial Gaussian noise and generated Mel-spectrograms, outperforming AudioSeal under strong augmentations without compromising generation quality.

## Problem

Current post-hoc audio watermarking methods alter generated audio, introducing computational overhead, latency, and a strict trade-off between audio quality and robustness while remaining vulnerable to overwriting attacks. Meanwhile, in-model watermarking approaches require expensive retraining of the generative models and can degrade speech synthesis quality. This leaves a gap for a distortion-free, efficient watermarking scheme that works natively with modern diffusion and flow-matching speech generators.

## Method

The method leverages spatial correlations between the initial originating Gaussian noise and the final generated output, evaluating similarity directly in the Mel-spectrogram domain using cosine similarity against empirical distributions of random noises. For robustness against complex attacks like cropping and speed scaling, the authors introduce a lightweight detector variant consisting of a 4-layer Conv2D ResNet trained with binary cross-entropy loss. The initial noise is periodically sampled with a fixed length of 100 frames in Mel-space to handle variable audio lengths. Experiments are conducted on F5-TTS, Matcha-TTS, and the DiffWave vocoder using LibriTTS, LJSpeech, and emotional text datasets without requiring any modification or retraining of the underlying generative models.

## Results

Evaluated on F5-TTS and Matcha-TTS and compared against the AudioSeal baseline, AudioNoisePrints achieves superior robustness under aggressive data augmentations. While cosine similarity and dot product distance functions perform well (with cosine similarity achieving highest accuracy at threshold 1.0), L1 and L2 distances fail. Under high-pass/low-pass filtering, MP3/AAC compression, and speed scaling (where AudioSeal fails even with a 1% stretch), the proposed detector and model-free cosine similarity approaches maintain high accuracy, though echo augmentations remain challenging.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and security practitioners seeking to trace synthetic speech origin, detect deepfakes, or watermark text-to-speech outputs without incurring generation latency or degrading audio fidelity.

## Limitations

The detector approach struggles with echo augmentations, showing a drop in accuracy.

## Related

- (link related pages by id as the wiki grows)
