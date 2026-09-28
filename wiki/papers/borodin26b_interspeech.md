---
id: borodin26b_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-345
pdf: https://www.isca-archive.org/interspeech_2026/borodin26b_interspeech.pdf
---

# When Spoof Detectors Travel: Evaluation Across 66 Languages in the Low-Resource Language Spoofing Corpus

[PDF](https://www.isca-archive.org/interspeech_2026/borodin26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/borodin26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-345)

**TL;DR** — The paper introduces LRLspoof, a large-scale multilingual audio deepfake dataset comprising 2,732 hours across 66 languages and 24 TTS systems, demonstrating that language identity acts as an independent source of domain shift for spoofing countermeasures.

## Problem

Existing audio deepfake benchmarks focus primarily on high-resource languages, causing countermeasure models to rely on language or phonotactic artifacts rather than true spoofing cues. This leads to performance degradation under cross-lingual deployment. The paper addresses this gap by providing a resource to evaluate spoofing detection robustness across diverse languages, particularly under low-resource conditions.

## Method

The authors created LRLspoof using 24 open-source text-to-speech synthesizers, spanning classical non-neural parametric models, supervised neural systems, multilingual initiatives, and modern generative zero-shot TTS/voice cloning models. The corpus contains 2,732 hours of speech across 66 languages, including 45 low-resource languages defined by having under 100 hours of scripted speech in Common Voice 24.0. To evaluate 11 publicly available spoofing countermeasures (such as AASIST3, Res2TCN, and Wav2Vec2-based variants) without requiring target-domain bona fide speech, the authors use a zero-shot threshold transfer protocol by calibrating an Equal Error Rate operating point on pooled external benchmarks.

## Results

Evaluating 11 countermeasures across the LRLspoof dataset reveals severe model-dependent cross-lingual disparities, with spoof rejection rates varying markedly across languages even under controlled synthesizer conditions. For instance, spoof rejection rates fluctuate heavily depending on the target language, establishing that language-induced distribution shift independently degrades countermeasure robustness. The dataset and corresponding resources are released publicly to facilitate standardized cross-lingual evaluation.

## Code

- https://huggingface.co/datasets/lab260

## Applications

Speech security engineers and researchers developing audio deepfake detectors and spoofing countermeasures can use this corpus and evaluation framework to test cross-lingual generalization and robustness against low-resource speech synthesis attacks.

## Limitations

The dataset contains only synthetically generated speech without matching target-domain bona fide utterances, preventing the direct computation of target-domain Equal Error Rates or full security operating points.

## Related

- (link related pages by id as the wiki grows)
