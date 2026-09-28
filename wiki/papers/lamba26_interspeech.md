---
id: lamba26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2382
pdf: https://www.isca-archive.org/interspeech_2026/lamba26_interspeech.pdf
---

# How Frequency Band Importance Affects Neural Network Predictions and Human Perception for Speech Quality Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/lamba26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lamba26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2382)

**TL;DR** — This paper investigates which frequency bands drive decisions in speech quality assessment models (MOSNet, DNSMOS, SCOREQ) versus human perception, revealing that both networks and humans are more sensitive to detrimental factors than beneficial ones.

## Problem

Deep learning models for automated speech quality assessment often exhibit poor correlation with human mean opinion scores (MOS), particularly on unseen data. Existing explainability research is typically restricted to a single model or explanation method without incorporating human perceptual studies, leaving the root causes of this discrepancy poorly understood.

## Method

The study applies Shapley additive explanations (SHAP), partial dependence plots (PDP), and perturbation analysis across three distinct speech quality assessment models: MOSNet (17-layer CNN, retrained for 161 frequency bands), DNSMOS (14-layer CNN), and SCOREQ (a wav2vec 2.0-based transformer finetuned with triplet loss). Input spectrograms comprise 161 frequency bands with 50 Hz widths, evaluated on a disjoint 100-sample test subset from the real-world IUCOSINE corpus. Perturbation analysis scales average magnitudes of specific frequency bands by factors ranging from 0.25 to 1000 to observe output shifts.

## Results

On the IUCOSINE test set, baseline MSE, LCC, and SRCC metrics are reported as follows: DNSMOS achieves 0.3890 MSE, 0.5248 LCC, 0.4624 SRCC; MOSNet achieves 0.2317 MSE, 0.1877 LCC, 0.6283 SRCC; SCOREQ achieves 0.1981 MSE, 0.1981 LCC, 0.6249 SRCC. The analysis demonstrates that neural networks predominantly concentrate on a narrow subset of low-frequency input bands. Both automated networks and human listeners display heightened sensitivity to acoustic degradations (detrimental factors) compared to enhancements or beneficial features.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers developing non-intrusive speech enhancement, noise suppression, or automated speech quality assessment systems can use these insights to diagnose model biases and improve human-network alignment.

## Related

- (link related pages by id as the wiki grows)
