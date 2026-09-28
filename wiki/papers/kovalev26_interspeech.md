---
id: kovalev26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1480
---

# SEAM: Shortcut-Aware Real-Time Detection of Scripted vs. Spontaneous Speech for Interview Guardrails

**TL;DR** — SEAM detects whether interview speech is scripted or spontaneous in real time, and shows that without careful shortcut-prevention design, such detectors quietly learn to key off corpus and recording artifacts instead of speaking style.

## Problem

Scripted-vs-spontaneous speech detection is attractive for interview integrity guardrails, but benchmark performance can be artificially inflated by shortcuts tied to corpus identity, channel conditions, and recording artifacts rather than genuine speaking-style differences.

## Method

SEAM combines uniform preprocessing, seam-aware sampling, non-speech augmentation, and a compact DistilHuBERT backbone specifically designed to prevent shortcut learning, evaluated with 8-second windows on an external interview-domain test set.

## Results

SEAM reaches 0.971 ± 0.004 ROC-AUC on external interview data; removing its shortcut-prevention components improves internal held-out metrics but sharply hurts external performance, confirming shortcut learning was the risk; post-training quantization shrinks the model to 41.8MB with little external performance loss; code and checkpoints are released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time integrity guardrails for remote interviews, assessments, or hiring platforms that need to flag scripted or rehearsed responses.

## Related

- (link related pages by id as the wiki grows)
