---
id: lee26s_interspeech
category: deepfake-security
labels: [low-resource, self-supervised, robustness-noise]
institutions: ["Electronics and Telecommunications Research Institute", "University of Science and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1975
pdf: https://www.isca-archive.org/interspeech_2026/lee26s_interspeech.pdf
---

# Comparing Self-Supervised and Domain-Invariant Features for Cross-Domain Voice Phishing Detection

*Jeongmin Lee, Seung Yun, Minkyu Lee, Ran Han, Yoonkyu Woo, Jinxia Huang*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26s_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26s_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1975)

**Category:** `deepfake-security` · **Labels:** `low-resource`, `self-supervised`, `robustness-noise`

**TL;DR** — This paper evaluates domain-invariant prosodic features versus frozen self-supervised models (HuBERT, wav2vec2.0) for cross-domain voice phishing detection, showing prosodic features excel in zero-shot cold starts (69.5% F1) while HuBERT dominates with 5-shot adaptation (94.2% F1).

## Key contributions

- Performs the first systematic comparison between domain-invariant prosodic features and SSL representations in a simulated-to-authentic cross-domain voice phishing detection setup.
- Introduces an offline feature selection pipeline combining Random Forest importance with Cohen’s d (< 0.5) to extract 4 domain-stable prosodic features (logRelF0-H1-A3, mfcc1V, mfcc4, F2bandwidth) from openSMILE eGeMAPS.
- Demonstrates that domain-invariant prosodic features achieve a 69.5% F1 zero-shot baseline, outperforming zero-shot SSL models that suffer from domain shift.
- Provides practical deployment guidelines mapping out trade-offs between zero-shot CPU-friendly prosodic features and 5-shot GPU-reliant SSL models (HuBERT/wav2vec2.0).

## Problem

Voice phishing (vishing) detection systems suffer from a severe scarcity of authentic criminal recordings due to strict privacy constraints, and when available, only a handful of samples exist. Large self-supervised learning models and text-based approaches require substantial target data, heavy compute, and external server connections that violate on-device privacy requirements. Prior methods are typically evaluated within single controlled domains, leaving their cross-domain generalization from simulated script readings to real-world criminal calls unaddressed.

## Method

The authors construct a 137.0-hour Korean speech corpus standardized to 8 kHz mono, comprising 812 training utterances (Scenario-based VP and financial consultation) and 812 test utterances (Authentic criminal VP and telephone consultations). For prosodic features, 88 eGeMAPS functionals are extracted using openSMILE 3.0; a two-stage filter retaining the top 20 RF features with Cohen's d < 0.5 yields a 4-feature subset (logRelF0-H1-A3, mfcc1V, mfcc4, F2bandwidth). For SSL, frozen HuBERT-Base and wav2vec2.0-Base (94M parameters each, pretrained on 960h LibriSpeech) provide frame-level hidden states that are mean-pooled into 768-dimensional utterance embeddings.

A Logistic Regression classifier (L2 regularization, C=1.0) is trained on standardized features using source data supplemented with k ∈ {0, 1, 5} authentic support samples drawn from a strictly disjoint holdout pool. The frozen SSL architecture requires target-domain samples to align its representations, whereas the 4-feature prosodic set relies solely on source-domain training because its features were pre-selected for cross-domain invariance via Cohen's d.

## Experimental setup

Evaluated on a custom 137-hour Korean telephony corpus (57.1h Scenario VP, 37.1h Scenario consult, 36.9h Authentic VP, 5.9h Authentic consult) with a fixed test set of 812 utterances. Compared systems include prosodic features (full 88 set vs. domain-invariant 4-feature subset), HuBERT-Base, and wav2vec2.0-Base across zero-shot, 1-shot, and 5-shot conditions using Logistic Regression. Metrics reported are F1 score, Recall (VP true positive rate), and Precision.

## Results

In the zero-shot setting, domain-invariant prosodic features (4f.) achieve 69.5% F1 (79.1% Recall, 62.0% Precision), vastly outperforming the unfiltered 88-feature set (3.8% F1) and zero-shot SSL models (HuBERT at 58.3% F1, wav2vec2.0 at 36.2% F1). With 5-shot adaptation, SSL models experience rapid scaling: HuBERT reaches 94.2% F1 with 99.3% Recall (prioritizing completeness), while wav2vec2.0 reaches 90.2% F1 with 99.4% Precision (prioritizing false-alarm suppression). Meanwhile, the 4-feature prosodic set plateaus at 71.0% F1, and the 88-feature set recovers to 85.2% F1.

| System | Features | k-shot | F1 (%) | Recall (%) | Precision (%) |
|---|---|---|---|---|---|
| Prosodic | 88f. | 0 | 3.8 | 2.0 | 66.7 |
| Prosodic | 4f. (Invar.) | 0 | 69.5 | 79.1 | 62.0 |
| HuBERT | 768d | 0 | 58.3 | 41.4 | 98.8 |
| wav2vec2.0 | 768d | 0 | 36.2 | 22.2 | 98.9 |
| HuBERT | 768d | 5 | 94.2 | 99.3 | 89.6 |
| wav2vec2.0 | 768d | 5 | 90.2 | 82.5 | 99.4 |

## Limitations

The study is restricted to a single language (Korean) and telephony codec conditions (8 kHz mono), leaving cross-lingual generalizability unverified. The evaluation relies on a relatively small authentic test set (406 voice phishing utterances), and the approach assumes access to at least scenario-based simulation data for source training.

## Why read this

Speech and ML researchers tackling cold-start audio classification under strict privacy and resource constraints should read this to understand the precise tipping points where lightweight domain-invariant features should be favored over frozen SSL models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time on-device voice phishing detection, low-resource telephony scam monitoring, and privacy-preserving acoustic threat screening.

## Institutions / 機構

Electronics and Telecommunications Research Institute, University of Science and Technology

**Funding / 經費:** Institute of Information and Communications Technology Planning and Evaluation

## Related

- (link related pages by id as the wiki grows)
