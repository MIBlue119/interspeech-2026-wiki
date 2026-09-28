---
id: chang26d_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1511
pdf: https://www.isca-archive.org/interspeech_2026/chang26d_interspeech.pdf
---

# TaigiSpeech: A Low-Resource Real-World Speech Intent Dataset with Scalable Data Mining In-the-Wild

[PDF](https://www.isca-archive.org/interspeech_2026/chang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1511)

**TL;DR** — The paper introduces TaigiSpeech, a real-world spoken intent dataset for Taiwanese Hokkien consisting of 3,079 utterances from elderly speakers across emergency and home-assistant scenarios, and investigates scalable data mining strategies.

## Problem

Spoken language understanding benchmarks predominantly target high-resource languages, leaving low-resource and unwritten languages like Taiwanese Hokkien without dedicated evaluation resources. This lack of data is particularly critical for elderly populations, who rely heavily on regional languages for communicating essential needs or emergencies but are poorly served by standard smart home and health monitoring technologies. Developing domain-specific datasets is challenging due to the scarcity of standardized orthography and labeled training data.

## Method

The paper presents TaigiSpeech, comprising 3,079 utterances spanning 8 intent categories (4 emergency such as SOS calls and breath emergency, and 4 non-emergency commands like turning lights on or off) collected from 21 older adults aged 54 to 78. To mitigate data scarcity, the authors explore two scalable mining frameworks for in-the-wild video sources: keyword matching combined with LLM pseudo-labeling via an intermediate language (Mandarin), and an audio-visual framework that leverages multimodal correspondence with minimal text supervision. They evaluate lightweight neural networks and self-supervised learning speech models on intent recognition tasks using both the real-world dataset and mined data.

## Results

Evaluated on the 6.1-hour TaigiSpeech dataset covering 21 speakers across 8 intent classes, baseline and SSL models trained exclusively on mined in-the-wild data suffer from severe performance degradation when tested on real elderly recordings, revealing a pronounced domain mismatch. The dataset contains roughly 385 utterances per intent with average durations ranging between 5.67 and 8.22 seconds per category. The study establishes TaigiSpeech as a rigorous benchmark for evaluating low-resource spoken language understanding systems.

## Code

- https://kwchang.org/taigispeech

## Applications

Speech and ML engineers building voice assistants, ambient assisted living systems, and automated emergency triage tools tailored for elderly populations or low-resource, unwritten regional languages.

## Limitations

The dataset is currently limited to 21 speakers and 3,079 utterances, and models trained on web-mined data exhibit a strong domain shift when applied to real-world elderly speech.

## Related

- (link related pages by id as the wiki grows)
