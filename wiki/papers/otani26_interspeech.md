---
id: otani26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3379
---

# Speaker-Independent Speech Synthesis from Real-time MRI Articulatory Data

**TL;DR** — Synthesizes speech directly from real-time MRI videos of the vocal tract using a speaker-independent pipeline trained with cross-modal speaker embeddings, achieving reasonable linguistic accuracy and partial prosody/speaker-identity reconstruction.

## Problem

Generating intelligible, speaker-appropriate speech directly from real-time MRI articulatory video (rather than audio) in a speaker-independent way is largely unexplored, and it's unclear how much prosodic and speaker information visual articulatory data alone can support.

## Method

The pipeline uses EfficientNetV2 for per-frame visual feature extraction from rtMRI video, E-Branchformer for temporal modeling, and BigVGAN-v2 for waveform synthesis, with speaker characteristics learned via cross-modal training against speaker embeddings so the model can synthesize speaker-independently from rtMRI alone.

## Results

On the USC 75-Speaker Speech MRI Database, the method achieves favorable linguistic accuracy for read speech, captures relative prosodic (F0) patterns reasonably well though absolute F0 remains hard, and reproduces speaker identity to a reasonable degree despite difficulty discriminating speakers within the same gender.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Silent-speech and articulatory-based speech synthesis interfaces, e.g. for patients unable to produce audible speech, using imaging rather than acoustic input.

## Related

- (link related pages by id as the wiki grows)
