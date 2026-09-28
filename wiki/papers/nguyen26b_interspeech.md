---
id: nguyen26b_interspeech
category: dataset
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-581
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26b_interspeech.pdf
---

# Revisiting Active Speaker Detection: An In-the-Wild Benchmark for Generalization and Robustness

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-581)

**TL;DR** — UniTalk is a large-scale benchmark dataset for active speaker detection (ASD) emphasizing real-world complexities, revealing that state-of-the-art models achieving near-saturation on movie-centric datasets like AVA suffer performance drops under realistic conditions.

## Problem

Established ASD benchmarks like AVA-ActiveSpeaker consist entirely of old movie content with clean audio and simple visual compositions, creating a massive domain gap for real-world deployment. Practical settings require handling underrepresented languages, heavy background noise, and crowded scenes involving multiple simultaneous speakers or occlusions. Because existing models approach 95%+ mAP on AVA, the field has largely treated ASD as a solved problem, obscuring genuine robustness failures in everyday applications.

## Method

The authors introduce a multi-stage data curation pipeline using GPT-4 keyword generation for YouTube video sourcing, S3FD-based face detection with greedy spatio-temporal tracking, and a rigorous two-stage multi-pass human annotation protocol. The dataset spans 44.5 hours of video (33.4 training, 11.1 test) and 48,693 speaking identities, partitioned into four distinct evaluation subcategories: underrepresented languages, noisy backgrounds, crowded scenes, and mixed-difficulty hard examples. Benchmarked models utilize audio-visual encoders and context modeling networks trained with cross-entropy losses over concatenated audio-visual features and auxiliary modality-specific heads.

## Results

Evaluated across multiple state-of-the-art architectures, models achieving >95 mAP on AVA drop significantly on UniTalk, with the strongest baseline attaining only 83.2 mAP overall and 77.9 mAP on the hard difficulty subset. Conversely, models pre-trained on UniTalk demonstrate superior cross-dataset transfer, achieving 88.0 mAP on AVA, 91.4 mAP on Talkies, and 90.4 mAP on ASW. Furthermore, pre-training on UniTalk enables rapid adaptation, allowing a model fine-tuned on just 3 hours of AVA data to reach 92.4 mAP.

## Code

- https://github.com/plnguyen2908/UniTalk-ASD-code

## Applications

Speech and machine learning engineers working on speaker diarization, audio-visual speech recognition, and human-robot interaction systems deployed in unconstrained, noisy, or multilingual environments.

## Related

- (link related pages by id as the wiki grows)
