---
id: liyanarachchi26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1131
---

# Paediatric-HGNN: A Hybrid Heterogeneous Graph Neural Network for Detecting Disfluency in Children's Speech via Multiscale Acoustic Fusion

**TL;DR** — Modeling children's speech as a heterogeneous graph of word and acoustic-frame nodes, rather than as a plain 1D signal, improves automated stuttering detection in pediatric speech and better captures developmental "searching" behavior.

## Problem

Automated stuttering detection struggles with children's speech because of high acoustic variability in developing voices and the subtle distinction between pathological stuttering and typical developmental disfluencies.

## Method

Paediatric-HGNN uses a Context-aware Part-whole Interaction Network (CaPIN) that builds a heterogeneous graph capturing hierarchical relationships between lexical units (word nodes) and fine-grained acoustic segments (frame nodes), instead of modeling the signal as a conventional 1D sequence.

## Results

Trained on the UCLASS and FluencyBank pediatric corpora, Paediatric-HGNN reaches 82.4% weighted accuracy and a Typical Disfluency F1-score of 0.386, and the hierarchical lexical-acoustic modeling captures developmental searching behavior for more interpretable results.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Early clinical screening and intervention tools for childhood stuttering and other developmental speech disfluencies.

## Related

- (link related pages by id as the wiki grows)
