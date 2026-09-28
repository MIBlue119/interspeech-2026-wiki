---
id: kim26f_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-664
---

# ArtBoost: Synthetic Articulatory Data Augmentation for Acoustic-to-Articulatory Inversion

**TL;DR** — ArtBoost pre-trains acoustic-to-articulatory inversion models on pseudo articulatory trajectories extracted from large speech-mesh (3D facial animation) datasets, consistently improving accuracy when real EMA data is limited.

## Problem

Acoustic-to-articulatory inversion (AAI) models typically depend on electromagnetic articulography (EMA) data, which is costly to collect and available only in limited quantities.

## Method

ArtBoost extracts pseudo articulatory trajectories from visible facial anchors in large-scale speech-mesh datasets originally built for speech-driven 3D facial animation, and uses these to pre-train AAI models before fine-tuning on the smaller real EMA dataset.

## Results

ArtBoost yields consistent improvements in PCC and RMSE, trajectory analyses confirm the pseudo signals reflect physically meaningful articulatory dynamics, and gains hold stably across different AAI architectures. Project page: https://cau-irislab.github.io/Interspeech26-ArtBoost/

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving articulatory inversion for silent-speech interfaces, speech therapy visualization, and articulatory-informed speech synthesis under limited EMA data.

## Related

- (link related pages by id as the wiki grows)
