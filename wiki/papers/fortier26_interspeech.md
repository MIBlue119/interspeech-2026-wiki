---
id: fortier26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2813
pdf: https://www.isca-archive.org/interspeech_2026/fortier26_interspeech.pdf
---

# Where Do Backdoors Live? A Component-Level Analysis of Backdoor Propagation in Speech Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/fortier26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fortier26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2813)

**TL;DR** — The paper investigates backdoor vulnerabilities in speech language models across multimodal pipelines, demonstrating that backdoors propagate through components and evade standard separability-based filtering defenses in multitask settings.

## Problem

Speech language models are typically built by cascading independent pretrained components in a black-box manner, leaving information flow and backdoor propagation largely unstudied. Multimodal and multitask frameworks present unique vulnerabilities because shared representations combine linguistic, acoustic, and speaker-specific traits, yet standard filtering defenses rely on unimodal separability assumptions that may fail.

## Method

The study analyzes a modular speech language model pipeline comprising a WavLM Large audio encoder (with the top 15 of 24 layers fine-tuned), a 3-layer CNN connector projecting representations into the text space, and a frozen TinyLlama-1.1B-Chat-v1.0 language model adapted via LoRA. Backdoor evaluations test a dirty-label poisoning strategy utilizing a natural 220-millisecond typewriter click trigger at a 0 dB SNR across four tasks: automatic speech recognition, emotion recognition, age prediction, and gender prediction. Component-level isolation experiments selectively freeze or train individual modules on poisoned versus clean data to evaluate backdoor propagation and persistence.

## Results

Evaluating across LibriSpeech (Libri-360), CREMA-D, and VoxCeleb2-AE datasets, the base attack achieves high Attack Effectiveness Rates (e.g., 99.2% AER on Libri-360 ASR with a 2.1 WER, and 93.7% AER on CREMA-D emotion recognition with 64.2 baseline accuracy) while maintaining strong clean data performance. Testing across alternative speech encoders—HuBERT Large, Whisper Medium, and wav2vec 2.0 Large—reveals consistent backdoor vulnerability, with Whisper yielding 99.4% AER on emotion recognition and HuBERT achieving 90.8% AER on ASR. Component-level analysis shows that backdoor persistence depends heavily on which specific module is targeted, and embedding evaluations demonstrate that poisoned and benign samples are not directly separable in multitask feature spaces.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and security researchers developing or auditing speech language models, multimodal conversational AI, and audio-text pipelines can use these findings to design more robust defenses and secure component-reuse protocols.

## Limitations

The study focuses on cascading architectures with specific modular divisions, and evaluates a restricted set of four fundamental tasks and a single type of acoustic trigger.

## Related

- (link related pages by id as the wiki grows)
