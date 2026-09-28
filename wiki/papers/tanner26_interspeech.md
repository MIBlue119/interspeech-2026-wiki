---
id: tanner26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-743
---

# wav2VOT: automatic estimation of voice onset time, closure duration, and burst realisation with wav2vec2

**TL;DR** — wav2VOT fine-tunes wav2vec2 to automatically and accurately estimate voice onset time, closure duration, and burst realisation, showing large speech models can handle fine-grained phonetic annotation tasks that usually need manual correction.

## Problem

Automatic speech annotation tools are now common in phonetic research, but many tasks, including estimating voice onset time and related stop-consonant measures, still require substantial manual correction or dedicated training sets to be accurate.

## Method

The authors build wav2VOT, a tool that uses wav2vec2 to automatically estimate voice onset time, closure duration, and burst realisation, testing both zero-shot-style generalization and fine-tuning on unseen datasets.

## Results

wav2VOT performs comparably to current approaches on unseen datasets and reaches high accuracy with fine-tuning, with analysis showing high fidelity across stop voicing and place of articulation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated, high-fidelity phonetic annotation for large-scale sociophonetic and acoustic-phonetic research pipelines.

## Related

- (link related pages by id as the wiki grows)
