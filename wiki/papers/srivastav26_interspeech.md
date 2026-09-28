---
id: srivastav26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1902
---

# Open ASR Leaderboard: Towards Reproducible and Transparent Multilingual and Long-Form Speech Recognition Evaluation

**TL;DR** — A community-run, fully open benchmarking platform standardizes WER and inverse real-time-factor comparisons across 85+ ASR systems and 11 datasets, finding Conformer+LLM decoders win on accuracy while CTC/TDT decoders win on speed.

## Problem

Comparing ASR systems fairly across architectures, toolkits, and languages is hard without a standardized, transparent, and reproducible evaluation platform that covers both accuracy and inference speed.

## Method

The authors build the Open ASR Leaderboard, a reproducible benchmarking platform with community contributions from academia and industry, comparing 85+ open-source and proprietary systems across 11 datasets spanning English short- and long-form and multilingual short-form tracks, standardizing WER and inverse real-time factor (RTFx) evaluation across toolkits like ESPNet, NeMo, SpeechBrain, and Transformers.

## Results

Conformer-based encoders paired with LLM-based decoders achieve the best average WER, while CTC and token-and-duration transducer (TDT) decoders offer superior RTFx, making them better suited for long-form and batched processing; all code and dataset loaders are open-sourced.

## Code

Code and dataset loaders reported as open-sourced by the authors — unverified by this wiki as of the `updated` date; please confirm and update this entry if you can.

## Applications

A standardized, up-to-date reference for choosing an ASR architecture/toolkit based on the accuracy-efficiency trade-off that matters for a given deployment.

## Related

- (link related pages by id as the wiki grows)
