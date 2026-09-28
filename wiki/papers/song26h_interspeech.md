---
id: song26h_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/song26h_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/song26h_interspeech.pdf
---

# MER-Live: An Interactive Browser Demo of Prosody-Driven Multimodal Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/song26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26h_interspeech.html)

**TL;DR** — MER-Live is an interactive, browser-based real-time multimodal emotion recognition system driven predominantly by a lightweight 6.77-million parameter prosody-focused audio model that achieves sub-millisecond inference latency via TensorRT FP16.

## Problem

Most speech-emotion recognition systems operate offline on pre-segmented utterances with known boundaries, making them unsuitable for live, streaming deployment that requires sliding windows and real-time inference. Furthermore, multimodal fusion in real-time presents challenges in coordinating different rates and scales of predictions from audio, video, and text streams. Deploying these systems effectively requires balancing high computational efficiency with transparent confidence handling across modalities.

## Method

The acoustic branch employs a masked auto-encoder (MSMC) operating on 128x300 log-mel spectrograms, pretrained on unlabeled IEMOCAP segments and fine-tuned with a four-class linear head. The text branch acts as a non-keyword tie-breaker using ASR transcripts to emit soft probability vectors, while a confidence-driven late fusion mechanism dynamically weights modalities based on neutral probability suppression. The 6.77M-parameter model is exported to ONNX and compiled into a TensorRT 10.5 FP16 engine, supported by a browser frontend running real-time WebSocket communication and EMA smoothing.

## Results

Evaluated on the 10-fold IEMOCAP dataset, the deployed audio-only MSMC model achieves 74.03% weighted accuracy (WA) and 66.39% unweighted accuracy (UA), with multimodal configurations exceeding 83%. On an NVIDIA H200 GPU with batch size 5, TensorRT FP16 execution reduces latency to 0.24 ms—a 14x speed-up compared to PyTorch FP32 eager mode (3.36 ms)—while maintaining a maximum absolute logit error of approximately 0.001.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building real-time interactive speech applications, affective computing demos, and multimodal dialogue systems that require low-latency emotion tracking.

## Limitations

Real-time streaming mode is bounded by a ceiling near 60% accuracy due to the fixed three-second receptive field, requiring a longer 5-second capture mode to reach peak offline performance.

## Related

- (link related pages by id as the wiki grows)
