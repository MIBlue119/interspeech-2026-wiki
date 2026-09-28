---
id: huang26n_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1996
pdf: https://www.isca-archive.org/interspeech_2026/huang26n_interspeech.pdf
---

# EmoEUS: Uncertainty Supervision for Multimodal Emotion Recognition in Conversation

*Zilong Huang, Kong Aik Lee, Junjie Li, Zhe Li, Man-Wai Mak*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1996)

**TL;DR** — EmoEUS is an explicit uncertainty supervision framework for multimodal emotion recognition in conversation that dynamically weights text, audio, and video modalities using learned variance estimates. It achieves state-of-the-art results, including 74.33% accuracy on IEMOCAP and 68.32% accuracy on MELD.

## Key contributions

- Proposed Context-level Distribution Estimator Module (ContextDEM) to model utterance-level uncertainty by mapping multimodal features to Gaussian distributions with means and variances.
- Introduced Uncertainty-Aware Multimodal Fusion (UAMF) mechanism that dynamically adjusts modality contributions based on relative uncertainty ratios and confidence scores.
- Designed an Explicitly Supervised Loss (ESL) utilizing the 2-Wasserstein distance to align predicted utterance-wise variances with global emotion- and modality-specific cluster centers.
- Demonstrated significant reductions in misclassification rates among ambiguous emotion pairs (e.g., Happy/Excited) on conversational benchmarks.

## Problem

Multimodal emotion recognition in conversation (MERC) struggles with noisy, missing, or conflicting signals across text, audio, and visual modalities. Prior methods like DialogRNN, DialogGCN, and M2FNet implicitly assume uniform modality reliability per utterance or handle uncertainty purely through classification loss. This uniform treatment is suboptimal because modality informativeness fluctuates wildly across conversational turns, degrading robustness and causing biased predictions on confusable emotional states.

## Method

EmoEUS processes text, audio, and video representations extracted via RoBERTa, Wav2vec2.0, and CLIP, passing them through modality-specific bidirectional GRUs. The ContextDEM module enhances global context via a Transformer encoder with residual connections, and uses two parallel MLP branches to independently predict mean and log-variance vectors for each modality.

The Uncertainty-Aware Multimodal Fusion (UAMF) module computes modality confidences from the inverse relative uncertainty ratios, applies softmax normalization across modalities, and scales the mean features. A specialized multi-head attention mechanism (with query/value projections) and a subsequent Transformer encoder capture inter-utterance dependencies over the fused representations before classification.

The Explicitly Supervised Loss (LESL) maintains global distributional cluster centers (mean and variance per emotion class and modality) updated once per epoch. It penalizes the discrepancy between each utterance's predicted distribution and its corresponding emotion cluster center using the 2-Wasserstein distance, scaled by a learnable factor alpha. The final loss combines standard cross-entropy and LESL (weighted by lambda = 2e-5 starting at epoch 10).

## Experimental setup

Evaluated on IEMOCAP (using Leave-One-Session-Out) and MELD (using predefined train/val/test splits). Compared against baselines including DialogRNN, DialogGCN, MMGCN, M2FNet, CFN-ESA, AdaIGN, MDAG, DER-GCN, and FEMI. Metrics include Accuracy and weighted F1-score (w-F1). Implemented on a single NVIDIA RTX 4090 GPU using the Adam optimizer (lr=2e-4, batch sizes of 15 for IEMOCAP and 100 for MELD, dropout 0.2, trained for 40/50 epochs with final weights averaged from the last 10 checkpoints).

## Results

On IEMOCAP, EmoEUS achieves 74.33% accuracy and 74.36% w-F1, outperforming the strongest baseline FEMI (71.97% acc, 73.53% w-F1). On MELD, it reaches 68.32% accuracy and 67.53% w-F1, outperforming CFN-ESA (67.85% acc). Ablation studies show that removing UAMF drops IEMOCAP accuracy to 72.63% and removing LESL drops it to 73.32%, while replacing distribution modeling with point representation (MSE distance) drops accuracy to 73.28%.

While EmoEUS achieves superior overall metrics and balances performance across all emotion categories (w-F1 > 70% for every class on IEMOCAP), it records slightly lower scores on specific 'Sad' and 'Angry' classes compared to isolated baselines like FEMI.

| System / Condition | IEMOCAP Acc | IEMOCAP w-F1 | MELD Acc | MELD w-F1 |
|---|---|---|---|---|
| DialogGCN (2019) | 65.25 | 64.18 | - | 58.10 |
| M2FNet (2022) | 69.69 | 69.86 | 67.85 | 66.71 |
| CFN-ESA (2023) | 71.04 | 70.78 | 67.85 | 66.70 |
| FEMI (2025) | 71.97 | 73.53 | 64.88 | 66.41 |
| EmoEUS w/o LESL | 73.32 | 73.33 | 67.78 | 66.73 |
| EmoEUS (Full) | 74.33 | 74.36 | 68.32 | 67.53 |

## Limitations

Evaluated exclusively on English-language conversational datasets (IEMOCAP and MELD) featuring video/audio/text modalities, leaving multilingual and low-resource generalizability unverified. The explicit cluster center updates and 2-Wasserstein distance calculations assume stationary class distributions within epochs, which may scale poorly to real-time streaming or dynamic multi-speaker scenarios without windowing adaptations.

## Why read this

Researchers and engineers building multimodal conversational systems or affective computing models should read this to learn how to operationalize explicit uncertainty supervision via 2-Wasserstein distribution alignment rather than relying solely on implicit cross-entropy supervision.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Human-computer interaction, intelligent affective healthcare, and customer service analytics.

## Related

- (link related pages by id as the wiki grows)
