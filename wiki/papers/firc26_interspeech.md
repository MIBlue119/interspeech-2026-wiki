---
id: firc26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-120
---

# The Hidden Cost of Pairwise Verification in Synthetic Speech Source Tracing

**TL;DR** — An empirical comparison showing that framing "which model generated this fake speech" as pairwise verification actually hurts accuracy compared to simple global classification, because it collapses useful embedding dimensions.

## Problem

Open-set source tracing of synthetic speech, identifying which generator produced a sample, is increasingly framed as a biometric-style pairwise verification problem, but it is unclear whether that framing actually helps.

## Method

Compares global anchoring (classification-style) against pairwise verification objectives under matched backbones, data, and epoch budgets on MLAAD (in-domain) and STOPA (out-of-domain), including an embedding-space (k99) analysis.

## Results

Global anchoring yields lower in-domain error (8.61% EER) than pairwise variants (12-15% EER) even with rival mining and finetuning; pairwise objectives concentrate variance into fewer embedding directions, and a dimensionality-matched control shows the gap isn't explained by dimensionality alone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides model and objective choice for forensic tools that trace synthetic speech back to its generating system.

## Related

- (link related pages by id as the wiki grows)
