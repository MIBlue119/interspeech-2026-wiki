---
id: xue26_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-105
pdf: https://www.isca-archive.org/interspeech_2026/xue26_interspeech.pdf
---

# Imperceptible Voiceprint Protection via Human-Machine Perception Discrepancy Feature Disentanglement

[PDF](https://www.isca-archive.org/interspeech_2026/xue26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xue26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-105)

**TL;DR** — A two-stage disentanglement and perturbation framework for voiceprint protection achieves an 87.2% defense success rate against unauthorized voice cloning while maintaining high audio quality.

## Problem

Zero-shot voice cloning models pose significant risks of unauthorized impersonation and financial fraud. Current defense methods face a fundamental trade-off: signal-level adversarial perturbations either introduce audible artifacts when strong or lack transferability to unseen systems when imperceptible, while existing embedding-space approaches entangle speaker and content features.

## Method

The framework uses a two-stage design: Stage 1 trains an AutoVC-based disentanglement-reconstruction network with an information bottleneck (3 convolutional layers and a bidirectional LSTM with bottleneck dimension 32) and adversarial entropy maximization losses to separate content codes from speaker embeddings (GE2E encoder). Stage 2 freezes this network and trains a perturbation generator to inject adversarial noise into the speaker embedding space, combining a defense loss (simulating a cloning attack), a mel-spectrogram reconstruction loss, a GAN loss for realism, and an MPEG psychoacoustic masking constraint to keep modifications below the human hearing threshold. Models were trained on VCTK (80 speakers for training, 10 for validation, 20 for testing) with Stage 1 run for 500k iterations and Stage 2 for 200k iterations.

## Results

Evaluated on the VCTK dataset using the AutoVC architecture, the method achieves an 87.2% defense success rate (DSR at threshold 0.5), a mean opinion score (MOS) of 4.18, a word error rate (WER) of 5.30%, and a protected speech speaker similarity (Simprot) of 0.95. It outperforms prior baselines including Voice Guard, CloneShield, VocalCrypt, MI-FGSM, and RoVo in balancing protection and perceptual quality. Ablation studies confirm that removing the defense loss collapses DSR, while omitting the psychoacoustic masking loss severely degrades perceptual quality. The approach also demonstrates strong cross-architecture transferability on black-box voice cloning systems like YourTTS, VALL-E, and AdaptVC.

## Code

- https://cero529.github.io/voiceprint-protection-demo/

## Applications

Speech and ML engineers developing voice privacy tools, anti-spoofing utilities, and content protection systems to secure personal voice data against unauthorized zero-shot cloning.

## Limitations

The study notes that future work needs to investigate defense robustness under adaptive attack scenarios and evaluate performance under real-world audio degradations such as lossy compression and environmental noise.

## Related

- (link related pages by id as the wiki grows)
