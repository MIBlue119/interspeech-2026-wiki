---
id: agarwal26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1314
pdf: https://www.isca-archive.org/interspeech_2026/agarwal26_interspeech.pdf
---

# Grounding Whisper: An Audio Anchor-Based Approach for Hallucination Mitigation and Throughput-Efficient ASR

[PDF](https://www.isca-archive.org/interspeech_2026/agarwal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/agarwal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1314)

**TL;DR** — Prepending a short acoustic anchor phrase to audio inputs eliminates Whisper hallucinations on silence and enables safe batch concatenation, reducing overall word error rate from 32.18% to 13.23%.

## Problem

Large speech foundation models like Whisper suffer from severe hallucination errors on silence and non-speech environmental audio, generating random spurious transcriptions that undermine production reliability. Existing mitigations such as VAD filtering, confidence thresholds, and token suppression only partially alleviate these errors, while conversational short utterances underutilize Whisper's fixed 30-second context window, leading to significant throughput waste.

## Method

The authors introduce anchor audio, an input-level technique that prepends a short, acoustically distinct and domain-orthogonal synthetic phrase (empirically optimized as "Mongolia") followed by a 2.0-second silence buffer before the target audio. They evaluate five inference approaches, ranging from single-call VAD-combined augmentation to batch concatenation of multiple short utterances separated by anchor delimiters, utilizing an int8-quantized whisper-turbo-large-v3 model. A robust batch-with-fallback strategy counts token cardinalities to validate anchor delimiters post-inference, automatically falling back to individual processing if misalignment or failure occurs.

## Results

Evaluated on 33k test audio samples including a private retail dataset, UrbanSound8K non-speech clips, AMI, and LibriSpeech, the proposed batch-with-fallback approach achieves a 0.14% Hallucination Error Rate on non-speech audio and lowers overall WER from 32.18% to 13.23%. On the Urban8k non-speech set specifically, hallucination error drops dramatically from vanilla Whisper's 72.2% down to 0.38%. Compared against naive batching (which suffers an 8.45% structural failure rate), the fallback strategy maintains zero failures while preserving competitive P95 latency around 566ms at concurrency 32.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Production speech recognition and real-time customer service conversational pipelines utilizing Whisper models that require robust hallucination suppression and optimized GPU inference throughput.

## Limitations

The batch-with-fallback approach incurs slight latency overhead compared to naive batching due to re-processing fallback segments when delimiter validation fails.

## Related

- (link related pages by id as the wiki grows)
