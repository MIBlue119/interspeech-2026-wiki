---
id: makishima26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1582
pdf: https://www.isca-archive.org/interspeech_2026/makishima26_interspeech.pdf
---

# Multi-Talker ASR Unaffected by Speaker Change Count

[PDF](https://www.isca-archive.org/interspeech_2026/makishima26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/makishima26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1582)

**TL;DR** — A speaker change token-masked autoregressive model for multi-talker automatic speech recognition prevents performance degradation when test audio contains more speaker changes than seen during training.

## Problem

Current multi-talker ASR systems concatenate transcriptions with special speaker change tokens to handle multiple speakers jointly, but their inference performance drastically suffers when encountering a higher frequency of speaker changes than present in the training set. Creating custom training data for every possible conversational length and turn-taking frequency is prohibitively expensive, and alternative methods that isolate speakers discard chronological conversational structure. Consequently, models fail to correctly count and transcribe conversational turns that exceed their training distribution bounds.

## Method

The proposed approach introduces a specialized decoder self-attention mask that prevents queries from attending to speaker change tokens and randomly selected textual tokens during training. Specifically, tokens designated as speaker changes, timestamps, or speaker identities are permanently masked (set to negative infinity attention weights), while other textual tokens are randomly masked with probability r. During inference, only the structural and speaker change tokens are masked, forcing the model to predict sequence progression without relying on prior context length or accumulated turn counts. The architecture builds on Transformer encoder-decoders tested under two formulations: standard multi-talker ASR with speaker change tokens (10 encoder blocks, 2 decoder blocks, 512 hidden dimensions) and SOMSRED-SVC for joint diarization and ASR (14 encoder blocks, 4 decoder blocks). Models were trained on pseudo-multi-talker mixtures derived from the Corpus of Spontaneous Japanese (CSJ), comprising 522 hours of training data.

## Results

Evaluated on the CSJ dataset using Character Error Rate (CER), Token Error Rate (TER), Timestamp Error Rate (EER), and Speaker Change Count Accuracy (SCCA). When trained on data containing up to 2 speaker changes and evaluated on 3 speaker changes, the conventional baseline's SCCA collapses to 60.1% while the proposed method (r=0.6) achieves 88.0% SCCA, closely matching the oracle model (99.6%). For inputs containing 4 and 5 speaker changes, the proposed method drastically reduces CER from 22.1% to 6.9% (at 4 changes) and 28.4% to 7.5% (at 5 changes) compared to the baseline. In joint ASR-diarization (SOMSRED-SVC), the method improves 3-speaker-change SCCA from 60.1% to 88.0% with r=0.4 while maintaining comparable TER and EER metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech recognition engineers and developers building conversational transcription systems for multi-speaker environments like meetings, interviews, and casual dialogues where turn-taking counts vary unpredictably.

## Limitations

Performance gaps remain compared to the oracle model when the number of masked tokens increases significantly, requiring further optimization for heavily token-augmented joint modeling frameworks.

## Related

- (link related pages by id as the wiki grows)
