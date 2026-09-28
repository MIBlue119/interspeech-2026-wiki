---
id: rahman26b_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.pdf
---

# Voice Privacy from an Attribute-based Perspective

*Mehtab Ur Rahman, Martha Larson, Cristian Tejedor-Garcia*

[PDF](https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rahman26b_interspeech.html)

**TL;DR** — This paper introduces an attribute-based perspective to voice privacy by evaluating speaker uniqueness and re-identification risks using categorical profiles (gender, age, accent, profession) rather than traditional signal-level comparisons. It demonstrates that imperfect attribute inference on anonymized speech does not reliably protect privacy, yielding re-identification error rates between 0.58 and 0.82 depending on the anonymization system.

## Key contributions

- Formulates a voice privacy evaluation framework based on speaker attribute profiles and uniqueness metrics ($k$-anonymity) rather than signal-to-signal metrics like EER.
- Implements a single-utterance re-identification attack matching target attribute profiles to multi-utterance reference speaker profiles.
- Releases an extended annotation set for four speaker attributes (gender, age, accent, profession) covering 118 test speakers and the development set of VoxCeleb2.
- Demonstrates that attribute inference errors do not uniformly improve privacy; classifier errors can actually increase individual speaker uniqueness and facilitate attacks via correlated errors.

## Problem

Current voice privacy benchmarks, such as the Voice Privacy Challenge (VPC), rely exclusively on signal-to-signal comparisons (e.g., Equal Error Rate) to evaluate anonymity. This overlooks attribute-based risks, where adversaries leverage categorical profile data—such as gender, age, accent, and profession—to single out individuals, as recognized in broader data protection frameworks like the GDPR. Because standard anonymization algorithms are not explicitly designed to hide higher-level demographic and socio-economic attributes, it remains unclear whether inference errors introduced by imperfect classifiers offer genuine privacy protection.

## Method

The framework models speaker profiles using four categorical attributes: binary gender (2 levels), age bucketized into 3 levels, accent approximated via nationality mapping into 29 levels, and profession mapped into 6 categories. To extract these profiles, the authors utilize a pretrained ECAPA-TDNN encoder mapping speech utterances to 192-dimensional normalized embeddings. Lightweight multi-layer perceptrons (MLPs) are trained on these embeddings: the gender classifier uses a single hidden layer with ReLU activation, while age, accent, and profession use two hidden layers with LeakyReLU activations and cross-entropy objectives.

Attribute inference is performed independently per utterance by selecting the class with the highest posterior probability, and aggregated for speaker-level profiles by averaging post-test posteriors across multiple utterances. The evaluation defines speaker uniqueness via $k$-anonymity equivalence classes, where $k$ represents the size of the identical attribute profile subset, with $k=1$ indicating total uniqueness. A re-identification attack matches a target speaker profile (derived from a single utterance, original or anonymized) against multi-utterance reference speaker profiles of known identity, measuring success via an absolute error rate.

## Experimental setup

Experiments use the VoxCeleb2 dataset, utilizing the dev set (5,994 speakers, 1,092,009 utterances) to train classifiers, and the test subset (118 speakers, 36,237 utterances) for evaluation. Two evaluation partitions are formed: MultiEval (72 speakers, 24,588 utterances) for speaker-level profiles, and SingleEval (72 speakers, evaluated across 10 random re-samplings) for utterance-level experiments. Anonymized conditions utilize VPC 2024 baselines: McAdams (B2), STTTS (B3), NAC (B4), and ASRBN (B5). Baselines include ground-truth attributes and weighted random classifiers.

## Results

Speaker-level attribute inference on original data achieves accuracies of 0.99 for gender, 0.83 for age, 0.75 for accent, and 0.60 for profession. When evaluating speaker uniqueness on MultiEval, ground-truth profiles yield 38.9% unique speakers ($k=1$) with a median $k$ of 2, whereas inferred attributes yield 31.9% unique speakers with a median $k$ of 3, showing that inference noise shifts the distribution but fails to protect 20.4% of speakers whose $k$-anonymity decreases. In the re-identification attack using original target speech, the error rate is 0.72 when matched against ground-truth references and drops to 0.67 when matched against inferred references due to correlated classifier errors. When target speech is anonymized, attack error rates vary widely: McAdams yields 0.78 (vs inferred reference), STTTS yields 0.82, NAC yields 0.71, and ASRBN yields 0.82, demonstrating that low classification accuracies on anonymized speech do not translate to robust protection against profile-based re-identification.

| Target Profile / System | Ref: Ground Truth | Ref: Inferred Original | Median $k$ (Inferred) |
| :--- | :--- | :--- | :--- |
| Original (Unprotected) | 0.72 | 0.67 | 3 |
| McAdams (B2) | 0.76 | 0.78 | - |
| STTTS (B3) | 0.62 | 0.82 | - |
| NAC (B4) | 0.70 | 0.71 | - |
| ASRBN (B5) | 0.58 | 0.82 | - |

## Limitations

The study is bounded by the availability of fully annotated attributes, restricting evaluation to 72 speakers out of the VoxCeleb2 test set. The dataset relies on scraped metadata proxies for age, accent, and profession which may contain noise. The threat model assumes the attacker uses classifiers trained on unprotected speech rather than adapting to the specific anonymization systems, and does not evaluate partial attribute matching strategies.

## Why read this

Speech researchers and privacy engineers should read this paper to understand the limitations of current signal-level voice anonymization benchmarks against attribute-based profile matching and singling-out attacks.

## Code

- https://github.com/Mehtab9/Voice-Privacy-from-an-Attribute-based-Perspective

## Applications

Auditing and improving voice anonymization pipelines, privacy-preserving biometric systems, and regulatory compliance frameworks for speech data.

## Related

- (link related pages by id as the wiki grows)
