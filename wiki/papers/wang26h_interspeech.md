---
id: wang26h_interspeech
category: speaker
institutions: ["Tianjin University", "Tianjin Renai College", "Tianjin University of Technology", "Tianjin Beiyang Rongke Intelligent Technology Co., Ltd"]
code: https://github.com/BKB00001/GMOD
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-432
pdf: https://www.isca-archive.org/interspeech_2026/wang26h_interspeech.pdf
---

# GMOD: Voice-Face Association Learning via Graph Mining and Orthogonal Disentanglement

*Jianrong Wang, Kaibin Bi, Jinghui Li, Ju Zhang, Qi Li, Ying Guo, Jing Zhao*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-432)

**Category:** `speaker`

**TL;DR** — GMOD is an unsupervised voice-face association framework that uses global graph mining with curriculum learning and orthogonal feature disentanglement to mitigate false-negative conflicts. It achieves a state-of-the-art verification AUC of 87.73% on VoxCeleb1 without leveraging ground-truth identity labels during training.

## Key contributions

- Identifies and analyzes the dual challenges in unsupervised voice-face association: false-negative conflicts from cross-video same-speaker samples and modality attribute entanglement.
- Proposes a graph-guided multi-positive contrastive learning mechanism that employs a voice-to-face global similarity graph to discover latent positive samples.
- Introduces a curriculum learning strategy for the graph's neighborhood size k, decaying it linearly from 20 to 8 to balance recall and precision over training epochs.
- Designs an orthogonal feature disentanglement module with self-reconstruction to explicitly isolate cross-modal shared identity features from modality-private noise.

## Problem

Unsupervised voice-face association methods often suffer from false-negative conflicts, where speech and face segments belonging to the same speaker across different videos are mistakenly treated as negatives by instance-level contrastive learning. Prior strategies like PINs, SL, and CMPC rely heavily on heuristics, iterative clustering, or coarse prototypes that struggle with complex local identity distributions during early training stages. Additionally, the inherent heterogeneity between audio and visual modalities leads to the entanglement of modality-private attributes into the shared embedding space, interfering with clean cross-modal alignment. Resolving these issues is critical for building robust open-set biometric retrieval systems without relying on expensive human-annotated identity labels.

## Method

GMOD processes audio and visual inputs through parallel encoders that split representations into a shared identity subspace (z_id) and a private subspace (z_n). To guarantee semantic independence, a soft orthogonality constraint minimizes squared cosine similarity between these two subspaces, while a modality-specific decoder computes a mean squared error (MSE) self-reconstruction loss to prevent information collapse.

To capture global manifold structures and mine latent positives, video-level embeddings are constructed by applying L2-normalized average pooling over individual utterances and face frames. A global cross-modal similarity matrix S is computed from voice-to-face dot products, from which k-nearest neighbor (k-NN) face sets are retrieved for each voice anchor, followed by backfilling face-to-voice links. A curriculum learning schedule dynamically decreases k from 20 to 8 over the first 20 epochs to prioritize broad recall early and high precision later. The expanded positive sets are optimized using a Multi-Positive InfoNCE (MPInfoNCE) loss employing a LogSumExp numerator.

The overall training objective is a weighted sum of the MPInfoNCE loss, the orthogonality penalty (weighted by lambda_o = 0.1), and the reconstruction loss (weighted by lambda_rec = 1.0). The model is optimized using the Adam optimizer with a learning rate of 10^-4 and a batch size of 256 for 200 epochs.

## Experimental setup

Experiments are conducted on the VoxCeleb1 dataset comprising 1,251 speakers (901 for training, 100 for validation, and 250 for test), featuring 153,516 speech utterances and 1,217,558 face images, treated strictly under an unsupervised setting. The framework uses ECAPA-TDNN and FaceNet as encoders for speech and face modalities, respectively. Performance is evaluated using Area Under the Curve (AUC) for verification, matching accuracy (ACC) for 1:2 and 1:N matching, and mean Average Precision (mAP) for cross-modal retrieval.

## Results

GMOD establishes new state-of-the-art performance among unsupervised approaches on VoxCeleb1, achieving a verification AUC of 87.73% (unconstrained) and 77.37% (gender-constrained). In 1:2 matching accuracy, it reaches 87.04% for V2F and F2V unconstrained configurations, while yielding leading cross-modal retrieval mAP scores of 7.14% (V2F) and 7.59% (F2V). Ablation studies demonstrate that removing the orthogonal disentanglement and reconstruction loss drops performance, and using fixed neighborhood sizes (k=8 or k=20) underperforms compared to the curriculum decay strategy due to either cold-start representation collapse or sustained late-stage noise.

| System | Verification AUC (U) | 1:2 Match V2F (U) | Retrieval mAP (V2F) |
|---|---|---|---|
| Pins (UN) | 83.81 | 84.37 | 4.55 |
| SL (UN) | 87.02 | 86.54 | 6.44 |
| CMPC (UN) | 86.82 | 85.40 | 6.24 |
| GMOD w/o Graph | 87.26 | 86.30 | 6.71 |
| GMOD w/o O&R | 87.55 | 87.05 | 6.92 |
| GMOD (Ours) | 87.73 | 87.04 | 7.14 |

## Limitations

The evaluation is restricted solely to the English/Western-centric VoxCeleb1 dataset, leaving the model's cross-lingual and cross-cultural generalization unproven. The paper does not address compute scaling requirements or training time overheads introduced by global graph construction across large datasets. Furthermore, the reliance on pre-extracted feature networks (ECAPA-TDNN and FaceNet) means downstream performance is inherently bounded by the quality of these frozen or co-optimized upstream representations.

## Why read this

Researchers working on unsupervised cross-modal representation learning or biometric retrieval should read this paper to see how curriculum-guided graph mining can effectively solve false-negative conflicts without clustering. It provides clear architectural blueprints for decoupling shared identity spaces from modality-private noise using soft orthogonality and self-reconstruction constraints.

## Code

- https://github.com/BKB00001/GMOD

## Applications

Cross-modal biometric matching, speaker-face verification pipelines, and open-set multimedia retrieval systems.

## Institutions / 機構

Tianjin University, Tianjin Renai College, Tianjin University of Technology, Tianjin Beiyang Rongke Intelligent Technology Co., Ltd

**Funding / 經費:** Key R&D Program of the Nanning Science Research and Technology Development Plan, Tianjin Science and Technology Program, Special Project for High-Quality Development of Manufacturing Industry

## Related

- [Adapting Audio Large Language Models for Speaker Verification](ren26c_interspeech.md) — same problem · relatedness 2.2/3
- [Self-supervised Speaker Verification with High-Confidence Pseudo-Label Selection and DINO-Style Self-Distillation Based on Pre-trained Models](li26ca_interspeech.md) — same problem · relatedness 2.2/3
- [Learning Multiple Utterance-Level Attribute Representations with a Unified Speech Encoder](bouziane26_interspeech.md) — same problem · relatedness 2.1/3
- [Learning task-specific subspaces via interventional post-training of speech foundation models](cox26_interspeech.md) — same problem · relatedness 2.1/3
- [Dual-Granularity Orthogonal Disentanglement for Generalizable Audio Deepfake Detection](liu26g_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
