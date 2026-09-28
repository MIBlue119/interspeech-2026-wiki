---
id: li26m_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-893
pdf: https://www.isca-archive.org/interspeech_2026/li26m_interspeech.pdf
---

# GenTSE: Enhancing Target Speaker Extraction via a Coarse-to-Fine Generative Language Model

[PDF](https://www.isca-archive.org/interspeech_2026/li26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-893)

**TL;DR** — GenTSE is a two-stage generative language model for target speaker extraction that uses coarse-to-fine token hierarchy, frozen-LM conditioning, and direct preference optimization to achieve superior speech quality and speaker consistency on Libri2Mix.

## Problem

Traditional discriminative target speaker extraction models struggle to generalize under distribution shifts and often degrade target speech fidelity, while prior language model approaches face high-entropy token spaces, exposure bias, and optimization objectives misaligned with human perception. This matters because real-world target speaker extraction requires robust separation under varied acoustic environments without sacrificing naturalness or speaker identity. GenTSE addresses these gaps through a decoupled coarse-to-fine generative hierarchy combined with targeted exposure reduction and preference alignment.

## Method

The framework comprises two decoder-only Transformer language model stages, each with 12 layers, 8 attention heads, and a hidden dimension of 1024. Stage-1 autoregressively predicts coarse semantic tokens conditioned on WavLM layer-6 continuous embeddings from reference and mixture speech. Stage-2 uses SimCodec with a single codebook of size 8192 to generate fine acoustic tokens, conditioned on the semantic tokens and Descript Audio Codec (DAC) continuous features. To mitigate exposure bias during autoregressive inference, the authors employ Frozen-LM Conditioning (FLC), duplicating base parameters into trainable branches while keeping earlier checkpoints frozen to provide realistic token histories. Finally, Direct Preference Optimization (DPO) aligns the acoustic stage with perceptual preferences using pairs sampled via top-k multinomial generation and ranked by UTMOS scores.

## Results

Evaluated on the Libri2Mix clean test set, GenTSE outperforms previous generative LM baselines (such as TSELM-L, LLaSE-G1, and Metis) across DNSMOS (3.656 overall), UTMOS (4.135), NISQA (3.399), SECS (0.928), and dWER (0.177). Compared to discriminative models like X-TF-GridNet and USEF-SepFormer, GenTSE yields higher perceptual quality and speaker similarity metrics. Ablation studies confirm that combining continuous WavLM/DAC embeddings with frozen-LM conditioning and DPO progressively boosts UTMOS and reduces differential word error rates.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers building robust speaker extraction systems for communication tools, hearing enhancement devices, or multi-speaker transcription pipelines.

## Related

- (link related pages by id as the wiki grows)
