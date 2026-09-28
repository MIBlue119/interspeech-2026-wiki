---
id: rong26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-837
pdf: https://www.isca-archive.org/interspeech_2026/rong26_interspeech.pdf
---

# StuPASE: Towards Low-Hallucination Studio-Quality Generative Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/rong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-837)

**TL;DR** — StuPASE is a low-hallucination, studio-quality generative speech enhancement framework that replaces the GAN-based vocoder in PASE with a flow-matching module and uses dry-target finetuning, achieving a UTMOS of 4.08 and the lowest WER of 11.57% on a challenging simulated test set.

## Problem

Generative speech enhancement models frequently suffer from hallucinations that create content and speaker inconsistencies, while discriminative models lack high perceptual quality. Although frameworks like PASE mitigate hallucination, they struggle to produce studio-quality speech under severe additive noise and reverberation because their training targets contain simulated early reflections and their GAN-based generative modules have limited capacity.

## Method

StuPASE builds upon PASE by first finetuning the semantic encoder (DeWavLM-R) and a dual-stream vocoder (DualVocoder-R) using dry, reflection-free speech targets to eliminate reflection-induced biases. Second, it replaces the GAN module with a diffusion transformer (DiT)-based flow-matching module (12 layers, 16 attention heads, hidden dim 1024) paired with an improved Vocos-based Mel vocoder. It takes continuous phonetic representations from DeWavLM-R and noisy Mel spectrograms as conditioning, and is trained using a speech-infilling paradigm where missing clean Mel segments are predicted from surrounding context and masked noisy inputs.

## Results

Evaluated on the DNS1 and a 1,000-sample simulated test set combining LibriSpeech, unseen noise, and high-RT60 RIRs (0.6-1.6 s), StuPASE is compared against TF-GridNet, FlowSE, PASE, SenSE, and Adobe Enhance Speech V2 (AES-V2). On the simulated test set, StuPASE achieves the highest UTMOS (4.08), SpeechBERTScore (0.85), Levenshtein phoneme similarity (0.90), and lowest word error rate (11.57%), while maintaining a competitive speaker similarity (0.68). In subjective listening tests across 70 samples, StuPASE leads with a Q-MOS of 4.19 and S-MOS of 3.98. Ablations confirm that dry-target finetuning boosts UTMOS from 1.61 to 3.23 for PASE, and replacing the GAN module with flow matching further elevates UTMOS to 4.01 while dropping dWER.

## Code

- https://xiaobin-rong.github.io/stupasemo/

## Applications

Engineers and developers building high-fidelity speech enhancement systems for telephony, conferencing, broadcasting, and voice assistants that require pristine studio quality without content or speaker hallucination.

## Related

- (link related pages by id as the wiki grows)
