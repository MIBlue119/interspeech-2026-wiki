---
id: qin26_interspeech
category: deepfake-security
labels: [robustness-noise]
institutions: ["Hong Kong Polytechnic University", "Nanyang Technological University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1042
pdf: https://www.isca-archive.org/interspeech_2026/qin26_interspeech.pdf
---

# DGS-MLDG: Domain Gradient Surgery Guided Meta-Learning for Domain Generalization in Speech Deepfake Detection

*Siqing Qin, Kong Aik Lee, Youzhi Tu, Eng Siong Chng, Man-Wai Mak*

[PDF](https://www.isca-archive.org/interspeech_2026/qin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/qin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1042)

**Category:** `deepfake-security` · **Labels:** `robustness-noise`

**TL;DR** — This paper proposes Domain Gradient Surgery Meta-Learning (DGS-MLDG) and its layer-wise variant (LW-DGS-MLDG) to resolve gradient conflicts between meta-train and meta-test objectives in speech deepfake detection, achieving an average relative EER reduction of 5.29% over strong ERM baselines.

## Key contributions

- Identified and analyzed gradient conflict between meta-train and meta-test objectives as a primary performance bottleneck in MLDG-based speech deepfake detectors.
- Proposed Domain Gradient Surgery (DGS), an asymmetric projection strategy that removes destructive components from the meta-test gradient while anchoring to the meta-train gradient.
- Developed Layer-Wise DGS (LW-DGS), an efficient variant that monitors cosine similarity and dynamically applies surgery only to conflict-prone layers.
- Demonstrated consistent out-of-domain generalization improvements over ERM, standard MLDG, and symmetric multi-task gradient surgery baselines (PCGrad, GradVac, CAGrad).

## Problem

Speech deepfake detectors experience catastrophic performance degradation in real-world deployments due to domain shifts like unseen synthesis attacks, codec artifacts, and transmission noise. Standard empirical risk minimization (ERM) pooling strategies fail to model domain structures explicitly. Although meta-learning domain generalization (MLDG) simulates domain shifts via meta-train and meta-test splits, naive gradient aggregation (NGA) causes destructive gradient cancellation because the opposing objectives frequently point in opposite directions. Symmetric multi-task methods like PCGrad are inadequate for bi-level meta-learning optimization, making principled directional projection necessary.

## Method

The architecture combines an XLSR self-supervised learning (SSL) frontend, a linear projection layer, and a Bidirectional Mamba (BiMamba) classification head. MLDG splits source domains into meta-train (inner adaptation, loss L_mtr) and meta-test (generalization evaluation, loss L_mte) partitions.

During training, DGS computes the cosine similarity between meta-train gradients (F = nabla L_mtr) and meta-test gradients (G = nabla L_mte). If the inner product is negative (langle G, F rangle < 0), DGS treats F as an invariant anchor and projects G onto the normal plane of F: G_proj = G - ((langle G, F rangle) / (||F||^2 + epsilon)) * F. This ensures a conflict-free optimization trajectory (langle G_proj, F rangle >= 0) while keeping the domain-specific meta-train gradient intact.

Because global surgery is computationally heavy for 300M+ parameter backbones, LW-DGS performs independent, layer-wise conflict detection and dynamic surgery per parameter tensor theta_k using layer-level cosine similarity. Training uses the Adam optimizer with an outer learning rate of 10^-6, inner learning rate of 10^-2, batch size of 12, weight decay of 10^-4, and meta-test weighting beta = 0.5. Audio is cropped/concatenated to 4 seconds (64,600 samples) with RawBoost data augmentation.

## Experimental setup

Trained on three datasets: ASVspoof 2019 LA (6 attack types), ASVspoof 5 (8 attack types), and CFAD (8 attack types), creating 22 distinct source domains. Evaluated on in-dataset benchmarks (ASVspoof 2021 DF, ASVspoof 5 test) and cross-dataset benchmarks (ADD 2023 R1 and R2, In-the-wild, CodecFake, and CFAD unseen test). Compared against ERM, standard MLDG, PCGrad, GradVac, and CAGrad using Equal Error Rate (EER) and average relative EER reduction.

## Results

DGS-MLDG achieves the lowest cross-dataset EERs across nearly all benchmarks, yielding an average relative EER reduction of 5.29% over the ERM baseline. On the challenging In-the-wild dataset, DGS-MLDG lowers EER from 6.71% (ERM) and 6.47% (MLDG) down to 5.23%, and on CodecFake from 7.66% down to 6.76%. The layer-wise LW-DGS-MLDG variant achieves a comparable average relative improvement of 4.04% while operating selectively on sensitive layers. Symmetric multi-task baselines like PCGrad (6.17% on In-the-wild, 7.69% on CodecFake) and CAGrad underperform because they treat meta-train and meta-test objectives symmetrically and disrupt adaptation signals.

| Systems | ASV21 (%) | ADD2023 R1 (%) | In-the-wild (%) | CodecFake (%) | Avg. Rel. Imp. (%) |
|---|---|---|---|---|---|
| ERM | 0.92 | 19.16 | 6.71 | 7.66 | - |
| MLDG | 1.05 | 18.14 | 6.47 | 7.24 | 2.53 |
| + PCGrad | - | - | 6.17 | 7.69 | - |
| + GradVac | - | - | 6.34 | 7.40 | - |
| + CAGrad | - | - | 7.40 | 7.36 | - |
| DGS-MLDG (ours) | 1.00 | 17.76 | 5.23 | 6.76 | 5.29 |
| LW-DGS-MLDG (ours) | 1.02 | 17.88 | 6.15 | 7.27 | 4.04 |

## Limitations

The framework inherits the computational overhead characteristic of bi-level meta-learning optimization loops. Evaluation is constrained to speech deepfake detection datasets without scaling tests to massive open-world conversational audio streams. The interaction between layer-wise dynamic thresholds and diverse model backbones beyond XLSR-BiMamba requires further empirical validation.

## Why read this

Researchers working on domain generalization, multi-task optimization, or speech deepfake detection should read this paper to understand why symmetric gradient surgery fails in bi-level meta-learning and how an asymmetric anchor-based projection protects adaptation signals.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust automated speaker verification security wrappers and real-time deepfake speech filtering systems deployed against unseen codecs, synthesis algorithms, and in-the-wild acoustic environments.

## Institutions / 機構

Hong Kong Polytechnic University, Nanyang Technological University

**Funding / 經費:** Innovation and Technology Fund of the Hong Kong SAR, National Key R&D Program of China

## Related

- (link related pages by id as the wiki grows)
