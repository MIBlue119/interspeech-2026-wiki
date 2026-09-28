---
id: diecidue26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2026
pdf: https://www.isca-archive.org/interspeech_2026/diecidue26_interspeech.pdf
---

# The silence of the weights: a structural pruning strategy for Attention-based audio signal architectures with second-order metrics

[PDF](https://www.isca-archive.org/interspeech_2026/diecidue26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/diecidue26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2026)

**TL;DR** — A novel structured channel-pruning technique combined with Fisher information scoring successfully reduces attention-block parameters by 50% in speech models with minimal performance loss.

## Problem

Large transformer models in machine listening require excessive memory and compute for training and execution, limiting their deployment on constrained devices. Existing structured pruning methods primarily target entire attention heads or tokens while ignoring finer-grained channel redundancies across query, key, value, and output matrices. This gap matters because coarse head-wise pruning lacks flexibility and can prematurely degrade model capabilities.

## Method

The authors propose a per-head channel pruning (PH) scheme that independently selects channels to prune per head within attention blocks, constrained only by matrix dimension compatibility for Q/K and V/O. They pair this with Fisher Information (FI) as a second-order parameter importance metric, avoiding the layer-scale bias inherent in magnitude-based (MAG) scoring. The strategy uses iterative pruning over 10 steps (10% per step) paired with global (G) or local (L) thresholding. Evaluations test the Audio Spectrogram Transformer (AST) on audio classification and the medium Whisper model on transcription/translation, with AST fine-tuned via LoRA and Whisper fine-tuned on a 33k-hour multilingual audio mix using SGD.

## Results

Tested on AudioSet and SpeechCommands with AST, and LibriSpeech, CommonVoice, and CoVoST with Whisper (medium). Fisher information scoring consistently outperforms magnitude metrics, achieving 97.71% accuracy on SpeechCommands and 30.86 mAP on AudioSet at 60% attention sparsity (compared to 97.51% and 31.10% for head-wise Fisher). For magnitude metrics, local thresholding (97.49% SpeechCommands, 29.85% AudioSet) drastically outperforms global thresholding (65.4% SpeechCommands, 25.90% AudioSet) by avoiding scale discrepancies across layers. Whisper models pruned with the proposed method maintain word error rates within 1% of the original unpruned baselines across English, French, and Italian evaluations.

## Code

- https://github.com/

## Applications

Engineers and researchers deploying large audio transformers like Whisper and AST on edge devices or resource-constrained environments to reduce model size and latency.

## Limitations

Head-wise pruning yields slightly faster inference speeds (1-2 ms faster) than per-head channel pruning because removing entire heads eliminates entire dot-product structures from the computational graph.

## Related

- (link related pages by id as the wiki grows)
