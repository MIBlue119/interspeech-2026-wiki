---
id: dvirniak26_interspeech
category: speech-deepfake-detection
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1289
pdf: https://www.isca-archive.org/interspeech_2026/dvirniak26_interspeech.pdf
---

# Towards Robust Speech Deepfake Detection via Human-Inspired Reasoning

[PDF](https://www.isca-archive.org/interspeech_2026/dvirniak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dvirniak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1289)

**TL;DR** — The paper introduces HIR-SDD, a human-inspired speech deepfake detection framework leveraging Large Audio Language Models and Chain-of-Thought reasoning trained on a newly collected human-annotated dataset of 41k audio samples, achieving strong classification accuracy alongside interpretable rationales.

## Problem

Current speech deepfake detection (SDD) methods struggle to generalize across unseen audio domains and modern generative models while completely lacking human-like interpretability. This absence of verifiable justifications and perceptible cues makes existing classifiers unreliable for risk-sensitive applications like biometrics and banking. Furthermore, there has been a critical shortage of open-source datasets providing high-quality human reasoning traces for audio anti-spoofing.

## Method

The authors introduce a dataset of 41,414 audio samples (32,045 spoof and 9,369 bona fide) paired with 124,410 human annotations mapped to 14 predefined artifact categories (e.g., unnatural pauses, mispronunciations, atypical voice characteristics). Using SALMONN-7B (combining Whisper and BEATS audio encoders with a Q-Former adapter connected to a Vicuna-7B LLM), they apply LoRA-based supervised fine-tuning (SFT) for hard-label classification and structured chain-of-thought (CoT) generation containing <think>, <reasons>, and <answer> tags. They additionally employ Group Relative Policy Optimization (GRPO) reinforced with GPT-5.1 preference rewards and audio grounding techniques to prevent textual hallucinations and ensure alignment with acoustic evidence.

## Results

Evaluated on Test-1-HL (derived from the ASVspoof 5 evaluation subset comprising modern, unseen generators), the proposed SALMONN-7B model trained with hard-label and CoT recipes achieves competitive performance against conventional specialized baselines like Wav2Vec2-AASIST. Specifically, the model reaches up to 94.5% accuracy, 89.3% balanced accuracy, and an F1 score of 88.6% depending on the training set configuration (Train-2-HL / Train-2-R). Ablations demonstrate that combining hard-label SFT with CoT fine-tuning and GRPO yields robust classification while generating faithful, structured explanations aligned with human perception.

## Code

- https://github.com/dkorzh10/HIR-SDD

## Applications

Engineers and security analysts building trusted, transparent anti-spoofing systems for voice biometrics, telephone banking, and forensic audio auditing.

## Limitations

LALM-based reasoners risk generating hallucinations or ungrounded justifications if not properly constrained by reinforcement learning and acoustic grounding.

## Related

- (link related pages by id as the wiki grows)
