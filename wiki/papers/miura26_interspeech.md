---
id: miura26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3096
pdf: https://www.isca-archive.org/interspeech_2026/miura26_interspeech.pdf
---

# Profiling Speech Rate Abilities of Visually Impaired Screen Reader Users by Bayesian Item Response Theory

*Takahiro Miura, Masatsugu Sakajiri, Masaki Matsuo, Keiichi Yasu, Junji Onishi, Ken-ichiro Yabu, Tohru Ifukube*

[PDF](https://www.isca-archive.org/interspeech_2026/miura26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/miura26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3096)

**TL;DR** — This paper introduces the first Bayesian Item Response Theory (IRT) framework to evaluate text-to-speech (TTS) comprehension across extreme speech rates (150–500 WPM) for Japanese visually impaired screen reader users. It reveals that individual ability variations and visual impairment status (total blindness vs. low-vision) dominate speech rate tolerance, exceeding speed-induced difficulty changes.

## Key contributions

- Establishes the first psychometric evaluation framework using Bayesian IRT to separate item difficulty and person ability for speech rate comprehension.
- Quantifies comprehension thresholds across 150–500 WPM using phonemically balanced sentences from the ITA corpus among 11 visually impaired users.
- Uncovers an independent performance advantage for totally blind users over low-vision peers, even after controlling for listening speed experience.
- Demonstrates that weakly informative Bayesian priors yield stable parameter estimation (max R-hat = 1.004) under severe small-sample constraints (N=11).

## Problem

Screen readers are vital for digital access, but optimal speech rates remain poorly understood, especially for non-English, mora-based languages like Japanese. Current systems rely on manual, one-size-fits-all configurations (150–180 WPM) that underutilize experienced users' capabilities of up to 400–500 WPM. Existing evaluation methods use simple accuracy measures that dangerously conflate item difficulty and individual user ability, hiding whether poor performance stems from overly fast audio or low user proficiency.

## Method

The study analyzes 42 phonemically balanced Japanese sentences from the ITA corpus categorized into short (8–18 chars), medium (21–30 chars), and long (45–66 chars) lengths. Each sentence was synthesized at five speeds (150, 225, 300, 400, and 500 WPM) using macOS say with the Kyoko voice, generating 210 unique audio stimuli. Eleven visually impaired participants provided 2,310 valid responses across three repetitions, measuring mora-level comprehension accuracy (0–100%), comprehensibility (1–7 Likert), and listenability (1–7 Likert).

Three Bayesian models were estimated via Hamiltonian Monte Carlo sampling using the brms package in R (4 chains, 4,000 iterations, 2,000 warmup): Bayesian cumulative probit models for the 1–7 ordinal ratings (graded response model analogues) and Bayesian beta regression for bounded 0–100% accuracy scores. Models incorporated random effects for person abilities and item difficulties, alongside fixed effects for speech rate conditions and sentence length. Weakly informative priors—such as normal(0, 2) for thresholds, normal(0, 1) for random effect SDs, and normal(0, 0.5) for fixed effects—were chosen to regularize parameter estimates, prevent overfitting, and explicitly quantify posterior uncertainty given the small sample size.

## Experimental setup

Evaluated on 11 Japanese visually impaired participants (6 totally blind, 5 low vision; mean age 38.2 years, 8.6 years screen reader experience) using a web-based interface. The effective dataset contained 2,310 trials from 42 ITA corpus sentences synthesized at 5 speeds. Evaluation metrics included posterior mean ability estimates (theta), 95% credible intervals, R-hat convergence diagnostics, and Bayesian regression coefficients.

## Results

All Bayesian models converged successfully (max R-hat = 1.004, effective sample sizes > 1,000). Comprehensibility showed negligible change at 225 WPM (beta = -0.17, 95% CI [-0.49, 0.16]) but dropped significantly at 300, 400, and 500 WPM (beta = -1.23 to -2.00). Individual ability variance (SD = 0.91–1.10) exceeded speed-induced variation, pointing to massive inter-user differences. Totally blind users exhibited substantially higher abilities across all metrics compared to low-vision peers (e.g., comprehensibility theta 0.54 vs. 0.09). Bayesian regression showed that blindness status (beta = 7.73 [2.71, 12.57]) and listening speed experience (beta = 5.46 [1.97, 9.00]) independently predicted comprehension accuracy.

| Measure | 150 WPM | 300 WPM | 500 WPM |
|---|---|---|---|
| Comprehension Accuracy (%) | 99.4 (5.5) | 90.7 (19.8) | 74.0 (61.3) |
| Comprehensibility (1-7) | 6.93 (0.45) | 6.23 (1.24) | 5.10 (2.18) |
| Listenability (1-7) | 6.29 (1.27) | 5.80 (1.47) | 4.81 (2.22) |

## Limitations

The primary limitation is the small sample size (N=11), resulting in wide credible intervals (mean width 1.29) and insufficient statistical power to reliably test interaction effects like speed-by-length. All participants were highly experienced users (mean 8.6 years), potentially overestimating general population speed tolerance. Additionally, ITA corpus sentences lack naturalistic conversational context, and subjective ratings exhibited high redundancy (r = 0.91 between comprehensibility and listenability).

## Why read this

Speech and accessibility researchers should read this to learn how Bayesian IRT can successfully decouple user ability from item difficulty in small-sample specialized user studies, providing a robust foundation for personalized TTS configurations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Personalized screen reader speed configuration, adaptive Text-to-Speech evaluation tools, and accessibility software optimization for visually impaired users.

## Related

- (link related pages by id as the wiki grows)
