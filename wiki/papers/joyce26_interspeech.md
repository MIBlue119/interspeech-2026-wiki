---
id: joyce26_interspeech
category: health-clinical
labels: [efficient-on-device, streaming-real-time]
institutions: ["Mayo Clinic"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/joyce26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/joyce26_interspeech.pdf
---

# Demonstration of Embedded Systems for Clinical Speech Analysis

*Jeremiah B Joyce, Erik Clemens, Sanjeev Mishra, Josh Boesche, David Johnson, Marie Reyes*

[PDF](https://www.isca-archive.org/interspeech_2026/joyce26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/joyce26_interspeech.html)

**Category:** `health-clinical` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — This paper demonstrates an end-to-end embedded system using an NVIDIA Jetson AGX Orin for real-time clinical speech analysis in psychiatric settings, achieving faster-than-audio processing without cloud connectivity.

## Key contributions

- Demonstrated the first local, end-to-end embedded speech analysis pipeline for psychiatric evaluations using an edge GPU device.
- Integrated a complete multi-stage speech processing stack (VAD, diarization, ASR, forced alignment, syllable detection, and emotion recognition) on a 60W edge platform.
- Provided an interactive bedside dashboard for visualizing prosodic features, speaker turns, word-level timestamps, and spectrograms with synchronized audio playback.
- Incorporated manual verification and correction workflows using ELAN integration directly on the bedside system.

## Problem

Clinical speech analysis tools typically rely on deep learning models that require heavy centralized GPU infrastructure, forcing clinical environments to transfer sensitive patient audio off-site for processing. This introduces significant delays, demanding IT overhead and creating strict data security and privacy barriers that hinder adoption during urgent psychiatric evaluations. Existing workflows separate data collection, analysis, and reporting across time and space, preventing point-of-care integration. Embedded edge systems can bypass these limitations, but have historically struggled with the compute and runtime constraints of modern neural networks.

## Method

The system runs on an NVIDIA Jetson AGX Orin Developer Kit equipped with a 12-core 2.2 GHz ARM CPU and a 2048-core 64 GB NVIDIA Ampere GPU, drawing 60 W of power. Audio is captured via high-fidelity microphones (headset or array) and processed entirely offline using a Python-based pipeline. The preprocessing architecture chains pyannote-audio v4.0.4 for Voice Activity Detection and speaker diarization, internal modules for speaker role assignment and conversational analysis, whisperx v3.8.4 for Automatic Speech Recognition, BFA v1.1.3 for forced alignment, Syllable Nuclei v3 for acoustic syllable detection, and internal modules for speech emotion recognition.

The pipeline parses complex multi-speaker conversations into temporally aligned segments of speech and silence, mapping roles and quantifying clinical features such as speech rate, rhythm, and duration via standard linguistic formulas. Inference executes locally at faster-than-audio speeds, removing network upload requirements. The user interface renders outputs via a DisplayPort monitor using a standard computer mouse for navigation, supporting interactive dashboards, spectrogram visualization, and ELAN-based manual corrections that immediately trigger metric recalculation.

## Experimental setup

The setup utilizes an NVIDIA Jetson AGX Orin Developer Kit (60W, 12-core ARM CPU, 64 GB Ampere GPU) running Python-based clinical speech analysis software. Datasets and evaluation metrics are not explicitly benchmarked in terms of quantitative accuracy scores, as this work focuses on a system demonstration for end-to-end bedside processing rather than algorithmic optimization.

## Results

The demonstrated system successfully executes the complete end-to-end speech analysis pipeline locally on the NVIDIA Jetson AGX Orin hardware at faster-than-audio processing speeds. The paper reports a functional demonstration of real-time clinical feature extraction—including prosody, turn-taking, and sentiment metrics—entirely offline within a 60W power envelope, eliminating cloud latency and data transmission barriers.

## Limitations

The paper lacks quantitative benchmarks regarding processing latency, memory footprint, or transcription/diarization accuracy degradation on edge hardware compared to server-grade GPUs. The demonstration is scoped to specific psychiatric evaluation pipelines using pre-selected open-source frameworks, and broader scalability across diverse low-resource clinical settings remains to be tested.

## Why read this

Speech and ML engineers building edge-deployable audio pipelines or healthcare AI applications should read this to see a concrete architecture and library stack for running large transformer-based speech models locally on embedded hardware.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Bedside psychiatric evaluation, point-of-care clinical speech monitoring, and offline secure voice analysis in low-resource medical environments.

## Institutions / 機構

Mayo Clinic

## Related

- [GADVOX: The German Anxiety and Depression Voice Examination Dataset](spang26_interspeech.md) — complementary · relatedness 1.9/3
- [Clinically-Supervised Hierarchical LoRA-MoE: A Parameter-Efficient Framework for Severity-Aware Dysarthric Speech Assessment](wang26ga_interspeech.md) — same problem · relatedness 1.9/3
- [Speech-based Psychological Crisis Assessment using LLMs](chiba26_interspeech.md) — same problem · relatedness 1.8/3
- [S-DiverSe: Spanish Diverse Speech](lopez26b_interspeech.md) — same problem · relatedness 1.8/3
- [PAN-Mask: Pathology-Aware Neurological Masking with End-to-End Learnable Weights for Neurological Disorder Detection from Speech](sun26b_interspeech.md) — same problem · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
