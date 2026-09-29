---
id: ren26_interspeech
category: resources-evaluation
institutions: ["National Taiwan University", "Nagoya University", "National Institute of Information and Communications Technology", "Academia Sinica"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-67
pdf: https://www.isca-archive.org/interspeech_2026/ren26_interspeech.pdf
---

# MOS-Bias: From Hidden Gender Bias to Gender-Aware Speech Quality Assessment

*Wenze Ren, Yi-Cheng Lin, Wen-Chin Huang, Erica Cooper, Ryandhimas Zezario, Hsin-Min Wang, Hung-yi Lee, Yu Tsao*

[PDF](https://www.isca-archive.org/interspeech_2026/ren26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-67)

**Category:** `resources-evaluation`

**TL;DR** — This paper presents the first systematic analysis of gender bias in Mean Opinion Score (MOS) evaluations, revealing that male listeners consistently assign higher scores than female listeners, especially on low-quality speech. To combat the inherited male-leaning bias in automated models, the authors propose a gender-aware architecture using abstract binary group embeddings that improves both overall and group-specific prediction accuracy.

## Key contributions

- First systematic discovery and quantification of listener gender bias in MOS annotations, proving that male listeners consistently assign higher ratings than female listeners across all speaker genders.
- Demonstration that the gender rating gap is heavily quality-dependent: largest in poor-quality speech (0.167 gap) and vanishing near ceiling quality, rendering simple global calibration ineffective.
- Empirical proof that standard gender-agnostic MOS models trained on aggregated labels inherit a hidden male-leaning perception bias, yielding lower error against male ground truth.
- Proposing a gender-aware multi-task prediction architecture conditioned on abstract binary group embeddings (0 and 1) rather than explicit demographic labels, which autonomously learns gender-specific patterns.

## Problem

Mean Opinion Score (MOS) derived from human listeners is the gold standard for speech quality assessment in text-to-speech, voice conversion, and speech enhancement. However, annotator demographic biases remain under-explored, and simple averaging of listener scores masks substantial subgroup discrepancies. Prior work ignores listener gender entirely, assuming aggregate MOS is a neutral benchmark. Consequently, automated models trained on these labels implicitly learn and propagate a skewed, male-leaning standard of speech perception, failing to faithfully represent either demographic group.

## Method

The proposed architecture builds upon the standard SSL-MOS framework by adding a parallel gender-MOS branch alongside the original mean-MOS prediction network. A shared self-supervised learning (SSL) encoder processes input audio, feeding representations into both the primary Mean Net and the auxiliary Gender Net, which uses shared projection weights. To avoid explicit demographic labeling that violates the base model's gender-neutral design, the gender branch is conditioned on abstract binary group embeddings (Group 1 for male perception patterns and Group 0 for female perception patterns).

The training objective is a multi-task Mean Squared Error (MSE) loss combining three equally weighted terms: L_total = L_avg + L_male + L_female. This 1:1:1 weighting guarantees that no single perspective dominates optimization. The shared encoder allows all branches to benefit from the full dataset while learning distinct gender-specific scoring functions. Inference yields three parallel outputs: the average MOS, the male-perspective MOS, and the female-perspective MOS.

## Experimental setup

Experiments are conducted on the BVCC dataset, which integrates public samples from the Blizzard Challenge, Voice Conversion Challenge, and ESPnetTTS, comprising 4,974 training, 1,066 development, and 1,066 test speech samples evaluated by 8 listeners each. The models are optimized using SGD with a learning rate of 1e-3 for up to 100,000 steps with early stopping, evaluated across three random seeds (1337, 2337, 3337). Performance is measured using Linear Correlation Coefficient (LCC), Spearman Rank Correlation Coefficient (SRCC), Mean Squared Error (MSE), and Kendall’s tau (KTAU) at both utterance and system levels, comparing against the baseline SSL-MOS model.

## Results

The gender-aware model achieves an utterance-level LCC of 0.862 and an MSE of 0.239 against all-listener ground truth, outperforming the baseline SSL-MOS model's LCC of 0.853 and MSE of 0.290. When evaluated against gender-specific ground truth, the gender-MOS branch drops utterance-level MSE for male listeners from 0.372 (baseline) to 0.332, and for female listeners from 0.430 to 0.366. Notably, the baseline model exhibited a system-level MSE gap favoring male listeners (0.141 MSE vs 0.194 for females), which the multi-task model partially mitigates.

| System | Prediction | GT | Utter-LCC | Utter-MSE | Sys-LCC | Sys-MSE |
|---|---|---|---|---|---|---|
| Baseline | Avg | All | 0.853 | 0.290 | 0.919 | 0.128 |
| Gender-MOS | Avg | All | 0.862 | 0.239 | 0.921 | 0.114 |
| Baseline | Avg | Male | 0.806 | 0.372 | 0.901 | 0.141 |
| Gender-MOS | Male | Male | 0.817 | 0.332 | 0.905 | 0.134 |
| Baseline | Avg | Female | 0.802 | 0.430 | 0.888 | 0.194 |
| Gender-MOS | Female | Female | 0.807 | 0.366 | 0.888 | 0.169 |

## Limitations

The study's scope is restricted by the availability of listener demographic metadata, limiting evaluation exclusively to the BVCC dataset. The evaluation is binary (male/female listener pools), leaving non-binary or intersectional demographic biases unexplored. Furthermore, the approach relies on balanced multi-rater annotations per utterance, which are absent in many large-scale in-the-wild speech datasets.

## Why read this

Speech and ML researchers building automated evaluation metrics or working on algorithmic fairness should read this to understand how hidden annotator demographic biases propagate into speech quality models. It offers a concrete multi-task architectural recipe using abstract group embeddings to improve both overall and subgroup prediction fidelity without manual demographic calibration.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated speech quality assessment for Text-to-Speech, Voice Conversion, and Speech Enhancement systems, focusing on fair and equitable evaluation metrics.

## Institutions / 機構

National Taiwan University, Nagoya University, National Institute of Information and Communications Technology, Academia Sinica

## Related

- (link related pages by id as the wiki grows)
