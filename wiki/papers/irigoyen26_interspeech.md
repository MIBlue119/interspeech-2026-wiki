---
id: irigoyen26_interspeech
category: asr
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3411
pdf: https://www.isca-archive.org/interspeech_2026/irigoyen26_interspeech.pdf
---

# Pruning as Regularization: Sensitivity-Aware One-Shot Pruning in ASR

*Julian Irigoyen, Arthur Söhler, Andreas Søeborg Kirkedal*

[PDF](https://www.isca-archive.org/interspeech_2026/irigoyen26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/irigoyen26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3411)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — Post-training one-shot magnitude pruning of encoder-decoder ASR Transformers can act as a powerful implicit regularizer, improving WER by up to 2.38% without any fine-tuning when guided by gradient and Fisher sensitivity diagnostics.

## Key contributions

- A replicable sensitivity framework combining first-order (gradient) and second-order (Fisher Information) diagnostics to quantify per-component and per-layer pruning fragility in ASR.
- Empirical evidence that targeted one-shot magnitude pruning improves generalization across diverse corpora (LibriSpeech, Common Voice, TED-LIUM) without retraining.
- Discovery of a strong encoder-decoder architectural asymmetry where decoder FFNs are fragile while decoder self-attention and late encoder layers harbor beneficial redundancy.
- A sensitivity-aware compression recipe achieving 40.8% sparsity (reducing Whisper-small parameters from 241M to 143M) while maintaining baseline accuracy where global magnitude pruning completely collapses.

## Problem

Neural network pruning is traditionally framed purely as a post-training compression technique to reduce compute and size. Naive global magnitude pruning often suffers catastrophic performance collapse at moderate sparsity levels (e.g., 30-40% sparsity in ASR models). Over-parameterization in foundation ASR models introduces redundant parameters that can actively impair generalization to unseen acoustic environments, a problem that standard regularizers like dropout or weight decay only partially address.

## Method

The authors evaluate the publicly released Whisper-small model (244M parameters, 12 encoder and 12 decoder layers). To locate pruning-resilient vs. pruning-fragile elements, they introduce a sensitivity diagnostic framework combining scale-normalized first-order gradient criteria based on validation cross-entropy loss, and second-order curvature approximation using the diagonal of the Fisher Information Matrix (FIM). One-shot unstructured magnitude pruning is then applied by ranking absolute parameter values per component and zeroing out weights below the (100 * rho)-th percentile threshold tau(rho, c) without any subsequent fine-tuning.

Experiments reveal a distinct encoder-decoder asymmetry. The parallel non-causal encoder and the decoder's self-attention mechanisms exhibit high tolerance for redundancy, whereas early decoder layers and decoder FFNs are catastrophically fragile because errors compound autoregressively. Based on these diagnostics, the authors construct a component-specific sparsity allocation schedule (e.g., 50% on decoder self-attention, 50% on late encoder layers 9-12, 40% on encoder FFNs, 20% on conv layers, 10% on LayerNorms) that bypasses fragile components and achieves an overall model sparsity of 40.8% without retraining.

## Experimental setup

Evaluated primarily on LibriSpeech (test-clean and test-other sets, using test-other as the main metric). Cross-corpus generalization is validated on 2,000 randomly sampled utterances from Common Voice v15 (English) and TED-LIUM Release 3. Performance is measured via Word Error Rate (WER) and Character Error Rate (CER). Experiments use an HPC node with NVIDIA H100 GPUs, where sensitivity analysis takes 11 minutes and component WER sweeps take 15 minutes each.

## Results

Global magnitude pruning causes catastrophic failure on LibriSpeech test-other between 30-40% sparsity (reaching 61.32% WER at 40%), driven entirely by the heavily parameterized decoder. Conversely, pruning 50% of the decoder self-attention layers improves test-other WER by 2.38% absolute (dropping from 11.64% baseline to 9.26%), while pruning the late encoder layers (9-12) at 50% yields a 1.72% absolute improvement. Component-specific sparsity allocation achieves 40.8% overall model sparsity, cutting parameters from 241.73M to 143.11M and GFLOPs from 4.55 to 2.77, with test-other WER changing negligibly from 11.64% to 11.84% and CER improving from 6.97% to 5.91%. These improvements transfer to TED-LIUM (e.g., -0.64% WER with decoder self-attention pruning) and Common Voice v15 (-2.54% WER).

In terms of failures, bias parameters are extremely sensitive (yielding a +7.53% WER degradation at just 10% sparsity), early decoder layers fail drastically (+67.50% at 50% sparsity), and decoder FFNs fail beyond 30% sparsity.

| System / Condition | Sparsity (%) | LibriSpeech Clean WER (%) | LibriSpeech Other WER (%) | Delta Other (%) |
|---|---|---|---|---|
| Baseline (Unpruned Whisper-small) | 0 | 3.45 | 11.64 | – |
| Global Magnitude Pruning | 40 | – | 61.32 | +49.68 |
| Enc. Late Layers (9–12) | 50 | 3.31 | 9.92 | –1.72 |
| Dec. Self-Attention | 50 | 3.29 | 9.26 | –2.38 |
| Sensitivity-Aware Compressed Model | 40.8 | – | 11.84 | +0.20 |

## Limitations

The study is experimentally restricted to the Whisper-small model architecture on English speech datasets, intentionally isolating the pruning-as-regularization phenomenon in a controlled setting. Unstructured sparsity masks were not accelerated by dense hardware inference kernels, meaning actual wall-clock inference speedups or Real-Time Factors (RTF) were not evaluated. Extension to multilingual scenarios, CTC-based encoder-only architectures, and the interaction between sensitivity-guided masking and post-pruning fine-tuning remain areas for future work.

## Why read this

Speech and ML engineers looking to compress ASR Transformers or understand over-parameterization in foundation models will find a rigorous, actionable framework for post-training pruning without retraining. It challenges conventional wisdom by showing that targeted parameter removal can directly enhance generalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying resource-efficient, compressed ASR foundation models on edge devices or memory-constrained servers by leveraging sensitivity-aware post-training pruning.

## Institutions / 機構

Danske Bank, Copenhagen Business School, Jabra

## Related

- (link related pages by id as the wiki grows)
