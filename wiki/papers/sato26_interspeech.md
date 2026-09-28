---
id: sato26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2997
---

# Latency Controllable Speech Enhancement

**TL;DR** — A single causal speech enhancement model with Latency Control Adapters supports seven different latency modes, beating separately trained per-latency models while cutting stored parameters by 76%.

## Problem

Streaming speech enhancement needs to meet latency budgets ranging from milliseconds (hearing devices) to hundreds of milliseconds (telephony/offline), but since most neural models are trained for one fixed lookahead, supporting multiple latency budgets normally requires multiple full models.

## Method

The authors propose a latency-controllable speech enhancement framework: a causal enhancement model augmented with Latency Control Adapters (LCAs) that switch the model's effective latency by changing how much future context it can use, trained with intra-batch multi-latency training so one model covers many latency modes.

## Results

One LCA model supports seven latency modes, surpassing per-latency dedicated models in enhancement quality, keeping inference MACs constant across modes, and reducing stored parameters by 76% versus training separate models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Single deployable speech enhancement model covering diverse latency requirements across devices, from hearing aids to telephony and offline processing.

## Related

- (link related pages by id as the wiki grows)
