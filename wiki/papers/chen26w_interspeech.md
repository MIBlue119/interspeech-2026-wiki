---
id: chen26w_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2222
---

# T-ORR: Text-Anchored Orthogonal Residual Rectification for Robust Multimodal Sarcasm Detection

**TL;DR** — Reframes multimodal sarcasm detection as separating signal from noise rather than fusing modalities, using text-anchored geometric decomposition to isolate the audio/visual cues that actually contradict the literal words.

## Problem

Standard fusion-based multimodal sarcasm detectors blend modalities into one joint space, which tends to bury the sparse, subtle incongruity cues that reveal sarcasm.

## Method

T-ORR aligns non-verbal (audio/visual) streams to the specific words they modify via Dynamic Locality-Constrained Alignment, uses QR-projection-based geometric decomposition to split signals into semantic agreement (Resonance) and modality-specific contradiction (Dissonance), then routes the contradiction signal through a Contrastive Incongruity Routing mechanism that models distance between literal and incongruous states.

## Results

T-ORR achieves state-of-the-art results on the MUStARD and MUStARD++ multimodal sarcasm benchmarks, indicating that geometric decoupling isolates incongruity better than joint fusion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Sarcasm- and irony-aware sentiment analysis for social media video, call-center analytics, and other multimodal affect-understanding systems.

## Related

- (link related pages by id as the wiki grows)
