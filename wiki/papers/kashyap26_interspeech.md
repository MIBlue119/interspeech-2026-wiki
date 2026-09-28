---
id: kashyap26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1654
---

# Quantifying Dimensional Independence in Speech: An Information-Theoretic Framework for Disentangled Representation Learning

**TL;DR** — An information-theoretic framework directly measures how independent different acoustic feature dimensions (emotional, linguistic, pathological) are in speech, instead of inferring disentanglement indirectly from downstream task scores.

## Problem

Speech signals carry emotional, linguistic, and pathological information in the same acoustic channel, but how disentangled these dimensions actually are has usually been assessed only indirectly, through downstream task performance.

## Method

The authors combine bounded neural mutual information estimation with non-parametric validation to quantify cross-dimension statistical dependence in handcrafted acoustic features, including an attribution analysis of how much mutual information comes from source versus filter components.

## Results

Across six corpora, cross-dimension mutual information stays low with tight bounds (<0.15 nats), indicating weak coupling overall, while Source-Filter MI is much higher (0.47 nats); source components dominate for emotional dimensions (80%) while filter components dominate for linguistic (60%) and pathological (58%) dimensions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides the design of disentangled speech representation learning for emotion recognition, pathological speech analysis, and other tasks that need to isolate specific information dimensions.

## Related

- (link related pages by id as the wiki grows)
