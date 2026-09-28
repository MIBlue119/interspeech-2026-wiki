---
id: kutsakov26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2343
pdf: https://www.isca-archive.org/interspeech_2026/kutsakov26_interspeech.pdf
---

# GigaChat Audio: Time-aware Large Audio Language Model

[PDF](https://www.isca-archive.org/interspeech_2026/kutsakov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kutsakov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2343)

**TL;DR** — GigaChat Audio is a 10B-A1.8B large audio-language model that enables explicit temporal grounding and time-anchored summarization for audio recordings up to 120 minutes long, achieving 53.8 mIoU on 20-40 minute temporal grounding tasks.

## Problem

Existing open and proprietary audio-conditioned LLMs fail to reliably ground events in long recordings, often outputting non-parseable timestamps or coarse, unsupported claims. Standard audio token streams lack a natural representation of time, and long-form audio severely degrades models that are only trained on short clips.

## Method

The model utilizes a 10B-A1.8B MoE text backbone with a 256k-token context, paired with an encoder-subsampler-projector audio front-end that produces continuous embeddings at a 160 ms frame rate. To maintain temporal awareness, periodic inter-timing markers (such as hh:mm:ss text timestamps) are interleaved directly into the input token stream alongside continuous audio tokens. A cascaded synthetic-data pipeline generates over 10k hours of supervision from timestamped transcripts using slicing (to mitigate front-loading bias) and a global LLM verifier (using GPT-OSS-120B) to enforce consistency. Training incorporates a duration-mixture strategy across short and long audio datasets.

## Results

Evaluated on custom benchmarks and public datasets including AMI Meeting Corpus and DCASE Audio QA, the model achieves a 53.8 mIoU on 20-40 minute temporal grounding when using 60-second anchors, improving to 65.2 mIoU with 7-second anchor intervals. Ablations demonstrate that removing periodic inter-timings collapses long-form temporal grounding accuracy from 53.8 to 14.2 mIoU. Training exclusively on short audio fails to extrapolate to long recordings, whereas a multi-duration mixture successfully generalizes across all lengths up to 120 minutes.

## Code

- https://huggingface.co/aisage/GigaChat3.1-Audio-10B-A1.8B

## Applications

Engineers and users building interactive interfaces for long audio content—such as meeting assistants, podcast navigation tools, and call-center log analysers—who need verifiable timestamps and summaries linked to exact audio segments.

## Limitations

Special timing tokens require a significantly larger proportion of the SFT mix to match the performance of plain-text timestamp encodings.

## Related

- (link related pages by id as the wiki grows)
