---
id: mboungou26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-766
pdf: https://www.isca-archive.org/interspeech_2026/mboungou26_interspeech.pdf
---

# Audio-visual Contrastive Alignment for Diffusion-based Visual-conditioned Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/mboungou26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mboungou26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-766)

**TL;DR** — This paper integrates an audio-visual contrastive alignment objective into diffusion-based unsupervised speech enhancement, yielding substantial gains in noise suppression and signal reconstruction especially at low SNRs.

## Problem

Unsupervised audio-visual speech enhancement methods rely on local architectural conditioning mechanisms like cross-attention without explicitly enforcing global cross-modal representation alignment. This can lead the model to under-utilize visual information when the audio stream alone provides a strong prior. Enforcing global alignment helps ensure the network robustly exploits complementary lip-reading cues during challenging noisy conditions.

## Method

The authors augment the training objective of a score-based diffusion model (AV-DiffUSEEN, using a 6.8M-parameter NCSN++M backbone) with a symmetric InfoNCE contrastive loss operating on audio and visual embeddings. Clean speech estimates at each diffusion time step are extracted using Tweedie's formula, encoded via a trainable ResNet-18 audio encoder, and aligned with visual embeddings extracted from a frozen pretrained AV-HuBERT encoder combined with a linear projection and temporal averaging. A time-dependent schedule restricts the contrastive alignment term to early denoising steps (t <= 0.3) to prioritize reliable generative reconstruction in later steps, and a warm-up schedule gradually ramps up the contrastive weight (beta_0 = 3000, temperature tau = 0.1).

## Results

Evaluated on TCD-DEMAND (matched noise) and LRS3-NTCD (mismatched cross-dataset conditions) at -5 dB and 5 dB SNRs, comparing against AV-DiffUSEEN, AO-DiffUSEEN, and FlowAVSE. In matched conditions, the proposed model improves signal-to-interference ratio (SI-SIR) by roughly 5 dB and signal-to-distortion ratio (SI-SDR) by 2.4 dB over the baseline. The largest improvements emerge at low SNRs (-5 dB), achieving a 6 dB boost in SI-SIR, 5 dB in SI-SAR, 3 dB in SI-SDR, and +0.06 in PESQ. Cross-dataset generalization tests confirm consistent superiority over baseline cross-attention fusion.

## Code

- https://github.com/cexauce/AV-CA-DiffUSE

## Applications

Engineers building robust speech enhancement systems for hearing aids, communication devices, or video conferencing tools operating in noisy environments.

## Limitations

Overweighting the contrastive alignment loss can cause the model to prioritize cross-modal agreement over acoustic fidelity, damaging speech quality.

## Related

- (link related pages by id as the wiki grows)
