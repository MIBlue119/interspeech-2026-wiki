---
id: kolos26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1464
---

# Controlled Generation of Synthetic Speaker Vectors for Voice Anonymization

**TL;DR** — Attribute-conditioned WGAN and diffusion generators produce synthetic pseudo-speaker vectors for voice anonymization that let users control which original speaker traits are preserved, while keeping strong privacy and utility.

## Problem

Resynthesis-based voice anonymization substitutes a speaker's vector with an artificial one, but existing generation methods give no control over which original speaker attributes end up preserved in the anonymized voice.

## Method

The authors extend a WGAN-based synthetic speaker-vector generator with attribute-label conditioning, and separately introduce diffusion models with classifier guidance as a more robust alternative for label-informed speaker-vector synthesis.

## Results

Evaluated on the Voice Privacy Challenge 2024 suite, both approaches give strong attribute control while maintaining competitive privacy and utility; the authors also propose new diversity, originality, and naturalness measures to help select the best generator configuration.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice anonymization pipelines for privacy-preserving speech data sharing, where control over preserved attributes (e.g. gender, accent) matters.

## Related

- (link related pages by id as the wiki grows)
