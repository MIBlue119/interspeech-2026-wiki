---
id: yadla26_interspeech
category: low-resource
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-284
pdf: https://www.isca-archive.org/interspeech_2026/yadla26_interspeech.pdf
---

# Extreme Few-Shot Phoneme Discovery for Indigenous Australian and Pacific Languages via Typological Transfer Learning

[PDF](https://www.isca-archive.org/interspeech_2026/yadla26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yadla26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-284)

**TL;DR** — The paper introduces an extreme few-shot phoneme discovery framework using typological transfer learning via VQ-VAE, achieving an 18.8% improvement in Normalized Mutual Information over self-supervised baselines on under one hour of target speech.

## Problem

Endangered languages often have fewer than ten hours of transcribed audio, while conventional acoustic unit discovery assumes over 100 hours of unlabeled data and generic self-supervised models suffer from Indo-European phonological biases. This transcription gap stalls the preservation and documentation of threatened Indigenous Australian and Pacific languages that exhibit complex phonetic contrasts. Standard fine-tuning also fails in these extreme low-resource regimes due to severe overfitting.

## Method

The framework utilizes Typological Anchor Selection (TAS) to choose optimal source languages from the PHOIBLE database based on phonetic inventory overlap, genetic relatedness, and data availability. It employs a Vector-Quantized Variational Autoencoder (VQ-VAE) featuring convolutional layers, group normalization, GELU activations, and an adaptive commitment weight schedule to prevent codebook collapse on noisy heritage recordings. Training is split into two stages: pre-training on high-resource source languages (Javanese and Tagalog) for 100k steps, followed by target language adaptation using SpecAugment and retained codebooks for up to 10k steps. The model size is 20M parameters.

## Results

Evaluated on Te Reo Māori, Pitjantjatjara, and Nauruan datasets using under 60 minutes of target data, the approach is compared against Wav2Vec 2.0, HuBERT, XLS-R, and random-init VQ-VAE. It achieves an average 18.8% gain in Normalized Mutual Information (NMI) and a 15.6% improvement in cluster purity over XLS-R, with statistical significance established at p < 0.01. Ablations confirm that multi-source pre-training with Javanese and Tagalog and a codebook size of K = 40 deliver optimal performance, and that the model can match 60-minute XLS-R baselines using only 15 minutes of target data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Field linguists and speech engineers working on rapid language documentation, revitalization, lexicographic hypothesis generation, and semi-supervised ASR for endangered languages.

## Limitations

Heritage recordings often span multiple dialects which can cause the model to mistakenly treat dialect variants as distinct phonemes, and codebook collapse can still occur with extremely noisy data under 30 minutes.

## Related

- (link related pages by id as the wiki grows)
