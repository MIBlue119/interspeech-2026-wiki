---
id: tsoi26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1053
pdf: https://www.isca-archive.org/interspeech_2026/tsoi26_interspeech.pdf
---

# Next-Turn: Duration-Aware Streaming Endpoint Detection via Time-to-Next-Speech-Onset Prediction

[PDF](https://www.isca-archive.org/interspeech_2026/tsoi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tsoi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1053)

**TL;DR** — Next-Turn is a duration-aware streaming endpoint detection framework that predicts time-to-next-speech-onset, achieving a 25.9% absolute improvement in 320 ms accuracy over the strongest baseline.

## Problem

Reliable streaming endpoint detection is difficult because speakers frequently pause mid-utterance due to hesitations or disfluencies, causing acoustic-only VAD systems to trigger prematurely or too late. While semantic endpoint detection helps resolve this, it suffers from ambiguous training supervision and strict low-latency streaming constraints.

## Method

The framework utilizes a pretrained Whisper encoder fine-tuned with LoRA (rank 8) that predicts the remaining time until the next speech onset at each audio frame. The duration target is defined as zero during speech, the remaining silence duration during mid-utterance pauses, and a constant maximum duration (2.0 seconds) for post-utterance silence. The duration prediction head is implemented in two modes: regression (REG) using mean-squared error or classification (CLS) discretizing duration into 7 bins. A multi-task objective jointly optimizes binary endpoint classification and duration prediction, while random audio cut-off training limits future context look-ahead for real-time streaming.

## Results

Evaluated on an in-house corpus of 1,177 hours of Chinese speech and a balanced test set of 1,185 utterances using Whisper-large-v3, Whisper-small, and Whisper-tiny backbones. The best joint classification model (Joint CLS) achieved an early interruption rate of 5.0% and an endpoint accuracy within 320 ms (ACC320) of 86.7%, outperforming acoustic VADs and semantic baselines like Easy Turn (ACC320 of 60.8%). Smaller variants like Whisper-tiny (8M parameters) attained 73.2% ACC320 while requiring only 23 ms per-chunk latency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building full-duplex conversational spoken dialogue systems, real-time speech translation pipelines, and interactive voice assistants.

## Limitations

Evaluated primarily on an in-house Chinese speech corpus, and absolute evaluation results may be sensitive to the modest size of the manually annotated test set.

## Related

- (link related pages by id as the wiki grows)
