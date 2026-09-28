---
id: sun26f_interspeech
category: speech-translation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1821
pdf: https://www.isca-archive.org/interspeech_2026/sun26f_interspeech.pdf
---

# Decoding the Trade-off: A Large-Scale Analysis of Latency and Stability in LLM-based Speech Translation Cascades

[PDF](https://www.isca-archive.org/interspeech_2026/sun26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1821)

**TL;DR** — The paper presents RST, a reproducible Korean-to-English speech translation cascade, showing that aggressive segmentation can trigger a throughput backlog regime where queueing delay causes nominally fast settings to become slower in steady state.

## Problem

Production real-time subtitle systems must balance low latency with stable, readable translations, but most evaluations report only single end-to-end latencies that obscure this trade-off. Shortening VAD segments increases request rates to cloud ASR and MT services, potentially pushing system utilization past service capacity and creating a backlog avalanche where queueing delay dominates. This introduces a trilemma between segmentation granularity, throughput stability, and the contextual completeness required for accurate translation.

## Method

The authors introduce RST, a modular desktop real-time speech translation pipeline instrumented with a structured JSONL logging wrapper that records per-utterance raw timestamps and derived latency metrics. They evaluate a 2x2 cascade combining STT engines (whisper-1, GPT-4o Transcribe) and MT engines (gpt-4.1-mini, grok-4-fast-non-reasoning) across WebRTC VAD endpointing regimes. Two user-facing latency markers are measured: time-to-first-text (latency first) and time-to-stable-text (latency stable). Experiments use a controlled replay protocol on the full FLEURS Korean-to-English corpus comprising 2,851 clips and approximately 9.6 hours of audio.

## Results

Evaluated on the full FLEURS KO->EN corpus under fast and stable endpointing presets, aggressive fast settings pushed cascades into a backlog regime with median real-time factors exceeding 1, whereas stable presets maintained sustainable throughput. A Whisper context prompting ablation under stable endpointing showed that rolling and static prompt conditioning degraded Korean character error rates by +17.1 pp and +14.3 pp respectively compared to prompt-free decoding, with static prompting also leaking instruction text in 7.9% of hypotheses. Sweeping endpointing aggressiveness identified an operational stability boundary around median RTF equal to 1, below which latency remains bounded and above which queueing delay accumulates over time.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building real-time cloud-based speech translation, live subtitling, and cross-lingual meeting assistant pipelines.

## Limitations

The evaluation focuses specifically on the Korean-to-English language direction and segment-level cloud cascades without token-level streaming.

## Related

- (link related pages by id as the wiki grows)
