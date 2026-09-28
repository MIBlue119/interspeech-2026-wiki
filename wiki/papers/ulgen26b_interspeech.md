---
id: ulgen26b_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1331
---

# DiffAnon: Diffusion-based Prosody Control for Voice Anonymization

**TL;DR** — A diffusion-based voice anonymizer with classifier-free guidance lets you dial prosody preservation up or down continuously at inference time, instead of being locked into one fixed privacy-utility trade-off.

## Problem

Whether to preserve prosody in voice anonymization is a central open question — prosody conveys meaning and affect but is tightly coupled to speaker identity — and existing methods either discard prosody entirely for privacy or lack a principled mechanism to control the utility-privacy trade-off, operating only at fixed design points.

## Method

The authors propose DiffAnon, a diffusion-based anonymization method with classifier-free guidance (CFG) that provides explicit, continuous inference-time control over prosody preservation, refining acoustic detail over semantic embeddings of an RVQ codec to enable smooth interpolation between anonymization strength and prosodic fidelity within a single model.

## Results

Experiments demonstrate structured trade-off behavior, achieving strong utility while maintaining competitive privacy across a range of controllable operating points — reportedly the first voice anonymization framework offering structured, interpolatable inference-time prosody control.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice anonymization for sharing sensitive recordings where the desired privacy-utility (prosody-preservation) trade-off varies by use case.

## Related

- (link related pages by id as the wiki grows)
