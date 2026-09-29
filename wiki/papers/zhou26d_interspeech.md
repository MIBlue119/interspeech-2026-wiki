---
id: zhou26d_interspeech
category: speaker
institutions: ["Tianjin University", "Hong Kong Polytechnic University", "Huiyan Technology (Tianjin) Co., Ltd"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1532
pdf: https://www.isca-archive.org/interspeech_2026/zhou26d_interspeech.pdf
---

# BiSASV: Bidirectional Feature Modulation with Dual-Granularity Fusion for Spoofing-Robust ASV

*Yiqun Zhou, Kong Aik Lee, Ji Liu, Longbiao Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1532)

**Category:** `speaker`

**TL;DR** — BiSASV introduces a bidirectional feature modulation and dual-granularity fusion framework for spoofing-robust speaker verification (SASV), achieving an SASV-EER of 0.73% and a min a-DCF of 0.0153 on ASVspoof 2019 LA.

## Key contributions

- Proposed a bidirectional feature modulation mechanism allowing ASV global statistics to condition anti-spoofing (CM) features via FiLM, while enhanced CM features inversely gate ASV embeddings.
- Designed a dual-granularity fusion strategy incorporating a coarse-grained fusion module with global cosine similarity to stabilize decision boundaries and prevent overfitting to fine-grained modulation.
- Eliminated the need for complex alternating training schedules (such as ATMM) in favor of a stable joint training paradigm.
- Demonstrated substantial relative error reduction over prior embedding fusion baselines, lowering SASV-EER from 2.18% (ATMM-SAGA) to 0.73%.

## Problem

Standard automatic speaker verification (ASV) systems are highly vulnerable to synthetic speech attacks like text-to-speech and voice conversion. Existing feature-level fusion models rely strictly on unidirectional CM-to-ASV interactions (using spoofing scores as attention gates) and ignore speaker context. This asymmetrical design overlooks the reality that synthetic artifacts are fundamentally coupled with specific speaker acoustic characteristics, making standalone anti-spoofing models prone to overfitting and poor cross-domain generalization.

## Method

BiSASV uses a parallel network architecture taking pre-extracted representations from an ASV model (ECAPA-TDNN) and a countermeasure model (AASIST). The core mechanism establishes a closed-loop bidirectional information flow. First, an ASV condition vector z_stat is constructed by concatenating the mean, standard deviation, and cosine similarity of enrollment and test embeddings. This vector is mapped via a two-layer MLP into scaling and shifting parameters (gamma and beta) to condition the CM feature h_cm via Feature-wise Linear Modulation (FiLM).

Next, the modulated and subsequently processed CM feature f_cm is passed through a gating network F_gate and sigmoid function to produce a dimension-wise gating vector g in [0, 1]^d. This vector performs element-wise multiplication to recalibrate raw ASV interaction features (derived from normalized enrollment/test embeddings, absolute differences, and element-wise products).

Finally, a dual-granularity fusion combines a coarse-grained path (concatenating enhanced CM features with ASV cosine similarity into a 128-d layer via LeakyReLU) and a fine-grained gating path. Both paths are concatenated to yield the final robust embedding e_sasv. The network is trained using a weighted binary cross-entropy loss with bona fide and spoof weights set to 0.9 and 0.1, respectively.

## Experimental setup

Evaluated on the ASVspoof 2019 Logical Access (LA) dataset. Baselines include ECAPA-TDNN, AASIST, SASV-EEND, score fusion methods (SASV-PR, Multi-Stage Score Fusion, Non-linear LLR), and embedding fusion baselines (Baseline2, G-SASV, Backend Ensemble, ATMM-SAGA). Metrics include SV-EER, SPF-EER, SASV-EER, and min a-DCF with 95% confidence intervals from 1,000 bootstrap iterations. Implemented in PyTorch using pre-trained ECAPA-TDNN (192-d) and AASIST (160-d) front-ends; trained for 20 epochs with a batch size of 1024 using the Adam optimizer (initial learning rate 3e-4, weight decay 1e-3, linear warmup for 10 epochs followed by inverse time decay).

## Results

BiSASV achieves an SASV-EER of 0.73% and a min a-DCF of 0.0153 on the ASVspoof 2019 LA evaluation set, significantly outperforming naive embedding concatenation (Baseline2 at 6.37% SASV-EER) and the ATMM-SAGA baseline (2.18% SASV-EER and 0.0480 min a-DCF). Ablation studies show that removing ASV-to-CM conditioning degrades SASV-EER to 1.33%, and randomizing z_stat further degrades it to 1.49%, proving that correct speaker context is critical. Removing the coarse-grained fusion module raises SASV-EER to 1.14% and causes regression on multiple individual attack types.

| Systems | SV-EER (%) | SPF-EER (%) | SASV-EER (%) | min a-DCF |
|---|---|---|---|---|
| ECAPA-TDNN | 1.64 | 30.75 | 23.84 | - |
| AASIST | 49.24 | 0.67 | 24.38 | - |
| Baseline2 (Concat) | 11.48 | 0.78 | 6.37 | - |
| ATMM-SAGA | - | - | 2.18 | 0.0480 |
| BiSASV (Proposed) | 1.02 | 0.47 | 0.73 | 0.0153 |

## Limitations

Evaluated solely on the ASVspoof 2019 LA dataset, limiting claims regarding cross-dataset and cross-lingual generalization. The system relies on fixed pre-trained front-ends (ECAPA-TDNN and AASIST) rather than end-to-end joint optimization from raw audio. The impact of extreme domain shifts involving unseen acoustic environments or vocoders requires broader validation.

## Why read this

Researchers building spoofing-robust speaker verification systems should read this to understand how bidirectional feature-level interaction and dual-granularity fusion outperform unidirectional attention gating and score-level aggregation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice biometric security systems, secure speaker verification, and anti-spoofing defense mechanisms for automated voice authentication services.

## Institutions / 機構

Tianjin University, Hong Kong Polytechnic University, Huiyan Technology (Tianjin) Co., Ltd

**Funding / 經費:** National Natural Science Foundation of China

## Related

- [Soft-Gating Score-Level Fusion for Spoofing-Aware Speaker Verification](han26e_interspeech.md) — same problem · relatedness 2.8/3
- [RAT: Reference-Augmented Training for ASV Anti-Spoofing](stanek26c_interspeech.md) — same problem · relatedness 2.5/3
- [Mixture of Spectral Experts for Audio Deepfake Detection](qiu26_interspeech.md) — shared data / evaluation · relatedness 2.4/3
- [Aleatoric Style Uncertainty Augmentation with GMM for Domain Generalization in Anti-spoofing](li26g_interspeech.md) — same problem · relatedness 2.3/3
- [Interpretable Frequency-Band Attention with Gated SSL Fusion for Audio Deepfake Detection](alhammad26_interspeech.md) — shared data / evaluation · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
