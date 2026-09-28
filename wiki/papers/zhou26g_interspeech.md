---
id: zhou26g_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2177
pdf: https://www.isca-archive.org/interspeech_2026/zhou26g_interspeech.pdf
---

# AV-SyncBench: Decoupled Benchmarking of Temporal and Semantic Audio-Visual Synchronization

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2177)

**TL;DR** — AV-SyncBench is a new benchmark that decouples temporal and semantic evaluation of audio-visual feature extractors, revealing that current models struggle to excel in both dimensions simultaneously.

## Problem

Existing audio-visual evaluation protocols conflate temporal alignment and semantic consistency or focus on one at the expense of the other. Multimodal foundation models like CLAP and ImageBind measure global semantic recall but lack sensitivity to temporal misalignments, whereas synchronization models like Synchformer focus on temporal offsets while ignoring semantic-level perturbations. Without a decoupled benchmark, the academic community cannot independently diagnose whether feature extractors truly capture fine-grained temporal rhythm, semantic fidelity, or both.

## Method

The authors construct AV-SyncBench from 3,269 curated in-the-wild videos spanning 3 major domains (Voice, Music, Sound) and 10 scenarios, filtered using Gemini 3 Flash and manually verified by humans. The pipeline generates two independent challenge tracks: temporal challenges (introducing 50-500ms global offsets, 30-700ms local jitter, and 0.8x-1.25x global speed changes while preserving semantics) and semantic challenges (using OpenVoice V2 for voice timbre replacement and DDSP for instrument conversion while strictly preserving original timing). Models extract visual and audio embeddings from non-overlapping 0.64-second chunks, and synchronization quality is quantified using diagonal cosine similarity and binary classification accuracy against perturbed or edited pairs. Five representative models (Synchformer, ImageBind, CAV-MAE-Sync, SparseSync, CAV-MAE) are evaluated out-of-the-box on two NVIDIA H20 GPUs without fine-tuning.

## Results

Evaluated on 38,390 samples, results show that Synchformer achieves the highest temporal sensitivity overall (e.g., leading global offset detection), while SparseSync also performs well on temporal jitter and speed changes. Conversely, ImageBind and CAV-MAE excel at semantic tasks like timbre editing (achieving high accuracy in voice and music scenarios respectively) but perform near random on temporal offset tasks. Category-wise analysis indicates that models perform significantly better when sound sources are explicit and visually on-screen (e.g., single-speaker or single-instrument) compared to complex multi-source interactions or group dialogues.

## Code

- https://fgt7t6g.github.io/AV-SyncBench

## Applications

Engineers and researchers developing multimodal foundation models, audio-visual understanding systems, and generation frameworks (such as Video-to-Audio or Text-to-AudioVideo) can use this benchmark to rigorously diagnose feature extractor quality.

## Limitations

Semantic editing tasks rely on generative pipelines (OpenVoice, DDSP) that may introduce unintended acoustic artifacts beyond pure timbre changes, and current edits are restricted to speech and music rather than environmental or collision sounds. Furthermore, the dataset clips are under 13 seconds long and do not cover long-term temporal contexts.

## Related

- (link related pages by id as the wiki grows)
