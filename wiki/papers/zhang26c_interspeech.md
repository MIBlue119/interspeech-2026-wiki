---
id: zhang26c_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-288
---

# AQA-TTRL: Self-Adaptation in Audio Question Answering with Test-Time Reinforcement Learning

**TL;DR** — AQA-TTRL lets large audio language models keep improving after deployment using only unlabeled test data, generating pseudo-labels via majority voting and optimizing with confidence-weighted reinforcement learning, letting a 3B model outperform an unadapted 7B model.

## Problem

Large Audio Language Models are strong at general audio understanding but remain static after deployment, and supervised fine-tuning to adapt them to new real-world data is costly.

## Method

AQA-TTRL enables on-the-fly evolution via test-time reinforcement learning using only unlabeled test data: it generates pseudo-labels via majority voting and optimizes the model with reinforcement learning, using confidence weighting to down-weight noisy self-generated labels and multiple-attempt sampling to mitigate advantage collapse and stabilize training.

## Results

Across MMAU, MMAR, and MMSU, AQA-TTRL achieves significant average improvements of 4.42% for Qwen2.5-Omni 7B and 11.04% for the 3B model, with the adapted 3B model outperforming direct inference of the unadapted 7B model.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Enables audio-understanding LALMs deployed in production to keep improving on real-world data streams without costly labeled fine-tuning.

## Related

- (link related pages by id as the wiki grows)
