---
id: meng26f_interspeech
category: health-clinical
labels: [self-supervised]
institutions: ["Beijing Institute of Technology", "Hong Kong University of Science and Technology", "TUM University Hospital"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2153
pdf: https://www.isca-archive.org/interspeech_2026/meng26f_interspeech.pdf
---

# Similarity as Evidence: An Explainable Siamese Framework for Snore Sound Classification

*Boyang Meng, Mengkai Sun, Haojie Zhang, Kun Qian, Wei Xue, Bin Hu, Bjoern Schuller*

[PDF](https://www.isca-archive.org/interspeech_2026/meng26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2153)

**Category:** `health-clinical` · **Labels:** `self-supervised`

**TL;DR** — An explainable Siamese framework is proposed for four-class snore sound classification (based on the VOTE taxonomy) that treats similarity as evidence, improving clean-condition macro-recall from 0.401 (wav2vec2) to 0.638.

## Key contributions

- Reconceptualises similarity in Siamese networks as decision evidence, coupling structured embedding learning with feature-level interpretability.
- Introduces a support-based, feature-level explanation mechanism grounded in query-support similarity and visually comparable time-frequency activation patterns.
- Applies joint semi-hard triplet loss and class-balanced cross-entropy to learn l2-normalised embeddings tailored for long-tailed biomedical audio data.
- Validates explanation faithfulness and stability via quantitative deletion tests and perturbation analyses on the MPSSC dataset.

## Problem

Snore sounds serve as clinical biomarkers for upper-airway obstruction patterns and sleep-related breathing disorders, but automatic classification remains difficult due to non-stationary noise, environmental variability, distribution shift, and severe class imbalance. While standard convolutional networks and foundation models like wav2vec 2.0 yield strong predictive accuracy, they function as black boxes whose softmax classifiers lack transparency and decision boundary stability. Clinical environments demand mechanism-oriented analysis and interpretable evidence rather than blind predictions, yet prior metric learning approaches optimize distance metrics without linking them to concrete input-domain evidence.

## Method

The framework processes 4-second audio segments resampled to 16 kHz into log-Mel spectrograms (80 Mel filters, 25 ms FFT, 10 ms hop, 20-2400 Hz range) with per-frequency cepstral mean and variance normalisation (CMVN). The encoder is a lightweight 2D convolutional neural network consisting of three blocks (Conv-BN-ReLU-2x2 MaxPool) followed by global average pooling and a linear projection to a D=256-dimensional space, subsequently l2-normalised onto a unit hypersphere.

Training uses a joint objective balancing a semi-hard triplet loss and an effective-number class-balanced cross-entropy loss (beta=0.995, weight lambda=1). The triplet loss uses a staged margin schedule (0.1 -> 0.2 -> 0.3) and PxM batch sampling (P=4 classes, M=8 samples per class, batch size 32) to stabilise hard-example mining. Optimization uses Adam (initial lr=1e-3, weight decay=1e-4, cosine annealing to 1e-5, gradient norm clipping at 5.0) for 80 epochs, selecting the checkpoint with highest validation macro-recall.

At inference time, a non-parametric Class Centroid rule assigns query embeddings to the nearest class prototype using Euclidean distance. To explain predictions, compact support sets containing embedding-space centroids are established for each class. Query-support pairs generate an evidence map by projecting final convolutional feature tensors (from layer 8) back to the input resolution via bilinear interpolation, highlighting time-frequency regions that drive the similarity and embedding representation.

## Experimental setup

Evaluated on the Munich-Passau Snore Sound Corpus (MPSSC) across four VOTE classes (Velum: 168 train/161 val/155 test; Oropharyngeal: 76/75/65; Tongue base: 8/15/16; Epiglottis: 30/32/27; Total 282 train/283 val/263 test). Compared against a support vector machine using hand-crafted features, a standard CNN with Class Centroid, a fine-tuned wav2vec 2.0 baseline, a softmax head, weighted kNN, and a diagonal Mahalanobis distance head. Primary metric is macro-averaged recall (UAR), supplemented by macro-F1, overall accuracy, deletion tests for faithfulness, and white noise robustness tests at 20, 10, 5, and 0 dB SNR.

## Results

On the clean MPSSC test set, the proposed Siamese encoder with Class Centroid inference achieves a headline macro-recall (UAR) of 0.638, outperforming the database SVM baseline (0.558), standard CNN centroid (0.502), fine-tuned wav2vec2 (0.401), and the framework's own parametric softmax head (0.547), weighted kNN (0.478), and diagonal Mahalanobis head (0.517). Under additive white noise, Class Centroid retains modest advantages over the softmax head at 20 dB (0.392 vs 0.391) and 10 dB (0.365 vs 0.343), but this advantage vanishes at 5 dB and 0 dB where the softmax head overtakes it. Deletion tests confirm explanation faithfulness, showing that masking top-evidence regions leads to a steeper confidence drop than random masking. Embeddings exhibit a mean intra-class distance of 0.527 and inter-class distance of 0.803 (margin 0.276), though minority epiglottal classes show higher intra-class variance.

| System / Condition | Macro-Recall (UAR) | F1-Score / Notes |
|---|---|---|
| SVM (Database Baseline) [6] | 0.558 | Hand-crafted features |
| wav2vec 2.0 (Fine-tuned) | 0.401 | Frozen pretrained + unfreezing last 2 layers |
| Standard CNN (Class Centroid) | 0.502 | Without metric learning objectives |
| Siamese + Softmax Head | 0.547 | Parametric cross-entropy head |
| Siamese + Weighted kNN | 0.478 | k in {3, 5, 10} grid search |
| Siamese + Class Centroid (Ours) | 0.638 | Non-parametric prototype distance |

## Limitations

Evaluated exclusively on a single small-scale clinical dataset (MPSSC) with constrained sample sizes, particularly for minority classes (e.g., only 8-16 training samples for the Tongue base class). The fixed 4-second segmentation window can clip event boundaries, leading to ambiguous edge cases. Severe domain shifts and high-noise conditions (0 dB SNR) degrade the Siamese advantage over standard softmax cross-entropy heads. Finally, empirical validation lacks formal mathematical guarantees required for high-stakes clinical certification.

## Why read this

Researchers and engineers building biomedical or low-resource audio classifiers will learn how to design a Siamese metric-learning framework that replaces black-box predictions with faithfuI, example-driven feature-level evidence attribution.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical screening and longitudinal monitoring of sleep-related breathing disorders, computer-aided diagnosis for upper-airway obstruction localization, and interpretable biomedical sound classification.

## Institutions / 機構

Beijing Institute of Technology, Hong Kong University of Science and Technology, TUM University Hospital

**Funding / 經費:** National Key R&D Program of China, National Natural Science Foundation of China, Beijing Natural Science Foundation, Ministry of Science and Technology of the People's Republic of China, Teli Young Fellow Program

## Related

- (link related pages by id as the wiki grows)
