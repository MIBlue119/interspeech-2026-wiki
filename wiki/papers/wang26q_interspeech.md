---
id: wang26q_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-984
pdf: https://www.isca-archive.org/interspeech_2026/wang26q_interspeech.pdf
---

# Empathy Omni: Enabling Empathetic Speech Response Generation Through Large Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/wang26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-984)

**TL;DR** — Empathy Omni is an end-to-end speech large language model that explicitly predicts a token-synchronous emotion trajectory to generate empathetic spoken responses, achieving a top speech naturalness UTMOS score of 4.41 and a peak Emotion MOS of 4.23.

## Problem

Most existing speech LLMs translate response content into speech without explicitly capturing rich paralinguistic cues in user queries, resulting in emotionally flat or inappropriate interactions. Existing empathetic speech systems heavily depend on massive, costly proprietary emotional dialogue datasets and lack explicit affective planning. Building models that generate empathetic responses with data efficiency and fine-grained prosody control remains a core challenge.

## Method

Empathy Omni utilizes a two-tower architecture combining a Qwen2.5-7B-Instruct LLM backbone with a causal six-block Transformer speech decoder. Two frozen encoders—Whisper large-v3 for semantics and emotion2vec large for affective cues—process input speech and are downsampled via frame-stacking MLPs to a 10 Hz frame rate before projection into the LLM hidden space. The LLM is augmented with an emotion prediction head to output a token-synchronous emotion trajectory, supervised via dynamic time warping (DTW) to bypass forced-alignment failures on non-verbal vocalizations using a multi-task loss (cross-entropy, MSE, and cosine similarity). The speech decoder then combines token embeddings and LLM hidden states using a sigmoid-gated fusion module and injects the emotion trajectory via adaptive layer normalization (AdaLN), finally generating discrete acoustic tokens decoded via CosyVoice2's flow-matching and HiFi-GAN. The model is trained on a newly curated 200k-sample dataset (EmotionalQA-200k) combining end-to-end GPT-4o synthesis, ESD text rewriting, and multi-stage extracted real-world recordings.

## Results

Evaluated on VoiceBench, Empathy Omni achieves strong instruction-following performance, securing top scores on CommonEval (3.47) and IFEval (27.89), alongside an AlpacaEval score of 3.84 and a WildVoice score of 3.19. In speech quality, it reaches the highest UTMOS score of 4.41 among compared baselines like LLaMA-Omni (3.98) and GLM-4-Voice (3.88). For empathetic response generation across a 1,000-query emotional test set, it yields the highest GPT-4o Emotion Score (3.97), Speech Emotion MOS (4.23), and a competitive ASR-WER of 5.61%. Ablation studies demonstrate that removing the gated fusion and AdaLN emotion modulation modules causes the Emotion GPT Score to drop from 3.97 to 3.15, Speech Emotion MOS to fall from 4.23 to 3.85, and ASR-WER to increase from 5.61% to 6.42%.

## Code

- https://anonymous.4open.science/w/omni_demo-4876/

## Applications

Engineers and developers building empathetic conversational agents, voice assistants, therapeutic support tools, educational tutors, and customer service platforms that require emotionally intelligent spoken interactions.

## Limitations

The model occasionally struggles with subtle or mixed emotions, sometimes prioritizing semantic content over nuanced emotional cues.

## Related

- (link related pages by id as the wiki grows)
