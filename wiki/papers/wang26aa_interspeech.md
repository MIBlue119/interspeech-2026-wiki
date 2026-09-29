---
id: wang26aa_interspeech
category: resources-evaluation
labels: [robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1671
pdf: https://www.isca-archive.org/interspeech_2026/wang26aa_interspeech.pdf
---

# URGENT-MOS: Unified Multi-Metric and Preference Learning for Robust Speech Quality Assessment

*Wei Wang, Wangyou Zhang, Chenda Li, Jiahe Wang, Samuele Cornell, Marvin Sach, Kohei Saijo, Yihui Fu, Zhaoheng Ni, Mengxiao Bi, Tim Fingscheidt, Shinji Watanabe, Yanmin Qian*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26aa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26aa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1671)

**Category:** `resources-evaluation` · **Labels:** `robustness-noise`

**TL;DR** — URGENT-MOS is a unified speech quality assessment framework that jointly models absolute multi-metric quality prediction and pairwise preference prediction under heterogeneous supervision, achieving state-of-the-art cross-domain robustness.

## Key contributions

- Jointly models multi-metric absolute quality prediction and pairwise preference prediction within a single shared architecture.
- Proposes a multi-metric training strategy capable of learning from diverse datasets with incomplete/missing metric annotations using a binary validity mask.
- Derives preference-annotated training and evaluation pairs from abundant Absolute Category Rating (ACR) human MOS datasets through reference-scope, corpus-level, and arbitrary matching.
- Introduces Range-Constraining Activations (rcAct) to guarantee that predicted scores strictly respect valid metric value bounds.

## Problem

Traditional speech quality assessment (SQA) frameworks optimize either absolute quality or pairwise preference independently, ignoring complementary supervision across datasets. Furthermore, annotations across public SQA corpora are highly inconsistent and heterogeneous, leading to poor cross-domain robustness when models are deployed on out-of-domain generated speech. As modern speech synthesis approaches human-level quality, subtle inter-system differences require comparison-based paradigms that directly evaluate preference rather than absolute scales alone.

## Method

URGENT-MOS uses a multi-branch feature extractor where $n$ pretrained encoders (e.g., WavLM, Kimi-Audio, Qwen3OmniCaptioner, Audio Flamingo) process waveforms in parallel to produce representations $H_i \in \mathbb{R}^{d_i \times l_i}$. These are temporally interpolated to a common length $L = \max_i l_i$ and fused into a shared representation $H$. The Absolute Metric Prediction Module (AMPM) predicts grouped metrics across categories like Naturalness, Intelligibility, and Speaker Similarity. The Naturalness-Conditioned Preference Module (NCPM) uses cross-attention over Naturalness-category representations of sample pairs ($X_A, X_B$) to predict pairwise preferences. Each metric head uses a scaled-sigmoid range-constraining activation (rcAct).

Training handles missing annotations via a binary validity mask $m_k^{(b)} \in \{0, 1\}$ that omits NaN labels from the loss computation, averaging losses only over valid metrics $K_{\text{valid}}$. Preference supervision is derived from ACR human MOS data using a tie threshold $\delta = 0.5$, augmented by reversing input pair orders during training to ensure order invariance. The system is optimized using an $l_2$ loss formulation.

The model is trained on 13 public and challenge datasets spanning TTS, voice conversion, speech enhancement, and telephony, totaling hundreds of thousands of samples and hundreds of hours of audio. It uses 6-layer Transformer encoders with 8 attention heads, hidden dimension 768, feed-forward dimension 2048, a constant learning rate of $3 \times 10^{-5}$, and dynamic batching (~400 seconds per batch) for 60,000 steps on a single NVIDIA A100 GPU.

## Experimental setup

Evaluated on diverse public and challenge test sets including SOMOS, TMHINT-QI, UR25-SQA, CHiME-7-UDASE-Eval, NISQA (FOR and LIVETALK), SpeechEval, SpeechJudge, and BC19. Baselines include single-purpose objective models like DNSMOS, UTMOS, SCOREQ, Distill-MOS, NISQA-MOS, SpeechEval, and SpeechJudge. Metrics reported are utterance-level Pearson correlation (LCC), Spearman rank correlation (SRCC), and pairwise preference accuracy ($\text{acc}_0$ and $\text{acc}_{0.5}$).

## Results

The F4C1M5 variant (4 encoders, 1 category, 5 naturalness metrics) consistently outperforms baseline models. On the SOMOS preference evaluation, F4C1M5 achieves 0.73 / 0.84 accuracy ($\text{acc}_0 / \text{acc}_{0.5}$), outperforming UTMOS (0.65 / 0.73) and DNSMOS (0.51 / 0.52). On TMHINT-QI correlation, it achieves 0.80 LCC / 0.76 SRCC, beating NISQA-MOS (0.53 / 0.35) and DNSMOS (0.41 / 0.37). 

Ablations reveal that incorporating naturalness-related multi-metric supervision (M5) improves performance over MOS-only training (M1), while extending supervision to all 15 metrics (M15) degrades performance on certain datasets due to weak or inconsistent correlations among metrics like LSD and MCD.

| Model | SOMOS ($\text{acc}_0/\text{acc}_{0.5}$) | TMHINT-QI ($\text{acc}_0/\text{acc}_{0.5}$) | CHiME-7 ($\text{acc}_0/\text{acc}_{0.5}$) | LIVETALK ($\text{acc}_0/\text{acc}_{0.5}$) |
|---|---|---|---|---|
| DNSMOS | 0.51 / 0.52 | 0.63 / 0.66 | 0.51 / 0.53 | 0.71 / 0.79 |
| UTMOS | 0.65 / 0.73 | 0.69 / 0.73 | 0.57 / 0.61 | 0.80 / 0.89 |
| SpeechEval | 0.62 / 0.68 | 0.79 / 0.85 | 0.66 / 0.75 | 0.77 / 0.85 |
| F1C1M5_$D_{\text{ref}}$ | 0.71 / 0.83 | 0.79 / 0.84 | 0.70 / 0.79 | 0.76 / 0.84 |
| F4C1M5_$D_{\text{ref}}$ | **0.73 / 0.84** | **0.79 / 0.86** | **0.78 / 0.92** | **0.85 / 0.92** |

## Limitations

Full multi-metric supervision (M15) causes performance degradation due to noise or weak correlations from certain low-level acoustic metrics like LSD and MCD. The approach relies heavily on pretrained speech encoders, making performance bound by the capacity and language coverage of those base models.

## Why read this

Researchers building modern generative speech evaluation pipelines should read this to learn how to unify absolute metric prediction and pairwise preference learning under heterogeneous supervision.

## Code

- https://github.com/vvwangvv/URGENT-MOS

## Applications

Automated evaluation of text-to-speech, voice conversion, and speech enhancement systems, as well as reward modeling for generative speech alignment.

## Institutions / 機構

Shanghai Jiao Tong University, Carnegie Mellon University, Technische Universitat Braunschweig, Meta, Waseda University, VUI Labs

**Funding / 經費:** National Key Research and Development Program of China, China NSFC Project, SJTU Med-X Translational Research Grant

## Related

- (link related pages by id as the wiki grows)
