---
id: sun26b_interspeech
category: health
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1006
pdf: https://www.isca-archive.org/interspeech_2026/sun26b_interspeech.pdf
---

# PAN-Mask: Pathology-Aware Neurological Masking with End-to-End Learnable Weights for Neurological Disorder Detection from Speech

[PDF](https://www.isca-archive.org/interspeech_2026/sun26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1006)

**TL;DR** — PAN-Mask replaces content-agnostic random masking in self-supervised speech models with a task-aware regularization framework that selectively suppresses high-salience pathological frames, yielding an average 13.82 percentage point accuracy improvement across six clinical datasets.

## Problem

Self-supervised models like WavLM rely on uniform temporal masking strategies such as random masking and SpecAugment, which treat all frames as interchangeable and disrupt sparse, localized clinical biomarkers. Because pathological speech concentrates diagnostic cues in a few salient regions, uniform masking can encourage shortcut learning and obscure complementary, distributed biomarkers. This limits the cross-disease and cross-lingual generalizability of speech-based neurological disorder detection.

## Method

PAN-Mask computes six interpretable acoustic descriptors natively on the GPU via PyTorch/torchaudio: rhythm irregularity, pause likelihood, pitch monotony, energy drop, voice quality anomaly, and spectral periodicity. A two-layer attention module aggregates these descriptors into frame-level pathology salience scores, which parameterize a differentiable soft sigmoid mask with a learnable threshold. During training, 40% of the waveform is masked, with 90% of the budget concentrated on frames exceeding the 85th salience percentile. This masked input is fed into a fine-tuned WavLM Base encoder (94M parameters) and a linear cross-entropy classification head, with the entire pipeline optimized end-to-end via AdamW.

## Results

Evaluated on six datasets spanning three disorders (Alzheimer's disease, Parkinson's disease, depression) and five languages (English, Mandarin, Spanish, Italian, and multilingual), PAN-Mask achieves absolute accuracy gains of 8.31% to 22.72% over random masking baselines. It outperforms standard fine-tuned Wav2Vec 2.0 and various recent models on five out of six datasets without task-specific hyperparameter tuning. Ablations confirm that end-to-end learned feature weights outperform fixed uniform weights and prevent the 4.2% to 13.3% performance drops seen with conventional random masking.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers developing digital health tools for automated, non-invasive screening and monitoring of neurological or psychiatric disorders (such as Alzheimer's, Parkinson's, and depression) from speech audio.

## Limitations

The system operates solely on acoustic features and speech waveforms, trailing multimodal systems that combine acoustic and semantic/linguistic embeddings on specific benchmarks like ADReSSo.

## Related

- (link related pages by id as the wiki grows)
