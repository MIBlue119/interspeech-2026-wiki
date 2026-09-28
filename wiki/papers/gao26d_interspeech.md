---
id: gao26d_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-535
pdf: https://www.isca-archive.org/interspeech_2026/gao26d_interspeech.pdf
---

# Uncovering Latent Depression Severity for Binary Depression Detection via Advantage-weighting Ranking

[PDF](https://www.isca-archive.org/interspeech_2026/gao26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gao26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-535)

**TL;DR** — This paper proposes a fine-grained multimodal depression detection framework powered by a novel Binary Advantage-weighting Ranking (BAR) loss to resolve feature overlap, achieving an F1-score of 77.01 on LMVD and 77.66 on D-vlog.

## Problem

Automatic depression detection using in-the-wild video logs faces challenges due to subtle, ambiguous boundaries between depressed and non-depressed behaviors and heavily overlapping acoustic-visual feature distributions. Furthermore, standard pointwise training objectives like Binary Cross-Entropy treat classes independently, ignoring the continuous, latent ordinal nature of depression severity and resulting in sub-optimal decision boundaries.

## Method

The architecture comprises a dual-stream temporal encoder (1D convolutions and Seq-TDNN) for audio and video modalities, followed by a Mutual Transformer for bidirectional cross-modal attention and joint self-attention. The core technical contribution is the Binary Advantage-weighting Ranking (BAR) Loss, which combines an advantage-weighted separation term (mining hard pairs via a dynamic prediction difference matrix), an advantage-weighted compactness term (minimizing intra-class variance), and distribution regularization anchors to maintain a balanced sigmoid output space. The model also applies a dynamic thresholding strategy via grid search on validation F1 scores to calibrate the final decision boundary.

## Results

Evaluated on two wild-collected vlog datasets, D-vlog (961 vlogs, 816 speakers) and LMVD (1,823 samples, 1,475 participants). On LMVD, the full model achieves state-of-the-art performance with 76.44% accuracy, 76.50% precision, 79.12% recall, and 77.01% F1, outperforming strong baselines like DepMamba. On D-vlog, it reaches 71.23% accuracy, 70.67% precision, 86.18% recall, and 77.66% F1. Ablation studies demonstrate that removing the mutual transformer causes a performance drop of 5.91 on LMVD, while omitting advantage-weighting reduces D-vlog F1 by 6.21.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on non-invasive mental health screening, affective computing, and multimodal behavioral analysis systems.

## Limitations

The current evaluation focuses exclusively on in-the-wild social media vlog datasets, requiring future validation on clinical datasets like DAIC-WoZ to test cross-domain robustness.

## Related

- (link related pages by id as the wiki grows)
