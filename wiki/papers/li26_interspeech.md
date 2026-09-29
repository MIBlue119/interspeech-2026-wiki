---
id: li26_interspeech
category: deepfake-security
institutions: ["Imperial College London", "Technical University of Munich", "University of Southampton", "Mohamed bin Zayed University of Artificial Intelligence", "Johns Hopkins University"]
code: https://github.com/glam-imperial/xai-grounded-speech-deepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-161
pdf: https://www.isca-archive.org/interspeech_2026/li26_interspeech.pdf
---

# XAI-Grounded Explanation Generation for Speech Deepfake Detection with Training-Free Multimodal Large Language Models

*Yupei Li, Qiyang Sun, Xiaoliang Wu, Chenxi Wang, Berrak Sisman, Bjoern Schuller*

[PDF](https://www.isca-archive.org/interspeech_2026/li26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-161)

**Category:** `deepfake-security`

**TL;DR** — This paper presents XGEG, a training-free framework that integrates conventional XAI attribution maps with multimodal large language models to generate grounded, low-level speech deepfake explanations, increasing inside localization accuracy by over 45%.

## Key contributions

- Constructs and releases a large-scale explainable speech deepfake detection dataset with approximately 65,000 explanation instances based on PartialSpoof.
- Proposes a training-free multimodal LLM pipeline that aggregates cross-model and multi-method XAI evidence (IG, LIME, Saliency, and SHAP) to mitigate hallucination.
- Introduces Area-Normalised Local Logit Sensitivity to evaluate the fidelity of localized time-frequency audio explanations without disrupting phase coherence.
- Demonstrates through human evaluation that XAI-guided multimodal explanations significantly improve specificity, evidence support, and overall user preference.

## Problem

Speech deepfake detection is typically formulated as a binary classification task, but deploying these systems reliably requires principled explanations for why an audio sample is flagged as fake. Existing approaches either rely on low-level XAI attribution signals (such as gradient maps) that are tightly coupled to specific models and hard for humans to interpret, or they use LLMs that generate generic, ungrounded natural language descriptions prone to hallucination. Furthermore, the field suffers from a lack of dedicated grounded explanation datasets tailored specifically to speech deepfakes, preventing task-specific supervision and rigorous evaluation.

## Method

The framework uses a training-free pipeline built upon three pre-trained foundation models (wav2vec 2.0, HuBERT, and WavLM) without additional fine-tuning. For spectrogram-based evidence, Integrated Gradients (IG), LIME, and Saliency attribution maps are extracted and fed into the vision-LLM Qwen2.5VL-7B to summarize temporal and frequency abnormality ranges. For acoustic feature-level evidence, a lightweight 4-layer multilayer perceptron (MLP) is trained on the openSMILE eGeMAPSv02 feature set, and SHAP is applied to extract the top three most important acoustic features.

The summarized time-frequency regions and SHAP feature rankings are then provided alongside the audio to the multimodal LLM Qwen3-Omni-30B for synthesis into structured text. The model is explicitly prompted to treat XAI evidence as supporting signals rather than definitive conclusions, critically analyze them, and adhere to a strict output format consisting of abnormality time-frequency ranges, free-text explanation, and XAI aggregation source details.

To ensure high data quality during dataset construction, only samples correctly classified by all four base models (wav2vec 2.0, HuBERT, WavLM, and the MLP classifier) are retained. The resulting dataset comprises roughly 15k training, 15k development, and 35k testing instances focused entirely on spoofed speech.

## Experimental setup

Evaluated using the PartialSpoof dataset, which contains about 25k training, 25k development, and 71k testing samples (filtered down to ~15k/15k/35k correctly classified spoofed instances). Baselines include a Pure Audio LLM baseline and single-XAI configurations (IG, Saliency, LIME). Metrics include Accuracy, F1-score, Equal Error Rate (EER), Intersection over Union (IoU), Inside Accuracy (IA), Area-Normalised Local Logit Sensitivity, and a 5-point Likert scale human evaluation across 600 samples evaluated by 20 annotators.

## Results

In human evaluations, the All XAI (Three Model) setting achieved the highest overall user preference (average score 1.50 compared to 0.35 for Pure Audio) and the highest specificity score of 4.30 out of 5. For time period localization, Pure Audio achieved an IoU of 0.269 but a very low Inside Accuracy (IA) of 0.049 due to over-expanded intervals, whereas single-model All XAI balanced localization with an IA of 0.492 and LIME reached an IA of 0.811.

In Area-Normalised Local Logit Sensitivity density evaluations (with perturbation epsilon = +1.0%), the LIME-guided method achieved a mean sensitivity density of 46.59 x 10^-6 (a 327.20x ratio versus the pure audio baseline), demonstrating that LIME's perturbation-based boundary approximation aligns strongly with the framework's requirements. The single-model All XAI variant achieved a density of 3.15 x 10^-6 (22.10x baseline), successfully identifying highly influential acoustic regions.

| Settings | IoU | IA | Correctness | Evidence Support |
|---|---|---|---|---|
| Pure Audio (Baseline) | 0.269 | 0.049 | 3.15 | 1.75 |
| IG | 0.224 | 0.482 | 3.60 | 3.50 |
| Saliency | 0.239 | 0.489 | 3.75 | 3.65 |
| LIME | 0.157 | 0.811 | 3.35 | 3.40 |
| All XAI (Single Model) | 0.242 | 0.492 | 3.90 | 3.75 |
| All XAI (Three Model) | 0.134 | 0.295 | 3.85 | 3.60 |

## Limitations

The framework inherits reasoning bottlenecks from underlying LLMs, making complex multi-model XAI aggregation unstable in certain edge cases. The evaluation is restricted to the PartialSpoof dataset and English-language or standard benchmark synthesis artifacts, leaving multilingual and cross-corpus generalization untested. Furthermore, generating explanations for bona fide audio remains challenging since proving the absence of acoustic anomalies lacks direct temporal markers.

## Why read this

Speech and ML engineers building trustworthy deepfake detectors should read this to see how combining traditional acoustic attribution methods with multimodal LLMs can ground text explanations without retraining foundation models.

## Code

- https://github.com/glam-imperial/xai-grounded-speech-deepfake

## Applications

Deploying trustworthy and explainable speech deepfake detection systems in forensics, media verification, and audio security platforms.

## Institutions / 機構

Imperial College London, Technical University of Munich, University of Southampton, Mohamed bin Zayed University of Artificial Intelligence, Johns Hopkins University

## Related

- [What Do Deepfake Speech Detectors Actually Hear?](stanek26_interspeech.md) — same problem · relatedness 2.4/3
- [Towards Robust Speech Deepfake Detection via Human-Inspired Reasoning](dvirniak26_interspeech.md) — same problem · relatedness 2.4/3
- [Lightweight Detection and Model Attribution of Synthetic Speech via Residual Statistical Fingerprints](pizarro26_interspeech.md) — same problem · relatedness 2.2/3
- [Quantizer-Aware Hierarchical Neural Codec Modeling for Speech Deepfake Detection](wu26n_interspeech.md) — same problem · relatedness 2.1/3
- [Supervised Post-training of Speech Foundation Models for Robust Adaptation in Speech Deepfake Detection](pan26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
