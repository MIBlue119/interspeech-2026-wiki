---
id: vonaspern26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3300
pdf: https://www.isca-archive.org/interspeech_2026/vonaspern26_interspeech.pdf
---

# Leveraging Mutual Intra-Modal Similarity Supervision for Text and Audio

*Julian Miguel von Aspern, Bruno Defraene, Anastasios Vafeiadis, Oleksiy Kutscher, Ernst Seidel, Tim Fingscheidt*

[PDF](https://www.isca-archive.org/interspeech_2026/vonaspern26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/vonaspern26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3300)

**TL;DR** — The paper adapts intra-modal similarity supervision from vision-language models to audio-text contrastive learning, using text-text and audio-audio cosine similarities as soft targets alongside an MSE loss. This achieves competitive performance with SOTA CLAP models while using a fraction of the training data (0.5M vs 4.6M samples) and batch size (64 vs 1,536).

## Key contributions

- Transfers intra-modal text-text similarity soft targets from image-text contrastive learning to the audio-text domain.
- Generalizes the approach by introducing intra-modal audio-audio similarities as inter-modal similarity targets.
- Proposes a target uncertainty estimation method using Monte Carlo dropout to weight similarity mixing dynamically.
- Replaces standard cross-entropy loss with mean squared error (MSE) loss to prevent training instabilities and degradation under small batch sizes.
- Evaluates auxiliary modality classification branches with gradient reversal layers (GRL) to shrink the modality gap.

## Problem

Contrastive language-audio pre-training (CLAP) frameworks typically rely on one-hot targets and require massive batch sizes (e.g., 1,536) and vast datasets (millions of audio-text pairs) to achieve strong zero-shot and retrieval performance. When trained on smaller data regimes or batch sizes (e.g., batch size 64), standard contrastive cross-entropy loss suffers from training instabilities where the system collapses into predicting uniform similarity values. This paper addresses how to supply richer relational supervision signals during training without scaling up compute and batch size to prohibitive levels.

## Method

The architecture comprises a pretrained PaSST audio encoder (passt_s_p16_s16_128_ap468) and a pretrained RoBERTa-large text encoder projecting into a d=1,024 dimensional space via fully connected layers. Frozen auxiliary encoders—a frozen PaSST for audio-audio similarities (S_a) and a frozen Sentence-BERT (all-mpnet-base-v2) for text-text similarities (S_t)—compute intra-modal cosine similarity matrices on a batch basis. These intra-modal matrices are combined via a weighted mixing factor lambda_a and lambda_t = 1 - lambda_a to form the target similarity matrix S.

To improve mixing, target uncertainty estimation computes embedding uncertainties via Monte Carlo dropout with K=10 perturbations (using deterministic dropout layers with P_DO=0.1) across the frozen encoders, defining the target uncertainty as the sum of circular variances of the embedding vectors. These uncertainties dynamically weight the elements in the enhanced target similarity matrix S. An optional auxiliary 5-layer MLP classifier with a gradient reversal layer (GRL) and binary cross-entropy loss (weighted by lambda_M = 0.01) is used to reduce the inter-modal embedding gap.

Crucially, standard row-wise cross-entropy loss is replaced with an averaged mean squared error (MSE) loss between the predicted similarity matrix and the target similarity matrix S. This solves training instabilities observed under small batch sizes (B=64). The model is optimized using Adam for 20 epochs with a linear warmup to 2e-5 in epoch 1 followed by a half-cycle cosine ramp down to 1e-7.

## Experimental setup

Trained on a combination of Clotho v2.1 development split, AudioCaps v2, and WavCaps (totaling ~0.5M training samples after removing Clotho test overlaps). Evaluated on zero-shot classification (ESC-50, TUT Acoustic Scenes 2017, NSynth instrument families, and UrbanSound8K), text-queried audio retrieval (TAR) and audio-queried text retrieval (ATR) on Clotho v2.1 evaluation split. Baselines include Primus et al.'s baseline [12] and CLAP23 [4]. Metrics include Accuracy (ACC), mAP@10, amAP@16, and Recall@1.

## Results

Using MSE loss with text-text similarities (MSE+T) achieves an ESC-50 accuracy of 96.5% and TUT17 accuracy of 62.0%, outperforming the baseline and matching or beating CLAP23 (which uses 4.6M samples and batch size 1,536). For text-queried audio retrieval on Clotho-eval, MSE+T+A+U (incorporating audio-text intra-modal similarity and uncertainty estimation) achieves top performance with an amAP@16 of 40.3% and mAP@10 of 34.3%. For audio-queried text retrieval, MSE+T+A achieves the best R@1 of 30.7% and mAP@10 of 20.8%. Across all tasks, the proposed MSE-based variants dominate accumulated ranking metrics compared to cross-entropy variants. The only dataset where the system underperforms relative to large-scale SOTA is NSynth instrument classification (36.3% vs 47.9% for CLAP23).

| System | ESC-50 (ACC) | TUT17 (ACC) | Clotho TAR (mAP@10) | Clotho ATR (R@1) |
|---|---|---|---|---|
| CLAP23 [4] | 94.8% | 55.5% | 25.8% | 22.9% |
| Baseline [12] | 95.9% | 57.8% | 32.3% | 29.0% |
| CE+T+A+U | 96.1% | 57.9% | 32.8% | 26.7% |
| MSE+T (Ours) | 96.5% | 62.0% | 34.4% | 29.1% |
| MSE+T+A+U (Ours) | 95.8% | 58.3% | 34.3% | 27.3% |

## Limitations

The approach relies on frozen auxiliary teacher encoders (PaSST and Sentence-BERT) to compute intra-modal similarity matrices, which adds memory and compute overhead during training preprocessing or feature caching. Evaluation is heavily anchored around English-language text queries (Clotho) and standard environmental sound datasets, leaving multilingual generalizability and scaling behavior to truly massive web-scale datasets (tens of millions of samples) unexplored.

## Why read this

Speech and ML researchers working on multi-modal audio-text representation learning with limited compute or constrained batch sizes should read this to learn how intra-modal soft targets and MSE loss can replace massive batch-size scaling.

## Code

- https://github.com/OptimusPrimus/salsa

## Applications

Zero-shot audio classification, text-to-audio retrieval, and speech/audio search engines operating under resource-constrained training regimes.

## Related

- (link related pages by id as the wiki grows)
