---
id: wang26q_interspeech
category: speech-llm-dialogue
labels: [generative-model]
institutions: ["Zhejiang University", "LIGHTSPEED"]
code: https://anonymous.4open.science/w/omni_demo-4876/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-984
pdf: https://www.isca-archive.org/interspeech_2026/wang26q_interspeech.pdf
---

# Empathy Omni: Enabling Empathetic Speech Response Generation Through Large Language Models

*Haoyu Wang, Guangyan Zhang, Jiale Chen, Jingyu Li, Yuehai Wang, Yiwen Guo*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-984)

**Category:** `speech-llm-dialogue` · **Labels:** `generative-model`

**TL;DR** — Empathy Omni is an end-to-end speech large language model that explicitly predicts a token-synchronous emotion trajectory to control empathetic speech generation without massive pretraining. It achieves a top UTMOS speech quality score of 4.41 and an emotion MOS of 4.23 while maintaining strong general QA capabilities.

## Key contributions

- Proposed Empathy Omni, an end-to-end speech LLM that explicitly predicts a token-synchronous emotion trajectory to condition affect during speech synthesis.
- Introduced a Dynamic Time Warping (DTW)-based alignment scheme to supervise token-level emotion planning without forced alignment, ensuring robustness to non-verbal vocalizations.
- Built EmotionalQA-200k via a scalable synthesis-and-filtering pipeline (incorporating GPT-4o, CosyVoice2, ASR-WER filtering, and SER consistency checking) combined with real emotional recordings.
- Designed a gated fusion and adaptive layer normalization (AdaLN) mechanism in the causal speech decoder to combine lexical embeddings, LLM hidden states, and emotion vectors.

## Problem

Most existing speech LLMs translate response content into speech without capturing rich paralinguistic and emotional cues in user queries, resulting in flat or contextually inappropriate interactions. Current empathetic speech models often rely on implicit learning that demands massive, costly annotated emotional dialogue data and large-scale pretraining. Building efficient models that can generate emotionally expressive speech with limited data and controllable prosody remains a central open challenge in conversational AI.

## Method

Empathy Omni uses a two-tower architecture combining a pretrained LLM backbone and a causal speech decoder. For the input branch, two frozen pretrained encoders—Whisper large-v3 for semantics and emotion2vec large for emotion—extract high-rate features. A lightweight frame-stacking multi-layer perceptron (MLP) downsampling adapter with a rate of k=5 reduces features to 10 Hz. These are concatenated and projected into the LLM hidden space. The LLM backbone (Qwen2.5-7B-Instruct) generates both response text tokens and a token-synchronous emotion trajectory H_emo via an added emotion prediction head (a lightweight Transformer encoder plus MLP mapping hidden states to a 768-dimensional emotion vector). During training, ground-truth emotion features from target waveforms are aligned with token-level predictions using Dynamic Time Warping (DTW) over squared Euclidean distance, avoiding forced aligner failures on non-verbal vocalizations like sighs or laughter. The model optimizes a multi-task loss combining cross-entropy (L_CE), mean squared error (L_MSE), and cosine similarity (L_cos).

The causal speech decoder consists of 6 Transformer blocks with a hidden size of 3584. At each step, it receives token embeddings and LLM hidden states fused via a sigmoid gate. The token-synchronous emotion trajectory is injected into the decoder using adaptive layer normalization (AdaLN) to modulate scale and shift, achieving factorized affect control without distorting content. A linear schedule transitions conditioning from ground-truth emotion features to predicted vectors (mixing probability p from 0 to 1). The decoder predicts CosyVoice2 acoustic tokens, which are converted into mel-spectrograms via a chunk-aware causal flow-matching model and synthesized into waveforms using a HiFi-GAN vocoder.

## Experimental setup

