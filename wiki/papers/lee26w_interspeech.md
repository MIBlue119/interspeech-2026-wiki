---
id: lee26w_interspeech
category: speech-emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2996
pdf: https://www.isca-archive.org/interspeech_2026/lee26w_interspeech.pdf
---

# Diffusion Bridge Learning Between Overfitted and Underfitted Representations for speech emotion recognition

[PDF](https://www.isca-archive.org/interspeech_2026/lee26w_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26w_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2996)

**TL;DR** — The paper introduces Diffusion Bridge Learning, a representation-space adaptation framework that connects early-stage underfitted and late-stage overfitted representations via prototype-mediated diffusion, achieving up to a +6.42 percentage point improvement in weighted average recall for cross-lingual speech emotion recognition.

## Problem

Speech emotion recognition (SER) models trained on specific corpora tend to overfit to dataset-specific acoustic cues and spurious correlations, leading to poor generalization under cross-lingual and domain shifts. While early-stage representations offer better robustness and late-stage representations provide strong discriminability, existing systems commit to only one side of this trade-off. This paper addresses the gap by asking how to explicitly connect underfitted and overfitted representations to combine their complementary strengths.

## Method

The framework uses a pretrained HuBERT Large backbone encoder to extract paired late-stage (overfitted, domain A) and early-stage (underfitted, domain B) representations. It defines class prototypes as empirical mean anchor points within each domain and trains a lightweight conditional MLP as a denoiser to learn bidirectional sample-prototype transformations via a diffusion process. The training objective combines an epsilon-prediction loss, paired alignment loss, cycle consistency constraint, endpoint and translated cross-entropy classification losses, and a logit-pair Kullback-Leibler regularization. Bridge-loss weights are tuned, with optimal performance achieved at high constraint weights (lambda_pair = 10, lambda_cycle = 1).

## Results

Evaluated on cross-lingual SER using English datasets (IEMOCAP and MSP-IMPROV combined, 13,329 utterances) and Japanese dataset (JTES, 20,000 utterances) evaluated via Weighted Average Recall (WAR). In the English-to-Japanese direction, the method achieves an average improvement of +6.42 percentage points (max +8.10 pp, p = 0.0011) for the overfit-underfit (B) setting under high bridge weights. In the Japanese-to-English direction, it yields a +4.00 percentage point improvement (max +5.20 pp, p = 0.0015). Ablations demonstrate that bridging heterogeneous representations (overfit-underfit) significantly outperforms homogeneous same-stage bridging.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers building robust speech emotion recognition systems that must generalize across different languages, domains, and unseen corpora.

## Related

- (link related pages by id as the wiki grows)
