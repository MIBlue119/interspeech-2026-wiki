---
id: ding26c_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1034
---

# Through-Wall Radar Speech Acquisition via Cascaded Attention Fusion

**TL;DR** — A transformer model that reconstructs intelligible speech from through-wall radar signals by recovering missing high-frequency content with cascaded attention.

## Problem

Acquiring speech through radar sensing behind barriers suffers severe bandwidth limitation, distortion, and interference, and conventional deep models struggle with long-range temporal dependencies and high-frequency recovery.

## Method

CAF-Former combines progressive spectral expansion with a cascaded attention hierarchy: multi-query self-attention models long-range temporal structure while a frequency-domain attention module fuses and recalibrates cross-frequency relations.

## Results

Achieves consistent improvements in high-frequency recovery and speech quality over transformer baselines and prior state-of-the-art models under severe signal degradation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Non-contact speech sensing for search-and-rescue, security, and through-barrier surveillance scenarios.

## Related

- (link related pages by id as the wiki grows)
