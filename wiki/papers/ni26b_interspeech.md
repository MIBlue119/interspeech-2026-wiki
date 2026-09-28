---
id: ni26b_interspeech
category: source-separation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2291
---

# DTT-BSR+: A Generative-Regression Cascade for Music Source Restoration

**TL;DR** — A two-stage cascade that decouples generative source separation from a regression-based refinement stage improves music source restoration signal accuracy across all stems, surpassing the prior state-of-the-art system on five stems.

## Problem

Music source restoration requires jointly solving source unmixing and inverting non-linear production effects, but current methods struggle to achieve accurate target reconstruction while maintaining semantic consistency.

## Method

DTT-BSR+ decouples distribution fitting from signal reconstruction into two stages: a generative DTT-BSR separator produces stems matching the prior of clean sources, then a modified Demucs network refines the first-stage output using time-domain and multi-resolution spectral losses.

## Results

DTT-BSR+ improves multi-mel signal-to-noise ratio (MMSNR) over the single-stage DTT-BSR across all stems and surpasses the state-of-the-art X-LANCE MSR system on five stems, and Fréchet Audio Distance decomposition reveals a trade-off between reconstruction accuracy and semantic distribution fitting.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to music production and remastering workflows that need to restore clean, individual instrument stems from processed or mixed recordings.

## Related

- (link related pages by id as the wiki grows)
