---
id: xu26o_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1455
pdf: https://www.isca-archive.org/interspeech_2026/xu26o_interspeech.pdf
---

# BACON: Boundary-Aware Convolution for Streaming Conformer Models

[PDF](https://www.isca-archive.org/interspeech_2026/xu26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1455)

**TL;DR** — The paper introduces Boundary-Aware Convolution (BACON), a drop-in replacement for causal convolution in streaming chunk-based Conformers that widens the receptive field via a split-channel design without increasing parameters, yielding significant accuracy gains across ASR and translation tasks.

## Problem

Streaming Conformer models typically pair chunked self-attention with causal convolution to prevent future information leakage, but causal convolution unnecessarily discards available acoustic context. Since all frames inside a streaming chunk are already present simultaneously at processing time, forbidding right-context look-ahead within the chunk is overly restrictive and harms model capacity. This matters because it creates a performance gap between streaming and non-streaming models that better local acoustic modeling could bridge.

## Method

BACON splits the depthwise separable convolution channels into two equal groups of size d/2: a causal group that maintains full backward context with standard left-padding, and a boundary-aware bidirectional group that uses mixed padding to utilize right context confined strictly within the current chunk boundary. Because depthwise convolution applies independent kernels per channel, the two groups have completely separate learned weights without parameter sharing or adding parameters compared to standard causal baselines. The approach is evaluated using FastConformer-Large encoders with 17 layers, hidden dimension 512, and kernel size 9, integrated into both Chunk-wise Attention Transducers (CHAT) and standard RNN-T architectures via the NeMo toolkit.

## Results

Evaluated on LibriSpeech (960h), MuST-C, CoVoST 2, and Fisher 2-speaker corpora using RNN-T and CHAT model families. On LibriSpeech test-other, CHAT with BACON reduces WER from 8.47% to 7.68% (a 9.3% relative reduction, p < 0.001). For English-to-German speech translation, BACON improves BLEU on MuST-C and CoVoST 2 across both architectures, achieving gains such as +1.32 BLEU on CoVoST for CHAT. On multi-speaker Fisher ASR, BACON lowers concatenated minimum-permutation WER (cpWER) from 27.41% to 27.14%. Ablations confirm that BACON's split dual-mode design outperforms an all-bidirectional configuration which suffers degradation at right chunk edges due to zero-padding.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building real-time speech applications such as voice assistants, simultaneous speech translation, and live captioning systems.

## Limitations

Performance gains on multi-speaker conversational ASR (Fisher) showed lower statistical significance due to high per-utterance variability and conversational overlap.

## Related

- (link related pages by id as the wiki grows)
