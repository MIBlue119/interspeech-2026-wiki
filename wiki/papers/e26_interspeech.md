---
id: e26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3255
pdf: https://www.isca-archive.org/interspeech_2026/e26_interspeech.pdf
---

# Benchmarking Speech Systems for Frontline Health Conversations: The DISPLACE-M Challenge

[PDF](https://www.isca-archive.org/interspeech_2026/e26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/e26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3255)

**TL;DR** — The DISPLACE-M challenge introduces a conversational AI benchmark for unconstrained multi-speaker medical dialogues in Hindi, releasing 55 hours of data and evaluating baselines across speaker diarization, ASR, topic identification, and summarization.

## Problem

Existing speech corpora for healthcare are largely recorded in controlled clinical environments, emphasize formal English workflows, and consist of isolated utterances rather than long-form dialogues. This leaves a critical gap for deploying conversational AI tools in unconstrained, real-world community healthcare settings involving spontaneous, code-mixed, and multi-speaker interactions with frontline workers.

## Method

The challenge evaluates a cascaded processing pipeline comprising four tracks: speaker diarization, ASR, topic identification, and dialogue summarization. Baseline systems utilize DiariZen (employing an EEND powerset loss model and ResNet34-LM VoxCeleb2 embeddings) for diarization, IndicConformer and Whisper-large-v3 for ASR, MedGemma-1.5-4b-it for topic identification, and Llama-3.2-3B for dialogue summarization. Participants and baselines explore both zero-shot inference and supervised fine-tuning variants using the 40-hour development corpus.

## Results

Evaluated on a 15-hour blind test set, top challenge entries achieved a Diarization Error Rate (DER) as low as 7.38% (outperforming the supervised baseline DER of 7.56%), while ASR submissions reached a time-constrained minimum-permutation word error rate (tcpWER) of 10.76% using fine-tuned Qwen3-ASR-1.7B with GPT-4.1 post-processing. For topic identification and dialogue summarization, top teams achieved Rouge-1 scores up to 0.46 and Rouge-L scores around 0.20 using LLM cascades. Fine-tuning models like IndicConformer on the domain-specific development set consistently reduced ASR tcpWER from 26.78% down to 20.23%.

## Code

- https://www.codabench.org/competitions/13833/?secret_key=1b714e64-0f0d-4e0f-8a3c-be9b3d10f00c#

## Applications

Speech and ML engineers building conversational AI assistants, automated clinical documentation tools, and diagnostic pipelines for community health workers in multilingual and low-resource settings.

## Limitations

The dataset is currently focused on Hindi and its regional dialects collected across specific regions in India, and the challenge baseline relies on a cascaded modular pipeline rather than end-to-end joint modeling.

## Related

- (link related pages by id as the wiki grows)
