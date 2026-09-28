---
id: park26g_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2944
pdf: https://www.isca-archive.org/interspeech_2026/park26g_interspeech.pdf
---

# NaVo: Natural Voice Protection against Voice Cloning Attacks via Generative Universal Adversarial Audio

[PDF](https://www.isca-archive.org/interspeech_2026/park26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2944)

**TL;DR** — NaVo is a generative proactive defense framework that produces natural-sounding universal adversarial ambient audio via a single forward pass, achieving a 76% defense success rate against commercial voice cloning systems.

## Problem

Existing proactive defenses against voice cloning rely on per-sample gradient-based optimization, introducing high latency that prevents real-time deployment, and inject perceptible high-frequency noise or waveform distortion that degrades audio quality. These limitations create a fundamental trade-off between defense effectiveness, computational efficiency, and perceptual naturalness. NaVo resolves this gap by generating semantically meaningful acoustic environments as adversarial perturbations that protect unseen speakers instantly without iterative optimization.

## Method

NaVo uses AudioLDM2 as its latent diffusion text-to-audio backbone, adapting its UNet via Low-Rank Adaptation (LoRA) applied exclusively to cross-attention key and value projection matrices. It trains modular LoRA units conditioned on gender attributes (using opposite-gender distribution targets) and acoustic categories like rain, music, and babble. The training objective combines a denoising diffusion loss to preserve acoustic quality and an alpha-divergence-based distributional target loss (specifically Bhattacharyya distance) to shift speaker embeddings toward the target gender cluster. During inference, generated ambient audio is simply mixed with the source speech at a fixed 17 dB SNR via a single model forward pass.

## Results

Evaluated across datasets including VCTK, LibriSpeech, and AudioSet, NaVo achieved over 20% higher Defense Success Rate (DSR) than baseline Enkidu across all speaker verification models (Resemblyzer, ECAPA-TDNN, ResNet). In black-box tests against Tortoise and ElevenLabs, NaVo reached up to 90% DSR depending on the acoustic style. Under adaptive purification attacks using WaveGuard, DSR remained above 80%. Acoustic quality was verified using CLAP scores, showing comparable fidelity to the base AudioLDM2 model.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and privacy advocates protecting personal voice data from unauthorized zero-shot voice cloning and deepfake synthesis on social media and real-time communication platforms.

## Limitations

The defense requires mixing ambient background sound into the speech signal at a controlled signal-to-noise ratio.

## Related

- (link related pages by id as the wiki grows)
