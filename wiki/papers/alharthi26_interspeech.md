---
id: alharthi26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-395
pdf: https://www.isca-archive.org/interspeech_2026/alharthi26_interspeech.pdf
---

# RIVET: Robust Idempotent Voice Attribute Editing

[PDF](https://www.isca-archive.org/interspeech_2026/alharthi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alharthi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-395)

**TL;DR** — RIVET introduces an idempotent training framework for voice attribute editing that regularizes models against noisy metadata labels, improving speaker identity preservation and editing success rates.

## Problem

Large-scale speech datasets frequently contain noisy, inconsistent, or automatically inferred demographic annotations for attributes like age and gender. When conditional generative models are trained on these imprecise labels, they memorize spurious correlations, leading to unstable edits, identity drift, and entanglement between speaker identity and target attributes.

## Method

The framework utilizes an ECAPA-TDNN speaker encoder, a conditional normalizing flow for attribute manipulation, and a VITS-based speech generator, trained jointly end-to-end. To combat label noise, RIVET enforces an idempotency constraint in the latent representation space by penalizing differences between the initial speaker encoding and the re-encoded representation after speech synthesis. A stop-gradient operator is applied to the first latent vector to treat it as a fixed target and prevent trivial co-adaptation. Auxiliary classification losses for age and gender are incorporated into the speaker encoder alongside standard VITS generator losses and maximum likelihood flow objectives.

## Results

Evaluated on the GLOBE dataset and the EARS dataset with synthetic label noise, RIVET is compared against a baseline model lacking the idempotency regularization. On the GLOBE dataset, RIVET achieves higher Titanet speaker embedding cosine similarity to original speech (0.66 average vs. 0.63 baseline) and superior attribute classification accuracy (85.9% vs. 77.2% average), while maintaining comparable naturalness (UTMOS ~3.97) and intelligibility (WER ~2.72%). Multi-round reconstruction experiments across 20 iterations demonstrate that RIVET successfully prevents the rapid identity drift observed in standard baselines.

## Code

- https://github.com/DareenHarthi/rivet

## Applications

Speech and machine learning engineers developing zero-shot voice conversion, accent conversion, and voice aging systems that require robust attribute modification under imperfect metadata.

## Limitations

Evaluated specifically on age and gender attributes, though the framework itself is designed to be model-agnostic.

## Related

- (link related pages by id as the wiki grows)
