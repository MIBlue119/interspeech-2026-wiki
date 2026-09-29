---
id: li26l_interspeech
category: enhancement-separation
labels: [generative-model, robustness-noise]
institutions: ["Wuhan University"]
code: https://github.com/xxnhq/HFSE
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-722
pdf: https://www.isca-archive.org/interspeech_2026/li26l_interspeech.pdf
---

# HFMSE: Harmonic-Guided Speech Enhancement with Flow Matching

*Jizhen Li, Weiping Tu, Yuhong Yang, Xinhong Li*

[PDF](https://www.isca-archive.org/interspeech_2026/li26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-722)

**Category:** `enhancement-separation` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — HFMSE is a harmonic-guided flow-matching speech enhancement framework that uses a soft fundamental frequency pitch-harmonic conversion matrix to provide noise-robust structural conditioning, achieving state-of-the-art performance on the DNS Challenge 2020 dataset.

## Key contributions

- Proposes a lightweight two-step harmonic encoder utilizing a Mel-scale Pitch-Harmonic Conversion Matrix (MPCM) to perform soft fundamental frequency localization and harmonic mask estimation directly from noisy speech.
- Replaces unreliable high-level semantic tokens (from ASR or codecs) and shallow spectral features with explicit, physically-motivated harmonic priors to anchor generative flow matching dynamics.
- Introduces an attention-like gating mechanism with adaptive average pooling and channel compression to selectively weight and combine harmonic features for robust spectral reconstruction.
- Demonstrates superior performance and speaker similarity over discriminative baselines, diffusion models, and recent discrete token-based generative speech enhancement systems.

## Problem

Generative speech enhancement models rely heavily on conditional information, but current conditioning strategies suffer from critical flaws. Using shallow acoustic features like noisy Mel-spectrograms provides distorted structural details like harmonics and formants, whereas using pre-trained deep models (e.g., codecs, ASR, or speech language models) to extract high-level semantic features creates a circular dependency, as extracting clean semantics from heavy noise is as challenging as enhancement itself. Consequently, these approaches lead to spectral artifacts, degraded intelligibility, and poor speaker timbre preservation.

## Method

The HFMSE framework integrates a conditional encoder, a Latent Diffusion Transformer (DiT)-based flow matching model, and a BigVGAN neural vocoder. Both clean target speech and noisy inputs are converted to 100-band Mel-spectrograms. The core contribution is the harmonic encoder, which projects spectral inputs into keys and values via convolutions, computes fundamental frequency attention scores using the Mel-scale Pitch-Harmonic Conversion Matrix (MPCM), and builds a probabilistic harmonic mask. The MPCM mathematically models idealized harmonic comb patterns with a proportional 1/√p amplitude decay and smooth cosine interpolation across harmonic peaks.

The resulting harmonic mask modulates value features, which are then refined through a gating mechanism using adaptive average pooling, channel compression/expansion convolutions, and a Sigmoid activation. This harmonic feature map acts as a persistent structural guidance vector injected into the DiT flow-matching backbone, which is trained over 50 epochs using a velocity field loss function along a linear interpolation path between Gaussian noise and target Mel-spectrograms with classifier-free guidance. During inference, clean speech is generated from Gaussian noise iteratively via an ODE solver without needing external reference utterances.

## Experimental setup

The model is trained on a massive 2000-hour dataset combining clean speech from VCTK, LibriTTS, Common Voice 11.0, and DNS5 (totaling ~1200 hours), noise libraries from WHAM! and DNS5 (~250 hours), and room impulse responses from OpenSLR. Audio is mixed at SNRs from -5 dB to 20 dB with a 40% reverberation probability, all resampled to 24 kHz for training and evaluated at 16 kHz on the DNS Challenge 2020 test set. The DiT model features 1024 channels, 22 layers, and 16 attention heads, while the harmonic encoder uses a feature dimension of 64.

## Results

On the DNS Challenge 2020 test set with reverberation, HFMSE achieves top-tier scores across DNSMOS metrics (SIG: 3.645, BAK: 4.181, OVRL: 3.422) and high speaker similarity (Spk Sim: 0.904), outperforming both TF-GridNet (OVRL 2.805) and FlowSE (OVRL 3.340). In non-reverberant conditions, it reaches a DNSMOS OVRL of 3.485 and a speaker similarity of 0.958. Ablation studies reveal that removing the harmonic encoder causes the steepest performance drop (DNSMOS OVRL falling from 3.485 to 3.425), highlighting that explicit harmonic priors are more robust to severe noise degradation than noisy speech features alone.

| System/Condition | DNSMOS SIG | DNSMOS BAK | DNSMOS OVRL | Spk Sim |
|---|---|---|---|---|
| Noisy (With Reverb) | 1.760 | 1.497 | 1.392 | 0.941 |
| TF-GridNet (With Reverb) | 3.101 | 2.900 | 2.805 | 0.815 |
| FlowSE (With Reverb) | 3.614 | 4.110 | 3.340 | 0.809 |
| HFMSE (With Reverb) | 3.645 | 4.181 | 3.422 | 0.904 |
| HFMSE (Without Reverb) | 3.685 | 4.203 | 3.485 | 0.958 |

## Limitations

The framework relies heavily on periodic harmonic structures, which may make it less optimal for unvoiced speech segments, whispering, or complex overlapping acoustic polyphony where fundamental frequency estimation fails. Furthermore, training requires substantial multi-GPU compute over 2000 hours of diverse audio corpora, and evaluations are restricted to standard single-channel 16 kHz benchmarks.

## Why read this

Researchers and audio engineers working on generative speech enhancement or vocoding should read this paper to learn how to inject physics-based acoustic priors (harmonics) into flow-matching architectures to bypass the failure modes of brittle semantic token conditioning.

## Code

- https://github.com/xxnhq/HFSE/

## Applications

Real-time communication enhancement, hearing aids, teleconference noise suppression, and preprocessing for downstream automatic speech recognition systems.

## Institutions / 機構

Wuhan University

**Funding / 經費:** National Nature Science Foundation of China, Hubei Provincial Science and Technology Plan Project

## Related

- [Seed-Enh: Generative Speech Enhancement in Decoupled Semantic and Timbre Spaces](shang26_interspeech.md) — same problem · relatedness 2.9/3
- [PhASE-Flow: Phonetic-Conditioned Acoustic Flow Matching in SSL Representation Domain for Speech Enhancement](gao26e_interspeech.md) — same problem · relatedness 2.9/3
- [UniSE: A Unified Framework for Decoder-Only Autoregressive LM-Based Speech Enhancement](yan26_interspeech.md) — same problem · relatedness 2.9/3
- [Absorbing Discrete Diffusion for Speech Enhancement](gonzalez26_interspeech.md) — same problem · relatedness 2.8/3
- [Post-Training Speech Enhancement Language Models with Perceptual Rewards](berdo26_interspeech.md) — same problem · relatedness 2.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
