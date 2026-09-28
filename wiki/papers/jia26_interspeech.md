---
id: jia26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1300
---

# Augmenting Dysarthric Speech Severity Assessment with MOS Supervision

**TL;DR** — Fine-tuning on human MOS-labeled speech synthesis evaluation data (rather than scarce clinical dysarthria labels) consistently improves automatic dysarthric speech intelligibility and naturalness assessment.

## Problem

Automatic assessment of dysarthric speech severity could support scalable monitoring and therapy analysis, but training such systems is bottlenecked by how little clinically annotated dysarthric speech exists.

## Method

The authors augment dysarthric speech assessment training with data from speech synthesis evaluation instead — specifically human-annotated Mean Opinion Score (MOS) labels from the QualiSpeech corpus — testing both fine-tuning on this out-of-domain data and joint training with clinical data.

## Results

Fine-tuning on speech synthesis assessment data consistently improves performance on both intelligibility and naturalness prediction for dysarthric speech, while joint training yields gains primarily on naturalness, suggesting synthesis artifacts and dysarthric speech share perceptual commonalities.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Scalable, clinically-annotation-light tools for automated dysarthric speech severity monitoring in therapy and remote patient assessment.

## Related

- (link related pages by id as the wiki grows)
