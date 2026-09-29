---
id: tang26b_interspeech
category: speech-llm-dialogue
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1627
pdf: https://www.isca-archive.org/interspeech_2026/tang26b_interspeech.pdf
---

# DeSRPA: Decoupled Speech Role-Playing Agent via Inference-Time Intervention

*Wenqiu Tang, Zhen Wan, Takahiro Komamizu, Ichiro Ide*

[PDF](https://www.isca-archive.org/interspeech_2026/tang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1627)

**Category:** `speech-llm-dialogue` · **Labels:** `generative-model`

**TL;DR** — DeSRPA is a training-free agentic framework that decouples speech role-playing into internal cognitive steering of a frozen LLM and external expressive rendering of a frozen TTS model via dual-level control vectors, achieving an open-source mean multimodal judge score of 0.8379.

## Key contributions

- Proposes a training-free framework using inference-time intervention via Control Vectors (CVs) to avoid the computational cost and reasoning degradation of E2E fine-tuning.
- Introduces a synchronization strategy mapping persona-driven intent from an LLM to acoustic Control Vectors to ensure consistency between personality and paralinguistic expression.
- Implements a Sparse AutoEncoder (SAE)-based cognitive steering method across 30 fine-grained facets to modify latent trajectories without parameter updates.
- Applies a style-subtraction mechanism on parallel emotional datasets (ESD, CREMA-D) to extract speaker-independent emotion control vectors for the StyleTTS 2 backbone.

## Problem

Current speech role-playing agents predominantly rely on end-to-end supervised fine-tuning, which suffers from a generalization trap on unseen characters, incurs high adaptation costs, and imposes a modality alignment tax that degrades core LLM reasoning. Conversely, traditional cascaded pipelines decouple text generation and TTS, resulting in semantic-acoustic misalignment where the acoustic renderer fails to capture dynamic emotional contexts. This limitation matters because immersive character role-play requires simultaneous high-fidelity cognitive reasoning and precise paralinguistic expression.

## Method

DeSRPA operates on two frozen backbones: a Qwen3-4B LLM controller and a StyleTTS 2 acoustic module. For internal cognitive steering, Sparse AutoEncoders (SAEs) optimize sparse control vectors that are injected into the LLM residual stream to shift latent representations toward target centroids across 30 facets; Layer 15 handles the base personality and contextual activation vectors, while Layer 20 handles the linguistic style vector. These vectors are dynamically scaled during inference based on character profiles and trait activation theory.

For external expressive rendering, DeSRPA extracts acoustic control vectors by computing the difference between the mean style embeddings of target emotions and neutral states from parallel datasets (ESD and CREMA-D) filtered using Emo2Vec scores (>0.90) and silence rates (<20%). A Dual-Path Fusion Strategy modulates the base style representation with these emotion vectors via an intensity scalar tau (ranging from 0.5 to 2.5), passes the steered style into a diffusion-based Style Predictor, and interpolates between the predicted and steered styles with a balance factor rho of 0.8 to preserve speaker similarity.

## Experimental setup

Evaluated on the SpeechRole-Data test split (72 English characters, 372 responses) and the OmniCharacter-10K test split (10 Genshin Impact characters, open-domain). Compared against E2E baselines (LLaMA-Omni, Qwen2.5-Omni, SpeechRole, OmniCharacter), cascaded ablations, and proprietary models (GPT-4o Audio, AliCloud pipeline with CosyVoice3). Metrics include Time-To-First-Audio (TTFA), Speaker SIMilarity (SIM) via WaveLM, Emotion Execution Accuracy (EEA) via emotion2vec, Word Error Rate (WER), and a multimodal judge evaluation using Gemini 2.5 Pro.

## Results

DeSRPA achieves a mean multimodal judge score of 0.8379 on SpeechRole, outperforming open-source baselines like SpeechRole (0.7747) and LLaMA-Omni (0.7452) and ranking closely behind GPT-4o Audio (0.8862). It achieves a top open-source Emotion Execution Accuracy (EEA) of 0.701 (vs 0.433 for SpeechRole) and a Speaker SIMilarity of 0.886, while maintaining a competitive WER of 2.63% and a TTFA latency of 577 ms. Ablations confirm that removing speech control vectors drops EEA sharply to 0.549, while removing LLM control vectors degrades personality and knowledge consistency. DeSRPA does not win on raw streaming latency against fully end-to-end models like LLaMA-Omni (226 ms), and its immersion scores drop on highly stylized anime personas with out-of-distribution prosody.

| System | TTFA (ms) | SIM | EEA | WER (%) | Multimodal Mean |
|---|---|---|---|---|---|
| Qwen2.5-Omni | 274 | <0.800 | 0.453 | 0.98 | 0.5504 |
| LLaMA-Omni | 226 | <0.800 | 0.397 | 2.21 | 0.7452 |
| SpeechRole | 389 | <0.800 | 0.433 | 5.31 | 0.7747 |
| DeSRPA (Ours) | 577 | 0.886 | 0.701 | 2.63 | 0.8379 |
| GPT-4o Audio | 320 | <0.800 | 0.501 | 2.03 | 0.8862 |
| AliCloud Pipeline | 872 | 0.859 | 0.694 | 1.74 | 0.8356 |

## Limitations

The framework relies on pre-extracted emotional contrast pairs which may not cover rare or highly specific micro-expressions. The dual-path inference structure increases streaming latency (TTFA of 577 ms) compared to direct end-to-end models. Furthermore, out-of-distribution stylized anime characters with exaggerated prosody challenge the frozen TTS module's style space.

## Why read this

Researchers and engineers building speech-based agents without massive GPU clusters for fine-tuning should read this to learn how to bridge LLM text generation and expressive TTS using lightweight, training-free inference-time interventions.

## Code

- https://github.com/steeremo971-commits/DeSRPA

## Applications

Interactive video game non-player characters (NPCs), voice-based virtual assistants, and immersive conversational role-playing applications.

## Institutions / 機構

Nagoya University, National Institute of Informatics

**Funding / 經費:** JSPS KAKENHI

## Related

- (link related pages by id as the wiki grows)
