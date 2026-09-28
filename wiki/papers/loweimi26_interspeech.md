---
id: loweimi26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-790
---

# To Be Multimodal or Not to Be: Query-Adaptive Audio-Visual Person Retrieval via Active Modality Detection

**TL;DR** — A query-adaptive audio-visual person-retrieval system that detects, via cross-modal score consistency, whether a target is actually present in both voice and face before fusing modalities, avoiding the accuracy loss caused by fusing an absent modality.

## Problem

Real-world broadcast archives (unlike curated benchmarks) often have a target person who is heard but unseen, seen but unheard, or both, and naively fusing scores from an absent modality injects noise that degrades retrieval precision below even a single-modality system.

## Method

The authors detect which modalities are actually active using cross-modal score consistency — files retrieved highly by one modality also scoring highly on the other when both are genuinely present — and train classifiers on these cross-modal features to adaptively decide whether and how to fuse modalities per query.

## Results

The modality-detection classifier reaches 89% accuracy, and on the BBC Rewind corpus (12,000+ broadcast videos) the adaptive system attains 94.2% P@1, beating speaker-only (82.9%), face-only (93.4%), and fixed fusion (90.0%), recovering 64% of the gap to an oracle with ground-truth modality labels.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Person search and retrieval in large broadcast or surveillance video archives where a target may not always be both audible and visible.

## Related

- (link related pages by id as the wiki grows)
