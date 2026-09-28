---
id: arora26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1756
pdf: https://www.isca-archive.org/interspeech_2026/arora26_interspeech.pdf
---

# Negation in Audio Generation Models

[PDF](https://www.isca-archive.org/interspeech_2026/arora26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/arora26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1756)

**TL;DR** — The Audio Negation Benchmark reveals that current text-to-audio models suffer from severe affirmation bias, dropping below 0.05 recall when tasked with generating soundscapes that exclude specific events.

## Problem

Text-to-audio (T2A) generation models systematically fail to comprehend negative constraints like "no" or "without," instead defaulting to generating the exact sounds they are instructed to omit. This occurs because existing acoustic training datasets like AudioCaps or AudioSet exclusively describe present sound events and lack negative supervision. Consequently, propagating these failures in automated pipelines creates critical flaws in simulation environments or assistive audio applications.

## Method

The authors introduce the Audio Negation Benchmark, consisting of one million negated prompts derived from AudioCaps captions using the Qwen3-8B LLM. The dataset covers 1 to 3 sound events per prompt spanning four negation types (lexical, syntactic, semantic, mixed) and three scopes. To measure negation understanding at scale, they establish a multimodal evaluation protocol including embedding-based metrics and an Audio Question Answering (AQA) task using multiple-choice questions to probe for negated events. Three state-of-the-art T2A models—AudioGen, AudioLDM2, and TangoFlux—are evaluated under this protocol.

## Results

Across all evaluation models and negation types, AQA recall for negated audio falls below 0.05, proving that negated and affirmative prompts produce acoustically near-identical outputs due to a strong affirmation bias. Human annotation of a representative subset confirms that the intended negation is successfully introduced in 99.6% of the generated prompt set. Re-captioning the generated audio independently verifies that negative prompts consistently default to affirmative soundscapes.

## Code

- https://iab-rubric.org/resources/other-databases/audio-negation-benchmark

## Applications

Speech and machine learning engineers developing or auditing text-to-audio generative models, safety classifiers, and simulation environments requiring semantic fidelity.

## Limitations

Evaluations are restricted to captions with 1 to 3 sound events to keep the combinatorial space tractable, covering roughly 89.7% of the AudioCaps dataset.

## Related

- (link related pages by id as the wiki grows)
