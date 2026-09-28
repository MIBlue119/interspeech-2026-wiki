---
id: barreiros26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1444
---

# Massive Open-Vocabulary Keyword Spotting

**TL;DR** — A keyword-spotting system whose stored features take up to 128× less memory than a comparable baseline, letting contextual biasing scale from a few hundred glossary terms to massive databases — without fine-tuning the underlying ASR model.

## Problem

ASR systems transcribe rare, specialized terminology poorly. Open-vocabulary keyword spotting plus contextual biasing mitigates this, but existing systems become an infeasible bottleneck beyond glossaries of a few hundred terms.

## Method

Compresses the stored keyword features aggressively (up to 128× smaller memory footprint than a comparable baseline) so the biasing database can grow massively while staying open-vocabulary. Works on top of an unmodified ASR model.

## Results

Entity recall comparable to uncompressed solutions, including on languages unseen during training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Domain glossaries at production scale: medical/legal terminology, product catalogs, contact-name biasing on device.

## Related

- (add links to related pages by id, e.g. `someid26_interspeech`, as the wiki grows)
