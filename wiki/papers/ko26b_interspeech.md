---
id: ko26b_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3243
---

# SCOLoRA: Similarity Conditioned Signed Orthogonal LoRA for Continual Speaker Adaptation

**TL;DR** — SCOLoRA uses speaker embedding similarity to dynamically balance subspace sharing vs. separation in LoRA-based continual speaker adaptation, improving new-speaker adaptation while reducing catastrophic forgetting in ASR.

## Problem

Deployed ASR systems face continual speaker and environment shifts, and while orthogonal LoRA (O-LoRA) reduces catastrophic forgetting by separating update subspaces for continual speaker adaptation, enforcing task-agnostic separation can suppress useful transfer between acoustically similar speakers.

## Method

SCOLoRA (Similarity Conditioned Signed Orthogonal LoRA) leverages speaker-embedding similarity to dynamically balance subspace alignment against orthogonal separation via signed coefficients, allowing similar speakers to share more of the adaptation subspace while dissimilar speakers stay separated.

## Results

Across ASR benchmarks, SCOLoRA consistently improves adaptation to new speakers and reduces forgetting of previously learned speakers compared to LoRA-based continual learning baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device or server-side ASR personalization pipelines that must adapt to a continual stream of new speakers without forgetting previously adapted ones.

## Related

- (link related pages by id as the wiki grows)
