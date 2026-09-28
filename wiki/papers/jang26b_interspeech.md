---
id: jang26b_interspeech
category: prosody
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3216
---

# DP-BCT: A Dual-Path model for predicting BackChannel Timing

**TL;DR** — Splitting backchannel timing prediction into separate fast and slow processing paths, motivated by Dual-Process Theory and confirmed with survival analysis on Korean dialogue data, substantially improves prediction of when listeners say things like "uh-huh."

## Problem

Predicting when a listener will produce a backchannel response is hard because responses occur at varying latencies relative to Backchannel Opportunity Points, and it wasn't clear whether different functional categories of backchannels follow different timing patterns.

## Method

Using K-MIND, a 115-hour Korean dyadic corpus, the authors run Cox Proportional Hazards analysis confirming distinct BOP-relative latency distributions across four functional backchannel categories, then build DP-BCT, a Dual-Path model that decouples fast-group and slow-group backchannels into separate paths for frame-level onset and category prediction.

## Results

DP-BCT raises Macro-F1 from 0.4862 (a single-path baseline) to 0.6254 for backchannel timing prediction.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More natural turn-taking and listener-response behavior in conversational agents and voice assistants.

## Related

- (link related pages by id as the wiki grows)
