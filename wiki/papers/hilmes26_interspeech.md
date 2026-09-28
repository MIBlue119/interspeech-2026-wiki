---
id: hilmes26_interspeech
category: on-device
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-683
---

# Positional Encoding in the Context of Memristor-Based Analog Computation for Automatic Speech Recognition

**TL;DR** — Identifies that large positional-encoding values are a major source of error when running speech transformers on memristor-based analog hardware, and shows fixes that cut that error significantly.

## Problem

Memristor-based analog computation offers resource-efficient neural inference by enabling analog vector-matrix multiplication, but it suffers distortion in both weight programming and execution, and the causes are poorly understood.

## Method

Identifies large transformed positional-encoding output values as a major cause of degradation in analog-to-digital conversion (ADC), then adjusts the weight and precision bit allocation of the ADC for specific memristor layers, and separately studies removing encoding-related linear transformations when the ADC itself cannot be modified.

## Results

ADC bit adjustment reduces degradation by about 50% relative while keeping estimated energy consumption stable; removing encoding-related linear transformations reduces degradation by about 30% relative when the ADC cannot be changed.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Energy-efficient on-device or edge ASR using emerging analog memristor hardware.

## Related

- (link related pages by id as the wiki grows)
