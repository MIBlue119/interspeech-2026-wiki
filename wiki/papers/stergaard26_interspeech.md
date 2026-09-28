---
id: stergaard26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3430
pdf: https://www.isca-archive.org/interspeech_2026/stergaard26_interspeech.pdf
---

# Don''t Listen to Me: A Lightweight, Low-Latency Model for Own-Voice Cancellation in Far-Field Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/stergaard26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stergaard26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3430)

**TL;DR** — The paper introduces own-voice cancellation (OVC) to remove a user's enrolled voice from far-field audio streams at a 2 ms algorithmic latency, matching baseline performance while drastically reducing compute via a Mamba-MinGRU architecture.

## Problem

When far-field speech enhancement systems stream processed audio back to users, round-trip processing delays exceed 10 to 20 ms, creating disturbing own-voice echo artifacts and distortion. While target speaker extraction isolates a desired speaker, streaming architectures lack a complementary mechanism to suppress the speaker's own voice from multi-speaker or noisy mixtures. Addressing this requires a specialized low-latency objective that treats the user's voice as an unwanted signal.

## Method

The authors formulate OVC as the complement of target speaker extraction, utilizing a time-domain TasNet framework conditioned on a 2-second enrollment utterance from the target speaker. They propose replacing standard ConvTasNet masking networks with a lightweight Mamba-MinGRU architecture built from Mamba pre-norm residual blocks and MinGRU temporal mixing implemented via parallel associative scans. Additionally, they substitute the auxiliary ConvTasNet speaker encoder with a 5-block bidirectional linear RNN network to improve speaker embeddings while lowering auxiliary compute. Models are trained on dynamically mixed LibriSpeech and WHAM! noise using a negative thresholded SDR loss modified with soft thresholds to handle active speech and silence.

## Results

Evaluated on dynamically generated OVC mixtures and LibriMix-based multi-speaker scenarios using SDR and DistillMOS (PMOS), the proposed Mamba-MinGRU base model achieves competitive non-causal performance while requiring only 0.33 GMAC/s for the main network compared to 4.97 GMAC/s for TD-SpeakerBeam. In causal streaming configurations, the linear RNN auxiliary encoder boosts full-mixture SDR to 13.57 dB (non-causal) and maintains strong performance causally while shrinking auxiliary compute from 1.67 to 0.26 GMAC/s. A smaller variant of the Mamba-MinGRU network achieves a real-time factor (RTF) of 0.82 on a single CPU thread with an algorithmic latency of just 2 ms.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers designing far-field communication hardware, smart speakers, conferencing systems, and hearing aids can use this approach to eliminate disturbing own-voice feedback loops in real-time.

## Limitations

Using a linear RNN auxiliary encoder trades off some performance gains on full mixtures for a drop in denoising-only performance when the user's voice is absent.

## Related

- (link related pages by id as the wiki grows)
