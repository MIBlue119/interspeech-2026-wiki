---
id: seki26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1833
---

# Improving DF-Conformer using Hydra for high-fidelity generative speech enhancement on discrete codec token

**TL;DR** — Swaps the approximate FAVOR+ fast-attention in DF-Conformer for the exact, linear-complexity Hydra (bidirectional Mamba) mixer, improving a generative codec-token speech enhancement model.

## Problem

DF-Conformer uses FAVOR+ fast attention to avoid quadratic self-attention cost for speech enhancement, but FAVOR+'s approximation limits global sequential modeling quality.

## Method

Replaces FAVOR+ with Hydra, a bidirectional extension of Mamba framed within the structured matrix mixer framework, to eliminate FAVOR+'s approximation while keeping linear complexity in sequence length, tested within the Genhancer generative speech enhancement model on discrete codec tokens.

## Results

The Hydra-based approach surpasses the performance of the original FAVOR+-based DF-Conformer in the generative speech enhancement setting.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Higher-fidelity, efficient generative speech enhancement systems operating on discrete audio codec tokens.

## Related

- (link related pages by id as the wiki grows)
