---
id: marew26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3220
pdf: https://www.isca-archive.org/interspeech_2026/marew26_interspeech.pdf
---

# Constrained CTC decoding for Efficient Diacritic Restoration

[PDF](https://www.isca-archive.org/interspeech_2026/marew26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/marew26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3220)

**TL;DR** — This paper proposes a constrained CTC decoding framework for speech-based Arabic diacritic restoration, achieving superior diacritic error rates and computational efficiency compared to complex multi-modal baselines.

## Problem

Arabic text lacks short vowels and diacritics, creating severe ambiguities that degrade downstream speech applications like text-to-speech and assistive readers. While incorporating acoustic speech signals helps disambiguate text, existing multi-modal speech-text diacritization models are computationally heavy and generalize poorly across different Arabic varieties like Modern Standard Arabic and Classical Arabic.

## Method

The authors introduce a non-autoregressive speech-to-text diacritization method built on top of a standard CTC-based Automatic Speech Recognition model. During decoding, they construct a character-level weighted finite-state transducer (WFST) lattice that enforces hard constraints from the undiacritized transcript skeleton. This forces the model to retain base alphabetical characters in their exact order while permitting wildcard insertions solely for valid diacritic tokens at designated positions. The acoustic encoder is initialized from a pre-trained wav2vec 2.0 (XLSR-53 Arabic) model and fine-tuned on diacritized speech datasets.

## Results

Evaluated on Classical Arabic (ClArTTS, 12h train / 0.3h test) and Modern Standard Arabic (ArVoice, 6h train / 0.9h test) datasets, the proposed method is compared against text-only transformer baselines and text+ASR multi-modal baseline models. The proposed constrained CTC decoding achieves a Diacritic Error Rate (DER) of 3.17% on ClArTTS (outperforming the text+ASR baseline's 3.54%) and 7.73% on ArVoice (outperforming the text+ASR baseline's 11.9%), while also providing substantial improvements in cross-domain generalization.

## Code

- https://github.com/rufaelfekadu/DiaCTC

## Applications

Speech and NLP engineers working on Arabic speech recognition, speech synthesis, and text normalization pipelines can use this method to accurately restore missing diacritics.

## Limitations

The approach assumes a reliable undiacritized character sequence skeleton is available as an input constraint during inference.

## Related

- (link related pages by id as the wiki grows)
