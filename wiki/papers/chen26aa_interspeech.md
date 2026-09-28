---
id: chen26aa_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2466
pdf: https://www.isca-archive.org/interspeech_2026/chen26aa_interspeech.pdf
---

# PolyBench: A Benchmark for Compositional Reasoning in Polyphonic Audio

[PDF](https://www.isca-archive.org/interspeech_2026/chen26aa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26aa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2466)

**TL;DR** — PolyBench is a new multi-task evaluation benchmark designed to assess compositional reasoning in polyphonic audio for Large Audio Language Models, revealing severe performance degradations across state-of-the-art architectures.

## Problem

Existing audio reasoning benchmarks predominantly focus on monophonic, sequential, or clean acoustic environments, overlooking the complex temporal overlap and compositional structures of real-world polyphonic audio. Because multiple sound sources interact and mask each other, current Large Audio Language Models (LALMs) suffer from severe confusion and hallucination, making systematic evaluation of overlapping sound events a critical missing piece in modern audio AI development.

## Method

PolyBench builds a multi-choice question answering (MCQA) evaluation pipeline utilizing real-world sound events sampled from DataSED, DESED, and MAESTRO-Real datasets, with distractor-balanced monophonic data added from AudioTime. The benchmark spans five structured task categories: counting, classification, detection, concurrency, and duration estimation. Question variants are generated using Qwen3-Max through human-LLM collaboration, followed by manual quality control and correction. Models are evaluated using exact-match accuracy, F1 score, and semantic similarity via NV-Embed-v2, while chain-of-thought prompting is applied to activate internal reasoning paths.

## Results

Evaluated models including Audio Flamingo 3, R1-AQA, Qwen3-Omni-30B-A3B, and TimeAudio+Qwen3-8B show severe performance drops on complex polyphonic tasks. Qwen3-Omni-30B-A3B achieves the highest overall scores, reaching 57.5% on counting and 63.4% on detection, while simpler tasks like concurrency and classification yield higher accuracies (up to 83.1% and 77.9%, respectively). However, concurrency evaluations mixed with monophonic samples expose heavy shortcut learning and bias, such as R1-AQA exhibiting a 54.7% false positive rate due to a strong 'Yes' prior.

## Code

- https://huggingface.co/datasets/PolyBench

## Applications

Speech and machine learning engineers developing Large Audio Language Models, audio question-answering assistants, and multimodal embodied agents operating in dynamic, real-world acoustic environments.

## Limitations

Current evaluation models struggle significantly with interval-level temporal localization and cardinality estimation under polyphony, demonstrating a reliance on label priors rather than robust audio-evidence reasoning.

## Related

- (link related pages by id as the wiki grows)
