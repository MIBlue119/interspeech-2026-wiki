---
id: tsai26_interspeech
category: resources-evaluation
labels: [self-supervised, robustness-noise]
institutions: ["National Taiwan University", "University of Southern California"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-39
pdf: https://www.isca-archive.org/interspeech_2026/tsai26_interspeech.pdf
---

# The False Resonance: A Critical Examination of Emotion Embedding Similarity for Speech Generation Evaluation

*Yun-Shao Tsai, Yi-Cheng Lin, Huang-Cheng Chou, Tzu-Wen Hsu, Yun-Man Hsu, Chun Wei Chen, Shrikanth Narayanan, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/tsai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tsai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-39)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — A critical evaluation of emotion embedding similarity (EMO-SIM) metrics used in speech generation reveals that current encoders like emotion2vec fail to align with human perception, yielding near-chance performance under acoustic distractors.

## Key contributions

- Demonstrates that emotion2vec and related embeddings suffer from severe anisotropy, causing uncalibrated similarity scores to cluster tightly between 0.92 and 0.98.
- Exposes critical vulnerabilities through adversarial triplet evaluations, showing that linguistic and speaker distractors can degrade categorical emotion similarity accuracy to sub-random levels.
- Reveals a failure of continuous dimensional sensitivity, with Spearman rank correlations (rho) for valence and arousal hovering near zero.
- Proves through human perceptual alignment tests and layer-wise probing that deeper transformer layers actively suppress affective features and degrade subjective alignment.

## Problem

Objective evaluation of expressive speech generation relies heavily on computing cosine similarity between emotion embeddings (EMO-SIM) from models like emotion2vec, assuming spatial proximity reflects affective transfer. However, this practice treats encoders as black boxes without verifying whether latent spaces are robust to speaker identity and linguistic variations. Because automated metrics dictate rapid model selection and iteration, an inaccurate metric rewards superficial acoustic mimicry rather than genuine emotional expression, risking the deployment of flawed speech generation systems.

## Method

The study establishes a systematic testing pipeline across six speech datasets spanning English, Chinese, and Russian. To overcome latent space anisotropy where raw similarities cluster between 0.92 and 0.98, the authors apply mean centering to shift distributions to the origin before computing cosine similarity. Evaluators assess representations across four categorical adversarial scenarios (unconstrained, speaker-linguistic match, speaker distractor, and linguistic distractor), trend monotonicity and shift discriminability for continuous valence and arousal dimensions, and pairwise human preferences on synthetic utterances.

Encoders evaluated include the base emotion2vec, its fine-tuned variants (seed, base, and large), HuBERT, Wav2vec 2.0, and TERA. Frame-level representations from final hidden layers undergo temporal mean pooling and mean-centering calibration. A rigorous filtering strategy isolates four core emotion categories (neutral, happy, sad, angry) and strictly excludes datasets present in encoder pre-training corpora to enforce zero-shot evaluation conditions. Human preference evaluations utilize 400 high-consensus triplets evaluated by multiple researchers, yielding a high inter-rater agreement of Fleiss' kappa equal to 0.7349.

## Experimental setup

Evaluated across six diverse speech datasets: CREMA-D, MSP-Improv, MSP-Podcast, BIIC-Podcast, NNIME, and Dusha, filtering down to neutral, happy, sad, and angry categories. Compared against base emotion2vec, emotion2vec+ (seed, base, large), HuBERT, Wav2vec 2.0, and TERA. Metrics include triplet classification accuracy (%), Spearman's rank correlation (rho) for dimensional attributes, and human preference agreement accuracy checked via binomial tests.

## Results

In categorical adversarial evaluations, base emotion2vec and its fine-tuned variants perform poorly, achieving only 60-70% accuracy even under ideal speaker-linguistic matching. When subjected to linguistic distractors on CREMA-D, accuracy collapses to an abysmal 3.38%, performing worse than random chance and actively penalizing correct emotional pairs with different acoustic properties. For continuous dimensions, trend monotonicity fails completely with Spearman's rho remaining near zero across all datasets for both valence and arousal. Finally, human perception alignment tests demonstrate that models achieve accuracies between only 52.25% and 65.00%, proving that EMO-SIM is an unreliable proxy for subjective human evaluation.

| System / Condition | Categorical (Speaker-Ling. Match) | Categorical (Linguistic Distractor) | Valence Trend (rho) | Human Alignment Accuracy (%) |
|---|---|---|---|---||
| emotion2vec (Base) | 55.28% | 20.14% | -0.07 | 53.50% |
| emotion2vec+ (Large) | 62.08% | 50.10% | -0.19 | 52.25% |
| HuBERT | 54.70% | 35.32% | -0.06 | 55.00% |
| Wav2vec 2.0 | 53.08% | 44.80% | -0.02 | 53.00% |
| TERA | 56.40% | 47.14% | -0.02 | 58.00% |

## Limitations

The study focuses primarily on zero-shot evaluation settings using encoder models without task-specific fine-tuning on downstream metrics. Language coverage is constrained to English, Chinese, and Russian datasets. Furthermore, the analysis is bounded by the available annotation granularity of existing affective speech corpora and evaluates specific backbone architectures prominent in current speech research.

## Why read this

Speech and machine learning researchers relying on automated emotion similarity metrics for expressive TTS or voice conversion must read this paper to understand why current embedding spaces reward acoustic mimicry over genuine emotional transfer. It provides essential guidance on the severe limitations of zero-shot EMO-SIM and highlights the urgent need for perceptually aligned objective evaluation metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnostic evaluation frameworks for text-to-speech, emotional voice conversion, and automated speech quality assessment toolkits.

## Institutions / 機構

National Taiwan University, University of Southern California

**Funding / 經費:** Ministry of Education, NSTC Taiwan, US NSF, ODNI IARPA ARTS

## Related

- (link related pages by id as the wiki grows)
