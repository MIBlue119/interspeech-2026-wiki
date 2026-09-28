---
id: zheng26b_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1124
pdf: https://www.isca-archive.org/interspeech_2026/zheng26b_interspeech.pdf
---

# Balancing ASR and diarization in end-to-end LLMs for multi-talker speech recognition

[PDF](https://www.isca-archive.org/interspeech_2026/zheng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zheng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1124)

**TL;DR** — An end-to-end 0.7B parameter LLM-based multi-talker speech recognition system uses a dual-encoder architecture, temporal feature interleaving, a length-aware speaker ID loss, and an adaptive loss mask for overlap regions, yielding 18% and 24% relative improvements on AliMeeting and Aishell4 corpora.

## Problem

Pipeline systems combining ASR and diarization independently fail to jointly model semantics and speaker attribution, especially during speech overlaps where errors cascade. Conversely, existing end-to-end LLM approaches typically demand massive annotated multi-talker corpora (thousands of hours) to achieve robustness against interruptions, backchannels, and overlaps. Building an efficient system requiring limited real-recorded data while avoiding repetition hallucinations on overlapped regions remains a key challenge.

## Method

The system features a 0.7B parameter dual-encoder architecture utilizing SenseVoice-small for semantic features and Camppus with multi-scale chunking (400ms, 200ms, 100ms) for speaker embeddings, combined via a temporal interleaving format where semantic and speaker chunks alternate every 1.2 seconds. A multi-stage training pipeline progresses from ASR-only pretraining on WenetSpeech to joint ASR and diarization training on simulated two-speaker conversations, scaling to eight speakers, and finally fine-tuning on real meeting data. Special <SC> tokens explicitly indicate speaker change points, paired with a length-aware speaker ID loss that weights cross-entropy by segment duration. Additionally, an adaptive loss mask automatically filters out high-loss tokens exceeding a dynamic threshold during overlap regions to suppress repetition hallucinations.

## Results

Evaluated on the AliMeeting and Aishell4 corpora using Character Error Rate (CER), concatenated minimum-permutation character error rate (cpCER), and their difference (∆cp). The proposed model achieves an AliMeeting Test CER of 23.61% and cpCER of 27.16%, and an Aishell4 Eval CER of 17.18% and cpCER of 19.98%. Compared against strong pipelines (Paraformer + 3D-Speaker/DiariZen-large) and end-to-end baselines like VibeVoice-ASR, the proposed techniques deliver relative cpCER gains of 8.5% on AliMeeting and 6.9% on Aishell4. Ablation tests demonstrate that removing the adaptive ASR loss mask degrades AliMeeting Test performance from 23.61/27.16 to 26.22/29.71 CER/cpCER, while dropping the speaker loss or segment re-alignment yields similarly poorer accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building speech-to-text transcription tools for multi-speaker environments like meeting recordings, subtitle generation, and dialogue systems.

## Limitations

The model uses a fixed speaker feature downsampling trade-off and is currently evaluated on segments up to 50 seconds, leaving longer-form context and explicit speaker registration for future work.

## Related

- (link related pages by id as the wiki grows)
