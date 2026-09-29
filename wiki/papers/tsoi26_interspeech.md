---
id: tsoi26_interspeech
category: speech-llm-dialogue
labels: [streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1053
pdf: https://www.isca-archive.org/interspeech_2026/tsoi26_interspeech.pdf
---

# Next-Turn: Duration-Aware Streaming Endpoint Detection via Time-to-Next-Speech-Onset Prediction

*Tristan Tsoi, Jiajun Deng, Yingke Zhu, Huu Quyen Dang, Tianxiang Cao, Nikita Kuzmin, Tao Zhong, Simon Lui*

[PDF](https://www.isca-archive.org/interspeech_2026/tsoi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tsoi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1053)

**Category:** `speech-llm-dialogue` · **Labels:** `streaming-real-time`

**TL;DR** — Next-Turn is a duration-aware streaming endpoint detection framework that predicts the time-to-next-speech-onset as a continuous supervision signal derived automatically from speech timestamps. It achieves an 86.7% ACC320 accuracy, yielding a 25.9% absolute improvement over existing semantic endpoint detection baselines while maintaining low latency.

## Key contributions

- Formulates semantic endpoint detection as a time-to-next-speech-onset prediction task (duration-aware objective), providing fine-grained temporal targets derived from speech timestamps without manual annotation.
- Proposes a multi-task learning framework combining binary endpoint classification and duration prediction using a shared audio encoder.
- Introduces random audio cut-off training on a pretrained semantic audio encoder to handle strict streaming constraints and limited right context.
- Demonstrates that duration-aware supervision provides increasingly substantial performance gains as the frequency of mid-utterance pauses grows.

## Problem

Conventional endpoint detection (EPD) relies heavily on acoustic Voice Activity Detection (VAD), which conflates acoustic silence with semantic completion, causing premature truncations during mid-utterance pauses or high tail latency. Text-based semantic EPD methods rely on ASR transcripts, making them sensitive to transcription errors and cascading pipeline latency. While audio-only semantic EPD bypasses ASR, it suffers from ambiguous supervision targets for semantic completion and struggles under strict streaming constraints with limited right context.

## Method

The architecture utilizes a Whisper encoder (e.g., large-v3, small, or tiny) fine-tuned using Low-Rank Adaptation (LoRA) applied to the query, key, and value projections of every encoder block (rank r=8, scaling factor alpha=32, dropout p=0.05). The encoder processes audio in non-overlapping 160 ms chunks and applies temporal mean pooling to its frame-level hidden states. For the output heads, the model supports either a binary classification head, a duration regression head (REG) optimized via Mean Squared Error (MSE) loss, or a duration classification head (CLS) that discretizes the remaining time into K=7 classes (one in-speech bin and six silence-duration bins ranging up to 800+ ms) optimized via cross-entropy. The multi-task system jointly optimizes L = L_bin + L_dur with a shared encoder.

During training, input segments are randomly truncated across speech segments, mid-utterance pauses, and post-utterance silences (where target tau is capped at tau_max = 2.0 s), with pause regions oversampled. At inference, temporal score smoothing is applied using an exponential-decay weighted average over past (P) and future (F) chunks with a decay factor gamma = 0.5. The final endpoint score can be derived from the binary head, duration head (normalized by tau_max and clipped to [0, 1]), or a weighted score fusion.

## Experimental setup

Models are trained on an in-house Chinese corpus of 1,177 hours (1,097,898 utterances) at 16 kHz, evaluated on a manually labeled hold-out test set of 1,185 utterances balanced across pause counts. Baselines include Silero acoustic VAD, Smart Turn v2/v3.2, and EasyTurn. Evaluation metrics are Early Interruption (EI) percentage and Accuracy at different latency windows (ACC_delta for delta in {160, 320, 480, 640} ms, optimizing for ACC320). Training uses the AdamW optimizer (lr=1e-4, beta1=0.9, beta2=0.98, weight decay=0.1), batch size 32 across 8 GPUs with 4-step gradient accumulation, bf16 mixed precision, and gradient clipping at 1.0 for up to 50,000 steps.

## Results

The joint-training classification setup (Joint CLS) achieves the best overall performance with an Early Interruption (EI) of 5.0% and an ACC320 of 86.7% (and 88.4% at ACC640) using the Whisper-large-v3 backbone. Compared against semantic EPD baselines under the same streaming protocol, EasyTurn reaches 60.8% ACC320 with 850M parameters and 263 ms per-chunk latency, whereas the proposed Whisper-large model surpasses it by 25.9 absolute points in ACC320 while reducing latency. Smaller variants maintain strong capabilities, with Whisper-small (89M params, 52 ms latency) achieving 81.1% ACC320, and Whisper-tiny (8M params, 23 ms latency) achieving 73.2% ACC320—outperforming Smart Turn v3.2 of equivalent size by 52.2 absolute points in EI.

Ablations on pause counts reveal that duration-aware models scale monotonically in benefit: gains over the binary baseline in ACC320 increase from +0.0 to +7.6 points as mid-utterance pause counts escalate from 0 to 4+. The method does not win when evaluated on open-domain multilingual conversations outside its in-house Chinese training distribution without domain adaptation.

| System | Param. (M) | Latency (ms) | EI (%) | ACC320 (%) | ACC640 (%) |
|---|---|---|---|---|---|
| Acoustic VAD (Silero, thr=480ms) | 0.5 | 3 | 45.7 | 10.4 | 52.5 |
| Smart Turn v3.2 | 8 | 21 | 64.5 | 30.5 | 35.4 |
| EasyTurn | 850 | 263 | 31.1 | 60.8 | 67.8 |
| Next-Turn (Whisper-tiny) | 8 | 23 | 12.3 | 73.2 | 78.2 |
| Next-Turn (Whisper-small) | 89 | 52 | 10.7 | 81.1 | 83.5 |
| Next-Turn (Whisper-large) | 640 | 152 | 5.0 | 86.7 | 88.4 |

## Limitations

The evaluation dataset is limited to 1,185 manually annotated utterances in Chinese, restricting demographic and cross-lingual conclusions. The model is trained entirely on an in-house corpus, and its performance on code-switching, diverse acoustic environments, or highly conversational multi-speaker overlaps remains unproven. Furthermore, incorporating future context windows to reduce early interruptions introduces a direct trade-off that increases response latency up to 742 ms.

## Why read this

Speech and ML engineers building real-time full-duplex spoken dialogue systems or voice assistants should read this paper to learn how to replace fragile ASR-dependent semantic turn-taking with efficient, timestamp-supervised audio encoders. It demonstrates how continuous time-to-next-speech-onset regression can drastically improve endpoint accuracy during complex mid-utterance pauses without excessive compute overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Full-duplex conversational speech interfaces, real-time simultaneous speech translation, and interactive voice response (IVR) systems.

## Institutions / 機構

Huawei, Chinese University of Hong Kong, Nanyang Technological University

## Related

- (link related pages by id as the wiki grows)
