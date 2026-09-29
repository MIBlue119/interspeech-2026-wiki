---
id: sun26f_interspeech
category: translation
labels: [efficient-on-device, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1821
pdf: https://www.isca-archive.org/interspeech_2026/sun26f_interspeech.pdf
---

# Decoding the Trade-off: A Large-Scale Analysis of Latency and Stability in LLM-based Speech Translation Cascades

*Shinyoung Sun, Taehoon Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/sun26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1821)

**Category:** `translation` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — The paper investigates the latency-stability trade-off in LLM-based cloud speech translation cascades, demonstrating that aggressive endpointing causes a backlog regime (median RTF > 1) where queueing delay overrides per-request speed.

## Key contributions

- Introduces RST, a reproducible Korean-to-English (KO->EN) subtitle pipeline equipped with structured per-utterance logging.
- Formally distinguishes two user-facing latency markers: time-to-first-text (latency_first) and time-to-stable-text (latency_stable).
- Identifies a throughput-stable operating threshold defined by a median real-time factor (RTF) <= 1 through systematic endpointing sweeps.
- Uncovers a speed paradox where aggressive VAD endpointing increases request rates beyond cloud service capacity, causing steady-state latency to degrade.
- Demonstrates that Whisper prompt conditioning under short-chunk streaming degrades character error rate (CER) by +14-17 percentage points and causes instruction leakage.

## Problem

Real-time subtitling cascades must balance fast initial response with stable, readable translations. Most system evaluations report only end-to-end latency, obscuring the impact of segmentation (endpointing) choices on cloud request rates. When developers shorten segments to achieve faster perceived responsiveness, the request arrival rate can exceed the service capacity of cloud ASR and MT APIs. This triggers a backlog avalanche where queueing delays dominate, making nominally fast settings significantly slower in steady state.

## Method

The RST pipeline processes incoming audio using WebRTC VAD into discrete segments. It evaluates a 2x2 matrix of STT engines (whisper-1, gpt-4o-transcribe) and MT engines (gpt-4.1-mini, grok-4-fast-non-reasoning). Two main endpointing presets are tested: a fast preset (VAD=3, min=240 ms, max=2500 ms, hangover=120 ms) designed to mimic rapid turn-taking, and a stable preset (VAD=1, min=480 ms, max=4000 ms, hangover=240 ms) aimed at reducing request pressure.

Each utterance passes sequentially through the STT and MT stages without token-level streaming, meaning endpointing directly dictates the end-to-end request volume. The system records raw timestamps via a newline-delimited JSON logging wrapper. Metrics computed include latency_first (time to ASR completion minus segment end time), latency_stable (time to MT completion minus segment end time), and real-time factor (RTF). The key design realization is that system stability governed by queueing theory (Little's Law, N = lambda * W) dictates practical performance more than raw per-request compute speed, showing that maintaining utilization rho = lambda / mu <= 1 is essential.

## Experimental setup

Evaluated on the full FLEURS Korean-to-English subset comprising 2,851 clips (~9.6 hours of audio) using a controlled replay protocol with a 2-second silence gap between clips. Metrics reported include segment duration, latency_first, latency_stable, real-time factor (RTF), Korean Character Error Rate (CER), English BLEU, and chrF. Compares whisper-1 and gpt-4o-transcribe paired with gpt-4.1-mini and grok-4 variants.

## Results

Under the fast preset, Whisper-1 combined with gpt-4.1-mini yields a median RTF of 52.114, a latency_first of 60.5s, a latency_stable of 61.3s, and a CER of 121.5%, severely illustrating the backlog regime. Conversely, switching to the stable preset with gpt-4o-transcribe and gpt-4.1-mini drops the median RTF to 0.708, latency_first to 0.9s, latency_stable to 1.8s, and improves CER to 38.9% with an English BLEU score of 11.5 and chrF of 50.5. Whisper prompt conditioning ablations under stable endpointing show that rolling transcript context increases CER to 43.7% (+17.1 pp) and static instruction prompting increases CER to 40.8% (+14.3 pp) with 7.9% instruction leakage.

| System Configuration | Segment (s) | First (s) | Stable (s) | RTF | CER (%) | BLEU |
|---|---|---|---|---|---|---|
| fast: whisper-1 + gpt-4.1-mini | 1.0 | 60.5 | 61.3 | 52.114 | 121.5 | 1.0 |
| fast: gpt-4o-transcribe + gpt-4.1-mini | 1.0 | 27.8 | 28.6 | 24.233 | 98.4 | 1.9 |
| stable: whisper-1 + gpt-4.1-mini | 3.8 | 1.1 | 1.9 | 0.622 | 35.5 | 11.4 |
| stable: gpt-4o-transcribe + gpt-4.1-mini | 3.8 | 0.9 | 1.8 | 0.708 | 38.9 | 11.5 |
| stable: gpt-4o-transcribe + grok-4-fast | 3.8 | 1.0 | 2.2 | 0.942 | 36.3 | 11.6 |

## Limitations

The study focuses exclusively on the Korean-to-English translation direction, meaning structural findings regarding SOV-to-SVO linguistic latency floors (~2-3s context window) may not directly generalize to other language pairs. The investigation is restricted to segment-level cloud cascades rather than streaming end-to-end audio LLMs. Furthermore, evaluation relies on pre-recorded FLEURS replay rather than live interactive user studies with variable microphone hardware.

## Why read this

Speech and ML engineers building production real-time translation pipelines should read this to understand why aggressive VAD endpointing can silently destroy system throughput through queueing delays. It provides actionable guidelines for selecting stability boundaries (RTF <= 1) and warns against applying long-context prompt conditioning to short-chunk streaming ASR.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time cross-lingual meeting translation, live multilingual lecture subtitling, and broadcast speech translation systems utilizing cloud APIs.

## Institutions / 機構

Sogang University

**Funding / 經費:** Institute for Information & Communications Technology Planning & Evaluation, Ministry of Science and ICT, Republic of Korea, Ministry of Culture, Sports and Tourism, Republic of Korea, Korea Creative Content Agency, National Research Foundation of Korea, Sogang University

## Related

- (link related pages by id as the wiki grows)
