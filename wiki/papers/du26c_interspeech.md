---
id: du26c_interspeech
category: speaker
labels: [multilingual, self-supervised]
institutions: ["Beijing Fosafer Information Technology Co., Ltd", "University of Electronic Science and Technology of China", "Institute of Forensic Science, Ministry of Public Security"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3003
pdf: https://www.isca-archive.org/interspeech_2026/du26c_interspeech.pdf
---

# Orthogonal Feature Projection and Manifold-Constrained Neural PLDA for the TidyVoice2026 Cross-Lingual Speaker Verification Challenge

*Yuxuan Du, Xing He, Jingwen Yang, Xupeng Jia, Yankai Wang, Weili Jiang, Kai Gao, Boyu Zhao, Rong Zheng, Jing Deng*

[PDF](https://www.isca-archive.org/interspeech_2026/du26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/du26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3003)

**Category:** `speaker` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — The winning entry for the TidyVoice2026 Cross-lingual Speaker Verification Challenge uses geometric orthogonal feature projection to decouple self-supervised features and a manifold-constrained neural PLDA backend to achieve EERs of 1.39% and 1.95% across the two test tracks.

## Key contributions

- Proposed an orthogonal feature projection fusion method using Gram-Schmidt orthogonalization to strip redundant linguistic interference from WavLM representations while preserving speaker identity cues.
- Designed a manifold-constrained neural PLDA that reduces the scoring matrix parameter degrees of freedom from O(d^2) to O(d) while adhering to generative probabilistic constraints during discriminative optimization.
- Introduced a dynamic hard sample mining strategy focused on hard cross-lingual targets and hard mono-lingual non-targets to suppress linguistic bias in multilingual verification.
- Established a multi-stage training pipeline leveraging up to 600,000 extended speakers and curriculum learning to yield a top-performing ASV submission among 42 competing teams.

## Problem

Mainstream automatic speaker verification (ASV) training largely ignores language imbalance, causing models to entangle linguistic cues with speaker identities and severely limiting cross-lingual generalization. Traditional back-end scoring relies on cosine similarity or unconstrained neural PLDA, which discards rigorous mathematical generative constraints and overfits on limited data. This vulnerability to language-specific interference degrades biometric verification accuracy when speakers switch languages or are evaluated across diverse linguistic environments.

## Method

The front-end backbone utilizes a ResNet221 architecture ([6, 16, 48, 3] bottleneck block configuration) with multi-query multi-head attention (MQMHA) pooling, trained using AAM-Softmax loss with sub-center and Inter-topK penalty strategies. Self-supervised WavLM Base+ embeddings are aligned via a linear projection layer and decoupled using Gram-Schmidt orthogonalization into a parallel component (redundant speaker info) and an orthogonal component (complementary deep representations). The orthogonal component passes through a bottleneck transformation network (tanh activation, scaling via a zero-initialized learnable scalar gating coefficient lambda) and adds to the supervised speaker vector via a residual connection.

The back-end features a manifold-constrained neural PLDA. Instead of directly learning scoring matrices P and Q, it learns a parameter set Theta = {mu, A, psi}, where A is a simultaneous diagonalization matrix and psi is a diagonalized between-class eigenvalue vector. This reduces the degrees of freedom from O(d^2) to O(d). A dynamic hard sample mining strategy generates 500,000 balanced pairs per epoch by selecting the lowest-scoring cross-lingual same-speaker pairs and highest-scoring mono-lingual different-speaker pairs. Training employs Binary Cross-Entropy loss, followed by Adaptive Score Normalization (AS-Norm) using the top 200 imposter scores and linear score-level fusion.

## Experimental setup

The system uses three datasets: a Base Dataset of 200,000 speakers (VoxCeleb, VoxBlink, CN-Celeb), an Extended Dataset of 600,000 speakers, and a Multilingual Dataset combining the challenge training set, proprietary data, and 10,000 language-identified speakers. Models are optimized using SGD with momentum 0.9 and weight decay 1e-4. Evaluation metrics include Equal Error Rate (EER %) and minimum Decision Cost Function (minDCF).

## Results

The official challenge baseline (S0) yielded an EER of 3.07% (Dev), 9.06% (Test 1), and 11.60% (Test 2). The pre-trained ResNet model (S1) achieved 1.29% (Dev), 3.56% (Test 1), and 4.69% (Test 2). Adding orthogonal feature projection (S2) reduced dev EER to 1.07%, manifold-constrained PLDA (S3) lowered it to 0.79%, hard sample mining (S4) reached 0.72%, and AS-Norm (S5) attained 0.64% dev EER, 1.55% (Test 1), and 2.22% (Test 2). The final score fusion system (S6) achieved a dev EER of 0.56%, alongside 1.39% EER (minDCF 0.10) on Test 1 and 1.95% EER (minDCF 0.06) on Test 2, taking 1st place.

| Sys. | Method | Dev EER (%) | Test 1 EER (%) | Test 2 EER (%) |
|---|---|---|---|---|
| S0 | Baseline | 3.07 | 9.06 | 11.60 |
| S1 | Pre-trained ResNet model | 1.29 | 3.56 | 4.69 |
| S2 | S1 + Orthogonal Feature Projection | 1.07 | - | - |
| S3 | S2 + Manifold-Constrained PLDA | 0.79 | - | - |
| S4 | S3 + Hard Sample Mining | 0.72 | - | - |
| S6 | Final Score Fusion | 0.56 | 1.39 | 1.95 |

## Limitations

The approach relies heavily on large-scale proprietary datasets (up to 600,000 speakers) for robust feature extraction and PLDA training, which may limit reproducibility for researchers lacking industrial data resources. The evaluation focuses specifically on the TidyVoice2026 challenge tracks, leaving cross-domain robustness under extreme acoustic noise or unseen whispering/impersonation attacks untested.

## Why read this

Speech researchers and biometric security engineers should read this paper to learn how to algebraically constrain neural PLDA backends and geometrically decouple self-supervised features for language-agnostic speaker verification.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual automatic speaker verification, multilingual voice biometrics, and secure access control systems operating across diverse linguistic populations.

## Institutions / 機構

Beijing Fosafer Information Technology Co., Ltd, University of Electronic Science and Technology of China, Institute of Forensic Science, Ministry of Public Security

**Funding / 經費:** Basic Scientific Research Special Funds for Central-level Public Welfare Research Institutions

## Related

- [Cross-Lingual Speaker Verification with Self-Supervised Pre-Trained Models](peng26f_interspeech.md) — same problem · relatedness 3.0/3
- [LaS-LCA: Layer-Selected Latent Cross-Attention Adapters and Margin-Mixup for Robust Cross-Lingual Speaker Verification](shen26b_interspeech.md) — same problem · relatedness 3.0/3
- [Language-Invariant Multilingual Speaker Verification for the TidyVoice 2026 Challenge](li26fa_interspeech.md) — same problem · relatedness 3.0/3
- [Dual-LoRA: Parameter-Efficient Adversarial Disentanglement for Cross-Lingual Speaker Verification](shangguan26_interspeech.md) — same problem · relatedness 3.0/3
- [Effectiveness of Language Variability Compensation in Speaker Verification](mosner26_interspeech.md) — same problem · relatedness 2.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
