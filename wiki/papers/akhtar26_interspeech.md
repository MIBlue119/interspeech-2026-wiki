---
id: akhtar26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2704
---

# From Signals to Patterns: Non-Invasive Tuberculosis Detection from Cough Audio using Bandit Weighted Hyperbolic Prototypes

**TL;DR** — COBALT fuses spectral cough features with pretrained audio embeddings using hyperbolic prototypes and bandit-style reliability weighting, setting a new state of the art on a cough-based tuberculosis screening benchmark.

## Problem

Cough-based tuberculosis screening could enable cheap, non-invasive triage, but individual feature types (fine-grained spectral descriptors vs. high-level foundation-model embeddings) each capture only part of the relevant signal, so systems that use just one tend to underperform.

## Method

COBALT combines codebook-aligned hyperbolic prototypes with a bandit-style reliability weighting scheme to fuse heterogeneous cough representations, integrating MFCC-style spectral features with embeddings from an audio foundation model (PaSST).

## Results

On the CODA TB DREAM Challenge benchmark, COBALT consistently beats both single-representation baselines and simple concatenation, with the MFCC + PaSST fusion achieving the best overall score and a new state of the art.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-cost, non-invasive TB triage tools for resource-limited clinics, and more broadly a template for fusing spectral and foundation-model features in cough- or breath-based disease screening.

## Related

- (link related pages by id as the wiki grows)
