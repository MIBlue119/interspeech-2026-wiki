---
id: banerasroux26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3383
---

# Closing the Speech-Text Gap with Limited Audio for Effective Domain Adaptation in LLM-Based ASR

**TL;DR** — Mixing a small amount of real speech (as little as 10%, under 4 hours) into text-only domain adaptation for LLM-based ASR matches or beats fine-tuning on the full paired dataset.

## Problem

LLM-based ASR connects a speech encoder to an LLM via a projector, which allows text-only domain adaptation, but this creates a modality gap because the LLM never sees the noisy representations the speech projector actually produces at inference time.

## Method

The authors compare text-only adaptation, paired speech-text adaptation, and a mixed-batching strategy that combines both, testing how much real speech is needed to close the modality gap in in-domain and out-of-domain settings.

## Results

Even limited amounts of speech consistently improve performance, and mixed batching with only 10% of target-domain speech (under 4 hours) achieves word error rates comparable to or better than conventional fine-tuning on the full dataset.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient domain adaptation for LLM-based ASR systems (e.g., contact-center or enterprise deployments) where collecting large amounts of paired speech-text data is expensive.

## Related

- (link related pages by id as the wiki grows)
