---
id: peng26h_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2074
pdf: https://www.isca-archive.org/interspeech_2026/peng26h_interspeech.pdf
---

# Discrete vs. Continuous: A Comprehensive Study of Unified Audio Understanding in LALMs

[PDF](https://www.isca-archive.org/interspeech_2026/peng26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2074)

**TL;DR** — This paper introduces UniARC, a unified benchmarking framework for comparing continuous and discrete audio representations across speech, sound, and music tasks in Large Audio Language Models (LALMs), revealing that semantic constraints in tokenization matter more than acoustic fidelity or LLM backbone scaling.

## Problem

Existing evaluations of audio representations in LALMs are often restricted to narrow domains like speech, evaluate encoders in isolation outside of LLM contexts, or ignore the complex interactions between representation paradigms, model capacity, and data scaling. Because previous benchmarks fail to systematically compare continuous self-supervised learning features against various discrete tokens across diverse audio modalities, engineers lack principled guidance for choosing front-end encoders. This gap makes it difficult to balance semantic density, reconstruction fidelity, and training efficiency when designing modern multimodal audio models.

## Method

The authors propose the UniARC framework to evaluate continuous encoders (HuBERT, WavLM, Wav2Vec 2.0, Whisper) and discrete tokens (K-means clustered representations, DAC, WavTokenizer, SpeechTokenizer) across speech, sound, and music understanding. Audio inputs are standardized at 16 kHz (except WavTokenizer at 24 kHz) and mapped to the LLM's latent space using a two-layer MLP projector combined with 10-frame temporal concatenation. Dual evaluation strategies are employed: parameter-efficient fine-tuning via LoRA on SmolLM2-135M/360M backbones, and frozen-backbone probing on Llama-3-1B/8B models. Experiments are conducted using PyTorch on NVIDIA A100 GPUs, with models trained using the AdamW optimizer.

## Results

Evaluated across dozens of datasets spanning speech (LibriSpeech, AISHELL-1, Fluent Speech, SLURP, etc.), environmental sound (ESC-50, UrbanSound8K, FSD50K, Clotho), and music (GTZAN, FMA, NSynth, Song Describer) using metrics such as accuracy, WER/CER, mAP, and FENSE/DATE. Results demonstrate that Whisper achieves the highest overall average score among continuous encoders (e.g., 0.858 on SmolLM2-135M speech tasks), outperforming pure self-supervised models like Wav2Vec2 due to its stronger alignment with text semantics. The study finds that discrete tokens incorporating semantic constraints (like SpeechTokenizer) substantially outperform high-fidelity reconstruction codecs (like DAC) on understanding benchmarks. Furthermore, scaling the language backbone from 135M to 360M or 1B to 8B fails to compensate for poor front-end representations, as the audio encoder effectively establishes a performance ceiling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers designing Large Audio Language Models, conversational agents, or general audio understanding systems can use these findings to select optimal audio encoders and balance computational efficiency against semantic density.

## Related

- (link related pages by id as the wiki grows)
