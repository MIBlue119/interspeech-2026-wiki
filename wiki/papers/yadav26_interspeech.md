---
id: yadav26_interspeech
category: translation
labels: [low-resource, multilingual, efficient-on-device, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2384
pdf: https://www.isca-archive.org/interspeech_2026/yadav26_interspeech.pdf
---

# ARTIST: Universal Articulatory Space Modeling for Multilingual Indic-to-English Speech-to-Speech Translation

*Khushal Yadav, Vinayak Abrol*

[PDF](https://www.isca-archive.org/interspeech_2026/yadav26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yadav26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2384)

**Category:** `translation` · **Labels:** `low-resource`, `multilingual`, `efficient-on-device`, `generative-model`

**TL;DR** — ARTIST is a 166M-parameter multilingual end-to-end Speech-to-Speech Translation framework mapping Indic languages to English through a universal articulatory space, outperforming the 1.2B-parameter SeamlessM4T baseline while using a fraction of the data and compute.

## Key contributions

- A shared, quantized articulatory latent space derived from a ResNet-style VQAE that enforces zero-shot cross-lingual phonetic transfer.
- Extreme parameter efficiency utilizing a 166M-parameter footprint that delivers superior translation quality over 1B+ parameter models.
- Intermediate CTC supervision injected into early encoder stages to force phonetic disentanglement from raw acoustic noise.
- A Convolution-Augmented Differential Transformer decoder that preserves global context while modeling local temporal kinematic continuity.

## Problem

Contemporary end-to-end S2ST systems like SeamlessM4T, AudioPaLM, and UnitY rely heavily on brute-force parameter scaling (exceeding 1B parameters) and massive supervised bilingual corpora, causing severe overfitting and sequence hallucinations in low-resource settings. For many Indic languages, parallel data is severely limited, making large autoregressive models fail on long-form audio. This paper addresses the lack of high-performing, data-efficient, and hallucination-resistant S2ST pipelines for linguistically diverse, low-resource language pairs by moving away from text or acoustic units toward the physiological reality of the human vocal tract.

## Method

The ARTIST framework operates in two main stages: shared multilingual articulatory pre-training and end-to-end S2A training. Source and target articulatory sequences are batch-concatenated into a joint input and mapped via a ResNet-style VQAE (three kernel-7 residual blocks, 128-dim latent, codebook size K=20) using masked BCE, VQ embedding, and commitment objectives (beta = 0.25), after which the VQAE encoder and codebook are frozen.

The core Speech-to-Articulator (S2A) pipeline maps 80-dim Mel-filterbanks through a 9-block Conformer encoder (D_model=512, h=2, Swish, kernel size 31). An intermediate CTC loss (lambda_CTC = 0.2) is applied to hidden representations via a conditioning block to predict source articulatory latents, forcing early phonetic disentanglement before 6 subsequent Conformer blocks. The representations are then passed to a 6-block Convolution-Augmented Differential Transformer decoder with causal convolution modules (kernel size 5) and Differential Attention to autoregressively predict target discrete articulatory latents (supervised by cross-entropy attention loss with lambda_Attn = 0.8).

During inference, predicted target latents are mapped to continuous articulatory features via the frozen VQAE decoder, converted to Mel-spectrograms via a lightweight FastSpeech2-inspired A2Mel generator (50M params), and synthesized into waveforms using a pre-trained HiFi-GAN-V1 vocoder (31M params). The model is optimized using AdamW (lr=1e-3, weight decay 1e-3) for 53 epochs on a single H100 GPU.

## Experimental setup

Evaluated on 11 Indic-to-English translation directions using the BhashaAnuvad benchmark (comprising IndicVoices-ST, MannKiBaat, NPTEL, and WordProject), with training sizes ranging from 10 hours (Gujarati) to 355 hours (Hindi). Evaluated on an out-of-distribution long-sequence test set featuring 1-4 hours of 20-50 second long-form audio per language. Compared against the state-of-the-art 1.2B-parameter SeamlessM4T (SM4T) baseline. Metrics include BLEU, chrF, COMET, and a Joint Efficiency Score (JES) combining performance, parameters, and training hours.

## Results

ARTIST consistently outperforms the 1.2B-parameter SeamlessM4T across high-, mid-, and low-resource settings while achieving a 23x to 231x improvement in JES. On high-resource Hindi, ARTIST achieves 22.14 BLEU and 46.41 chrF compared to SM4T's 13.21 BLEU and 32.86 chrF. In extreme low-resource Gujarati (10 training hours), ARTIST scores 16.91 BLEU and 42.13 chrF, outperforming SM4T which used 135 hours. Ablations show that removing intermediate CTC causes catastrophic failure (BLEU drops to 1.07), late CTC fusion drops BLEU to 19.68, removing the decoder convolution module drops BLEU to 19.81, and a monolingual Hindi variant drops BLEU from 22.14 to 12.95.

| System | BLEU | chrF | COMET |
|---|---|---|---|
| SM4T (Hindi High-Res) | 13.21 | 32.86 | 0.654 |
| ARTIST (Hindi High-Res) | 22.14 | 46.41 | 0.726 |
| SM4T (Tamil Mid-Res) | 6.47 | 23.12 | 0.546 |
| ARTIST (Tamil Mid-Res) | 17.32 | 44.28 | 0.673 |
| SM4T (Gujarati Low-Res) | 13.74 | 34.27 | 0.698 |
| ARTIST (Gujarati Low-Res) | 16.91 | 42.13 | 0.695 |

## Limitations

Evaluated exclusively on Indic-to-English translation across 11 Indic languages, leaving the efficacy on non-Indic or English-to-Indic directions unverified. The model relies on an auxiliary A2Mel generator and pre-trained HiFi-GAN vocoder, binding end-to-end performance to the quality of the articulatory-to-acoustic inversion step. Additionally, while tested on long-form audio (20-50s), the framework's behavior on extremely unconstrained conversational speech or highly noisy acoustic environments with overlapping speakers remains to be fully explored.

## Why read this

Researchers and engineers working on low-resource speech-to-speech translation or parameter-efficient speech architectures should read this to see how a universal articulatory physiological bottleneck can replace massive acoustic scaling and eliminate sequence hallucinations.

## Code

- https://sites.google.com/view/artist-demo/

## Applications

Direct multilingual speech-to-speech translation systems for low-resource languages, on-device translation assistants, and robust offline voice communication tools.

## Institutions / 機構

Indraprastha Institute of Information Technology Delhi

**Funding / 經費:** Nebius Research Grant, Infosys Foundation

## Related

- (link related pages by id as the wiki grows)
