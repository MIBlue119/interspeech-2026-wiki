---
id: keetha26b_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/keetha26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/keetha26b_interspeech.pdf
---

# A light weight Continuous Speaker Verification System for Real time Monitoring

*Nikhil Keetha, Hima Jyothi R, Nivedita Chennupati, Balaji Padmanaban, Harish Rajamani, Naveen Ambati*

[PDF](https://www.isca-archive.org/interspeech_2026/keetha26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/keetha26b_interspeech.html)

**TL;DR** — A real-time continuous speaker verification system using a two-stage ReDimNet-B1 and projection network architecture achieves a 2.08% EER with a computational footprint of 318 M MACs and an RTF of 0.05.

## Key contributions

- Proposes a two-stage continuous speaker verification framework combining a ReDimNet-B1 backbone with a lightweight projection network.
- Employs cross-lingual triplet sampling during Stage 2 training to enforce language-invariant speaker representations.
- Implements a streaming evaluation pipeline using a 1-second window and 0.5-second hop for agent alert generation.
- Demonstrates real-time feasibility on commodity CPU hardware with an RTF of 0.05 and 318 M MACs.

## Problem

Conventional speaker verification systems rely solely on one-time initial authentication and assume speaker consistency for the duration of a call. This leaves systems vulnerable to call handovers, unauthorized device usage, and impersonation attempts during long interactions. Continuous speaker verification is necessary to monitor active calls in real time and prevent sensitive data exposure, but running such models under noisy, reverberant, and multilingual telephony conditions while meeting strict latency constraints is challenging.

## Method

The system processes audio streaming via a 1-second window with a 0.5-second hop, feeding frames through voice activity detection and into a two-stage embedding pipeline. Stage 1 utilizes a frozen ReDimNet-B1 backbone (2.2M parameters, 290M MAC/s) which takes log-mel filterbank features and outputs a 192-dimensional speaker embedding. The backbone is initially trained as a multilingual speaker classifier with margin-based loss using SGD (learning rate 10^-3, momentum 0.9, weight decay 2 × 10^-5).

Stage 2 introduces a lightweight convolutional projection network (256.13K parameters, 27.36M MAC/s) optimized with Adam (learning rate 10^-3) using triplet sampling on top of frozen backbone embeddings. The triplet objective incorporates both same-language and cross-language pairs to improve cross-lingual consistency and spatial separation. The final output is a 256-dimensional speaker representation compared against an enrolled voiceprint using cosine similarity.

Training leverages the TidyVoice dataset (457 hours) augmented with additive noise at 5-20 dB SNR, reverberation with RT60 of 0.2-0.8 seconds, and speed perturbation factors of 0.9 and 1.1. Operational inference is executed in real time, issuing decision updates every 500 ms and triggering agent alerts if a mismatch persists for over 3 seconds.

## Experimental setup

Evaluated on the TidyVoice dataset (457 hours of multilingual speech). Uses an Equal Error Rate (EER) metric. Implemented with an Intel Core i7-8650U CPU, total model size of approximately 2.5M parameters, 318 M MACs, and achieving an RTF of 0.05.

## Results

The system achieves an Equal Error Rate (EER) of 2.08% on the TidyVoice evaluation dataset. It operates with a total computational cost of 318 M MACs and a real-time factor of 0.05 on an Intel Core i7-8650U CPU, processing 1 second of audio in roughly 50 ms.

| System / Condition | Parameters | MACs | RTF | EER (%) |
|---|---|---|---|---|
| ReDimNet-B1 + Projection (Proposed) | ~2.5M | 318M | 0.05 | 2.08 |

## Limitations

The evaluation is restricted to the TidyVoice dataset (457 hours), and the paper does not benchmark against alternative state-of-the-art streaming speaker verification architectures. Performance under extreme background noise below 5 dB SNR or multi-talker overlap remains untested.

## Why read this

Engineers building real-time, low-latency continuous authentication or agent-assist systems will find the two-stage ReDimNet and projection network design a practical blueprint for CPU-friendly deployment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time continuous speaker authentication and agent alerting for contact centers, banking applications, and medical insurance portals.

## Related

- (link related pages by id as the wiki grows)
