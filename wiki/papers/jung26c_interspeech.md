---
id: jung26c_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3044
---

# Edit the Moment, Keep the Rest: Time-Localized Audio Editing via Instruction

**TL;DR** — EMKR is an instruction-driven audio editing framework that edits precisely timed events — adding, removing, replacing, moving, or extending a sound — in polyphonic mixtures while leaving everything else untouched, down to 100ms precision.

## Problem

Audio editing systems can modify sound content but few handle temporal editing with precise control over when an event happens, which matters for timing-critical edits in mixtures with multiple overlapping sounds.

## Method

Built on Stable Audio Open, EMKR is trained on a temporal editing pipeline that constructs (instruction, input audio, target audio) triplets carrying explicit timing information, using an explicit edit interval for precise timing and a source-event mask to preserve the original event instance during moving or extending operations.

## Results

On mixtures from real-world datasets, EMKR enables time-localized editing of polyphonic audio at 100ms precision while preserving non-edited regions, supporting timing-critical editing tasks; audio samples are available online.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Precise sound editing for film/video post-production, podcast editing, and any tool needing frame-accurate control over adding or moving sound events in a mix.

## Related

- (link related pages by id as the wiki grows)
