---
id: bhosale26_interspeech
category: room-acoustics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2514
---

# Echoes after Edits: Room Impulse Response Estimation for Geometry Update

**TL;DR** — A method that predicts how a measured room impulse response changes after a small scene edit (like moving furniture) without re-simulating or re-measuring the whole room.

## Problem

Updating a room impulse response (RIR) after a scene changes (e.g., furniture rearranged or removed) normally requires either full acoustic re-simulation with material annotations, or many additional RIR measurements for interpolation — both impractical for everyday environments.

## Method

The authors introduce edit-conditioned RIR estimation: they simulate cheap "proxy" RIRs before and after the geometry edit using generic, predefined materials from the room mesh, then use the predicted proxy variation to estimate how the real, measured RIR should change (PG-RIR).

## Results

PG-RIR accurately predicts real RIR changes under furniture rearrangement and removal scenarios.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

AR/VR audio rendering and interactive room-acoustic design tools that need to react to scene edits without full re-measurement.

## Related

- (link related pages by id as the wiki grows)
