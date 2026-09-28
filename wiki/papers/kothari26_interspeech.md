---
id: kothari26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3330
pdf: https://www.isca-archive.org/interspeech_2026/kothari26_interspeech.pdf
---

# Multilingual Multi-Speaker Unit Vocoders: A Systematic Analysis of Discrete Speech Representations

[PDF](https://www.isca-archive.org/interspeech_2026/kothari26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kothari26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3330)

**TL;DR** — This paper evaluates a multilingual, multi-speaker BigVGAN unit vocoder across four Indian languages, finding that larger k-means cluster sizes improve intelligibility via better phonetic resolution while explicit speaker conditioning prevents identity collapse.

## Problem

Discrete speech units derived from self-supervised representations entangle phonetic, speaker, and language information, causing speaker mixing and cross-lingual interference. Although unit vocoders are critical components in Audio LLMs and speech-to-speech translation, their behavior across varying cluster sizes, conditioning strategies, and multilingual settings remains underexplored. Studying these factors is essential to guide the design of robust speech generation systems that avoid speaker identity collapse and cross-lingual ambiguity.

## Method

The authors extend the BigVGAN architecture to operate on discrete units extracted from the 21st layer of a 22-language Data2Vec-AQC model. They train k-means cluster sizes ranging from 500 to 10k on 1,200 hours of speech, and evaluate vocoders on Bengali, Hindi, Tamil, and Telugu using 16 kHz audio segments with 26 frames per chunk. Conditioning is tested using unconditioned units, ECAPA-TDNN speaker embeddings (192-d), language embeddings (128-d) with an auxiliary cross-entropy Language Identification (LID) discriminator loss on mel-spectrograms, and a combined configuration. Training runs for 400k steps with AdamW optimizers across four NVIDIA A100 GPUs.

## Results

Evaluated on the IndicVoices-R test split (16 unseen speakers per language) using Word Error Rate (WER) and ECAPA-TDNN cosine speaker similarity, results show that unconditioned models suffer from severe speaker intermixing (similarity ~0.16–0.21) and high WER. Adding ECAPA-TDNN conditioning increases speaker similarity by 4–5x (reaching 0.67–0.77 at 10k clusters) and improves WER. Incorporating language embeddings and LID loss yields additional gains primarily at smaller cluster sizes (e.g., 1k) where units remain ambiguous, while larger cluster sizes (10k) naturally separate cross-lingual phoneme overlaps and reduce the impact of explicit language conditioning. Phoneme purity and PNMI scale steadily with cluster size, whereas cluster purity decreases as representations transition from coarse to phoneme-aligned units.

## Code

- https://github.com/UnitBigVGAN

## Applications

Engineers and researchers building multilingual speech-to-speech translation systems or Audio LLMs can use these insights to configure vocoder cluster sizes and conditioning strategies for robust, identity-preserving waveform generation.

## Limitations

The evaluation is restricted to four Indian languages out of a planned 22, and subjective MOS/UTMOSv2 evaluations did not reveal clear trends.

## Related

- (link related pages by id as the wiki grows)
