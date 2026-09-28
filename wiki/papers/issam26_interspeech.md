---
id: issam26_interspeech
category: speech-translation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2278
pdf: https://www.isca-archive.org/interspeech_2026/issam26_interspeech.pdf
---

# Cross-Modal Robustness Transfer (CMRT): Training Robust Speech Translation Models Using Adversarial Text

[PDF](https://www.isca-archive.org/interspeech_2026/issam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/issam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2278)

**TL;DR** — Cross-Modal Robustness Transfer (CMRT) improves end-to-end speech translation robustness against non-native morphological variations by over 3 BLEU points using only adversarial text data, avoiding the need for costly synthetic speech generation.

## Problem

End-to-end speech translation models struggle with non-native and dialectal speech characteristics, particularly non-standard inflectional morphology. While text machine translation addresses this via synthetic adversarial fine-tuning, applying the same technique to speech requires resource-intensive, high-fidelity text-to-speech generation. This work bridges that gap by transferring robustness directly from the text domain to the speech modality.

## Method

The method comprises two main stages: representation alignment and robustness fine-tuning. First, it aligns speech and text semantic spaces using Word-Aligned Contrastive Learning (WACO), mixup training, and a symmetric Kullback-Leibler divergence loss over a composite training objective. Second, it fine-tunes the model (with the speech encoder frozen) via adversarial text embeddings injected directly into the speech manifold using an adversarial mixup strategy. The framework introduces Speech-MORPHEUS, extending text-based inflectional attacks to speech by inflecting transcriptions, filtering out homophones using eSpeak NG, and synthesizing them into audio via XTTS-v2. Experiments use HuBERT and mHuBERT speech encoders combined with a 6-layer Transformer translation encoder-decoder.

## Results

Evaluated on the CoVoST 2 dataset across four language directions (English-German, English-Catalan, English-Arabic, and French-English) using SacreBLEU scores. CMRT-FN improves adversarial robustness by an average of over 3.4 BLEU points on the Speech-MORPHEUS test set compared to standard HuBERT-Transformer baselines, with statistically significant gains (p < 0.01). Unlike models fine-tuned on actual adversarial speech (which suffer a 3.6 BLEU drop on clean data), CMRT-FN limits the performance degradation on original clean data to just 0.6 BLEU. State-of-the-art cross-modal alignment baselines like CMOT experience an average drop of 7.4 BLEU points under identical adversarial conditions.

## Code

- https://github.com/issam9/CMRT

## Applications

Speech and ML engineers building end-to-end speech translation systems targeted at spontaneous, accented, or non-native conversational speech.

## Limitations

The approach relies on text-level adversarial generation pipelines and accurate word-level forced alignments for cross-modal space mapping.

## Related

- (link related pages by id as the wiki grows)
