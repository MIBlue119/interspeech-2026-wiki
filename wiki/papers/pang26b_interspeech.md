---
id: pang26b_interspeech
category: paralinguistics-emotion
labels: [multilingual, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3143
pdf: https://www.isca-archive.org/interspeech_2026/pang26b_interspeech.pdf
---

# ERM-MinMaxGAP: Benchmarking and Mitigating Gender Bias in Multilingual Multimodal Speech-LLM Emotion Recognition

*Zi Haur Pang, Xiaoxue Gao, Tatsuya Kawahara, Nancy Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/pang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3143)

**Category:** `paralinguistics-emotion` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — We introduce a multilingual multimodal speech-LLM benchmark for speech emotion recognition (SER) demonstrating that gender bias is heavily language-dependent, and propose ERM-MinMaxGAP to improve recognition while minimizing worst-subgroup gender gaps, boosting multimodal SER performance by 5.0% W-F1 while reducing overall gender bias gaps.

## Key contributions

- Created the first dedicated gender bias benchmark for multilingual and multimodal speech-LLM emotion recognition, utilizing the MELD-ST dataset across English, Japanese, and German.
- Proposed ERM-MinMaxGAP, a fairness-aware training objective combining empirical risk minimization with an adaptive MinMaxGAP regularizer targeting worst-case male-female loss disparities per language.
- Formulated an adaptive fairness weight adjustment mechanism using a Lagrange multiplier method to automatically balance task performance and demographic fairness throughout training.
- Conducted extensive experiments across unimodal (speech-only) and multimodal (speech+transcript) setups, evaluating zero-shot speech LLMs and ablating penalty configurations.

## Problem

Speech emotion recognition (SER) models are increasingly built on large speech-integrated LLMs, but they often exploit acoustic-prosodic demographic shortcuts rather than true emotion cues, leading to severe gender-related performance disparities. While bias has been studied in classifier-style SSL pipelines and ASR/translation tasks, end-to-end multilingual and multimodal speech LLMs remain under-benchmarked for affective computing fairness. Furthermore, prior work shows that simple multimodal fusion (e.g., adding text transcriptions) does not reliably mitigate fairness gaps, necessitating explicit optimization strategies that avoid severe accuracy-fairness trade-offs.

## Method

The approach builds on the Qwen2-Audio-7B-Instruct backbone, utilizing Low-Rank Adaptation (LoRA) with rank r = 16, alpha = 32, and dropout = 0.05. The architecture processes either speech audio alone (unimodal) or speech paired with ground-truth transcripts (multimodal). The primary task is optimized via standard cross-entropy empirical risk minimization (ERM).

To enforce fairness, the method computes conditional mean cross-entropy losses for female and male subgroups within each language, identifies the worst-case language-wise male-female loss gap, and penalizes it using a MinMaxGAP regularizer with penalty power p = 2. To prevent the fairness penalty from dominating early training stages, an adaptive Lagrange multiplier mechanism updates the regularization weight lambda dynamically based on development-set fairness gaps relative to a target tolerance threshold epsilon = 0.02, bounded between lambda = 0 and lambda_max = 10.0.

## Experimental setup

Experiments use the MELD-ST dataset comprising 29,252 total utterances across English, Japanese, and German with manually annotated speaker genders (14,244 female, 15,008 male; split into 23,368 train, 2,884 valid, 3,000 test). Models are trained for up to 20 epochs with an effective batch size of 64, learning rate 5e-5, weight decay 0.01, and early stopping patience of 5. Baseline models evaluated in a zero-shot setting include Qwen2-Audio-7B-Instruct, Voxtral-Mini-3B, gpt-4o-mini-audio, Kimi-Audio-7B-Instruct, and Ultravox-0.4. Evaluation metrics include weighted F1 (W-F1), Accuracy (ACC), and gender bias gaps across True Positive Rate (TPR), False Positive Rate (FPR), W-F1, ACC, and their composite mean (AVG).

## Results

In the multilingual multimodal setting, ERM-MinMaxGAP achieves 57.68 W-F1 and 58.65 ACC, outperforming the best baseline by +5.03% W-F1 and +3.62% ACC while lowering the AVG gender bias gap to 3.53. In the unimodal setting, it attains 51.38 W-F1 and 54.32 ACC (+5.49 W-F1 and +9.75 ACC over the strongest baseline). Ablation studies demonstrate that fixed high penalty weights (e.g., lambda = 5 or 10) severely degrade SER performance down to ~30% accuracy, validating the necessity of the adaptive weighting strategy. A penalty power of p = 2 offers a superior fairness-utility profile compared to p = 1.

| System | Multimodal W-F1 | Multimodal ACC | Multimodal AVG Gap | Unimodal W-F1 | Unimodal ACC | Unimodal AVG Gap |
|---|---|---|---|---|---|---|
| Qwen2-Audio | 34.62 | 30.79 | 4.44 | 34.89 | 33.31 | 5.51 |
| Voxtral-Mini-3B | 50.04 | 55.03 | 3.30 | 44.78 | 44.52 | 5.55 |
| gpt4o-mini-audio | 52.65 | 51.76 | 4.95 | 45.89 | 44.57 | 4.43 |
| Kimi-Audio-7B | 42.34 | 42.56 | 4.00 | 40.27 | 39.96 | 5.27 |
| Ultravox-0.4 | 32.45 | 30.78 | 4.93 | 27.43 | 25.29 | 1.94 |
| ERM-MinMaxGAP (Ours) | 57.68 | 58.65 | 3.53 | 51.38 | 54.32 | 4.34 |

## Limitations

The benchmark is limited to three languages (English, Japanese, German) derived from a single conversational corpus lineage (MELD), potentially restricting cross-domain and low-resource generalizability. Speaker gender labels were manually inferred from audiovisual metadata rather than self-reported demographics, which risks misclassification or overlooking non-binary identities. Additionally, the approach focuses exclusively on binary gender disparities and does not address intersecting demographic axes like age, accent, or ethnicity.

## Why read this

Researchers and engineers building deployment-ready speech-LLM agents will learn how to resolve the accuracy-fairness trade-off using adaptive worst-group regularization rather than naive multi-task or post-hoc tuning.

## Code

- https://github.com/zihaurpang/ERM-MinMaxGAP

## Applications

Fair and inclusive affective conversational agents, emotionally-aware customer call-center analytics, and unbiased automated mental health assessments.

## Institutions / 機構

Kyoto University, Agency for Science, Technology, and Research

**Funding / 經費:** Japan Science and Technology Agency, A*STAR, National Research Foundation, Singapore

## Related

- (link related pages by id as the wiki grows)
