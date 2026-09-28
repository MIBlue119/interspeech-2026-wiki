---
id: li26ca_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1965
pdf: https://www.isca-archive.org/interspeech_2026/li26ca_interspeech.pdf
---

# Self-supervised Speaker Verification with High-Confidence Pseudo-Label Selection and DINO-Style Self-Distillation Based on Pre-trained Models

[PDF](https://www.isca-archive.org/interspeech_2026/li26ca_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ca_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1965)

**TL;DR** — This paper proposes a self-supervised speaker verification method combining multi-layer clustering consistency from pre-trained models with DINO-style self-distillation, achieving an EER of 1.09% on VoxCeleb1-O.

## Problem

High-performance speaker verification typically relies on costly, large-scale labeled speech datasets, but obtaining them is hampered by growing privacy concerns and annotation expenses. While self-supervised learning utilizes unlabeled data, contrastive methods can suffer from false negatives, and pseudo-labeling frameworks are highly vulnerable to label noise. The challenge lies in extracting reliable supervision from hierarchical pre-trained models without sacrificing data efficiency or introducing erroneous labels.

## Method

The architecture integrates a pre-trained model sub-network (specifically the first 10 transformer layers of WavLM Large, selected via validation EER) with an ECAPA-TDNN downstream classifier, trained using an iterative framework. First, the top-K speaker-discriminative layers are clustered independently and aligned using Hungarian matching to isolate cross-layer consistent samples as high-confidence pseudo-labeled data, while treating the rest as unlabeled. High-confidence data is trained with a label noise correction loss, while unlabeled data undergoes augmentation into two views and is trained using a confidence-gated DINO-style knowledge distillation loss from an EMA teacher alongside an embedding-level cosine consistency loss. The full network is optimized via AdamW with cyclic learning rates across two training stages, followed by offline chunk-level label correction and iterative refinement.

## Results

Evaluated on the VoxCeleb2 dev set for training and tested on VoxCeleb1-O, the proposed method is compared against baselines such as MBPC, AT-HT, CA-DINO, LGL, and PTM-LC. In Iteration-1, the baseline S1 achieves 2.64% EER, whereas applying HCPLS with K=3 (system S3) improves this to 2.40% EER, and adding DINO-style self-distillation (system S5) brings the EER down to 2.10% (a 20.5% relative reduction). Ablations confirm that knowledge distillation is the primary contributor to unlabeled learning gains, with consistency loss providing stable regularization. Across iterative refinement, the system reaches a final EER of 1.09% and a corresponding MinDCF after 4 iterations, outperforming PTM-LC's 1.25% EER and IPL's 1.14% EER while requiring fewer iterations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers developing high-performance speaker verification or biometric identification systems under unlabelled data constraints.

## Limitations

The paper does not explicitly state notable limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
