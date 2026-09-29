---
id: zhou26g_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Alibaba Group", "Tsinghua University", "Fudan University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2177
pdf: https://www.isca-archive.org/interspeech_2026/zhou26g_interspeech.pdf
---

# AV-SyncBench: Decoupled Benchmarking of Temporal and Semantic Audio-Visual Synchronization

*Tianhong Zhou, Mingyang Han, Boyu Li, Yuxuan Jiang, Jiaxin Ye, Dongxiao Wang, Haoxiang Shi, Kunpeng Wang, Jun Song, Cheng Yu, Bo Zheng*

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2177)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — AV-SyncBench is a decoupled benchmarking framework designed to independently evaluate temporal consistency and semantic consistency in audio-visual feature extractors, revealing a sharp trade-off where models excel at either temporal offset detection or semantic matching but rarely both.

## Key contributions

- Proposes AV-SyncBench, the first evaluation framework to explicitly decouple temporal perception and semantic consistency in audio-visual representation models.
- Curates a diverse in-the-wild dataset of 3,269 video clips spanning Voice, Music, and Sound across 10 scenarios, filtered using Gemini 3 Flash and rigorously verified by human annotators to eliminate data leakage.
- Introduces novel semantic challenge tasks utilizing generative editing tools (OpenVoice V2 and DDSP) that alter timbre or instrument type while preserving exact original temporal rhythms.
- Systematically benchmarks five representative state-of-the-art audio-visual models (Synchformer, SparseSync, ImageBind, CAV-MAE, CAV-MAE-Sync), exposing specific capability profiles and trade-offs.

## Problem

Current audio-visual foundation models and feature extractors are evaluated under coupled protocols that conflate high-level semantic matching with fine-grained temporal alignment. Mainstream cross-modal retrieval models (e.g., CLAP, ImageBind, CAV-MAE) excel at global semantic recall but are insensitive to subtle temporal misalignments. Conversely, dedicated synchronization models (e.g., Synchformer, SparseSync) measure temporal offsets accurately but ignore robustness against semantic perturbations like timbre shifts. The academic community lacks a benchmark capable of cleanly separating these two distinct capability dimensions, preventing precise diagnostics for downstream tasks like video-to-audio generation and sound source localization.

## Method

The AV-SyncBench framework evaluates models along two independent tracks using a unified pairwise comparison protocol. Videos and audios are decoded at 25 FPS and 16 kHz respectively, then segmented into non-overlapping 0.64-second chunks to extract visual embeddings $v_i$ and audio embeddings $a_i$. Synchronization strength is quantified using mean diagonal cosine similarity for contrastive models, or the zero-offset probability $p(\Delta=0)$ for offset-classification models, with binary accuracy determined by comparing original pairs against perturbed counterparts.

The benchmark constructs two distinct evaluation challenges from 3,269 curated in-the-wild video clips (durations 3 to 13 seconds) spanning 10 scenarios across Voice, Music, and Sound. The temporal challenge track introduces controlled physical timing modifications while keeping semantics intact: Global Offset shifts the entire audio track by 50 to 500 ms across five levels; Local Jitter applies random localized shifts of 30 to 700 ms (mild, moderate, severe) to specific 2-second windows; and Global Speed Change adjusts playback speed between $0.8\times$ and $1.25\times$ across 10 discrete levels. The semantic challenge track preserves exact temporal structure while altering semantic attributes using OpenVoice V2 for voice timbre replacement (covering various ages and genders) and pretrained DDSP models for instrument-specific timbre conversion.

All five evaluated models (Synchformer, SparseSync, ImageBind, CAV-MAE, CAV-MAE-Sync) are tested using their official pre-trained checkpoints on two NVIDIA H20 GPUs without additional fine-tuning. This setup ensures an objective assessment of whether current architectures inherently master both temporal precision and semantic invariance.

## Experimental setup

Evaluations utilize 3,269 curated in-the-wild video clips comprising 38,390 total samples (37,569 temporal challenge samples and 821 semantic challenge samples) across 10 scenarios. Five models are compared: Synchformer, SparseSync, ImageBind, CAV-MAE, and CAV-MAE-Sync. Metrics include binary classification accuracy based on diagonal cosine similarity and zero-offset probability. Experiments run on two NVIDIA H20 GPUs using official codebases and checkpoints with 0.64-second non-overlapping chunks.

## Results

Synchformer achieves the best overall performance on global offset detection (overall accuracy 0.583), showing strong sensitivity to temporal shifts. SparseSync leads in overall temporal challenge accuracy (0.707 overall on global speed change, and robust performance on local jitter), driven by its offset-focused training objectives. However, CAV-MAE and other models struggle significantly with fine-grained global offsets (near-random accuracy around 0.50). Conversely, for semantic timbre editing tasks, ImageBind dominates with an overall accuracy of 0.859 (and 0.935 on voice-related editing), whereas SparseSync performs near-random (0.485) on semantic discrimination, highlighting a severe trade-off between temporal and semantic perception.

| System / Condition | Global Offset (Overall) | Local Jitter (Overall) | Global Speed (Overall) | Timbre Editing (Overall) |
|---|---|---|---|---|
| Synchformer | **0.583** | 0.722 | 0.607 | 0.787 |
| ImageBind | 0.505 | 0.618 | 0.602 | **0.859** |
| CAV-MAE-Sync | 0.500 | 0.636 | 0.486 | 0.628 |
| SparseSync | 0.569 | 0.725 | **0.707** | 0.485 |
| CAV-MAE | 0.506 | **0.768** | 0.677 | 0.826 |

## Limitations

The semantic editing tasks rely on generative methods (DDSP and OpenVoice V2) that may introduce subtle acoustic artifacts beyond pure timbre changes, making edited pipelines non-uniform. Semantic edits are currently restricted to speech and music scenarios, omitting controllable object collision or environmental sound replacements. Furthermore, the evaluation clips are limited to durations under 13 seconds, omitting long-context dependencies and complex multi-source interactions.

## Why read this

Researchers building multimodal foundation models or audio-visual generation systems should read this paper to understand the fundamental capability gap in current feature extractors. It provides concrete proof that models specialize in either temporal alignment or semantic matching, offering a standardized benchmark to guide the development of unified architectures.

## Code

- https://fgt7t6g.github.io/AV-SyncBench

## Applications

Audio-visual generation (video-to-audio, text-to-audio-video), sound source localization, audio-visual event classification, and automated filtering of large-scale multimodal training datasets.

## Institutions / 機構

Alibaba Group, Tsinghua University, Fudan University

## Related

- (link related pages by id as the wiki grows)
