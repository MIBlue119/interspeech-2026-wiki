---
id: sedaghati26_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1771
pdf: https://www.isca-archive.org/interspeech_2026/sedaghati26_interspeech.pdf
---

# VoxWatermark: A Large-Scale Benchmark for Audio Watermark Detection under Perturbations

*Farnaz Sedaghati, Yuxi Wang, Zicheng Weng, Wei Rao*

[PDF](https://www.isca-archive.org/interspeech_2026/sedaghati26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sedaghati26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1771)

**TL;DR** — VoxWatermark is a massive audio watermarking benchmark spanning 126,513 hours across 25 languages, designed to evaluate detectors under rigorous no-box, black-box, and white-box perturbations. The authors also propose AudioWMD, a stochastic query-stability meta-detector that outperforms single-query baselines under white-box and clean OOD conditions.

## Key contributions

- Constructed VoxWatermark, covering 126,513.89 hours of audio, 25 languages, 91,090K samples, and 10 distinct watermarking methods (4 neural, 6 traditional).
- Introduced a deployment-oriented perturbation protocol encompassing no-box (17 signal distortions/codecs), black-box (HSJA, Square), and white-box attacks.
- Proposed AudioWMD, a two-stage detector using stochastic query transformations (K=8) and a 5-dimensional meta-feature logistic regression classifier.
- Open-sourced the full dataset and codebase to establish a standardized framework for audio provenance and watermark detection.

## Problem

As text-to-speech models achieve human-like realism, malicious impersonation and misinformation risks have escalated, making robust audio watermarking and detection critical. However, prior benchmarks (like AudioMarkBench and RAW-Bench) focus narrowly on watermark payload recovery or perceptual quality rather than systematic, detector-level evaluation under realistic distribution shifts and unknown embedding methods. Furthermore, existing detectors fail catastrophically when confronted with out-of-domain languages, unseen watermarking algorithms, and adversarial perturbations.

## Method

AudioWMD frames watermark detection as a binary classification task executed in a two-stage pipeline. In Stage I, a base detector processes 16 kHz log-mel spectrograms using a ConvNeXtV2-style backbone trained with binary cross-entropy loss on 61,200 clean and watermarked samples (covering 6 seen watermarking schemes without augmentations). In Stage II (query-statistics meta detection), each input clip undergoes K=8 stochastic transformations (including the original clip plus time-stretching, pitch-shifting, additive noise, gain scaling, and time-masking). The base detector generates a confidence score for each transformed variant.

From these K scores, AudioWMD extracts a compact 5-dimensional statistical feature vector consisting of the mean score, standard deviation, score range, positive occupancy ratio, and decision-flip rate relative to the original query. This vector is fed into a logistic-regression meta-classifier to output the final watermark probability. This design explicitly evaluates score consistency and stability under distribution shifts rather than relying on a single static forward pass.

## Experimental setup

The benchmark uses 60,000 unwatermarked clips (83.4 hours across LibriSpeech, Common Voice 25-language set, VCTK, and AISHELL-1) scaled up via 10 watermarking schemes to 126,513 hours total. Training uses 6 seen schemes (LSB, QIM, DSSS, AudioSeal, Timbre, Phase Coding); evaluation uses 2 OOD test sets featuring 3 unseen schemes (Patchwork, Echo, WavMark) with cross-lingual (non-EN/ZH Common Voice) and cross-accent (VCTK) splits. Models are compared against reproduced WMD using AUROC, Accuracy, Precision, Recall, and F1.

## Results

On the validation set, AudioWMD achieves an AUROC of 88.3% and Accuracy of 84.0%, outperforming the reproduced WMD baseline (72.0% AUROC, 67.0% Accuracy). On OOD Test Set 1, AudioWMD achieves an AUROC of 63.8% versus WMD's 57.1%. Under white-box attacks, AudioWMD shows massive resilience gains, reaching 77.15% AUROC on Test Set 1 compared to WMD's 48.63%. 

However, AudioWMD does not win everywhere: it struggles significantly with black-box gradient approximations like HSJA spec on Test Set 1, where its True Positive Rate drops to 3.91% compared to WMD's 96.09%. Under no-box background noise, codecs, and temporal shifts, both models experience severe performance degradation toward random chance levels.

| System | Dataset | AUROC (%) | Accuracy (%) | White-Box AUROC (%) |
|---|---|---|---|---|
| AudioWMD | Validation | 88.3 | 84.0 | - |
| WMD [27] | Validation | 72.0 | 67.0 | - |
| AudioWMD | Test Set 1 | 63.8 | 53.0 | 77.15 |
| WMD [27] | Test Set 1 | 57.1 | 55.0 | 48.63 |
| AudioWMD | Test Set 2 | 63.2 | 58.0 | 70.02 |
| WMD [27] | Test Set 2 | 57.9 | 56.0 | 41.18 |

## Limitations

Performance under no-box environmental, codec, and temporal perturbations still drops drastically near chance level for both detectors, highlighting a vulnerability to real-world transmission channels. The meta-detector exhibits a blind spot against specific black-box score-based and gradient-estimated attacks (e.g., HSJA spectrogram variants), proving that query-stability alone does not defend against all adversarial strategies. The evaluation is currently restricted to 16 kHz mono audio and fixed-length 5-second segments.

## Why read this

Read this paper if you build synthetic speech attribution systems or AIGC provenance filters and need a rigorous benchmark to test your detector's out-of-domain and adversarial robustness. You will take away a comprehensive multi-method watermarking dataset and architectural insights into why query-stability meta-features help against white-box gradients but falter against certain black-box attacks.

## Code

- https://github.com/wailywang/VoxWatermark

## Applications

AI-generated speech detection, media source attribution, content provenance verification, and combating audio deepfakes in open-world transmission environments.

## Related

- (link related pages by id as the wiki grows)
