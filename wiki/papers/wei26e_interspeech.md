---
id: wei26e_interspeech
category: prosody
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2783
pdf: https://www.isca-archive.org/interspeech_2026/wei26e_interspeech.pdf
---

# Do Speech Emphasis Models Generalize across Languages and Emotions?

[PDF](https://www.isca-archive.org/interspeech_2026/wei26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wei26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2783)

**TL;DR** — The paper introduces MMEE, a multilingual multi-emotion emphasis corpus of 10,000 professional utterances across 7 languages and 34 emotion categories, and benchmarks emphasis detection models to show that multilingual training and human-perceptual annotations yield robust, transferable prosodic representations.

## Problem

Existing speech emphasis detection models are predominantly trained and evaluated on monolingual, neutral read speech in English, ignoring graded perceptual judgments, diverse speaking styles, and cross-lingual/cross-emotional generalization. As global speech technologies advance, building emphasis models that work across diverse cultures, languages, and emotional states is critical for expressive TTS and intent reasoning. However, current datasets rely on synthetic, binary, or expert-linguistic labels rather than human-perceptual ratings, leaving open questions about how prosodic emphasis transfers across language families and arousal regimes.

## Method

The authors introduce MMEE (14.13 hours, 202 speakers, 10 regional varieties) annotated with 3-level perceptual emphasis scores by 10 fluent native listeners per sample via Prolific. They benchmark two state-of-the-art models: EmphaClass (a 1B-parameter XLS-R model fine-tuned for frame-level binary classification and extended to scalar regression via MSE loss) and WhiStress (a Whisper-small backbone combined with an additional decoder block and FCNN head for token-level scoring). Experiments evaluate monolingual, cross-lingual, multilingual, cross-arousal, cross-dataset, and data-scale settings across 8 NVIDIA 80GB A100 GPUs.

## Results

Benchmarking across MMEE shows that monolingual models suffer zero-shot degradation on typologically distant languages (e.g., Mandarin Chinese, which exhibits lower inter-annotator agreement and tonal interference), whereas multilingual training ("all") matches or exceeds monolingual performance. Models transfer robustly across high- and low-arousal emotions, indicating emphasis cues are partially separable from arousal-driven acoustic variation. Data-scale experiments reveal rapid initial gains that plateau early, showing strong data efficiency. Cross-dataset evaluations demonstrate strong bidirectional transfer between human-perceptual MMEE and synthetic benchmarks like EmphAssess and TinyStress-15K, achieving binary accuracies around 0.79 to 0.89.

## Code

- https://multilingual-speech-emphasis.github.io

## Applications

Speech engineers and researchers building globally deployed expressive text-to-speech, speech-to-speech translation, and spoken language understanding systems that require robust control over prosodic focus and user intent.

## Limitations

Performance drops significantly for Mandarin Chinese due to tonal interactions with F0-based prominence, and zero-shot cross-lingual transfer is limited across typologically distant language families.

## Related

- (link related pages by id as the wiki grows)
