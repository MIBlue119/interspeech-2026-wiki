---
id: qin26_interspeech
category: speech-deepfake-detection
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1042
pdf: https://www.isca-archive.org/interspeech_2026/qin26_interspeech.pdf
---

# DGS-MLDG: Domain Gradient Surgery Guided Meta-Learning for Domain Generalization in Speech Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/qin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/qin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1042)

**TL;DR** — The paper introduces Domain Gradient Surgery Guided Meta-Learning (DGS-MLDG) to resolve gradient conflicts between meta-train and meta-test objectives in speech deepfake detection, achieving an average relative EER reduction of 5.29%.

## Problem

Speech deepfake detectors frequently fail in real-world scenarios due to domain shifts caused by unseen attack types and transmission conditions. While meta-learning domain generalization (MLDG) simulates these domain shifts during training, it suffers from severe gradient conflicts where meta-train and meta-test gradients point in opposite directions. Naive gradient aggregation cancels out these updates, leading to destructive optimization and unstable cross-domain performance.

## Method

The framework utilizes an XLSR pre-trained acoustic backbone followed by BiMamba projection layers and a prediction head. To resolve gradient conflicts during bi-level meta-optimization, Domain Gradient Surgery (DGS) uses an asymmetric projection strategy that projects the conflicting meta-test gradient onto the normal plane of the meta-train gradient, preserving essential domain-specific adaptation knowledge. Additionally, an efficient layer-wise variant (LW-DGS) dynamically monitors cosine similarities at the layer level and intervenes exclusively on conflict-prone normalization and early SSL layers. The training recipe leverages 22 source domains from ASVspoof 2019 LA, ASVspoof 5, and CFAD datasets, augmented with RawBoost, using the Adam optimizer with a batch size of 12 for weighted cross-entropy loss.

## Results

Evaluated across datasets including ASV21, ASV5, CFAD, ADD2023 (R1 and R2 sets), In-the-wild, and CodecFake, DGS-MLDG achieves a 5.29% average relative EER reduction compared to the empirical risk minimization (ERM) baseline, outperforming multi-task gradient surgery baselines like PCGrad, GradVac, and CAGrad. LW-DGS-MLDG achieves a comparable 4.04% relative EER reduction while operating more efficiently. Ablation studies confirm that anchoring the projection to the meta-train gradient outperforms reverse projection, and applying layer-wise monitoring across the entire model architecture outperforms restricting surgery solely to the SSL backbone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing robust automated speaker verification systems and secure speech applications against deepfake attacks, synthesis models, and codec artifacts.

## Related

- (link related pages by id as the wiki grows)
