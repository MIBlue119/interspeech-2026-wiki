---
id: peng26f_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1799
---

# Cross-Lingual Speaker Verification with Self-Supervised Pre-Trained Models

**TL;DR** — Uses large self-supervised pretrained models as front-end feature extractors to build language-agnostic speaker embeddings, reaching low error rates on a dedicated cross-lingual speaker verification benchmark.

## Problem

Speaker verification accuracy degrades when enrollment and test speech are in different languages, because speaker identity becomes entangled with language-specific acoustic cues.

## Method

The authors use large-scale self-supervised pretrained models as robust front-end feature extractors, leveraging their broad acoustic/linguistic knowledge, then train a downstream speaker embedding network on these features to disentangle speaker identity from language-specific characteristics.

## Results

On the TidyVoice2026 cross-lingual benchmark, the system (team T02) achieves equal error rates of 2.21% on tv26_eval-A and 2.99% on tv26_eval-U.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual voice biometrics and authentication systems that must verify speaker identity regardless of which language is spoken.

## Related

- (link related pages by id as the wiki grows)
