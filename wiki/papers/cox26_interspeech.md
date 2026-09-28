---
id: cox26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2542
---

# Learning task-specific subspaces via interventional post-training of speech foundation models

**TL;DR** — A lightweight post-training method that untangles speaker identity from linguistic content inside pretrained speech foundation model representations, without retraining from scratch.

## Problem

Speech foundation model representations mix speaker, content, and other factors together in a distributed way, but downstream tasks like verification or keyword spotting only need part of that information.

## Method

Applies a post-training refinement using interventional contrastive learning: an interventional dataset and multi-part contrastive loss learn a transformation that splits the entangled representation into separate content and speaker subspaces.

## Results

Improves out-of-domain speaker verification performance and shows evidence that speaker and content information are cleanly separated across the learned subspaces.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Fine-tuning-free adaptation of speech foundation models for speaker verification and keyword-spotting pipelines.

## Related

- (link related pages by id as the wiki grows)
