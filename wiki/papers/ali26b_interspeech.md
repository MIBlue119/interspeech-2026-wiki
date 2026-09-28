---
id: ali26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1522
pdf: https://www.isca-archive.org/interspeech_2026/ali26b_interspeech.pdf
---

# MambAdapter: Lightweight Mamba-Based Adapters for Parameter-Efficient Transfer Learning in Speech and Audio

[PDF](https://www.isca-archive.org/interspeech_2026/ali26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ali26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1522)

**TL;DR** — MambAdapter integrates lightweight Mamba state-space modules into parameter-efficient bottleneck adapters, matching or outperforming stronger baselines on audio classification and multilingual speech recognition while utilizing fewer trainable parameters.

## Problem

Adapting large pretrained foundation models like Transformers for speech and audio is computationally expensive, driving the need for efficient transfer learning. While traditional bottleneck adapters and LoRA reduce parameter counts, they often struggle to efficiently capture the long-context temporal patterns inherent in continuous audio signals. Mamba offers linear-time sequence modeling and strong long-context handling, but its potential as a parameter-efficient transfer learning technique for speech transformers remains unexplored.

## Method

The paper introduces MambAdapter, inserting a low-rank Mamba block and a learnable scaling factor alpha inside parallel bottleneck adapters of frozen Transformer backbones. To mitigate the parameter overhead introduced by state-space blocks, the down- and up-projection matrices are shared across all layers. The method evaluates the Audio Spectrogram Transformer (AST) on audio/speech classification tasks and Whisper (encoder only) on multilingual speech recognition across five low- to medium-resource languages. Adapter ranks and architectural configurations are systematically tuned to match comparative parameter budgets.

## Results

Evaluated on four audio classification datasets (ESC-50, UrbanSound8K, Speech Commands V2, Fluent Speech Commands) using AST, MambAdapter achieves top-tier average accuracies (e.g., 89.85% under the Houlsby configuration), outperforming standard bottleneck and conformer adapters while using a fraction of the parameters. On five Common Voice 13 languages using Whisper, MambAdapter reduces word error rate (WER) by an average of 5.8% compared to Conformer and 7.4% compared to LoRA under matched parameter constraints. Ablations confirm that parameter sharing and the Mamba component both contribute significantly to maintaining high performance under tight parameter budgets.

## Code

- https://github.com/salman-ha/MambAdapter

## Applications

Speech and machine learning engineers adapting large audio foundation models (such as Whisper or AST) for downstream classification and low-resource automatic speech recognition under strict parameter or memory constraints.

## Limitations

Conformer adapters can surpass MambAdapter when parameter budgets exceed 600k parameters on certain tasks.

## Related

- (link related pages by id as the wiki grows)
