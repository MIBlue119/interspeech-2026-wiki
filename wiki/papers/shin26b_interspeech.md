---
id: shin26b_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2320
---

# EchoLoc: Audio-Aware Object Grounding via Joint Heatmap and Box-Level Localization

**TL;DR** — EchoLoc extends a query-based transformer detector with audio-visual alignment to learn spatial heatmaps that guide box-level object localization, letting it find sound-related visual regions even without bounding-box annotations, beating prior state-of-the-art on Flickr-SoundNet-Test.

## Problem

Multimodal models aiming to jointly understand images, text, and audio mostly focus on global-level representations and remain limited in precise object-level grounding, and text-image grounding models struggle to leverage non-visual cues like sound.

## Method

EchoLoc is an audio-aware grounding framework built on a query-based transformer detector (MDETR), incorporating audio information to complement textual supervision; it learns spatial heatmap-based local cues via audio-visual alignment and uses them to guide ROI-level object box prediction.

## Results

On Flickr-SoundNet-Test, EchoLoc yields +2.58% and +17.08% relative improvements in cIoU (adap) and AUC (adap) over the state-of-the-art, localizing sound-related visual regions without explicit bounding-box supervision.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to audio-visual scene understanding systems, robotics, or accessibility tools that need to localize the visual source of a sound in an image.

## Related

- (link related pages by id as the wiki grows)
