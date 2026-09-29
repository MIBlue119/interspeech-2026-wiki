---
id: ren26d_interspeech
category: tts
labels: [generative-model]
institutions: ["Shanghai Artificial Intelligence Laboratory", "Tsinghua University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1180
pdf: https://www.isca-archive.org/interspeech_2026/ren26d_interspeech.pdf
---

# AuDirector: A Self-Reflective Closed-Loop Framework for Immersive Audio Storytelling

*Yiming Ren, Ziyang Zhang, Wen Wu, Baoxiang Li, Chao Zhang, Xuenan Xu*

[PDF](https://www.isca-archive.org/interspeech_2026/ren26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1180)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — AuDirector is a self-reflective closed-loop multi-agent framework for long-form audio storytelling that coordinates voice casting, hierarchical synthesis, critic-led self-correction, and natural language interactive refinement, outperforming baseline agent systems in voice-role matching and acoustic fidelity.

## Key contributions

- Proposed an Identity-Aware Pre-production mechanism combining a 320-sample diverse voice library, semantic filtering via EmbeddingGemma, and 7-dimensional emotion instruction generation.
- Established a Collaborative Synthesis and Correction module with a nested generation-evaluation-refinement loop driven by a Critic Agent (MiMoAudio/CLAP) to audit and regenerate defective tracks.
- Integrated a Human-Guided Interactive Refinement module that interprets natural language editing commands to execute targeted script modifications and component regenerations.
- Curated a comprehensive evaluation set of 100 scenarios (40 podcast topics and 60 radio dramas) spanning multi-turn conversations and ROCStories-based temporal narratives.

## Problem

Current audio generation frameworks remain fragmented across domains (speech, music, sound effects) and produce only short segments with limited structural coherence. Existing agent-based audio storytelling systems like WavJourney and PodAgent suffer from constrained adaptive speech representation, the absence of self-correcting quality control loops to handle generative variance, and predominantly open-loop operation lacking human-in-the-loop interactive refinement. These shortcomings cause mismatches between character profiles and voice performance, compounding defects across long-form narratives.

## Method

The framework processes user prompts through three pipeline stages using specialized LLM agents. Stage one (Identity-Aware Pre-production) uses Gemini-3-Pro as the Director Agent (Adir) to parse input scripts into structured dialogues and character profiles, while the Casting Agent (Acas) matches profiles against a 320-item diverse voice library (D) using EmbeddingGemma embeddings and cosine-based semantic filtering (top-K candidate set Scand). Additionally, Adir translates scene contexts into a 7-dimensional emotion instruction vector (Iemo) over a predefined emotional basis.

Stage two (Collaborative Synthesis and Correction) employs an Acoustic Production Agent (Aaco) using IndexTTS2 for speech (conditioned on dialogue, chosen voice ak*, and Iemo), TangoFlux for sound effects (SFX), and MusicGen for background music (BGM). A Critic Agent (Acri) audits generated tracks using MiMoAudio (for speech) and CLAP (for non-speech) against quality thresholds (tau_speech, tau_ns) across up to N_max attempts, retaining the highest-scoring sample before a Mix Agent (Amix) composites the tracks into an initial audio file (Ainit).

Stage three (Human-Guided Interactive Refinement) utilizes an Interaction Agent (Aint) to parse natural language user feedback (Fuser), update the structured production script (Sprod), and perform Targeted Regeneration (TR) exclusively on affected audio tracks, updating Afinal via Amix to minimize computational overhead.

## Experimental setup

Evaluated on 100 scenarios comprising 40 podcast topics (Vicuna-derived: Generic, Knowledge, Common-sense, Counterfactual) and 60 radio dramas (ROCStories). Compared against baseline agent systems WavJourney and PodAgent (both using the same underlying generation backends and LLM controllers) and an ablation variant (AuDirector w/o Critic). Automated metrics include Voice-Role Matching (VRM, 1-5 scale assessed by Gemini-3-Pro) and Audio Aesthetics Score (AES: PQ, PC, CE, CU). Subjective evaluation uses a Mean Opinion Score (MOS) study with 10 evaluators across 5 dimensions (Matching, Quality, Alignment, Emotion, Aesthetic), alongside an Instruction Execution Accuracy (IEA) metric tested across 200 natural language editing instructions.

## Results

AuDirector (Full) achieves the highest scores in Production Quality (7.59), Content Enjoyment (6.46), and Voice-Role Matching (4.23) on objective AES metrics, outperforming WavJourney (PQ 6.95, CE 5.19, VRM 2.61) and PodAgent (PQ 7.46, CE 6.37, VRM 3.59). On subjective MOS evaluations, it achieves top scores in MOS-Matching (4.00), MOS-Quality (3.86), MOS-Alignment (3.74), and MOS-Emotion (4.17). Ablation against the w/o Critic variant proves the self-correction mechanism drives consistent improvements across all metrics except quality and matching. The system does not lead on Production Complexity (4.32 vs WavJourney's 4.42) or Content Usefulness (6.98 vs PodAgent's 7.11), where complex multi-element layering trades off against simpler, fixed formats. Interactive editing achieves an overall Instruction Execution Accuracy (IEA) of 90.00%, peaking at 96.00% for Signal Gain Control while dropping to 84.00% for Structural Editing due to temporal localization ambiguities in dense overlapping acoustic scenes.

| Method | CE_↑ | CU_↑ | PC_↑ | PQ_↑ | VRM_↑ | MOS-M_↑ | MOS-Q_↑ | MOS-Ali_↑ | MOS-Emo_↑ | MOS-Aes_↑ |
|---|---|---|---|---|---|---|---|---|---|---|
| WavJourney | 5.19 | 5.66 | 4.42 | 6.95 | 2.61 | 3.09 | 3.58 | 3.30 | 3.10 | 3.41 |
| PodAgent | 6.37 | 7.11 | 2.98 | 7.46 | 3.59 | 3.48 | 3.73 | 3.60 | 3.60 | 4.04 |
| AuDirector (w/o Critic) | 6.22 | 6.52 | 4.18 | 7.37 | 4.23 | 4.01 | 3.83 | 3.65 | 4.00 | 3.92 |
| AuDirector (Full) | 6.46 | 6.98 | 4.32 | 7.59 | 4.23 | 4.00 | 3.86 | 3.74 | 4.17 | 4.01 |

## Limitations

The framework relies heavily on external foundation models (IndexTTS2, TangoFlux, MusicGen, MiMoAudio, CLAP) whose intrinsic non-speech generation limitations—such as reproducing subtle acoustic nuances like smooth versus tense breathing—persist and can disrupt immersion. The interactive refinement module exhibits lower accuracy (84% IEA) on complex temporal tasks like Acoustic Content Modification and Structural Editing when handling dense acoustic segments with overlapping sound effects.

## Why read this

Speech and ML researchers building multi-agent generative systems will find this paper valuable for its practical blueprint on closing the loop with automated critic agents and targeted script regeneration, overcoming the open-loop limitations typical of audio storytelling frameworks.

## Code

- https://github.com/Riddae/AuDirector

## Applications

Automated production of immersive podcasts, multi-character audiobooks, and interactive radio dramas from text prompts.

## Institutions / 機構

Shanghai Artificial Intelligence Laboratory, Tsinghua University

**Funding / 經費:** Shanghai Artificial Intelligence Laboratory

## Related

- (link related pages by id as the wiki grows)
