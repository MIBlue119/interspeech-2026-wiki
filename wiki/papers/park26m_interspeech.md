---
id: park26m_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: abstract-only
source: https://www.isca-archive.org/interspeech_2026/park26m_interspeech.html
---

# Listening to Motion in Space: Vision-Grounded Event-wise Video-to-Audio Generation and Rendering

**TL;DR** — A training-free demo pipeline that turns silent video into editable, per-source binaural audio by decomposing the scene into discrete sound events with a vision-language model and spatializing each one post-hoc.

## Problem

Conventional video-to-audio systems output one mono mixture that cannot be edited per source, which blocks the spatial control needed in film post-production, game engines, and AR/VR, while end-to-end binaural systems need large paired video-binaural datasets that are hard to obtain.

## Method

VisionSFX uses a vision-language model to decompose a scene into discrete sound events, generates each event independently with a pretrained video-to-audio model within its own time window (plus a separate text-to-audio model for ambience), then spatializes the resulting tracks post-hoc using optical-flow centroids with ego-motion correction, monocular depth, and binaural rendering, all without any training or paired data.

## Results

Presented as a demo system: each sound source is generated and stored separately so it can be re-prompted, repositioned, or retimed independently, and a demo booth shows a per-source timeline populating from an uploaded clip in about one minute.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Editable spatial-audio generation for film post-production, game engines, and AR/VR content creation from silent video.

## Related

- (link related pages by id as the wiki grows)
