---
id: ding26b_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-814
pdf: https://www.isca-archive.org/interspeech_2026/ding26b_interspeech.pdf
---

# Learning to Evade: Adaptive Attacks on Audio Watermarking

[PDF](https://www.isca-archive.org/interspeech_2026/ding26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ding26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-814)

**TL;DR** — The paper introduces AWM, an adaptive audio watermark attack method that bypasses distribution-based outlier detectors with under 10% detection success while maintaining high attack success rates.

## Problem

Deep-learning-based audio watermarks are vulnerable to adversarial perturbations that remove or forge watermarks. However, defenders can detect these manipulations because watermark decoder message probabilities follow normal distributions; existing attacks drastically alter these distributions and get flagged. Attackers face the challenge of balancing attack success and audio quality while evading these statistical distribution checks using only limited target audio queries.

## Method

The proposed AWM method uses a two-stage optimization framework paired with an adaptive update strategy. The first stage optimizes attack success and evades detection, while the second stage applies a threshold-based post-processing step to refine perturbations for better audio quality. An adaptive weighting strategy prioritizes optimization on bit probabilities falling outside the estimated normal distribution range. To overcome the lack of target distribution knowledge, AWM estimates normal distribution parameters by collecting a small auxiliary set of audio samples with closely matching feature distributions.

## Results

Evaluated across two watermarking methods and three speech datasets (LibriSpeech, Common Voice, and GigaSpeech) using AudioMarkBench, AWM achieves detection success rates below 10% for replacement and creation, and 0% for removal. Under five different no-box perturbations, AWM consistently maintains high attack success rates, with most scores approaching or reaching 100%.

## Code

- https://adaptiveaudiowmattack.github.io/

## Applications

Security researchers evaluating the robustness of audio watermarking systems against adaptive adversaries attempting copyright evasion or unauthorized voice cloning attribution bypass.

## Limitations

Assumes attackers can query the watermark decoder to obtain message probabilities and collect auxiliary audio samples with matching feature distributions.

## Related

- (link related pages by id as the wiki grows)
