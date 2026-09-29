---
id: masmolla26_interspeech
category: asr
labels: [self-supervised, streaming-real-time]
institutions: ["Universitat Politecnica de Valencia"]
code: https://github.com/germol00/streaming_SFMs
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3358
pdf: https://www.isca-archive.org/interspeech_2026/masmolla26_interspeech.pdf
---

# Improving streaming ASR with foundation models using emission policies

*Gerard Mas Mollà, Albert Sanchis, Alfons Juan*

[PDF](https://www.isca-archive.org/interspeech_2026/masmolla26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/masmolla26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3358)

**Category:** `asr` · **Labels:** `self-supervised`, `streaming-real-time`

**TL;DR** — A model-agnostic, training-free streaming ASR pipeline wraps around black-box speech foundation models using sliding windows, timestamp filtering, and text-only emission policies, achieving near-offline transcription quality.

## Key contributions

- A model-agnostic, training-free streaming wrapper requiring only timestamp-producing ASR models without internal tensor access.
- A sliding audio buffer design combining cumulative growth and a fixed-length window to balance acoustic context and latency.
- A timestamp-based repetition control mechanism that eliminates redundant token outputs from overlapping window inference.
- Systematic evaluation of static (Wait-K, Hold-N) and dynamic (LocalAgreement, LocalAgreement-Levenshtein) text-only emission policies for latency-accuracy trade-offs.

## Problem

While Speech Foundation Models (SFMs) excel at offline automatic speech recognition, their performance degrades severely in streaming environments due to restricted acoustic context and lack of future frames. Standard chunked decoding introduces a notable accuracy gap compared to offline processing. Existing mitigation techniques like CIF, MoChA, or AlignAtt require invasive access to internal model tensors or attention heads, binding the streaming logic to specific model architectures.

## Method

The pipeline consists of three sequential modules operating on top of any timestamp-producing ASR model: a sliding audio buffer, a timestamp-based repetition control filter, and an emission policy controller. The audio buffer ingests fixed-length chunks (Lc) into a window that grows up to a maximum length (Lmax = 20 seconds), after which the oldest chunk is pushed out. At each step, the model processes the entire window Xt = X[t·Lc - Lmax, t·Lc], generating text and token-level timestamps.

The repetition control module tracks the last committed timestamp (Tlast) to filter out duplicate tokens generated across overlapping window inferences, ensuring monotonic progression. The filtered hypotheses are fed into an emission policy module to suppress flickering and govern output timing. The study evaluates static policies—Wait-K (waiting for K additional chunks) and Hold-N (holding back the last N tokens)—as well as dynamic policies: LocalAgreement (LA), which computes the longest common prefix (LCP) of the last two consecutive hypotheses, and LocalAgreement-Levenshtein (LA-Lev), which clears segments for emission if the edit distance between consecutive hypotheses falls below a threshold tau.

## Experimental setup

Evaluated on three Open ASR Leaderboard datasets: VoxPopuli (4.9 hours), TedLium-v3 (2.6 hours), and Earnings22 (5.4 hours). Compared against offline baselines, standard NeMo streaming baselines, and SimulStreaming Whisper (using the AlignAtt policy). Experiments were conducted on a single NVIDIA RTX 4090 GPU and an Intel Core 10920X CPU, testing Parakeet-tdt-0.6b-v3 and Canary-1b-v2 models with chunk sizes Lc in {1, 2} seconds and max window Lmax in {10, 20, 30, 40} seconds.

## Results

With chunk size Lc = 2s and window Lmax = 20s, the LocalAgreement (LA) policy enables Parakeet-v3 to reach near-offline transcription quality across datasets, scoring 11.45% WER on Earnings22 (vs 11.19% offline and 25.35% standard streaming), 3.00% WER on TedLium-v3 (vs 2.8% offline), and 6.40% WER on VoxPopuli (vs 6.09% offline). Canary-v2 paired with LA-Lev (tau = 2) achieves 11.53% WER on Earnings22, outperforming its own offline baseline of 11.79%. In low-latency configurations (Lc = 1s, Lmax = 20s), Parakeet-v3 with LA outperforms SimulStreaming Whisper on Earnings22 (12.07% vs 14.92% WER) and VoxPopuli (7.15% vs 10.26% WER), though with a modest latency overhead of roughly 0.4 seconds due to black-box text-only operation.

| System / Condition | Earnings22 WER | TedLium-v3 WER | VoxPopuli WER |
|---|---|---|---|
| Parakeet-v3 Offline | 11.19% | 2.80% | 6.09% |
| Parakeet-v3 Streaming (NeMo) | 25.35% (0.80s) | 17.16% (0.82s) | 10.24% (0.77s) |
| Pkt3 + LA (Ours) | 11.45% (2.25s) | 3.00% (2.48s) | 6.40% (2.34s) |
| Canary-v2 + LA-Lev (tau=2) | 11.53% (2.05s) | 4.16% (2.44s) | 6.31% (2.24s) |
| SimulStreaming Whisper | 14.92% (1.01s) | 4.11% (1.02s) | 10.26% (0.92s) |
| Pkt3 + LA (Low-Latency, Lc=1) | 12.07% (1.32s) | 3.85% (1.47s) | 7.15% (1.28s) |

## Limitations

The approach introduces a latency overhead of approximately 0.4 seconds compared to model-aware methods like AlignAtt because text-only policies lack access to internal attention weights. Evaluation is restricted to English datasets and three specific benchmarks, leaving multilingual or simultaneous speech translation performance under streaming conditions to future work.

## Why read this

Speech and ML engineers looking to deploy large off-the-shelf speech foundation models in streaming scenarios without modifying internal model architectures or retraining weights will find a complete, model-agnostic recipe here.

## Code

- https://github.com/germol00/streaming_SFMs

## Applications

Real-time automatic speech recognition, live captioning, and simultaneous speech transcription using black-box foundation models.

## Institutions / 機構

Universitat Politecnica de Valencia

**Funding / 經費:** Government of Spain

## Related

- (link related pages by id as the wiki grows)
