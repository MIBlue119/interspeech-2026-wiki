---
id: yadla26_interspeech
category: phonetics-linguistics
labels: [low-resource, multilingual, self-supervised, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-284
pdf: https://www.isca-archive.org/interspeech_2026/yadla26_interspeech.pdf
---

# Extreme Few-Shot Phoneme Discovery for Indigenous Australian and Pacific Languages via Typological Transfer Learning

*Prasanth Yadla*

[PDF](https://www.isca-archive.org/interspeech_2026/yadla26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yadla26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-284)

**Category:** `phonetics-linguistics` · **Labels:** `low-resource`, `multilingual`, `self-supervised`, `generative-model`

**TL;DR** — A VQ-VAE framework using Typological Anchor Selection and multi-source pre-training achieves extreme few-shot phoneme discovery on under one hour of target language speech, improving Normalized Mutual Information by 18.8% over XLS-R baselines.

## Key contributions

- Introduces Typological Anchor Selection (TAS), a principled source language selection method quantifying phonetic inventory overlap via PHOIBLE, genetic relatedness, and data availability.
- Adapts a VQ-VAE architecture with adaptive commitment weight scheduling to prevent codebook collapse on noisy heritage speech recordings.
- Establishes a rigorous evaluation protocol for extreme few-shot acoustic unit discovery on three endangered Indigenous Australian and Pacific languages.
- Proposes a two-stage training recipe (source pre-training followed by target adaptation with frozen codebooks and SpecAugment) requiring under one hour of target audio.

## Problem

Endangered Indigenous Australian and Pacific languages suffer from a severe "transcription gap," often possessing fewer than 10 hours of transcribed speech and failing entirely to meet the 100+ hour data requirements of conventional SSL models like Wav2Vec 2.0, XLS-R, and HuBERT. Furthermore, generic multilingual models exhibit severe Indo-European biases, failing to capture rare phonemic contrasts like retroflexion, vowel length, and complex tone systems in extreme low-resource (ELR) settings under 60 minutes of audio. This prevents automated digital preservation, manual transcription being prohibitively slow (100:1 hour ratio).

## Method

The system employs an adapted Vector-Quantized Variational Autoencoder (VQ-VAE) that maps raw 16 kHz waveforms ($x \in \mathbb{R}^T$) to continuous latents via a 5-layer convolutional encoder achieving 160-fold temporal downsampling (strides [5, 2, 2, 2, 2], kernel sizes [10, 3, 3, 3, 2], group normalization, and GELU activations). Vector quantization maps encoder outputs to a learnable codebook $E = \{e_k\}_{k=1}^K$ ($D=64$, frame rate 100 Hz, $K=40$). The training objective combines reconstruction loss, vector quantization codebook loss, and a commitment loss stabilized via an adaptive weight schedule starting at $\beta_{min} = 0.05$ and scaling to $\beta_{max} = 0.25$ over 10,000 warmup steps to prevent codebook collapse.

Training uses a two-stage protocol. Stage one pre-trains the VQ-VAE on selected high-resource source languages (Javanese and Tagalog, 127 and 163 hours respectively) for 100,000 steps with batch size 8, Adam optimizer ($lr = 3 \times 10^{-4}$), and an EMA codebook decay of 0.99. Stage two adapts the pre-trained model to target language data (Te Reo Māori, Pitjantjatjara, and Nauruan) limited to 60 minutes, retaining the source codebook, lowering the learning rate to $1 \times 10^{-4}$, applying SpecAugment (max 20-frame time mask, 8 mel-bin frequency mask, $\pm 2$ semitone pitch shift, and MUSAN noise at 10-20 dB SNR), and halting via early stopping if code utilization drops below 50%. The Typological Anchor Selection (TAS) score combines Phonetic Inventory Overlap (PIO) via PHOIBLE, genetic relatedness weights ($w_{gen}$), and data hours: $\text{Score}(s, t) = 0.5 \cdot \text{PIO} + 0.3 \cdot w_{gen} + 0.2 \cdot \log(\text{Hours}_s)$.

At inference, discrete codes are extracted from target utterances and post-processed by analyzing code co-occurrence to detect allophonic variants, modeling duration distributions with Gaussian mixture models, and hierarchically clustering codebook vectors.

## Experimental setup

Evaluated on three target language datasets restricted to 60 minutes of training audio: Te Reo Māori (Māori Speech dataset), Pitjantjatjara (endangered language archives), and Nauruan (ELAR collection). Source languages are Javanese (127 hours, Common Voice) and Tagalog (163 hours). Compared against five baselines: Wav2Vec 2.0 (English LibriSpeech), XLS-R (300M parameters, 128 languages), HuBERT (English), VQ-VAE with random initialization, and the proposed typological transfer method. Metrics include Normalized Mutual Information (NMI) and cluster purity under perturbation (10,000 permutations). Implemented on a single NVIDIA DGX Spark, model size is ~20M parameters.

## Results

The typological transfer method achieves consistent improvements over the XLS-R baseline: an 18.8% average gain in Normalized Mutual Information (NMI) and a 15.6% average increase in cluster purity across all three target languages ($p < 0.01$). Specifically, on Te Reo Māori, the proposed system scores 0.57 NMI and 0.74 Purity, compared to XLS-R's 0.48 NMI and 0.64 Purity, and random VQ-VAE's 0.51 NMI and 0.66 Purity. Multi-source pre-training combining Javanese and Tagalog outperforms single-source configurations (e.g., English yielding 0.42 NMI, Mandarin 0.40 NMI vs. Javanese 0.54 and Multi 0.57 NMI).

In data quantity ablations on Māori, the model exhibits graceful degradation, matching XLS-R's 60-minute performance (0.48 NMI, 0.64 Purity) using only 15 minutes of target language training audio. Limitations where it struggles include language isolates lacking high-resource typological relatives (degrading to random initialization), unmodeled lexical tone (e.g., Papuan tone languages), and multi-dialect heritage audio which can cause dialect variants to split into distinct pseudo-phonemes.

| System / Condition | NMI ↑ | Purity ↑ |
|---|---|---|
| **Te Reo Māori (XLS-R Baseline)** | 0.48 | 0.64 |
| **Te Reo Māori (VQ-VAE Random)** | 0.51 | 0.66 |
| **Te Reo Māori (Ours - Multi Source)** | **0.57** | **0.74** |
| **Pitjantjatjara (XLS-R Baseline)** | 0.46 | 0.60 |
| **Pitjantjatjara (Ours - Multi Source)** | **0.55** | **0.71** |
| **Nauruan (Ours - Multi Source)** | **0.56** | **0.73** |

## Limitations

The framework assumes the existence of high-resource typological relatives; for language isolates with no linguistic matches, performance degrades to random initialization. The architecture lacks explicit pitch modeling, making it suboptimal for complex tone systems common in Papuan language families. Heritage audio containing multiple unlabelled dialects can cause the model to incorrectly group dialect variants into separate phoneme clusters. Extremely noisy data under 30 minutes can still induce codebook collapse despite adaptive weight scheduling.

## Why read this

Speech and ML researchers focusing on extreme low-resource, endangered languages or cross-lingual transfer will learn how to leverage phonetic inventory overlap and VQ-VAEs to extract robust acoustic units from under one hour of untranscribed audio.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Rapid linguistic field documentation, preliminary lexicographic hypothesis generation, writing system design, and initializing semi-supervised ASR systems for endangered or unwritten languages.

## Related

- (link related pages by id as the wiki grows)
