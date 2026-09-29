---
id: ieong26_interspeech
category: speech-llm-dialogue
institutions: ["National Taiwan University", "NTU Artificial Intelligence Center of Research Excellence"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-554
pdf: https://www.isca-archive.org/interspeech_2026/ieong26_interspeech.pdf
---

# Nudging Hidden States: Training-Free Model Steering for Chain-of-Thought Reasoning in Large Audio-Language Models

*Lok-Lam Ieong, Chia-Chien Chen, Chih-Kai Yang, Yu-Han Huang, An-Yu Cheng, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/ieong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ieong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-554)

**Category:** `speech-llm-dialogue`

**TL;DR** — This paper introduces a training-free model steering framework that manipulates hidden states to enhance Chain-of-Thought (CoT) reasoning in large audio-language models (LALMs), achieving up to 4.4% absolute accuracy gains over standard CoT prompting. It demonstrates that generalized steering vectors extracted from text-only data can successfully and data-efficiently transfer to spoken reasoning tasks.

## Key contributions

- Proposes a training-free inference-time representation steering framework to strengthen CoT reasoning in LALMs without requiring parameter updates or additional supervision.
- Introduces three distinct vector extraction strategies: instance-specific Vanilla Steering, Speech-derived Generalized Steering (SGS), and Text-derived Generalized Steering (TGS).
- Demonstrates robust cross-modal transfer, revealing that steering directions derived purely from textual reasoning data can effectively guide and improve speech-based reasoning.
- Provides extensive empirical validation across 4 advanced LALMs and 4 spoken reasoning benchmarks, showing consistent average accuracy gains over standard CoT and competitive performance against self-consistency.

## Problem

Large audio-language models (LALMs) struggle significantly with complex multi-step reasoning, limiting their interactive and universal audio utility. While Chain-of-Thought (CoT) prompting can elicit structured reasoning, applying it to LALMs often yields weak instruction-following, whereas existing remedies like reinforcement learning or supervised fine-tuning demand heavy computational costs and extra supervision. This work addresses whether reasoning capabilities can be effectively boosted at inference time in a training-free manner by directly manipulating hidden states.

## Method

The framework operates in two stages: an extraction phase where steering vectors are computed, and an injection phase where they are applied. For the extraction phase, hidden states are gathered from the final prompt token across the last k transformer layers. Vanilla Steering computes a sample-specific vector using the difference-in-means between CoT-cued and non-CoT inputs for each individual test instance. Speech-derived Generalized Steering (SGS) and Text-derived Generalized Steering (TGS) eliminate instance-specific extraction by computing a single shared steering vector over an external auxiliary dataset of 100 samples (BeyondAIME), using synthesized speech via IndexTTS2 for SGS and raw text for TGS.

During inference, the extracted vector is scaled by a hyperparameter alpha and added to the hidden states across all token positions for the selected last k layers. To maintain representation stability and prevent magnitude explosion, a norm-preserving injection technique rescales the modified hidden states to match the original L2 norm of the unsteered states. Greedy decoding is predominantly used during inference. These design choices were selected to reinforce CoT-related activations without altering model weights, thereby overcoming weak multimodal instruction-following.

## Experimental setup

Evaluations are conducted on four state-of-the-art LALMs: Voxtral-mini-3B, Phi4-Multimodal-Instruct, Qwen2.5-Omni-7B, and Audio Flamingo 3 (AF3). The external extraction dataset uses 100 samples from BeyondAIME (verbalized and synthesized via IndexTTS2 for SGS; pure text for TGS), while hyperparameters (scaling factor alpha in [0.025, 0.2] and last k layers in [1, 5]) are tuned on the spoken GSM8K development set from SpeechR. Testing is performed on four spoken reasoning benchmarks: College, High School, and Elementary Mathematics from VoxEval, and ReveAL-CoT from SpeechR. Baselines include Normal (default), CoT prompting, and Self-Consistency (3 generation passes with temperature 0.5).

