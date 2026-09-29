---
id: yu26g_interspeech
category: speaker
institutions: ["Tsinghua University", "ModelBest"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2854
pdf: https://www.isca-archive.org/interspeech_2026/yu26g_interspeech.pdf
---

# SDR-LLM: Speech-LLM Based End-to-End Speaker Diarization and Recognition with Sentence-Level Temporal Modeling

*Renjie Yu, Yixuan Zhou, Shun Lei, Xiang Li, Runchuan Ye, Yikai Huang, Guoyang Zeng, Zhiyong Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/yu26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2854)

**Category:** `speaker`

**TL;DR** — SDR-LLM is an end-to-end speech-LLM framework that jointly performs speaker diarization, speech recognition, and millisecond-level timestamp prediction using a FIFO output sequence and a two-stage training strategy, outperforming prior end-to-end models on AISHELL-4, AliMeeting, and OleSpeech.

## Key contributions

- Formulates SDR (Speaker Diarization and Recognition) with sentence-level timestamps inside a unified Speech-LLM framework, addressing the temporal alignment limitations of prior E2E models.
- Proposes a structured FIFO output sequence design that serializes overlapping speech into a chronological token stream using speaker IDs (<|spk0|>-<|spk3|>) and quantized time boundary tokens.
- Develops a two-stage training paradigm combining simulated multi-task pre-training (on AISHELL-1, AISHELL-3, LibriSpeech) with real-world dialogue fine-tuning (AISHELL-4, AliMeeting, OleSpeech) to overcome annotated data scarcity.

## Problem

Cascaded speaker diarization and ASR systems suffer from severe error propagation where temporal offsets or speaker confusion in the front-end module ruin back-end transcriptions. Meanwhile, prior end-to-end Speech-LLM models either lack fine-grained millisecond-level timestamp outputs or depend heavily on scarce, massive, high-quality multi-speaker annotated training datasets. Solving this gap is critical to achieving robust, low-error transcription and diarization simultaneously in complex conversational dynamics like overlapping speech.

## Method

The framework utilizes FireRedASR-LLM-L (~8.3B parameters total) as its backbone, which combines a Conformer-based audio encoder from FireRedASR-AED (80 ms temporal resolution) and a Qwen2-7B-Instruct LLM foundation. To inject speaker discriminability, an auxiliary WavLM-Large encoder aggregates multilayer hidden states through a linear fusion layer, followed by a 1D convolutional downsampling adapter and a GELU/LayerNorm projection layer to match the 80 ms temporal stride. The Conformer and WavLM outputs are concatenated along the temporal dimension, combined with text prompt embeddings, and fed into the LLM.

The output sequence design adapts Whisper-style time quantization (dividing 30-second audio windows into 375 discrete timestamp tokens with an 80 ms stride) alongside qualifier tokens (<|st|>, <|/st|>, <|et|>, <|/et|>) and speaker tags (<|spk0|> to <|spk3|> up to four participants). To handle overlapping speech without acoustic source separation modules, a First-In-First-Out (FIFO) policy serializes concurrent utterances chronologically based on absolute start times, forcing the model to complete an ongoing speaker's full utterance sequence before initiating the next while preserving exact interval timestamps.

The training relies on a two-stage recipe. Stage 1 executes multi-task pre-training for 120,000 steps using 3 synthetic tasks built from single-utterance corpora (Task 1: temporal perception with silence padding; Task 2: speaker discrimination interleaving 3-4 speakers with up to 1-second overlaps; Task 3: complete dialogue simulation combining speakers, timestamps, and text). Stage 2 fine-tunes the model for 6,000 steps on real-world multi-channel meeting and podcast datasets segmented into 20-30 second clips where speakers are re-indexed chronologically. Training uses the AdamW optimizer with an initial learning rate of 1e-6, a linear warm-up over the first 10%, and a cosine annealing schedule.

## Experimental setup

Evaluated on AISHELL-4 (120h Mandarin meeting), AliMeeting (225h Mandarin meeting with overlap), and OleSpeech-IV-2025-EN-AR-100 (English conversational podcast data). Evaluated against cascaded pipelines (Pyannote / Sortformer front-ends + FireRedASR back-end), Gemini-2.5-pro, TagSpeech, and SpeakerLM. Metrics include Character Error Rate (CER), Word Error Rate (WER), corrected CER/WER (cpCER/cpWER accounting for speaker permutations), and Diarization Error Rate (DER). Implemented on 8 NVIDIA H100 GPUs using a per-card batch size of 4 for Stage 1 and 2 for Stage 2.

## Results

On the AISHELL-4 test set, the proposed model achieves a cpCER of 22.11% and a DER of 11.83%, outperforming SpeakerLM (694.06h data scale) by 3.17% absolute in cpCER. On AliMeeting, it yields a cpCER of 29.51% and a DER of 23.26%, drastically beating cascaded Pyannote+FireRedASR (cpCER 47.13%). Ablation studies confirm that removing Stage 1 pretraining or omitting any of the specialized simulation tasks (Tasks 1, 2, or 3) degrades performance across all datasets, with the full configuration achieving optimal joint behavior. The model maintains lower cpCER than cascaded baselines even as speech overlap ratios increase, though it can exhibit higher DER than cascaded tools in very low-overlap regimes.

| System | AISHELL-4 cpCER | AISHELL-4 DER | AliMeeting cpCER | AliMeeting DER |
|---|---|---|---|---|
| Pyannote + FireRedASR | 31.79% | 11.82% | 47.13% | 20.58% |
| Sortformer + FireRedASR | 29.41% | 12.42% | 34.67% | 20.72% |
| Gemini-2.5-pro | 25.27% | 27.47% | 37.50% | 39.51% |
| SpeakerLM (694.06h) | 25.28% | – | 29.60% | – |
| Proposed Full Model | 22.11% | 11.83% | 29.51% | 23.26% |

## Limitations

Assumes a fixed maximum number of speakers (capped at 4 in this implementation) and operates on fixed-duration chunks (20-30 seconds), preventing native streaming or open-ended long-form sequence scaling without windowing. The autoregressive generation loop introduces high computational latency, hindering real-time interactive deployment. Furthermore, evaluation is limited to a small handful of Chinese and English corpora, leaving cross-lingual and broad domain generalization unverified.

## Why read this

Speech and ML engineers building end-to-end multi-speaker speech systems should read this paper to see how a structured FIFO token sequence and multi-task simulation pre-training can successfully bridge the gap between ASR and diarization without cascaded error accumulation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-speaker meeting transcription, podcast analysis, automated minutes generation, and conversational AI diarization pipelines.

## Institutions / 機構

Tsinghua University, ModelBest

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
