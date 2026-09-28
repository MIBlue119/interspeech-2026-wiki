---
id: stergaard26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3430
---

# Don't Listen to Me: A Lightweight, Low-Latency Model for Own-Voice Cancellation in Far-Field Speech Enhancement

**TL;DR** — Own-voice cancellation removes an enrolled speaker's voice from far-field device audio to avoid perceptually distorting round-trip-latency artifacts; a linear-RNN-based Mamba-MinGRU masker with just 2ms algorithmic latency beats a ConvTasNet-based baseline on distortion and predicted MOS while using less compute.

## Problem

Far-field devices that stream enhanced audio back to the user can introduce perceptible own-voice artifacts because round-trip latency easily exceeds the perceptual threshold for own-voice distortion, and this problem — own-voice cancellation (OVC) — had not been well framed or addressed.

## Method

The authors frame OVC as the complement of target speaker extraction: removing a target enrolled speaker from a noisy multi-speaker mixture while preserving remaining speech, condition a time-domain model with only 2ms algorithmic latency on a short enrollment utterance, and benchmark TD-SpeakerBeam against a lighter Mamba-MinGRU masker built from Mamba blocks with MinGRU temporal mixing, replacing the usual ConvTasNet-based auxiliary network with a linear RNN encoder.

## Results

Replacing the ConvTasNet-based auxiliary network with the linear RNN encoder improves both signal-to-distortion ratio and predicted MOS while reducing compute, establishing OVC as a practical low-latency enhancement objective.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Relevant to far-field smart-speaker and conferencing hardware that streams processed audio back to the speaker and needs to avoid audible feedback-like own-voice artifacts.

## Related

- (link related pages by id as the wiki grows)
