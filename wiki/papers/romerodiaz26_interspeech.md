---
id: romerodiaz26_interspeech
category: speech-translation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-800
---

# Listening or Reading? Evaluating Speech Awareness in Chain-of-Thought Speech-to-Text Translation

**TL;DR** — Finds that Chain-of-Thought speech-to-text translation, despite having access to raw audio, actually behaves like a cascaded text pipeline that mostly ignores the acoustic signal, and shows a simple training fix that increases real acoustic reliance.

## Problem

Cascaded speech-to-text translation systems suffer from error propagation and lost prosodic cues; Chain-of-Thought prompting was proposed to fix this by giving joint access to speech and transcription, but whether it genuinely uses the speech signal was untested.

## Method

Systematically evaluates CoT's speech awareness through input attribution analysis, robustness testing against corrupted transcripts, and prosody-awareness evaluation, then applies simple training interventions such as injecting noisy transcripts into the CoT.

## Results

CoT largely replicates cascaded, transcript-only behavior in practice; injecting noisy transcripts during training measurably increases model robustness and genuine acoustic reliance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informs training-data design for speech translation systems that need to actually leverage prosody and acoustic cues, not just transcribed text.

## Related

- (link related pages by id as the wiki grows)
