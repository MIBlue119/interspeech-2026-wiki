---
id: zheng26b_interspeech
category: asr
institutions: ["Huawei Technologies"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1124
pdf: https://www.isca-archive.org/interspeech_2026/zheng26b_interspeech.pdf
---

# Balancing ASR and diarization in end-to-end LLMs for multi-talker speech recognition

*Naijun Zheng, Yuke Lin, Sanli Tian, Mengtian Li, Zhiwei Lin, Longshuai Xiao, Dandan Tu*

[PDF](https://www.isca-archive.org/interspeech_2026/zheng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zheng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1124)

**Category:** `asr`

**TL;DR** — This paper presents a 0.7B parameter end-to-end multi-talker ASR and diarization model that balances tasks via dual-encoder temporal interleaving, a length-aware speaker ID loss, and an adaptive loss mask, achieving relative cpCER improvements of 18% on AliMeeting and 24% on Aishell4 compared to baselines.

## Key contributions

- A dual-encoder feature fusion architecture using temporal interleaving of semantic and chunked speaker features, outperforming feature-wise concatenation.
- A segment-aware speaker identification loss function weighted by token length, improving alignment with speaker diarization metrics like cpCER.
- An adaptive ASR loss mask that suppresses high-loss tokens in overlapped speech regions to prevent LLM repetition hallucinations.
- A multi-stage training curriculum using an internal 4k-hour two-speaker conversational corpus followed by fine-tuning on real meeting data.

## Problem

Pipeline multi-talker speech recognition systems combine independent ASR and diarization modules, failing to leverage joint semantic and speaker context and struggling during speech overlaps. While recent LLM-based end-to-end approaches handle this, they typically demand massive proprietary multi-talker corpora (e.g., thousands of hours) that are expensive to annotate. Furthermore, training on overlapped speech frequently triggers repetition hallucinations in the decoder because models over-emphasize unintelligible high-loss tokens.

## Method

The architecture comprises three main blocks: an ASR encoder (SenseVoice-small, combining final and intermediate CTC hidden states), a speaker feature encoder (Campplus with multi-scale chunking at 400ms, 200ms, and 100ms), and a decoding backend (Qwen2.5-0.5B-Instruct). Total parameter size is approximately 0.7B, projecting features to 896 dimensions. A multi-stage training recipe is used: stage 1 trains semantic features using WenetSpeech; stage 2 introduces speaker features and special speaker-change tags (<SC>) using a 4k-hour simulated two-speaker corpus; stage 3 simulates up to 8-speaker conversations; and stage 4 fine-tunes on real meeting corpora with LoRA on the ASR encoder and LLM.

To fuse features, temporal interleaving alternates semantic and speaker chunks every 20 frames (1.2 seconds) using positional encodings without digital tokens. The training objective sums the ASR loss and a length-weighted speaker identification loss. To address repetition hallucinations caused by unintelligible speech overlaps, an adaptive ASR loss mask filters out tokens whose cross-entropy loss exceeds a dynamic threshold derived from the sample's loss mean with a lower bound of 2.0.

## Experimental setup

Evaluated on AliMeeting (Eval: 297 segments, Test: 737 segments, ~25.8% overlap in train) and Aishell4 (Eval: 973 segments, ~7.2% overlap in train), using only the first channel of far-field audio. Compared against cascaded baselines (Paraformer + 3D-Speaker / DiariZen-large) and end-to-end models (VibeVoice-ASR, SpeakerLM). Metrics include Character Error Rate (CER%), concatenated minimum-permutation character error rate (cpCER%), and their difference (∆cp%). Optimized using AdamW with learning rates 1e-4 (stages 1-3) and 2e-5 (stage 4), warm-up ratio 0.03, and LoRA rank 16.

## Results

On the AliMeeting test set, the proposed Temporal Interleave model with ASR masking achieves a CER of 23.61% and cpCER of 27.16% (a relative improvement over the 36.46% cpCER baseline of Paraformer+3D-Speaker). On Aishell4 evaluation, it reaches 17.18% CER and 19.98% cpCER, improving over the 28.29% baseline. Ablations show that removing the speaker loss degrades cpCER, while setting the ASR mask threshold to infinity (no mask) increases AliMeeting Test cpCER from 27.16% to 29.71%, and setting threshold to zero (masking all ASR loss) degrades Aishell4 CER to 28.94%.

| System | AliMeeting Eval CER/cpCER | AliMeeting Test CER/cpCER | Aishell4 Eval CER/cpCER |
| --- | --- | --- | --- |
| Paraformer + 3D-Speaker | 31.80 / 36.39 | 27.78 / 32.46 | 22.67 / 28.29 |
| Paraformer + DiariZen-large | 31.80 / 36.09 | 27.78 / 33.09 | 22.67 / 26.34 |
| VibeVoice-ASR (7B) | 31.38 / 39.20 | 29.47 / 35.86 | 21.65 / 26.23 |
| Semantic Feature Only | 26.66 / 31.11 | 26.12 / 31.94 | 18.38 / 23.08 |
| Temporal Interleave (w/o mask) | 28.07 / 30.77 | 26.22 / 29.71 | 18.41 / 21.45 |
| Temporal Interleave (Proposed) | 25.56 / 27.96 | 23.61 / 27.16 | 17.18 / 19.98 |

## Limitations

The evaluation is restricted to meeting corpora (AliMeeting and Aishell4) using only 50-second segmented chunks, which bypasses full-recording long-context dependency challenges. The system is tested primarily on Mandarin meeting domains with up to 3 speakers on average, leaving open-vocabulary multi-language scalability and arbitrary speaker count handling unproven.

## Why read this

Researchers and engineers building efficient end-to-end multi-talker ASR systems should read this to see how combining a small 0.7B LLM backbone with dual-encoder temporal interleaving and adaptive loss masking matches or beats much larger models without massive proprietary training data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Meeting transcription, multi-talker subtitle generation, and conversational dialogue understanding.

## Institutions / 機構

Huawei Technologies

## Related

- [SDR-LLM: Speech-LLM Based End-to-End Speaker Diarization and Recognition with Sentence-Level Temporal Modeling](yu26g_interspeech.md) — same problem · relatedness 3.0/3
- [Joint Learning Global-Local Speaker Classification to Enhance End-to-End Speaker Diarization and Recognition](dai26b_interspeech.md) — same problem · relatedness 2.8/3
- [Beyond Mimicry: Constrained Exploration with GRPO for Joint Multi-Talker ASR and Diarization under Unknown Speaker Counts](cai26c_interspeech.md) — same problem · relatedness 2.7/3
- [Grounding Spoken LLMs in Multi-Speaker Audio via Diarization Conditioning](polok26b_interspeech.md) — same problem · relatedness 2.4/3
- [Who Spoke What When? Evaluating Spoken Language Models for Conversational ASR with Semantic and Overlap-Aware Metrics](tawara26_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
