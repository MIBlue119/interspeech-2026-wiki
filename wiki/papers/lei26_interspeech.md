---
id: lei26_interspeech
category: audio-understanding
labels: [generative-model]
institutions: ["Hong Kong University of Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-561
pdf: https://www.isca-archive.org/interspeech_2026/lei26_interspeech.pdf
---

# ARCHES: An Agent-Based Refinement Cycle for Hierarchical Synthesis of Sound Effects for Variety Shows

*Wentao Lei, Li Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/lei26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lei26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-561)

**Category:** `audio-understanding` · **Labels:** `generative-model`

**TL;DR** — ARCHES is a multi-agent framework that automates sound effect synthesis for variety shows using retrieval-augmented generation and iterative refinement, outperforming existing video-to-audio models with an FAD of 7.04 and an onset difference of 0.048 seconds.

## Key contributions

- Proposed ARCHES, a hierarchical, agent-based workflow for planning, generating, and iteratively refining stylized non-diegetic sound effects.
- Designed the Auditory Unified Retrieval Augmentation (AURA) module to ground initial synthesis in a curated 26k-item database for content diversity.
- Introduced the Adaptive eXpert Intelligent Switch (AXIS) module for self-routing refinement tasks to specialized sub-agents (e.g., temporal and emotion refiners).
- Constructed VSSE-Bench, the first large-scale benchmark for variety show sound effects, comprising 1,000 pre-processed episodes.
- Created the Creative Experience Bank (CEB) long-term memory system to store and reuse successful historical creative interaction chains.

## Problem

General video-to-audio models (like Kling-Foley and MMAudio) excel at natural diegetic sounds such as footsteps and collisions, but they fail to capture the stylized, comedic, and emotionally heightened sound design required by variety shows. Furthermore, these models suffer from poor temporal precision, a lack of content diversity for rare or unique acoustic events (like celebrity signature laughs), and an inability to understand complex visual context. This forces industry workflows to rely entirely on manual editing by human sound engineers, creating massive scalability bottlenecks.

## Method

The ARCHES framework processes input videos through a three-stage pipeline: Planning, Generation, and an iterative Refinement Loop. First, a Planning Agent analyzes visual and speech content for event detection. A Generation Agent then performs conditional audio synthesis based on initial prompts and retrieved exemplars from the Auditory Unified Retrieval Augmentation (AURA) module. AURA employs a Qwen2-Audio multimodal encoder fine-tuned via LoRA (rank r=8, alpha=32) using InfoNCE loss with in-batch negatives to project emotion labels, event class labels, and raw audio into a unified embedding space.

Once the initial audio is produced, a Checker Agent evaluates it for temporal synchronization and semantic/emotional coherence. If discrepancies are identified, the Adaptive eXpert Intelligent Switch (AXIS) module dynamically dispatches the output to specialized refiner agents—such as a Temporal Dynamics Refiner or an Emotion Refiner—to perform targeted corrections. Systemic self-evolution is supported by the Creative Experience Bank (CEB), which logs successful interaction trajectories as typical template shortcuts to accelerate future decision-making.

The core audio generation/editing structure relies on MultiFoley, while higher-level cognitive tasks and agent planning are driven by MLLMs like Gemini-2.5 Pro. Training data for AURA consists of a proprietary database of over 26,000 isolated, high-fidelity sound effects categorized by class and emotional metadata.

## Experimental setup

Evaluated on VSSE-Bench, consisting of 1,000 full-length episodes from YouTube and Bilibili across sketch comedy, reality TV, and game shows, segmented into event-centric clips. Compared against video-to-audio baselines MMAudio, Kling-Foley, HunyuanVideo-Foley, and FoleyCrafter. Metrics include Log-Spectral Distance (LSD), Onset Difference (OD), Fréchet Audio Distance (FAD), Auto-MOS, and human user study scores (MOS-Semantic, MOS-Temporal, MOS-Emotion). AURA retriever trained using a learning rate of 1e-4, batch size of 32, audio token limit of 2,000, and text metadata limit of 512 tokens.

## Results

ARCHES achieves an LSD of 0.77 dB, an Onset Difference of 0.048 s, and an FAD of 7.04, vastly outperforming baselines such as Kling-Foley (FAD 25.52, OD 0.077s) and HunyuanVideo-Foley (FAD 21.04, OD 0.124s). In subjective evaluations, ARCHES leads across all user study dimensions, securing a MOS-Semantic of 4.04, MOS-Temporal of 4.54, and MOS-Emotion of 4.46 (compared to baseline emotion scores ranging from 1.50 to 2.35). 

Ablation studies confirm the necessity of each module: removing AURA causes FAD to spike to 15.81 and LSD to 1.35 dB; disabling AXIS degrades temporal alignment, inflating Onset Difference to 0.122 seconds; removing CEB results in a slight drop in overall quality.

| System/Condition | LSD (dB) ↓ | OD (s) ↓ | FAD ↓ | MOS-E ↑ |
|---|---|---|---|---|
| MMAudio | 2.09 | 0.120 | 22.76 | 2.21 |
| Kling-Foley | 1.99 | 0.077 | 25.52 | 2.35 |
| HunyuanVideo-Foley | 2.24 | 0.124 | 21.04 | 1.79 |
| FoleyCrafter | 2.15 | 0.112 | 34.39 | 1.50 |
| ARCHES (Ours) | 0.77 | 0.048 | 7.04 | 4.46 |

## Limitations

The framework relies heavily on proprietary or frontier multimodal LLMs (such as Gemini-2.5 Pro) for its cognitive agent loop, introducing significant computational latency and external model dependencies during inference. Evaluation is currently constrained to Chinese and international variety show clips from YouTube and Bilibili, leaving cross-lingual and broader domain generalization unverified. Additionally, multi-agent iterative refinement loops inherently incur higher inference time than single-pass feedforward generative models.

## Why read this

Researchers and engineers tackling complex multimodal generation tasks requiring fine-grained control and reasoning will find ARCHES a blueprint for combining retrieval augmentation with multi-agent refinement loops. It demonstrates how to move beyond open-loop text-to-audio architectures into structured, self-correcting creative systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated post-production for comedy and variety shows, interactive video editing software suites, and stylized sound design generation for content creators.

## Institutions / 機構

Hong Kong University of Science and Technology

## Related

- [FoleyGenEx: Unified Video-to-Audio Generation with Multi-Modal Control, Temporal Alignment, and Semantic Precision](wang26b_interspeech.md) — same problem · relatedness 2.8/3
- [Listening to Motion in Space: Vision-Grounded Event-wise Video-to-Audio Generation and Rendering](park26m_interspeech.md) — same problem · relatedness 2.5/3
- [FoleyImmersive: Decoupling What and Where for Video-to-First-Order Ambisonics](liang26b_interspeech.md) — same problem · relatedness 2.4/3
- [AuDirector: A Self-Reflective Closed-Loop Framework for Immersive Audio Storytelling](ren26d_interspeech.md) — shared technique · relatedness 1.9/3
- [PF-D2M: A Pose-free Diffusion Model for Universal Dance-to-Music Generation](im26_interspeech.md) — relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
