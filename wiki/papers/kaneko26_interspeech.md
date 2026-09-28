---
id: kaneko26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1596
pdf: https://www.isca-archive.org/interspeech_2026/kaneko26_interspeech.pdf
---

# MeanVoiceFlow2: Joint Optimization of Mean Flow and Content Encoder for Fast One-Step Zero-Shot Voice Conversion

[PDF](https://www.isca-archive.org/interspeech_2026/kaneko26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kaneko26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1596)

**TL;DR** — MeanVoiceFlow2 jointly optimizes a flow-based voice conversion module and an efficient content encoder via conversion distillation and real-data reconstruction, achieving roughly 9× faster inference and higher perceptual quality than its teacher model.

## Problem

While one-step flow-matching voice conversion models like MeanVoiceFlow eliminate multi-step generation bottlenecks, they still depend on a computationally heavy pretrained content encoder that accounts for the vast majority of the inference latency. Relying solely on pairwise distillation can also cause statistical averaging and degrade realism. Overcoming these hurdles without external pretrained neural vocoders is essential for fast, high-fidelity zero-shot voice conversion.

## Method

The framework replaces the fixed pretrained content encoder with a lightweight trainable student content encoder and a student average velocity U-Net, jointly optimized using conversion distillation from a MeanVoiceFlow teacher and real-data reconstruction. It incorporates a diffusion-GAN objective with logit-normal sample mixing to enhance sample realism without external modules. Additionally, a teacher-guided conditioning augmentation path passes teacher-generated speaker-augmented speech through the content encoder to enforce speaker-invariant, high-disentanglement representations without explicit feature-level L1 constraints. The models are trained on VCTK and LibriTTS datasets downsampled to 22.05 kHz using 80-dimensional log-mel spectrograms.

## Results

Evaluated on VCTK and LibriTTS (8,100 speaker-sentence pairs for objective metrics, 90 pairs for subjective MOS tests), MeanVoiceFlow2 achieved a conversion Real-Time Factor (RTF) of 0.00084 on an NVIDIA RTX 4090, representing a ~9× speedup over MeanVoiceFlow (RTF 0.0072) while improving UTMOS (4.05 vs 3.98) and DNSMOS (2.99 vs 2.85) and maintaining strong speaker similarity (SECS 0.887). Subjectively, it scored 3.93 in naturalness (nMOS) compared to MeanVoiceFlow's 3.76, and outperformed FasterVoiceGrad while requiring no external neural vocoder. Ablations confirmed that combining reconstruction, diffusion-GAN sample mixing, and conditioning augmentation is vital for optimal performance.

## Code

- https://www.kecl.ntt.co.jp/people/kaneko.takuhiro/projects/meanvoiceflow2/

## Applications

Speech engineers and developers building real-time, low-latency zero-shot voice conversion systems and accent modification applications.

## Limitations

The framework's current scope is evaluated on English corpora (VCTK, LibriTTS) and relies heavily on a pre-trained teacher model for initial distillation guidance.

## Related

- (link related pages by id as the wiki grows)
