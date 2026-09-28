---
id: rajaa26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2424
---

# DualTurn: Learning Turn-Taking from Dual-Channel Generative Speech Pretraining

**TL;DR** — A 0.5B model pretrained generatively on dual-channel conversational audio learns natural turn-taking and beats both a dedicated VAP model and a much larger 3.1B audio-text model, running in real time on CPU.

## Problem

Speech-to-speech models handle turn-taking naturally but lack strong tool-calling and reasoning, while production ASR-LLM-TTS pipelines have those capabilities but rely on silence timeouts, making turn-taking feel unnatural.

## Method

DualTurn is generatively pretrained on dual-channel conversational audio by autoregressively predicting both speakers' future audio, learning conversational dynamics without labels, then fine-tuned to predict interpretable turn-taking signals mapped directly to five agent actions, continuously monitoring both channels to anticipate turn boundaries.

## Results

DualTurn (0.5B) outperforms VAP on agent action prediction (weighted F1 0.633 vs. 0.389) and a 3.1B audio-text model on word-level prediction (AUC 0.930 vs. 0.880), anticipating turns earlier with fewer interruptions while running in real time on a CPU.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time voice agents and conversational AI systems needing natural, low-latency turn-taking without expensive silence-timeout heuristics.

## Related

- (link related pages by id as the wiki grows)
