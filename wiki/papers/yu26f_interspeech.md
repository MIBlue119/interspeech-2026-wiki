---
id: yu26f_interspeech
category: paralinguistics-emotion
institutions: ["University of Auckland", "University of Melbourne", "University of Birmingham", "ARC OPTIMA"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2031
pdf: https://www.isca-archive.org/interspeech_2026/yu26f_interspeech.pdf
---

# Disentangling Reasoning in Large Audio-Language Models for Ambiguous Emotion Prediction

*Xiaofeng Yu, Jiaheng Dong, Jean Honorio, Abhirup Ghosh, Hong Jia, Ting Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/yu26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2031)

**Category:** `paralinguistics-emotion`

**TL;DR** — This paper reformulates speech emotion recognition as a distributional reasoning task for large audio-language models (LALMs), introducing an ambiguity-aware objective and structured chain-of-thought (CoT) supervision. Using these components across SFT, DPO, and GRPO strategies significantly improves prediction of human perceptual emotion distributions on IEMOCAP and CREMA-D.

## Key contributions

- Reformulates ambiguous speech emotion recognition as a distributional reasoning problem using soft human perceptual distribution labels.
- Proposes a plug-and-play ambiguity-aware objective combining KL/JS divergence loss to align predicted probability masses with multi-annotator distributions and prevent affective collapse.
- Designs a structured ambiguity-aware Chain-of-Thought (CoT) supervision protocol prompting LALMs to analyze text context, acoustic prosody (volume, speed, pitch, tone), and synthesize conflicting evidence.
- Evaluates the framework comprehensively across SFT, DPO, and GRPO (including a ground-truth-augmented variant GRPO_z) on IEMOCAP and CREMA-D datasets.

## Problem

Traditional speech emotion recognition (SER) models predict a single hard emotion label, which oversimplifies the inherently mixed and subjective nature of human emotions. While recent large audio-language models (LALMs) capture multiple emotional cues, prior reasoning frameworks like Audio-CoT and Audio-Reasoner are tailored for deterministic tasks (e.g., AudioQA) with a single correct answer. Consequently, current LALMs suffer from premature decision collapse and fail to perform structured probabilistic reasoning under conditions of high emotional ambiguity.

## Method

The framework uses Qwen2-Audio-7B-Instruct as the base LALM, optimized via LoRA with rank r = 8 and alpha = 16 on attention and feed-forward layers. Given an audio-transcript pair x_n = {A_n, T_n}, a closed-source model (GPT-4o) generates a structured 3-step reasoning trajectory (Step 1: Text semantic and contextual ambiguity analysis; Step 2: Acoustic prosody evaluation of volume, speed, pitch, and tone for majority/minority cues; Step 3: Evidence synthesis resolving ambiguity). The model reads out token-level logits for emotion category names at the final step and applies a softmax to produce a predicted emotion distribution p^_n.

The system is trained using three plug-and-play paradigms. (1) Supervised Fine-Tuning (SFT) minimizes a joint loss combining standard text cross-entropy for CoT generation and forward KL divergence between the predicted emotion distribution and the soft human ground-truth distribution. (2) Direct Preference Optimization (DPO) uses an on-policy dynamic rollout scheme paired with Jensen-Shannon (JS) divergence: current policy rollouts deviating from target distributions act as negative samples, while gold CoTs serve as positive examples. (3) Group Relative Policy Optimization (GRPO) samples K rollouts, computes rewards combining distributional matching and format adherence, normalizes advantages, and incorporates a ground-truth trajectory reference (GRPO_z) to ensure the expert CoT always receives the highest reward, stabilizing policy updates.

## Experimental setup

Evaluated on IEMOCAP (4 emotion categories, 3 annotators, 5-fold leave-one-session-out cross-validation) and CREMA-D (6 emotion categories, 4-12 annotators, voice-only). Compared against the base Qwen2-Audio-7B-Instruct model and Audio-Reasoner. Metrics include Jensen-Shannon divergence (JS ↓), Bhattacharyya Coefficient (BC ↑), R² ↑, and Brier score ↓. Uses AdamW optimizer with learning rates 1e-4 (SFT), 5e-6 (DPO), and 2e-5 (GRPO), with 3% linear warmup and cosine decay.

## Results

On IEMOCAP, GRPO_z achieves the best headline results, reducing JS divergence to 0.20 and improving the Bhattacharyya Coefficient to 0.82, compared to 0.40 JS and 0.64 BC for the base model, and 0.36 JS for Audio-Reasoner. On CREMA-D, DPO performs best, attaining a 0.17 JS divergence and 0.86 BC, compared to 0.25 JS for the base model. Ablations show that adding KL divergence supervision consistently lowers JS divergence and raises BC across all setups compared to cross-entropy alone. Furthermore, cross-domain tests (training on CREMA-D, testing on IEMOCAP) demonstrate that omitting CoT supervision causes performance to plummet (JS dropping from 0.38 to 0.52), proving that CoT is crucial for generalizability.

| Dataset | Systems | JS ↓ | BC ↑ | R² ↑ | Brier ↓ |
| --- | --- | --- | --- | --- | --- |
| IEMOCAP | Base model | 0.40 | 0.64 | 0.51 | 0.15 |
| IEMOCAP | Audio-Reasoner | 0.36 | 0.67 | 0.52 | 0.15 |
| IEMOCAP | GRPO_z (Ours) | 0.20 | 0.82 | 0.67 | 0.07 |
| CREMA-D | Base model | 0.25 | 0.78 | 0.54 | 0.05 |
| CREMA-D | DPO (Ours) | 0.17 | 0.86 | 0.67 | 0.03 |

## Limitations

The work relies on synthetic reasoning trajectories generated by a proprietary model (GPT-4o), which may introduce distillation bias or hallucinated acoustic rationales. The evaluation is restricted to English-language corpora (IEMOCAP and CREMA-D) and a limited set of categorical emotion labels, leaving open how well distributional reasoning scales to open-vocabulary or multilingual paralinguistic tasks.

## Why read this

Researchers building uncertainty-aware speech-language models or deploying RL post-training (DPO/GRPO) for paralinguistics will find a rigorous blueprint for decoupling reasoning chains from soft-label probability distributions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building empathetic conversational agents, advanced mental health monitoring systems, and human-computer interaction interfaces that account for emotional ambiguity.

## Institutions / 機構

University of Auckland, University of Melbourne, University of Birmingham, ARC OPTIMA

## Related

- [Learning from Annotation Uncertainty: Entropy-Aware Curriculum for Speech Emotion Recognition](omidi26_interspeech.md) — same problem · relatedness 2.7/3
- [Multi-Loss Learning for Speech Emotion Recognition with Energy-Adaptive Mixup and Frame-Level Attention](wang26u_interspeech.md) — same problem · relatedness 2.6/3
- [Segment-wise Embedding based Graph Attention Network for Effective Speech Emotion Recognition](song26c_interspeech.md) — same problem · relatedness 2.6/3
- [Prosody-Aware Speech Representations for Emotion Recognition under Pragmatic Ambiguity](park26l_interspeech.md) — same problem · relatedness 2.6/3
- [EmoEUS: Uncertainty Supervision for Multimodal Emotion Recognition in Conversation](huang26n_interspeech.md) — same problem · relatedness 2.5/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
