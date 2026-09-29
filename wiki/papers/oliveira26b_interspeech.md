---
id: oliveira26b_interspeech
category: resources-evaluation
labels: [robustness-noise]
institutions: ["University of Hamburg"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2597
pdf: https://www.isca-archive.org/interspeech_2026/oliveira26b_interspeech.pdf
---

# Too Good to Be True: A Study on Modern Automatic Speech Recognition Systems for the Evaluation of Speech Enhancement

*Danilo Oliveira, Tal Peer, Timo Gerkmann*

[PDF](https://www.isca-archive.org/interspeech_2026/oliveira26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/oliveira26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2597)

**Category:** `resources-evaluation` · **Labels:** `robustness-noise`

**TL;DR** — This paper investigates how modern automatic speech recognition (ASR) models correlate with human recognition of speech enhancement (SE) outputs, revealing that large-scale noisy-trained transducer and attention models best track human trends but can be uninformative for acoustics-focused evaluations. It demonstrates that choice of ASR architecture, text normalization, and handling of hallucination outliers dramatically alter SE system rankings.

## Key contributions

- Evaluates 7 distinct ASR model architectures (ranging from 18.9M to 600M+ parameters) on human-transcribed speech enhancement outputs across various SNRs (-2.5 to 10 dB).
- Conducts a listening experiment with 20 human participants using the EARS-WHAM dataset to benchmark ASR word accuracy (WAcc) against human perception.
- Demonstrates that ASR models trained on large-scale noisy data (like Parakeet TDT and Whisper) achieve high system-level correlation with human listeners (SRCC = 1.00) but consistently outperform human accuracy absolute numbers.
- Highlights critical vulnerabilities in using ASR for SE evaluation, including Whisper hallucination looping (yielding WAcc down to -2061%) and ranking shifts caused by punctuation handling and reference text choices.

## Problem

Word error rate (WER) derived from ASR systems is frequently used as an objective metric to evaluate speech enhancement (SE) performance, notably in challenges like the DNS Challenge. However, prior literature rarely justifies the choice of ASR model, and WER calculations are highly sensitive to unstated text normalization pipelines, model sizes, training data, and acoustic robustness. Furthermore, modern end-to-end ASR models remain underexplored for speech intelligibility prediction compared to traditional hybrid GMM-HMM systems. This lack of standardization makes it difficult to interpret whether ASR-based metrics evaluate true acoustic intelligibility, linguistic context utilization, or artifact penalization.

## Method

The study evaluates five representative classes of ASR models: QuartzNet-15x5 (18.9M parameters, convolutional CTC), wav2vec2 LARGE LV-60k (317M parameters, SSL with CTC fine-tuning), Parakeet TDT v2 (600M parameters, FastConformer encoder with Token-and-Duration Transducer trained on 120,000 hours), Whisper Base/Large variants (attention encoder-decoder trained on weakly supervised multilingual data), and Distil-Whisper Large v3. These are tested on outputs from five diverse SE models: SGMSE+ (diffusion generative), SB-SGMSE+ (Schrödinger bridge generative), NCSN++M (predictive complex spectral mapping, 27.8M parameters), StoRM (predictive-generative cascaded hybrid), and SE-Mamba (state-space predictive model). All SE models were trained on the VBDMD dataset. 

To compute robust metrics without catastrophic outliers skewing averages, word accuracy is clipped via WAcc = max(1 - WER, 0). Error rates are systematically decomposed into substitutions (S), deletions (D), and insertions (I) across 2.5 dB input SNR bins. The evaluation measures system-level and utterance-level Pearson (PCC) and Spearman (SRCC) correlation coefficients against a listening experiment involving 20 human participants transcribing 30 audio files each from the EARS-WHAM dataset. Text normalization builds on the jiwer standardize transform by additionally stripping punctuation, expanding informal contractions like 'gonna' and 'wanna', and converting numbers into words.

## Experimental setup

Evaluations use the EARS-WHAM test set (downsampled to 16 kHz), comprising a subset of 30 files for the human listening experiment and 676 total files for broader ASR analysis across -2.5 to 17.5 dB SNR. Baselines include instrumental SE metrics: ESTOI (intelligibility), POLQA v3 (full-reference quality), SCOREQ (reference-free quality), and LPS (phoneme accuracy via wav2vec2 classifier). ASR models range from 18.9M to over 600M parameters. Correlations are computed using 5,000 bootstrap samples to determine 95% confidence intervals, and Kendall's tau is used to evaluate rank consistency under pipeline variations.

## Results

Parakeet TDT v2 and Whisper models outperformed human annotators on absolute WAcc across all settings (e.g., Parakeet achieved 97.0% clean WAcc vs humans at 95.1%; Whisper Large v3 Turbo achieved 98.1%). At the system level, Whisper Base (En) and Parakeet TDT v2 achieved the highest Spearman correlation with humans (SRCC = 1.00 [0.75, 1.00] and [0.86, 1.00] respectively). Without WAcc clipping, Whisper's outlier hallucination loops (reaching WAcc of -2061% due to repetition) degraded utterance-level PCC from 0.82 down to 0.32. 

In terms of SE system rankings, the predictive model NCSN++M achieved the highest speech recognition rates among SE systems (e.g., 91.4% WAcc with Whisper Turbo), while generative SGMSE+ yielded lower ASR accuracy (77.9% WAcc) despite scoring well on non-intrusive quality metrics like SCOREQ (3.46). ASR rankings frequently disagreed with acoustics-focused metrics like POLQA and ESTOI. Furthermore, keeping punctuation instead of removing it caused CTC models QuartzNet and wav2vec2 to suffer a ~10% WAcc drop and altered system rankings in 18.6% and 16.6% of samples.

| SE System / Condition | Human WAcc (%) | QuartzNet WAcc (%) | wav2vec2 WAcc (%) | Parakeet TDT WAcc (%) | Whisper Turbo WAcc (%) | POLQA |
|---|---|---|---|---|---|---|
| Clean | 95.1 | 94.6 | 96.1 | 97.0 | 98.1 | — |
| Noisy | 85.6 | 58.2 | 70.2 | 95.0 | 94.1 | 1.86 |
| SE-Mamba (Predictive) | 77.7 | 72.7 | 76.5 | 87.2 | 86.7 | 2.38 |
| NCSN++M (Predictive) | 81.2 | 71.2 | 81.1 | 89.8 | 91.4 | 2.55 |
| StoRM (Hybrid) | 76.7 | 66.2 | 76.3 | 85.6 | 85.8 | 2.37 |
| SGMSE+ (Generative) | 69.0 | 59.7 | 68.5 | 73.4 | 77.9 | 2.41 |

## Limitations

The study focuses exclusively on English-language speech evaluation, limiting conclusions regarding multilingual or tonal language ASR behavior. The listening experiment sample size (20 participants) and utterance subset (30 files) are relatively small, although scaled up to 676 files for broader analysis. The investigation is restricted to models under 1 billion parameters and does not explore custom domain-adapted ASR fine-tuning specifically for SE evaluation.

## Why read this

Speech and ML engineers building or evaluating speech enhancement systems should read this to understand why raw WER can be a misleading proxy for human intelligibility and acoustic quality. It provides critical guidance on selecting robust ASR backbones (like Parakeet or Whisper) and standardizing text normalization pipelines to ensure reproducible benchmark rankings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Standardizing automated evaluation pipelines for speech enhancement, noise suppression challenges, and telecommunication audio quality assessment.

## Institutions / 機構

University of Hamburg

## Related

- (link related pages by id as the wiki grows)