## Results

Across evaluations, steering variants improved micro-average accuracy over CoT in 11 out of 12 model-benchmark combinations. AF3 and Voxtral achieved the largest average gains at +4.4% and +4.3%, respectively. When matched against self-consistency under a comparable 3-forward-pass budget, Vanilla Steering attained higher overall accuracy on 3 out of 4 models while avoiding the heavy generation costs of self-consistency.

Among generalized variants, TGS achieved the highest average improvement across models (+2.5%), outperforming instance-specific Vanilla Steering (+1.9%) and SGS (+1.4%) despite using zero speech data during extraction. Hyperparameter analyses showed that Vanilla Steering is highly sensitive to the scaling factor alpha and prone to degradation at higher values, whereas SGS and TGS remain much more stable. Data efficiency experiments demonstrated that TGS reaches near-peak performance with as few as 10 text samples, while SGS requires roughly 40 spoken samples to saturate.

| Model | Method | College | High School | Elementary | ReveAL-CoT | ALL |
|---|---|---|---|---|---|---|
| Voxtral-mini-3B | CoT | 26.3 | 42.0 | 67.4 | 43.0 | 50.7 |
| Voxtral-mini-3B | Vanilla (Ours) | 32.0 | 43.3 | 68.8 | 56.0 | 55.0 |
| Phi4-Multimodal-Instruct | CoT | 36.0 | 41.9 | 69.6 | 68.5 | 57.9 |
| Phi4-Multimodal-Instruct | TGS (Ours) | 30.0 | 48.9 | 71.4 | 70.5 | 60.4 |
| Qwen2.5-Omni-7B | CoT | 65.0 | 79.9 | 83.0 | 71.0 | 77.7 |
| Qwen2.5-Omni-7B | SGS (Ours) | 65.0 | 80.7 | 84.7 | 71.5 | 78.7 |

## Limitations

The approach relies on finding optimal hyperparameters (layer count k and scaling factor alpha) via grid search on a separate development set, which may not transfer seamlessly across diverse tasks. Instance-specific Vanilla Steering suffers from high hyperparameter sensitivity and performance degradation when scaling factors are over-amplified. Furthermore, evaluation is confined to math and scientific reasoning benchmarks, leaving open how effectively text-derived cross-modal steering transfers to open-ended conversational or paralinguistic spoken tasks.

## Why read this

Speech and ML researchers working on LALMs will learn how to drastically improve reasoning performance at inference time without gradient updates or fine-tuning. The paper offers a compelling blueprint for cross-modal representation transfer, showing that text-mined steering vectors can efficiently steer audio-language models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Enhancing mathematical and scientific reasoning in voice assistants, interactive spoken tutoring systems, and on-device audio-language applications.

## Institutions / 機構

National Taiwan University, NTU Artificial Intelligence Center of Research Excellence

**Funding / 經費:** Ministry of Education, Taiwan Centers of Excellence in Artificial Intelligence project, NTU Artificial Intelligence Center of Research Excellence

## Related

- [Audio-DeepThinker: Progressive Reasoning-Aware Reinforcement Learning for High-Quality Chain-of-Thought Emergence in Audio Language Models](he26e_interspeech.md) — same problem · relatedness 2.8/3
- [Enhancing Audio Reasoning via Semantic Summary Prediction](bonzi26_interspeech.md) — same problem · relatedness 2.5/3
- [Entity Binding Failures in Speech LLM Reasoning: Diagnosis and Chain-of-Thought Intervention](hsu26_interspeech.md) — same problem · relatedness 2.4/3
- [MATA: A Training-Free Approach to Mitigate Cross-Modal Attention Imbalance in Large Audio Language Models](wang26t_interspeech.md) — same problem · relatedness 2.3/3
- [Structured Prompting vs. Self-Training for Audio Reasoning Under Limited Data and Compute: Lessons from Interspeech Audio Reasoning Challenge 2026](noronha26_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
