---
id: aparin26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1989
pdf: https://www.isca-archive.org/interspeech_2026/aparin26_interspeech.pdf
---

# Whisper Hallucination Detection and Mitigation via Hidden Representation Steering and Sparse AutoEncoders

[PDF](https://www.isca-archive.org/interspeech_2026/aparin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/aparin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1989)

**TL;DR** — This paper investigates detecting and mitigating Whisper ASR hallucinations on non-speech audio segments via internal representation steering and sparse autoencoders, reducing the hallucination rate from 72.63% to 14.11% for Whisper small and from 86.88% to 27.33% for Whisper large-v3.

## Problem

Whisper and similar neural ASR models frequently suffer from hallucinations, generating fluent and coherent text transcriptions for non-speech audio such as silence, background noise, or music. Standard inference-time filtering heuristics based on no-speech probability and average log-probability are often insufficient because hallucinated outputs regularly slip past with high model confidence. This failure mode disrupts downstream speech pipelines and large speech-language models that rely on clean, faithful text transcriptions.

## Method

The authors evaluate two internal representation spaces from Whisper's audio encoder: raw residual stream activations and sparse autoencoder (SAE) latents trained across all encoder layers. Activations are aggregated across the temporal dimension using average pooling or non-zero average pooling for SAEs. Linear classifiers are applied to identify discriminative features and compute feature importance scores. Two fine-tuning-free steering strategies are tested: raw activation steering via contrastive activation addition and sparse latent-space steering that selects the top-k hallucination-promoting features and scales their inverse during inference.

## Results

Experiments use non-speech datasets (MUSAN, WHAM!, FSD50K, UrbanSound8K) and speech datasets (LibriSpeech, FLEURS, AISHELL-1) in English and Chinese. Both raw activations and SAE latents encode linearly separable hallucination information, with discriminative power concentrated in deeper encoder layers and sparse feature subsets. SAE-based steering consistently outperforms raw activation steering, dropping the hallucination rate from 72.63% to 14.11% on Whisper small and from 86.88% to 27.33% on Whisper large-v3 while incurring minimal degradation on genuine speech metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers using Whisper for streaming, long-term audio transcription, or as a front-end module for speech-LLM pipelines to prevent generation of fabricated text on silent or noisy segments.

## Related

- (link related pages by id as the wiki grows)
