---
id: ren26d_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1180
pdf: https://www.isca-archive.org/interspeech_2026/ren26d_interspeech.pdf
---

# AuDirector: A Self-Reflective Closed-Loop Framework for Immersive Audio Storytelling

[PDF](https://www.isca-archive.org/interspeech_2026/ren26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1180)

**TL;DR** — AuDirector is a self-reflective, closed-loop multi-agent framework for long-form audio storytelling that improves structural coherence, emotional expressiveness, and acoustic fidelity over existing baseline models.

## Problem

Existing agent-driven audio storytelling systems lack dynamic voice adaptation, fine-grained emotional control, and self-correcting quality mechanisms, leading to contextual mismatches and unstable outputs. Furthermore, they predominantly operate in an open-loop manner without human-in-the-loop collaborative editing capabilities. These shortcomings hinder the generation of coherent, multi-track audio narratives across speech, sound effects, and background music over extended durations.

## Method

AuDirector employs a multi-agent architecture controlled by Gemini-3-Pro alongside EmbeddingGemma for casting, IndexTTS2 for speech generation, TangoFlux for sound effects, and MusicGen for background music. The framework operates through three stages: Identity-Aware Pre-production, which parses scripts into character profiles and 7-dimensional emotion instructions before executing a coarse-to-fine voice retrieval over a 320-sample library; Collaborative Synthesis and Correction, which uses a MiMoAudio and CLAP-based Critic Agent in a nested generation-evaluation-refinement loop to audit and regenerate defective audio tracks; and Human-Guided Interactive Refinement, which interprets natural language user feedback to perform targeted script revisions and selective component regeneration.

## Results

Evaluated on a dataset of 100 scenarios comprising 40 podcasts and 60 radio dramas, AuDirector is compared against WavJourney, PodAgent, and an ablation without the critic module using automated metrics (Audio Aesthetics Score and Voice-Role Matching) and human MOS evaluations. AuDirector (Full) achieves superior performance, scoring 6.46 in Content Enjoyment, 7.59 in Voice-Role Matching, and leading across subjective dimensions like MOS-Matching and MOS-Aesthetic. The self-correction module yields consistent gains across objective and subjective metrics. Interactive editing evaluation across 200 natural language instructions yields an overall Instruction Execution Accuracy of 90.00%.

## Code

- https://github.com/Riddae/AuDirector

## Applications

Speech and ML engineers building multimedia content creation platforms, automated podcast generators, or interactive audio drama production tools.

## Related

- (link related pages by id as the wiki grows)
