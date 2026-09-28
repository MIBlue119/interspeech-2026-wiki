---
id: labrak26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2901
pdf: https://www.isca-archive.org/interspeech_2026/labrak26_interspeech.pdf
---

# Generating Synthetic Doctor-Patient Conversations for Long-form Audio Summarization

[PDF](https://www.isca-archive.org/interspeech_2026/labrak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/labrak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2901)

**TL;DR** — The paper introduces Synth-DoPaCo, a 1,329-hour synthetic dataset of doctor-patient conversations complete with acoustic simulations and reference SOAP notes to benchmark long-context audio reasoning.

## Problem

Long-context audio reasoning benchmarks are heavily bottlenecked by a lack of training data and privacy restrictions like HIPAA that prevent the sharing of real clinical audio. Existing public medical audio datasets are either extremely small, lack audio entirely, or fail to capture the acoustic complexity of real encounters, while current evaluation metrics struggle with open-ended generation tasks.

## Method

The pipeline utilizes Gemma 3 (27B-IT) for multi-turn dialogue generation based on structured, sampled personas and 724 unique medical chief complaints. Text dialogues are converted to multi-speaker audio via Qwen3-TTS-1.7B using conditioned voice cloning from LibriTTS profiles, and further enriched using SDialog for orchestration, Scaper for sound events, and PyRoomacoustics for ray-tracing room simulation. The audio is augmented with 16 kbps Opus compression and amplitude scaling, and reference SOAP notes are generated via an intermediate fact-extraction layer to prevent hallucinations.

## Results

The resulting Synth-DoPaCo dataset contains 8,800 synthetic conversations totaling 1,329 hours of audio partitioned into train, development, and test splits. The generated audio achieves a UTMOS naturalness score of 1.27, matching real-world Mocks (1.28) and DISPLACE-M benchmarks (1.29). Evaluations using Whisper Large V3 on wet audio yield a 2–3% WER, whereas Qwen3-ASR shows 10–14% due to Opus compression and acoustic degradation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building long-context audio language models, automated clinical documentation assistants, and spoken language understanding systems.

## Limitations

Current open-weight end-to-end models still substantially trail cascaded ASR-to-text approaches on complex open-ended medical summarization tasks.

## Related

- (link related pages by id as the wiki grows)
