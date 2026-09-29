---
id: kim26o_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1828
pdf: https://www.isca-archive.org/interspeech_2026/kim26o_interspeech.pdf
---

# AdaTT: Text-Guided Instrument Timbre Transfer with Target-Adaptive Structural Control

*Dabin Kim, Junwon Lee, Juhan Nam*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1828)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — AdaTT is a target-adaptive text-guided timbre transfer system that dynamically scales frame-wise pitch and loudness controls to harmonize source expressive details with target instrument identities. It achieves a superior CLAP score of 0.490 and subjective naturalness while preserving core musical content.

## Key contributions

- Formulates timbre transfer by decomposing temporal performance structures into instrument-agnostic score-level content and instrument-specific expressive details.
- Proposes AdaTT, integrating Control Scale Predictors (CSPs) and Text-Guided CSPs (TG-CSPs) to selectively scale fundamental frequency (f0) and loudness (RMS) controls via target text prompts.
- Presents a semi-automatic data construction pipeline using pitch-range clustering and a two-stage grid search to synthesize 1,321 high-quality cross-instrument training pairs (4.40 hours).
- Demonstrates state-of-the-art performance over ControlNet and inference-time editing baselines (MusicMagus, ZETA) in timbral fidelity, naturalness, and audio quality.

## Problem

Timbre transfer aims to alter an audio track's instrumental identity while maintaining melody and rhythm, but standard generative methods struggle with timbral ambiguity and conflicting expressive nuances. For example, transferring a violin's pitch-dominant vibrato onto a flute (which relies on breath-driven loudness modulation) creates unnatural artifacts or collapses the target timbre. Existing ControlNet fine-tuning rigidly copies all source expressive details, while inference-time latent editing approaches often cause structural content deviations due to a lack of explicit training conditioning. AdaTT resolves this tension by allowing flexible, target-adaptive modulation of heterogeneous structural controls.

## Method

The system builds upon Stable Audio Open (SAO), a latent diffusion model operating in an audio DAC-VAE latent space where the denoising network is a Diffusion Transformer (DiT) trained via velocity prediction. Source structural controls are injected using a ControlNet architecture adapted for DiTs, utilizing quantized fundamental frequency (f0, 144 bins) and Root Mean Square (RMS, 32 bins) contours passed through learnable lookup tables and a Conv-FFN.

To overcome the rigidity of standard ControlNet, AdaTT introduces Control Scale Predictors (CSPs) that predict frame-wise scale vectors (alpha) for each block output via SiLU convolutions and zero-initialized layers (bias initialized to +3 to preserve ~0.95 initial control strength). To disentangle heterogeneous controls, Text-Guided CSPs (TG-CSPs) independently modulate f0 and RMS control features (beta_f0 and beta_RMS) by concatenating them with temporally broadcast text embeddings from a T5 encoder.

The training recipe is split into two stages: first, SAO-ControlNet is trained for 1,200 epochs with a batch size of 384 using AdamW and MSE loss on an instrument reconstruction set. Second, AdaTT is trained for 400 epochs with a batch size of 64 on the curated 1,321-pair instrument transfer set while keeping the SAO-ControlNet backbone frozen. Inference operates on 12-second clips (256x64 latents) guided by text prompts specifying the target instrument.

## Experimental setup

Experiments utilized 32.8 hours of training data consolidated from the URMP and Solos datasets across 13 instrument types, resampled to 44.1 kHz and segmented into 12-second clips. The evaluation set consisted of 2,400 text-audio pairs generated from 100 held-out samples per instrument paired within predefined pitch clusters. Baselines included the raw SAO text-to-music model, standard ControlNet, SmartControl, and inference-time editing models MusicMagus and ZETA. Evaluation metrics comprise objective CLAP score, F1-MIDI score, Kernel Audio Distance (KAD) using MERT embeddings, Chroma score, and 5-point Likert scale subjective ratings (TIM, NAT, STR, QUL) by 22 participants.

## Results

AdaTT achieves the top objective CLAP score of 0.490, tying the theoretical upper bound of the SAO text-to-music backbone and outperforming standard ControlNet (0.463) and SmartControl (0.471). In subjective evaluations, it scores highest in timbral fidelity (TIM: 3.582), timbral naturalness (NAT: 3.484), structural fidelity (STR: 4.148), and overall audio quality (QUL: 3.307). Furthermore, it attains the lowest Kernel Audio Distance (KAD) of 0.495 among ControlNet variants, whereas inference-time editing baselines like MusicMagus lag significantly with a KAD of 1.408.

Ablation experiments on control resolution reveal a trade-off where higher bin counts improve Chroma structural consistency but degrade CLAP timbral accuracy, leading to the selected 144-bin f0 and 32-bin RMS sweet spot. While AdaTT's F1-MIDI score (0.302) is marginally lower than rigid ControlNet (0.309) due to adaptive micro-adjustments in expressive details like attack transients, its subjective structural score remains superior.

| Model | CLAP ↑ | F1-MIDI ↑ | KAD ↓ | TIM ↑ | NAT ↑ | STR ↑ | QUL ↑ |
|---|---|---|---|---|---|---|---|
| SAO (Text) | 0.490 | 0.004 | 0.331 | 3.452 | 3.259 | 1.439 | 3.034 |
| ControlNet | 0.463 | 0.309 | 0.512 | 3.164 | 3.136 | 3.998 | 2.875 |
| SmartControl | 0.471 | 0.293 | 0.520 | 3.418 | 3.366 | 3.991 | 3.107 |
| AdaTT (ours) | 0.490 | 0.302 | 0.495 | 3.582 | 3.484 | 4.148 | 3.307 |

## Limitations

The current scope of AdaTT is strictly limited to monophonic audio inputs and outputs, rendering it unsuited for polyphonic music transfer without architectural modifications. Additionally, the framework does not preserve original spatial acoustic cues such as room reverberation or microphone positioning from the source recording.

## Why read this

Researchers and audio engineers working on generative music editing and text-to-music controls should read this paper to see how target-adaptive structural scaling successfully resolves the conflict between content preservation and timbre adaptation. It provides a blueprint for combining lightweight prediction modules with frozen diffusion backbones to handle heterogeneous acoustic conditioning.

## Code

- https://dabinkim0.github.io/adatt/

## Applications

Music production, composition assistance, and automated instrumental arrangement for non-proficient creators.

## Institutions / 機構

KAIST

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Korea government (MSIT), Artificial Intelligence Graduate School Program (KAIST), National Research Foundation of Korea

## Related

- (link related pages by id as the wiki grows)
