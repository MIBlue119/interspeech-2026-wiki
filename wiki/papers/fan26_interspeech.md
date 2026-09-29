---
id: fan26_interspeech
category: resources-evaluation
institutions: ["Ohio State University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1512
pdf: https://www.isca-archive.org/interspeech_2026/fan26_interspeech.pdf
---

# PrefSQA: Pairwise Preference Prediction for Speech Quality Assessment and the Critical Role of High Quality Datasets

*Junyi Fan, Donald S. Williamson*

[PDF](https://www.isca-archive.org/interspeech_2026/fan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1512)

**Category:** `resources-evaluation`

**TL;DR** — PrefSQA is an MOS-free pairwise preference prediction framework for speech quality assessment that combines dual semantic-acoustic encoders, uncertainty-aware Bradley-Terry logits, an impairment attention head, and an in-batch non-matching-reference (NMR) head, achieving 96.29% accuracy on simulated paired speech quality data.

## Key contributions

- Proposes PrefSQA, a no-MOS pairwise speech quality assessment model integrating uncertainty-aware Bradley-Terry logits, an impairment attention head, and a feature-level NMR head.
- Constructs CHiLi, a clean-noisy simulated preference dataset with matching and non-matching lexical content designed to eliminate MOS labeling noise.
- Demonstrates that high-quality, low-noise preference datasets expose clear architectural performance gaps that are otherwise obscured by labeling noise in traditional MOS-derived datasets.
- Evaluates cross-domain generalization on human preference sets (SpeechEval, SpeechJudge) and unseen test distributions (IUB-COSINE).

## Problem

Traditional automatic speech quality assessment (SQA) relies heavily on Mean Opinion Scores (MOS), which suffer from rater variability, differing listening test protocols, and discrete rating scales that introduce high labeling noise. While prior work has explored pairwise preference learning to bypass absolute scores, most existing preference datasets and methods remain tied to MOS-derived supervision or lack MOS-independent designs. Furthermore, the inherent noise in MOS data disproportionately corrupts small-margin evaluation regions, obscuring genuine architectural improvements across competing SQA models.

## Method

PrefSQA builds upon a semantic-acoustic dual-encoder architecture utilizing pretrained wav2vec 2.0 (last hidden state) and WavLM (layer-weighted sum module with learnable parameters, temperature 0.5, and 10% layer-dropout regularization). The encoder outputs pass through a residual feature processor (two linear layers with GELU and layer normalization) and are concatenated along the channel axis before being fed into a 256-unit single-layer BLSTM, which pools across time to form utterance-level embeddings. Two linear heads map these embeddings to a scalar latent score s0 and a log variance log(sigma^2).

To capture localized distortions, an impairment attention head applies a 1D convolution (128 channels, kernel size 5) over time on the concatenated encoder features with a sigmoid gating layer, yielding a time-wise attention mask and a scalar residual sr. This residual is scaled by alpha = 0.1 and added to s0 to form the final quality score s. For pairwise comparison between utterances x and y, the preference logit zx,y is computed using the difference in scores divided by an uncertainty-dependent temperature tau derived from the predicted variances and clamped to [0.6, 2.0].

Additionally, a lightweight feature-level non-matching-reference (NMR) head uses in-batch comparisons to refine global rankings. Given batch embeddings, anchor items are paired with k=3 sampled partners without replacement, forming feature vectors u_i,j mapped via a 256-128-1 MLP to an NMR logit optimized against soft targets derived from model scores with label smoothing (0.03). The overall training objective minimizes the sum of the primary Bradley-Terry binary cross-entropy loss and the NMR loss weighted by lambda = 0.9, utilizing AdamW with an effective batch size of 32, learning rate 0.001 for task heads and wav2vec 2.0, and 0.00003 with layerwise decay 0.95 for WavLM.

## Experimental setup

Evaluated on five dataset categories: NISQA (MOS-derived, 15917 train pairs), SOMOS M/NM (TTS-based matching/non-matching, ~18k-20k train pairs), CHiLi M/NM (simulated clean LibriSpeech mixed with CHiME-3 noise at SNRs from -20 to 30 dB, 22,831 train pairs), human preference sets SpeechEval (15,443 pairs) and SpeechJudge (42,097 pairs), and the unseen IUB-COSINE test set (1,800 pairs). Baselines include SQAPP and UPPSQA. Models are trained with 6-second max input truncation at 16 kHz using gradient norm clipping at 1.0.

## Results

On simulated CHiLi M data, PrefSQA achieves the top accuracy of 96.29%, outperforming SQAPP (94.78%), UPPSQA (85.88%), and PrefSQA-Frozen (91.52%). On the harder CHiLi NM (non-matching) set, PrefSQA reaches 90.37% accuracy compared to SQAPP's 86.90% and UPPSQA's 81.05%. Ablations on CHiLi NM show that removing the impairment attention head drops accuracy to 88.86% and removing the NMR head drops it to 90.12%, confirming their complementary utility on difficult tasks. On MOS-derived sets (NISQA, SOMOS), performance differences among models compress significantly due to label noise. Error distribution analyses (P50 vs P99-P50 margins) reveal that model errors consistently concentrate in small score margin regions.

| System | CHiLi M (%) | CHiLi NM (%) | NISQA (%) | SOMOS NM (%) |
|---|---|---|---|---|
| SQAPP | 94.78 | 86.90 | 64.83 | 49.28 |
| UPPSQA | 85.88 | 81.05 | 83.46 | 73.10 |
| PrefSQA (Frozen) | 91.52 | 87.50 | 82.80 | 73.48 |
| PrefSQA (Full) | 96.29 | 90.37 | 83.84 | 74.72 |

## Limitations

The model evaluates pairwise preferences as a strict binary choice, completely omitting a tie option for near-indistinguishable pairs which heavily concentrates errors in small-margin regions. Scope is bounded by simulated acoustic noise profiles (CHiME-3/LibriSpeech mixes) and evaluated speech corpora, leaving open how well the uncertainty mechanisms scale to highly diverse multi-accent or pathological speech domains.

## Why read this

Speech and ML researchers focusing on automatic quality assessment should read this paper to understand how dataset labeling noise masks architectural improvements, and how to properly design MOS-free pairwise preference models with uncertainty and NMR heads.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech enhancement evaluation, text-to-speech system selection, and on-device speech quality monitoring.

## Institutions / 機構

Ohio State University

**Funding / 經費:** Ohio Supercomputer Center, National Science Foundation

## Related

- [URGENT-MOS: Unified Multi-Metric and Preference Learning for Robust Speech Quality Assessment](wang26aa_interspeech.md) — same problem · relatedness 2.8/3
- [DNSMOS-C: Improving End-to-end Speech Quality Models via Contrastive Learning](liang26_interspeech.md) — same problem · relatedness 2.7/3
- [A Fine-Grained Acoustically-Aware Pre-training Encoder for Speech Quality Assessment](sultana26_interspeech.md) — same problem · relatedness 2.4/3
- [ConformalMOS: Uncertainty-Aware MOS Prediction with Conformal Intervals and Ordinal Modeling](elelu26_interspeech.md) — same problem · relatedness 2.4/3
- [TDScore: Learning Synthetic Speech Quality Predictors from TTS Training Dynamics without Human annotation](miniconi26_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
