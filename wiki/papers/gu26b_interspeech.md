---
id: gu26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1303
pdf: https://www.isca-archive.org/interspeech_2026/gu26b_interspeech.pdf
---

# ProWhistress: An Enhanced Dual-Stream Transcription Architecture for Prosody-Aware Sentence Stress Detection

[PDF](https://www.isca-archive.org/interspeech_2026/gu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1303)

**TL;DR** — ProWhistress introduces an explicit acoustic modeling stream to dual-segment transcription architectures, resolving the semantic-prosodic trade-off in sentence stress detection and achieving an F1 score of 0.984 on English benchmarks and 0.926 on Mandarin benchmarks.

## Problem

Current alignment-free sentence stress detection models that rely entirely on self-supervised speech recognition backbones suffer from a semantic-prosodic trade-off, where deeper layers emphasize semantic abstraction while discarding fine-grained acoustic cues necessary for stress perception. Furthermore, computational research on Mandarin sentence stress has long been bottlenecked by a complete scarcity of publicly available, high-quality benchmark corpora.

## Method

ProWhistress builds on a frozen Whisper backbone (implicit stream) and introduces a trainable 3-layer Acoustic Encoder (explicit stream) extracting features from intermediate layers (specifically Whisper encoder layer 9). The two streams are combined using bottleneck cross-attention and a gated residual fusion mechanism, controlled via a sigmoid gate with a negative bias initialization. To support Mandarin, the authors build SinoStress-Syn (12 hours of synthetic data generated via a hierarchical DeepSeek-v3 annotation pipeline, Google TTS, and Gaussian-sampled prosodic variations) and SinoStress-Real (3 hours of human-recorded multi-speaker speech). Models are optimized using weighted cross-entropy loss with the AdamW optimizer.

## Results

Evaluated on English datasets (TinyStress-15k, Expresso, EmphAssess) and Mandarin datasets (SinoStress-Syn, SinoStress-Real), ProWhistress outperforms Whistress and traditional BLSTM pipelines. On the English EmphAssess benchmark, it achieves an F1 score of 0.984. On the human-recorded Mandarin SinoStress-Real dataset, it attains a supervised F1 of 0.926 and a zero-shot F1 of 0.869 (when trained only on synthetic SinoStress-Syn), demonstrating robust sim-to-real transfer.

## Code

- https://github.com/Guhujian/ProWhistress.git

## Applications

Speech engineers and researchers building rich ASR transcription systems, automated computer-assisted language learning (CALL) tools for prosodic feedback, and expressive text-to-speech (TTS) synthesis engines.

## Limitations

Supervised performance on expressive real-world corpora like Expresso remains limited due to the general scarcity of diverse human-annotated stress datasets.

## Related

- (link related pages by id as the wiki grows)
