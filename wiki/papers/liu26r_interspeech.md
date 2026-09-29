---
id: liu26r_interspeech
category: paralinguistics-emotion
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2388
pdf: https://www.isca-archive.org/interspeech_2026/liu26r_interspeech.pdf
---

# P-SED : Asymmetric Prototype Metric Learning for Weakly Supervised Speech Emotion Diarization

*Yumeng Liu, Yukun Sun, Jian Peng, Lixu Sun, Nurmemet Yolwas*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2388)

**Category:** `paralinguistics-emotion`

**TL;DR** — P-SED is a weakly supervised speech emotion diarization framework that uses learnable orthogonal emotion prototypes, class-aware contrastive loss, and Top-K salient instance mining to achieve fine-grained temporal emotion localization using only utterance-level labels, reaching a 47.00% EDER on the ZED dataset.

## Key contributions

- Constructs a learnable emotion prototype metric space with full pairwise orthogonal regularization to enhance inter-class separability and prevent neutral-dominant collapse.
- Proposes a bag-level asymmetric optimization loss (CPCL) and a frame-level Top-K salient instance mining mechanism to suppress background neutral interference under weak supervision.
- Applies Total Variation Denoising (TVD) during inference to eliminate high-frequency prediction jitter while preserving sharp emotion transition boundaries.
- Demonstrates state-of-the-art weakly supervised performance on the ZED benchmark dataset compared to traditional frame-wise and lattice-max-pooling baselines.

## Problem

Mainstream speech emotion recognition focuses on static, utterance-level predictions, ignoring the continuous temporal dynamics of real-world interactions. Speech emotion diarization (SED) addresses this but is severely bottlenecked by the extreme scarcity of frame-level annotated data (e.g., the public ZED dataset contains only ~17 minutes of speech). Existing weakly supervised approaches treat SED as multiple instance learning, but lattice-max-pooling models like ENT and FENT suffer from supervision signals dominated by isolated salient frames, whereas global frame mapping techniques introduce severe label noise from neutral background regions and transition pauses. This mismatch causes poor temporal boundary localization and high classification confusion.

## Method

The P-SED framework processes raw audio through a pre-trained WavLM-Large backbone followed by a projection head that maps representations onto a unit hypersphere via L2-normalization, generating frame-level embeddings Z with a dimension of dz=128. Frame logits are computed using cosine similarity against K learnable emotion prototypes (including a neutral anchor), governed by a temperature parameter τ annealed from 0.5 to 0.1. To mitigate neutral-dominant collapse, an orthogonal regularization constraint enforces full pairwise separation among prototype vectors.

The training objective combines a Class-aware Prototype Contrastive Loss (CPCL) operating at the bag level—treating neutral bags with standard cross-entropy and emotion bags with a binary contrastive formulation between the target emotion and neutrality using dynamic pseudo-labels (Δlt > 0)—alongside a Top-K ranking loss that enforces a margin constraint on the top p=0.6 proportion of salient frames. An auxiliary SER branch using weighted pooling computes utterance-level cross-entropy to regularize feature extraction. Total optimization merges these terms with dynamically scaled orthogonal and ranking weights.

During inference, Total Variation Denoising (TVD) is applied independently to each emotion category's probability sequence using L1 edge-preserving regularization solved via the primal-dual algorithm. Row-wise normalization is performed at each time step to maintain valid probability distributions before argmax decoding yields the final frame-level emotion sequence.

## Experimental setup

The model is trained on the IEMOCAP dataset (Sessions 1-4 for training, Session 5 for validation; subset of Happy, Angry, Sad, Neutral) using global utterance-level labels, and evaluated on the ZED dataset as a hold-out test set containing precise frame-level annotations. Evaluation is performed using the Emotion Diarization Error Rate (EDER) metric, which accounts for false alarms, missed emotions, confusion, and overlaps. Implementation uses a single NVIDIA A40 GPU, AdamW optimizer (peak LR 5e-4, weight decay 0.05), batch size 8, automatic mixed precision, and a 50-epoch training schedule with a frozen WavLM-Large backbone for the first 5 epochs.

## Results

Without post-processing, P-SED (RAW) achieves an EDER of 50.67%, outperforming the best baseline FENT (54.37%) by 3.7%. Incorporating standard post-processing techniques like Moving Average (MA) and Global Exponential Pooling (GEP) yields 49.60% and 48.38% EDER respectively, whereas the proposed TVD post-processing achieves the headline EDER of 47.00%. Ablation studies confirm the necessity of each component: replacing prototypes with a linear classifier increases EDER to 53.95%, dropping the orthogonal constraint results in 52.82%, removing CPCL gives 53.62%, and removing the Top-K ranking loss degrades performance to 54.60%.

| System / Condition | Post-Processing | EDER (%) ↓ |
|---|---|---|
| Frame-wise Baseline | × | 56.52 |
| ENT [9] | × | 55.16 |
| FENT [9] | × | 54.37 |
| P-SED (RAW) | Joint (×) | 50.67 |
| P-SED + GEP | GEP | 48.38 |
| P-SED + TVD (Ours) | TVD | **47.00** |

## Limitations

The fixed-ratio instance mining mechanism (Top-K with p=0.6) struggles to adapt to highly variable and rapidly fluctuating emotional transitions found in unscripted conversations. Additionally, the small scale of the available frame-annotated evaluation set (ZED) restricts comprehensive evaluation of model generalization across diverse acoustic domains and broader language coverage.

## Why read this

Researchers working on weakly supervised temporal segmentation, multiple instance learning for speech, or fine-grained affective computing will find a rigorous formulation combining prototype metric learning with total variation denoising. It provides concrete recipes for overcoming background dominance in sequential weak labels without expensive frame-level annotations.

## Code

- https://github.com/LiuYumeng-Lemon/P-SED

## Applications

Mental health monitoring, real-time affective agents, conversational AI, and intelligent customer service quality analysis.

## Institutions / 機構

Xinjiang University

## Related

- (link related pages by id as the wiki grows)
