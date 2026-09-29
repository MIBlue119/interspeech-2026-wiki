---
id: han26e_interspeech
category: speaker
institutions: ["Soongsil University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2294
pdf: https://www.isca-archive.org/interspeech_2026/han26e_interspeech.pdf
---

# Soft-Gating Score-Level Fusion for Spoofing-Aware Speaker Verification

*Seongkyu Han, Yowon Lee, Thien-Phuc Doan, Thien An Nguyen, Souhwan Jung*

[PDF](https://www.isca-archive.org/interspeech_2026/han26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/han26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2294)

**Category:** `speaker`

**TL;DR** — A training-free soft-gating score-level fusion framework dynamically scales ASV and CM subsystem contributions using margins from development EER thresholds, achieving up to a 90% relative a-DCF improvement over static baselines.

## Key contributions

- Proposes a novel dynamic soft-gating score-level fusion method for Spoofing-Aware Speaker Verification (SASV) that relies on trial-wise subsystem confidence.
- Eliminates the need for learnable parameters or additional joint training, allowing direct plug-and-play deployment on existing pre-trained SASV pipelines.
- Evaluates three specific gating variants (CM Gating, ASV Gating, and Double Gating) across diverse benchmark conditions.
- Provides diagnostic analysis of performance failure modes tied to extreme EER threshold distributions (near 0 or 1).

## Problem

Combining Automatic Speaker Verification (ASV) and Countermeasure (CM) subsystems is challenging because they optimize for different objectives: speaker identity vs. spoof detection. Conventional static fusion schemes apply fixed weights across all trials, making them unable to adapt to trial-specific attack types or shifts in score distributions. More recent score-aware gated frameworks like ATMM-SAGA require complex joint training with alternating optimization, limiting their practical deployment.

## Method

The method takes raw ASV and CM similarity scores, normalizes them, and scales them using confidence margins derived from development-set EER thresholds. Let $s_{	ext{asv}}$ and $s_{	ext{cm}}$ be the normalized subsystem scores, and $\tau_{	ext{asv}}, \tau_{	ext{cm}}$ be their respective EER thresholds. The confidence margins are computed as $\delta_{	ext{asv}} = s_{	ext{asv}} - \tau_{	ext{asv}}$ and $\delta_{	ext{cm}} = s_{	ext{cm}} - \tau_{	ext{cm}}$.

Three gating configurations are explored: CM Gating ($S = s_{	ext{cm}} \delta_{	ext{cm}} + s_{	ext{asv}}(1 - |\delta_{	ext{cm}}|)$), ASV Gating ($S = s_{	ext{cm}}(1 - |\delta_{	ext{asv}}|) + s_{	ext{asv}} \delta_{	ext{asv}}$), and Double Gating ($S = s_{	ext{cm}} \delta_{	ext{cm}} + s_{	ext{asv}} \delta_{	ext{asv}}$). These formulations scale subsystem contribution dynamically based on whether the score falls far from the threshold (high confidence) or close to it (uncertainty), giving strong influence to reliable outputs while suppressing ambiguous predictions.

At inference time, the method requires only simple arithmetic operations on the subsystem outputs using pre-calculated thresholds from the development set, requiring no backpropagation or parameter updates.

## Experimental setup

Experiments are conducted on ASVspoof 2019 LA (LA19) and ASVspoof5 (Track 2 closed condition) datasets using their official evaluation protocols. Four ASV-CM system combinations are built using two ASV backbones (ECAPA-TDNN and ReDimNet, trained on VoxCeleb2) and two CM backbones (AASIST and Conformer-TCM). Performance is evaluated using SV-EER, SPF-EER, SASV-EER, and a-DCF.

## Results

On the LA19 dataset, the proposed methods reduce a-DCF by approximately 90% on average compared to baseline fusion methods, with Double Gating achieving the best a-DCF across most configurations. On ASVspoof5, the dynamic gating methods also predominantly outperform Baseline 1 (simple sum) and Baseline 2 (DNN back-end embedding fusion). However, performance degrades severely when models produce extreme EER thresholds close to 0 or 1. For instance, in the ECAPA+TCM configuration where TCM's threshold is near 0, CM Gating yields an inflated SV-EER due to unconstrained amplification of the CM score on bonafide trials.

| Model | Method | LA19 SASV-EER | LA19 a-DCF | ASVspoof5 SASV-EER | ASVspoof5 a-DCF |
|---|---|---|---|---|---|
| ECAPA + AASIST | Baseline 1 | 19.14 | 0.1738 | 35.03 | 0.6219 |
| ECAPA + AASIST | CM Gating | 0.84 | 0.0178 | 16.01 | 0.4883 |
| ECAPA + TCM | Baseline 1 | 8.12 | 0.1504 | 27.36 | 0.3065 |
| ECAPA + TCM | Double Gating | 0.76 | 0.0151 | 29.27 | 0.8942 |
| Redim + AASIST | Double Gating | 0.45 | 0.0107 | 13.68 | 0.4280 |
| Redim + TCM | Double Gating | 0.39 | 0.0080 | 25.52 | 0.8113 |

## Limitations

The framework's effectiveness is sensitive to the positioning of the development-set EER threshold; extreme thresholds near 0 or 1 break the margin scaling logic and degrade performance. The evaluation is restricted to closed-condition LA19 and ASVspoof5 benchmarks, leaving cross-dataset generalization under severe acoustic or codec mismatch unverified.

## Why read this

Researchers and engineers looking for an immediate, plug-and-play alternative to static score-fusion or complex joint-training pipelines in SASV will find this an effective, lightweight solution.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Secure speaker verification systems, voice-biometric banking, and mobile authentication pipelines requiring defense against synthetic speech spoofing.

## Institutions / 機構

Soongsil University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Information Technology Research Center, Ministry of Science and ICT, National Research Foundation of Korea

## Related

- [BiSASV: Bidirectional Feature Modulation with Dual-Granularity Fusion for Spoofing-Robust ASV](zhou26d_interspeech.md) — same problem · relatedness 2.8/3
- [RAT: Reference-Augmented Training for ASV Anti-Spoofing](stanek26c_interspeech.md) — same problem · relatedness 2.5/3
- [Aleatoric Style Uncertainty Augmentation with GMM for Domain Generalization in Anti-spoofing](li26g_interspeech.md) — same problem · relatedness 2.0/3
- [AGENT: A Black-box Adversarial Attack Exposing the Achilles'' Heel of SASV Systems](lee26x_interspeech.md) — same problem · relatedness 2.0/3
- [Mixture of Spectral Experts for Audio Deepfake Detection](qiu26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
