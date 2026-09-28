---
id: maruyama26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/maruyama26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/maruyama26_interspeech.pdf
---

# Real-Time CARFAC/SAI-derived Pitchogram for Seeing and Correcting Pronunciation in Mandarin Chinese Tones

[PDF](https://www.isca-archive.org/interspeech_2026/maruyama26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/maruyama26_interspeech.html)

**TL;DR** — This paper presents a real-time Computer-Assisted Pronunciation Training (CAPT) system for Mandarin Chinese tones using a biologically inspired CARFAC and SAI-derived pitchogram interface.

## Problem

Non-tonal language speakers frequently struggle to acquire Mandarin Chinese tones because standard spectrograms display rapidly changing temporal fine structures that are difficult to interpret in real time. Conventional visualizations fail to provide an intuitive mapping between pitch variations and tone categories for beginner learners. Bridging this gap is crucial for self-directed tone perception and production practice.

## Method

The system utilizes Google's open-source CARFAC (Cascade of Asymmetric Resonators with Fast-Acting Compression) auditory model paired with SAI (Stabilised Auditory Image) to yield temporally stable pitchograms. Implemented in Python, the pipeline ingests 16 kHz audio segmented into 450-sample (approx. 28 ms) frames to generate live visual feedback. It features two user interfaces: a perception prototype with immediate correctness indicators and a dual-screen production prototype comparing the user's live pitchogram against Google Text-to-Speech reference patterns. The demonstration uses a constrained vocabulary of 22 words from HSK levels 1 and 2, which users can expand.

## Results

The paper outlines a qualitative system demonstration rather than quantitative benchmark evaluations. It showcases a working, zero-setup Python and web-based tool capable of displaying real-time auditory-model pitchograms. The design successfully establishes a side-by-side visual comparison framework for Mandarin tone perception and production tasks.

## Code

- https://github.com/google/carfac

## Applications

Second language learners and educators focusing on tonal languages like Mandarin Chinese, for real-time pronunciation self-training.

## Limitations

The current prototype relies on a limited vocabulary of 22 pre-defined words and lacks fully automated vocabulary expansion or AI-generated textual feedback.

## Related

- (link related pages by id as the wiki grows)
