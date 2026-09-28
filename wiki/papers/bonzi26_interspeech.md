---
id: bonzi26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1504
pdf: https://www.isca-archive.org/interspeech_2026/bonzi26_interspeech.pdf
---

# Enhancing Audio Reasoning via Semantic Summary Prediction

*Francesco Bonzi, Pooneh Mousavi, Cem Subakan, Mirco Ravanelli*

[PDF](https://www.isca-archive.org/interspeech_2026/bonzi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bonzi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1504)

**TL;DR** — SPARE introduces a training-time register token alignment strategy that conditions large audio language models on final semantic goals before reasoning begins, boosting zero-shot reasoning accuracy on MMAU to 58.03% without any inference overhead.

## Key contributions

- Proposes SPARE, a fine-tuning regularization framework that aligns early-stage latent register representations with a terminal semantic goal using a cosine similarity loss.
- Achieves state-of-the-art results among non-industrial models on challenging reasoning benchmarks, reaching 58.03% on MMAU and 40.32% on MMAR.
- Provides mechanistic attention map analyses proving that the register token forces early layers to focus more intensely on acoustic features, mitigating audio drift.
- Demonstrates that the alignment mechanism and auxiliary parameters can be completely discarded at inference time, maintaining zero additional computational latency.

## Problem

Large Audio Language Models (LALMs) often suffer from a severe reasoning gap where explicit Chain-of-Thought (CoT) prompting decreases accuracy compared to direct answers. As models generate long intermediate text sequences, their internal attention shifts away from the acoustic input toward generated linguistic tokens, causing hallucination and audio drift. Prior remedies rely on massive black-box scaling or computationally expensive reinforcement learning, leaving architectural and training-time regularization largely unexplored for multimodal audio reasoning.

## Method

The base architecture uses SALMONN 13B, which integrates Whisper and BEATs audio encoders via a Q-Former and linear projection into a Vicuna 13B LLM backbone. Training data comprises 160k samples from a subset of YouTube8M annotated with AF-Think structured into summary, caption, reasoning, and conclusion chapters. A single sequence-initial register token [REG] is placed immediately after the audio/prompt inputs and before the multi-stage CoT sequence.

During training, the final hidden state of the register token is aligned with a target semantic embedding obtained by passing the ground-truth text conclusion through a frozen Sentence-BERT model (all-MiniLM-L6-v2). The alignment loss L_align uses cosine distance between the register hidden state and the Sentence-BERT vector. The total training objective combines standard cross-entropy L_CE with L_align scaled by a hyperparameter weight lambda = 2.0. Custom causal attention masking ensures the register token attends to context while subsequent tokens cannot attend backward to it.

At inference time, both the register token and projection head are discarded entirely, preserving standard autoregressive decoding with zero parameter or latency overhead. The performance gains stem exclusively from internal latent space regularization that seeds the model with a global goal early in generation.

## Experimental setup

Evaluated on MMAU (Multi-Modal Audio Understanding) and MMAR (Multi-Modal Audio Reasoning) benchmarks using SALMONN 13B as the base model. Trained on 160k samples and validated on 40k samples from YouTube8M with AF-Think labels. Compared against Zero-shot, Zero-shot CoT, standard SFT baseline, and an adapted Audio MuToR multi-token prediction baseline.

## Results

SPARE achieves 58.03% on MMAU and 40.32% on MMAR, outperforming the standard SFT baseline (54.65% MMAU, 38.15% MMAR) and Audio MuToR (53.02% MMAU, 38.40% MMAR). Ablations on the alignment weight lambda show that lambda = 2.0 peaks performance, whereas lambda = 3.0 introduces training instability with a variance of +/- 2.83 on MMAU. Multi-conclusion and chapter summary variants that place register tokens before every chapter degrade performance to 55.43% and 52.18% respectively, confirming that a single sequence-initial bottleneck is optimal. While industrial-scale models like Audio Flamingo 3 (73.30%) and Qwen2.5-Omni (71.50%) achieve higher scores, they require massive proprietary datasets and compute infrastructure.

| Method | MMAU (%) | MMAR (%) |
|---|---|---|
| Zero-shot | 36.02 ± 1.02 | 33.28 ± 0.75 |
| Zero-shot (CoT) | 18.03 ± 0.36 | 12.32 ± 2.31 |
| SFT | 54.65 ± 0.34 | 38.15 ± 0.37 |
| Audio MuToR | 53.02 ± 1.23 | 38.40 ± 0.53 |
| SPARE (Ours) | 58.03 ± 1.50 | 40.32 ± 0.57 |

## Limitations

The approach is validated exclusively on a single base architecture (SALMONN 13B) and a specific 160k subset of YouTube8M data, leaving broader validation across diverse model families and massive pre-training regimes unproven. The Sentence-BERT embedding constraint ties the semantic goal to a static text embedding space, which may limit adaptation for purely non-linguistic acoustic reasoning tasks. Additionally, overly aggressive alignment weights (lambda = 3.0) introduce notable training variance and instability.

## Why read this

Speech and ML researchers working on multimodal audio-language models will learn how to inject semantic planning and combat attention drift in long-form generation without adding inference latency. It provides a practical, efficient training recipe that bridges the audio reasoning gap using auxiliary latent alignment.

## Code

- https://github.com/FrancescoBonzi/SPARE

## Applications

Complex acoustic question answering, spoken multi-step deduction, and audio-grounded conversational AI assistants.

## Related

- (link related pages by id as the wiki grows)
