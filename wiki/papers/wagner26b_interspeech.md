---
id: wagner26b_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2817
pdf: https://www.isca-archive.org/interspeech_2026/wagner26b_interspeech.pdf
---

# Content is What Remains: Invariant Speech Tokenization from Parallel Utterances

[PDF](https://www.isca-archive.org/interspeech_2026/wagner26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wagner26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2817)

**TL;DR** — PINT fine-tunes a HuBERT encoder using parallel-utterance alignment and augmentations to remove non-linguistic leakage, achieving a 98.7% reduction in speaker probe accuracy, a 42% lower ABX error rate, and a 27-30% drop in language model perplexity.

## Problem

Discrete speech tokenizers derived from self-supervised learning models like HuBERT or WavLM leak non-linguistic variation such as speaker identity, prosody, and channel conditions into their token sequences. This nuisance leakage inflates conditional entropy, causes high instability under acoustic perturbations, and forces downstream generative models to waste capacity undoing entanglement. Without nuisance invariance, discrete speech tokens cannot achieve the high compressibility and predictability typical of text tokenization.

## Method

The method, called PINT (Parallel INvariant Tokenization), operates in two stages starting from a HuBERT-base encoder. Stage A jointly optimizes a sequence-level soft Dynamic Time Warping (sDTW) loss over parallel utterances, a duration-weighted word-level contrastive loss using Montreal Forced Aligner timestamps, and a phoneme cross-entropy loss from a two-layer Transformer decoder. Stage B adds a linear projection to discrete units, utilizing a student-teacher framework with connectionist temporal classification (CTC) to align utterances to shared deduplicated targets derived from group anchors. Training data combines true-parallel human corpora like VCTK, ARCTIC, and ESD with large non-parallel datasets (LibriSpeech, Tedlium) augmented dynamically via noise, reverberation, and Kokoro-synthesized parallel pairs.

## Results

Evaluated on LibriSpeech, PINT achieves 3.84 CER and 9.79 WER in continuous mode, and 4.65 CER and 12.13 WER in discrete mode (k=200), outperforming HuBERT and WavLM baselines. PINT reduces speaker probe accuracy on VCTK from 93.1% down to 1.2% and improves across-speaker ABX error to 0.040. An identical 85M-parameter autoregressive transformer language model trained on PINT tokens achieves a test perplexity of 1.95 (compared to 2.78 for HuBERT and 2.67 for WavLM) while reaching WavLM's final perplexity in 23 times fewer steps. Compressibility tests show PINT tokens compressed via RLE and BPE reach 56 bits per second, approaching text-level compressibility.

## Code

- https://github.com/nyrahealth/PINT

## Applications

Engineers building discrete speech codecs, autoregressive speech language models, and voice conversion or expressive synthesis systems can use PINT tokens as drop-in semantic targets.

## Limitations

The framework relies heavily on parallel data availability or high-quality synthetic parallel speech generation to enforce cross-utterance invariance.

## Related

- (link related pages by id as the wiki grows)
