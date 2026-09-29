---
id: kuzmin26b_interspeech
category: deepfake-security
labels: [streaming-real-time, generative-model]
institutions: ["Nanyang Technological University", "A*STAR", "Huawei", "Leibniz Research Center", "Chinese University of Hong Kong", "Hong Kong Polytechnic University"]
code: https://github.com/Plachtaa/StreamVoiceAnon
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3181
pdf: https://www.isca-archive.org/interspeech_2026/kuzmin26b_interspeech.pdf
---

# Privacy-Preserving End-to-End Full-Duplex Speech Dialogue Models

*Nikita Kuzmin, Tao Zhong, Jiajun Deng, Yingke Zhu, Tristan Tsoi, Tianxiang Cao, Simon Lui, Kong Aik Lee, Eng Siong Chng*

[PDF](https://www.isca-archive.org/interspeech_2026/kuzmin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kuzmin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3181)

**Category:** `deepfake-security` · **Labels:** `streaming-real-time`, `generative-model`

**TL;DR** — End-to-end full-duplex speech dialogue models leak speaker identity through their always-on LLM hidden states, but applying the Stream-Voice-Anon front-end raises the speaker verification Equal Error Rate (EER) up to 41.0%, near the random-chance ceiling.

## Key contributions

- Characterized speaker identity leakage across transformer layers and dialogue turn lengths in two major E2E full-duplex dialogue LLMs (SALM-Duplex and Moshi).
- Performed layer-wise and turn-length-wise probing analyses demonstrating how speaker information accumulates and where it persists in the LLM backbone.
- Proposed Anon-W2W, a waveform-level streaming anonymization setup compatible with arbitrary encoders (validated on SALM-Duplex and Moshi).
- Proposed Anon-W2F, a feature-domain streaming anonymization setup that replaces continuous encoders with discrete encoders to eliminate redundant waveform synthesis.

## Problem

End-to-end full-duplex speech dialogue systems route raw user audio continuously through an always-on LLM backbone, maintaining a persistent internal state that captures the user's voice, style, and identity. While prior probing has established that self-supervised speech models and text LLMs leak hidden attribute data, no prior work has audited whether always-on full-duplex LLM hidden representations leak identifiable speaker traits. This creates an unexamined privacy exposure and regulatory compliance risk under GDPR, making proactive auditing and mitigation essential.

## Method

The study evaluates two core architectures: Moshi, which uses a decoder-only Transformer with a residual-quantization (RVQ) audio codec encoder, and SALM-Duplex, which utilizes either an ASR-initialized continuous encoder or a discrete encoder based on the Firefly architecture. To measure leakage, user-stream hidden states are extracted from early (layer 1), mid (layer N/2), and late (layer N) transformer layers, alongside a mean-pooled representation across all N layers (N=32 for Moshi, N=20 for SALM-Duplex).

To mitigate leakage, two streaming anonymization setups utilizing Stream-Voice-Anon are implemented. Anon-W2W applies waveform-level pre-processing before the unchanged ASR or codec encoder. Anon-W2F integrates anonymization directly in the feature domain by replacing the SALM-Duplex continuous encoder with a discrete encoder where anonymization is natively active, circumventing redundant audio synthesis. The Anon-W2F variant is pretrained on a multi-turn dialogue mixture (approx. 12k hours) and QA data (2.7k hours), then fine-tuned on InstructS2S-200K.

Evaluation employs an ECAPA-TDNN speaker verification attacker trained from scratch on hidden states under a VoicePrivacy 2024 lazy-informed attacker protocol. Equal error rate (EER%) and Linkability are used as privacy metrics, while URO-Bench and Full-DuplexBench scripts track multi-turn response quality (sBLEU, sBERT) and efficiency (RTFx, First Response Latency, Turn-Taking Success Rate, Interruption metrics).

## Experimental setup

Privacy metrics are evaluated on the VoicePrivacy 2024 evaluation set (derived from LibriSpeech dev/test-clean); the ECAPA-TDNN speaker verification attacker is trained on LibriSpeech train-clean-360. Dialogue quality and efficiency are evaluated on MtBenchEval using single-GPU estimation. Baselines include raw unanonymized Moshi (discrete codec) and SALM-Duplex variants (continuous and discrete encoders).

## Results

Discrete encoders leak significantly more speaker identity than continuous ASR encoders, with Moshi achieving 6.4% EER and SALM-Duplex discrete yielding 11.2% EER, compared to 28.5% EER for the continuous ASR baseline. Anonymization substantially improves privacy: Anon-W2W increases Moshi's EER to 36.9% and SALM-Duplex continuous to 34.6%, while Anon-W2F reaches an EER of 41.0%, closely approaching the 50% chance ceiling and dropping Linkability to 0.23.

In layer-wise ablations, Moshi exhibits uniformly low EER across all layers (5.6–7.3%), whereas SALM-Duplex shows decreasing leakage from early to late layers. Anonymization raises EER uniformly across all layer groups. While anonymization introduces a moderate response quality drop (e.g., sBERT S2S drops from 6.35 to 5.49 for continuous SALM-Duplex) and reduces RTFx (from 263x down to 1.7x), all conditions remain real-time viable with RTFx > 1.

| System | Encoder | Anonymization | EER (%) ↑ | Linkability ↓ | sBERT (S2S) ↑ |
|---|---|---|---|---|---|
| Moshi | discrete | – | 6.4 | 0.90 | 6.85 |
| Moshi | discrete | W2W | 36.9 | 0.35 | 5.00 |
| SALM-Duplex | discrete | – | 11.2 | 0.79 | 3.15 |
| SALM-Duplex | discrete | W2F | 41.0 | 0.23 | 1.49 |
| SALM-Duplex | continuous | – | 28.5 | 0.29 | 6.35 |
| SALM-Duplex | continuous | W2W | 34.6 | 0.24 | 5.49 |

## Limitations

The evaluation relies primarily on read speech from LibriSpeech rather than complex conversational spontaneous speech corpora. Text-based utility metrics (sBLEU, sBERT) do not fully capture acoustic-level degradation in naturalness and prosody. Furthermore, the ECAPA-TDNN probe establishes a lower bound on identity leakage, meaning advanced adaptive attackers could expose higher residual risks.

## Why read this

Speech and ML engineers building always-on, full-duplex conversational agents should read this to understand how hidden states leak speaker identity and how to deploy streaming front-ends like Stream-Voice-Anon to satisfy privacy regulations like GDPR.

## Code

- https://paniquex.github.io/full-duplex-privacy/

## Applications

Privacy-preserving real-time conversational agents, voice assistants, and full-duplex spoken dialogue systems requiring GDPR compliance.

## Institutions / 機構

Nanyang Technological University, A*STAR, Huawei, Leibniz Research Center, Chinese University of Hong Kong, Hong Kong Polytechnic University

## Related

- (link related pages by id as the wiki grows)
