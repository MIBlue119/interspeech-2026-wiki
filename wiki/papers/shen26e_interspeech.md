---
id: shen26e_interspeech
category: source-separation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3139
---

# Adaptive Hard-Pair Sampling via Curriculum Learning for Speech Separation

**TL;DR** — Deliberately training more on speaker pairs with similar timbre, chosen via an online difficulty matrix, improves speech separation on exactly the hardest cases without added training cost.

## Problem

End-to-end neural speech separation systems achieve strong average SI-SDR scores but still struggle when mixed speakers have highly similar timbre, hurting robustness and real-world generalization.

## Method

The authors build a pairwise speaker-speaker difficulty matrix, updated online based on each pair's separation SI-SDR, and construct each training mixture by sampling an anchor speaker and then choosing the interference speaker via a temperature-controlled softmax that favors speakers the matrix marks as difficult to separate from the anchor.

## Results

On Libri2Mix, the curriculum hard-pair sampling strategy consistently improves performance, especially for similar-timbre mixtures, without additional training overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving speech separation robustness for real-world scenarios with acoustically similar speakers, such as same-gender or same-family conversations.

## Related

- (link related pages by id as the wiki grows)
