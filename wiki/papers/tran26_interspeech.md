---
id: tran26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-628
pdf: https://www.isca-archive.org/interspeech_2026/tran26_interspeech.pdf
---

# Deepfake Word Detection by Next-token Prediction using Fine-tuned Whisper

[PDF](https://www.isca-archive.org/interspeech_2026/tran26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tran26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-628)

**TL;DR** — This paper integrates synthetic word detection into the Whisper ASR model via next-token prediction using special markup tokens, achieving low error rates on in-domain test data comparable to a dedicated ResNet detector.

## Problem

Detecting deepfake speech where only specific words inside a bona fide utterance have been synthetically altered is more complex than whole-utterance binary detection, typically requiring separate modules and complex architectures. Building dedicated localization models incurs significant data curation, training, and deployment costs. Developing cost-effective multi-task solutions that append localization capabilities directly to existing speech recognition architectures remains an important and unaddressed challenge.

## Method

The authors fine-tune the pre-trained Whisper Large (v3) encoder-decoder Transformer model for simultaneous speech transcription and synthetic word detection without modifying its architecture or training algorithm. To mark forged segments, they repurpose existing rare vocabulary tokens—specifically '!!!!!!' and '~~~~~'—as designated start (<TOF>) and end (<EOF>) flags wrapped around target word tokens. Training data curation explores two strategies: Ft.TTS using real synthetic speech corpora (LlamaPartialSpoof with 6 TTS engines) and Ft.Voc using a cheaper alternative of copy-synthesis via 6 neural and signal-processing vocoders on MLS audiobooks. Models are optimized using an H100 GPU with a learning rate of 1e-5 and batch size of 8 for 5 epochs.

## Results

Evaluated on audiobook test sets (E.Voc and E.TTS), the fine-tuned Whisper maintains low Word Error Rates while achieving synthetic word detection performance on par with a dedicated ResNet152 baseline. Specifically, on in-domain E.TTS data, fine-tuning with Ft.TTS yields a WER of 2.20% (compared to 8.13% for pre-trained Whisper), a False Acceptance Rate (FAR) of 1.38%, and a False Rejection Rate (FRR) of 1.79%, closely tracking the ResNet baseline (0.15% FAR, 3.13% FRR). However, out-of-domain evaluation on YouTube and studio datasets (E.AV1M and E.PE) reveals severe performance degradation, exposing substantial vulnerability to domain shift.

## Code

- https://github.com/nii-yamagishilab/Whisper-deepfake-word-detection

## Applications

Speech and security engineers can use this approach to deploy simultaneous speech-to-text transcription and fine-grained deepfake word localization on-device without maintaining separate detector networks.

## Limitations

The fine-tuned models suffer from severe performance degradation when evaluated on out-of-domain test data or unseen generative models, indicating limited cross-domain generalization.

## Related

- (link related pages by id as the wiki grows)
