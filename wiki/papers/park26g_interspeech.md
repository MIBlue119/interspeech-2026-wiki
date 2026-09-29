---
id: park26g_interspeech
category: deepfake-security
labels: [generative-model]
institutions: ["Soongsil University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2944
pdf: https://www.isca-archive.org/interspeech_2026/park26g_interspeech.pdf
---

# NaVo: Natural Voice Protection against Voice Cloning Attacks via Generative Universal Adversarial Audio

*Seoyoung Park, Seungmin Kim, Sohee Park, Dain Kim, Thien An Nguyen, Thien-Phuc Doan, Souhwan Jung, Daeseon Choi*

[PDF](https://www.isca-archive.org/interspeech_2026/park26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2944)

**Category:** `deepfake-security` · **Labels:** `generative-model`

**TL;DR** — NaVo is a generative proactive defense framework that injects natural-sounding universal adversarial ambient audio via a single forward pass, achieving a 76% defense success rate against commercial voice cloning systems.

## Key contributions

- Proposes a generative universal adversarial audio (UAA) approach utilizing semantically meaningful ambient sounds instead of high-frequency noise or waveform distortions.
- Employs modular low-rank adaptation (LoRA) on cross-attention key and value projection matrices of a text-to-audio backbone, tailored by gender and acoustic categories.
- Introduces an alpha-divergence-based distributional target loss (using Bhattacharyya distance) to jointly optimize central tendency and dispersion against speaker embedding distributions.
- Enables real-time protection through simple, non-iterative audio mixing at a 17 dB signal-to-noise ratio without requiring per-sample gradient optimization.

## Problem

Prior proactive defenses against voice cloning rely on per-sample iterative gradient-based optimization, creating prohibitive computational latency that blocks real-time deployment. Furthermore, existing methods inject high-frequency noise or distortions that severely degrade the perceptual naturalness of the protected speech. These limitations make current approaches unscalable for large-scale social media use and real-world audio sharing. NaVo resolves this fundamental trade-off between defense efficacy and perceptual quality by leveraging generative acoustic environments as natural adversarial perturbations.

## Method

NaVo builds upon AudioLDM2 as its text-to-audio generative backbone, fine-tuning its UNet exclusively via Low-Rank Adaptation (LoRA) applied to the key (W_K) and value (W_V) projection matrices in cross-attention transformer blocks. The VAE, vocoder, and text encoders remain frozen. Conditioning text prompts and reference ambient sounds generate category-consistent natural backgrounds (e.g., rain, babble, office, music) that are mixed with source speech at a fixed 17 dB SNR.

The training objective combines a standard denoising diffusion loss to preserve acoustic naturalness and a distributional target loss utilizing alpha-divergence (Bhattacharyya distance, alpha=0.5). Instead of pushing embeddings toward a single point, this distributional loss minimizes the distance between the batch speaker embedding distribution Q and a pre-defined target distribution P (modeled as a diagonal Gaussian based on the opposite gender's cluster). The adversarial loss is active only during low-noise diffusion timesteps (t < t_max).

During inference, a category- and gender-specific LoRA module generates the universal adversarial audio in a single forward pass, which is then immediately blended with the user's speech signal via standard audio mixing without gradient-based backpropagation.

## Experimental setup

Experiments use data from VCTK, FST, MCV, CSNED, CSUKIED, and LibriSpeech (196 train, 42 validation, and 42 test speakers; 10 utterances per speaker) and AudioSet for ambient categories. White-box evaluation is performed on SV2TTS (GE2E encoder) and CosyVoice (CAM++ encoder), while black-box evaluation uses Tortoise and the ElevenLabs commercial API. Performance is measured via Defense Success Rate (DSR) across ECAPA-TDNN, Resemblyzer, and ResNet speaker verification models, and acoustic quality is tracked using CLAP scores against text prompts.

## Results

NaVo achieves an overall DSR of 78.0% (Resemblyzer), 83.6% (ECAPA-TDNN), and 79.8% (ResNet), outperforming baseline Enkidu by more than 20% across all verifiers and yielding a threefold increase against Resemblyzer. In white-box evaluations against SV2TTS and CosyVoice, NaVo elevates baseline near-zero DSRs to between 40% and 97% depending on the acoustic style (e.g., Raindrop, Babble, Office). In black-box testing against Tortoise and ElevenLabs, an ensemble-trained NaVo configuration reaches over 90% DSR (e.g., 97.1% on ElevenLabs with Raindrop style) while maintaining CLAP scores comparable to the unprotected backbone model. Under adaptive purification attacks (WaveGuard), NaVo retains a DSR above 80% because purification introduces further speech distortions.

| System | Resemblyzer DSR (%) | ECAPA-TDNN DSR (%) | ResNet DSR (%) |
|---|---|---|---|
| Enkidu (Baseline) | 25.2 | 60.6 | 45.5 |
| NaVo (Proposed) | 78.0 | 83.6 | 79.8 |

## Limitations

The framework relies on pre-defined gender categories and specific ambient sound classes, which may limit adaptation to highly atypical voice profiles or extreme acoustic environments not covered in training. Mixing speech with ambient noise at a fixed 17 dB SNR, while preserving intelligibility, still introduces a mild background layer that may be undesirable in pristine recording scenarios. The approach assumes access to a representative target distribution of opposite-gender speaker embeddings for the distributional loss construction.

## Why read this

Speech and ML security researchers should read this paper to understand how latent diffusion models and distributional losses can replace costly per-sample gradient optimization for real-time proactive deepfake defense.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time voice anti-spoofing protection for social media voice posts, secure conversational assistants, and identity fraud prevention APIs.

## Institutions / 機構

Soongsil University

**Funding / 經費:** Korea Internet & Security Agency, Institute of Information & Communications Technology Planning & Evaluation

## Related

- [Imperceptible Voiceprint Protection via Human-Machine Perception Discrepancy Feature Disentanglement](xue26_interspeech.md) — same problem · relatedness 3.0/3
- [FreqGuard: Leveraging Frequency-Domain Feature Priors for Universal Proactive Voice Defense](wang26ca_interspeech.md) — same problem · relatedness 3.0/3
- [A Training-Free Proactive Defense Against Partial Speech Manipulation via Self-Embedding Steganography](ozer26_interspeech.md) — same problem · relatedness 2.6/3
- [Phoneme-Aware Mamba Watermark: An Active Defense System Against Purified Speech Deepfakes](shao26_interspeech.md) — same problem · relatedness 2.3/3
- [Spectral Masking and Interpolation Attack (SMIA): A Black-box Adversarial Attack against Voice Authentication and Anti-Spoofing Systems](kamel26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
