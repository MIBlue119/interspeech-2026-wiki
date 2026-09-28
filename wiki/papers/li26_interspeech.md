---
id: li26_interspeech
category: speech-deepfake-detection
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-161
pdf: https://www.isca-archive.org/interspeech_2026/li26_interspeech.pdf
---

# XAI-Grounded Explanation Generation for Speech Deepfake Detection with Training-Free Multimodal Large Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/li26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-161)

**TL;DR** — A training-free framework called XGEG combines traditional spectrogram attribution maps and acoustic SHAP features with vision-LLMs to generate time-frequency grounded explanations for speech deepfake detection, increasing inside localization accuracy by over 45% compared to pure audio baselines.

## Problem

Current speech deepfake detection (SDD) models output binary decisions without principled justifications, leading to poor generalization as they rely on superficial artifacts. Existing explainable methods either use low-level traditional XAI signals that are hard for humans to interpret or rely on multimodal LLMs that generate ungrounded and hallucinated text descriptions due to a lack of dedicated explanation datasets. This paper addresses both the absence of structured explanation data in SDD and the need for trustworthy, faithful, and specific natural language rationales.

## Method

The authors propose the XAI-Grounded Explanation Generation (XGEG) framework using pre-trained wav2vec 2.0, HuBERT, and WavLM foundation models as feature extractors alongside a lightweight openSMILE eGeMAPSv02 MLP classifier. Without fine-tuning the detectors, they extract traditional XAI evidence—Integrated Gradients (IG), saliency maps, and LIME—to generate spectrogram attribution heatmaps, while SHAP provides acoustic feature importance scores. These multimodal signals are processed by the vision-LLM Qwen2.5-VL-7B to summarize temporal and frequency ranges, and subsequently synthesized by the audio-capable multimodal LLM Qwen3-Omni-30B (30B parameters) into a strict structured text format containing abnormality time-frequency ranges, free-text explanations, and XAI aggregation notes. The approach is used to construct a large-scale explainable SDD dataset comprising approximately 65,000 instances derived from the PartialSpoof dataset.

## Results

Experiments were evaluated on the PartialSpoof dataset (roughly 25k training, 25k development, and 71k test samples). Human evaluation across 600 samples and 20 annotators using 5-point Likert scales showed that XAI-guided settings significantly improve correctness, evidence support, and specificity (overall preference rising to 1.50 average selections compared to 0.35 for pure audio). For temporal localization, combining single-model XAI achieved an Inside Accuracy (IA) of 0.811 compared to 0.049 for pure audio. A novel Area-Normalised Local Logit Sensitivity fidelity test with 1.0% amplitude perturbation demonstrated that XAI-guided methods achieve up to 327x higher sensitivity density than the audio-only baseline, confirming strong model reliance on the identified regions.

## Code

- https://github.com/glam-imperial/xai-grounded-speech-deepfake

## Applications

Speech and ML engineers building trustworthy and transparent speech deepfake detection systems for forensic auditing, media verification, and responsible AI deployment.

## Limitations

Explaining genuine (bona fide) audio samples remains challenging because demonstrating the absence of acoustic anomalies is inherently harder than identifying specific fake synthesis artifacts.

## Related

- (link related pages by id as the wiki grows)
