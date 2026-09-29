---
id: carvalho26_interspeech
category: asr
labels: [multilingual, self-supervised]
institutions: ["INESC-ID", "Universidade de Lisboa"]
code: https://github.com/Miamoto/mergewhisper
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1969
pdf: https://www.isca-archive.org/interspeech_2026/carvalho26_interspeech.pdf
---

# Exploring the potential and limitations of Model Merging for Multi-Domain Adaptation in ASR

*Carlos Carvalho, Francisco Teixeira, Thomas Rolland, Alberto Abad*

[PDF](https://www.isca-archive.org/interspeech_2026/carvalho26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/carvalho26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1969)

**Category:** `asr` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — The paper benchmarks 11 model merging algorithms for multi-domain European Portuguese ASR using Whisper Large-v3 and introduces BoostedTSV-M, achieving competitive in-domain accuracy while better preserving cross-lingual and out-of-distribution generalization compared to full joint fine-tuning.

## Key contributions

- Introduces MergeWhisper, an open-source extension of mergekit adding native support for Whisper architectures.
- Systematically benchmarks 11 merging algorithms across 3 paradigms (parameter-space, tau-space, tau-subspace) on 10 European Portuguese domains.
- Proposes BoostedTSV-M, mitigating rank collapse via singular-value boosting and substituting unstable orthogonal Procrustes with Newton-Schulz orthogonalization.
- Demonstrates that model merging bypasses the catastrophic forgetting of multilingual capabilities typically seen in joint full fine-tuning.

## Problem

Large speech foundation models are routinely adapted to new target domains via separate fine-tuning, yielding a proliferation of isolated checkpoints that complicate inference deployment. While joint fine-tuning on all data avoids checkpoint fragmentation, it requires access to historical training data that is frequently restricted by privacy or storage limits, and demands costly full retraining from scratch whenever new domains arrive. Sequential continual learning alternatives suffer from catastrophic forgetting and strong sensitivity to task presentation order. Model merging offers a non-sequential workaround by fusing independently trained domain checkpoints into a single parameter set, but its potential, trade-offs, and generalization capacity remain under-explored for speech foundation models.

## Method

The paper evaluates parameter-space (SOUP, Model Stock, Karcher Mean, Multi-SLERP), tau-space (TA, TIES, PCB, SCE), and tau-subspace (ISO-C, ISO-CTS, TSV-M) methods applied on top of Whisper Large-v3. To overcome numerical instabilities when retaining high rank percentages (above 50%), the authors replace the standard orthogonal Procrustes algorithm in TSV-M and ISO-CTS with Newton-Schulz orthogonalization (using 5 iterations and a quintic coefficient schedule). 

To combat rank collapse and the suppression of task-specific signals caused by sharply decaying singular values, the authors propose BoostedTSV-M. Prior to concatenating singular vectors and values across tasks, BoostedTSV-M calculates cumulative energy ratios and applies a lower-bound thresholding parameter beta (set to 0.3 after sweeping) to boost small singular values. The final merged model is constructed as theta_star = theta_0 + lambda * tau_BoostedTSV-M.

For training individual domain checkpoints (ID-FT), models are optimized for 3 epochs with a learning rate of 2e-6 and an effective batch size of 256. Full joint fine-tuning (Full-FT) runs for 10 epochs with a learning rate of 1e-5. All inferences use VAD-based segmentation via WhisperX with a beam size of 5 to mitigate hallucinations.

## Experimental setup

Evaluated on 10 European Portuguese (EP) corpora totaling ~350 hours of training data and 46.2 hours of test data (including 10 OOD test splits, African/Asian Portuguese, Brazilian Portuguese, English via OpenASR-HF, and 21 languages of FLEURS). Systems compared include zero-shot Whisper Large-v3-X, Full-FT, ID-FT upper bounds, and 11 merging variants. Metrics are Word Error Rate (WER) and Character Error Rate (CER) for unsegmented languages, implemented via HuggingFace using NVIDIA A100 (80GB) and RTX A6000 (48GB) hardware.

## Results

Full-FT drops in-domain EP WER from the zero-shot baseline of 15.62% down to 8.54% (and EP OOD from 25.21% to 17.65%), but causes degradation on English and multilingual FLEURS benchmarks due to catastrophic forgetting. BoostedTSV-M achieves the best overall EP average error rate of 11.55%, marginally beating Full-FT (11.58%) while substantially preserving out-of-distribution capabilities.

Parameter-space methods like Karcher Mean and Model Stock excel at non-EP OOD generalization (e.g., Model Stock achieves the best average FLEURS error rate of 6.79%), whereas tau-subspace methods dominate in-domain EP accuracy.

| System | EP ID WER (%) | EP OOD WER (%) | EP Full Avg. (%) | OpenASR-HF WER (%) | FLEURS Avg. (%) |
|---|---|---|---|---|---|
| Zero-shot | 15.62 | 25.21 | 18.82 | 7.17 | 7.43 |
| Full-FT | 8.54 | 17.65 | 11.58 | 8.83 | 9.63 |
| Karcher Mean | 10.23 | 17.63 | 12.70 | 7.12 | 7.43 |
| TSV-M w/ NS | 9.41 | 16.07 | 11.63 | 7.24 | 9.68 |
| BoostedTSV-M | 9.27 | 16.11 | 11.55 | 7.60 | 10.37 |

## Limitations

The study is restricted to European Portuguese and select language variants, leaving open whether the observed singular-value boosting hyperparameters translate effectively to highly tonyl or morphologically distant languages. The approach requires access to independently fine-tuned domain checkpoints and does not update or compress the base foundation model architecture itself. Furthermore, boosting task-specific singular values inherently trades away some cross-lingual and OOD transfer capabilities, exposing a friction point between specialization and generalization.

## Why read this

Speech and ML engineers dealing with multi-domain ASR deployment constraints should read this to learn how to bypass costly joint re-training and avoid checkpoint sprawl without sacrificing out-of-distribution robustness.

## Code

- https://github.com/Miamoto/mergewhisper

## Applications

Multi-domain conversational agents, localized speech transcription systems, and enterprise speech recognition deployed across diverse regional dialects.

## Institutions / 機構

INESC-ID, Universidade de Lisboa

**Funding / 經費:** Fundacao para a Ciencia e a Tecnologia, Portuguese Recovery and Resilience Plan

## Related

- [Merging the Knowledge of LLMs for Automatic Speech Recognition](futami26_interspeech.md) — shared technique · relatedness 2.3/3
- [Probing LoRA-to-LoRA Cross-Lingual Transfer for Unseen Low-Resource Conditions in Whisper-Based ASR](mondal26_interspeech.md) — same problem · relatedness 2.1/3
- [BELLA: Efficient Bilevel Learning with LoRA for Multilingual ASR](saif26_interspeech.md) — same problem · relatedness 2.1/3
- [Upcycling Pretrained Transformers into Mixture-of-Experts for Multilingual Speech Recognition](shinayama26_interspeech.md) — same problem · relatedness 2.1/3
- [Ecologically-Constrained Task Arithmetic for Multi-Taxa Bioacoustic Classifiers Without Shared Data](nihal26_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
