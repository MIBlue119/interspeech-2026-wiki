---
id: kawamura26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1662
pdf: https://www.isca-archive.org/interspeech_2026/kawamura26_interspeech.pdf
---

# PASQA: Pitch-Accent-Focused Speech Quality Assessment Model Trained on Synthetic Speech with Accent Errors

[PDF](https://www.isca-archive.org/interspeech_2026/kawamura26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kawamura26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1662)

**TL;DR** — PASQA is a pitch-accent-focused speech quality assessment model that uses self-supervised learning, mora-conditioned fusion, ranking loss, and adversarial training to evaluate accent correctness, achieving a Spearman's rank correlation of 0.828 with human accent judgments.

## Problem

Conventional utterance-level mean opinion score (MOS) prediction models estimate global naturalness and are largely insensitive to localized pitch-accent errors, such as a shifted accent nucleus in Japanese. Because pitch accent alters lexical meaning, failing to capture these errors degrades the reliability of automatic text-to-speech evaluation. Since real-world datasets lack accent-error annotations, existing quality models cannot reliably score accent correctness or order utterances by accent degradation severity.

## Method

The authors construct a Japanese accent-error dataset of 2,130,858 synthetic speech samples (nearly 2,900 hours) using a controllable TTS system by systematically modifying accent nucleus positions at targeted error rates. The PASQA model uses wav2vec 2.0 as an acoustic backbone, augmented with four main components: 1) mora-conditioned cross-attention fusion taking text-derived mora sequences, 2) a pairwise logistic ranking loss based on the Bradley-Terry model to preserve severity ordering, 3) an auxiliary frame-level accent-error detection head optimized via binary cross-entropy, and 4) speaker-invariant representation learning using a gradient reversal layer (GRL). The utterance score is predicted by a two-layer MLP with tanh range clipping.

## Results

Evaluated on a controlled Japanese dataset across seen and unseen speakers, PASQA achieves an SRCC of 0.828 and Kendall's tau (KTAU) of 0.614, outperforming conventional MOS models (like DNSMOS, NISQA, UTMOS, and SHEET SSL-MOS) which score near chance or negative correlation. In subjective evaluations with 15 native listeners, PASQA shows the strongest agreement with human judgments among evaluated neural models in terms of LCC (0.814), SRCC (0.828), and KTAU (0.614). On out-of-domain GPT-4o-mini-TTS outputs, PASQA achieves a pairwise discrimination accuracy of 0.780 (p < 0.001), significantly outperforming baseline predictors. Ablation experiments confirm that removing mora fusion, the frame error head, or GRL degrades performance.

## Code

- https://github.com/lycorp-jp/PASQA

## Applications

Speech and ML engineers building or evaluating text-to-speech (TTS) systems can use PASQA to automatically and rapidly assess fine-grained pitch-accent correctness without manual listening tests.

## Limitations

PASQA is trained on pseudo accent-quality scores derived from synthetic speech, which can cause a scale mismatch with absolute human rating ranges.

## Related

- (link related pages by id as the wiki grows)
