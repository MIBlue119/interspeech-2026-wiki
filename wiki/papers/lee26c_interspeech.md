---
id: lee26c_interspeech
category: speech-translation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-540
pdf: https://www.isca-archive.org/interspeech_2026/lee26c_interspeech.pdf
---

# NaturalFlow: Reducing Disruptive Pauses for Natural Speech Flow in Simultaneous Speech-to-Speech Translation

[PDF](https://www.isca-archive.org/interspeech_2026/lee26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-540)

**TL;DR** — The paper introduces NaturalFlow, a fluency-aware preference optimization framework for simultaneous speech-to-speech translation that reduces disruptive inter-chunk silences while maintaining translation quality and latency.

## Problem

Simultaneous speech-to-speech translation models often prioritize minimal latency by employing rigid chunk-wise processing, resulting in fragmented speech punctuated by frequent pauses and an unnatural acoustic flow. This unnatural delivery increases the cognitive load on listeners and degrades subjective perceptions of quality, even when semantic content is preserved. Existing optimization methods predominantly focus on traditional quality-latency trade-offs rather than addressing pause-driven acoustic fluency.

## Method

The framework builds upon the Hibiki simultaneous S2ST architecture (which uses the Mimi neural audio codec at 12.5 Hz with 16 codebook levels) and applies Direct Preference Optimization (DPO). To build the offline preference dataset, the method generates a diverse pool of 32 translation candidates per source utterance via high-temperature sampling (temperature = 1.0). It introduces 'Silver-Medal Preference', constructing pairs where chosen responses exhibit lower silence ratios and high translation fidelity compared to rejected ones. Translation quality is measured using Whisper-medium ASR and BLEU against ground-truth texts, while acoustic fluency is quantified via silence ratios computed using Silero VAD.

## Results

Evaluated across CVSS-C, VoxPopuli, mTEDx, and AudioNTREX benchmarks covering short- and long-form speech, the framework successfully reduces the output silence ratio. Human evaluations confirm that the resulting translations achieve continuous, natural-sounding acoustic delivery preferred by listeners. These improvements are attained while preserving competitive translation quality (measured by BLEU/ASR) and latency-related metrics.

## Code

- https://naturalflows2st.github.io/naturalflow/

## Applications

Speech and ML engineers building real-time, streaming simultaneous translation systems for voice assistants, live broadcasting, and cross-lingual communication tools.

## Related

- (link related pages by id as the wiki grows)
