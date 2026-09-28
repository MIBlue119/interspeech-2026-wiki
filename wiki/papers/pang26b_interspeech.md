---
id: pang26b_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3143
pdf: https://www.isca-archive.org/interspeech_2026/pang26b_interspeech.pdf
---

# ERM-MinMaxGAP: Benchmarking and Mitigating Gender Bias in Multilingual Multimodal Speech-LLM Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/pang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3143)

**TL;DR** — The paper introduces a multilingual multimodal benchmark for speech emotion recognition (SER) gender bias and proposes ERM-MinMaxGAP, which improves SER performance by up to 9.75% while mitigating gender disparity.

## Problem

Speech emotion recognition (SER) models often exploit acoustic shortcuts related to speaker demographics, leading to significant performance disparities between genders. While fairness has been studied in traditional classifiers and text-based speech LLMs, gender bias in multilingual and multimodal speech LLMs for SER remains underexplored. Furthermore, standard multimodal fusion often improves accuracy without consistently reducing demographic bias, necessitating explicit fairness-aware training objectives.

## Method

The authors propose ERM-MinMaxGAP, combining standard supervised fine-tuning via empirical risk minimization (ERM) with a novel MinMaxGAP regularizer and an adaptive fairness-weight mechanism. Built on the Qwen2-Audio-7B-Instruct backbone using LoRA (r = 16, alpha = 32), the model minimizes cross-entropy loss alongside a quadratic penalty targeting the maximum male-female loss gap across languages and modalities. The fairness weight is dynamically updated using a Lagrange multiplier method based on development set performance against a target threshold epsilon of 0.02. Experiments evaluate both unimodal (speech-only) and multimodal (speech plus ground-truth transcript) settings.

## Results

Evaluated on the MELD-ST benchmark spanning English, Japanese, and German across 29,252 total utterances, ERM-MinMaxGAP is compared against zero-shot baselines including Qwen2-Audio, Voxtral-Mini-3B, gpt4o-mini-audio, kimi-audio-7b, and Ultravox-0.4. In the multilingual multilingual setting, the proposed approach improves weighted F1 (W-F1) by 5.49% and accuracy (ACC) by 9.75% unimodally, and by 5.03% (W-F1) and 3.62% (ACC) multimodally compared to the best baseline, while maintaining competitive gender bias gaps (AVG gap reduced by 0.8 in the multimodal setting). Ablations confirm that combining ERM with the MinMaxGAP regularizer and adaptive weighting yields a superior performance-fairness trade-off than standard SFT alone.

## Code

- https://github.com/zihaurpang/ERM-MinMaxGAP

## Applications

Speech and ML engineers developing affective computing systems, emotion-aware conversational agents, and mental-health assessment tools will use this to ensure equitable performance across gender groups in multilingual deployments.

## Limitations

The approach focuses primarily on binary gender categories (male and female) as derived from dataset annotations and does not address broader intersectional demographic biases.

## Related

- (link related pages by id as the wiki grows)
