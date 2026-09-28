---
id: lu26d_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2183
pdf: https://www.isca-archive.org/interspeech_2026/lu26d_interspeech.pdf
---

# Speech-to-See: End-to-End Speech-Driven Open-Set Object Detection

[PDF](https://www.isca-archive.org/interspeech_2026/lu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2183)

**TL;DR** — Speech2See is an end-to-end framework for speech-driven open-set object detection that localizes objects directly from speech without intermediate text, achieving 56.2 AP on COCO closed-set detection.

## Problem

Audio grounding models are bottlenecked by a severe scarcity of paired audio-image data, forcing reliance on multi-stage text-mediated pipelines (such as ASR followed by a text-based detector) that suffer from error propagation and high inference latency. Directly aligning continuous speech with visual features is difficult due to temporal redundancy, acoustic variations, and a modality gap against text-image pre-trained priors.

## Method

Speech2See builds upon a frozen Swin Transformer visual encoder, HuBERT-Base speech encoder, and Grounding DINO detection framework using a progressive pre-training and fine-tuning paradigm. During pre-training, a Query-Guided Semantic Aggregation (QSA) module uses learnable queries in a cross-attention mechanism to condense redundant HuBERT embeddings into compact semantic tokens. During fine-tuning, a parameter-efficient Mixture-of-LoRA-Experts (MoLE) architecture with Top-1 routing and K=2 experts per feed-forward layer is inserted into the cross-modal decoder while keeping base weights frozen. The training objective combines standard detection losses (L1, GIoU, and contrastive alignment) with an auxiliary load-balancing loss.

## Results

Evaluated across COCO 2017, Objects365, Flickr30k, and LVIS datasets using synthesized multi-speaker audio prompts. On COCO closed-set evaluation, Speech2See achieves 56.2 AP, outperforming the two-stage YOSS baseline (39.2 AP) by +17.0 AP. In zero-shot settings on COCO, it achieves 42.7 AP, outperforming a cascaded Whisper + Grounding-DINO baseline (41.6 AP) while reducing parameter count by 26% (197.8M vs. 266.7M) and achieving a lower Real-Time Factor (0.35 vs. 0.41). Ablations show replacing QSA with a standard MLP drops zero-shot AP drastically from 42.7 to 27.2, and moving from 1 to 2 MoLE experts improves performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building voice-guided navigation, interactive robotics, and multi-modal human-computer interfaces that require direct listening-to-localization capabilities.

## Limitations

Performance lags behind text-driven upper bounds due to acoustic ambiguities and speaker variance, and current experiments rely entirely on synthesized speech datasets rather than native speech annotations.

## Related

- (link related pages by id as the wiki grows)
