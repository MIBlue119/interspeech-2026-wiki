---
id: song26e_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2282
---

# Speaker-Filtered Heterogeneous Graph Network: Toward Privacy-Preserving Multimodal Emotion Recognition

**TL;DR** — A graph-based multimodal emotion recognizer that restricts information propagation to single-speaker subgraphs and a causal cross-speaker context module, avoiding the privacy leakage of global-context aggregation used by prior methods.

## Problem

Multimodal emotion recognition in conversation often relies on global context aggregation across all speakers, which can leak non-target speaker information and violate speaker-level privacy as well as leak future temporal information.

## Method

SF-HGN restricts graph propagation to subgraphs induced by a single speaker to preserve privacy, while a Context-Aware Graph Injection module extracts cross-speaker emotional cues using tri-modal attention within a strict causal window that prevents future information leakage and reduces noisy interactions.

## Results

Experiments on IEMOCAP and MELD show SF-HGN is effective at multimodal emotion recognition while maintaining speaker-level privacy through causal masking and speaker filtering.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-aware emotion recognition for conversational AI and human-computer interaction settings where exposing other speakers' features is undesirable.

## Related

- (link related pages by id as the wiki grows)
