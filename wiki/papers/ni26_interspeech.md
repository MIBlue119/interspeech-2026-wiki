---
id: ni26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2211
pdf: https://www.isca-archive.org/interspeech_2026/ni26_interspeech.pdf
---

# NV-Bench: Benchmark of Nonverbal Vocalization Synthesis for Expressive Text-to-Speech Generation

[PDF](https://www.isca-archive.org/interspeech_2026/ni26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ni26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2211)

**TL;DR** — The paper introduces NV-Bench, a standardized benchmark for evaluating nonverbal vocalizations in text-to-speech generation using a dual-dimensional protocol and paired human references.

## Problem

Current text-to-speech systems increasingly integrate nonverbal vocalizations like breaths, laughter, and grunts, but evaluate them merely as generic sound effects using ad-hoc tests and text-rewritten references without ground-truth audio. This prevents reliable measurement of pragmatic appropriateness, acoustic realism, and controllability. Bridging this gap requires a functional taxonomy and a standardized benchmarking framework that can isolate failure modes in event generation and audio quality.

## Method

The authors construct NV-Bench from web-sourced audiovisual media using a multi-stage pipeline consisting of audio standardization via Emilia-Pipe, single-speaker filtering using MiMo-Audio-7B-Instruct, and rigorous expert human verification. They develop a multi-lingual paralinguistic-aware ASR (NVASR) model by fine-tuning SenseVoice-Small with CTC loss on a consolidated dataset of 6 open-source NV corpora. The evaluation protocol introduces a dual-dimensional scheme: instruction alignment measured via character error rate variants including a paralinguistic character error rate (PCER), and acoustic fidelity measured via speaker similarity and Fréchet distance. They benchmark several modern TTS models, including CosyVoice variants, FlexiVoice, and an Llama-based Orpheus-TTS, by fine-tuning them on a consolidated multi-source NV corpus with unified special control symbols.

## Results

NV-Bench comprises 1,651 multi-lingual utterances paired with human reference audio, split into a strictly balanced single-label subset and a relatively balanced multi-label subset across 14 NV categories. On the Mandarin single-label subset, the fine-tuned CosyVoice3 baseline achieves the lowest PCER of 27.69% and an OCER of 4.90%, demonstrating superior instruction alignment. Subjective evaluations show that instruction accuracy exhibits a significant negative Spearman correlation with PCER (rho = -0.65, p < 0.001), validating that the proposed objective metrics align strongly with human perception.

## Code

- https://charlesnii.github.io/nvbench.github.io

## Applications

Speech and machine learning engineers developing expressive, conversational, or human-like text-to-speech systems can use this benchmark to systematically evaluate paralinguistic event control and acoustic realism.

## Related

- (link related pages by id as the wiki grows)
