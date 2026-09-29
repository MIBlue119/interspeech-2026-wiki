---
id: yang26f_interspeech
category: audio-understanding
institutions: ["University of Oxford"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-821
pdf: https://www.isca-archive.org/interspeech_2026/yang26f_interspeech.pdf
---

# Geometry-Informed Distributed Acoustic Scene Understanding

*Yiyuan Yang, Shitong Xu, Niki Trigoni, Andrew Markham*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-821)

**Category:** `audio-understanding`

**TL;DR** — A distributed acoustic scene understanding framework uses topology-aware graph neural networks and a frozen LLM to fuse multi-room audio and generate physically consistent indoor narratives, achieving an 87% triplet F1-score and 88.2% spatial consistency under occlusion.

## Key contributions

- Formalizes multi-room acoustic scene understanding using structured semantic triplets (subject, relation, object) to replace fragmented acoustic tags.
- Proposes a topology-aware graph neural network that models sound propagation and room boundaries to fuse distributed microphone inputs.
- Introduces a geometry-aware Large Language Model reasoning module that integrates spatial floor plans to infer missing acoustic transitions.
- Evaluates the framework on a custom multi-room acoustic simulator incorporating complex indoor sound propagation and occlusion.

## Problem

Traditional acoustic scene monitoring relies on centralized microphone arrays, which fail in multi-room buildings because physical barriers like walls and doors attenuate signals and create non-line-of-sight blind spots. Without environmental geometry, systems treat sounds as isolated events and produce non-physical jumps in tracking. This creates fragmented scene descriptions that miss critical events occurring outside the immediate room of the central sensor.

## Method

The framework takes synchronized log-Mel spectrograms from $N$ distributed microphones, microphone coordinates, and environmental geometry $\Omega$ (room boundaries, portal states, and material absorption coefficients). A shared Audio Spectrogram Transformer (AST) backbone processes fixed-length log-Mel segments from each node to extract latent embeddings, concatenated with an MLP positional encoding. These node states are updated using a spatial graph neural network with edge weights derived from Euclidean distance and wall attenuation coefficients, prioritizing direct paths and modeling acoustic leakage across rooms. The spatially fused vectors are then passed through a Gated Recurrent Unit (GRU) to capture temporal dependencies and continuity of sound events over time.

Following temporal modeling, a query-based multi-head attention decoder translates spatio-temporal embeddings into discrete semantic triplets representing a dynamic acoustic scene graph. The probability of each triplet sequence is factorized conditionally to prevent illogical pairings (e.g., doors performing speech actions), supervised by a cross-entropy loss against simulator logs. Finally, a frozen Meta Llama-3-8B-Instruct model converts the linearized symbolic triplets and a textual description of the floor plan into a natural language narrative. The LLM acts as a zero-shot reasoning engine, using room adjacency and connectivity constraints to bridge intermittent detections and resolve spatial ambiguities caused by acoustic occlusion.

## Experimental setup

Evaluated on a custom multi-room simulator extending pyroomacoustics across layouts of 2 to 4 rooms with RT60 reverberation times between 0.2s and 0.6s. Audio events are sourced from LibriSpeech and ESC-50 resampled to 16 kHz, with background noise levels varying between 20 and 40 dB SNR using a network of $N=6$ distributed microphone nodes. Compared against Centralized-Single, Distributed Acoustic-Only, and Template-Based baselines. Evaluated using Triplet F1-score, BLEU-4, ROUGE-L, BERTScore, and Spatial Consistency Score (SCS).

## Results

The full framework achieves a headline Triplet F1-score of 0.87, significantly outperforming the Centralized-Single baseline (0.51) and Distributed Acoustic-Only baseline (0.74). For text generation and narrative quality, it reaches a BLEU-4 of 0.55, ROUGE-L of 0.62, and BERTScore of 0.77, alongside an SCS of 88.2% (compared to 35.0% for Centralized-Single and 61.8% for Distributed Acoustic-Only). Ablation studies show that removing the geometry prior drops SCS to 66.5% and BERTScore to 0.68, while removing spatial-temporal graph fusion reduces the Triplet F1-score to 0.81.

| System variant | Triplet F1 | BLEU-4 | ROUGE-L | BERT | SCS (%) |
|---|---|---|---|---|---|
| Centralized-Single | 0.51 | 0.15 | 0.22 | 0.45 | 35.0 |
| Distributed Acoustic-Only | 0.74 | 0.41 | 0.47 | 0.65 | 61.8 |
| Template-Based | 0.86 | 0.39 | 0.46 | 0.61 | 79.5 |
| Ours | 0.87 | 0.55 | 0.62 | 0.77 | 88.2 |

## Limitations

The study is restricted to a controlled simulation environment without real-world physical testbed validation. The evaluation is currently limited to small layouts spanning 2 to 4 rooms with synthetic acoustic event placements and simulated occlusion.

## Why read this

Researchers building multi-room smart-home or monitoring systems will find valuable insights on combining distributed graph neural networks with frozen LLMs for logically grounded acoustic reasoning. It demonstrates how spatial topology can effectively resolve non-line-of-sight audio perception challenges.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Indoor security monitoring, elderly care emergency detection, and multi-room smart home automation.

## Institutions / 機構

University of Oxford

## Related

- [A Sensitivity Analysis of Multi-Event Audio Grounding in Audio LLMs](lee26o_interspeech.md) — same problem · relatedness 1.9/3
- [Probing Spatial Structure in Pretrained Audio Representations](chen26ba_interspeech.md) — complementary · relatedness 1.8/3
- [UG-Bench: A Comprehensive Benchmark for Evaluating Large Audio-Language Models](zhou26c_interspeech.md) — complementary · relatedness 1.8/3
- [Branch-wise Complementary Attention for Acoustic Scene Classification](han26b_interspeech.md) — same problem · relatedness 1.8/3
- [CoSTALA: Compositional Spatio-Temporal Audio-Language Alignment via Multi-Grain Hierarchical Contrastive Learning](ren26b_interspeech.md) — same problem · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
