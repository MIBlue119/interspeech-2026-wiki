---
id: dufour26_interspeech
category: speech-anonymization
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-440
pdf: https://www.isca-archive.org/interspeech_2026/dufour26_interspeech.pdf
---

# A Large-Scale Per-Speaker Analysis of Re-identification Risk in Speech Anonymization

*Orane Dufour, Paul Magron, Mickael Rouvier, Emmanuel Vincent*

[PDF](https://www.isca-archive.org/interspeech_2026/dufour26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dufour26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-440)

**TL;DR** — This paper conducts a large-scale per-speaker privacy analysis of speech anonymization across nearly 5,000 speakers, demonstrating that re-identification risk is not an intrinsic speaker property but emerges from the interaction between the attacker, the anonymizer, and available speech length.

## Key contributions

- Performs a large-scale per-speaker privacy analysis on 4,949 evaluation speakers, moving beyond traditional population-average EER and small-set VPC evaluations.
- Systematically evaluates linkability across 18 distinct configurations combining 3 ASV attacker architectures, 2 neural voice conversion anonymizers, and 3 conversation lengths.
- Shows that speaker linkability scores are highly polarized into easy- and hard-to-link groups, but the specific identities within these groups shift drastically across configurations (only 5 speakers are universally easy-to-link).
- Uses Jaccard similarity analysis to quantify that anonymization systems and conversation lengths have a stronger impact on vulnerability shifts than the underlying ASV attacker architecture.

## Problem

Speech anonymization is traditionally evaluated using average-case metrics like equal error rate (EER), which obscures massive individual disparities and hides high re-identification risks for vulnerable subsets of users. Prior individual-level studies were restricted to tiny test sets (e.g., the 40 speakers in the Voice Privacy Challenge) or relied on rigid demographic label-based subgrouping (gender, dialect) that overlooked unknown risk factors. This matters because privacy protection must guarantee safety for all users individually rather than just meeting population-level averages, necessitating a worst-case, linkability-driven per-speaker evaluation protocol.

## Method

The paper formulates privacy evaluation through a linkability-based metric under a worst-case threat model. The evaluation pool scales across 11 enrollment sizes ranging from $N = 21$ up to $N = 22,024$ speakers, with 5 random draws per test speaker to stabilize variance. Conversation lengths are tested at $L = 1, 3,$ and $5$ utterances per test speaker to evaluate how acoustic context alters re-identification risk.

Two baseline neural voice conversion anonymizers from VPC 2025 are evaluated: B3 (which uses explicit phonetic transcripts and GAN pseudo-speaker embeddings) and B5 (which uses wav2vec 2.0 vector-quantized bottleneck features and a HiFi-GAN vocoder). Anonymization is strictly applied at the utterance level with randomized target speakers to prevent source-target memorization artifacts. Three semi-informed ASV attackers are deployed: ECAPA-TDNN, WavLM-ECAPA, and a deep ResNet-101.

Speaker score distributions are generated for all 18 configurations. Speakers are categorized into easy-to-link and hard-to-link lists based on the 3rd and 1st quartiles (Q3 and Q1). Jaccard similarities are computed between these lists when varying individual factors (attacker, anonymizer, or conversation length) to isolate their relative impacts on individual vulnerability.

## Experimental setup

The study uses LibriSpeech (train-clean-360, 921 speakers, 360 hours) to train the ASV attacker models. Evaluation is performed on Common Voice 11.0 English, split into enrollment set A (22,024 speakers, 323 hours) and trial set B (4,949 speakers, 1,409 hours). Attackers include ECAPA-TDNN, WavLM-ECAPA, and ResNet-101 trained in a semi-informed setting matching the target anonymization system. Metrics include linkability probabilities across varying enrollment pool sizes $N$ and conversation lengths $L$, alongside Jaccard similarity coefficients.

## Results

Linkability distributions are highly polarized across all 18 configurations: most speakers cluster near 0 linkability when $L=1$, whereas nearly all speakers reach a linkability of 1 when $L=5$, demonstrating that longer conversation lengths severely compromise anonymity. WavLM-ECAPA consistently proves to be the strongest attacker, and B3 is systematically easier to attack than B5.

Despite the polarized distributions, intersection analysis reveals that only 5 speakers are consistently easy-to-link and 166 are consistently hard-to-link across all 18 configurations. Conversely, union sets show that 86.9% of speakers are considered easy-to-link in at least one configuration, and 92.4% are hard-to-link at least once. Jaccard similarity comparisons show that the attacker architecture has the highest stability (mean Jaccard ~0.39 to 0.47), while the anonymizer and conversation length exert a much stronger and comparable disruptive impact on individual vulnerability rankings.

| System / Condition | Easy-to-link Intersection | Hard-to-link Intersection | Easy-to-link Union | Hard-to-link Union |
|---|---|---|---|---|
| Across all 18 configurations (4,949 speakers) | 5 speakers | 166 speakers | 4,300 speakers (86.9%) | 4,574 speakers (92.4%) |

## Limitations

The study evaluates English speech exclusively via LibriSpeech and Common Voice datasets, leaving cross-lingual and accent-based robustness unverified. Only two neural anonymization systems and three ASV attacker architectures were fully detailed, excluding potential win-rate variations from state-of-the-art systems lacking public implementations. Furthermore, the analysis relies on empirical score-based trials rather than providing a closed-form a priori predictive risk estimator.

## Why read this

Speech researchers and privacy engineers building robust voice anonymization systems should read this to understand why population-level EER metrics fail and why individual privacy risks are entirely context-dependent on attack configurations.

## Code

- https://github.com/OraneD/Speaker-Linkability

## Applications

Benchmarking and auditing voice privacy protection tools for compliance with data protection regulations such as GDPR.

## Related

- (link related pages by id as the wiki grows)
