---
id: gao26d_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-535
pdf: https://www.isca-archive.org/interspeech_2026/gao26d_interspeech.pdf
---

# Uncovering Latent Depression Severity for Binary Depression Detection via Advantage-weighting Ranking

*Manning Gao, Tingyi Liu, Leheng Zhang, Haifeng Hu, Yuncheng Jiang, Sijie Mai*

[PDF](https://www.isca-archive.org/interspeech_2026/gao26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gao26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-535)

**TL;DR** — This paper proposes a fine-grained multimodal depression detection framework equipped with a Binary Advantage-weighting Ranking (BAR) Loss that recovers latent ordinal severity from binary vlog labels, achieving state-of-the-art F1 scores of 77.66 on D-vlog and 77.01 on LMVD.

## Key contributions

- Introduces a pairwise learning paradigm to automatic depression detection to reconstruct the latent continuous spectrum of severity from coarse binary vlog supervision.
- Proposes the Binary Advantage-weighting Ranking (BAR) Loss, combining error-aware advantage weighting for hard pairs, hinge-margin separation, and variance-reducing intra-class compactness.
- Employs a Mutual Transformer architecture with bidirectional audio-video cross-attention and joint self-attention to facilitate deep multimodal feature fusion.
- Utilizes a validation-based dynamic thresholding strategy to calibrate the decision boundary rather than relying on a default 0.5 sigmoid threshold.

## Problem

Automatic depression detection using user-generated video blogs (vlogs) suffers from significant feature distribution overlap, where non-depressed controls and depressed individuals hiding symptoms exhibit nearly identical audio-visual cues. Furthermore, standard models rely exclusively on pointwise Binary Cross-Entropy (BCE) supervision, treating depression categories as independent nominal classes and completely ignoring the continuous, ordinal nature of mental health severity. This sparse supervision combined with high feature overlap prevents standard classifiers from establishing robust decision boundaries, motivating a ranking formulation that targets ambiguous hard pairs.

## Method

The framework processes audio and video streams using 1D convolutional projections and Sequence Time-Delay Neural Networks (Seq-TDNN) to extract local temporal features of length $T$, mapping them to a hidden dimension $dh$. These representations pass through modality-specific Transformer encoders, followed by a Mutual Transformer that computes three attention streams: audio-to-video ($a \to v$), video-to-audio ($v \to a$), and joint self-attention ($f \to f$) over concatenated features. The fused sequence is mean-pooled and passed through an MLP with dropout to output a raw depression score $s$.

To optimize the latent space, the Binary Advantage-weighting Ranking (BAR) Loss is introduced alongside standard Binary Cross-Entropy. The BAR Loss calculates a pairwise prediction difference matrix $Dij = si - sj$ for positive and negative samples in a batch, converts this into a relative difficulty matrix $R$, and normalizes it into an advantage matrix $A$ using mean and standard deviation. An error-aware weighting matrix $W$ dynamically amplifies gradients for ambiguous hard pairs. The loss enforces two geometric constraints: Advantage-weighted Separation (forcing an optimal hinge margin $m$, e.g., $m=1.15$ for LMVD) and Advantage-weighted Compactness (minimizing intra-class variance weighted by $\bar{W}$ relative to class means). A distribution regularization term is added to anchor the batch mean and standard deviation of sigmoid probabilities around 0.5, preventing representation collapse. At inference, a grid-search dynamic threshold $\tau^*$ optimizes the F1 metric on the validation set.

## Experimental setup

Experiments use two in-the-wild multimodal vlog datasets: D-vlog (961 videos, ~160 hours, 816 speakers) and LMVD (1,823 videos, ~214 hours, 1,475 speakers). Hyperparameters are optimized via Optuna using a random search of 50 trials. For D-vlog, training uses AdamW with batch size 32, 150 epochs, learning rate $4.65 \times 10^{-5}$, weight decay $2.51 \times 10^{-4}$, and margin $m = 0.406$. For LMVD, training uses batch size 16, 100 epochs, learning rate $1.76 \times 10^{-5}$, weight decay $4.81 \times 10^{-3}$, and margin $m = 1.15$. Baselines include Bi-LSTM, TBN, STST, DepTrans, TAMFN, STE-Mamba, DepMamba, and CAF-Mamba.

## Results

The proposed model achieves state-of-the-art performance, securing an F1 score of 77.01 (Accuracy: 76.50, Precision: 75.00, Recall: 79.12) on the LMVD dataset, outperforming the strongest baseline CAF-Mamba (F1: 74.87). On the D-vlog dataset, it achieves an F1 score of 77.66 (Accuracy: 71.23, Precision: 70.67, Recall: 86.18), surpassing CAF-Mamba's 77.04. Ablation studies confirm that removing the mutual transformer drops LMVD performance to 71.00, and removing advantage-weighting drops D-vlog performance to 70.23. The method demonstrates slightly lower precision than CAF-Mamba on D-vlog (70.67 vs 73.88), showing a trade-off favoring high recall.

| Systems / Conditions | Accuracy | Precision | Recall | F1 |
|---|---|---|---|---|
| CAF-Mamba (D-vlog) | 72.17 | 73.88 | 80.49 | 77.04 |
| Ours (D-vlog) | 71.23 | 70.67 | 86.18 | 77.66 |
| CAF-Mamba (LMVD) | 74.32 | 72.92 | 76.92 | 74.87 |
| Ours (LMVD) | 76.50 | 75.00 | 79.12 | 77.01 |

## Limitations

The framework is currently evaluated exclusively on in-the-wild social media vlog datasets (D-vlog and LMVD), which may introduce platform-specific biases and uncontrolled acoustic conditions. Generalizability to clinical settings (such as DAIC-WoZ) remains unverified due to potential domain shifts between self-recorded vlogs and clinical interviews. Furthermore, the dynamic thresholding and margin hyperparameters require dataset-specific tuning via validation search.

## Why read this

Speech and ML researchers working on affective computing or ordinal classification in noisy multimodal environments should read this to see how pairwise ranking objectives and dynamic advantage-weighting can resolve heavy feature overlap in binary classification tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Non-invasive mental health screening and automated depression risk assessment using user-generated audio-visual content.

## Related

- (link related pages by id as the wiki grows)
