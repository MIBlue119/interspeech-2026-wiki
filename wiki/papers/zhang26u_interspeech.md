---
id: zhang26u_interspeech
category: speech-translation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1323
pdf: https://www.isca-archive.org/interspeech_2026/zhang26u_interspeech.pdf
---

# Learning to Wait: Real Streaming Speech-to-Text Translation with an LLM

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1323)

**TL;DR** — This paper proposes a learned wait policy for LLM-based streaming speech-to-text translation that dynamically decides when to wait for more audio or emit tokens, achieving lower latency and robustness to real-world silences compared to fixed wait-k policies.

## Problem

Current state-of-the-art LLM-based streaming speech translation relies on fixed wait-k policies that output tokens at a rigid cadence based on audio chunk counts. In real-world deployments, these fixed policies fail catastrophically: they hallucinate garbage text if the microphone opens before speech starts or if the speaker hesitates, and they fall behind if the speaker talks quickly. This vulnerability makes standard streaming models unreliable outside of clean, pre-segmented evaluation benchmarks.

## Method

The authors build upon the Bestow architecture, consisting of a 300M-parameter Conformer speech encoder (pre-trained with BEST-RQ on Loquacious), a conditioning network using cross-attention, a frozen 3B-parameter in-house LLM adapted with rank-8 LoRA, and a newly introduced 30M-parameter learned wait policy. The wait policy is a modified Transformer decoder with RoPE self-attention (dimension 768) and cross-attention blocks that take the audio hidden states and token history as inputs, outputting a 2D probability distribution over binary wait (W) or emit (E) actions. During training, because exact time alignments and target texts are known, the wait policy is trained on all steps simultaneously using a multi-task loss summing the wait policy and LLM objectives. The system is trained on the CoLiMu dataset using the SpeechBrain toolkit on four A100 GPUs.

## Results

Evaluated on the Fleurs dataset and SilFleurs (Fleurs with 5 seconds of prepended silence) for English-to-French and English-to-Korean translation. On English-to-French standard Fleurs, the fixed Bestow baseline achieves 3.57s latency, whereas the proposed learned wait policy reduces latency to 1.72s while matching translation quality (COMET score). When evaluated on SilFleurs, the fixed Bestow baseline's COMET score collapses from 0.767 to 0.593 due to severe hallucinations caused by the leading silence, whereas the learned wait policy retains stable performance (COMET 0.745). Baselines include offline concatenated decoder-only LLMs, offline Bestow, fixed wait-k Bestow, and AlignAtt (a cross-attention argmax decoding heuristic applied to Bestow).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers building real-time speech translation systems, conversational AI assistants, or live subtitling tools deployed in unconstrained acoustic environments.

## Limitations

The model exhibits higher latency on more disparate language pairs like English-to-Korean because the learned policy tends to wait for complete phrases to finish.

## Related

- (link related pages by id as the wiki grows)
