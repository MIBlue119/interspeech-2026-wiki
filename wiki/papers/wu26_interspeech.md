---
id: wu26_interspeech
category: speaker
labels: [self-supervised]
institutions: ["University of Southampton", "Hong Kong Polytechnic University", "University of Edinburgh"]
code: https://sites.google.com/view/components-samples/home
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-537
pdf: https://www.isca-archive.org/interspeech_2026/wu26_interspeech.pdf
---

# LISE : Listenable Interpretable Speaker Embeddings

*Xiaoliang Wu, Chong-xin Gan, Ke Liu, Peter Bell, Jennifer Williams*

[PDF](https://www.isca-archive.org/interspeech_2026/wu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-537)

**Category:** `speaker` · **Labels:** `self-supervised`

**TL;DR** — LISE is a label-free post-hoc framework that decomposes pretrained speaker embeddings into a compact set of orthogonal, non-negative components, achieving human-verified perceptual interpretability (83.9% listening discrimination accuracy) with negligible automatic speaker verification performance degradation.

## Key contributions

- Proposes LISE, an unsupervised, label-free post-hoc framework decomposing speaker embeddings into K orthogonal, non-negative continuous components.
- Preserves speaker verification performance on VoxCeleb1-O with minimal equal error rate (EER) degradation compared to original embeddings.
- Establishes a rigorous listening-test evaluation protocol to validate human perceptual discriminability of the decomposed components.
- Demonstrates robustness of the decomposition under data scarcity by training on reduced (75% and 50%) portions of the dataset.

## Problem

Modern speaker embeddings from deep neural networks lack structured, perceptually verifiable explanations for their encoded vocal characteristics, while existing interpretability methods have severe flaws. Probing classifiers and attribute-disentanglement methods require expensive attribute labels, fail to capture fine-grained continuous vocal traits like breathiness, and cause severe ASV performance drops (e.g., EER jumping from 2.3% to 17.0%). Meanwhile, intrinsic sparse binary representations from text-inspired sparse autoencoders fail to align with how human listeners perceive continuous, low-dimensional human voice characteristics.

## Method

LISE takes a pretrained speaker embedding $e \in \mathbb{R}^d$ (such as 512-dim x-vectors or 192-dim ECAPA-TDNN) and decomposes it post-hoc into $K$ components without retraining the backbone encoder. Given a component matrix $W \in \mathbb{R}^{d \times K}$ and non-negative weights $c \in \mathbb{R}^K$, the speaker representation is reconstructed via non-negative least squares coupled with an orthogonality regularization term using a hyperparameter $\lambda = 0.05$.

The framework intentionally enforces three structural constraints: (1) low dimensionality ($K \ll d$, optimized at $K=35$) to capture continuous voice variation rather than thousands of sparse binary activations; (2) non-negative additive weights ($c \ge 0$) to eliminate ambiguous subtractive interactions and enable gradual perceptual scaling; and (3) orthogonality of the component matrix $W$ to reduce redundancy and ensure distinct, independent axes of variation.

The system is trained using 5,994 speaker embeddings from the VoxCeleb2 training set (approx. 1.1M utterances averaged per speaker) over 200 epochs on a single NVIDIA 2080Ti GPU. At inference, the learned component weights $c$ serve as an interpretable representation that can directly condition downstream models like SpeechT5 for controllable voice synthesis prototypes.

## Experimental setup

Evaluated on the VoxCeleb1-O test set using Equal Error Rate (EER) via cosine similarity on reconstructed embeddings. Compared against three baselines: Principal Component Analysis (PCA), Luu et al. (attribute-supervised adversarial training), and Iben et al. (high-dimensional binary embeddings). Human perceptual evaluation involved 25 participants with self-reported normal hearing performing a 95-judgment discrimination task per method across 35 components.

## Results

On VoxCeleb1-O, LISE achieves an EER of 3.08% for x-vectors (vs. 2.30% original, 3.02% PCA, 3.34% Iben et al., and 6.70% Luu et al.) and 2.10% for ECAPA-TDNN (vs. 1.80% original, 3.28% PCA, and 2.50% Iben et al.). Reducing the training data to 75% and 50% only slightly degrades EER to 3.13% and 3.23% for x-vectors, and 2.15% and 2.18% for ECAPA-TDNN, demonstrating high data efficiency.

In human listening evaluations, LISE achieves an overall accuracy of 83.9%, substantially outperforming PCA (59.1%) and Iben et al. (49.0%). Furthermore, 94.2% of LISE's components exceed a 70% listener accuracy threshold (compared to 11.4% for PCA and 0% for Iben et al.), and participant consistency remains high with individual listener accuracies tightly clustered between 73.7% and 91.6%.

| System / Condition | x-vector EER (%) ↓ | ECAPA-TDNN EER (%) ↓ | Listening Accuracy (%) ↑ |
|---|---|---|---|
| Original Embeddings | 2.30 | 1.80 | — |
| Luu et al. [12] | 6.70 | — | — |
| Iben et al. [14] | 3.34 | 2.50 | 49.0 |
| PCA | 3.02 | 3.28 | 59.1 |
| LISE (Ours, Full Data) | 3.08 | 2.10 | 83.9 |
| LISE (Ours, 50% Data) | 3.23 | 2.18 | — |

## Limitations

The framework assumes English-dominant data (VoxCeleb), resulting in a small fraction of components (3 out of 35) capturing language patterns instead of speaker-intrinsic vocal features. The current evaluation relies on a post-hoc decomposition of static speaker-level averages rather than end-to-end training or real-time utterance-level temporal streaming. Subjective listener studies were constrained to 25 participants evaluating 35 components.

## Why read this

Speech researchers and ML engineers looking to unpack opaque speaker embeddings into human-interpretable axes without sacrificing verification performance will find this a foundational read. It provides a concrete blueprint for combining non-negative continuous decomposition with rigorous perceptual listening validation.

## Code

- https://sites.google.com/view/components-samples/home

## Applications

Controllable text-to-speech voice synthesis, model bias diagnosis, speaker embedding visualization, and auditory voice analysis.

## Institutions / 機構

University of Southampton, Hong Kong Polytechnic University, University of Edinburgh

**Funding / 經費:** Engineering and Physical Sciences Research Council, National Edge AI Hub for Real Data: Edge Intelligence for Cyberdisturbances and Data Quality, Responsible AI UK

## Related

- (link related pages by id as the wiki grows)
