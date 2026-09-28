---
id: yadav26_interspeech
category: speech-translation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2384
pdf: https://www.isca-archive.org/interspeech_2026/yadav26_interspeech.pdf
---

# ARTIST: Universal Articulatory Space Modeling for Multilingual Indic-to-English Speech-to-Speech Translation

[PDF](https://www.isca-archive.org/interspeech_2026/yadav26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yadav26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2384)

**TL;DR** — ARTIST is a 166M-parameter multilingual end-to-end speech-to-speech translation framework operating in a universal articulatory space that outperforms the 1.2B-parameter SeamlessM4T across 11 Indic languages.

## Problem

Contemporary end-to-end speech-to-speech translation models rely on heavy parameter scaling and massive parallel corpora, leading to severe overfitting, acoustic variability, and sequence hallucinations on long-form audio in low-resource settings. Addressing this is critical for enabling robust translation across linguistically diverse language families like Indic languages.

## Method

The framework uses a pre-trained Vector Quantized Autoencoder (VQAE) with a 20-token codebook to map source and target waveforms into a shared language-agnostic articulatory space. The speech encoder combines an acoustic Conformer block with intermediate Connectionist Temporal Classification (CTC) supervision to isolate phonetic content early. The decoder employs a Convolution-Augmented Differential Transformer architecture featuring causal convolutions to model local kinematic continuity and differential attention to mitigate long-sequence noise. Synthesis is performed using an Articulator-to-Mel (A2Mel) generator and a HiFi-GAN-V1 vocoder. The model totals 166M parameters and is jointly optimized using cross-entropy attention and CTC losses.

## Results

Evaluated on the BhashaAnuvad benchmark across 11 Indic-to-English translation directions with training sizes ranging from 10 to over 350 hours per language. ARTIST consistently surpasses the 1.2B-parameter SeamlessM4T baseline on BLEU, chrF, and COMET scores, particularly under extreme low-resource conditions (e.g., yielding 16.91 BLEU on 10 hours of Gujarati data compared to baseline struggles). Ablations confirm that removing intermediate CTC supervision or the convolution module degrades performance significantly.

## Code

- https://sites.google.com/view/artist-demo/

## Applications

Speech and ML engineers building memory-efficient, low-resource speech-to-speech translation systems for multilingual and dialectal deployment.

## Limitations

Evaluated specifically on Indic-to-English translation settings using short utterance training paired with long-form out-of-distribution evaluation protocols.

## Related

- (link related pages by id as the wiki grows)
