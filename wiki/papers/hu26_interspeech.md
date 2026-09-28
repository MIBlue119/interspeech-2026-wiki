---
id: hu26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-304
pdf: https://www.isca-archive.org/interspeech_2026/hu26_interspeech.pdf
---

# ArtNet: A JEPA-Like Articulatory Predictive Framework for Robust Zero-Shot Phoneme Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/hu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-304)

**TL;DR** — ArtNet reformulates cross-lingual phoneme recognition as a non-generative, JEPA-like predictive task using articulatory features, achieving a 20.56% relative reduction in phoneme error rate across unseen languages.

## Problem

Direct acoustic-to-symbol mapping in multilingual ASR is vulnerable to language-specific variations, causing high substitution errors even on in-vocabulary phonemes during zero-shot cross-lingual transfer. Relying on surface-level acoustic representations fails to capture language-invariant phonetic properties grounded in human physiology, resulting in poor generalization to unseen languages.

## Method

The framework uses a pre-trained mHuBERT-147 (95M parameters) context encoder, fine-tuned with LoRA and a CTC objective on 100 hours of LibriSpeech English data. A pseudo-label generator converts transcriptions to IPA via Epitran, and Panphon maps them to 24-dimensional trinary articulatory vectors. ArtNet maps encoder hidden states through a variational information bottleneck (VIB) with a 128-dimensional latent space and $\beta=0.001$, using an articulatory predictor (AP) optimized with MSE reconstruction loss and KL divergence. During inference, it uses frame pooling and a novel vector-space inventory alignment (VSIA) strategy via cosine similarity in the continuous articulatory space.

## Results

Evaluated on the zero-shot test sets of seven Multilingual LibriSpeech languages (German, Dutch, French, Spanish, Italian, Portuguese, Polish). Compared to a standard SSL baseline, ArtNet combined with VSIA achieves an average relative reduction of 20.56% in phoneme error rate (PER) and 7.01% in phoneme feature error rate (PFER). Absolute PER drops by roughly 28.26 percentage points in Romance languages like Spanish. Ablations over backbones show a local-context TDNN achieves the lowest PER (54.94%) compared to an MLP (55.33%) and a global LSTM (56.51%). Substitution error analysis demonstrates a reduction in both in-vocabulary (5.67%) and out-of-vocabulary (1.62%) errors.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building low-resource, cross-lingual, or zero-shot automatic speech recognition systems for phonetic decoding and intermediate speech representation.

## Limitations

The approach relies on an initial pseudo-label generator and source-language supervision to establish phonetic alignments before training the articulatory predictor.

## Related

- (link related pages by id as the wiki grows)
