---
id: haghbin26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1252
pdf: https://www.isca-archive.org/interspeech_2026/haghbin26_interspeech.pdf
---

# From Black-Box to Clinical Insight: A Multi-Stage Explainable Framework for Speech-Based Cognitive Impairment Detection

[PDF](https://www.isca-archive.org/interspeech_2026/haghbin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/haghbin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1252)

**TL;DR** — This paper proposes a multi-stage explainability framework that translates black-box transformer predictions into plain-language clinical narratives, achieving an F1-score of 72.11% on the NIA PREPARE benchmark.

## Problem

While transformer-based speech and language models improve cognitive impairment detection, their black-box nature prevents clinical adoption. Clinicians require transparent, plain-language justifications that link model outputs to underlying cognitive-linguistic mechanisms rather than mere token importance scores.

## Method

The framework builds on the SpeechCARE Adaptive Gating Fusion (SpeechCARE-AGF) multimodal screening model, which combines mGTE linguistic representations, mHuBERT acoustic representations (processed via 5-second overlapping windows and customized self-attention), and categorical age demographics using a Mixture-of-Experts gating network. To make this model explainable, the authors use SHAP adapted for transformers with hierarchical aggregation of subword attributions, extract theory-informed linguistic features across four clinical domains, and pass these through a four-stage LLaMA-3.1-70B-Instruct reasoning pipeline.

## Results

Evaluated on the NIA PREPARE dataset (2,058 participants across English, Spanish, and Mandarin; 1,646 train, 412 test), the screening model achieved an AUC of 86.83% and an F1-score of 72.11%. A blinded evaluation by two primary care physicians on 70 stratified English samples showed 98% agreement (Cohen's kappa = 0.85) regarding the alignment of LLM-generated reports with patient-level cognitive profiles. A usability study with five clinicians yielded a System Usability Scale (SUS) score of 82 out of 100.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians and primary care physicians screening patients for mild cognitive impairment (MCI) and Alzheimer's disease using noninvasive speech biomarkers.

## Limitations

The current framework focuses exclusively on linguistic explainability, omitting the translation of acoustic transformer patterns from mHuBERT into interpretable narratives.

## Related

- (link related pages by id as the wiki grows)
