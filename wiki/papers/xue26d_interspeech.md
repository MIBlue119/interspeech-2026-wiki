---
id: xue26d_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3512
pdf: https://www.isca-archive.org/interspeech_2026/xue26d_interspeech.pdf
---

# Preserving Acoustic Cues for Video Reasoning: An Efficient Uniqueness-Driven Token Compression Framework

[PDF](https://www.isca-archive.org/interspeech_2026/xue26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xue26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3512)

**TL;DR** — Flash-VAReason is a framework for joint visual-audio video reasoning that uses a three-stage information-uniqueness-driven token compression module to reduce audio tokens by an order of magnitude while improving reasoning accuracy and maintaining fast inference speeds.

## Problem

Existing multimodal large language models either discard video audio entirely or rely on ASR transcripts, which forfeits rich acoustic features like prosody, environmental sounds, and speaker characteristics that are essential for deep video reasoning. However, naively forwarding all raw audio tokens to an MLLM introduces prohibitive computational overhead, and traditional visual token compression methods cannot be directly applied due to the distinct temporal and redundancy patterns of audio signals.

## Method

The framework processes raw audio features extracted via the Whisper encoder through a three-stage pipeline grounded in information uniqueness theory: (1) Audio Time Fusion (ATF), which scans sequences and merges consecutive stationary frames using cosine distance thresholding and average pooling; (2) Budget Control, which calculates a retention ratio and guards long sequences with temporal uniform sampling if they exceed a maximum limit; and (3) Spatial Dynamic Compression (SDC), which performs global similarity scoring, causal-mask greedy deduplication, and neighbor fusion to retain top-K unique tokens. The approach unifies audio and visual compression under the same uniqueness principle without requiring architectural modifications or extra training, preserving temporal positional embeddings for the downstream MLLM.

## Results

Evaluated on the CharadesEgo and Ego4D datasets against baselines including mPLUG-Owl3, Grounded-Video-LLM, AKeyS, FlashVID, and UniComp, Flash-VAReason achieves superior performance across metrics. On CharadesEgo, it achieves the highest Recall (0.7285), F1 (0.5840), and Qwen-Overall score (2.3789) with an average inference time of 6.10 seconds per sample, delivering an 18.33x speedup over the slowest baseline (Grounded-Video-LLM at 111.74s). On Ego4D, it secures top performance across all quality metrics including a Qwen-Overall score of 1.6480. Ablations demonstrate that the full pipeline retains nearly all quality of uncompressed representations (Qwen-Overall 2.3789 vs 2.3838) while cutting inference latency by 42.8% compared to uncompressed tokens.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building multimodal AI systems, video question-answering assistants, and egocentric video understanding applications that require reasoning over both visual frames and rich acoustic cues like background sounds or speaker tone.

## Limitations

The framework is currently designed for offline processing rather than real-time streaming, compression efficiency can degrade when information uniqueness varies drastically over time, and fine-grained audio event details are omitted to maintain speed constraints.

## Related

- (link related pages by id as the wiki grows)
