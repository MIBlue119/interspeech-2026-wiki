---
id: wang26i_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-433
---

# ES-3DF: Editable Speech-Driven 3D Face Reconstruction via Geometry Texture Disentanglement

**TL;DR** — The first framework to reconstruct editable, textured 3D faces directly from speech, by disentangling geometry from texture and aligning speech to evolving speaker prototypes to preserve identity.

## Problem

Speech-driven facial generation has mostly relied on 2D synthesis, which limits realism and downstream editability compared to a true 3D representation.

## Method

ES-3DF uses a Disentangle module that splits facial features into 3DMM geometry and UV texture maps for fine-grained editing, and a Dual-Branch Alignment module with a Class-Aware Multi-Slot Memory Bank, trained with a novel Multi-Slot InfoNCE loss, that dynamically aligns speech embeddings to diverse evolving speaker prototypes.

## Results

ES-3DF outperforms state-of-the-art baselines in geometric accuracy, identity preservation, and visual quality on extensive experiments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Realistic, editable 3D avatar generation from speech for virtual assistants, gaming, and telepresence applications.

## Related

- (link related pages by id as the wiki grows)
