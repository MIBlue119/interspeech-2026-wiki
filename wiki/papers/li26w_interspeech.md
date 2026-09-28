---
id: li26w_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1340
---

# Zero-VC: Zero-Lookahead Streaming Voice Conversion via Speaker Anonymization

**TL;DR** — Zero-VC repurposes speaker-anonymization perturbation as a timbre-content disentangling mechanism, enabling a strictly causal, zero-lookahead streaming voice converter that avoids the latency of information-bottleneck approaches.

## Problem

Streaming zero-shot voice conversion needs to disentangle timbre from linguistic content without hurting utility or adding latency, but information-bottleneck (IB) methods that filter out timbre also discard prosody (like F0) and typically need future-frame buffering, adding algorithmic lookahead latency; existing speaker-perturbation methods, meanwhile, tend to overlook the trade-off between timbre leakage and utility preservation.

## Method

Recognizing that the objective of Speaker Anonymization (SA) — hiding identity while preserving usable content — naturally matches the timbre-leakage/utility trade-off needed for voice conversion, the authors introduce SA as a novel perturbation mechanism, whose robust representations reduce the generator's dependence on future context enough to enable a strictly causal, zero-lookahead conversion network.

## Results

The SA-based perturbation approach explicitly mitigates timbre leakage while retaining prosodic utility, and its reduced reliance on future context enables the proposed strictly causal, zero-lookahead streaming architecture.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time streaming voice conversion for live communication, gaming, and broadcast applications where minimizing latency is critical.

## Related

- (link related pages by id as the wiki grows)
