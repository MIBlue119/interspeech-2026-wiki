---
id: xu26o_interspeech
category: asr
labels: [streaming-real-time]
institutions: ["NVIDIA"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1455
pdf: https://www.isca-archive.org/interspeech_2026/xu26o_interspeech.pdf
---

# BACON: Boundary-Aware Convolution for Streaming Conformer Models

*Hainan Xu, Kunal Dhawan, Dongji Gao, Jagadeesh Balam*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1455)

**Category:** `asr` · **Labels:** `streaming-real-time`

**TL;DR** — Boundary-Aware CONvolution (BACON) replaces causal depthwise convolution in chunk-based streaming Conformers by splitting channels into causal and bidirectional groups, widening the effective receptive field without parameter inflation or latency penalties. It achieves up to a 9.3% relative WER reduction on LibriSpeech test-other and consistent gains across speech translation and multi-speaker ASR.

## Key contributions

- Identifies that causal convolution in chunk-based streaming Conformers is overly conservative because all frames within an active chunk are already fully available.
- Proposes BACON, a parameter-neutral split-channel design dividing depthwise channels into a causal group (full past context) and a boundary-aware bidirectional group (past plus chunk-confined right context).
- Establishes a boundary stabilizer property where the causal channel subset prevents degradation at right chunk edges, outperforming fully bidirectional chunk-limited variants.
- Validates consistent accuracy improvements and equal or slightly lower token emission latency across three distinct tasks (LibriSpeech ASR, CoVoST/MuST-C AST, and Fisher multi-speaker ASR) across two model families (RNN-T and CHAT).

## Problem

Real-time speech applications require streaming processing with bounded latency, which chunk-based Conformers achieve by pairing chunk-limited self-attention with causal depthwise convolution. However, standard causal convolution restricts the kernel to current and past frames, discarding available acoustic context because within a chunk, all frames are already present. Prior attempts like DCConv adapt context dynamically, and SSCFormer adds parameters, but they fail to cleanly maximize receptive field safely at chunk boundaries without architectural bloating. Overly restrictive causal convolutions leave substantial acoustic modeling capacity unused, hurting recognition accuracy even when attention mechanisms have broad context.

## Method

BACON introduces a dual-context channel architecture that splits the $d$ depthwise convolution channels into two equal groups of $d/2$ channels each, maintaining a parameter-neutral footprint compared to standard causal convolution. The causal group requires left zero-padding of length $k-1$ only at the beginning of an utterance, maintaining uninterrupted historical access without chunk boundary restrictions. The bidirectional group uses a mixed padding strategy with $p=(k-1)/2$, allowing left context to cross chunk boundaries freely while padding $p$ zeros at the end of each chunk to bound the right context strictly within the active chunk.

Because depthwise convolution applies independent kernels per channel, the two groups have completely separate learned weights with zero parameter sharing. At the right edge of a chunk, the bidirectional channels receive no extra right context due to zero-padding, but the causal group continues to provide a full backward receptive field acting as a boundary stabilizer. Both models utilize a FastConformer-Large backbone with 17 Conformer layers, $d_{model}=512$, kernel size $k=9$, and an 8x subsampling factor. Streaming chunks are set to $C=14$ subsampled frames (1120 ms), and chunked attention spans the current chunk plus 5 past chunks. Models are trained with RNN-T or Chunk-wise Attention Transducer (CHAT) architectures using fast-emit lambda=0.005, averaging the five best checkpoints.

## Experimental setup

Evaluated on LibriSpeech (960 hours, 1024 SentencePiece vocabulary), CoVoST 2 and MuST-C for English-to-German speech translation (trained on Common Voice, MLS, VoxPopuli with a 16k vocabulary), and Fisher (2000 hours of 2-speaker conversational audio). Compared against standard causal convolution baselines and an all-bidirectional channel variant (all-bidir). Metrics include Word Error Rate (WER), concatenated minimum-permutation WER (cpWER), BLEU, and average emission chunk index ($\bar{\imath}$) as a proxy for latency.

## Results

On LibriSpeech test-other, BACON improves CHAT WER from 8.47% to 7.68% ($p < 0.001$, a 9.3% relative reduction) and RNN-T WER from 8.73% to 8.41% ($p = 0.011$). On test-clean, improvements are smaller (RNN-T: 3.36% to 3.30%; CHAT: 3.31% to 3.09%, $p=0.005$). For English-to-German AST, BACON beats the causal baseline across all conditions, securing +1.32 BLEU on CoVoST (CHAT: 36.40 to 37.72) and +1.01 BLEU on MuST-C (RNN-T: 24.60 to 25.61). On 2-speaker Fisher ASR, cpWER drops from 27.41% to 27.14%.
Ablations comparing BACON against the fully bidirectional variant (all-bidir) demonstrate that all-bidir underperforms or degrades (e.g., RNN-T test-other WER rises to 8.78%), proving that the causal group is necessary to stabilize boundary performance.

| System | Test Set | Causal Baseline | BACON | p-value |
|---|---|---|---|---|
| CHAT (RNN-T) | LibriSpeech test-other | 8.47% | **7.68%** | < 0.001 |
| RNN-T | LibriSpeech test-other | 8.73% | **8.41%** | 0.011 |
| CHAT | CoVoST-2 (EN-DE) | 36.40 | **37.72** | < 0.001 |
| RNN-T | MuST-C (EN-DE) | 24.60 | **25.61** | 0.006 |
| RNN-T | Fisher 2-Speaker (cpWER) | 27.41% | **27.14%** | - |

## Limitations

The evaluation is restricted to English ASR, English-to-German speech translation, and a 2-speaker conversational corpus, leaving open its performance on highly multilingual or extreme low-resource domains. The study only tests a fixed chunk size of $C=14$ (1120 ms) and a single kernel size ($k=9$), so sensitivity to latency-chunk configurations remains underexplored. Multi-speaker gains were statistically marginal on test-clean and certain conversational subsets due to high utterance-level variance.

## Why read this

Speech and ML engineers building streaming speech architectures will learn how to extract additional acoustic context from chunk boundaries without increasing parameter counts or latency. It provides a drop-in replacement module that strictly improves upon conventional causal depthwise convolutions in Conformers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech recognition systems, simultaneous machine translation pipelines, voice assistants, and on-device streaming conversational speech transcription.

## Institutions / 機構

NVIDIA

## Related

- [Attentive Mamba: Channel-wise Local Attention for Speech Recognition](chien26_interspeech.md) — same problem · relatedness 2.0/3
- [Online Predictive Coding for Dual-Mode Self-Supervised Speech Models](goto26_interspeech.md) — same problem · relatedness 2.0/3
- [Reducing the Offline-Streaming Gap for Unified ASR Transducer with Consistency Regularization](andrusenko26_interspeech.md) — same problem · relatedness 2.0/3
- [Pushing the Boundaries of Streaming Multi-Speaker ASR: A Systematic Study of Architectural Trade-offs](park26e_interspeech.md) — same problem · relatedness 1.9/3
- [A Compact Fully-Open Cache-Aware Streaming Model for Japanese ASR](yang26r_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
