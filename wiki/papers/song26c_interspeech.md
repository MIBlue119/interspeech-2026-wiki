---
id: song26c_interspeech
category: speech-emotion-recognition
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-969
pdf: https://www.isca-archive.org/interspeech_2026/song26c_interspeech.pdf
---

# Segment-wise Embedding based Graph Attention Network for Effective Speech Emotion Recognition

*Haoyu Song, Ian McLoughlin, Yan Song, Lirong Dai*

[PDF](https://www.isca-archive.org/interspeech_2026/song26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-969)

**TL;DR** — A segment-wise speech embedding graph attention network (SSE-GAT) leverages a frozen HuBERT-large backbone and a post-trained 1D Swin-Transformer adaptor to capture fine-grained emotional dynamics, achieving 76.84% UA on IEMOCAP.

## Key contributions

- Proposes a segment-wise speech embedding (SSE) extractor combining frozen HuBERT-large with a 1D Swin-Transformer adaptor to map variable-length speech into multi-scale patch embeddings.
- Introduces a self-supervised adaptor post-training scheme utilizing block mask prediction, utterance-level self-distillation, and KoLeo feature uniformity regularization to combat distribution shifts.
- Employs a Graph Attention Network (GAT) aggregator over multi-crop utterance segments to model non-Euclidean temporal dependencies and prevent emotional signal dilution from neutral background frames.
- Combines cross-entropy with supervised contrastive learning (SCL) to increase inter-class margins and handle inherent emotion label ambiguity.

## Problem

Traditional speech emotion recognition (SER) models use utterance-level supervision and simple pooling mechanisms (like average or max pooling), which obscure brief or fine-grained emotional bursts hidden within longer stretches of neutral speech. Furthermore, relying on rigid one-hot encodings for whole utterances fails to capture real-world label ambiguity where multiple emotions overlap. Directly fine-tuning large pre-trained models on small-scale emotion corpora also causes severe overfitting due to domain and speaker distribution shifts.

## Method

The architecture comprises three core modules: a frozen HuBERT-large model, a 1D Swin-Transformer segment-wise adaptor, and a Graph Attention Network (GAT) aggregator.

First, 1024-dimensional frame-level features are extracted from the 19th transformer block of a frozen HuBERT-large (which uses a CNN encoder with 7 convolutional layers and stride [5,2,2,2,2,2,2,2]). A 1D Swin-Transformer adaptor groups these frames into local temporal windows with hierarchical patch merging to produce segment-wise patch embeddings and a global [CLS] token. Prior to fine-tuning, the adaptor undergoes self-supervised post-training via a siamese student-teacher framework (teacher updated via EMA). It optimizes three losses: an utterance-level KL divergence distillation loss with dynamic centering, a patch-level masked prediction loss using synchronized 1D max-pooling over block mask boundaries, and a KoLeo differential entropy regularization loss on L2-normalized global embeddings (scaled by gamma=0.1) to enforce feature uniformity.

During task-specific fine-tuning, multiple random crops from an utterance are mapped to fixed-duration segments, and a fully connected intra-utterance directed graph is constructed where each segment acts as a node. A 2-layer GAT with residual connections computes dynamic attention scores via a learnable projection matrix and multi-layer perceptron to weigh salient emotional segments. A global readout pools these updated nodes into a final utterance vector. The model is optimized using a combination of cross-entropy (CE) loss and supervised contrastive learning (SCL) loss (temperature tau=0.07, weight lambda=0.1) to minimize intra-class variance and maximize inter-class distance.

## Experimental setup

Evaluated on the IEMOCAP dataset (4 categorical emotions: Angry, Happy, Neutral, Sad; 5-fold leave-one-session-out cross-validation) and MER2023 audio subset (6 discrete emotions plus continuous Valence estimation; 5-fold CV). Compared against baselines including Co-att, W2v2-PT, Spk-norm, GLRF, emotion2vec, and standard Mean/Max pooling. Implemented with AdamW (learning rate 10^-4, batch size 128), trained for 40 epochs on IEMOCAP and 100 epochs on MER2023, updating HuBERT blocks 18-19 jointly with the adaptor and GAT.

## Results

On IEMOCAP, the proposed method achieves a state-of-the-art 76.22% Weighted Accuracy (WA), 76.84% Unweighted Accuracy (UA), and 76.06% Macro-F1, outperforming prior models like GLRF (73.39% UA) and the baseline frozen HuBERT with mean pooling (72.32% UA). On MER2023, it achieves 71.53% F1-score and 0.9844 Mean Square Error (MSE) for Valence estimation, improving significantly over the AP baseline (65.63% F1, 1.0976 MSE).

Ablation studies confirm the necessity of each component: removing SSL post-training drops performance, replacing the GAT aggregator with simple mean pooling reduces UA to 77.10% (relative drop from the full system's 76.84% context), and removing the SCL loss causes a noticeable decline in Macro-F1 and UA.

| System | IEMOCAP WA (%) | IEMOCAP UA (%) | MER2023 F1 (%) | MER2023 MSE |
|---|---|---|---|---|
| Baseline AP / Mean Pooling | 72.60 | 72.32 | 65.63 | 1.0976 |
| Co-att [19] | 71.64 | 72.70 | - | - |
| GLRF [21] | 72.81 | 73.39 | - | - |
| emotion2vec [13] | 71.79 | - | - | - |
| Ours (Baseline w/o SSL/GAT/SCL) | 72.60 | 72.32 | 68.46 | 1.0462 |
| Ours (Proposed SSE-GAT) | 76.22 | 76.84 | 71.53 | 0.9844 |

## Limitations

The evaluation is restricted to English-centric and Mandarin-centric benchmark datasets (IEMOCAP and MER2023) under clean or moderately controlled conversational conditions, leaving out-of-domain robustness in noisy acoustic environments underexplored. The framework relies on a heavy pretrained foundation model (HuBERT-large) combined with multi-stage training (SSL post-training followed by supervised fine-tuning), resulting in high computational overhead that hinders lightweight, on-device deployment.

## Why read this

Researchers working on paralinguistics and sequence-to-one speech tasks will find this paper valuable for its novel combination of Swin-Transformers and graph attention networks to resolve temporal signal dilution in variable-length utterances.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Human-computer interaction, affective computing, mental health monitoring, and customer service analytics.

## Related

- (link related pages by id as the wiki grows)
