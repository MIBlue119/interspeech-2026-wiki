---
id: taguchi26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2848
pdf: https://www.isca-archive.org/interspeech_2026/taguchi26_interspeech.pdf
---

# Pretrained self-supervised speech models can recognize unseen consonants

[PDF](https://www.isca-archive.org/interspeech_2026/taguchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/taguchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2848)

**TL;DR** — Pretrained self-supervised speech models fine-tuned on Khoisan languages consistently recognize typologically rare click consonants more accurately than non-click phonemes.

## Problem

Pretrained multilingual self-supervised ASR models are heavily biased toward high-resource languages, leaving it unclear whether they can robustly represent and recognize typologically uncommon speech sounds like click consonants. Because clicks are virtually absent from dominant pretraining corpora, marginalized speech communities risk having their distinctive phonologies suppressed or mishandled by modern speech technology. This work investigates whether these foundation models can generalize to extremely rare phonetic phenomena without native pretraining representation.

## Method

The authors construct novel ASR datasets for two click-rich Khoisan languages belonging to distinct families: G|ui (Khoe–Kwadi, ~5.7 hours, 52 clicks) and West !Xoon (Tuu, ~1.75 hours, 43 clicks). They evaluate several pretrained encoder-only self-supervised models, including Wav2Vec 2.0 variants (xlsr-53, xls-r-300m, xls-r-1b) and HuBERT variants (large-ll60k, xlarge-ll60k), along with MMS models. A Connectionist Temporal Classification (CTC) layer is appended to output phonemes, optimized using AdamW with a learning rate of 0.0003, batch size of 8, and 10 training epochs over 24GB A10 GPUs. Inference performance is benchmarked across four decoding schemes: greedy, beam search, and beam search integrated with 3-gram or 5-gram KenLM language models.

## Results

Across the evaluated models and languages, fine-tuned networks consistently achieve lower error rates on click consonants compared to non-click phonemes and vowels. Larger 1B parameter models do not universally outperform 300M parameter baselines, with configurations like wav2vec2-xls-r-300m and hubert-large-ll60k frequently beating their larger counterparts. Phoneme Error Rates (PER) demonstrate that self-supervised representations successfully transfer acoustic knowledge to support rare phonetic categories even when those specific sounds were absent during pretraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and field linguists working on inclusive automatic speech recognition and documentation tools for under-resourced, phonologically complex languages.

## Limitations

The G|ui dataset is restricted in size and cannot be fully released publicly due to containing personally identifiable information and incomplete redistribution agreements.

## Related

- (link related pages by id as the wiki grows)
