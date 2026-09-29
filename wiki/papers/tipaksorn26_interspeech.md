---
id: tipaksorn26_interspeech
category: enhancement-separation
labels: [generative-model]
institutions: ["NECTEC", "Thammasat University"]
code: https://github.com/CAI-NECTEC/AV-FlowSep
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1960
pdf: https://www.isca-archive.org/interspeech_2026/tipaksorn26_interspeech.pdf
---

# AV-FlowSep: Audio-Visual Target Speaker Separation via Flow Matching

*Pattara Tipaksorn, Wayupuk Sommuang, Kwanchiva Thangthai*

[PDF](https://www.isca-archive.org/interspeech_2026/tipaksorn26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tipaksorn26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1960)

**Category:** `enhancement-separation` · **Labels:** `generative-model`

**TL;DR** — AV-FlowSep is an audio-visual target speaker separation system based on conditional flow matching and a Diffusion Transformer that achieves high-quality separation in as few as a single inference step. It matches or exceeds prior diffusion models while requiring far fewer steps and demonstrating strong cross-dataset generalization.

## Key contributions

- Formulates audio-visual target speaker separation using conditional flow matching (CFM) to learn straight transport paths from mixture mel-spectrograms to clean mel-spectrograms.
- Adopts a Diffusion Transformer (DiT-S) backbone with AdaLN and cross-attention to integrate temporal visual cues from the target speaker.
- Enables high-quality generation with only 1 to 5 inference steps, drastically reducing computation compared to traditional 30-step diffusion models.
- Demonstrates superior data efficiency and robust zero-shot cross-dataset generalization when trained on a substantially smaller dataset than competing models.
- Achieves more balanced separation quality between dominant and weaker speakers across diverse gender pairing conditions.

## Problem

Existing audio-only separation models degrade significantly under noisy acoustic conditions, while deterministic audio-visual approaches often produce over-smoothed spectrograms that lose fine-grained acoustic details. Conversely, prior generative diffusion models generate high-quality samples but suffer from slow multi-step iterative inference and introduce unwanted artifacts. These limitations hinder practical deployment in real-world scenarios requiring both high fidelity and low latency.

## Method

AV-FlowSep takes a raw waveform and extracts a 100-channel log mel-filterbank representation. Visual features are extracted using the temporal encoder frontend from TalkNet-ASD (comprising a 3D conv layer, ResNet-18, and V-TCN) to capture lip dynamics and facial appearance. The core separation network uses a DiT-S backbone containing 12 layers, 6 attention heads, and a hidden dimension of 384. The model concatenates the noisy mixture mel-spectrogram and the interpolated noisy state along the channel dimension as input. Timestep conditioning is injected via adaptive layer normalization (AdaLN) MLPs, and visual features are integrated through multi-head cross-attention where audio tokens act as queries and visual features serve as keys and values.

The framework adopts conditional flow matching with an optimal transport formulation, defining the source distribution as the mixture mel-spectrogram and the target as the clean mel-spectrogram, establishing a straight-line transport path. The velocity field estimator is optimized by minimizing the CFM loss over uniformly sampled timesteps. At inference, the ordinary differential equation is solved from t=0 to t=1 using the Euler method with either 1 or 5 steps. Finally, the estimated clean mel-spectrogram is converted back to a 24 kHz waveform using a Vocos vocoder, bypassing complex spectrogram estimation to reduce learning complexity.

## Experimental setup

The model is trained on VoxCeleb2 (comprising 400,000 mixtures and 30,000 development samples) and evaluated on both VoxCeleb2-2Mix and LRS2-2Mix datasets. Zero-shot generalization is assessed using LRS2 without fine-tuning. Evaluations use speech-speech and speech-noise (AudioSet) scenarios with SNRs between -5 and 5 dB. Baselines include SepFormer, VisualVoice, AV-MossFormer2, and AVDiffuSS. Metrics include DNSMOS (SIG, BAK, OVRL), wide-band PESQ, and mel cepstral distortion (MCD). Training uses the Adam optimizer with a learning rate of 1e-4, EMA decay of 0.999, batch size of 8, and runs for 1,000 epochs on NVIDIA A100 GPUs.

## Results

On VoxCeleb2-2Mix, AV-FlowSep achieves a PESQ of 2.484 and MCD of 5.985 in 1 inference step, outperforming the diffusion baseline AVDiffuSS (PESQ 2.341, MCD 15.950 requiring 30 steps) while utilizing 53.6M parameters. In speech-noise scenarios on VoxCeleb2, AV-FlowSep attains the highest overall DNSMOS (OVRL 3.336) and lowest MCD (4.400) among generative models. In zero-shot evaluations on LRS2, AV-FlowSep maintains stable performance with minor degradation, scoring a 1-step PESQ of 2.364 on speech-speech and an overall DNSMOS of 3.359 on speech-noise.

While AV-MossFormer2 achieves higher absolute PESQ scores in-domain due to training on a much larger dataset, AV-FlowSep demonstrates superior data efficiency and narrower performance gaps (Delta PESQ) between dominant and weaker speakers across gender conditions.

| System | Steps | VoxCeleb2 PESQ | VoxCeleb2 MCD | LRS2 PESQ | LRS2 MCD |
|---|---|---|---|---|---|
| Mixture | - | 1.853 | 11.697 | 1.709 | 12.009 |
| SepFormer | - | 2.658 | 9.326 | 2.484 | 9.707 |
| VisualVoice | - | 2.355 | 7.814 | 2.763 | 5.285 |
| AV-MossFormer2 | - | 3.341 | 4.054 | 2.243 | 8.787 |
| AVDiffuSS | 30 | 2.503 | 15.950 | 1.475 | 16.254 |
| AV-FlowSep (Ours) | 1 | 2.751 | 5.985 | 2.404 | 7.276 |

## Limitations

The model relies on full-face visual inputs which can introduce a speaker confusion rate of 12.60% under zero-shot conditions, as the model occasionally relies on facial appearance shortcuts rather than robust audio-visual correspondence. The evaluation is currently restricted to single-target speaker separation mixtures, and the framework has not yet been scaled to multi-speaker cocktail party environments or integrated directly with downstream speech recognition tasks.

## Why read this

Speech and ML researchers working on generative speech enhancement or audio-visual separation should read this paper to see how conditional flow matching enables high-fidelity, single-step inference without the slowdowns of traditional diffusion models.

## Code

- https://github.com/CAI-NECTEC/AV-FlowSep

## Applications

Real-time audio-visual speech enhancement, hearing assistive devices, video conferencing noise suppression, and robust automatic speech recognition in noisy environments.

## Institutions / 機構

NECTEC, Thammasat University

**Funding / 經費:** NECTEC, NSTDA

## Related

- (link related pages by id as the wiki grows)
