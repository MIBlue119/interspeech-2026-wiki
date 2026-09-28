---
id: naveriani26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2070
pdf: https://www.isca-archive.org/interspeech_2026/naveriani26_interspeech.pdf
---

# Diffusion Language Models for Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/naveriani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/naveriani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2070)

**TL;DR** — This paper evaluates masked and uniform-state discrete diffusion language models for ASR hypothesis rescoring and introduces a joint token-level decoding framework combining CTC with uniform-state diffusion models.

## Problem

Traditional autoregressive language models limit decoding speed in speech recognition due to their strictly left-to-right generation structure. Non-autoregressive discrete diffusion models offer parallel generation and bidirectional attention, but their standalone capability for ASR joint decoding and rescoring remains largely unexplored. Investigating these models helps bridge the gap between fast parallel generation and strong linguistic context integration in speech recognition systems.

## Method

The study investigates Masked Diffusion Language Models (MDLM) and Uniform-State Diffusion Models (USDM) using Diffusion Transformer (DiT) architectures with a small variant (110M parameters) and a primary 24-layer variant (340M parameters, hidden size 1024, 16 heads). Models are trained on LibriSpeech text data using SentencePiece with 10,240 subwords. For rescoring, the authors introduce sample-level mask normalization and coupled scoring schemes to lower estimation variance. Additionally, they design a joint-decoding framework that aligns frame-wise CTC probabilities with vocabulary-wide token distributions from USDM at each denoising step using ancestral sampling.

## Results

Evaluated on LibriSpeech dev-other, the base CTC model achieves a 5.08% word error rate (WER). MDLM rescoring with sample-level mask normalization reduces WER to 4.54% (K = 256) and down to 4.47% when trained for 25 epochs. USDM rescoring also improves accuracy over the baseline, yielding 4.72% WER at K = 256. For language modeling perplexity, MDLM attains lower PPL at 5 and 10 epochs (37.0 vs 39.4 on dev), while USDM surpasses it at 25 epochs (34.0 vs 32.3 on dev).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building automatic speech recognition systems can use these techniques to improve transcription accuracy via non-autoregressive language model rescoring or joint decoding.

## Related

- (link related pages by id as the wiki grows)
