---
id: miyahara26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1886
---

# Evaluating Zero-Shot Cross-Lingual Stuttering Detection Based on Self-Attention Weights of Temporal Acoustic Vector Sequence

**TL;DR** — A feature based on self-attention weights over acoustic vector sequences transfers stuttering detection across languages with zero-shot F1 reaching 77-98% of monolingual performance.

## Problem

Stuttering event detection could support speech therapy by quantifying disfluency types, but progress is limited for no- or low-resource languages since disfluency types vary acoustically across individuals and languages.

## Method

The authors propose using "self-attention weights of temporal acoustic vector sequence" (SAWF) as a language-transferable feature for stuttering detection, reasoning it is robust to linguistic differences because it captures repetitions and prolongations via similar acoustic properties regardless of language.

## Results

Zero-shot cross-lingual evaluation across three languages of stuttering speech corpora reaches F1 scores of 77-98% of monolingual performance, and SAWF-based detection matches a state-of-the-art model on language-dependent disfluency types.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Stuttering detection and speech-therapy support tools for low-resource languages lacking large stuttering speech corpora.

## Related

- (link related pages by id as the wiki grows)
