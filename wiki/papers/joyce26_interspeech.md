---
id: joyce26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/joyce26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/joyce26_interspeech.pdf
---

# Demonstration of Embedded Systems for Clinical Speech Analysis

[PDF](https://www.isca-archive.org/interspeech_2026/joyce26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/joyce26_interspeech.html)

**TL;DR** — This paper demonstrates a bedside embedded system powered by an NVIDIA Jetson AGX Orin for real-time, end-to-end clinical speech analysis in psychiatric applications, running faster than audio time.

## Problem

Current computational speech analysis tools typically rely on centralized, specialized hardware like high-end GPUs, forcing clinical recordings to be transmitted elsewhere for processing. This separation introduces delays, IT bottlenecks, privacy compliance hurdles, and technical barriers that prevent timely integration into acute clinical decision-making.

## Method

The system runs Python-based preprocessing and analysis software locally on an NVIDIA Jetson AGX Orin Developer Kit featuring a 12-core ARM CPU and a 64 GB NVIDIA Ampere GPU. The processing pipeline incorporates voice activity detection and speaker diarization via pyannote-audio v4.0.4, automatic speech recognition via whisperx v3.8.4, forced alignment using BFA v1.1.3, acoustic syllable detection via Syllable Nuclei v3, and internal modules for speaker role assignment and conversational analysis. A graphical dashboard built with display and mouse peripherals presents prosodic metrics, turn-taking statistics, spectrograms, and synchronized audio playback, with support for manual correction via ELAN.

## Results

The demonstration leverages a 60 W edge computing form factor that successfully processes clinical conversations at faster-than-audio time. It extracts quantitative linguistic and prosodic features such as speech rate, rhythm, and duration at both the speaker and segment levels. No specific quantitative benchmarks or comparative evaluations against other hardware platforms are reported in the text.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians, psychiatrists, and healthcare personnel seeking to perform real-time, offline, and privacy-preserving speech and prosody analysis directly at the patient's bedside.

## Limitations

The text does not state specific performance limitations, though the system's scope is currently bounded by the computational capacity of a 60 W embedded GPU hardware profile.

## Related

- (link related pages by id as the wiki grows)
