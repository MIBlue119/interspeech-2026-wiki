---
id: mcghee26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-694
pdf: https://www.isca-archive.org/interspeech_2026/mcghee26_interspeech.pdf
---

# Feature Design and Generative Modelling in Deep Articulatory Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/mcghee26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mcghee26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-694)

**TL;DR** — This paper evaluates how different feature inputs and generative architectures impact deep articulatory synthesis, demonstrating that auxiliary source features can inadvertently distort phonetic content.

## Problem

Articulatory synthesis is widely used to evaluate speech-to-articulatory inversion models, but faithfully reconstructing input speech often requires adding back information lost during inversion via explicit features or generative modeling. However, introducing these auxiliary features can cause the resulting synthetic speech to misrepresent the underlying articulatory targets estimated from inversion. Without careful design, it becomes difficult to draw valid scientific conclusions about articulation from synthesis evaluation metrics.

## Method

The authors examine a 14-dimensional articulatory representation (ArtVVN) combined with optional source features (F0, short-time energy) and WavLM-based speaker embeddings. They implement a cascaded architecture predicting mel-spectrograms followed by a frozen BigVGAN vocoder, and contrast it with a flow-matching (FM) generative synthesiser using a Diffusion Transformer (DiT) backbone adapted from F5-TTS. Base models use a hidden dimension of 256 with 8 layers (trained on LibriTTS-R train-clean-100), while a scaled-up variant uses 12 layers and 768 hidden units (trained on train-clean-100 and 360). Inference for the flow-matching model employs an Euler solver tested across various Number of Function Evaluations (NFEs), primarily using NFE=2.

## Results

Evaluated on LibriTTS-R test-clean and VCTK clean/noisy subsets using Phone Error Rate (PER), reconstruction Mean Squared Error (MSE), UTMOS, and speaker verification metrics. Models relying on source features exhibited higher PER and MSE degradation under noisy conditions (e.g., VCTK noisy PER jumping to 17.4 with source features vs 15.0 without), indicating they over-rely on source signals for phonetic reconstruction. Increasing model capacity ('Large') matched the phonetic robustness of models with explicit source features without suffering degradation under noise. Flow-matching models achieved phonetic consistency comparable to non-generative baselines at low NFEs, while increasing NFE up to 10 improved UTMOS at the cost of higher PER.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building speech-to-articulatory inversion systems and evaluating articulatory synthesis models for phonetic analysis and explainability.

## Limitations

Base models trained on 100 hours of LibriTTS-R show limited generalisation for zero-shot speaker transfer using only WavLM speaker embeddings without scaling model capacity and data.

## Related

- (link related pages by id as the wiki grows)
