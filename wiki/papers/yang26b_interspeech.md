---
id: yang26b_interspeech
category: enhancement-separation
labels: [robustness-noise]
institutions: ["Shanghai Normal University", "Unisound AI Technology Co., Ltd"]
code: https://github.com/Yym-line/EoW-TSE
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-259
pdf: https://www.isca-archive.org/interspeech_2026/yang26b_interspeech.pdf
---

# Enroll-on-Wakeup: A First Comparative Study of Target Speech Extraction for Seamless Interaction in Real Noisy Human-Machine Dialogue Scenarios

*Yiming Yang, Guangyong Wang, Haixin Guan, Yanhua Long*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-259)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — This paper introduces the Enroll-on-Wakeup (EoW) target speech extraction paradigm, which automatically uses natural wake-word utterances as speaker enrollment references to enable zero-effort human-machine interaction, and evaluates it across five real-world acoustic scenarios.

## Key contributions

- Proposes the Enroll-on-Wakeup (EoW) TSE paradigm to eliminate the need for pre-recorded enrollment samples in voice-controlled systems.
- Performs the first systematic comparative study of advanced discriminative (SEF-PNet, LExt, CIE-mDPTNet) and generative (SoloSpeech) TSE models under diverse, noisy, and reverberant real-world conditions.
- Investigates LLM-based zero-shot TTS enrollment augmentation methods (Clean Re-synthesis and Extended Concatenation) to combat short, noise-corrupted wake-word segments.

## Problem

Traditional target speech extraction (TSE) requires a clean, pre-recorded enrollment utterance from the target speaker, which disrupts natural user experience and fails in spontaneous human-machine dialogues. In real-world scenarios, systems must rely instead on short, noisy, and reverberant wake-word segments (e.g., "Hi, Pandora" around 1 second long) that suffer from severe acoustic degradation and "clue contamination." Existing audio-only, audio-visual, and spatial-assisted frameworks either fail to handle this zero-effort constraint or require rigid hardware setups, making seamless conversational interactions exceptionally difficult.

## Method

The EoW-TSE workflow begins with a keyword spotting (KWS) module that segments an incoming audio stream into a wake-word reference segment ($x_{wake}$) and a subsequent query mixture ($x_{query}$). Four target speech extraction models are evaluated: three discriminative systems (SEF-PNet featuring interactive speaker adaptation and local-global context aggregation; LExt, which prepends the enrollment waveform directly to the mixture; and CIE-mDPTNet, utilizing T-F domain attention and dual-path transformers) and one generative framework (SoloSpeech, a cascaded pipeline using an audio compressor, embedding-free extractor, and latent-space diffusion corrector).

To address information scarcity and contamination in $x_{wake}$, three zero-shot LLM-based TTS models (IndexTTS2, xTTS, and CosyVoice3) are deployed to generate synthetic enrollment references. Two augmentation strategies are tested: Clean Re-synthesis (CR), which replaces the wake-word with a clean TTS rendition of the same transcript, and Extended Concatenation (EC), which concatenates the original wake-word with an auxiliary TTS-generated sentence ($t_{gen}$) to increase identity clue diversity. Models are trained on Libri2Mix subsets using Adam optimization with gradient clipping and learning rate decay.

## Experimental setup

Evaluated on an internal Unisound dataset featuring five real-world scenarios varying in distance ($d=1\text{m}$ to $3\text{m}$), reverberation time ($RT_{60}=0.4\text{s}$ to $0.6\text{s}$), and SNR levels (5dB and 10dB) with a 16 kHz sampling rate. Discriminative models were trained on Libri2Mix train-100 for 130 epochs (initial learning rate $5\times 10^{-4}$ for SEF-PNet and CIE-mDPTNet, $1\times 10^{-4}$ for LExt). Metrics include SI-SDR, PESQ, STOI, DNSMOS for perceptual quality, and Word Error Rate (WER) via Fun-ASR and meeteval for intelligibility.

## Results

On the baseline Libri2Mix 2-speaker+noise test, LExt achieves an SI-SDR of 10.47 dB and PESQ of 1.88, while the generative SoloSpeech achieves an SI-SDR of 11.12 dB and PESQ of 1.89. In real-world EoW-TSE scenarios, SoloSpeech attains the highest DNSMOS perceptual scores, whereas CIE-mDPTNet demonstrates the most robust ASR performance (lowest WER). However, none of the TSE models outperform the raw noisy mixture's direct WER in severe far-field conditions, highlighting a significant perceptual-recognition gap where enhancement introduces phonetic distortions that hurt ASR accuracy. TTS-based augmentation (particularly IndexTTS2) successfully stabilizes DNSMOS and lowers WER compared to using raw noisy wake words directly, though a trade-off between perceptual quality and linguistic intelligibility persists.

| Models | SI-SDR | PESQ | STOI | Params | MACs |
|---|---|---|---|---|---|
| Mixture | -1.96 | 1.08 | 64.73 | - | - |
| SEF-PNet | 8.18 | 1.55 | 82.67 | 6.08M | **15.87G** |
| CIE-mDPTNet | 9.47 | 1.78 | 85.35 | **2.9M** | 48.3G |
| LExt | 10.47 | 1.88 | **87.26** | 3.9M | 61.0G |
| SoloSpeech | **11.12** | **1.89** | - | 590.9M | - |

## Limitations

The evaluation relies heavily on synthetic or specific Chinese wake-up commands and internal datasets, limiting immediate cross-lingual generalization. Zero-shot TTS augmentation introduces noticeable computational overhead and latency unsuited for ultra-low-power edge devices. Furthermore, current TSE architectures consistently degrade ASR word error rates relative to raw noisy mixtures under high reverberation and low SNR, indicating an unresolved trade-off between noise suppression and speech intelligibility.

## Why read this

Researchers building real-time, hands-free conversational assistants should read this to understand the concrete limits of applying target speech extraction to short, noisy wake-word segments. It provides a sobering reality check on the perceptual-intelligibility gap in current discriminative and generative TSE models, along with an evaluation of LLM-based TTS augmentation.

## Code

- https://github.com/Yym-line/EoW-TSE

## Applications

Smart speakers, voice-controlled home automation devices, in-car infotainment systems, and hands-free conversational agents operating in noisy, multi-talker environments.

## Institutions / 機構

Shanghai Normal University, Unisound AI Technology Co., Ltd

## Related

- (link related pages by id as the wiki grows)
