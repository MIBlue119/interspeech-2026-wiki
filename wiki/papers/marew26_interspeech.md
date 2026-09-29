---
id: marew26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3220
pdf: https://www.isca-archive.org/interspeech_2026/marew26_interspeech.pdf
---

# Constrained CTC decoding for Efficient Diacritic Restoration

*Rufael Marew, Amr Keleg, Hanan Aldarmaki*

[PDF](https://www.isca-archive.org/interspeech_2026/marew26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/marew26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3220)

**Category:** `asr`

**TL;DR** — The paper proposes a constrained CTC decoding method for efficient Arabic speech-to-text diacritic restoration by forcing base characters from undiacritized transcripts while predicting diacritics via character-level decoding lattices, achieving significant Diacritic Error Rate (DER) reductions over multi-modal baselines.

## Key contributions

- Formulates speech-to-text diacritic restoration as a constrained CTC decoding task using a linear-chain WFST lattice built from undiacritized character skeletons.
- Eliminates the need for secondary text-encoder modules and cross-attention fusion layers used in prior multi-modal baselines.
- Demonstrates robust cross-dataset generalization across Classical Arabic (ClArTTS) and Modern Standard Arabic (ArVoice) test sets.
- Shows statistically significant reductions in Diacritic Error Rate (DER) via non-parametric bootstrap analysis (2,000 resamples, 95% CI entirely below zero).

## Problem

Arabic writing omits short vowels and diacritics (abjad system), creating widespread homograph ambiguity that impairs downstream tasks like text-to-speech and ASR. Purely text-based diacritic restoration struggles with contextual ambiguity that acoustic cues (e.g., vowel length, gemination) can resolve. Prior multi-modal speech-and-text methods couple an ASR/acoustic model with separate transformer text decoders via cross-attention, which introduces high computational complexity and generalizes poorly to new domains or dialects.

## Method

The model takes an acoustic feature sequence x and an undiacritized character sequence u = c1 ... cN, outputting a diacritized sequence y = c1 d1 ... cN dN where each base character maps to at most one merged diacritic token or blank. The acoustic model is a Wav2vec2-XLSR encoder fine-tuned using CTC loss on diacritized speech. During inference, a character-level diacritization lattice G_char(u) is constructed as a linear-chain WFST with wildcard states (representing possible composite diacritics and blank tokens) inserted between consecutive base characters from the reference transcript.

This lattice is composed directly with the CTC decoding graph or implemented via beam search restrictions, functioning as a partial forced-alignment mechanism that locks base characters in their exact reference positions while allowing the model to predict diacritics only at permitted slots. This bypasses the complex multi-stage cross-attention text fusion required by prior architectures while remaining extremely fast and lightweight.

## Experimental setup

Evaluated on ClArTTS (12h train, 0.3h test Classical Arabic read speech) and ArVoice parts 1 and 3 (6h train, 0.9h test Modern Standard Arabic read speech), totaling 18 hours of training data. Compared against a Text-only Transformer baseline (pretrained on Tashkeela) and a Text+ASR multi-modal cross-attention baseline. Metrics include Word Error Rate (WER), Character Error Rate (CER), Diacritic Coverage Rate (DCov), and Diacritic Error Rate (DER). Implemented using an AdamW optimizer (peak LR 3e-4, 1,500 warmup steps, 100 epochs, batch size 64) on an NVIDIA A100 80GB GPU.

## Results

When trained on combined ClArTTS and ArVoice datasets, the proposed constrained CTC decoding method achieves 13.05 WER and 3.80 DER on ClArTTS (outperforming the Text+ASR baseline's 29.63 WER and 9.05 DER) and 30.36 WER and 8.69 DER on ArVoice (outperforming the baseline's 34.47 WER and 9.93 DER). In cross-domain transfer (e.g., trained on ClArTTS and tested on ArVoice), the baseline degrades sharply to 56.20 WER / 19.21 DER, whereas the proposed method maintains stronger robustness with 39.89 WER / 12.04 DER. The method does not win outright in matched-domain ClArTTS when training only on ClArTTS, where it ties the Text+ASR baseline on DER (3.53 vs 3.54).

| System | ClArTTS WER | ClArTTS DER | ArVoice WER | ArVoice DER |
|---|---|---|---|---|
| Text Baseline (ClArTTS) | 33.94 | 11.70 | 80.05 | 39.97 |
| Text+ASR Baseline (ClArTTS) | 12.33 | 3.54 | 56.20 | 19.21 |
| Ours (ClArTTS) | 11.21 | 3.53 | 39.89 | 12.04 |
| Text+ASR Baseline (Combined) | 29.63 | 9.05 | 34.47 | 9.93 |
| Ours (Combined) | 13.05 | 3.80 | 30.36 | 8.69 |

## Limitations

The approach assumes a gold or reliably generated undiacritized transcript skeleton (u) is provided as input, meaning errors in the base character sequence cannot be corrected during decoding. Experiments are restricted to read speech domains (Classical and Modern Standard Arabic) and do not evaluate spontaneous conversational speech or diverse Arabic dialects. The underlying acoustic model relies on high-capacity pretrained representations (Wav2vec2-XLSR), which may limit on-device deployment in ultra-low-resource settings without distillation.

## Why read this

Speech and ML researchers working on constrained decoding, structured output generation, or speech-to-text post-processing will appreciate how WFST-based lattice constraints can entirely replace heavy multi-modal cross-attention fusion modules. Readers get a clean blueprint for injecting hard sequence-level supervision into standard CTC decoders without retraining base encoder weights.

## Code

- https://github.com/rufaelfekadu/DiaCTC

## Applications

Automated curation of large-scale diacritized speech corpora for Arabic ASR training, and text-to-speech (TTS) frontend preprocessing to resolve pronunciation ambiguities.

## Institutions / 機構

Mohamed bin Zayed University of Artificial Intelligence

## Related

- (link related pages by id as the wiki grows)
