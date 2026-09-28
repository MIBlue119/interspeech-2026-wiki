---
id: pizarro26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1361
---

# Lightweight Detection and Model Attribution of Synthetic Speech via Residual Statistical Fingerprints

**TL;DR** — A training-free method builds per-generator "fingerprints" from filtering residuals and uses Mahalanobis distance to detect and attribute synthetic speech to its source model.

## Problem

Advancing speech generation technology increases risks of impersonation, misinformation, and spoofing, motivating lightweight methods to detect synthetic speech and identify which generator produced it.

## Method

The authors compute model-specific fingerprints as the average difference between audio signals and their filtered versions (residuals), then use the Mahalanobis distance of a given audio's residual to these fingerprints to identify the source model or distinguish real from fake audio, with no training required.

## Results

Across multiple synthesis systems and languages, the approach shows strong performance on four tasks: open-world single-model attribution, closed-world multi-model attribution, real-vs-synthetic classification, and out-of-domain detection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Lightweight, deployable synthetic speech detection and source attribution for content moderation, forensics, and anti-spoofing systems.

## Related

- (link related pages by id as the wiki grows)
