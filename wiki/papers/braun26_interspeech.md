---
id: braun26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2806
---

# Mitigating Scoring Errors and Compensating for Nonverbal Subtests in Speech-Based Dementia Assessment

**TL;DR** — Fusing transcript scores with Whisper embeddings lets a dementia-screening model correct scoring errors and even approximate an expert's overall rating when the test's nonverbal (motor) subtests are missing.

## Problem

Speech-based evaluation of standardized dementia screening tests can widen accessibility, but transcription errors and the omission of nonverbal subtests such as motor-skill tasks limit scoring accuracy.

## Method

The authors train models that fuse transcript-derived scores with Whisper embeddings for each verbal subtest of the German "Syndrom-Kurz-Test" to reduce scoring errors, then use these fused representations to approximate the expert's overall rating even when motor subtests are unavailable.

## Results

Despite omitting the nonverbal subtests, the models correlate strongly with expert ratings and accurately discriminate between cognitive status groups.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Remote or automated cognitive-decline and dementia screening tools that need to function without a full in-person neuropsychological test battery.

## Related

- (link related pages by id as the wiki grows)
