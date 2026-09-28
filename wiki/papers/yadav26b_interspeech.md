---
id: yadav26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2807
pdf: https://www.isca-archive.org/interspeech_2026/yadav26b_interspeech.pdf
---

# I''ll Keep an Ear Out: Teaching AudioLLMs Proactive Audio Assistance

[PDF](https://www.isca-archive.org/interspeech_2026/yadav26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yadav26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2807)

**TL;DR** — The paper introduces Interrupt and Silent Modeling (ISM) to enable proactive audio assistance in AudioLLMs, achieving 99.6% interrupt F1 on ESC-50 while autonomously managing notifications from a single intent.

## Problem

Current AudioLLMs operate purely reactively, requiring a user query for every single acoustic event, which makes them unsuitable for continuous monitoring use cases like alerting Deaf and Hard of Hearing (DHH) individuals. Traditional standalone sound classifiers continuously emit alerts without modeling user intent or interaction history, leading to severe notification fatigue from redundant triggers. This work addresses the gap by empowering AudioLLMs to autonomously decide when to interrupt or remain silent based on a single natural-language watch-out intent.

## Method

The authors propose Interrupt and Silent Modeling (ISM), a model-agnostic paradigm that extends an LLM's vocabulary with two special tokens (<interrupt> and <silent>) to handle four decision states: onset detection (I1), sustained-relevance triggering (I2), irrelevance suppression (S1), and history-aware de-duplication (S2). The model backbone is Qwen2-Audio-7B, pairing a Whisper-large-v3 audio encoder with a 7B-parameter language model. Training proceeds via reactive supervised fine-tuning (SFT) for classification followed by proactive SFT on four-state constructed data using LoRA (rank 8, alpha=32) with a balanced subsampling strategy for interrupt and silent instances.

## Results

Evaluated on ESC-50 using 5-fold cross-validation, the proposed PALLM achieves 99.4% interrupt precision, 100.0% de-duplication recall (S2), and 99.6% interrupt F1, while matching reactive classification baselines with 94.7% accuracy. On zero-shot transfer to noisy kitchen audio in Epic-Sounds, PALLM attains the highest interrupt F1 of 67.5 with 96.7% onset recall, outperforming zero-shot and reactive SFT baselines that suffer from over-triggering or over-suppression. Streaming evaluations using a 5-second rolling window demonstrate real-time viability with an average latency of 3.5 seconds from event onset. Ablations show that including I2 training improves sustained-relevance recall by roughly 10 percentage points.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Wearable assistive devices for Deaf and Hard of Hearing individuals to monitor environments and alert users to specific sounds without notification fatigue.

## Limitations

Zero-shot transfer to out-of-domain noisy audio exhibits drops in silent recall (S1) and sustained-relevance recall (I2) due to training exclusively on clean, isolated ESC-50 clips.

## Related

- (link related pages by id as the wiki grows)
