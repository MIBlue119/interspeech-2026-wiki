---
id: rautenberg26_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1341
pdf: https://www.isca-archive.org/interspeech_2026/rautenberg26_interspeech.pdf
---

# Hierarchical Conditional Continuous Normalizing Flows for Creaky Voice Editing under Speaker Identity Preservation

[PDF](https://www.isca-archive.org/interspeech_2026/rautenberg26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rautenberg26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1341)

**TL;DR** — A hierarchical conditional continuous normalizing flow architecture is proposed for voice editing that structurally disentangles speaker identity from paralinguistic voice qualities, successfully modifying creak probability while better preserving pitch, gender, and speaker similarity.

## Problem

Modifying specific perceptual voice qualities (PVQs) like creak in deep generative models often unintentionally alters correlated high-level speaker attributes such as pitch and gender due to inter-speaker training data correlations. This entanglement leads to a degradation in perceived speaker identity. While data augmentation can mitigate specific correlations like pitch-creak coupling, a general architectural solution for structured factorization and feature disentanglement is missing.

## Method

The paper introduces a two-stage conditional continuous normalizing flow (CCNF) where the transformation is decomposed into sequential ordinary differential equation (ODE) solves conditioned on subsets of attributes. The first stage conditions on high-level attributes (mean pitch and gender) and maps the speaker representation to an intermediate latent space, while the second stage conditions on low-level voice qualities (breathiness, roughness, creak). Domain adversarial training (DAT) with a gradient reversal layer is applied to the intermediate latent representation to enforce invariance to high-level attributes. The framework uses YourTTS as the speech synthesis backbone, with hidden dimensions of 128 for the first stage and 64 for the second stage flow blocks.

## Results

Evaluated on the LibriTTS-R dataset using 4,000 test utterances across manipulation strengths β from -1.25 to 1.25, comparing against base-flow, extended base-flow, and data-modified flow baselines. The hierarchical model achieved significantly more stable behavior, maintaining high gender accuracy (near 100%) and lower equal error rates (EER) under varying creak manipulations. In subjective listening tests with 11 voice quality experts, the hierarchical model showed no significant drop in naturalness (MOS) during creak suppression and exhibited a significantly smaller drop in speaker similarity (SMOS) compared to the base model, particularly in amplification conditions (p < 0.001).

## Code

- https://github.com/pvq-manipulation

## Applications

Speech synthesis systems requiring fine-grained paralinguistic voice editing, and educational tools such as generating controlled speech samples to train speech therapists.

## Limitations

Creak suppression in the hierarchical model did not yield a statistically significant change in perceived creakiness in subjective tests, partly due to lower baseline creak scores in unmanipulated samples.

## Related

- (link related pages by id as the wiki grows)
