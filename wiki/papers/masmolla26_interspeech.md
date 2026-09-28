---
id: masmolla26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3358
pdf: https://www.isca-archive.org/interspeech_2026/masmolla26_interspeech.pdf
---

# Improving streaming ASR with foundation models using emission policies

[PDF](https://www.isca-archive.org/interspeech_2026/masmolla26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/masmolla26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3358)

**TL;DR** — A model-agnostic, training-free streaming ASR pipeline wraps around black-box speech foundation models using sliding audio buffers, timestamp-based repetition control, and text-only emission policies to achieve near-offline accuracy in real time.

## Problem

State-of-the-art speech foundation models excel at offline automatic speech recognition but experience severe performance degradation in streaming environments due to restricted context. Existing streaming adaptations often rely on model-specific internal features and tensor access, preventing general applicability across diverse foundation architectures.

## Method

The proposed pipeline integrates three modular components operating in a black-box fashion: a sliding audio buffer for incremental data ingestion with chunk size Lc and maximum window Lmax, a token-level timestamp filter that eliminates duplicate and redundant text across overlapping frames, and text-only emission policies governing output timing. The authors evaluate static policies (Wait-K, Hold-N) and dynamic policies (LocalAgreement and LocalAgreement-Levenshtein using longest common prefixes and Levenshtein edit distance thresholds). Experiments utilize NVIDIA's Parakeet-tdt-0.6b-v3 and Canary-1b-v2 foundation models on an RTX 4090 GPU.

## Results

Evaluated on VoxPopuli, TedLium-v3, and Earnings22 from the Open ASR Leaderboard, the system consistently outperforms standard NeMo streaming chunk-based baselines. Using dynamic LocalAgreement, Parakeet-v3 reaches near-offline accuracy at acceptable streaming latencies. In low-latency comparisons against model-aware SimulStreaming Whisper (configured with Lc = 1 and Lmax = 20), Parakeet-v3 with LocalAgreement achieves lower word error rates across all three datasets (e.g., Earnings22 WER of 12.07% vs 14.92%) with a minor latency trade-off of roughly 0.4 seconds higher delay.

## Code

- https://github.com/germol00/streaming

## Applications

Speech engineers and developers seeking to deploy off-the-shelf, high-throughput offline speech foundation models into real-time streaming ASR applications without modifying internal model weights or architectures.

## Limitations

The text-only black-box emission policies introduce a minor latency overhead compared to model-aware internal attention methods due to the absence of direct tensor guidance.

## Related

- (link related pages by id as the wiki grows)
