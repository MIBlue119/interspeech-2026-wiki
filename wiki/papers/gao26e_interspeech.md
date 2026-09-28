---
id: gao26e_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-916
pdf: https://www.isca-archive.org/interspeech_2026/gao26e_interspeech.pdf
---

# PhASE-Flow: Phonetic-Conditioned Acoustic Flow Matching in SSL Representation Domain for Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/gao26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gao26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-916)

**TL;DR** — PhASE-Flow is a flow-matching speech enhancement framework operating directly within a self-supervised learning (SSL) representation domain, achieving state-of-the-art perceptual quality and speaker similarity with only four sampling steps.

## Problem

Conventional generative speech enhancement methods predominantly operate in the spectral or Mel domains, which either lack phase information or exhibit heavy-tailed distributions and tightly entangled acoustic-linguistic content. These limitations constrain reconstruction fidelity and make statistical modeling difficult. While self-supervised learning representations offer a structured alternative, existing approaches treat them merely as external conditioning rather than modeling directly within the SSL latent space.

## Method

PhASE-Flow uses a frozen WavLM encoder to extract acoustic representations from the first Transformer layer and phonetic representations from the final layer. It employs a Diffusion Transformer (DiT) based flow matching module with 22 layers, 16 attention heads, a 1024-dimensional hidden size, and a 2048-dimensional feed-forward size to model the clean acoustic representation distribution conditioned on phonetic cues. The training objective utilizes data prediction (x-pred) with optimal transport conditional vector fields and random acoustic dropout. Waveforms are reconstructed using an improved Vocos neural vocoder featuring 12 ConvNeXt blocks and iSTFT.

## Results

Evaluated on the DNS 2020 synthetic test set (no-reverb and with-reverb subsets), PhASE-Flow is benchmarked against TF-GridNet, StoRM, LLaSE-G1, AnyEnhance, and FlowSE using DNSMOS, UTMOS, SpeechBERTScore, Levenshtein phoneme similarity, speaker similarity, and Whisper-based dWER. On the no-reverb test set, PhASE-Flow achieves a DNSMOS of 3.40, UTMOS of 4.11, SpeechBERTScore of 0.93, and speaker similarity of 0.94, outperforming spectral-domain and diffusion baselines. Ablations confirm that operating in the acoustic SSL space with phonetic conditioning yields superior performance over Mel- or STFT-domain alternatives.

## Code

- https://anonymous.4open.science/w/phase-flow-demo-E6E1/

## Applications

Speech engineers and developers building real-time or high-fidelity speech enhancement and dereverberation systems for communication pipelines, hearing aids, and voice assistants.

## Limitations

Like many generative speech models, it suffers from minor hallucination artifacts under complex reverberant conditions, leading to decreased speaker similarity and increased word error rate on the with-reverb subset compared to discriminative models.

## Related

- (link related pages by id as the wiki grows)
