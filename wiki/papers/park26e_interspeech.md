---
id: park26e_interspeech
category: asr
labels: [streaming-real-time]
institutions: ["NVIDIA"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2005
pdf: https://www.isca-archive.org/interspeech_2026/park26e_interspeech.pdf
---

# Pushing the Boundaries of Streaming Multi-Speaker ASR: A Systematic Study of Architectural Trade-offs

*Taejin Park, Ivan Medennikov, Kunal Dhawan, Weiqing Wang, Jagadeesh Balam, Boris Ginsburg*

[PDF](https://www.isca-archive.org/interspeech_2026/park26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2005)

**Category:** `asr` · **Labels:** `streaming-real-time`

**TL;DR** — This paper presents a systematic architectural study of streaming multi-speaker ASR, categorizing existing methods into four paradigms and introducing a Permutation-Invariant Dynamic Time Warping (PI-DTW) algorithm to make word-level Serialized Output Training (WL-SOT) scale for long-form audio.

## Key contributions

- A unified architectural framework categorizing streaming multi-speaker ASR into four distinct paradigms based on multi-instance usage and fine-tuning requirements.
- The Permutation-Invariant Dynamic Time Warping (PI-DTW) algorithm combined with an inverse-frequency weighting function to resolve speaker-label permutation ambiguities between RTTM timestamps and SOT transcripts.
- A novel streaming word-level SOT (WL-SOT) model integrating an Arrival-Order Speaker Cache (AOSC) to maintain speaker supervision over indefinite conversational durations.
- Comprehensive empirical benchmarking of all four paradigms on real-world conversational corpora (CH109, Mixer6, AMI) under strict streaming constraints, quantifying trade-offs in cpWER, single-speaker degradation, memory footprint, and training cost.

## Problem

Deploying multi-speaker ASR in streaming real-world environments requires balancing low latency, accurate handling of overlapping speech, and long-context conversation tracking. Prior end-to-end SOT systems suffer from the 'Train-Short Infer-Long' dilemma because they are trained on short audio clips (e.g., 12 seconds in LibriCSS) and fail to generalize to long-form streams. Furthermore, speaker spill-over between conversational turns creates severe label-permutation mismatches between diarization timestamps and text transcripts, blocking scalable training data preparation for SOT-based streaming multi-talker architectures.

## Method

The paper builds all four evaluated streaming multi-speaker systems using a shared foundation: a 0.6B parameter FastConformer RNN-T encoder (Nemotron Speech ASR) and streaming Sortformer v2.1 for diarization. The four paradigms are: (1) Cascaded ASR and Diarization (independent operation, timestamp mapping); (2) Diarization Masked Input (applying speaker-dependent masks directly to input acoustic features across multiple parallel instances); (3) Word-Level SOT (WL-SOT), which serializes multi-speaker outputs and employs an Arrival-Order Speaker Cache (AOSC) and speaker kernel mechanism to condition encoder states; and (4) Diarization-Conditioned Self-Speaker Adaptation (SSA), which spawns parallel ASR instances explicitly conditioned on diarization embeddings.

To enable WL-SOT training on variable-length clips (10 to 55 seconds) derived from long conversations, the authors propose PI-DTW. The algorithm minimizes a combined local cost function comprising a frame-level mismatch cost normalized by simultaneously active speakers (to handle overlaps) and an inverse-frequency speaker weighting ($w_k = K / n_{s_k}$) that guarantees uniform contribution per speaker. This is added to an L1 speaking-time ratio cost vector based on text character counts versus RTTM durations, optimized simultaneously across all candidate permutations ($P$) in a batched dynamic programming pass. Training of WL-SOT proceeds in two stages on 8x NVIDIA Tesla A100 GPUs: 50k steps on short segments (8-12s) followed by 20k fine-tuning steps on variable-length utterances (10-55s) with a learning rate of $2 \times 10^{-4}$.

## Experimental setup

Evaluated on real-world conversational benchmarks including CH109 (two-speaker Call-Home English subset), Mixer6, and the AMI Meeting Corpus (Individual Headset Mix [IHM] and Single Distant Microphone [SDM] conditions). Training data combines AMI, ICSI, DipCo, Fisher English Corpus, and Granary datasets. Metrics include concatenated minimum permutation word error rate (cpWER), Diarization Error Rate (DER), and single-speaker WER across Hugging Face OpenASR leaderboard datasets. The base model size is 0.6B parameters with a streaming latency of 1.04 seconds.

## Results

On conversational multi-speaker datasets (Table 1), the Self-Speaker Adaptation (SSA / diarization-conditioned) approach achieves the lowest concatenated minimum permutation word error rate (cpWER), averaging 16.18% with oracle diarization and 23.36% with estimated diarization across CH109, Mixer6, AMI IHM, and AMI SDM. The proposed WL-SOT model achieves an average cpWER of 28.66% (oracle) and 33.46% (diar), outperforming the Masked Input (30.06% / 34.77%) and Cascaded (45.25% / 42.27%) paradigms.

However, Table 2 reveals that WL-SOT suffers significant single-speaker accuracy degradation on standard single-speaker benchmarks (averaging 16.95% WER on Hugging Face OpenASR datasets compared to 7.16% for the Nemotron base model). Conversely, the SSA paradigm successfully preserves single-speaker accuracy (averaging 7.44% WER) with virtually no degradation while delivering top-tier multi-speaker handling.

| System | CH109 (diar) | Mixer6 (diar) | AMI IHM (diar) | AMI SDM (diar) | Average (diar) |
|---|---|---|---|---|---|
| Cascaded | 30.72 | 39.97 | 43.54 | 54.83 | 42.27 |
| Masked Input | 24.27 | 35.39 | 30.66 | 48.75 | 34.77 |
| WL-SOT (Ours) | 32.29 | 28.58 | 31.38 | 41.60 | 33.46 |
| SSA (Diar. Cond.) | 12.69 | 18.75 | 22.10 | 39.91 | 23.36 |

## Limitations

The WL-SOT model suffers from pronounced single-speaker accuracy degradation on clean single-speaker data, indicating that serialized output training alters single-speaker representations when forced to learn multi-talker formatting. The evaluation is currently restricted to English conversational corpora, and scaling WL-SOT training data remains computationally demanding. Additionally, multi-instance schemes like SSA incur high memory footprints and computational overhead as the number of concurrent speakers grows.

## Why read this

Speech and ML engineers building real-time interactive voice agents or multi-speaker speech-to-speech systems should read this paper to understand the exact trade-offs between cascaded, masked-input, SOT, and diarization-conditioned architectures. It provides practical blueprint choices and introduces PI-DTW, an essential algorithm for overcoming label alignment bottlenecks in streaming SOT training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time conversational voice agents, multi-talker duplex communication systems, meeting transcription pipelines, and streaming speech-to-speech translation.

## Institutions / 機構

NVIDIA

## Related

- (link related pages by id as the wiki grows)
