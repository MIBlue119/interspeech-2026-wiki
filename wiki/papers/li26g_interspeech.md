---
id: li26g_interspeech
category: anti-spoofing
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-582
pdf: https://www.isca-archive.org/interspeech_2026/li26g_interspeech.pdf
---

# Aleatoric Style Uncertainty Augmentation with GMM for Domain Generalization in Anti-spoofing

[PDF](https://www.isca-archive.org/interspeech_2026/li26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-582)

**TL;DR** — The paper introduces Aleatoric Style Uncertainty Augmentation (ASU), using an online Gaussian Mixture Model to improve domain generalization in speech anti-spoofing and spoofing-aware speaker verification, reducing EER on ASVspoof 5 Track 1 to 3.96%.

## Problem

Speech anti-spoofing models often fail in out-of-domain settings caused by unknown spoofing attacks, varied codecs, background noise, and distinct text-to-speech or voice conversion algorithms. Existing style augmentation methods rely on a single batch-level unimodal Gaussian assumption, which fails to capture multi-modal domain distributions present in mixed-domain mini-batches. This unimodal restriction limits class separability and overall model robustness.

## Method

The proposed ASU models within-component variability in the style space using a K-component diagonal-covariance Gaussian Mixture Model (GMM). An online EM-like update mechanism calculates soft responsibilities during the E-step and updates mixture weights, component means, and diagonal variances in mini-batches. Aleatoric uncertainty is formulated as the posterior expectation of component covariances and combined with batch-level variance via a re-parametrization trick using an augmentation weight lambda. The upstream network uses WavLM-Base (94M parameters) with multi-head factorized attentive pooling, trained with AAM-softmax and active only during training with probability p = 0.5, K = 7, and lambda = 0.9.

## Results

Evaluated on the ASVspoof 5 Track 1 open condition dataset, the WavLM-Base baseline achieved 4.99% EER and 0.141 minDCF on the evaluation set. Applying standard DSU yielded 4.77% EER, whereas the proposed ASU method reduced EER to 3.96% and minDCF to 0.108. On the development set, ASU achieved 1.15% EER and 0.025 minDCF, outperforming baseline, DSU, and CSU alternatives. Bootstrap-estimated EER distributions and 95% confidence intervals confirm statistically significant improvements over baseline and prior style augmentation techniques.

## Code

- https://github.com/happyjin/ASU

## Applications

Speech and ML engineers building secure voice biometric systems, automatic speaker verification, and spoofing countermeasures that must operate reliably under unseen acoustic conditions and diverse deepfake attacks.

## Limitations

The GMM estimation depends on stable mini-batch statistics, and excessively large values of K can lead to instability when batch sample sizes are limited.

## Related

- (link related pages by id as the wiki grows)
