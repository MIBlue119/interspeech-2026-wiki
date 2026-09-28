---
id: toussaint26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2499
---

# Emergence of Phonetic Representations in EMG-based Silent Speech Interfaces

**TL;DR** — Silent-speech EMG systems spontaneously learn phonetic representations even without being told to, but they need an acoustic regression loss (not just contrastive self-supervision) to actually produce intelligible synthetic speech.

## Problem

It was unclear whether surface-EMG-based silent speech interfaces develop meaningful phonetic representations, and what kind of training objective is actually needed for such systems to produce intelligible synthesized speech.

## Method

The authors investigate the learned representations of an EMG-based silent speech interface trained across different tasks — speech synthesis, recognition, phone classification, and unsupervised pretraining.

## Results

Such systems develop phonetic representations even without explicit supervision; incorporating a regression loss on acoustic targets is essential for producing intelligible synthetic speech; self-supervised contrastive learning alone yields a latent space that does not measurably improve speech synthesis or phone classification.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides training-objective choices for silent-speech interfaces used in assistive communication (e.g. for people who cannot vocalize).

## Related

- (link related pages by id as the wiki grows)
