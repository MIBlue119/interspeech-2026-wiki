---
id: hu26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-494
pdf: https://www.isca-archive.org/interspeech_2026/hu26b_interspeech.pdf
---

# OmniCodec: Low Frame Rate Universal Audio Codec with Semantic–Acoustic Disentanglement

[PDF](https://www.isca-archive.org/interspeech_2026/hu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-494)

**TL;DR** — OmniCodec is a universal neural audio codec operating at ultra-low frame rates (12.5 Hz and 6.25 Hz) that achieves superior multi-domain audio reconstruction and semantic representation through a hierarchical multi-codebook design and semantic-acoustic decoupling.

## Problem

Traditional neural codecs prioritize high reconstruction fidelity at the expense of frame rate and semantic alignment, making them poorly suited as token targets for Large Language Models. Conversely, models designed for extreme semanticity often sacrifice reconstruction quality and fail to generalize across diverse audio domains like speech, music, and general sound. This model bridges the gap by providing a universal codec that jointly models low-rate acoustic details and semantic information.

## Method

OmniCodec employs a dual-branch architecture combining a causal SEANet backbone and Transformers with a pre-trained Qwen3-Omni-AuT-Encoder to supply supervised semantic features. It uses a hierarchical multi-codebook structure featuring a semantic vector quantizer (codebook size 2048, dimension 1024) and residual vector quantization (RVQ) for acoustic details across 8, 16, or 32 stages. A linear adapter performs semantic-acoustic decoupling by subtracting quantized semantic features from acoustic hidden representations, while a self-guidance loss function aligns outputs of continuous and quantized latents to boost codebook utilization and stabilization. The model is trained on 160,000 hours of multi-domain data (speech, music, general sound) using a combination of multi-scale STFT, MPD/MSD/MRD frequency discriminators, and a WavLM-based perceptual discriminator.

## Results

Evaluated on LibriSpeech test-clean (speech), GTZAN (music), and AudioSet eval (general sound), OmniCodec demonstrates superior or competitive performance against baselines like Mimi, WavTokenizer, UniCodec, and AUV across bitrates. For instance, OmniCodec-16L achieves a PESQ-WB of 3.41 on speech, 2.02 on music, and 2.44 on sound, outperforming Mimi-16L while operating at a lower frame rate of 12.5 Hz. Ablation studies confirm that removing the self-guidance loss decreases codebook utilization from 0.982 to 0.974, and omitting the semantic branch or decoupling adapter degrades downstream perplexity (PPL) or reconstruction metrics.

## Code

- https://github.com/ASLP-lab/OmniCodec

## Applications

Speech and multi-modal audio Large Language Models, streaming speech interaction systems, and universal audio generation pipelines spanning speech, music, and environmental sound.

## Limitations

Speech decoupling performance lags behind models specifically specialized in speech via WavLM distillation, indicating that domain data ratios and distillation targets require further tuning.

## Related

- (link related pages by id as the wiki grows)
