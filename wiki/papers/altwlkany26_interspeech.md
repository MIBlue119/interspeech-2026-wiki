---
id: altwlkany26_interspeech
category: dataset
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1436
---

# Leveraging Discriminative Capabilities of Self-Supervised Neural Audio Fingerprinting for Efficient Speech Data Annotation

**TL;DR** — Music-trained audio fingerprinting embeddings turn out to be effective tools for deduplicating and diversity-sampling speech annotation datasets, halving the data that needs labeling.

## Problem

Preparing speech data for annotation is costly, and existing methods don't efficiently remove near-duplicate samples or ensure the selected subset is acoustically diverse.

## Method

The authors repurpose self-supervised neural audio fingerprinting models (originally built for music retrieval) to detect near-duplicate speech clips and apply farthest-point sampling over the embeddings to subsample large datasets for diversity.

## Results

On industry speech data, deduplication cut the number of samples needing annotation in half, and the music-trained fingerprint embeddings captured speech acoustic properties better than a speech-specific model (WavLM) for this purpose.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech data pipeline teams can use this to cut annotation costs and avoid over-representing redundant recordings when building ASR or other training corpora.

## Related

- (link related pages by id as the wiki grows)
