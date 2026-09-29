---
id: udupa26_interspeech
category: speech-llm-dialogue
labels: [efficient-on-device, streaming-real-time]
institutions: ["Brno University of Technology", "Carnegie Mellon University"]
code: https://github.com/bloodraven66/EndpointAnticipation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2196
pdf: https://www.isca-archive.org/interspeech_2026/udupa26_interspeech.pdf
---

# Endpoint Anticipation for Low-Latency Spoken Dialogue

*Sathvik Udupa, Shinji Watanabe, Petr Schwarz, Honza Černocký*

[PDF](https://www.isca-archive.org/interspeech_2026/udupa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/udupa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2196)

**Category:** `speech-llm-dialogue` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — Endpoint Anticipation (EPA) shifts turn-taking from reactive endpointing to proactive forecasting of end-of-turn signals up to 2.56 seconds early, allowing speculative execution in cascaded dialogue systems. Integrated into the Unmute framework, EPA cuts average system latency by 505 ms with a 28.4% increase in speculative computation.

## Key contributions

- Formulates Endpoint Anticipation (EPA) as a task for predicting end-of-turn signals before speech completion across fixed horizons ranging from 320 ms to 2560 ms.
- Introduces robust metrics (Median Realized Anticipation, Premature Anticipation Rate, Expected Redundant Computation, and Horizon Entry Accuracy) to quantify the trade-off between latency savings and discarded compute.
- Proposes two model architectures—single-target (EPA-S) and multi-target (EPA-M) using a shared dual-stream Transformer backbone.
- Open-sources the implementation with a reference integration into the Unmute full-duplex speech-to-speech framework using Gemma 3 4B.

## Problem

Cascaded spoken dialogue systems are bottlenecked by reactive turn-completion detection, creating a structural lower bound on Time-to-First-Audio (TTFA) that keeps conversational latency near 1–2 seconds. While humans respond within approximately 250 ms by actively anticipating turn completions, modular frameworks like Unmute, ChipChat, and Pipecat cannot trigger generation until speech entirely ceases. This sequential delay prevents the integration of complex real-time processing such as dialogue management, tool-use, or reasoning chains.

## Method

The model processes User (u) and System (s) audio streams using a dual-stream architecture. Input audio is upsampled to 24 kHz and encoded via the Mimi neural codec (first 8 codebooks) at a 12.5 Hz frame rate with zero lookahead, yielding features that are fed into two independent streaming Transformer encoders (Tu and Ts). The resulting latent vectors are concatenated along the feature dimension to form a unified context vector Z<=t. The backbone comprises a 25M parameter streaming Transformer with a 6-layer encoder, 4 attention heads, a feed-forward dimension of 1024, RoPE, and causal masking with a fixed 250-frame left context.

Two variants are explored: EPA-S, which trains independent binary classification heads for each horizon h in H = {320, 640, ..., 2560} ms, and EPA-M, which utilizes a multi-task shared backbone branching at the final layer to predict all horizons simultaneously using binary cross-entropy with a sigmoid activation. A 10:1 weighted loss is applied between positive and negative classes to handle imbalance, and loss is masked for turns shorter than 2 seconds or primary speaker backchannels.

During inference, when the predicted endpoint probability p_t^{(h)} exceeds a threshold theta, the system triggers a speculative execution cycle: it forks the state, prompts the LLM for a small token buffer (e.g., 10 tokens), pre-synthesizes audio via TTS, and caches it. If an endpoint is confirmed within horizon h, the cached audio is immediately released, effectively masking the ASR, LLM, and TTS pipeline latency; otherwise, the cache is discarded when a new endpoint is anticipated.

## Experimental setup

Evaluated on SpokenWOZ (8 kHz, task-oriented) and Switchboard (8 kHz, conversational) datasets, refining raw turn boundaries with Silero VAD. Compared against an adapted Voice Activity Projection (VAP) baseline by downsampling its future probability bins to 12.5 Hz via mean pooling. Evaluated using Median Realized Anticipation (MRA), Premature Anticipation Rate (PAR), Expected Redundant Computation (ERC), and Horizon Entry Accuracy (HEA). Models are trained with a learning rate of 3e-4, batch size of 16, 40-second segments (500 frames), and early stopping with a patience of 6 epochs.

## Results

EPA-M consistently outperforms the adapted VAP baseline across all anticipation horizons and trade-off spaces. At an Expected Redundant Computation (ERC) budget of ~33%, EPA-M achieves a median anticipation (MRA) of 640 ms for h = 640 ms (compared to VAP's 160 ms) and an MRA of 1120 ms for h = 1280 ms. Under a stricter ERC budget of ~15% for h = 1280 ms, EPA-M yields an MRA of 480 ms with 22.1% Horizon Entry Accuracy, whereas VAP drops to an MRA of 80 ms and 7.2% HEA. Spontaneous conversation (Switchboard) proves more challenging than structured task-oriented dialogue (SpokenWOZ) due to higher open-domain unpredictability.

When integrated into the Unmute framework with Gemma 3 4B, EPA-M (h = 960 ms) reduces average system latency from 1195 ms down to 690 ms (a 505 ms reduction) while incurring a 28.4% Expected Redundant Computation rate.

| System | Avg. Latency (ms) ↓ | ERC (%) ↓ |
|---|---|---|
| Unmute Baseline | 1195 | – |
| Unmute + EPA-M | 690 | 28.4 |

## Limitations

The framework assumes predictable turn dynamics and exhibits lower anticipation accuracy on open-domain, highly spontaneous conversational data like Switchboard compared to structured task-oriented domains. The approach introduces a hard trade-off where premature triggers waste downstream compute (up to ~28-34% ERC depending on operating point), and performance is sensitive to the chosen threshold theta.

## Why read this

Researchers and engineers building low-latency, modular spoken dialogue systems will learn how to bypass sequential cascade bottlenecks via speech-level endpoint anticipation rather than reactive VAD.

## Code

- https://github.com/bloodraven66/EndpointAnticipation

## Applications

Real-time speech-to-speech conversational agents, voice assistants, and low-latency interactive spoken dialogue systems.

## Institutions / 機構

Brno University of Technology, Carnegie Mellon University

**Funding / 經費:** Technology Agency of the Czech Republic, Czech Ministry of Education, Youth and Sports

## Related

- [Next-Turn: Duration-Aware Streaming Endpoint Detection via Time-to-Next-Speech-Onset Prediction](tsoi26_interspeech.md) — same problem · relatedness 2.7/3
- [Less can be More: What Aspects of Speech Drive End-of-Turn Detection](sharon26_interspeech.md) — same problem · relatedness 2.5/3
- [Adaptive Turn-Taking for Real-time Multi-Party Voice Agents](mitra26_interspeech.md) — same problem · relatedness 2.1/3
- [Speak or Stay Silent: Context-Aware Turn-Taking in Multi-Party Dialogue](bhagtani26_interspeech.md) — same problem · relatedness 2.1/3
- [MuVAP: Multimodal Multiparty Voice Activity Projection for Turn-taking Prediction in the wild](qi26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
