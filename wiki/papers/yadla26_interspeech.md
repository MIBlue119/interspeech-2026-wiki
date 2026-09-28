---
id: yadla26_interspeech
category: low-resource
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-284
---

# Extreme Few-Shot Phoneme Discovery for Indigenous Australian and Pacific Languages via Typological Transfer Learning

**TL;DR** — A VQ-VAE-based framework discovers phonemic units for critically endangered Indigenous Australian and Pacific languages from under one hour of audio, by transferring typological knowledge from related high-resource Austronesian languages.

## Problem

Indigenous Australian and Pacific languages face extinction and often have fewer than ten hours of transcribed speech, far below the 100+ hours conventional acoustic unit discovery methods assume is available.

## Method

The authors propose an extreme few-shot phoneme discovery framework operating on under one hour of audio, using a Vector-Quantized Variational Autoencoder and Typological Anchor Selection (TAS), which picks optimal high-resource Austronesian source languages based on phonetic inventory overlap for transfer.

## Results

Evaluated on three endangered language datasets, the approach improves Normalized Mutual Information by 18.8% and cluster purity by 15.6% over multilingual self-supervised baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Rapid language documentation and revitalization support for endangered Indigenous languages with minimal available audio data.

## Related

- (link related pages by id as the wiki grows)
