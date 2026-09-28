---
id: bhogale26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3189
---

# Voice of India: A Large-Scale Benchmark for Real-World Speech Recognition in India

**TL;DR** — Voice of India is a large, unscripted, telephonic-conversation ASR benchmark covering 15 Indian languages that is designed to resist the leaderboard overfitting and unfair scoring common in prior Indic ASR benchmarks.

## Problem

Existing Indic ASR benchmarks lean on scripted, clean speech and single-reference WER scoring, which rewards dataset-specific overfitting and unfairly penalizes natural spelling variation, including code-mixed English loanwords.

## Method

The authors build a closed-source benchmark of unscripted telephone conversations spanning 15 major Indian languages and 139 regional clusters, with transcripts that account for spelling variation, and analyze performance geographically and by audio quality, speaking rate, gender, and device type.

## Results

The benchmark contains 306,230 utterances (536 hours, 36,691 speakers) and reveals clear district-level performance disparities and specific conditions — audio quality, speaking rate, gender, device — where current Indic ASR systems struggle.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Benchmarking and diagnosing real-world Indic ASR systems for telecom, customer service, and voice-assistant deployments across India's many languages and regions.

## Related

- (link related pages by id as the wiki grows)
