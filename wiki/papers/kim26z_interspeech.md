---
id: kim26z_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3467
pdf: https://www.isca-archive.org/interspeech_2026/kim26z_interspeech.pdf
---

# AudioGround: Fine-Grained Temporal Grounding in Audio via Deterministic Boundary Supervision

*Mingi Kim, Minchol Kwon, Junyeong Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26z_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26z_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3467)

**TL;DR** — AudioGround is a lightweight extension of the SALMONN large audio language model that introduces time-aware Q-Former sliding-window compression and absolute time embeddings, achieving state-of-the-art zero-shot temporal grounding via a new 49.9K-sample deterministic instruction-tuning dataset.

## Key contributions

- AudioGround-IT: a time-aware audio instruction-tuning dataset comprising 49.9K samples (835+ hours) providing deterministic boundary supervision across four temporal reasoning tasks.
- A lightweight architectural extension for SALMONN combining frame-level feature interpolation across dual Whisper-BEATs encoders, a sliding-window Q-Former with timestamp conditioning, and an absolute time embedding.
- A hybrid absolute time embedding formulation adding a zero-initialized residual MLP on top of sinusoidal positional encodings to allow task-specific adaptation for continuous temporal reference.
- Demonstration that fine-grained deterministic boundary supervision substantially outperforms prior LALMs on zero-shot audio moment retrieval across multiple benchmarks.

## Problem

Current Large Audio Language Models (LALMs) can describe acoustic scenes globally but fail to localize exact event occurrence times, responding vaguely or providing inaccurate timestamps. Existing attempts to inject temporal reasoning either treat questions as multi-choice queries without boundary labels (e.g., AudioSkills), rely on unverified LLM-generated captions (e.g., AQA-Temp), or are constrained by short-clip classification priors. This creates a critical bottleneck: LALMs lack precise, verifiable boundary supervision during instruction tuning, restricting their utility in fine-grained real-world tasks like surveillance or meeting analysis.

## Method

AudioGround builds upon SALMONN by incorporating a dual-encoder setup utilizing a Whisper speech encoder and a BEATs audio encoder, both operating at 50Hz. For inputs longer than 30 seconds, audio is split into non-overlapping chunks, encoded independently, and frame counts are aligned by linearly interpolating BEATs features to match Whisper features.

To compress the long sequence without severe information loss, AudioGround introduces a sliding-window Q-Former where a window of W seconds (set to 0.33s with single query tokens) slides over the encoder representation. The Q-Former receives timestamp conditioning strings (e.g., 'This segment is from sl to el seconds') as additional text inputs alongside learnable queries. Furthermore, an absolute time embedding is added to each window's output tokens. This embedding uses a hybrid design adding a zero-initialized residual MLP (with SiLU activation) over standard sinusoidal base positions, scaled by a learnable factor beta initialized at 0.05.

The model is trained on AudioGround-IT for 6K steps with an effective batch size of 24 across 8 NVIDIA A6000 48GB GPUs using the AdamW optimizer (learning rate 3e-5, 0.1K warmup steps). The Whisper and BEATs encoders are frozen, and the LLM is adapted via LoRA modules (rank 32, alpha 64), optimizing the Q-Former and linear projection layers.

## Experimental setup

Evaluated on three temporal grounding benchmarks: Clotho-Moment, UnAV-100 subset, and TUT-Sound Events 2017, using both Original settings and Clipped 30-second settings. The primary evaluation metric is Recall@1 (R1) at Intersection over Union (IoU) thresholds of 0.5 and 0.7. Baselines include AM-DETR (supervised upper bound) and zero-shot LALMs such as Qwen2-Audio-Instruct, Qwen2.5-Omni, GAMA, DeSTA2.5-Audio, SALMONN, and AF2.

## Results

In zero-shot moment retrieval on the Clotho-Moment original setting, AudioGround achieves 27.47 R1@0.5 and 12.68 R1@0.7, substantially outperforming existing zero-shot LALMs (e.g., Qwen2.5-Omni scores 8.60 R1@0.5 and DeSTA2.5-Audio scores 10.06). On the UnAV-100 subset original setting, AudioGround reaches 23.23 R1@0.5 and 14.14 R1@0.7, beating all competing LALMs. Ablations confirm that the hybrid absolute time embedding (+FI + Timestamp + ATE_h) consistently surpasses sinusoidal-only (+FI + Timestamp + ATE_s, 26.82 on Clotho-Moment R1@0.5) and learned-only variants. AudioGround does not win against fully supervised domain-specific pipelines like AM-DETR (which achieves 87.50 R1@0.5 on Clotho-Moment original), reflecting the gap remaining for zero-shot LALMs.

| System / Condition | Clotho-Moment R1@0.5 | Clotho-Moment R1@0.7 | UnAV-100 R1@0.5 | UnAV-100 R1@0.7 |
|---|---|---|---|---|
| AM-DETR (Supervised) | 87.50 | 81.86 | 61.00 | 39.00 |
| Qwen2.5-Omni (Zero-shot) | 8.60 | 1.27 | 9.80 | 1.96 |
| DeSTA2.5-Audio (Zero-shot) | 10.06 | 4.02 | 20.37 | 11.11 |
| AF2 (Zero-shot) | 4.51 | 1.43 | 3.41 | 1.14 |
| AudioGround (Ours, Zero-shot) | 27.47 | 12.68 | 23.23 | 14.14 |

## Limitations

The dataset construction relies on concatenating synthetic AudioCaps clips with silence gaps, which may not fully capture complex acoustic overlaps and continuous real-world acoustic transitions found in natural long-form recordings. Evaluation is restricted to zero-shot transfer settings on pre-existing benchmarks, and the approach depends on heuristic parsing rules to extract free-form text temporal predictions from the LALM.

## Why read this

Speech and ML researchers building time-aware Large Audio Language Models should read this paper to see how deterministic boundary supervision and absolute time embeddings can effectively resolve the temporal grounding bottleneck without requiring massive instruction-tuning datasets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated security surveillance auditing, meeting assistant timeline indexing, smart home sound event detection, and multi-modal video/audio moment retrieval.

## Related

- (link related pages by id as the wiki grows)
