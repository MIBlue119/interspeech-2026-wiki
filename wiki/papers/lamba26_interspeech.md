---
id: lamba26_interspeech
category: resources-evaluation
institutions: ["Ohio State University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2382
pdf: https://www.isca-archive.org/interspeech_2026/lamba26_interspeech.pdf
---

# How Frequency Band Importance Affects Neural Network Predictions and Human Perception for Speech Quality Assessment

*Ada Lamba, Donald S. Williamson*

[PDF](https://www.isca-archive.org/interspeech_2026/lamba26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lamba26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2382)

**Category:** `resources-evaluation`

**TL;DR** — This paper investigates what frequency bands drive speech quality assessment models (MOSNet, DNSMOS, SCOREQ) using SHAP, partial dependence plots, and perturbation analysis, and compares these findings against a human listening study. Results show that both networks and humans are substantially more sensitive to detrimental factors (like audio distortion and noise) than beneficial ones, and that top-performing models leverage broader input representations than underperforming ones.

## Key contributions

- Applies three complementary explainability methods (SHAP, PDP, and perturbation analysis) across three distinct speech quality assessment architectures (DNSMOS, MOSNet, SCOREQ).
- Conducts a comprehensive 200-participant listening study (via Prolific) using paired preference and factor-attribution testing on perturbed speech to benchmark human perceptual sensitivity against model behavior.
- Identifies that deep neural quality models and human listeners share an asymmetry in sensitivity, reacting much more strongly to quality-degrading artifacts than quality-enhancing factors.
- Demonstrates that lower-performing architectures (e.g., MOSNet-CNN) restrict their focus to an overly narrow band of low frequencies, explaining their poor correlation with human evaluations.

## Problem

Automated speech quality assessment models frequently achieve high internal accuracy on training sets but fail to generalize or correlate well with human mean opinion score (MOS) assessments on unseen real-world data. Prior explainability literature in speech is heavily fragmented, typically locking into a single model or a single attribution approach without cross-model validation or human perceptual grounding. Without understanding whether networks rely on the same acoustic features as humans, developers resort to blind hyperparameter tuning rather than diagnosing root architectural biases.

## Method

The authors evaluate three established automated quality assessment architectures taking 161-band frequency spectrograms (50 Hz resolution): MOSNet-CNN (17-layer convolutional regression), DNSMOS (14-layer convolutional regression), and SCOREQ (a wav2vec 2.0-based transformer finetuned with triplet and contrastive losses, followed by an L2-trained linear MOS head). Local and global explanations are generated using SHAP (calculating marginal feature contributions via subset retraining), Partial Dependence Plots (PDPs, measuring expected model predictions across input feature ranges), and perturbation analysis (scaling specific frequency bands by factors of 0.25, 0.5, 10, 50, 100, and 1000 while preserving original phase).

The human listening study presented 200 participants with 16 paired audio comparisons each (original vs. perturbed by scaling one of 15 selected frequency bands at scales 0.5, 10, and 1000). Participants rated both signals on a 5-point MOS scale, stated a preference, and explicitly categorized whether factors like noise, distortion, speech-to-noise ratio (SNR), and noise type helped, hurt, or did not affect their rating.

## Experimental setup

Models were evaluated on IUCOSINE, a 14,400/3,600 sample train/test split derived from the COSINE corpus containing real-world conversational speech recorded via body-worn microphones (mouth, chest, shoulder, throat) to ensure zero overlap with training sets. Baseline performances on the IUCOSINE test set measured via MSE, Linear Correlation Coefficient (LCC), and Spearman Rank Correlation Coefficient (SRCC) were: DNSMOS (MSE: 0.3890, LCC: 0.2317, SRCC: 0.1981), MOSNet (MSE: 0.5248, LCC: 0.1877, SRCC: 0.1981), and SCOREQ (MSE: 0.4624, LCC: 0.6283, SRCC: 0.6249). Experiments utilized a 48-core Dual Intel Xeon 8268s or an NVIDIA Volta V100 GPU.

## Results

SCOREQ achieved the strongest alignment with human judgment, recording an LCC of 0.6283 and SRCC of 0.6249, whereas DNSMOS and MOSNet lagged significantly (LCC < 0.24). Perturbation correlations with human ratings across tested frequency bands were statistically significant and positive for SCOREQ (e.g., PCC 0.974 to 0.999 across bands 2-5) and DNSMOS, while MOSNet showed inverse or negative correlations (reaching significant negative PCC of -0.980 on bands 31 and 41). Qualitative human responses revealed that 59.8% of participants found distortion to have a detrimental effect on ratings, confirming a strong asymmetry toward penalizing negative acoustic factors.

| System | MSE (↓) | LCC (↑) | SRCC (↑) |
|---|---|---|---|
| DNSMOS | 0.3890 | 0.2317 | 0.1981 |
| MOSNet | 0.5248 | 0.1877 | 0.1981 |
| SCOREQ | 0.4624 | 0.6283 | 0.6249 |

## Limitations

The perturbation analysis independently modified single frequency bands without accounting for inter-band acoustic correlations, which inadvertently introduced audible synthetic artifacts that may have biased human preference ratings. The study was constrained to English-speaking participants from the United States with normal hearing, limiting cross-linguistic and diverse demographic generalizability. Furthermore, the evaluation focused exclusively on three specific model architectures (omitting the BLSTM variant of MOSNet) and relied on a single out-of-domain evaluation corpus (IUCOSINE).

## Why read this

Speech and machine learning engineers building quality assessment tools will learn how to audit black-box models using multi-faceted explainability frameworks to bridge the gap between automated metrics and human perception.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech enhancement evaluation, robust telecommunications quality monitoring, generative speech synthesis benchmarking, and acoustic model data curation.

## Institutions / 機構

Ohio State University

**Funding / 經費:** National Science Foundation

## Related

- [Investigating Human-Model Discrepancies in Speech Quality Assessment via Acoustic and Prosodic Perturbations](takagi26_interspeech.md) — same problem · relatedness 2.4/3
- [DNSMOS-C: Improving End-to-end Speech Quality Models via Contrastive Learning](liang26_interspeech.md) — same problem · relatedness 2.3/3
- [A Fine-Grained Acoustically-Aware Pre-training Encoder for Speech Quality Assessment](sultana26_interspeech.md) — same problem · relatedness 2.3/3
- [Evaluating Objective Speech Quality Metrics for Neural Audio Codecs](lanzendoerfer26_interspeech.md) — same problem · relatedness 2.3/3
- [URGENT-MOS: Unified Multi-Metric and Preference Learning for Robust Speech Quality Assessment](wang26aa_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
