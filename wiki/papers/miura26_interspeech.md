---
id: miura26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3096
pdf: https://www.isca-archive.org/interspeech_2026/miura26_interspeech.pdf
---

# Profiling Speech Rate Abilities of Visually Impaired Screen Reader Users by Bayesian Item Response Theory

[PDF](https://www.isca-archive.org/interspeech_2026/miura26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/miura26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3096)

**TL;DR** — This study introduces the first item response theory (IRT) framework to evaluate text-to-speech speech rates (150–500 WPM) for visually impaired screen reader users, finding substantial individual ability variation (SD = 0.91–1.10) that outweighs speed-induced difficulty changes.

## Problem

Traditional screen reader evaluation relies on aggregate accuracy metrics that conflate item difficulty with individual comprehension capacity, making it difficult to personalize text-to-speech settings. Furthermore, existing research predominantly targets English rather than mora-based languages like Japanese, and standard IRT requires large sample sizes that are impractical for specialized user populations. This gap prevents evidence-based, individualized speech rate configurations for visually impaired users.

## Method

The authors propose a Bayesian item response theory framework utilizing cumulative probit models for ordinal measures and beta regression for continuous accuracy metrics, combined with weakly informative priors to ensure parameter stability with small cohorts. The evaluation dataset comprises 42 phonemically balanced Japanese sentences from the ITA corpus synthesized at five distinct rates (150, 225, 300, 400, and 500 WPM) using the macOS Kyoko voice. Eleven Japanese visually impaired screen reader users (six totally blind, five low vision) participated, generating 2,310 effective responses across accuracy, comprehensibility, and listenability measures. Models were estimated using Hamiltonian Monte Carlo sampling via brms in R with four chains of 4,000 iterations.

## Results

All Bayesian models converged successfully with a maximum R-hat of 1.004. Person abilities varied widely across measures (comprehensibility SD = 0.91, listenability SD = 1.10, accuracy SD = 0.38), exceeding the variation caused by speech rate increases. Comprehensibility showed marked drops relative to the 150 WPM baseline at 300, 400, and 500 WPM (fixed effect beta ranging from -1.23 to -2.00), whereas 225 WPM showed no significant change. Bayesian regression confirmed that both visual impairment status and prior listening speed experience independently predicted comprehension outcomes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers designing text-to-speech systems and screen readers can use this framework to build adaptive testing tools and personalize speech rate configurations for visually impaired users.

## Limitations

The study relies on a small sample size of eleven participants and a single female Japanese voice, necessitating large-scale replication with broader user cohorts.

## Related

- (link related pages by id as the wiki grows)