The model is trained on a combination of VoiceAssistant400k and the newly curated EmotionalQA-200k dataset (spanning 20 domains and 6 basic emotions). Training uses 8 NVIDIA H20 GPUs with an AdamW optimizer in two stages: Stage 1 fine-tunes the Qwen2.5-7B-Instruct LLM via LoRA (rank 8, learning rate 5e-5) alongside adapters and the emotion head (learning rate 2e-4); Stage 2 trains the 6-block speech decoder (learning rate 2e-4, weight decay 0.01). Baselines include Qwen2-Audio, GLM-4-Voice, Ichigo, LLaMA-Omni, VITA-1.0, Moshi, and OpenS2S. Metrics comprise VoiceBench subsets (AlpacaEval, CommonEval, IFEval, WildVoice, SD-QA), UTMOS for naturalness, ASR-WER for intelligibility, GPT-4o-based Emotion GPT Score, and a human Speech Emotion MOS evaluated by 40 native raters.

## Results

Empathy Omni achieves a UTMOS speech quality score of 4.41, outperforming LLaMA-Omni (3.98) and GLM-4-Voice (3.88). On general spoken instruction following via VoiceBench, it secures top scores on CommonEval (3.47) and IFEval (27.89), while staying competitive on AlpacaEval (3.84) and WildVoice (3.19) compared to GLM-4-Voice (3.97 and 3.18). For empathetic response generation across 1,000 queries, Empathy Omni outperforms all baselines with an Emotion GPT Score of 3.97 (vs 3.37 for OpenS2S and 2.43 for GLM-4-Voice), a Speech Emotion MOS of 4.23 (vs 4.11 for OpenS2S), and the lowest ASR-WER of 4.61%. Ablation studies show that removing the fusion module degrades the Emotion GPT Score from 3.97 to 3.15, lowers Speech Emotion MOS from 4.23 to 3.85, and increases ASR-WER from 5.61% to 6.42%.

| Model | Alpaca ↑ | Common ↑ | IFEval ↑ | WildVoice ↑ | UTMOS ↑ |
|---|---|---|---|---|---|
| Qwen2-Audio | 3.74 | 3.43 | 26.33 | 3.01 | – |
| GLM-4-Voice | 3.97 | 3.42 | 25.92 | 3.18 | 3.88 |
| Ichigo | 3.79 | 3.17 | 21.59 | 2.83 | 3.63 |
| LLaMA-Omni | 3.70 | 3.46 | 14.87 | 2.92 | 3.98 |
| VITA-1.0 | 3.38 | 2.15 | 22.82 | 1.87 | 3.77 |
| Ours | 3.84 | 3.47 | 27.89 | 3.19 | 4.41 |

## Limitations

The model occasionally struggles with subtle, nuanced, or mixed emotional states, sometimes defaulting to semantically correct but emotionally generic speech responses. Evaluation relies heavily on synthesized test sets and LLM-as-a-judge scoring, which may not fully capture the complexities of real-world human-to-human therapeutic or empathetic conversations. The current architecture uses a fixed 768-dimensional emotion space without explicit control over emotional intensity.

## Why read this

Speech and ML researchers building real-time conversational assistants who want to add fine-grained paralinguistic and emotional control to LLMs without costly large-scale pretraining should read this paper. It provides a concrete blueprint for decoupling semantic generation from emotion trajectories using DTW alignment and AdaLN fusion.

## Code

- https://anonymous.4open.science/w/omni_demo-4876/

## Applications

Empathetic virtual assistants, mental health support chat systems, interactive educational tutoring, and customer service bots requiring high emotional intelligence and low latency.

## Institutions / 機構

Zhejiang University, LIGHTSPEED

## Related

- [CE-CoT: A Contrastive Empathetic Chain-of-Thought Training Strategy for Improving Emotion Consensus in Empathetic Speech LLMs](chen26o_interspeech.md) — same problem · relatedness 2.7/3
- [EmoInstruct-TTS: Dual-Path Instruction-Guided Emotional Speech Synthesis](wu26f_interspeech.md) — same problem · relatedness 2.5/3
- [PRISM: Prosody-Integrated Multi-Agent Reasoning Framework for Empathetic Spoken Dialogue](zhang26r_interspeech.md) — same problem · relatedness 2.4/3
- [ETC-TTS: Emotion Trajectory Learning for Controllable Emotional Text-to-Speech](kim26u_interspeech.md) — shared technique · relatedness 2.3/3
- [Beyond Semantic Dominance: Cognitive Affective Reasoning and Empathetic Response Alignment in Audio Language Models](zhao26h_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
