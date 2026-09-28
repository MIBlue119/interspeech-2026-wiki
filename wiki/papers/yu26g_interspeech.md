---
id: yu26g_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2854
pdf: https://www.isca-archive.org/interspeech_2026/yu26g_interspeech.pdf
---

# SDR-LLM: Speech-LLM Based End-to-End Speaker Diarization and Recognition with Sentence-Level Temporal Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/yu26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2854)

**TL;DR** — SDR-LLM is an end-to-end Speech-LLM framework that jointly performs speaker diarization, recognition, transcription, and millisecond-level timestamp prediction using a FIFO output sequence strategy.

## Problem

Traditional speaker diarization and recognition (SDR) solutions rely on cascaded pipelines where front-end segmentation errors propagate to the back-end ASR, while existing end-to-end models often fail to provide fine-grained temporal alignment. Furthermore, high-quality multi-speaker conversational data with precise annotations is scarce and expensive to acquire. Addressing these issues under data constraints is critical for deploying robust conversational AI systems.

## Method

The framework utilizes an 8.3B-parameter Seq2Seq architecture combining a FireRedASR-LLM-L backbone (Conformer encoder and Qwen2-7B-Instruct LLM) with an auxiliary WavLM-Large encoder fused via linear projection and adapter layers. It serializes overlapping speech and speaker turns into an autoregressive target format using a First-In-First-Out (FIFO) policy and timestamp quantization with an 80 ms stride. Training proceeds in two stages: a multi-task pre-training phase using simulated single-utterance and multi-speaker synthetic data across three specific tasks (temporal perception, speaker discrimination, and dialogue simulation), followed by real-world fine-tuning.

## Results

Evaluated on AISHELL-4, AliMeeting, and OleSpeech, the proposed model outperforms existing end-to-end systems in transcription accuracy and achieves diarization performance comparable to complex cascaded pipelines. The multistage training strategy successfully leverages foundational ASR data to boost generalization in overlapping speech and rapid speaker-turn scenarios. Specific quantitative improvements validate that simulated pre-training bridges the data scarcity gap effectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building conversational AI assistants, multi-speaker meeting transcription systems, and interactive voice dialogue agents requiring simultaneous speaker attribution and precise timestamps.

## Limitations

The current setup caps the number of speakers at four to stabilize training and manage vocabulary size within benchmark constraints.

## Related

- (link related pages by id as the wiki grows)
