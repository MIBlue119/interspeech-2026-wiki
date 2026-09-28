---
id: mokgosi26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2905
pdf: https://www.isca-archive.org/interspeech_2026/mokgosi26_interspeech.pdf
---

# Tone-Conditioned Curriculum Learning for Low-Resource Bantu Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/mokgosi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mokgosi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2905)

**TL;DR** — This paper introduces a tone-conditioned curriculum learning framework for low-resource Southern Bantu ASR, achieving an average WER of 28.41% across datasets using W2V-BERT.

## Problem

Current foundation speech models yield zero-shot word error rates exceeding 100% on Southern Bantu languages due to high tone spreading, phrasal tonal contours, and morphological complexity that standard orthographies omit. Generic fine-tuning and standard curriculum learning strategies fail to capture these distinct morphotonal features, severely limiting practical speech technology use in education and digital public services for over 80 million speakers.

## Method

The framework combines a hybrid difficulty scoring function (weighting WER at 0.7 and normalized morphotonal features at 0.3), lightweight gated tone-conditioned bottleneck adapters adding 2.1M parameters to modulate encoder representations, and a 3-stage curriculum training schedule. Utterance-level tonal features (transition rate, unique tone count, tone cluster count, F0 standard deviation, and F0 range) are extracted via Parselmouth at 10ms intervals and binned into five semitone relative tone levels. Models including Whisper, W2V-BERT, and MMS are evaluated after training on the community-curated Swivuriso dataset and testing transfer robustness on the NCHLT corpus.

## Results

Evaluated on the Swivuriso and NCHLT datasets across six Southern Bantu languages, zero-shot baseline WERs of 146.30% (Whisper) and 112.98% (MMS) are substantially reduced via fine-tuning. W2V-BERT outperforms Whisper on Nguni languages by 3 to 4 WER points (e.g., reaching 24.79% on isiZulu Swivuriso versus Whisper's 28.12%), while Whisper achieves superior performance on Sotho-Tswana languages (e.g., Setswana reaching 18.60% with tone conditioning and curriculum). W2V-BERT with tone conditioning achieves a 28.41% overall average WER across datasets and 23.79% on Xitsonga transfer.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building automatic speech recognition systems for low-resource tonal languages, particularly in education, accessibility, and public administration for Southern Africa.

## Limitations

No single model architecture universally suits all six languages, requiring careful architecture selection paired with cross-corpus validation.

## Related

- (link related pages by id as the wiki grows)
