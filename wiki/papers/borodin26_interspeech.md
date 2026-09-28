---
id: borodin26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-83
pdf: https://www.isca-archive.org/interspeech_2026/borodin26_interspeech.pdf
---

# Balalaika: Data-Centric, Prosody-Aware Annotation Pipeline for Russian Speech

[PDF](https://www.isca-archive.org/interspeech_2026/borodin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/borodin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-83)

**TL;DR** — We introduce Balalaika, an open-source, data-centric pipeline for processing Russian speech and producing a 5.1k-hour corpus with prosody-aware annotations that consistently improves speech denoising and text-to-speech models under equalized training budgets.

## Problem

Web audio mining for speech generation is hindered by a reliance on manual curation and scripted audiobooks, creating a lack of high-quality, spontaneous training data. Prevailing pipelines also ignore phonetic and prosodic nuances like vowel reduction and mobile lexical stress, which are critical for morphologically rich languages such as Russian.

## Method

The Balalaika pipeline integrates SmartTurnV3.1 for context-preserving semantic VAD segmentation, filtering based on CREST-factor, NISQA-S MOS (threshold > 4.2), and pyannote speaker diarization for single-speaker purity. Transcriptions are generated via multi-ASR ensembling of five models (GigaAM-CTC-v3, GigaAM-CTC-v3 with n-gram LM, GigaAM-RNNT-v3, Vosk, and T-one) combined with ROVER consensus decoding and word-level timestamps. The text is enriched with punctuation via RuPunctBig, lexical stress and e/yo normalization via RuAccent, and IPA phonemes using a lightweight transformer encoder-decoder G2P model.

## Results

Evaluated on a 5.1k-hour Russian corpus built from multiple public sources, Balalaika outperforms 11 public Russian datasets in objective quality and human MOS. When training SEMamba denoisers on 25 hours of data, our dataset achieves top objective scores including CSIG of 3.856, CBAK of 3.165, COVL of 3.340, PESQ of 2.723, and SI-SDR of 8.809. For VITS text-to-speech training, models trained on Balalaika data achieve an objective TTS MOS of 4.516, a UTMOS of 4.265, and a character error rate (CER) of 0.1062, with ablations showing that combining lexical stress and punctuation yields the best trade-off in naturalness and intelligibility.

## Code

- https://github.com/lab260ru/balalaika

## Applications

Speech engineers and researchers building high-quality text-to-speech, speech denoising, and generative speech systems for Russian or similarly morphologically complex languages.

## Limitations

All comparison models were trained under a fixed data and compute budget rather than to full convergence, and the pipeline relies on language-dependent components tailored specifically to Russian.

## Related

- (link related pages by id as the wiki grows)
