---
id: dufour26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-440
---

# A Large-Scale Per-Speaker Analysis of Re-identification Risk in Speech Anonymization

**TL;DR** — A large-scale study showing that speech-anonymization privacy risk varies enormously from speaker to speaker, and that no single factor predicts who is easy to re-identify.

## Problem

Speech anonymization is usually evaluated with average-case metrics like equal error rate, which can mask large per-individual disparities in re-identification risk.

## Method

Runs a per-speaker, worst-case linkability analysis across nearly 5,000 speakers, multiple anonymization systems, attacker architectures, and conversation lengths.

## Results

Linkability scores are highly polarized at the speaker level, but which speakers are easy versus hard to re-identify shifts substantially across attacker, anonymizer, and data-length configurations, showing risk emerges from their interaction rather than an intrinsic speaker trait.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informs privacy-preserving voice data release policy and evaluation protocol design for speech anonymization systems.

## Related

- (link related pages by id as the wiki grows)
