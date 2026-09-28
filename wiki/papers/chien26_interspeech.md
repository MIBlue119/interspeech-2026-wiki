---
id: chien26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1708
pdf: https://www.isca-archive.org/interspeech_2026/chien26_interspeech.pdf
---

# Attentive Mamba: Channel-wise Local Attention for Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/chien26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chien26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1708)

**TL;DR** — Attentive Mamba replaces the static local convolution in Mamba2 with a causal channel-wise local attention mechanism for automatic speech recognition, achieving lower word error rates than Conformer baselines while using fewer parameters.

## Problem

State space models like Mamba excel at long-range sequence modeling with linear complexity, but their internal selection mechanism relies on static depth-wise convolutions for local feature aggregation. This content-agnostic local processing limits their expressive power compared to dynamic attention-based mechanisms. This paper bridges this gap by introducing content-aware local feature adaptation into the SSM recurrence.

## Method

The proposed 'attentive Mamba' block integrates causal depth-wise convolutions to contextualize queries, keys, and values within a local temporal window, followed by cross-channel attention over a window of size w = 31. This dynamic representation parameterizes the state transition matrices (A, B, C) of the Mamba core. The model is built with bidirectional architecture and trained end-to-end using a joint Connectionist Temporal Classification (CTC) and Attention-based Encoder-Decoder (AED) loss, complemented by 4-gram external language model rescoring. Experiments compare small (21.2M params) and large (61.3M params) variants against Conformer and Mamba2 baselines.

## Results

Evaluated on LibriSpeech (960 hours) and TED-LIUM v3 datasets using Word Error Rate (WER). On LibriSpeech test-clean and test-other, the large attentive Mamba with LM rescoring achieves WERs of 2.73% and 6.02%, outperforming Conformer baselines while requiring fewer parameters. On TED-LIUM v3, the small attentive Mamba-CTC+AED model achieves 6.23% (dev) and 6.98% (test) on the respective splits. Ablation studies confirm that both bidirectionality and the channel-wise attention module are crucial, improving baseline Mamba2 test-other WER from 22.37% down to 12.17%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech recognition engineers and researchers building efficient end-to-end ASR systems for read or spontaneous speech domains.

## Related

- (link related pages by id as the wiki grows)
