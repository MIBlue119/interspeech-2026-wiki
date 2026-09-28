---
id: jin26b_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1069
pdf: https://www.isca-archive.org/interspeech_2026/jin26b_interspeech.pdf
---

# Learning to Rescale: On-the-Fly Sequence Length Adaptation in Non-Autoregressive Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/jin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1069)

**TL;DR** — ElasticDLM introduces an on-the-fly sequence length adaptation mechanism for non-autoregressive text-to-speech, eliminating reliance on pre-extracted duration predictors while matching or exceeding fixed-length synthesis quality.

## Problem

Non-autoregressive text-to-speech models typically depend on accurate character-level or global duration estimates to define initial sequence lengths. Inaccurate duration predictions cause audible artifacts like unnatural speaking rates, fragmented prosody, and failure to adapt sequence lengths to varying semantic and acoustic cues. Overcoming this requires introducing variable-length generation capabilities, which is challenging due to speech signal sparsity and temporal resolution.

## Method

The framework utilizes a cascaded Diffusion Language Model architecture built on top of a 16-layer Transformer (1536 hidden size, 16 attention heads) initialized from MaskGCT's text-to-semantic model. It introduces two functional tokens—[EXPAND] and [DELETE]—to enable dynamic length regulation. A Differentiated Length-Scaling Training Scheme (DLTS) applies stochastic block-wise merging of masked tokens (with block size n=5) and insertion operations coupled with the diffusion timestep. The model is trained on 100k hours of Emilia-large using an augmented negative log-likelihood loss combined with an explicit length-scaling loss. During inference, a Hierarchical Confidence-Guided Inference (HCGI) strategy uses confidence thresholds to execute expansion and deletion operations in a coarse-to-fine manner across 50 steps.

## Results

Evaluated on Seed-TTS benchmarks (seed-test-zh and seed-testen) comparing against MaskGCT variants (Normal, Fix, and Ground-Truth length settings), the proposed model achieves competitive Word Error Rate and speaker similarity. Under the robust 'Fix' setting, it substantially outperforms standard MaskGCT on length L1 distance (Len-L1) and naturalness Mean Opinion Score (N-MOS). Ablation studies confirm that removing either the length loss or the HCGI strategy leads to severe performance degradation and sharp increases in WER and duration error.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech synthesis engineers and developers building zero-shot text-to-speech systems, intelligent assistants, and audiobooks that require robust naturalness and prosody under unconstrained input lengths.

## Related

- (link related pages by id as the wiki grows)
