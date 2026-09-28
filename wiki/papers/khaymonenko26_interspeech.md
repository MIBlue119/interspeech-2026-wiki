---
id: khaymonenko26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-987
---

# Scalable Keyword Spotting via Modular Network Expansion

**TL;DR** — A parameter-capped modular expansion method lets an on-device keyword spotting model learn new keywords after deployment, without the original training data and without hurting accuracy on keywords already shipped.

## Problem

On-device keyword spotting models often need new keywords added after deployment, but this is difficult when the original training data is unavailable and any regression on existing triggers is unacceptable.

## Method

The base network — including batch-normalization statistics and the core classifier — is frozen, and only a lightweight expansion branch with a separate head for new keywords is trained, preserving the core logits, shipped outputs, and thresholds for existing keywords.

## Results

At a fixed operating point the method cuts new-keyword false reject rate from 6.46% to 4.37% versus a parameter-matched separate-model baseline, and it beats adapter and LoRA parameter-efficient tuning baselines while using fewer MACs (16.34M vs. 18.45M/20.52M) under the same added-parameter budget (≤10k).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Updating deployed voice-trigger products with new custom keywords post-launch without retraining from scratch or risking regressions on existing wake words.

## Related

- (link related pages by id as the wiki grows)
