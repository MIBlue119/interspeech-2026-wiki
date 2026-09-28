---
id: fan26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1512
pdf: https://www.isca-archive.org/interspeech_2026/fan26_interspeech.pdf
---

# PrefSQA: Pairwise Preference Prediction for Speech Quality Assessment and the Critical Role of High Quality Datasets

[PDF](https://www.isca-archive.org/interspeech_2026/fan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1512)

**TL;DR** — The paper introduces PrefSQA, a MOS-free pairwise preference prediction framework for speech quality assessment that incorporates uncertainty-aware logits, an impairment attention head, and a non-matching-reference head to achieve robust performance across diverse datasets.

## Problem

Traditional mean opinion score (MOS) prediction relies on scalar ratings that suffer from rater variability, protocol discrepancies, and high labeling noise, which obscure performance differences among models. Although preference-based assessment reduces this variability, public preference datasets remain scarce and often depend on noisy MOS-derived labels rather than direct comparative listening tests.

## Method

PrefSQA builds on dual semantic-acoustic encoders using wav2vec 2.0 and WavLM, passing features through a residual processor and a BLSTM with average pooling. It introduces uncertainty-aware Bradley-Terry preference logits with a clamped variance-based temperature denominator to control comparison sharpness. Additionally, a lightweight 1-D convolutional impairment attention head emphasizes local distortions, while a feature-level non-matching-reference (NMR) head uses in-batch comparisons to refine global rankings. The model is trained using Bradley-Terry logistic loss combined with an auxiliary NMR binary cross-entropy loss weighted by lambda equals 0.9.

## Results

Evaluations are conducted on five refined datasets including NISQA, SOMOS-clean, CHiLi matching and non-matching sets (mixing LibriSpeech and CHiME-3 noise at SNR -20 to 30 dB), SpeechEval, SpeechJudge, and the unseen IUB-COSINE test set. PrefSQA outperforms baselines like SQAPP and UPPSQA particularly on low-noise simulated datasets and human-preference benchmarks, while MOS-derived datasets show smaller performance margins due to inherent label noise.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers developing speech enhancement, text-to-speech, and automatic speech recognition systems can use PrefSQA for robust, scalable speech quality assessment and model evaluation.

## Limitations

Performance gains are constrained on MOS-derived datasets due to the inherent labeling noise present in data originally collected for absolute scalar ratings.

## Related

- (link related pages by id as the wiki grows)
