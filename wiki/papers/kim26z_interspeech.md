---
id: kim26z_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3467
pdf: https://www.isca-archive.org/interspeech_2026/kim26z_interspeech.pdf
---

# AudioGround: Fine-Grained Temporal Grounding in Audio via Deterministic Boundary Supervision

[PDF](https://www.isca-archive.org/interspeech_2026/kim26z_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26z_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3467)

**TL;DR** — AudioGround introduces a time-aware instruction-tuning dataset and a lightweight LALM extension for fine-grained temporal audio grounding, substantially outperforming existing models on moment retrieval benchmarks.

## Problem

Current Large Audio Language Models (LALMs) can describe acoustic scenes holistically but fail to precisely localize when specific sounds occur. Existing training approaches rely either on coarse multi-choice labels or unverified LLM-inferred timestamps, lacking a deterministic supervision signal. This limitation prevents general-purpose LALMs from handling tasks like audio moment retrieval or precise event timing in long-form audio.

## Method

The authors construct AudioGround-IT, a 49.9K-sample dataset spanning 835 hours of audio, created by concatenating AudioCaps clips with controlled similarity thresholds and stratified length/position biases to yield deterministic boundary targets across four tasks (grounding, duration, frequency, ordering). Architecturally, AudioGround builds on SALMONN using a dual Whisper and BEATs encoder setup with frame-level linear interpolation. It incorporates a sliding-window Q-Former conditioned on textual timestamp prompts, combined with a zero-initialized residual MLP absolute time embedding added to window output tokens. The model is fine-tuned for 6,000 steps with an effective batch size of 24 using LoRA adapters.

## Results

Evaluated on temporal grounding benchmarks including Clotho-Moment and TUT-Sound Events 2017, AudioGround significantly outperforms baseline zero-shot LALMs such as Qwen2-Audio-Instruct, Qwen2.5-Omni, GAMA, DeSTA2.5-Audio, SALMONN, and Audio Flamingo2. The paper demonstrates that training on a synthetically constructed, boundary-supervised dataset of 49K samples achieves competitive performance to much larger unverified collections.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers building surveillance systems, meeting assistants, or media search tools that require localizing exact sound event timestamps within extended recordings.

## Related

- (link related pages by id as the wiki grows)
