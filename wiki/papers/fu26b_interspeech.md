---
id: fu26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2465
---

# Learnable Schrödinger Bridge and Activations for Efficient Diffusion-based Speech Enhancement

**TL;DR** — EffDiffSE+ replaces standard multi-step diffusion speech enhancement with a single-iteration learnable Schrödinger bridge plus architecture improvements, topping open-source diffusion baselines across nine quality metrics.

## Problem

Generative diffusion-based speech enhancement improves quality in noisy environments but its iterative sampling process incurs high inference computational cost.

## Method

The authors propose EffDiffSE+, built on a condition DNN, a bridge DNN, and a novel learnable Schrödinger bridge (SB): a single-iteration SB with Gaussian-distribution initialization for the reverse process, an auxiliary network providing learnable adaptivity to the bridge DNN's initial state estimate, and further topology improvements.

## Results

EffDiffSE+ outperforms top open-source time- and frequency-domain diffusion speech enhancement baselines across PESQ, POLQA, NISQA, UTMOS, ESTOI, LPS, SBScore, SpkSim, and subjective MOS, achieving an overall top rank.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Suited to real-time or latency-sensitive speech enhancement products that want diffusion-model quality without the usual multi-step inference cost.

## Related

- (link related pages by id as the wiki grows)
