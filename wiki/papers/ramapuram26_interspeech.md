---
id: ramapuram26_interspeech
category: speech-llm-dialogue
labels: [self-supervised, generative-model]
institutions: ["Apple"]
code: https://github.com/apple/ml-diffuslm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2980
pdf: https://www.isca-archive.org/interspeech_2026/ramapuram26_interspeech.pdf
---

# Scaling Properties of Continuous Diffusion Spoken Language Models

*Jason Ramapuram, Eeshan Gunesh Dhekane, Amitis Shidani, Dan Busbridge, Bogdan Mazoure, Zijin Gu, Russ Webb, Tatiana Likhomanenko, Navdeep Jaitly*

[PDF](https://www.isca-archive.org/interspeech_2026/ramapuram26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ramapuram26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2980)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`, `generative-model`

**TL;DR** — This paper investigates continuous diffusion (CD) spoken language models as an alternative to discrete autoregressive SLMs, scaling them up to 16B parameters on 7 million hours of audio and showing that they follow predictable validation loss and phoneme-distribution scaling laws.

## Key contributions

- Proposes phoneme Jensen-Shannon divergence (pJSD) to measure "languageness" in generative speech models that lack easy log-likelihood calculation.
- Formulates scaling laws for continuous diffusion spoken language models, analyzing validation loss, optimal token-to-parameter ratios, and downstream metrics.
- Introduces a fused two-stage optimization approach to accurately fit scaling laws to downstream perceptual and linguistic evaluation metrics.
- Scales CD SLMs up to 16 billion parameters and 7M hours of conversational audio, demonstrating multi-speaker and multilingual generation while identifying long-form coherence limits.

## Problem

Current textless spoken language models (SLMs) rely on autoregressive modeling over discretized SSL speech tokens, which creates information bottlenecks, requires massive compute, and lags significantly behind text LLMs. Discretizing continuous speech adds noise and information loss, but transitioning directly to continuous generation requires understanding whether diffusion architectures exhibit favorable scaling properties and how to evaluate their linguistic proficiency without text supervision.

## Method

The architecture builds on a Multimodal Diffusion Transformer (MM-DiT) operating directly on 80-dimensional log-mel filterbanks extracted at an 80 Hz frame rate (24kHz audio, 50ms window, 12.5ms hop). The model splits audio into a 10-second context window ($m_{ctx}$) and a 30-second continuation target ($m_{gen}$), which are projected to embedding dimensions and processed through bidirectional self-attention blocks where Q, K, and V for both streams are concatenated. Instead of predicting noise, the network parameterizes velocity $v_t$ (interpolating noise and signal) optimized with a min-SNR weighted loss. Classifier-Free Guidance (CFG) is implemented efficiently during inference by substituting the unconditional signal with a zeroed-out speech tensor (representing acoustic silence) rather than dropping conditioning during training.

Scaling experiments span 10 compute budgets ($10^{18}$ to $10^{21}$ FLOPs) and model sizes from ~0.6M (1 layer) to ~11.5B parameters (27 layers). Hyperparameters are scaled using muP and completeP methodologies, tuned on a 36M parameter base model with learning rate set to 0.001 and weight decay to 0.03. For the 16B parameter scaling trial, the authors additionally explore Whisper encoder conditioning to provide dense semantic representations.

## Experimental setup

Evaluated on SpeechCrawl, a heavily filtered conversational dataset containing 7 million hours of diverse, multilingual, multi-speaker audio (60% English, samples >5 minutes). Baselines include variations across 10 compute budgets, multiple noise schedules (linear, cosine, exponential with/without zero terminal SNR), and temporal patch sizes ($k=1$ to $6$). Metrics comprise validation loss, phoneme Jensen-Shannon divergence (pJSD for 1- to 5-grams), DNSMOS P.808, DNSMOS P.835, NISQA MOS, and Meta Audiobox Aesthetics components.

## Results

Validation loss and pJSD metrics for $n \in \{1..5\}$ follow expected isoFLOP scaling curves, demonstrating that linguistic distributions scale predictably with model size and data. The compute-optimal token-to-parameter ratio $r^*$ decreases as compute scales, dropping below 400 for compute budgets above $5.64 \times 10^{19}$ FLOPs (reaching $\sim$245 at $10^{21}$ FLOPs), indicating greater compute efficiency than text AR models at high scales. IsoFLOP curves flatten as compute increases, meaning a 2-order-of-magnitude range of model/data allocations yields near-optimal loss.

In contrast, standard perceptual MOS metrics do not exhibit scaling laws, rapidly saturating near real-data baselines. Meta Audiobox Aesthetics components for content enjoyment and usefulness scale predictably, but their extrapolated optima saturate below real-data baselines, suggesting inherent representational limits. At 16B parameters with CFG scale 2, the CD SLM achieves a validation loss of 0.0047, content enjoyment of 4.7207, and 5-gram pJSD of 0.1811, exhibiting emotive and prosodic multi-speaker generation but struggling with long-form semantic coherence.

| System / Condition | Validation Loss | 5-gram pJSD | Content Enjoyment | Content Usefulness | P808-MOS |
|---|---|---|---|---|---|
| $C = 10^{21}$ (CFG=2) | 0.0061 | 0.2096 | 4.5767 | 5.1093 | 3.5468 |
| $C = 10^{21}$ (CFG=4) | 0.0061 | 0.2253 | 4.5545 | 5.0746 | 3.5312 |
| 16B Model (CFG=2) | 0.0047 | 0.1811 | 4.7207 | 5.4809 | 3.8542 |
| 16B Model (CFG=4) | 0.0047 | 0.1770 | 4.7712 | 5.2965 | 3.4789 |

## Limitations

The evaluation relies on phoneme n-gram distributions (pJSD) rather than direct semantic perplexity because current SLMs operate at a low linguistic level. The study is limited to pretraining dynamics and does not explore post-training or reinforcement learning steering. Furthermore, extrapolated metrics suggest that raw log-mel continuous diffusion models hit a ceiling and cannot fully bridge the acoustic-semantic gap to match real-data human distributions without text conditioning or richer data representations.

## Why read this

Read this if you are a speech or ML researcher investigating foundational scaling limits beyond discrete autoregressive tokens and want to understand how continuous diffusion models behave under massive compute and data scales.

## Code

- https://github.com/apple/ml-diffuslm

## Applications

Unsupervised spoken language model pretraining, expressive zero-shot multi-speaker textless speech generation, and multilingual conversational speech synthesis.

## Institutions / 機構

Apple

## Related

- (link related pages by id as the wiki grows)
