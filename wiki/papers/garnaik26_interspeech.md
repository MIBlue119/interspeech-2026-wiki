---
id: garnaik26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2197
pdf: https://www.isca-archive.org/interspeech_2026/garnaik26_interspeech.pdf
---

# When Machines Speak Like Local Peers: Improving Conversational Experiences with Accent-Adaptive Voice Agents

[PDF](https://www.isca-archive.org/interspeech_2026/garnaik26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/garnaik26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2197)

**TL;DR** — LocalMATE is an end-to-end accent-adaptive conversational airport kiosk agent that uses a confidence-gated fallback mechanism to improve user trust and confidence.

## Problem

Public voice agents frequently underperform when processing accented English, leading to decreased usability, user frustration, and microaggressions that erode trust. While matching a user's accent can improve interaction quality, incorrect adaptation introduces severe friction and damages user confidence. A systematic framework is needed to balance adaptive personalization with safety fallback mechanisms under detection uncertainty.

## Method

LocalMATE combines a Whisper-small ASR model, GPT-based embedding retrieval over a validated FAQ set, a fine-tuned WavLM-Base-Plus accent classifier with layer-weighted statistics pooling, VEVO TTS for accent-conditioned speech synthesis, and SadTalker for lip-synchronized talking-face video generation. The accent classifier uses a softmax-weighted sum over 13 hidden states followed by mean and standard deviation pooling, mapping into a 2-layer MLP to classify Indian, Korean, and Spanish accents. A session-level cache stores the accent state for ten minutes to ensure multi-turn stability. A confidence-gated fallback policy automatically reverts to neutral US-accented TTS output whenever the accent classifier confidence falls below a set threshold.

## Results

Evaluated on the L2-ARCTIC dataset using speaker-disjoint splits, the WavLM-Base-Plus model achieves 83.0% test accuracy (0.835 test macro-F1). On the out-of-domain Korean-accented Speech Accent Archive, the classifier reaches 92.3% accuracy. A within-participant user study with 20 participants demonstrates that correct accent adaptation significantly increases user confidence and trust (p < 0.05) while reducing repair attempts, whereas incorrect adaptation harms trust and escalates friction. The confidence-gated fallback effectively mitigates mismatch harm and restores user confidence.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Public-facing conversational kiosks, airport help desks, and information robots serving multilingual populations.

## Limitations

Evaluated exclusively on three non-native English accents (Indian, Korean, Spanish) within a restricted airport FAQ domain.

## Related

- (link related pages by id as the wiki grows)
