---
id: dufour26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-440
pdf: https://www.isca-archive.org/interspeech_2026/dufour26_interspeech.pdf
---

# A Large-Scale Per-Speaker Analysis of Re-identification Risk in Speech Anonymization

[PDF](https://www.isca-archive.org/interspeech_2026/dufour26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dufour26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-440)

**TL;DR** — This paper investigates large-scale per-speaker re-identification risks in speech anonymization, demonstrating that individual vulnerability varies drastically and depends dynamically on the attacker, anonymizer, and available speech length rather than intrinsic speaker traits.

## Problem

Standard speech anonymization evaluations rely on average-case metrics like equal error rate, which obscure severe privacy disparities across individuals. While recent work attempts to identify vulnerable speakers using worst-case linkability metrics, these are typically aggregated over datasets and ignore how individual risk fluctuates across different attack setups. Understanding whether speaker vulnerability is an intrinsic trait or an emergent property of specific configurations is critical for designing reliable data protection guarantees.

## Method

The study conducts a large-scale evaluation using a linkability-based metric across nearly 5,000 speakers from Common Voice 11.0. It tests combinations of two neural voice conversion anonymizers (B3 and B5 from the Voice Privacy Challenge 2025) and three diverse automated speaker verification attacker architectures (ECAPA-TDNN, WavLM ECAPA, and a deep ResNet-101). Evaluations are performed using varying pool sizes of enrollment speakers (from 2 to over 22,000) and three conversation lengths ($L = 1, 3, 5$ utterances). The intersection and union of easy- and hard-to-link speaker lists are tracked across 18 distinct configurations to measure consistency using Jaccard similarity.

## Results

Experiments on LibriSpeech-trained models and Common Voice test sets reveal that WavLM ECAPA consistently outperforms other attackers, and anonymizer B3 is systematically easier to compromise than B5. While linkability distributions are heavily polarized at the speaker extremes for any single configuration, only 5 speakers remain consistently in the easy-to-link intersection across all 18 setups, and 166 remain hard-to-link. Increasing conversation length from $L = 1$ to $L = 5$ shifts most speakers from near-zero linkability to near-perfect linkability. These findings prove that speaker vulnerability is not an intrinsic, invariant property, but rather emerges from the specific interaction between the attacker, anonymizer, and data volume.

## Code

- https://github.com/OraneD/Speaker-Linkability

## Applications

Speech privacy researchers and legal compliance auditors use this framework to design more robust, worst-case evaluation protocols for voice anonymization under GDPR guidelines.

## Limitations

The singling-out privacy metric was excluded from the empirical evaluation due to a lack of available implementations at the time of writing.

## Related

- (link related pages by id as the wiki grows)
