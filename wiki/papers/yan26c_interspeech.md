---
id: yan26c_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1278
pdf: https://www.isca-archive.org/interspeech_2026/yan26c_interspeech.pdf
---

# Probing and Mitigating Hallucinations in Speech-augmented Language Models for Automatic Speech Recognition via Small Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/yan26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yan26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1278)

**TL;DR** — The paper investigates the root causes of automatic speech recognition hallucinations in speech-augmented language models and proposes AudioSLM, which slashes the hallucination error rate from 52.01% down to 8.69% on LibriSpeech dev-clean.

## Problem

Speech-augmented language models frequently generate hallucinated words that diverge from actual audio inputs due to over-reliance on linguistic priors and textual context. This artifact hinders their practical deployment and reliability in real-world automatic speech recognition. Existing literature largely leaves this modality-mismatch and hallucination phenomenon unaddressed for speech models compared to vision-language counterparts.

## Method

The authors introduce AudioSLM, a compact automatic speech recognition framework built around the 135M parameter SmolLM2 backbone. It integrates a Whisper-large-v2 speech encoder, a 3-layer convolutional connector with a subsampling rate of 4, and two key additions: a CTC-Gated module for fine-grained temporal feature injection, and newly inserted cross-attention layers placed between the multi-head self-attention and multi-layer perceptron blocks. During training, only the cross-attention layers, LoRA weights, and CTC-gated components are updated while keeping the backbone language model frozen for 30 epochs.

## Results

Evaluated on the LibriSpeech corpus, AudioSLM achieves a dramatic drop in hallucination error rate down to 8.69% on the dev-clean set, compared to 52.01% for the vanilla speech-augmented language model baseline. Ablation studies confirm that removing cross-attention (-w/o CA) increases the hallucination error rate to 11.96%, while removing the CTC gate (-w/o CTC-Gate) increases it to 14.67%. Causal mediation analysis reveals that multi-head self-attention modules are the primary drivers of hallucinations due to excessive attention bias toward text tokens.

## Code

- https://github.com/bicheng1225/AudioSLM

## Applications

Engineers building speech recognition systems and voice assistants can use this approach to produce robust, hallucination-free transcription models powered by small language models.

## Limitations

The evaluation is restricted to the LibriSpeech benchmark dataset using a single small language model family.

## Related

- (link related pages by id as the wiki grows)
