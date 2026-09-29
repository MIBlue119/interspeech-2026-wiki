---
id: xue26d_interspeech
category: audio-understanding
labels: [efficient-on-device]
institutions: ["Tsinghua University", "Hong Kong University of Science and Technology", "Chinese University of Hong Kong"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3512
pdf: https://www.isca-archive.org/interspeech_2026/xue26d_interspeech.pdf
---

# Preserving Acoustic Cues for Video Reasoning: An Efficient Uniqueness-Driven Token Compression Framework

*Haiwei Xue, Zichao Nie, Zhiyong Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/xue26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xue26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3512)

**Category:** `audio-understanding` · **Labels:** `efficient-on-device`

**TL;DR** — Flash-VAReason is a multimodal video reasoning framework that integrates raw audio features alongside visual frames using an information-uniqueness-driven token compression pipeline, achieving top-tier accuracy while cutting audio inference latency by 42.8%.

## Key contributions

- Proposes Flash-VAReason to compress raw audio tokens for MLLM-based video reasoning, lowering token counts by an order of magnitude while preserving distinctive acoustic cues.
- Unifies audio and visual compression under an information-uniqueness principle, requiring zero architectural modifications or task-specific training for the downstream MLLM.
- Introduces a three-stage compression pipeline (Audio Time Fusion, Budget Control, and Spatial Dynamic Compression) tailored to the 1D temporal redundancy of audio sequences.
- Demonstrates through comprehensive experiments on CharadesEgo and Ego4D that preserving acoustic features significantly improves MLLM video reasoning performance over visual-only or ASR-only baselines.

## Problem

Most existing video reasoning models focus entirely on visual frames or rely on rudimentary ASR transcripts, discarding rich non-speech acoustic cues like prosody, environmental noises, and speaker emotions that are frequently vital for answering complex video queries. While recent omnimodal models can process raw audio streams directly, passing uncompressed audio token sequences into an MLLM causes prohibitive computational overhead and excessive context window consumption. Directly applying 2D visual token compression techniques to audio fails because audio features are 1D temporal sequences characterized by strong short-time stationarity and global redundancy patterns.

## Method

Flash-VAReason processes raw audio through a Whisper encoder to extract features $F \in \mathbb{R}^{L \times D}$, which are then compressed via a three-stage pipeline grounded in information uniqueness theory. In Stage 1, Audio Time Fusion (ATF) scans the sequence and merges consecutive frames with a cosine distance below a threshold $U_f$ via average pooling, eliminating short-term temporal stationarity. Stage 2 computes a target token budget based on sequence duration and configures a guardrail ($L_{max}=2048$) for uniform temporal subsampling if sequences remain overly long. Stage 3 applies 1D Spatial Dynamic Compression (SDC), treating the sequence as a single frame, building an $L' \times L'$ pairwise similarity matrix, computing global uniqueness scores via deviation from average similarity, and executing a causal-mask greedy deduplication using threshold $U_c = 0.2$ to retain top-$K$ tokens while fusing redundant neighbors.

These compressed audio tokens are concatenated with compressed visual tokens (using UniComp's strategy) and fed directly into an Omni-MLLM without requiring extra fine-tuning of the language model backbone. This design was chosen to exploit complementary acoustic-visual evidence while bypassing the extreme computational bottlenecks typical of raw audio-visual MLLM inference.

## Experimental setup

Evaluated on CharadesEgo (619 test samples, lengths 4.33s-29.92s) and Ego4D (634 test samples, lengths 10.17s-29.97s) datasets. Compared against baselines including mPLUG-Owl3, Grounded-Video-LLM, AKeyS, FlashVID, and UniComp. Metrics include BERTScore (Precision, Recall, F1) and Qwen3-VL-8B-evaluated scores (Semantic Accuracy, Completeness, Non-Hallucination, and Overall on a 1-5 scale) alongside inference time (seconds per sample). All experiments were run on 24 NVIDIA L40 (48GB) GPUs.

## Results

On the CharadesEgo benchmark, Flash-VAReason achieves the highest Qwen-Overall score of 2.3789 (surpassing UniComp's 2.2818 and Grounded-Video-LLM's 2.2019) with an average inference time of 6.10 seconds, delivering an 18.33x speedup over the slowest baseline. On Ego4D, it likewise leads all methods with a Qwen-Overall score of 1.6480 while maintaining a competitive inference time of 13.74 seconds. Ablation studies confirm that using uncompressed full audio tokens yields a slightly higher Qwen-Overall of 2.3838 but nearly doubles inference latency (10.66s vs 6.10s), whereas replacing the pipeline with uniform sampling severely degrades quality (dropping Qwen-Overall to 2.0121). The framework does not win on raw speed against visual-only light models like mPLUG-Owl3, which runs faster (5.32s) but suffers from drastically lower reasoning quality (Qwen-Overall of 1.96).

| System | CharadesEgo Overall | CharadesEgo Time (s) | Ego4D Overall | Ego4D Time (s) |
|---|---|---|---|---|
| mPLUG-Owl3 | 1.96 | 5.32 | 1.35 | 6.75 |
| Grounded-Video-LLM | 2.20 | 111.74 | 1.61 | 66.34 |
| FlashVID | 2.28 | 8.95 | 1.52 | 16.40 |
| UniComp | 2.28 | 6.49 | 1.65 | 13.08 |
| Flash-VAReason (Ours) | 2.38 | 6.10 | 1.65 | 13.74 |

## Limitations

The framework currently relies on offline processing, making it unsuited for real-time streaming video-audio scenarios without architectural modifications. Its temporal compression efficiency degrades when information uniqueness varies drastically across time segments. Furthermore, the pipeline currently bypasses fine-grained acoustic event tags in favor of broader feature compression due to computational constraints.

## Why read this

Speech and ML engineers building multimodal video reasoning models should read this to learn how to inject raw audio features into MLLMs efficiently without exploding sequence lengths or sacrificing inference speed.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multimodal video understanding assistants, egocentric video analysis, video question-answering systems requiring acoustic event and speaker emotion comprehension.

## Institutions / 機構

Tsinghua University, Hong Kong University of Science and Technology, Chinese University of Hong Kong

**Funding / 經費:** National Natural Science Foundation of China, Shenzhen Science and Technology Program

## Related

- (link related pages by id as the wiki grows)
