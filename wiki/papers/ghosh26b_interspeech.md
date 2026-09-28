---
id: ghosh26b_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-518
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26b_interspeech.pdf
---

# LipAdapter: Text-to-Video Alignment is All You Need for Lip-to-Speech

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-518)

**TL;DR** — LipAdapter transforms a frozen pre-trained text-to-speech model into a lip-synchronized speech generator using a lightweight text-to-video alignment module, achieving state-of-the-art performance on 15x less training data than previous methods.

## Problem

End-to-end lip-to-speech models require massive training datasets (over 430 hours) and suffer from degraded speech naturalness because their generation components are trained from scratch rather than leveraging modern, high-quality text-to-speech models. This bottleneck heavily restricts progress in low-resource settings and cross-language generalization.

## Method

The framework extracts lip embeddings from silent videos using a pretrained VTP feature extractor and phoneme representations from XPhoneBERT, then aligns them via a novel monotonic alignment network with query and key projection layers. During the first 20K steps, it utilizes soft alignment for full differentiability, followed by Monotonic Alignment Search (MAS) to extract hard phoneme durations. The temporally regulated phoneme representations are fed into a frozen ZMM-TTS model (comprising Text2Vec and Vec2Wav modules) using a multilingual wav2vec 2.0 codebook. The text-to-video aligner and the Text2Vec module are lightly fine-tuned using a monotonic alignment likelihood objective and a path-concentration regularizer.

## Results

Evaluated on the LRS3 and MultiVSR datasets, LipAdapter matches or exceeds baselines using only 30 hours of training data compared to 430+ hours for prior arts like V2SFlow and LipVoicer. On LRS3, it achieves a Word Error Rate (WER) of 21.2%, STOI of 0.944, DNSMOS of 3.13, LSE-C of 6.165, and LSE-D of 8.250. Human subjective evaluation (MOS) demonstrates superior intelligibility (4.3) and competitive naturalness and synchronization. Zero-shot evaluations across French, German, Portuguese, and Spanish confirm robust cross-lingual generalization without additional training.

## Code

- https://lipadapter.github.io/

## Applications

Assistive technologies for speech impairments, voice restoration in silent or corrupted video recordings, and enhanced communication in noisy environments.

## Limitations

Performance relies on the accuracy of the underlying visual speech recognition and transcription modules used to generate initial text prompts.

## Related

- (link related pages by id as the wiki grows)
