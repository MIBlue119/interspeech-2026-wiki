---
id: kuzmin26b_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3181
pdf: https://www.isca-archive.org/interspeech_2026/kuzmin26b_interspeech.pdf
---

# Privacy-Preserving End-to-End Full-Duplex Speech Dialogue Models

[PDF](https://www.isca-archive.org/interspeech_2026/kuzmin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kuzmin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3181)

**TL;DR** — This paper evaluates and mitigates speaker identity leakage in the hidden representations of end-to-end full-duplex speech dialogue models, demonstrating that feature-domain anonymization raises speaker verification equal error rates by over 3.5 times toward the chance-level ceiling.

## Problem

Always-on end-to-end full-duplex speech dialogue models maintain persistent internal hidden states over continuous user audio streams, capturing speaking style and identity without prior privacy scrutiny. Under regulatory standards like GDPR, storing identifiable speaker information in model representations poses a compliance risk that requires proactive auditing and mitigation. The authors investigate whether these hidden states leak sufficient identity to enable re-identification regardless of conversational content.

## Method

The study examines two full-duplex architectures: Moshi and SALM-Duplex, using an ECAPA-TDNN speaker verification probe under a lazy-informed attacker protocol across early, middle, and late layers. They propose two streaming anonymization strategies using Stream-Voice-Anon: Anon-W2W applies waveform-level preprocessing before the original encoder, while Anon-W2F substitutes the continuous encoder with a discrete encoder and performs native feature-domain anonymization. The Anon-W2F model is pretrained on 12k hours of multi-turn dialogue and 2.7k hours of QA data, then fine-tuned on InstructS2S-200K. They evaluate performance using the VoicePrivacy 2024 challenge set and MtBenchEval.

## Results

Without anonymization, Moshi's discrete encoder leaks near-perfect identification at 6.4% equal error rate (EER), whereas SALM-Duplex's continuous encoder reaches 28.5% EER. Anon-W2F elevates EER to 41.0% (a more than 3.5x relative increase from the 11.2% discrete baseline), while Anon-W2W increases Moshi's EER to 36.9% and SALM-Duplex's to 34.6%. The anonymized setups maintain 78% to 93% of the baseline sBERT score and keep first response latency below 0.8 seconds. Layer-wise analysis reveals that Moshi leaks uniformly across layers (5.6% to 7.3% EER), whereas SALM-Duplex shows higher leakage in early layers.

## Code

- https://github.com/Plachtaa/StreamVoiceAnon

## Applications

Engineers and developers building real-time, voice-based conversational agents and full-duplex dialogue assistants who must ensure user privacy compliance.

## Limitations

The evaluation relies on read speech from LibriSpeech rather than natural conversational corpora, and text-based quality metrics fail to capture nuances in prosody and naturalness.

## Related

- (link related pages by id as the wiki grows)
