---
id: he26f_interspeech
category: deepfake-security
labels: [efficient-on-device, self-supervised]
institutions: ["Zhejiang University", "Hangzhou High-Tech Zone (Binjiang) Institute of Blockchain and Data Security", "Shanghai Institute for Advanced Study", "China University of Petroleum (East China)"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1766
pdf: https://www.isca-archive.org/interspeech_2026/he26f_interspeech.pdf
---

# Task-Aware Joint Pruning and Distillation for Efficient Audio Deepfake Detection

*Miao He, Peng Cheng, Zhongjie Ba, Qing Wen, Li Lu, Xin Yang, Kui Ren*

[PDF](https://www.isca-archive.org/interspeech_2026/he26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/he26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1766)

**Category:** `deepfake-security` · **Labels:** `efficient-on-device`, `self-supervised`

**TL;DR** — This paper introduces a task-aware joint pruning and distillation framework to compress large self-supervised speech models for on-device deepfake detection, achieving a 10x parameter reduction (31.9M) with only a 1.30% average performance drop.

## Key contributions

- Proposes a cross-domain knowledge distillation strategy utilizing unlabeled out-of-domain data with various acoustic and codec variations to prevent compression-induced generalization loss.
- Introduces movement-guided structured pruning that leverages fine-tuning weight movement scores as a structural importance prior to safeguard forgery-critical sub-networks.
- Applies CKA (Centered Kernel Alignment) layer similarity analysis to identify optimal multi-level representative layers for hierarchical knowledge transfer across Transformer blocks.
- Demonstrates aggressive compression of the 317M parameter XLSR-AASIST model down to 31.9M parameters and 23.3G FLOPs (90% sparsity) while preserving out-of-domain robustness.

## Problem

State-of-the-art audio deepfake detectors rely heavily on self-supervised learning (SSL) backbones exceeding 300 million parameters, restricting them to cloud-only inference which introduces network latency and serious user privacy risks. Existing compression techniques are predominantly engineered for content-centric tasks like automatic speech recognition or speaker verification, leading to catastrophic out-of-domain performance drops and poor generalization when directly applied to forgery detection. Furthermore, existing compressed models degrade severely at high sparsity levels (>75%) due to the loss of subtle artifact-capturing capabilities.

## Method

The framework operates in three main stages: task-specific preparation, joint pruning and distillation, and backend optimization. First, the pretrained XLS-R (0.3B) model is fine-tuned on ASVspoof2019 LA, during which structural movement scores are calculated as the L1 norm of the weight changes between initialization and fine-tuning ($\theta^{ft} - \theta^{init}$). A penalty regularization term with binary retention masks is then minimized to prune low-movement units while retaining critical structures in Multi-Head Attention (MHA) layers, FFN intermediates, and CNN channels.

Concurrently, multi-level cross-domain knowledge distillation is applied using unlabeled out-of-domain datasets (ASVspoof2021 LA, 21 DF, and In-the-Wild) to expose the student model to diverse codec and environmental distortions. Guided by Centered Kernel Alignment (CKA) layer-wise similarity analysis—which reveals three block-like processing stages—representative layers (specifically layers 5, 14, and 24) are chosen for feature matching using MSE or cosine distance losses. The final constrained multi-objective optimization objective enforces target sparsity via the Augmented Lagrangian method with Lagrangian multipliers, after which the pruned student model is jointly fine-tuned with the AASIST backend classifier.

## Experimental setup

The method compresses the XLS-R (0.3B) frontend within the XLSR-AASIST baseline architecture. Datasets used include ASVspoof2019 LA for fine-tuning, ASVspoof2019 LA train, 2021 LA, 2021 DF, and In-the-Wild (unlabeled) for distillation, and evaluations span ASVspoof2019 LA (Dev/Eval), ASVspoof2021 LA, ASVspoof2021 DF, In-the-Wild, ASVspoof5, and FoR. Baselines include HJ-Pruning, Finetune-Pruning, and Hybrid-Pruning adapted to deepfake detection. The student is trained for 50k steps with a 5k warmup for target sparsity, learning rates of 2e-4 for model parameters and 2e-2 for auxiliary parameters, followed by 25k steps of secondary distillation.

## Results

At 75% sparsity, the proposed framework achieves an EER of 8.43% on In-the-Wild and 17.75% on ASVspoof5, outperforming the second-best baseline (Finetune-Pruning) by 67% and 32% respectively. Remarkably, at 75% sparsity, the compressed model outperforms the uncompressed dense baseline on unseen datasets like ASVspoof5 (17.75% vs 19.92% EER) and FoR (10.51% vs 14.89% EER), demonstrating that structural pruning acts as a regularizer preventing source-domain overfitting. At an aggressive 90% sparsity (31.9M parameters, 23.3G FLOPs), the model maintains an average performance drop of only 1.30% across multiple benchmarks.

Ablation studies at 75% sparsity reveal that removing cross-domain distillation triggers catastrophic degradation on out-of-domain sets, driving In-the-Wild EER from 8.43% up to 25.84% and ASVspoof2019 LA from 3.03% to 10.14%. Removing movement-guided pruning moderately degrades performance on complex high-fidelity benchmarks like ASVspoof5 (17.75% to 19.95%) and FoR (10.51% to 13.56%), confirming its efficacy in preserving hard-to-detect forgery artifacts under high compression.

| Systems / Conditions | Sparsity | #Params | FLOPs | 19LA Eval EER% | 21DF EER% | ASV5 EER% |
|---|---|---|---|---|---|---|
| XLSR-AASIST (Dense) | 0% | 317 M | 146.3 G | 0.14 | 3.09 | 19.92 |
| Finetune-Pruning [20] | 75% | 79.0 M | 43.7 G | 0.38 | 8.23 | 26.13 |
| Hybrid-Pruning [21] | 75% | 78.1 M | 50.3 G | 13.19 | 30.50 | 44.73 |
| **Ours** | 75% | 79.2 M | 43.9 G | **0.22** | **2.76** | **17.75** |
| **Ours** | 90% | 31.9 M | 23.3 G | **0.30** | **3.78** | **20.16** |

## Limitations

The cross-domain distillation strategy is fundamentally bounded by the teacher model's error rate on unlabeled out-of-domain data, making further gains difficult when teacher confidence is low. The framework was exclusively validated on the XLS-R architecture and AASIST backend, leaving cross-architecture portability unverified. Furthermore, the study does not evaluate scaling to ultra-large speech SSL backbones like XLS-R-2B.

## Why read this

Speech and ML engineers looking to deploy high-performance SSL-based audio deepfake detectors onto resource-constrained edge hardware will find this a definitive recipe. It provides concrete structural insights into how Transformer FFN, MHA, and CNN blocks behave under aggressive pruning when paired with multi-domain distillation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device audio deepfake detection, real-time voice cloning countermeasures for mobile operating systems, secure telephony fraud prevention, and edge-based speaker verification guardrails.

## Institutions / 機構

Zhejiang University, Hangzhou High-Tech Zone (Binjiang) Institute of Blockchain and Data Security, Shanghai Institute for Advanced Study, China University of Petroleum (East China)

**Funding / 經費:** Shanghai Municipal Special Program for Basic Research on General AI Foundation Models, National Natural Science Foundation of China, Zhejiang Provincial Natural Science Foundation of China

## Related

- [SpAArSIST: Sparsified AASIST for Efficient and Reliable Anti-Spoofing](firc26b_interspeech.md) — same problem · relatedness 2.6/3
- [Mixture of Spectral Experts for Audio Deepfake Detection](qiu26_interspeech.md) — same problem · relatedness 2.5/3
- [ADD-DINO: A Two-Stage Self-Distillation Framework for Audio Deepfake Detection](sun26g_interspeech.md) — same problem · relatedness 2.5/3
- [Dual-Granularity Orthogonal Disentanglement for Generalizable Audio Deepfake Detection](liu26g_interspeech.md) — same problem · relatedness 2.4/3
- [Deepfake Word Detection by Next-token Prediction using Fine-tuned Whisper](tran26_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
