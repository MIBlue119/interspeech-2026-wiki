---
id: thahmid26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2199
pdf: https://www.isca-archive.org/interspeech_2026/thahmid26_interspeech.pdf
---

# Layer-wise Probing of Whisper's Encoder Representations for Bengali Phone-like Units

[PDF](https://www.isca-archive.org/interspeech_2026/thahmid26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/thahmid26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2199)

**TL;DR** — This paper investigates how Bengali phone-like units are represented across OpenAI's Whisper encoder layers, revealing that larger models form broad late-layer plateaus with minimal final-layer performance degradation.

## Problem

Multilingual speech encoders are widely used as general-purpose feature extractors, but the distribution of phonetic information across their layers remains poorly understood for supervised models like Whisper, particularly for South Asian languages like Bengali. Understanding where phonetic information concentrates helps engineers determine which encoder layers to extract features from for downstream tasks.

## Method

The authors train lightweight linear probes (multinomial logistic regression with L2 regularization) and MLPs on frozen encoder representations from Whisper-small (12 layers), -medium (24 layers), and -large-v3 (32 layers) using speaker-disjoint evaluation. Phone-like supervision is extracted via the MMS forced aligner on uromanized transcripts from an OpenSLR Bengali corpus, mapping segments to 50 Hz encoder frames via temporal overlap and central-third pooling. They benchmark against a self-supervised wav2vec2-XLSR encoder and an English LibriSpeech MFA cross-lingual baseline, alongside robustness controls including ABX discriminability and alignment-confidence filtering.

## Results

On a 2,000-utterance Bengali subset, Whisper-small peaks at layer 8/12 with 0.837 Macro-F1, medium peaks at layer 15/24 with 0.858 Macro-F1, and large-v3 peaks at layer 26/32 with 0.860 Macro-F1. While wav2vec2-XLSR exhibits a steep late-layer decline of 14 percentage points from its peak, Whisper-large-v3 drops by only 2 percentage points at the final layer, indicating supervised ASR training preserves phonetic detail deeper into the network. Per-class analysis shows aspirated stops and affricates are linearly separable in early layers, whereas nasals and sibilants drive mid-layer gains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers utilizing multilingual ASR encoder representations for downstream phonological, acoustic, or transfer-learning tasks in low-resource languages.

## Limitations

The targets rely on heuristic uromanization proxies and MMS forced alignment rather than a manually verified canonical phoneme inventory, and evaluated segments are brief with a median duration of 20 ms.

## Related

- (link related pages by id as the wiki grows)
