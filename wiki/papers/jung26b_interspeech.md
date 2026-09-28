---
id: jung26b_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1198
pdf: https://www.isca-archive.org/interspeech_2026/jung26b_interspeech.pdf
---

# Hierarchical Permutation Consistency Learning for Self-Conditioned End-to-End Speaker Diarization

[PDF](https://www.isca-archive.org/interspeech_2026/jung26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jung26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1198)

**TL;DR** — This paper addresses hierarchical permutation inconsistency in self-conditioned end-to-end neural speaker diarization by introducing continuous and group-wise training objectives, achieving a Diarization Error Rate (DER) of 7.52% on CALLHOME 2-speaker scenarios.

## Problem

Self-conditioned end-to-end neural diarization iteratively feeds intermediate predictions back into subsequent layers to progressively refine speaker activity. However, standard layer-wise Permutation Invariant Training (PIT) independently resolves speaker permutations at each layer without cross-layer coordination. This layer-specific decoupling creates hierarchical permutation inconsistency, propagating permutation noise into the self-conditioning path and destabilizing training convergence.

## Method

The authors propose two alternative frameworks to replace layer-wise PIT. Group-Wise PIT enforces a rigid global constraint by tying all intermediate layers to a single shared permutation via a unified assignment optimization. Continuous Influence PIT applies a soft regularization approach, aggregating pairwise binary cross-entropy cost matrices across layers using a Gaussian weighting kernel controlled by width parameter sigma, followed by the Hungarian algorithm. The baseline architecture utilizes a non-autoregressive end-to-end neural diarization model with an 8-layer Transformer encoder, 256-dimensional embeddings, and 4 attention heads, trained on simulated conversations derived from LibriSpeech and MUSAN noise.

## Results

Evaluated on the NIST SRE 2000 CALLHOME benchmark, the proposed Continuous Influence PIT (with sigma=1.0) achieves a DER of 7.52% on 2-speaker recordings (outperforming the 8.30% baseline) and 12.52% on 3-speaker recordings (outperforming the 13.04% baseline). Ablation studies show that continuous influence successfully reduces false alarms and suppresses training volatility metrics such as adjacent switching ratio and permutation mismatch ratio compared to independent layer-wise PIT.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building robust speaker diarization and multi-speaker transcription systems for telephony or meetings.

## Related

- (link related pages by id as the wiki grows)
