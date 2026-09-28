---
id: zhang26y_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1625
pdf: https://www.isca-archive.org/interspeech_2026/zhang26y_interspeech.pdf
---

# SoniSpeech: A Large-Scale Open-Vocabulary Tri-Modal Dataset for Wearable Silent Speech Interfaces

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26y_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26y_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1625)

**TL;DR** — SoniSpeech introduces the first large-scale, open-vocabulary tri-modal dataset for minimally-obtrusive wearable silent speech interfaces, achieving a 26.3% word error rate using a ResNet-34 baseline.

## Problem

Wearable silent speech interfaces have been limited to small, closed vocabularies because existing open-vocabulary datasets require obtrusive hardware like facial electrodes or chin-mounted probes. Conversely, non-invasive wearable form factors like acoustic-sensing eyewear lack large-scale foundational corpora, preventing open-vocabulary conversational research. This dataset bridges that gap by providing synchronized multi-modal data in a natural conversational format.

## Method

The SoniSpeech dataset is collected using custom acoustic-sensing eyewear equipped with two speakers emitting FMCW chirps (18-28 kHz and 29-39 kHz) and two ultrasound microphones sampling at 100 kHz, alongside a synchronized laptop camera. The corpus adapts 34.1 hours of contemporary social dialogues from the SODA dataset into 18,000 parallel voiced and silent utterances across 360 sessions. The baseline model is a modified ResNet-34 sequence encoder that processes 4-channel differential echo profiles (cropped to 80 range bins at 200 Hz), uses Group Normalization, and maps 512-dimensional temporal embeddings via CTC loss. It employs a SentencePiece unigram tokenizer with a 1,000-unit vocabulary and is trained for 200 epochs using Adam with data augmentation.

## Results

Evaluated on a test set comprising 1,000 sentences (1,684 unique words, 242 out-of-vocabulary words), the CTC-based ResNet-34 baseline achieves a 26.3% word error rate on open-vocabulary silent speech recognition when trained on both voiced and silent data. Training exclusively on silent data yields a higher word error rate of 33.7%, demonstrating that parallel voiced data provides a crucial complementary training signal. The corpus features 100% ARPABET phoneme coverage across 39 phonemes and 5,356 unique word types.

## Code

- https://doi.org/10.7298/xjjr-9m85

## Applications

Speech and ML engineers developing private, low-latency, and hands-free wearable communication devices or silent speech recognition systems.

## Limitations

Data is collected from a single non-native yet fluent English speaker, and hardware issues during collection resulted in minor channel dropouts in a subset of sessions.

## Related

- (link related pages by id as the wiki grows)
