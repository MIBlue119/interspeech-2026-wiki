---
id: asaka26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1956
---

# Two-Level Uncertainty Suppression for Robust Meeting Diarization

**TL;DR** — A two-level framework that stabilizes both segmentation and clustering in meeting diarization cuts diarization error by up to 2.62 points on real meeting benchmarks, especially in overlap-heavy and mixed-speaker scenarios.

## Problem

Real meeting diarization suffers from uncertainty propagation: ambiguous speaker-turn boundaries and overlapping speech destabilize the downstream speaker-assignment step, hurting accuracy on real recordings.

## Method

For segmentation, linguistically contextualized representations from an OWSM encoder are injected into WavLM via Feature-wise Linear Modulation to sharpen boundaries in high-activity regions. For clustering, Known-Seed Guided Clustering uses known-speaker embeddings as anchors to stabilize speaker assignment when known and unknown speakers are mixed.

## Results

On AMI, AliMeeting, and AISHELL-4, the FiLM-based segmentation reduces DER by up to 1.8 points over a WavLM-large baseline, and the guided clustering adds up to a further 2.62-point DER improvement under mixed known/unknown-speaker conditions, with the largest gains where speaker turns are frequent.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More accurate speaker diarization for meeting transcription systems, particularly where some participants' voices are already enrolled or known in advance.

## Related

- (link related pages by id as the wiki grows)
