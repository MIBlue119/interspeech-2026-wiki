---
id: dvirniak26_interspeech
category: speech-deepfake-detection
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1289
pdf: https://www.isca-archive.org/interspeech_2026/dvirniak26_interspeech.pdf
---

# Towards Robust Speech Deepfake Detection via Human-Inspired Reasoning

*Artem Dvirniak, Evgeny Kushnir, Dmitrii Tarasov, Artem Iudin, Oleg Kiriukhin, Mikhail Pautov, Dmitrii Korzh, Oleg Rogov*

[PDF](https://www.isca-archive.org/interspeech_2026/dvirniak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dvirniak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1289)

**TL;DR** — HIR-SDD is a framework combining Large Audio Language Models with human-inspired chain-of-thought reasoning and reinforcement learning to improve both speech deepfake detection and interpretability, achieving 93.6% accuracy on the ASVspoof 5 test evaluation.

## Key contributions

- A new human-annotated dataset containing 124,410 reasoning traces across 41,414 audio samples in English and Russian, utilizing a standardized taxonomy of 14 artifact types.
- The HIR-SDD framework combining hard-label SFT, chain-of-thought (CoT) fine-tuning, audio grounding, and Group Relative Policy Optimization (GRPO) reinforcement learning.
- Comprehensive experimental evaluation demonstrating that large audio-language models (SALMONN-7B) can outperform conventional feature-front-end classifiers like Wav2Vec2-AASIST while providing human-perceptible justifications.

## Problem

Current speech deepfake detection (SDD) methods—such as Wav2Vec2-AASIST, graph-attention networks, and standard self-supervised front-ends—suffer from poor generalization across unseen audio domains, generators, and transformations. Furthermore, they operate as black boxes, lacking human-like interpretability and verifiable reasoning traces that explain why an audio sample is classified as bona fide or spoof. Existing Large Audio Language Models (LALMs) show poor zero-shot and few-shot performance on SDD, while prior datasets lack structured, human-annotated explanation traces, limiting the deployment of trustworthy detectors in risk-sensitive applications like banking and biometrics.

## Method

The foundational architecture builds upon SALMONN-7B, which connects Whisper and BEATS audio encoders to a Vicuna-7B LLM backbone via a Q-Former adapter. Audio inputs are padded or cropped to 10 seconds, and LoRA is applied to all linear LLM projections with a rank of 128, alpha of 256, and dropout of 0.2.

The training recipe starts with supervised fine-tuning (SFT) using cross-entropy loss exclusively on completion tokens. For Chain-of-Thought (CoT) training, the model outputs structured formats containing <think> free-form text, <reasons> tags selected from a 14-item taxonomy, and a binary <answer> (Real/Fake). Training utilizes a learning rate schedule starting at 10^-6, peaking at 10^-4 with a 5000-step warm-up, and decaying to 10^-5.

To eliminate hallucinations and ground explanations in concrete acoustics, deterministic acoustic perturbations (Gaussian noise, time masking, gain adjustments) are introduced. Group Relative Policy Optimization (GRPO) is then applied to refine generation, utilizing a reward function combining format validity, class correctness, and an LLM-as-a-judge (Qwen2.5-32B) reward evaluating coverage, relevance, logic, and helpfulness (with GRPO loss weights set to 0.2, 0.7, and 0.1 for format, class, and judge rewards respectively).

## Experimental setup

Evaluated on subsets of ASVspoof 5 (Val-1-HL as development, 20,000 samples for Test-1-HL with 15,943 spoof and 4,057 bona fide), alongside custom reasoning splits (Train-2-R, Val-2-R, Test-2-R) containing 114k, 8k, and 1k samples respectively. Baseline comparisons include a conventional Wav2Vec2-AASIST model and open-source models on the Speech DF-Arena leaderboard. Primary metrics include Classification Accuracy, Balanced Accuracy, F1-score (positive class: bona fide), EER, Jaccard similarity index for tag sets, and LLM-as-a-judge scores (0-10 scale).

## Results

On the Test-1-HL benchmark, the SALMONN-7B model achieves an Equal Error Rate (EER) of 13.2% compared to 15.7% for the baseline Wav2Vec2-AASIST model. For binary classification accuracy, the GRPO-optimized SALMONN-7B reaches 93.6% accuracy, 89.6% balanced accuracy, and an 85.0% F1-score when trained on combined reasoning and hard-label tracks, outperforming vanilla hard-label SFT variants (which achieve 92.9% accuracy and 84.0% balanced accuracy).

In reasoning evaluation using an LLM-as-a-judge rubric, GRPO optimization yields a mean score of 5.74 ± 1.49 compared to 5.12 ± 1.47 for standard SFT, demonstrating improved trace quality and informativeness. However, grounding and GRPO do not produce massive gains in classification metrics or Jaccard tag similarity (0.6468 vs 0.6264), and models still experience performance degradation when facing modern, high-fidelity synthesis systems completely absent from the training distribution.

| System / Condition | Accuracy | Balanced Accuracy | F1-Score | EER |
|---|---|---|---|---|
| Wav2Vec2-AASIST (Train-1-HL) | 92.3 | 81.3 | 76.7 | 15.7% |
| Wav2Vec2-AASIST (Train-2-HL) | 92.9 | 84.0 | 76.7 | - |
| SALMONN-7B (Hard-label SFT) | 93.4 | 89.3 | 84.5 | - |
| SALMONN-7B (CoT SFT) | 92.9 | 86.7 | 81.4 | 13.2% |
| SALMONN-7B (CoT + GRPO) | 93.6 | 89.6 | 85.0 | - |

## Limitations

The framework still struggles with generalizing to unseen, state-of-the-art high-fidelity synthesis generators not covered in the training dataset, frequently misclassifying sophisticated deepfakes as genuine speech. Reasoning evaluation relies on automated LLM-as-a-judge metrics and subjective human annotations which inherently contain inter-annotator disagreement (Fleiss' kappa ranging from 0.05 to 0.56 across individual tags). Furthermore, scaling LALMs with LoRA requires significant computational overhead compared to compact front-ends like Wav2Vec2-AASIST, restricting real-time on-device edge deployments.

## Why read this

Researchers and engineers building trustworthy, interpretable speech security systems will learn how to inject human reasoning traces and reinforcement learning (GRPO) into large audio-language models without sacrificing raw classification accuracy.

## Code

- https://github.com/dkorzh10/HIR-SDD

## Applications

Deploying verifiable speech anti-spoofing and deepfake detection systems in high-security environments like voice-biometric banking, call center authentication, and forensic media verification.

## Related

- (link related pages by id as the wiki grows)
