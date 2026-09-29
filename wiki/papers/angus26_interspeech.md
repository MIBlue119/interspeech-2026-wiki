---
id: angus26_interspeech
category: asr
labels: [efficient-on-device, streaming-real-time]
institutions: ["Argmax"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/angus26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/angus26_interspeech.pdf
---

# Argmax Pro: Frontier-level Real-time Speech-to-text with Speakers and Custom Vocabulary on Mobile Devices

*Dylan Angus, Chen Cen, Berkin Durmus, Arda Ibis, Brian Keene, Andrey Leonov, Blaise Munyampirwa, Zach Nagengast, Arda Okan, Atila Orhon, Eduardo Pacheco*

[PDF](https://www.isca-archive.org/interspeech_2026/angus26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/angus26_interspeech.html)

**Category:** `asr` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — Argmax Pro is a unified real-time on-device speech-to-text system orchestrating three billion-scale transformer models to deliver cloud-equivalent accuracy, streaming diarization, and support for up to 3,000 custom vocabulary words on mobile NPUs.

## Key contributions

- Bridges the accuracy gap between pre-recorded and streaming ASR for Parakeet v2 using an interim/final mutable transcription streaming algorithm.
- Integrates Canary v2 CTC via the CTC-WS algorithm to support custom vocabularies of up to 3,000 words without increasing runtime latency.
- Adapts Streaming Sortformer v2 with synthetic acoustic data to achieve robust on-device streaming speaker diarization.
- Optimizes execution across diverse mobile hardware platforms, targeting NPUs on Apple, Samsung, Google, Qualcomm, and MediaTek devices.

## Problem

First-generation on-device speech recognition systems either lacked critical features like speaker diarization and custom vocabulary or forced severe accuracy trade-offs during real-time streaming. Meanwhile, dominant cloud-based solutions suffer from latency instability, per-minute pricing, intermittent outages, and severe data privacy risks that restrict deployment in high-stakes domains like healthcare and finance. Furthermore, existing cloud platforms typically restrict custom vocabulary size to fewer than 500 words, failing to accommodate specialized domain jargon or large personal contact lists. Argmax Pro addresses these limitations to offer a viable, feature-rich on-device alternative.

## Method

The system architecture coordinates three core billion-scale transformer components: Parakeet v2 for base ASR, Canary v2 CTC for context biasing, and Streaming Sortformer v2 for speaker diarization. For streaming ASR, Parakeet v2—originally designed for batch, pre-recorded audio—is adapted using a chunk-based algorithm with an interim and final transcription mechanism, enabling the model to dynamically correct its ongoing hypotheses prior to emitting immutable tokens.

To handle custom vocabulary up to 3,000 words, the system utilizes Canary v2 CTC powered by the CTC-WS algorithm, bypassing the sub-500 word limits common in cloud systems without incurring extra mobile latency. Streaming speaker diarization is powered by Streaming Sortformer v2, which undergoes specialized fine-tuning on synthetic data explicitly generated to simulate complex real-world acoustic variations and background noise.

All models are aggressively optimized to execute directly on the Neural Processing Units (NPUs) and Tensor Processing Units (TPUs) of modern mobile chipsets—including Apple Silicon, Qualcomm Snapdragon, MediaTek Dimensity, and Google Tensor—ensuring execution runs with minimal thermal throttling and negligible battery drain.

## Experimental setup

The system is evaluated on mobile deployment targets spanning iOS (iPhone, iPad, Mac) and Android (Qualcomm, MediaTek, and Google Tensor hardware). Baselines include typical cloud-based speech platforms and first-generation on-device engines. Metrics focus on streaming word error rate (WER), keyword recognition accuracy for names and specialized jargon, custom vocabulary scaling thresholds up to 3,000 words, and hardware performance characteristics including memory footprint, thermal output, and battery impact.

## Results

Argmax Pro achieves accuracy parity between real-time streaming and pre-recorded audio input using the adapted Parakeet v2 streaming inference algorithm. The integration of Canary v2 CTC via CTC-WS successfully scales custom vocabulary support to 3,000 words—six times the standard 500-word limit of major cloud platforms—while maintaining real-time mobile latency. Fine-tuning Streaming Sortformer v2 on synthetic acoustic noise distributions yields robust streaming diarization in adverse acoustic environments across mobile hardware.

| System / Condition | Max Custom Vocabulary | Diarization Support | Streaming Accuracy Parity |
|---|---|---|---|
| Standard Cloud Platforms | < 500 words | Varies (Cloud) | Yes |
| 1st-Gen On-Device ASR | Missing / Limited | No | No |
| Argmax Pro (Ours) | 3,000 words | Yes (Streaming) | Yes |

## Limitations

While tested across major mobile chipsets, performance may vary on low-end or legacy devices lacking dedicated NPU accelerators. The synthetic data training for speaker diarization may not cover every edge-case acoustic environment or overlapping speech scenario in the wild. Language and dialect coverage beyond the primary target distributions are not exhaustively detailed.

## Why read this

Speech and mobile ML engineers should read this paper to understand how to co-design and optimize multiple billion-scale transformer models for low-power mobile NPUs without sacrificing cloud-grade features like large custom vocabularies and streaming diarization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time mobile dictation, offline meeting transcription apps, healthcare documentation, and on-device voice assistants requiring strict data privacy.

## Institutions / 機構

Argmax

## Related

- [Pushing the Boundaries of Streaming Multi-Speaker ASR: A Systematic Study of Architectural Trade-offs](park26e_interspeech.md) — same problem · relatedness 2.1/3
- [Improving Streaming Speaker Diarization for LLM Based Multi-talker Speech Understanding](lin26f_interspeech.md) — same problem · relatedness 2.0/3
- [A Compact Fully-Open Cache-Aware Streaming Model for Japanese ASR](yang26r_interspeech.md) — same problem · relatedness 2.0/3
- [SDR-LLM: Speech-LLM Based End-to-End Speaker Diarization and Recognition with Sentence-Level Temporal Modeling](yu26g_interspeech.md) — same problem · relatedness 2.0/3
- [Distilling LLM Semantic Priors into Encoder-Only Multi-Talker ASR with Talker-Count Routing](shi26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
