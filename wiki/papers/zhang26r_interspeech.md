---
id: zhang26r_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1214
pdf: https://www.isca-archive.org/interspeech_2026/zhang26r_interspeech.pdf
---

# PRISM: Prosody-Integrated Multi-Agent Reasoning Framework for Empathetic Spoken Dialogue

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1214)

**TL;DR** — PRISM is a decoupled multi-agent framework for empathetic spoken dialogue that translates acoustic prosody into natural-language descriptions and selectively invokes external knowledge, consistently outperforming baseline models across automatic, human, and LLM-based evaluations on the AvaMERG dataset.

## Problem

Traditional cascade spoken dialogue systems suffer from irreversible information loss and accumulated errors because transcribing speech to text discards valuable paralinguistic and prosodic cues. Meanwhile, end-to-end speech models treat prosody and emotion as implicit features, making interpretable control and flexible knowledge integration difficult. This lack of explicit emotional and knowledge modeling hinders genuine empathy and factual adaptability in spoken interactions.

## Method

PRISM decouples the pipeline into four coordinated agents: Perceiver, Manager, Responder, and Vocalizer. The Perceiver uses Whisper for transcription, emotion2vec for utterance-level emotion, WebRTC VAD for pause ratios and speaking rates, and energy statistics to extract structural paralinguistic attributes. The Manager then maps these numerical acoustic cues into descriptive textual labels via rules and leverages an LLM with few-shot prompting to produce a natural-language prosody description. The Responder, built on fine-tuned Qwen2.5-7B-Instruct or Llama-3.1-8B-Instruct models trained on TOOL-ED using LLaMA-Factory, jointly handles dialogue responses, optional COMET-BART commonsense knowledge retrieval, and target emotion/intensity prediction. Finally, the Vocalizer uses StyleTTS2 with a two-stage parameter control process to dynamically adjust timbre similarity, prosody strength, diffusion steps, and expressive scaling based on both target intents and user paralinguistic attributes.

## Results

Evaluated on the AvaMERG dataset test set, PRISM variants (using Qwen and Llama backbones) consistently surpass baseline systems including ASR+LLM, SpeechGPT, OSUM-EChat, SALMONN (7B/13B), Qwen2.5-Omni-7B, LLaMA-Omni2, and OpenS2S. PRISM achieves superior n-gram overlap (BLEU), semantic similarity (BERTScore 0.8792/0.8801), content overlap (ROUGE), and lexical diversity (Dist). GPT-4o-based A/B testing and human evaluation on a 5-point Likert scale (rated by three expert annotators with an ICC of 0.81) confirm PRISM's advantages in empathy, prosodic appropriateness, and conversational consistency. Ablation studies removing knowledge invocation or prosody descriptions demonstrate consistent performance drops, verifying the importance of each component.

## Code

- https://github.com/Bxzfrm/PRISM

## Applications

Speech engineers and developers building empathetic voice assistants, mental health support agents, or emotionally responsive conversational systems.

## Related

- (link related pages by id as the wiki grows)
