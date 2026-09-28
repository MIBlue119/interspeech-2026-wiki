---
id: kim26y_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3442
---

# VividAC: Visually Informed and Visually Interacted Audio Captioning for Enhancing Audio-Visual Question Answering

**TL;DR** — VividAC uses one LLM agent to describe the relevant part of a video and a second to turn that into a visually grounded audio caption, boosting audio-visual question answering without any joint audio-visual training.

## Problem

Textual audio captions can unlock LLM reasoning for audio-visual question answering, but naive captions often lack task-relevant detail and are inconsistent with what's happening visually, which can hurt rather than help performance.

## Method

VividAC is a training-free pipeline where a Visual Agent generates query-relevant video descriptions that guide an Audial Agent to produce audio captions grounded in that visual context, using only natural-language communication between off-the-shelf models.

## Results

On MUSIC-AVQA, VividAC beats the strongest end-to-end audio-visual LLM by 7.0 points and gives consistent gains across 11 of 12 tested LLM-VLM combinations, with improvements up to 11.01 points.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Boosting audio-visual question answering and video understanding pipelines by composing existing vision and audio models rather than training a new joint model.

## Related

- (link related pages by id as the wiki grows)
