---
id: nihal26_interspeech
category: dataset
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2629
---

# Ecologically-Constrained Task Arithmetic for Multi-Taxa Bioacoustic Classifiers Without Shared Data

**TL;DR** — Shows that independently fine-tuned bioacoustic encoders can be merged via simple task-vector averaging into a unified 661-species classifier, letting institutions collaborate without ever sharing raw data.

## Problem

Bioacoustic training data is scattered across taxa, regions, and institutions, and centralizing it for joint training is often infeasible due to data-sharing constraints.

## Method

Composes independently fine-tuned BEATs encoders into a unified classifier via task vector arithmetic, analyzing the geometry of the task vectors (near-orthogonality, alignment with spectral distribution distance) to explain why simple averaging works well.

## Results

Task vectors are near-orthogonal (cosine 0.01-0.09) and simple averaging is optimal, while sign-conflict resolution methods reduce accuracy; composition redistributes accuracy from species-rich to underrepresented taxa, shows zero-shot transfer to new regions, and identifies domain negation as a failure case.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving, collaborative multi-institution biodiversity monitoring where only model weights, not raw audio, are shared.

## Related

- (link related pages by id as the wiki grows)
