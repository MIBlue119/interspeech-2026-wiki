---
id: diecidue26_interspeech
category: audio-understanding
labels: [efficient-on-device]
institutions: ["Politecnico di Milano", "University of Turin", "Telecom Paris", "Institut Polytechnique de Paris"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2026
pdf: https://www.isca-archive.org/interspeech_2026/diecidue26_interspeech.pdf
---

# The silence of the weights: a structural pruning strategy for Attention-based audio signal architectures with second-order metrics

*Andrea Diecidue, Carlo Alberto Barbano, Piero Fraternali, Mathieu Fontaine, Enzo Tartaglione*

[PDF](https://www.isca-archive.org/interspeech_2026/diecidue26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/diecidue26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2026)

**Category:** `audio-understanding` · **Labels:** `efficient-on-device`

**TL;DR** — This paper introduces a structured per-head channel pruning strategy combined with Fisher information scoring for attention-based audio architectures, preserving performance within 1% even at 50% sparsity.

## Key contributions

- Proposes a per-head (PH) channel-wise structured pruning scheme that independently selects channels to prune per head under matrix dimension constraints ($W_q/W_k$ and $W_v/W_o$).
- Adopts a linear-cost Fisher information (FI) second-order scoring metric to overcome parameter magnitude scale biases across layers.
- Compares global (G) and local (L) thresholding strategies across diverse tasks using Audio Spectrogram Transformer (AST) and Whisper models.
- Demonstrates that 50% parameter removal in attention blocks maintains competitive accuracy (e.g., 97.71% on SpeechCommands) compared to whole head-wise pruning.

## Problem

Standard transformer models used in machine listening scale up to billions of parameters, resulting in high energy, memory, and inference latency requirements. Traditional structured pruning methods focus heavily on coarse whole-head pruning (EH) or token dropping, while unstructured approaches like PARP fail to deliver actual wall-clock speedups. Furthermore, simple magnitude-based pruning metrics suffer from cross-layer scale disparities, disproportionately damaging earlier layers unless carefully managed. Addressing fine-grained channel pruning within attention blocks for audio transformers remains largely underexplored.

## Method

The proposed method focuses on the four self-attention weight matrices: $W_q \in \mathbb{R}^{d_q \times d}$, $W_k \in \mathbb{R}^{d_q \times d}$, $W_v \in \mathbb{R}^{d_v \times d}$, and $W_o \in \mathbb{R}^{d \times d_v}$. Pruning maintains two strict dimensional constraints: $W_q$ and $W_k$ must share an equal output dimension, and $W_v$'s output dimension must match $W_o$'s input dimension. Unlike standard Entire Head (EH) pruning that removes entire attention heads, the Per-Head (PH) channel-wise approach independently allocates a sparsity budget per head to eliminate redundant channels while preserving crucial subspaces.

To score parameters without being misled by magnitude variations across layers, the method computes the Fisher Information (FI) using a log-likelihood loss over a sample dataset $X$. Unlike the full Hessian matrix which scales quadratically, Fisher information provides second-order sensitivity information in linear time. For thresholding, the framework investigates global (G) strategies—which pool all channels across layers to allocate a flexible sparsity per layer—and local (L) strategies, which enforce uniform sparsity across all layers.

During training, AST models are fine-tuned iteratively using LoRA for 3 epochs per sparsity step with AdamW ($lr=10^{-4}$), while Whisper medium models are fine-tuned across a 33k-hour multilingual audio corpus (LibriSpeech, MLS, CommonVoice, VoxPopuli, FLEURS, CoVoST) using SGD ($lr=10^{-4}$).

## Experimental setup

Evaluated on AudioSet (balanced subset) and SpeechCommands v2 for AST classification, alongside Whisper medium evaluated on LibriSpeech (English), CommonVoice (Italian, French), and CoVoST (German-to-English translation). Pruning is executed iteratively across 10 steps, removing 10% of attention parameters per iteration up to 50-60% sparsity. Baselines include Entire Head (EH) pruning, magnitude-based (MAG) scoring, and local vs. global thresholding variants.

## Results

At 60% sparsity on SpeechCommands, the proposed Fisher-guided per-head approach achieved 97.71% accuracy (vs. 97.51% for head-wise Fisher), and 30.86 mAP on AudioSet (vs. 31.10 mAP for head-wise Fisher). Magnitude-based pruning required local thresholding (97.49% on SpeechCommands) to avoid collapse, whereas Fisher information excelled under global thresholding due to its scale invariance. In terms of latency, head-wise pruning yielded slightly faster inference (1-2 ms faster than per-head) because it completely removes scaled dot-product operations from the computation graph. Machine translation tasks (CoVoST DE-EN) showed larger performance drops due to small domain-specific fine-tuning sets (~1000 samples).

| System / Condition | Sparsity | SpeechCommands Acc (%) | AudioSet mAP | LibriSpeech WER |
|---|---|---|---|---|
| Baseline (Unpruned) | 0% | ~98.0 | ~32.0 | Baseline |
| PH | G | FI | 60% | 97.71 | 30.86 | Competitive |
| EH | G | FI | 60% | 97.51 | 31.10 | Competitive |
| PH | L | MAG | 60% | 97.49 | 29.85 | Higher error |
| EH | G | MAG | 60% | 96.54 | 25.90 | Degraded |

## Limitations

The study is restricted to attention blocks, omitting feed-forward networks (FFNs) from the pruning loop. Fine-tuning datasets for low-resource translation tasks were relatively small (~1000-1500 samples), exacerbating performance degradation at higher sparsities. Per-head channel pruning yields lesser raw hardware speedups compared to full head-removal because inner dimension contractions do not entirely eliminate structural operators.

## Why read this

Speech and machine learning engineers seeking to compress large audio transformer architectures (like Whisper or AST) without retraining from scratch should read this to understand how second-order Fisher metrics and per-head channel pruning outperform naive magnitude scoring.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying resource-constrained automatic speech recognition (ASR) and audio classification models on edge or on-device hardware.

## Institutions / 機構

Politecnico di Milano, University of Turin, Telecom Paris, Institut Polytechnique de Paris

**Funding / 經費:** French National Research Agency, Hi! PARIS, ANR/France 2030 program, Italian Ministry of University and Research, European Union

## Related

- [Pruning as Regularization: Sensitivity-Aware One-Shot Pruning in ASR](irigoyen26_interspeech.md) — shared technique · relatedness 2.2/3
- [Towards Data-free and Training-free Compression for Speech Foundation Models Using Parameter Clustering](xu26h_interspeech.md) — same problem · relatedness 2.2/3
- [PhonePrune: One-shot Phoneme-Aware Pruning for Large-scale ASR Models via Phoneme Set Generation and Calibration](lee26q_interspeech.md) — shared technique · relatedness 2.1/3
- [OnDA: On-device Channel Pruning for Efficient Personalized Keyword Spotting](risso26_interspeech.md) — shared technique · relatedness 2.0/3
- [Measuring the Redundancy of Decoder Layers in SpeechLLMs](moumen26_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
