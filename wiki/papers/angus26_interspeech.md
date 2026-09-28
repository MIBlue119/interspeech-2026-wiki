---
id: angus26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/angus26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/angus26_interspeech.pdf
---

# Argmax Pro: Frontier-level Real-time Speech-to-text with Speakers and Custom Vocabulary on Mobile Devices

[PDF](https://www.isca-archive.org/interspeech_2026/angus26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/angus26_interspeech.html)

**TL;DR** — Argmax Pro is an on-device real-time speech recognition system orchestrating billion-scale models for ASR, speaker diarization, and custom vocabulary support on mobile hardware.

## Problem

First-generation on-device speech recognition systems often forced compromises in accuracy or lacked features compared to cloud-based platforms, while cloud solutions suffer from latency instability, pricing issues, and data privacy concerns. Delivering feature-rich speech recognition locally requires overcoming challenges in real-time streaming, context biasing for custom vocabulary, and robust speaker diarization without draining mobile batteries or causing thermal throttling.

## Method

The system orchestrates three billion-scale transformer models optimized for mobile NPUs across Apple, Samsung, Google, Qualcomm, and MediaTek hardware. It adapts the non-streaming Parakeet v2 ASR model for real-time streaming via a chunk-based algorithm supporting interim mutable and immutable final text outputs. For context biasing, it utilizes Canary v2 CTC with the CTC-Word Spotter algorithm, scaling custom vocabularies up to 3,000 words. Additionally, it integrates Streaming Sortformer v2 fine-tuned on synthetic conversational data via FastMSS to ensure robust streaming speaker diarization under noisy acoustic conditions.

## Results

The system successfully supports custom vocabulary sizes up to 3,000 words without adding runtime latency on mobile devices, vastly outfitting typical cloud limits of 500 words. It achieves accuracy parity between pre-recorded and real-time streaming audio inputs for Parakeet v2. It operates efficiently on-device across iOS and Android hardware leveraging dedicated NPUs and TPUs with negligible impact on battery and thermals.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Software engineers and developers building mobile applications requiring privacy-preserving, real-time speech-to-text, speaker diarization, and domain-specific custom vocabulary in fields like healthcare, legal, finance, and consumer dictation.

## Related

- (link related pages by id as the wiki grows)
