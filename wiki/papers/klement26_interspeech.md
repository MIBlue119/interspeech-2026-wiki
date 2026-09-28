---
id: klement26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2511
---

# Analysing Adversarial Priors for Data-driven Unsupervised Speech Enhancement

**TL;DR** — Shows that GAN-based unsupervised speech enhancement leaks speech into the estimated noise unless it is given noise priors that match the target environment, and that a dual-branch model fixes this using easily collected environment noise.

## Problem

Unsupervised GAN-based speech enhancement avoids needing paired clean/noisy data, but existing single-branch models often leak speech content into the noise estimate due to a dominant consistency loss or a weak clean-speech prior.

## Method

The authors analyze how different prior data choices affect a dual-branch GAN framework that explicitly models both clean speech and noise, testing how well the priors are matched to the deployment domain.

## Results

Mismatched priors increase speech-noise leakage, while using noise prior data specifically aligned with the target environment (which is easy to collect in practice) substantially reduces leakage, prevents over-suppression of speech, and improves perceptual quality.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Unsupervised speech enhancement for domains lacking paired training data, using easily gathered environment-specific noise recordings to improve deployment robustness.

## Related

- (link related pages by id as the wiki grows)
