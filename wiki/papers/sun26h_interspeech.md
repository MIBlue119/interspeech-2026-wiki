---
id: sun26h_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2166
pdf: https://www.isca-archive.org/interspeech_2026/sun26h_interspeech.pdf
---

# Activation Steering for Accent Adaptation in Large Audio Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/sun26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2166)

**TL;DR** — The paper introduces a parameter-free inference-time activation steering method that targets accent-sensitive middle layers in large audio language models, achieving significant word error rate reductions across eight native and non-native accents.

## Problem

Accent variability creates substantial word error rate disparities in automatic speech recognition, disproportionately affecting certain speaker populations. Conventional full-parameter or parameter-efficient fine-tuning approaches are computationally expensive, require substantial training data, and risk entangling accent adaptation with high-level semantic representations.

## Method

The authors analyze the audio encoder of Qwen2-Audio-7B (32 Whisper-style layers) by constructing text-matched utterance pairs across standard and accented speech to compute layer-wise mean-shift activation directions. By applying controlled perturbations and measuring changes via an Accent Alignment Score (AAS) that isolates accent variation from speaker timbre, they identify a stable middle-layer steering window (layers 15-19). During inference, a normalized, data-derived mean-shift vector is injected into these middle layers using forward hooks with a strength parameter alpha (tested up to 5.0), requiring zero weight updates.

## Results

Evaluated on the VCTK dataset (native accents: Scottish, South African, Canadian, Irish, Northern Irish) and L2-ARCTIC corpus (non-native accents: Hindi, Arabic, Spanish) using balanced subsets of 200 utterances, the method consistently lowers word error rates. In data-scarce settings with under 100 samples (e.g., Canadian, Northern Irish, Irish), parameter-efficient fine-tuning performs poorly or degrades performance, whereas inference-time steering yields relative WER reductions ranging from 28.3% to 90.7% (absolute improvements between 4.04% and 33.80%). Late layers (such as layer 31) and excessive alpha values cause representation collapse and massive performance drops.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and developers deploying large audio language models in voice assistants, customer service call centers, and educational technologies to achieve robust, accent-inclusive speech recognition without expensive fine-tuning.

## Limitations

Late-layer interventions and excessively high steering strengths lead to representation instability and severe model degradation, requiring careful selection of the middle-layer steering window.

## Related

- (link related pages by id as the wiki grows)
