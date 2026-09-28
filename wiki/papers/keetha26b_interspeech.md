---
id: keetha26b_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/keetha26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/keetha26b_interspeech.pdf
---

# A light weight Continuous Speaker Verification System for Real time Monitoring

[PDF](https://www.isca-archive.org/interspeech_2026/keetha26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/keetha26b_interspeech.html)

**TL;DR** — We propose a lightweight real-time continuous speaker verification system for call centers using a two-stage architecture that achieves a 2.08% Equal Error Rate on the TidyVoice dataset.

## Problem

Conventional speaker verification systems rely on one-time authentication at the start of a call, leaving sessions vulnerable to call handovers, impersonation, or unauthorized device usage. Maintaining persistent security is challenging because telephony speech suffers from noise, compression artifacts, and reverberation across multilingual or code-switching environments. Continuous monitoring is therefore required to prevent unauthorized access to sensitive information without introducing excessive latency or computational overhead.

## Method

The system utilizes a two-stage architecture comprising a frozen ReDimNet-B1 backbone and a lightweight projection network. Stage 1 extracts 192-dimensional embeddings using a multilingual speaker classification objective, while Stage 2 refines these into 256-dimensional language-invariant representations using a projection network trained with triplet sampling. Training incorporates data augmentation including additive noise (5–20 dB SNR), reverberation (RT60: 0.2–0.8 s), and speed perturbation on a 457-hour multilingual corpus. The combined model contains roughly 2.5 million parameters and consumes 318 million MACs per second.

## Results

Evaluated on the TidyVoice dataset, the system achieves an Equal Error Rate (EER) of 2.08%. Streaming performance operates with a Real-Time Factor (RTF) of 0.05, processing 1-second audio windows with 500-millisecond decision updates on an Intel Core i7-8650U CPU. The first stage backbone uses SGD optimization with momentum, while the second stage projection network is trained with Adam.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Contact center platforms, banking applications, and medical insurance systems seeking to continuously monitor customer identity and prevent unauthorized data disclosure during active calls.

## Related

- (link related pages by id as the wiki grows)
