---
id: braun26_interspeech
category: health-clinical
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2806
pdf: https://www.isca-archive.org/interspeech_2026/braun26_interspeech.pdf
---

# Mitigating Scoring Errors and Compensating for Nonverbal Subtests in Speech-Based Dementia Assessment

*Franziska Braun, Christopher Witzl, Andreas Erzigkeit, Hartmut Lehfeld, Thomas Hillemacher, Tobias Bocklet, Korbinian Riedhammer*

[PDF](https://www.isca-archive.org/interspeech_2026/braun26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/braun26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2806)

**Category:** `health-clinical` · **Labels:** `self-supervised`

**TL;DR** — This study automates the German Syndrom-Kurz-Test (SKT) for dementia screening by fusing rule-based transcript scores with Whisper encoder-decoder embeddings to correct transcription errors and compensate for omitted motor subtests. The proposed models achieve strong correlations with expert-derived overall ratings and robustly discriminate between healthy controls, mild cognitive impairment, and dementia.

## Key contributions

- Established a rule-based ASR baseline using Whisper transcripts to evaluate SKT subtests and quantified deviations from manual expert scoring.
- Proposed a deep correction approach combining rule-based scores with Whisper encoder/decoder embeddings via an MLP to minimize transcription-induced scoring errors.
- Developed a deep compensation framework that aggregates available verbal subtest representations to approximate expert overall SKT total scores despite omitting physical motor tasks.
- Identified an optimal, highly efficient clinical subtest sequence (interference, recall, counting) that maximizes dementia classification accuracy in minimal steps.

## Problem

Speech-based dementia screening offers a non-invasive alternative to traditional neuropsychological evaluations, but it faces two major bottlenecks: severe transcription degradation due to atypical pathological speech patterns, dialects, and structured test responses, and the inability of speech models to capture nonverbal or motor subtests (such as token sorting). Prior work evaluating isolated tasks often fails to capture the multi-domain profile required for early detection like mild cognitive impairment (MCI). Addressing these challenges is vital for deploying reliable automated diagnostic tools in routine clinical workflows.

## Method

The system processes complete normalized audio recordings (8 to 155 seconds) using OpenAI's Whisper (small and large-v3) via beam search with a beam size of 5 and N-gram repetition penalty restrictions to handle long pauses in counting and repetitive interference test sequences. Rule-based scores are derived by interpolating word-level timestamps to measure processing times (0-60 seconds for attention subtests 1, 3, 6, 7) or counting missing/synonymous objects (0-12 items for memory subtests 2, 8, 9), which are then converted into age- and education-normalized SKT norm scores (0-3).

For deep correction, raw rule-based scores and unpooled Whisper embedding vectors from the final layer (768-dim for small, 1280-dim for large-v3) are fused. Embeddings are first passed through a single-head self-attention block, mean-pooled, and layer-normalized, then fed alongside scalar scores into separate fully connected layers (output dim 256). A 2-layer MLP with a hidden dimension of 64 and ReLU activations predicts corrected raw subtest scores using MSE loss.

For deep compensation, subtest models are sequentially added to predict the aggregate SKT total score (0-27). Normalized outputs from the correction modules are concatenated and passed through an MLP trained via MSE loss against expert-assigned total scores. Models are trained using the Adam optimizer with a batch size of 8, learning rates ranging from 1e-3 to 1e-2, and early stopping patience of 5 epochs over a maximum of 100 epochs under 5-fold cross-validation.

## Experimental setup

Evaluated on a subset of a clinical German corpus comprising 158 subjects (63 men, 95 women; aged 49-89 years, mean 73.69) spanning no cognitive impairment (NCI), mild cognitive impairment (MCI), and dementia (DEM) diagnostic groups, recorded under routine clinical face-to-face conditions with surgical masks and local dialects. Assessed via stratified 5-fold cross-validation with speaker-distinct splits. Compared against pure rule-based (RB) scoring and configurations using encoder (ENC) or decoder (DEC) embeddings alone. Metrics include Root Mean Square Error (RMSE) with standard deviation and Pearson correlation coefficient (r) relative to manual expert scores.

## Results

Incorporating Whisper embeddings alongside rule-based scores (RB+ENC and RB+DEC) substantially reduces error, notably improving Pearson correlation by up to 0.35 on error-prone ASR tasks like counting (subtest 6, where WER exceeded 100% due to silent pauses and hallucinations). For instance, Whisper-large-v3 RB+ENC achieves an RMSE of 3.70 on subtest 6 compared to 8.12 for rule-based scoring alone. For total score estimation, deep compensation achieves very strong correlations with expert ratings up to r = 0.94 (whisper-small) and 0.95 (whisper-large-v3) despite completely omitting motor subtests 4 and 5.

An optimal subtest sequence starting with interference (7), recall (8), and counting (6) yields near-perfect correlations above 0.9. However, the models show lower performance on isolated recognition memory subtests (subtest 9, r around 0.74-0.82) where patients frequently utilize negation or point instead of naming objects.

| System / Condition | SKT Total RMSE (t=0) | SKT Total RMSE (t=3) | SKT Total RMSE (t=6) | Pearson r (Final) |
|---|---|---|---|---|
| RB Baseline (Small) | 6.93 | 3.75 | 2.58 | 0.89 |
| RB+ENC Deep (Small) | 3.42 | 2.05 | 1.93 | 0.94 |
| RB+DEC Deep (Small) | 3.40 | 2.17 | 1.97 | 0.94 |
| RB+ENC Deep (Large-v3) | 3.25 | 2.04 | 1.73 | 0.95 |
| RB+DEC Deep (Large-v3) | 3.34 | 2.01 | 1.73 | 0.95 |

## Limitations

The study is bounded by a relatively small, single-center German clinical dataset of 158 subjects, limiting demographic diversity and cross-linguistic generalization. The evaluation relies on retrospective routine clinical audio recorded with surgical masks and ambient clinical noise, which restricts control over acoustic variables. Furthermore, certain tasks (such as object recognition involving pointing or negation) cannot be fully captured via speech audio alone, highlighting fundamental limits in purely speech-based compensation for visual-gestural subtests.

## Why read this

Researchers building automated speech-based healthcare assessment systems will learn how to effectively combine symbolic rule-based transcript metrics with dense self-supervised foundation model embeddings to correct downstream ASR errors. It offers a practical blueprint for clinical test score estimation when complete test batteries cannot be captured via speech alone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated clinical decision support systems for non-invasive, efficient early dementia screening and cognitive impairment monitoring in elderly care.

## Institutions / 機構

Technische Hochschule Nurnberg, Geromed GmbH, PMU Klinikum Nurnberg

**Funding / 經費:** Deutsche Forschungsgemeinschaft

## Related

- (link related pages by id as the wiki grows)
