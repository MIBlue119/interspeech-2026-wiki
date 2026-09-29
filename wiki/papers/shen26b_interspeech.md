---
id: shen26b_interspeech
category: speaker
labels: [multilingual, self-supervised]
institutions: ["Waseda University", "Wuhan University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1255
pdf: https://www.isca-archive.org/interspeech_2026/shen26b_interspeech.pdf
---

# LaS-LCA: Layer-Selected Latent Cross-Attention Adapters and Margin-Mixup for Robust Cross-Lingual Speaker Verification

*Xu Shen, Yihao Zhao, Xinwei Wu, Hao Liang, Yujie Zhu, Yujin Wang, Wei Liu, Gongping Huang, Shoji Makino*

[PDF](https://www.isca-archive.org/interspeech_2026/shen26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shen26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1255)

**Category:** `speaker` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — LaS-LCA adapts a frozen w2v-BERT 2.0 backbone using selective top-layer feature extraction, shared latent cross-attention, local 1D convolutions, and embedding-level margin-mixup, achieving an EER of 1.40% on the TidyVoiceX benchmark.

## Key contributions

- A strategic layer selection mechanism (LaS) identifying layers 19–24 of w2v-BERT 2.0 as optimal for isolating speaker traits from linguistic noise.
- A lightweight adapter architecture featuring a shared global latent array combined with local 1D convolutional feature transformations.
- An embedding-level margin-mixup strategy that interpolates latent embeddings and angular margins to prevent overfitting on limited cross-lingual data.
- State-of-the-art cross-lingual speaker verification results on the TidyVoiceX benchmark, substantially outperforming baseline SimAM-ResNet34 and full-layer SSL adapters.

## Problem

Cross-lingual speaker verification suffers severe performance drops due to language mismatch when enrollment and test utterances differ. Standard supervised models (e.g., SimAM-ResNet34) demand massive labeled multi-lingual corpora, while naive adaptation of self-supervised learning (SSL) models (like raw w2v-BERT 2.0) by aggregating all layers introduces identity-irrelevant linguistic noise and redundancy. This matters because real-world voice verification must operate robustly across diverse, unseen languages without requiring expensive cross-lingual labeled training sets.

## Method

The framework employs a frozen w2v-BERT 2.0 front-end pre-trained on 4.5 million hours across 143 languages, further initialized on VoxCeleb2 and VoxBlink2. Instead of utilizing all 24 layers, a layer selection strategy extracts outputs exclusively from layers 19-24, retaining deeper hierarchical features rich in speaker traits while discarding lower-layer acoustic/phonetic variability. These 1024-dimensional features are projected down to 128 dimensions and fed into a lightweight adapter.

The adapter combines a global learnable latent array (A, sized 64 × 128) shared across all selected layers, acting as a structural bottleneck that maps multi-layer representations into a unified language-independent space via cross-attention (where queries come from the backbone layers and keys/values come from the shared array). Following attention, an Expand-Convolve-Project block uses Layer Normalization, 1D convolutions with ReLU activations, and residual connections to capture short-range local spectro-temporal context.

To regularize training on the 370-hour TidyVoiceX training split, embedding-level margin-mixup interpolates embeddings from different speakers and combines their angular margins using a Beta(0.2, 0.2) distribution with a mixup probability of 0.5. The model is trained using Additive Angular Margin Softmax (AAM-Softmax) loss with a margin of 0.2 and scale factor of 32 for 30 epochs on a single NVIDIA RTX 5090 GPU.

## Experimental setup

Evaluated on the TidyVoiceX benchmark (derived from Mozilla Common Voice), featuring a training set of 370 hours (3,666 speakers, 40 languages) and a development set of 87 hours (808 speakers, 40 languages). Evaluation utilizes official TidyVoice trial lists including seen-to-unseen (tv26-eval-A) and unseen-to-unseen (tv26-eval-U) language pairs. Baselines include SimAM-ResNet34 (ASP) and w2v-BERT 2.0 adapters with MFA or all layers (1-24). Performance is measured using Equal Error Rate (EER %) and Minimum Decision Cost Function (MinDCF).

## Results

On the TidyVoiceX development set, the proposed LaS-LCA with margin-mixup achieves the best performance with an EER of 1.40% and a MinDCF of 0.66, outperforming the SimAM-ResNet34 baseline (3.07% EER, 0.82 MinDCF) and the full-layer w2v-BERT 2.0 LCA model without layer selection (2.13% EER, 0.73 MinDCF). Speaker-aware pre-training initialization (VoxBlink2 + VoxCeleb2) proves vital, lowering EER from 1.80% to 1.46% even before mixup compared to raw SSL initialization.

Ablations on layer selection demonstrate that 6 layers (19-24) outperform 4 layers (21-24, 1.56% EER) and 2 layers (23-24, 2.14% EER), validating the need for sufficient contextual depth. On the official TidyVoice 2026 Challenge leaderboard, the system achieves 3.70% EER / 0.278 MinDCF on tv26-eval-A and 6.41% EER / 0.329 MinDCF on tv26-eval-U, vastly improving over the official baselines of 9.06% and 11.60% EER respectively.

| System | Pre-training Data | EER (%) |
|---|---|---|
| SimAM-ResNet34 (ASP baseline) | VoxBlink2 + VoxCeleb2 | 3.07 |
| w2v-BERT 2.0 + Adapter MFA | Original SSL | 2.11 |
| w2v-BERT 2.0 + LCA (layers 1–24) | VoxBlink2 + VoxCeleb2 | 1.59 |
| LaS-LCA (layers 19–24, w/o mixup) | VoxBlink2 + VoxCeleb2 | 1.44 |
| **LaS-LCA (layers 19–24, mixup)** | **VoxBlink2 + VoxCeleb2** | **1.40** |

## Limitations

The framework relies heavily on a massive, heavy pre-trained front-end (w2v-BERT 2.0) which remains frozen, restricting on-device deployability unless quantized. The evaluation is bound to the TidyVoiceX partition and Common Voice language coverage, and performance heavily depends on having access to a robust speaker-aware pre-trained backbone rather than purely raw self-supervised weights.

## Why read this

Speech researchers and engineers working on multilingual or cross-lingual speaker verification will find this paper essential for learning how to selectively leverage upper layers of large SSL models with lightweight latent adapters and margin-mixup regularization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual speaker verification, multilingual speaker recognition, and voice biometrics systems deployed across diverse linguistic populations.

## Institutions / 機構

Waseda University, Wuhan University

## Related

- [Dual-LoRA: Parameter-Efficient Adversarial Disentanglement for Cross-Lingual Speaker Verification](shangguan26_interspeech.md) — same problem · relatedness 3.0/3
- [Cross-Lingual Speaker Verification with Self-Supervised Pre-Trained Models](peng26f_interspeech.md) — same problem · relatedness 3.0/3
- [Language-Invariant Multilingual Speaker Verification for the TidyVoice 2026 Challenge](li26fa_interspeech.md) — same problem · relatedness 3.0/3
- [Orthogonal Feature Projection and Manifold-Constrained Neural PLDA for the TidyVoice2026 Cross-Lingual Speaker Verification Challenge](du26c_interspeech.md) — same problem · relatedness 3.0/3
- [Progressive Learning for Robust Speaker Representation](keetha26_interspeech.md) — same problem · relatedness 3.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
