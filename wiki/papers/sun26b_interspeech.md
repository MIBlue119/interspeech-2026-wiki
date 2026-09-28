---
id: sun26b_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1006
pdf: https://www.isca-archive.org/interspeech_2026/sun26b_interspeech.pdf
---

# PAN-Mask: Pathology-Aware Neurological Masking with End-to-End Learnable Weights for Neurological Disorder Detection from Speech

*Qi Sun, Junhao Fan, Boao Jing, Ziqi Chen, Guodong Lin, Wei-Qiang Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/sun26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1006)

**TL;DR** — PAN-Mask is a pathology-aware regularization framework for clinical speech classification that replaces random masking in self-supervised models with end-to-end learnable, disease-directed temporal masking. Evaluated across six datasets and five languages, it yields an average accuracy gain of 13.82 percentage points over conventional random masking.

## Key contributions

- Formulates disease-aware temporal masking as a task-aware regularization strategy to prevent shortcut learning in pathological speech classification.
- Designs an end-to-end learnable pathology detector computing frame-level attention over six interpretable acoustic descriptors without manual feature engineering.
- Achieves consistent cross-disease and cross-lingual performance gains across Alzheimer's, Parkinson's, and depression datasets in five languages.
- Provides interpretable clinical insights by showing how learned feature weights diverge into condition-specific biomarker patterns during training.

## Problem

Self-supervised speech models like wav2vec 2.0 and WavLM inherit a uniform information assumption from general pretraining, using content-agnostic random masking or SpecAugment that treats all frames as interchangeable. In clinical speech, however, diagnostic markers are sparse and temporally localized. This causes models to suffer from shortcut learning, relying disproportionately on a few salient frames while failing to capture the distributed complementary biomarkers necessary for robust clinical assessment.

## Method

The PAN-Mask pipeline processes raw waveforms sampled at 16 kHz, partitioned into overlapping frames (length 512, hop 256) to extract a 6-dimensional feature vector per frame. These six features target rhythm irregularity, pause likelihood, pitch monotony, energy drop, voice quality anomaly, and spectral periodicity, and are normalized per utterance via min-max scaling to [0, 1].

A lightweight two-layer attention module (bottleneck dimension 16, fewer than 250 parameters) maps the normalized features to unnormalized logits, which are aggregated via a temperature-scaled softmax to produce a scalar pathology score per frame between 0 and 1. During training, 40% of waveform samples are masked, with 90% of the budget concentrated on frames exceeding the 85th salience percentile to suppress dominant pathological cues and force the model to learn from remaining distributed signals.

To allow gradient flow through the discrete masking operation, the hard mask is relaxed into a continuous soft mask via a sigmoid gate with a learnable threshold initialized at zero and a fixed temperature of 0.1. The masked waveform is normalized and passed through a frozen or fine-tuned WavLM Base encoder with a linear classification head, optimized jointly via standard cross-entropy loss using the AdamW optimizer.

## Experimental setup

Evaluated on six clinical speech datasets: ADReSS (English AD), ADReSSo (English AD), NCMMSC2021 (Mandarin AD), ADReSS-M (multilingual AD), NeuroVoz (Spanish PD), and Androids Reading Corpus (Italian depression). Models are fine-tuned using WavLM Base with a batch size of 4, learning rate 2e-5, weight decay 0.01, cosine schedule with 10% warmup, and 20 epochs on 10-second truncated/padded audio.

## Results

PAN-Mask achieves an average accuracy of 83.79% across all six datasets compared to 69.97% for random masking (a mean improvement of 13.82 pp), and outperforms standard fine-tuning without masks across all benchmarks. On individual datasets, it records 86.36% on ADReSS (+22.72 pp over random masking), 76.47% on ADReSSo (+11.76 pp), 96.67% on NCMMSC (+16.65 pp), 70.83% on ADReSS-M (+10.41 pp), 82.61% on Androids (+13.04 pp), and 89.77% on NeuroVoz (+8.31 pp). Ablations demonstrate that end-to-end learned feature weights (P. E2E) consistently outperform fixed uniform weights (P. fixed), avoiding training instabilities.

| Dataset | Task | Lang. | Random Mask (R.M.) | PAN-Mask (P.M.) | Baseline Compare | Delta |
|---|---|---|---|---|---|---|
| ADReSS | AD | EN | 63.64 | 86.36 | 80.0 | +22.72 |
| ADReSSo | AD | EN | 64.71 | 76.47 | 84.1 | +11.76 |
| NCMMSC | AD | ZH | 80.02 | 96.67 | 82.4 | +16.65 |
| ADReSS-M | AD | Multi | 60.42 | 70.83 | 67.4 | +10.41 |
| Androids | DEP | IT | 69.57 | 82.61 | 72.0 | +13.04 |
| NeuroVoz | PD | ES | 81.46 | 89.77 | 85.9 | +8.31 |

## Limitations

The framework relies exclusively on acoustic features and lacks multimodal semantic or linguistic transcription integration, which limits performance on tasks where text transcripts provide crucial complementary signal (such as semantic content in Alzheimer's picture description tasks). The evaluation is bounded to three neurological/psychiatric conditions across five languages, requiring further validation on larger scale, highly diverse clinical corpora.

## Why read this

Speech and machine learning researchers working on clinical audio biomarkers or self-supervised regularization will find a lightweight, task-aware masking strategy that effectively prevents shortcut learning. It demonstrates how end-to-end attention over interpretable acoustic descriptors can replace random masking while providing cross-lingual and cross-disease generalizability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated digital health screening and computer-aided early detection of neurological and psychiatric disorders (such as Alzheimer's, Parkinson's, and depression) from voice recordings.

## Related

- (link related pages by id as the wiki grows)
